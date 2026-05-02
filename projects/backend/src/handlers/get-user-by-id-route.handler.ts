import type { RequestContext } from 'halide';
import type { Logger } from 'shared';
import { getUserById } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export async function getUserByIdHandler(ctx: RequestContext, _claims: unknown, logger: Logger) {
  const id = parseUserId(ctx, logger);

  const user = getUserById(id);
  if (!user) {
    logger.warn(`User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return user;
}
