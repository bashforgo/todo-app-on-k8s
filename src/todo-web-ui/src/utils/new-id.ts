const ids = new Map<string, number>();

export const newId = (prefix: string): string => {
  const next = (ids.get(prefix) ?? -1) + 1;
  ids.set(prefix, next);
  return [prefix, next].join('-');
};
