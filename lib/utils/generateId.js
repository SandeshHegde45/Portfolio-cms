export function generateId(prefix) {
  const randomPart =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(16).slice(2, 10);

  return `${prefix}-${randomPart}`;
}
