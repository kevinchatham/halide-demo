import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  type CreateUserRequest,
  CreateUserSchema,
  routes,
  type UpdateUserRequest,
  UpdateUserSchema,
  type UserResponse,
} from 'shared';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly http = inject(HttpClient);

  async getUsers(): Promise<UserResponse[]> {
    return firstValueFrom(this.http.get<UserResponse[]>(routes.users));
  }

  async createUser(data: CreateUserRequest): Promise<UserResponse> {
    const parsed = CreateUserSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Validation failed: ${parsed.error.errors.map((e) => e.message).join(', ')}`);
    }
    return firstValueFrom(this.http.post<UserResponse>(routes.users, parsed.data));
  }

  async updateUser(id: number, data: UpdateUserRequest): Promise<UserResponse> {
    const parsed = UpdateUserSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(`Validation failed: ${parsed.error.errors.map((e) => e.message).join(', ')}`);
    }
    return firstValueFrom(this.http.put<UserResponse>(routes.userById(id), parsed.data));
  }

  async deleteUser(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(routes.userById(id)));
  }
}
