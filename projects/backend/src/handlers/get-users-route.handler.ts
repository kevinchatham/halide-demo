import type { RequestContext, THalideApp } from 'halide';
import type { Claims } from 'shared';
import { userStore } from '../data/store';
import { HttpError } from '../utils/http-error';

type App = THalideApp<Claims>;

export async function getUsersRouteHandler(_ctx: RequestContext, app: App) {
  if (userStore.length === 0) {
    app.logger.warn({ auth: 'anonymous' }, 'User store is empty');
    throw new HttpError('No users found', 404);
  }
  return userStore;
}
