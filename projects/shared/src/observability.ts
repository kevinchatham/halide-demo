import type { ObservabilityConfig, THalideApp } from 'halide';
import type { Claims, LogScope } from './types';

type App = THalideApp<Claims>;

export const observabilityConfig: ObservabilityConfig<App> = {
  onRequest(ctx, app) {
    const authInfo = app.claims ? `authenticated user` : `anonymous`;
    app.logger.info(
      { auth: authInfo, method: ctx.method, path: ctx.path } as LogScope,
      `Request received`,
    );
  },
  onResponse(ctx, app, response) {
    app.logger.info(
      {
        body: response.body,
        durationMs: response.durationMs,
        method: ctx.method,
        path: ctx.path,
        statusCode: response.statusCode,
      } as LogScope,
      `Response sent`,
    );
  },
  requestId: true,
};
