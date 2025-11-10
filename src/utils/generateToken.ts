import { SignJWT } from 'jose';

export async function generateToken(user: { id: number; userName: string; isAdmin: boolean }) {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

  return await new SignJWT({
    userName: user.userName,
    isAdmin: user.isAdmin,
  })
    .setSubject(String(user.id))
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '7d')
    .sign(secretKey);
}
