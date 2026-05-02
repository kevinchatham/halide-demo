import type { RequestContext, THalideApp } from 'halide';
import type { Claims, UpdateUserRequest } from 'shared';
import { updateUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

type App = THalideApp<Claims>;

export async function updateUserHandler(
  ctx: RequestContext & { body: UpdateUserRequest },
  app: App,
) {
  const id = parseUserId(ctx, app);

  const body = ctx.body;
  const user = updateUser(id, body);
  if (!user) {
    app.logger.warn({}, `User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return user;
}
