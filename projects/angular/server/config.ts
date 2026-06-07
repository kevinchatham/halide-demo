import type { AppConfig, OpenApiConfig, SecurityConfig, ServerConfig } from 'halide';
import { type Claims, type LogScope, observability, routes } from 'shared';
import pkg from '../package.json';
import { apiRoutes, proxyRoutes } from './routes';

const openapi: OpenApiConfig = {
  enabled: true,
  options: {
    description: '',
    title: 'halide-demo-angular',
    version: pkg.version,
  },
  path: routes.docs,
};

const security: SecurityConfig = {
  cors: {
    credentials: true,
    origin: ['http://localhost:4200'],
  },
  csp: {
    defaultSrc: ["'self'"],
    formAction: ["'self'"],
    imgSrc: ["'self'", 'data:'],
    objectSrc: ["'none'"],
    scriptSrc: ["'self'"],
    scriptSrcAttr: ["'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
  },
};

const app: AppConfig = {
  name: 'angular',
  root: `dist/angular/browser`,
};

export const config: ServerConfig<Claims, LogScope> = {
  apiRoutes,
  app,
  observability,
  openapi,
  proxyRoutes,
  security,
};
