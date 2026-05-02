import { Component, inject, type OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

interface User {
  email: string;
  id: number;
  name: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-users',
  styleUrl: './users.component.css',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private authService = inject(AuthService);

  users = signal<User[]>([]);
  loading = signal(false);
  saving = signal(false);
  error = signal<string | null>(null);
  editingUser = signal<User | null>(null);

  formData = { email: '', name: '' };

  private readonly API_URL = '/api';

  async ngOnInit(): Promise<void> {
    await this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const response = await fetch(`${this.API_URL}/users`, {
        headers: this.authService.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to load users');
      }

      const data = await response.json();
      this.users.set(data);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    }

    this.loading.set(false);
  }

  editUser(user: User): void {
    this.editingUser.set(user);
    this.formData = { email: user.email, name: user.name };
  }

  cancelEdit(): void {
    this.editingUser.set(null);
    this.formData = { email: '', name: '' };
  }

  async saveUser(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);

    const editing = this.editingUser();
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${this.API_URL}/users/${editing.id}` : `${this.API_URL}/users`;

    try {
      const response = await fetch(url, {
        body: JSON.stringify(this.formData),
        headers: {
          'Content-Type': 'application/json',
          ...this.authService.getAuthHeaders(),
        },
        method,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editing ? 'update' : 'create'} user`);
      }

      this.cancelEdit();
      await this.loadUsers();
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    }

    this.saving.set(false);
  }

  async confirmDelete(user: User): Promise<void> {
    if (!confirm(`Delete user ${user.name}?`)) return;

    this.error.set(null);

    try {
      const response = await fetch(`${this.API_URL}/users/${user.id}`, {
        headers: this.authService.getAuthHeaders(),
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      await this.loadUsers();
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
