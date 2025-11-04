import { SignJWT } from 'jose';

export async function generateToken(user: { id: number; userName: string; isAdmin: boolean }) {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({
    sub: String(user.id),
    userName: user.userName,
    isAdmin: user.isAdmin,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey);

  return token;
}
