import type { AppConfig, OpenApiConfig, SecurityConfig, ServerConfig } from 'halide';
import { createObservabilityConfig, routes } from 'shared';
import pkg from '../package.json';
import { apiRoutes, proxyRoutes } from './routes';

const observability = createObservabilityConfig('[angular]');

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
    directives: {
      defaultSrc: ["'self'"],
      formAction: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
};

const app: AppConfig = {
  name: 'angular',
  root: `dist/angular/browser`,
};

export const config: ServerConfig = {
  apiRoutes,
  app,
  observability,
  openapi,
  proxyRoutes,
  security,
};
