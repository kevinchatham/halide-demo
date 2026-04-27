import { SignJWT } from 'jose';
import { z } from 'zod';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from '../app/const.js';

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export async function loginRouteHandler(): Promise<LoginResponse> {
  const secret = new TextEncoder().encode(DEMO_BEARER_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setAudience(DEMO_BEARER_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return { token };
}
