import { type ApiRoute, apiRoute } from 'halide';
import { getUsersRouteHandler, UserListSchema } from '../handlers/get-users-route.handler';
import { HealthResponseSchema, healthRouteHandler } from '../handlers/health-route.handler';
import { LoginResponseSchema, loginRouteHandler } from '../handlers/login-route.handler';

const healthRoute = apiRoute({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  openapi: {
    description: 'Check the health status of the API',
    responseSchema: HealthResponseSchema,
    responses: {
      200: { description: 'Health check passed' },
    },
    summary: 'Health check',
    tags: ['System'],
  },
  path: '/api/health',
});

const loginRoute = apiRoute({
  access: 'public',
  handler: loginRouteHandler,
  method: 'post',
  openapi: {
    description: 'Authenticate and receive a JWT bearer token',
    responseSchema: LoginResponseSchema,
    responses: {
      200: { description: 'Successfully authenticated, returns JWT token' },
    },
    summary: 'Login and get token',
    tags: ['Auth'],
  },
  path: '/api/login',
});

const getUsersRoute = apiRoute({
  access: 'private',
  handler: getUsersRouteHandler,
  method: 'get',
  openapi: {
    description: 'Get a list of all users',
    responseSchema: UserListSchema,
    responses: {
      200: { description: 'Successfully retrieved user list' },
    },
    summary: 'Get all users',
    tags: ['Users'],
  },
  path: '/api/users',
});

export const apiRoutes: ApiRoute[] = [healthRoute, loginRoute, getUsersRoute];
