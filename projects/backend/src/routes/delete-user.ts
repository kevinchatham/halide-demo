import type { RequestContext } from 'halide';
import type { App, DeleteUserResponse } from 'shared';
import { DeleteUserResponseSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { deleteUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export const deleteUserRoute = apiRoute<void, DeleteUserResponse>({
  access: 'private',
  path: '/api/users/:id',
  responseSchema: DeleteUserResponseSchema,
  handler: async (ctx: RequestContext, app: App) => {
    const id = parseUserId(ctx, app);
    const user = deleteUser(id);
    if (!user) {
      app.logger.warn({}, `User not found: ${id}`);
      throw new HttpError('User not found', 404);
    }
    return { success: true };
  },
});
