import type { ObservabilityConfig } from 'halide';
import type { Claims, LogScope } from './types';

export const observability: ObservabilityConfig<Claims, LogScope> = {
  logScopeFactory: (ctx, claims) => ({
    auth: claims ? 'authenticated user' : 'anonymous',
    method: ctx.method,
    path: ctx.path,
  }),
  onRequest(_ctx, app) {
    app.logger.info({}, `Request received`);
  },
  onResponse(_ctx, app, _response) {
    app.logger.info({}, `Response sent`);
  },
  requestId: true,
};
