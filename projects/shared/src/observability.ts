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
    requestId: true,
  };
}
