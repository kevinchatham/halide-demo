import { type ApiRoute, apiRoute } from 'halide';
import { routes } from 'shared';
import { createUserHandler } from '../handlers/create-user-route.handler';
import { deleteUserHandler } from '../handlers/delete-user-route.handler';
import { getUserByIdHandler } from '../handlers/get-user-by-id-route.handler';
import { getUsersRouteHandler } from '../handlers/get-users-route.handler';
import { healthRouteHandler } from '../handlers/health-route.handler';
import { loginRouteHandler } from '../handlers/login-route.handler';
import { updateUserHandler } from '../handlers/update-user-route.handler';
import {
  type Claims,
  type CreateUserRequest,
  CreateUserSchema,
  type HealthResponse,
  HealthResponseSchema,
  type LoginRequest,
  LoginRequestSchema,
  type LoginResponse,
  LoginResponseSchema,
  type UpdateUserRequest,
  UpdateUserSchema,
  type UserListResponse,
  UserListSchema,
  type UserResponse,
  UserSchema,
} from '../types';

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
  requestSchema: LoginRequestSchema,
  responseSchema: LoginResponseSchema,
});

const getUsersRoute = apiRoute<Claims, unknown, UserListResponse>({
  access: 'private',
  handler: getUsersRouteHandler,
  method: 'get',
  path: routes.users,
  responseSchema: UserListSchema,
});

const getUserByIdRoute = apiRoute<Claims, unknown, UserResponse>({
  access: 'private',
  handler: getUserByIdHandler,
  method: 'get',
  path: routes.userById(':id'),
});

const createUserRoute = apiRoute<Claims, CreateUserRequest, UserResponse>({
  access: 'private',
  handler: createUserHandler,
  method: 'post',
  path: routes.users,
  requestSchema: CreateUserSchema,
  responseSchema: UserSchema,
});

const updateUserRoute = apiRoute<Claims, UpdateUserRequest, UserResponse>({
  access: 'private',
  handler: updateUserHandler,
  method: 'put',
  path: routes.userById(':id'),
  requestSchema: UpdateUserSchema,
  responseSchema: UserSchema,
});

const deleteUserRoute = apiRoute<Claims, unknown, { success: boolean }>({
  access: 'private',
  handler: deleteUserHandler,
  method: 'delete',
  path: routes.userById(':id'),
});

// TypeScript cannot express "an array of ApiRoute where each route carries its own generics"
//
// Two fields make ApiRoute contravariant in TClaims (function parameters are contravariant):
//
// 1. `handler`: claims: TClaims | undefined appears in parameter position
// 2. `authorize`: claims: TClaims | undefined appears in parameter position
//
// When routes are collected into an array typed as ApiRoute[], TypeScript erases each
// route's individual generics. ApiRoute<any, any>[] is used as a permissive container,
// but this is not equivalent to "existential generics" — TypeScript lacks that feature.
//
// Per-route generics are preserved at the apiRoute() factory call site.
//
// biome-ignore lint/suspicious/noExplicitAny: see above
export const apiRoutes: ApiRoute<any, any>[] = [
  healthRoute,
  loginRoute,
  getUsersRoute,
  getUserByIdRoute,
  createUserRoute,
  updateUserRoute,
  deleteUserRoute,
];
