import type z from 'zod';
import type {
  CreateUserSchema,
  HealthResponseSchema,
  LoginResponseSchema,
  LoginSchema,
  UpdateUserSchema,
  UserListSchema,
  UserSchema,
} from './user';

export type LogScope = {
  requestId?: string;
  method?: string;
  path?: string;
  statusCode?: number;
  durationMs?: number;
  body?: unknown;
  auth?: string;
  error?: Error;
};

export type Claims = {
  userId: string;
};

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type HealthResponse = z.infer<typeof HealthResponseSchema>;
export type LoginRequest = z.infer<typeof LoginSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type UserListResponse = z.infer<typeof UserListSchema>;
export type UserResponse = z.infer<typeof UserSchema>;
