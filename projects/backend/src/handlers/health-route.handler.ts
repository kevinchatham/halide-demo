import { z } from 'zod';

export const HealthResponseSchema = z.object({
  status: z.string(),
});

export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export async function healthRouteHandler(): Promise<HealthResponse> {
  return { status: 'ok' };
}
