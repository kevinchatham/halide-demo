import type { RequestContext } from 'halide';
import type { App, UserResponse } from 'shared';
import { UserSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { getUserById } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export const getUserByIdRoute = apiRoute<void, UserResponse>({
  access: 'private',
  path: '/api/users/:id',
  responseSchema: UserSchema,
  handler: async (ctx: RequestContext, app: App) => {
    const id = parseUserId(ctx, app);
    const user = getUserById(id);
    if (!user) {
      app.logger.warn({}, `User not found: ${id}`);
      throw new HttpError('User not found', 404);
    }
    return user;
  },
});
