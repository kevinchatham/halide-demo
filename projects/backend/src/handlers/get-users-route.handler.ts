import type { RequestContext } from 'halide';
import type { Logger } from 'shared';
import { userStore } from '../data/store';
import { HttpError } from '../utils/http-error';

export async function getUsersRouteHandler(_ctx: RequestContext, _claims: unknown, logger: Logger) {
  if (userStore.length === 0) {
    logger.warn('User store is empty');
    throw new HttpError('No users found', 404);
  }
  return userStore;
}
