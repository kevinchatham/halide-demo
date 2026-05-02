import type { ObservabilityConfig } from 'halide';

export function createObservabilityConfig(prefix = ''): ObservabilityConfig {
  return {
    logger: {
      debug: (...args: unknown[]) => {
        console.log(`${prefix}[DEBUG]`, ...args);
      },
      error: (...args: unknown[]) => {
        console.log(`${prefix}[ERROR]`, ...args);
      },
      info: (...args: unknown[]) => {
        console.log(`${prefix}[INFO]`, ...args);
      },
      warn: (...args: unknown[]) => {
        console.log(`${prefix}[WARN]`, ...args);
      },
    },
    onRequest(ctx, claims, logger) {
      const authInfo = claims ? `authenticated user` : `anonymous`;
      logger.info(`${ctx.method.toUpperCase()} ${ctx.path} - ${authInfo}`);
    },
    onResponse(ctx, claims, response, logger) {
      if (response.error) {
        logger.error(
          `${ctx.method.toUpperCase()} ${ctx.path} - ${response.statusCode} (${response.durationMs}ms) - ${response.error.message}`,
        );
      } else {
        logger.info(
          `${ctx.method.toUpperCase()} ${ctx.path} - ${response.statusCode} (${response.durationMs}ms)`,
        );
      }
    },
    requestId: true,
  };
}
