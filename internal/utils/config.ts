import { stableHash, initCache } from "internal";

const noop = () => {};

const compare = (currentData: any, newData: any) =>
  stableHash(currentData) == stableHash(newData);
``;

const [cache] = initCache(new Map());

export const defaultConfig = {
  // events
  onLoadingSlow: noop,
  onSuccess: noop,
  onError: noop,
  // onErrorRetry,
  onDiscarded: noop,

  // switches
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  revalidateIfStale: true,
  shouldRetryOnError: true,

  // timeouts
  // errorRetryInterval: slowConnection ? 10000 : 5000,
  focusThrottleInterval: 5 * 1000,
  dedupingInterval: 2 * 1000,
  // loadingTimeout: slowConnection ? 5000 : 3000,

  // providers
  compare,
  isPaused: () => false,
  cache,
  // mutate,
  fallback: {},
};
