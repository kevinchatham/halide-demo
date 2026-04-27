import { type ApiRoute, apiRoute } from 'halide';
import { getUsersRouteHandler } from '../handlers/get-users-route.handler';
import { healthRouteHandler } from '../handlers/health-route.handler';
import { loginRouteHandler } from '../handlers/login-route.handler';

const healthRoute = apiRoute({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: '/api/health',
});

const loginRoute = apiRoute({
  access: 'public',
  handler: loginRouteHandler,
  method: 'post',
  path: '/api/login',
});

const getUsersRoute = apiRoute({
  access: 'private',
  handler: getUsersRouteHandler,
  method: 'get',
  path: '/api/users',
});

export const apiRoutes: ApiRoute[] = [healthRoute, loginRoute, getUsersRoute];
