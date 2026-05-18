import type { RequestContext } from 'halide';
import type { App, CreateUserRequest } from 'shared';
import { createUser } from '../data/store';
import { HttpError } from '../utils/http-error';

export async function createUserHandler(
  ctx: RequestContext & { body: CreateUserRequest },
  app: App,
) {
  const body = ctx.body;
  if (!body.email || !body.name) {
    app.logger.warn({}, 'Missing required fields');
    throw new HttpError('Email and name are required', 400);
  }
  return createUser(body);
}
