import type { RequestContext } from 'halide';
import type { App } from 'shared';
import { userStore } from '../data/store';
import { HttpError } from '../utils/http-error';

export async function getUsersRouteHandler(_ctx: RequestContext, app: App) {
  if (userStore.length === 0) {
    app.logger.warn({}, 'User store is empty');
    throw new HttpError('No users found', 404);
  }
  return userStore;
}
