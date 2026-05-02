import type { RequestContext } from 'halide';
import type { Logger } from 'shared';
import { HttpError } from './http-error';

export function parseUserId(ctx: RequestContext, logger: Logger): number {
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

  return id;
}
