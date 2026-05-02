import type { RequestContext } from 'halide';
import type { Logger } from 'shared';
import { deleteUser } from '../data/store';
import { HttpError } from '../utils/http-error';
import { parseUserId } from '../utils/parse-user-id';

export async function deleteUserHandler(ctx: RequestContext, _claims: unknown, logger: Logger) {
  const id = parseUserId(ctx, logger);

  const deleted = deleteUser(id);
  if (!deleted) {
    logger.warn(`User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return { success: true };
}
