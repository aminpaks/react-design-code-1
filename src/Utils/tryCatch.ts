type RT<T> = T extends (...args: unknown[]) => infer R ? R : T;

export const tryCatch = <T extends () => unknown, U>(
  fn: T,
  fallback: U
): NonNullable<RT<T>> | RT<U> => {
  try {
    const result = fn() as NonNullable<RT<T>>;
    if (result != null) {
      return result;
    }
  } catch {}

  return typeof fallback === 'function' ? fallback() : fallback;
};
