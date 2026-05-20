import type { AppConfig, OpenApiConfig, SecurityConfig, ServerConfig } from 'halide';
import { type Claims, type LogScope, observability, routes } from 'shared';
import pkg from '../../package.json';
import { apiRoutes } from '../routes';

export const DEMO_BEARER_SECRET = 'this-is-a-super-secure-secret-demo-use-only';
export const DEMO_BEARER_AUDIENCE = 'halide-demo';

const openapi: OpenApiConfig = {
  enabled: true,
  options: {
    description: '',
    title: 'halide-demo-backend',
    version: pkg.version,
  },
  path: routes.docs,
};

const security: SecurityConfig = {
  auth: {
    audience: DEMO_BEARER_AUDIENCE,
    secret: () => DEMO_BEARER_SECRET,
    strategy: 'bearer',
  },
  cors: {
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:3553'],
  },
};

const app: AppConfig = {
  name: 'backend',
  port: 3000,
};

export const config: ServerConfig<Claims, LogScope> = {
  apiRoutes,
  app,
  observability,
  openapi,
  security,
};
