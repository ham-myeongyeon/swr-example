import { mergeObjects } from "./shared";
import { defaultConfig } from "./config";
import { useContext } from "react";
import { SWRConfigContext } from "./config-context";

export const useSWRConfig = () => {
  return mergeObjects(defaultConfig, useContext(SWRConfigContext));
};
