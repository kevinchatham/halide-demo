import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export interface LoginRequest {
  password: string;
  username: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'halide_demo_token';
  private readonly API_URL = '/api';
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(localStorage.getItem(this.TOKEN_KEY));
  readonly isAuthenticated = signal<boolean>(!!localStorage.getItem(this.TOKEN_KEY));

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.API_URL}/login`, { password, username }),
      );
      localStorage.setItem(this.TOKEN_KEY, response.token);
      this.token.set(response.token);
      this.isAuthenticated.set(true);
      return true;
    } catch {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
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
