import type {
  AppConfig,
  ObservabilityConfig,
  OpenApiConfig,
  SecurityConfig,
  ServerConfig,
} from 'halide';
import pkg from '../../package.json';
import { apiRoutes, proxyRoutes } from './routes';

const observability: ObservabilityConfig = {
  logger: {
    debug: (...args: unknown[]) => {
      console.log(...args);
    },
    error: (...args: unknown[]) => {
      console.log(...args);
    },
    info: (...args: unknown[]) => {
      console.log(...args);
    },
    warn: (...args: unknown[]) => {
      console.log(...args);
    },
  },
};

const openapi: OpenApiConfig = {
  enabled: true,
  options: {
    description: '',
    title: 'halide-demo-angular',
    version: pkg.version,
  },
  path: '/swagger',
};

const security: SecurityConfig = {
  cors: {
    credentials: true,
    origin: ['http://localhost:4200'],
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
