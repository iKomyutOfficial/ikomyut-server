export function excludeFields<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  fields: K[],
): Omit<T, K> {
  const result = { ...obj };

  for (const field of fields) {
    delete result[field];
  }

  return result;
}
