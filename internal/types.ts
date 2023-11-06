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
type Error = Record<string | number, any>;

export interface State {
  data: Data;
  isLoading: isLoading;
  isValidating: isValidating;
  error: Error;
}
