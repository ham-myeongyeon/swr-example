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
