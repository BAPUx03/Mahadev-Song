import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createSession, safeEqual } from '../_lib';

export async function POST(request: Request) {
  const { email, password } = await request.json().catch(() => ({}));
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedEmail || !expectedPassword || !process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json({ message: 'Admin credentials are not configured on the server.' }, { status: 503 });
  }
  if (typeof email !== 'string' || typeof password !== 'string' || !safeEqual(email, expectedEmail) || !safeEqual(password, expectedPassword)) {
    return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 });
  }
  const session = createSession(email);
  if (!session) return NextResponse.json({ message: 'Admin session is not configured.' }, { status: 503 });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, session, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return NextResponse.json({ ok: true });
}
