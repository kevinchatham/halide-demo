import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  id: z.number(),
  name: z.string(),
});

export const UserListSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;

export type UserList = z.infer<typeof UserListSchema>;

export async function getUsersRouteHandler(): Promise<User[]> {
  return [
    { email: 'alice@example.com', id: 1, name: 'Alice' },
    { email: 'bob@example.com', id: 2, name: 'Bob' },
    { email: 'charlie@example.com', id: 3, name: 'Charlie' },
  ];
}
