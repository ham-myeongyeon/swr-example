import { SWRGlobalState } from "internal";
import { Cache, Config } from "../types";

const initProvider = (cache: Cache) => {
  const subscriptions: Record<string, ((current: any, prev: any) => void)[]> =
    {};

  const subscribe = (
    key: string,
    callback: (current: any, prev: any) => void
  ) => {
    const subs = subscriptions[key] || [];
    subscriptions[key] = subs;

    subs.push(callback);
    return () => subs.splice(subs.indexOf(callback), 1);
  };

  const setter = (key: string, value: any, prev: any) => {
    cache.set(key, value);
    const subs = subscriptions[key];
    if (subs) {
      for (const fn of subs) {
        fn(value, prev);
      }
    }
  };

  SWRGlobalState.set(cache, {
    setter,
    subscribe,
  });
};

export const initCache = (provider: Cache, config?: Config) => {
  if (!SWRGlobalState.get(provider)) {
    initProvider(provider);
    const unmount = () => {
      SWRGlobalState.delete(provider);
    };

    return { provider, initProvider, unmount };
  }

  return { provider };
};
