import { Key } from "../types";
import { isFunction, stableHash } from "internal";

export const serialize = (key: Key): [string, Key] => {
  if (isFunction(key)) {
    try {
      key = key();
    } catch (err) {
      key = "";
    }
  }

  const args = key;

  key =
    typeof key === "string"
      ? key
      : (Array.isArray(key) ? key.length : key)
      ? stableHash(key)
      : "";

  return [key, args];
};
