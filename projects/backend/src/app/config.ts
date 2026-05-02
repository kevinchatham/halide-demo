import type {
  AppConfig,
  ObservabilityConfig,
  OpenApiConfig,
  SecurityConfig,
  ServerConfig,
} from 'halide';
import pkg from '../../package.json';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from './const';
import { apiRoutes } from './routes';

const observability: ObservabilityConfig<{ userId: string }> = {
  logger: {
    debug: (...args: unknown[]) => {
      console.log('[DEBUG]', ...args);
    },
    error: (...args: unknown[]) => {
      console.log('[ERROR]', ...args);
    },
    info: (...args: unknown[]) => {
      console.log('[INFO]', ...args);
    },
    warn: (...args: unknown[]) => {
      console.log('[WARN]', ...args);
    },
  },
  requestId: true,
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
    origin: ['http://localhost:4200', 'http://localhost:3553'],
  },
  csp: {
    directives: {
      defaultSrc: ["'self'"],
      formAction: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      upgradeInsecureRequests: [],
    },
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
