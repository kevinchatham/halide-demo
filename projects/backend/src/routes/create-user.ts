import type { CreateUserRequest, UserResponse } from 'shared';
import { CreateUserSchema, UserSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { createUser } from '../data/store';

export const createUserRoute = apiRoute<CreateUserRequest, UserResponse>({
  access: 'private',
  path: '/api/users',
  method: 'post',
  requestSchema: CreateUserSchema,
  responseSchema: UserSchema,
  handler: async (ctx, _app) => createUser(ctx.body),
});
