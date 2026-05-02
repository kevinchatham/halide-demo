import { SignJWT } from 'jose';
import { DEMO_BEARER_AUDIENCE, DEMO_BEARER_SECRET } from '../app/const';

export async function loginRouteHandler() {
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
}
