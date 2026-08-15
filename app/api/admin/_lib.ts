import { createHash, createHmac } from 'node:crypto';

export const ADMIN_COOKIE = 'mahadev_admin_session';

const digest = (value: string) => createHash('sha256').update(value).digest();

export function safeEqual(left: string, right: string) {
  return digest(left).equals(digest(right));
}

export function createSession(email: string) {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = `${email}|${expires}`;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}|${signature}`;
}

export function isValidSession(value: string | undefined) {
  if (!value) return false;
  const [email, expiresText, signature] = value.split('|');
  const secret = process.env.ADMIN_SESSION_SECRET;
  const expectedEmail = process.env.ADMIN_EMAIL;
  if (!email || !expiresText || !signature || !secret || !expectedEmail) return false;
  const expires = Number(expiresText);
  if (!Number.isFinite(expires) || expires < Date.now() || email !== expectedEmail) return false;
  const payload = `${email}|${expiresText}`;
  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  return safeEqual(signature, expected);
}
