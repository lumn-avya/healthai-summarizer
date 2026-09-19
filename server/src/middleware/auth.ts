import type { Request } from 'express';

export function getUserId(req: Request): string {
  const value = req.header('x-user-id')?.trim();
  return value && /^[a-zA-Z0-9_-]{1,100}$/.test(value) ? value : 'demo-user';
}
