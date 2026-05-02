import { z } from 'zod';

export const LoginSchema = z.object({
  password: z.string().min(1),
  username: z.string().min(1),
});

export const UserSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  name: z.string(),
});

export const UserListSchema = z.array(UserSchema);
export const CreateUserSchema = UserSchema.omit({ id: true });

export const UpdateUserSchema = CreateUserSchema.partial();

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export const HealthResponseSchema = z.object({
  status: z.string(),
});
