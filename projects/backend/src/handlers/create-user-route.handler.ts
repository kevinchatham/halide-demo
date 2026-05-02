import type { RequestContext, THalideApp } from 'halide';
import type { Claims, CreateUserRequest } from 'shared';
import { createUser } from '../data/store';
import { HttpError } from '../utils/http-error';

type App = THalideApp<Claims>;

export async function createUserHandler(
  ctx: RequestContext & { body: CreateUserRequest },
  app: App,
) {
  const body = ctx.body;
  if (!body.email || !body.name) {
    app.logger.warn({ body }, 'Missing required fields');
    throw new HttpError('Email and name are required', 400);
  }
  return createUser(body);
}
