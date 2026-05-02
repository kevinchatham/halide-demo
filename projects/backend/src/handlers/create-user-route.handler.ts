import type { RequestContext } from 'halide';
import type { CreateUserRequest, Logger } from 'shared';
import { createUser } from '../data/store';
import { HttpError } from '../utils/http-error';

export async function createUserHandler(
  ctx: RequestContext & { body: CreateUserRequest },
  _claims: unknown,
  logger: Logger,
) {
  const body = ctx.body;
  if (!body.email || !body.name) {
    logger.warn('Missing required fields');
    throw new HttpError('Email and name are required', 400);
  }
  return createUser(body);
}
