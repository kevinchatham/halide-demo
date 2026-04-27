import type { ObservabilityConfig, ServerConfig, SpaConfig } from 'halide';
import { healthRoute } from './routes';

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

const spa: SpaConfig = {
  name: 'backend',
  port: 3000,
  root: 'src/public',
};

export const config: ServerConfig = {
  apiRoutes: [healthRoute],
  observability,
  spa,
};
