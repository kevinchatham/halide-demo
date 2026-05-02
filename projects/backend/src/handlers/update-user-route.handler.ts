import type { RequestContext } from 'halide';
import type { Logger, UpdateUserRequest } from 'shared';
import { updateUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export async function updateUserHandler(
  ctx: RequestContext & { body: UpdateUserRequest },
  _claims: unknown,
  logger: Logger,
) {
  const id = parseUserId(ctx, logger);

  const body = ctx.body;
  const user = updateUser(id, body);
  if (!user) {
    logger.warn(`User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return user;
}
