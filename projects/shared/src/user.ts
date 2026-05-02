import { z } from 'zod';

export const LoginSchema = z.object({
  password: z.string().min(1),
  username: z.string().min(1),
});
export type LoginRequest = z.infer<typeof LoginSchema>;

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
