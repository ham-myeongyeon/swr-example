import { SWRGlobalState } from "internal";
import type { Config } from "internal/types";
import { Key, Fetcher } from "./types";

export const useSWRHandler = (key: Key, fetcher: Fetcher, config: Config) => {
  const { cache } = config;
  const { state } = SWRGlobalState.get(cache);

  const { data, isLoading, isValidating, error } = state;

  return {
    data,
    isLoading,
    isValidating,
    error,
  };
};

const useSWR = useSWRHandler;

export default useSWR;
