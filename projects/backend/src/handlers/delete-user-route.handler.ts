import type { RequestContext, THalideApp } from 'halide';
import type { Claims } from 'shared';
import { deleteUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

type App = THalideApp<Claims>;

export async function deleteUserHandler(ctx: RequestContext, app: App) {
  const id = parseUserId(ctx, app);

  const deleted = deleteUser(id);
  if (!deleted) {
    app.logger.warn({}, `User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return { success: true };
}
