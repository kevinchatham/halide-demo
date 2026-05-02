import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { type LoginResponse, routes } from 'shared';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'halide_demo_token';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  readonly isAuthenticated = signal<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

  async login(username?: string, password?: string): Promise<boolean> {
    if (!username || !password) return false;

    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(routes.login, { password, username }),
      );

      if (!response.token) return false;

      sessionStorage.setItem(this.TOKEN_KEY, response.token);
      this.token.set(response.token);
      this.isAuthenticated.set(true);
      return true;
    } catch {
      return false;
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.token.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.token();
    if (!token) return {};
    return { Authorization: `Bearer ${token}` };
  }
}
