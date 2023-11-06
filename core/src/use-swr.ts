import { SWRGlobalState } from "internal";

export const useSWRHandler = (key, fetcher, config) => {
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
