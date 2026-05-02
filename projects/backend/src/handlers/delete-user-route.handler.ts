import type { RequestContext } from 'halide';
import { deleteUser } from '../data/store';
import type { Logger } from '../types';
import { HttpError } from '../utils/http-error';

export async function deleteUserHandler(ctx: RequestContext, _claims: unknown, logger: Logger) {
  const idParam = ctx.params['id'];
  if (!idParam) {
    logger.warn('Missing user ID parameter');
    throw new HttpError('Invalid user ID', 400);
  }

  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    logger.warn('Invalid user ID');
    throw new HttpError('Invalid user ID', 400);
  }

  const deleted = deleteUser(id);
  if (!deleted) {
    logger.warn(`User not found: ${id}`);
    throw new HttpError('User not found', 404);
  }

  return { success: true };
}
