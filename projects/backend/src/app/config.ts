import type {
  ObservabilityConfig,
  OpenApiConfig,
  SecurityConfig,
  ServerConfig,
  SpaConfig,
} from 'halide';
import pkg from '../../package.json';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from './const';
import { apiRoutes } from './routes';

const observability: ObservabilityConfig = {
  logger: {
    debug: (...args: unknown[]) => {
      console.log(args);
    },
    error: (...args: unknown[]) => {
      console.log(args);
    },
    info: (...args: unknown[]) => {
      console.log(args);
    },
    warn: (...args: unknown[]) => {
      console.log(args);
    },
  },
};

const openapi: OpenApiConfig = {
  enabled: true,
  options: {
    description: '',
    title: 'halide-demo-backend',
    version: pkg.version,
  },
  path: '/swagger',
};

const security: SecurityConfig = {
  auth: {
    audience: DEMO_BEARER_AUDIENCE,
    secret: () => DEMO_BEARER_SECRET,
    strategy: 'bearer',
  },
  cors: {
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:3553', 'http:localhost:3000'],
  },
};

const spa: SpaConfig = {
  name: 'backend',
  port: 3000,
  root: 'src/public',
};

export const config: ServerConfig = {
  apiRoutes,
  observability,
  openapi,
  security,
  spa,
};
