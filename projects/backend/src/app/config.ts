import type { AppConfig, OpenApiConfig, SecurityConfig, ServerConfig } from 'halide';
import { createObservabilityConfig, routes } from 'shared';
import pkg from '../../package.json';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from './const';
import { apiRoutes } from './routes';

const observability = createObservabilityConfig('[backend]');

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

export const config: ServerConfig<{ userId: string }> = {
  apiRoutes,
  app,
  observability,
  openapi,
  security,
};
