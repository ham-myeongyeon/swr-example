import { SWRGlobalState, createCacheHelper, getTimeStamp } from "internal";
import { GlobalState, State } from "internal/types";
import { Fetcher, Key } from "../types";
import { createFactory } from "react";

export const revalidate = (cache: Cache, key: string, fetcher: Fetcher) => {
  if (!key || !fetcher) return false;

  let newData: Data;
  let startAt: number;
  let loading = true;

  const { getCache, setCache } = createCacheHelper(cache, key);

  const { FETCHER } = SWRGlobalState.get(cache);

  const startNewRequest = !FETCHER?.[key];

  try {
    let state = { isValidating: true };

    if (!getCache().data) {
      state.isLoading = true;
    }

    if (startNewRequest) {
      setCache(state);

      FETCHER[key] = [fetcher(key), getTimeStamp()];

      [newData, startAt] = FETCHER[key];

      finishRequestAndUpdateState(newData, cache, key);
    }
  } catch (err) {
    cleanupState(FETCHER, key, startAt);
  }
};

const finishRequestAndUpdateState = (
  newData: any,
  cache: Cache,
  key: string
) => {
  const { setCache } = createCacheHelper(cache, key);
  setCache({
    data: newData,
    isLoading: false,
    isValidating: false,
    error: undefined,
  });
};

const cleanupState = (
  currentFetcher: Record<string, [any, number]>,
  key: string,
  startAt: number
) => {
  const requestInfo = currentFetcher?.[key];
  if (requestInfo && requestInfo[1] === startAt) {
    delete currentFetcher[key];
  }
};
