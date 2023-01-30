export const promiseLimit = (ps = new Set<Promise<unknown>>()) => ({
  add: (p: Promise<unknown> | (() => Promise<unknown>)) =>
    ps.add(
      typeof p === 'function' ? p() : !!p.then(() => ps.delete(p)).catch(() => ps.delete(p)) && p
    ),
  wait: (limit: number) => ps.size >= limit && Promise.race(ps),
  all: () => Promise.all(ps),
});
