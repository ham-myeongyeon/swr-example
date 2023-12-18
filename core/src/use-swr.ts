import { useEffect, useCallback, useRef } from "react";
import { SWRGlobalState, useSWRConfig } from "internal";
import type { Config } from "internal/types";
import { Key, Fetcher } from "./types";
import { revalidate } from "./utils/revalidate";
import { serialize } from "./utils/serialize";
import { mergeObjects } from "internal/utils/shared";

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
  const { state } = SWRGlobalState.get(cache);
  const fetcherRef = useRef<Fetcher>(fetcher);

  const { data, isLoading, isValidating, error } = state;

  const memoizedRevalidate = useCallback(() => {
    return revalidate(fnArg, fetcherRef.current);
  }, [key, cache]);

  useEffect(() => {
    memoizedRevalidate();
  }, []);

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
