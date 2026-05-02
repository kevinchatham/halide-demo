import { type ApiRoute, apiRoute, type THalideApp } from 'halide';
import {
  type Claims,
  type CreateUserRequest,
  CreateUserSchema,
  type HealthResponse,
  HealthResponseSchema,
  healthRouteHandler,
  type LoginRequest,
  type LoginResponse,
  LoginResponseSchema,
  LoginSchema,
  routes,
  type UpdateUserRequest,
  UpdateUserSchema,
  type UserListResponse,
  UserListSchema,
  type UserResponse,
  UserSchema,
} from 'shared';
import { createUserHandler } from '../handlers/create-user-route.handler';
import { deleteUserHandler } from '../handlers/delete-user-route.handler';
import { getUserByIdHandler } from '../handlers/get-user-by-id-route.handler';
import { getUsersRouteHandler } from '../handlers/get-users-route.handler';
import { loginRouteHandler } from '../handlers/login-route.handler';
import { updateUserHandler } from '../handlers/update-user-route.handler';

type App = THalideApp<Claims>;

const healthRoute = apiRoute<unknown, unknown, HealthResponse>({
  access: 'public',
  handler: healthRouteHandler,
  method: 'get',
  path: routes.health,
  responseSchema: HealthResponseSchema,
});

const loginRoute = apiRoute<unknown, LoginRequest, LoginResponse>({
  access: 'public',
  handler: loginRouteHandler,
  method: 'post',
  path: routes.login,
  requestSchema: LoginSchema,
  responseSchema: LoginResponseSchema,
});

const getUsersRoute = apiRoute<App, unknown, UserListResponse>({
  access: 'private',
  handler: getUsersRouteHandler,
  method: 'get',
  path: routes.users,
  responseSchema: UserListSchema,
});

const getUserByIdRoute = apiRoute<App, unknown, UserResponse>({
  access: 'private',
  handler: getUserByIdHandler,
  method: 'get',
  path: routes.userById(':id'),
});

const createUserRoute = apiRoute<App, CreateUserRequest, UserResponse>({
  access: 'private',
  handler: createUserHandler,
  method: 'post',
  path: routes.users,
  requestSchema: CreateUserSchema,
  responseSchema: UserSchema,
});

const updateUserRoute = apiRoute<App, UpdateUserRequest, UserResponse>({
  access: 'private',
  handler: updateUserHandler,
  method: 'put',
  path: routes.userById(':id'),
  requestSchema: UpdateUserSchema,
  responseSchema: UserSchema,
});

const deleteUserRoute = apiRoute<App, unknown, { success: boolean }>({
  access: 'private',
  handler: deleteUserHandler,
  method: 'delete',
  path: routes.userById(':id'),
});

export const apiRoutes: ApiRoute<App>[] = [
  healthRoute,
  loginRoute,
  getUsersRoute,
  getUserByIdRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute,
];
