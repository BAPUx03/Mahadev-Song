import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidSession } from '../_lib';

export async function GET() {
  const cookieStore = await cookies();
  const valid = isValidSession(cookieStore.get(ADMIN_COOKIE)?.value);
  return NextResponse.json({ authenticated: valid }, { status: valid ? 200 : 401 });
}
