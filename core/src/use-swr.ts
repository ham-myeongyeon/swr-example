import { useEffect, useCallback, useRef, useSyncExternalStore } from "react";
import { SWRGlobalState, createCacheHelper, useSWRConfig } from "internal";
import type { Config, State } from "internal/types";
import { Key, Fetcher } from "./types";
import { revalidate } from "./utils/revalidate";
import { serialize } from "./utils/serialize";
import { mergeObjects } from "internal/utils/shared";
import { isEqual } from "lodash";

const withArgs = (hook: any) => {
  return function useSWRArgs(...args: any) {
    const fallbackConfig = useSWRConfig();

    const [_key, _fetcher, _config] = args;
    const config = mergeObjects(fallbackConfig, _config);

    return hook(_key, _fetcher, config);
  };
};

export const useSWRHandler = (_key: Key, fetcher: Fetcher, config: Config) => {
  const { cache } = config;
  const [key, fnArg] = serialize(_key);
  const fetcherRef = useRef<Fetcher>(fetcher);
  const { getCache, subscribeCache } = createCacheHelper(cache, key);

  const cached = useSyncExternalStore<State>(
    (callback: () => void) => () => {
      subscribeCache(key, (current: State, prev: State) => {
        if (!isEqual(current, prev)) {
          callback();
        }
      });
    },
    () => getCache()
  );

  const memoizedRevalidate = useCallback(() => {
    return revalidate(cache, fnArg, fetcherRef.current);
  }, [fnArg, fetcherRef?.current, cache]);

  useEffect(() => {
    memoizedRevalidate();
  }, []);

  const { data, isLoading, isValidating, error } = cached;

  return {
    data,
    isLoading,
    isValidating,
    error,
  };
};

const useSWR = withArgs(useSWRHandler);

// export const SWRConfig = Object.defineProperty(ConfigProvider, "defaultValue", {
//   value: defaultConfig,
// }) as typeof ConfigProvider & {
//   defaultValue: FullConfiguration;
// };

export default useSWR;
