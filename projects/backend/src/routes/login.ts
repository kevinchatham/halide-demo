import { SignJWT } from 'jose';
import type { LoginRequest, LoginResponse } from 'shared';
import { LoginResponseSchema, LoginSchema } from 'shared';
import { apiRoute } from '../app/builder';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from '../app/config';

export const loginRoute = apiRoute<LoginRequest, LoginResponse>({
  access: 'public',
  path: '/api/login',
  method: 'post',
  requestSchema: LoginSchema,
  responseSchema: LoginResponseSchema,
  handler: async () => {
    const secret = new TextEncoder().encode(DEMO_BEARER_SECRET);
    const claims = {
      userId: crypto.randomUUID(),
    };
    const token = await new SignJWT(claims)
      .setProtectedHeader({ alg: 'HS256' })
      .setAudience(DEMO_BEARER_AUDIENCE)
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    return { token };
  },
});
