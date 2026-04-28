import { type ApiRoute, apiRoute } from 'halide';
import {
  getUsersRouteHandler,
  type UserList,
  UserListSchema,
} from '../handlers/get-users-route.handler';
import {
  type HealthResponse,
  HealthResponseSchema,
  healthRouteHandler,
} from '../handlers/health-route.handler';
import {
  type Claims,
  type LoginRequest,
  LoginRequestSchema,
  type LoginResponse,
  LoginResponseSchema,
  loginRouteHandler,
} from '../handlers/login-route.handler';

const healthRoute = apiRoute<unknown, unknown, HealthResponse>({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: '/api/health',
  responseSchema: HealthResponseSchema,
});

const loginRoute = apiRoute<unknown, LoginRequest, LoginResponse>({
  access: 'public',
  handler: loginRouteHandler,
  method: 'post',
  path: '/api/login',
  requestSchema: LoginRequestSchema,
  responseSchema: LoginResponseSchema,
});

const getUsersRoute = apiRoute<Claims, unknown, UserList>({
  access: 'private',
  handler: getUsersRouteHandler,
  method: 'get',
  path: '/api/users',
  responseSchema: UserListSchema,
});

// biome-ignore lint/suspicious/noExplicitAny: group
export const apiRoutes: ApiRoute<any, any>[] = [healthRoute, loginRoute, getUsersRoute];
