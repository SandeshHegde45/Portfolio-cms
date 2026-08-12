export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";

export function getExpectedSessionValue() {
  return process.env.ADMIN_SESSION_SECRET || "dev-session-secret";
}

export function getExpectedPassword() {
  return process.env.ADMIN_PASSWORD || "admin123";
}
