import type { RequestContext } from 'halide';
import type { App } from 'shared';
import { HttpError } from './http-error';

export function parseUserId(ctx: RequestContext, app: App): number {
  const idParam = ctx.params['id'];
  if (!idParam) {
    app.logger.warn({}, 'Missing user ID parameter');
    throw new HttpError('Invalid user ID', 400);
  }

  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    app.logger.warn({}, 'Invalid user ID');
    throw new HttpError('Invalid user ID', 400);
  }

  return id;
}
