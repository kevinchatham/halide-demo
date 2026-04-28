import { SignJWT } from 'jose';
import { z } from 'zod';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from '../app/const.js';

export type Claims = {
  userId: string;
};

export const LoginRequestSchema = z.object({
  password: z.string(),
  username: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export async function loginRouteHandler(): Promise<LoginResponse> {
  const secret = new TextEncoder().encode(DEMO_BEARER_SECRET);
  const claims: Claims = {
    userId: crypto.randomUUID(),
  };
  const token = await new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setAudience(DEMO_BEARER_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return { token };
}
