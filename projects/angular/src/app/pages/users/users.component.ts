import { Component, inject, type OnInit, signal } from '@angular/core';
import { FormField, form, submit, validateStandardSchema } from '@angular/forms/signals';
import { type CreateUserRequest, CreateUserSchema, routes, type UserResponse } from 'shared';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  imports: [FormField],
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly usersService = inject(UsersService);

  readonly routes = routes;
  readonly users = signal<UserResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly editingUser = signal<UserResponse | null>(null);

  readonly model = signal<CreateUserRequest>({ email: '', name: '' });

  readonly userForm = form(this.model, (schemaPath) => {
    validateStandardSchema(schemaPath, CreateUserSchema);
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const users = await this.usersService.getUsers();
      this.users.set(users);
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    }

    this.loading.set(false);
  }

  editUser(user: UserResponse): void {
    this.editingUser.set(user);
    this.model.set({ email: user.email!, name: user.name! });
  }

  cancelEdit(): void {
    this.editingUser.set(null);
    this.model.set({ email: '', name: '' });
    this.userForm().reset();
  }

  async saveUser(): Promise<void> {
    const editing = this.editingUser();

    this.error.set(null);

    await submit(this.userForm, async (field) => {
      if (editing) {
        await this.usersService.updateUser(editing.id!, field().value());
      } else {
        await this.usersService.createUser(field().value());
      }
      this.cancelEdit();
      await this.loadUsers();
    });
  }

  async delete(user: UserResponse): Promise<void> {
    this.error.set(null);

    try {
      await this.usersService.deleteUser(user.id!);
      await this.loadUsers();
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
