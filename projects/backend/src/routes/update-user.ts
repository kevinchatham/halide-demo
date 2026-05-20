import type { UpdateUserRequest, UserResponse } from 'shared';
import { UpdateUserSchema, UserSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { updateUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export const updateUserRoute = apiRoute<UpdateUserRequest, UserResponse>({
  access: 'private',
  path: '/api/users/:id',
  requestSchema: UpdateUserSchema,
  responseSchema: UserSchema,
  handler: async (ctx, app) => {
    const id = parseUserId(ctx, app);
    const user = updateUser(id, ctx.body);
    if (!user) {
      app.logger.warn({}, `User not found: ${id}`);
      throw new HttpError('User not found', 404);
    }
    return user;
  },
});
