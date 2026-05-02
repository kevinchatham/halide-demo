import type { RequestContext, THalideApp } from 'halide';
import type { Claims } from 'shared';
import { getUserById } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

type App = THalideApp<Claims>;

export async function getUserByIdHandler(ctx: RequestContext, app: App) {
  const id = parseUserId(ctx, app);

  const user = getUserById(id);
  if (!user) {
    app.logger.warn({}, `User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return user;
}
