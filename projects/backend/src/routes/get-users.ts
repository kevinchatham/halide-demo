import type { RequestContext } from 'halide';
import type { App, UserListResponse } from 'shared';
import { UserListSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { userStore } from '../data/store';
import { HttpError } from '../utils/http-error';

export const getUsersRoute = apiRoute<void, UserListResponse>({
  access: 'private',
  path: '/api/users',
  responseSchema: UserListSchema,
  handler: async (_ctx: RequestContext, app: App) => {
    if (userStore.length === 0) {
      app.logger.warn({});
      throw new HttpError('No users found', 404);
    }
    return userStore;
  },
});
