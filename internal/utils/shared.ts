export const isFunction = <
  T extends (...args: any[]) => any = (...args: any[]) => any
>(
  v: unknown
): v is T => {
  return typeof v === "function";
};

export const mergeObjects = (a: any, b?: any) => ({ ...a, ...b });
