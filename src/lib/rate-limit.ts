const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function prune(now: number): void {
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
}

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; retryAfterSeconds: number };

export function checkLoginAttempt(key: string): RateLimitResult {
  const now = Date.now();
  if (store.size > 1000) prune(now);

  const entry = store.get(key);
  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1 };
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_ATTEMPTS - entry.count };
}

export function resetLoginAttempt(key: string): void {
  store.delete(key);
}

export const loginRateLimit = { MAX_ATTEMPTS, WINDOW_MS };
