import { z } from 'zod';

// User schemas
export const UserSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  name: z.string(),
});
export type UserResponse = z.infer<typeof UserSchema>;

export const UserListSchema = z.array(UserSchema);
export type UserListResponse = z.infer<typeof UserListSchema>;

export const CreateUserSchema = UserSchema.omit({ id: true });
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;

// Auth schemas
export const LoginRequestSchema = z.object({
  password: z.string(),
  username: z.string(),
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  token: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export type Claims = {
  userId: string;
};

// Health schemas
export const HealthResponseSchema = z.object({
  status: z.string(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

// Utilities
export type Logger = {
  error: (msg: string) => void;
  warn: (msg: string) => void;
  info: (msg: string) => void;
  debug: (msg: string) => void;
};
