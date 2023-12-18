import {
  useContext,
  useMemo,
  createContext,
  createElement,
  useEffect,
  useRef,
} from "react";
import { defaultConfig } from "./config";
import { mergeObjects } from "./shared";
import { initCache } from "internal";
import type { Config } from "../types";

export const SWRConfigContext = createContext({});

export const SWRConfig: React.FC<{ value: Config }> = (props) => {
  const { value } = props;
  const parentConfig = useContext(SWRConfigContext);
  const config = useMemo(() => value, [parentConfig, value]);
  // Extend parent context values and middleware.
  const extendedConfig = useMemo(
    () => mergeObjects(parentConfig, config),
    [parentConfig, config]
  );

  // const provider = config && config.provider;

  // initialize the cache only on first access.
  // if (provider && !cacheContextRef.current) {
  //   cacheContextRef.current = initCache(
  //     provider((extendedConfig as any).cache || defaultCache),
  //     config
  //   );
  // }

  const cacheContextRef = useRef<ReturnType<typeof initCache> | null>(null);
  const cacheContext = cacheContextRef.current;

  // Override the cache if a new provider is given.
  if (cacheContext) {
    const { provider } = cacheContext;

    (extendedConfig as any).cache = provider;
    // (extendedConfig as any).mutate = mutate;
  }

  // Unsubscribe events.
  useEffect(() => {
    if (cacheContext) {
      const { provider, initProvider, unmount } = cacheContext;

      initProvider && initProvider(provider);
      return unmount;
    }
  }, []);

  return createElement(
    SWRConfigContext.Provider,
    mergeObjects(props, {
      value: extendedConfig,
    })
  );
};
