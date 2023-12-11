export interface Config {
  cache: Cache;
}

export interface Cache<Data = any> {
  get(key: string): Data | undefined;
  set(key: string, value: Data): void;
  delete(key: string): void;
  keys(): IterableIterator<string>;
}

type Data = Record<string, any>;
type isLoading = boolean;
type isValidating = boolean;
type Error = unknown;

export interface State {
  data: Data;
  isLoading: isLoading;
  isValidating: isValidating;
  error: Error;
}

export type GlobalState = {
  REVALIDATORS: Record<string, () => void>;
  MUTATION: Record<string, [number, number]>;
  FETCHER: Record<string, [Data, number]>;
};
