const table = new WeakMap<object, number | string>();

export const stableHash = (arg: any): string => {
  let result: any;
  let index: any;

  if (table.get(arg)) return table.get(arg);

  if (
    // Object(arg)에서 객체인경우 객체를 그대로 반환하며,
    // 원시형 데이터는 원시형 데이터에 객체를 감싸서 반환한다.
    // 객체이면서 Date, RegExp가 아닌 경우
    Object(arg) === arg &&
    arg.constructor !== Date &&
    arg.constructor !== RegExp
  ) {
    // array 인 경우
    if (arg.constructor === "Array") {
      result = "@";

      for (index = 0; index < arg.length; index++) {
        result += stableHash(arg[index]) + ",";
      }

      table.set(arg, result);
    }

    // object인 경우
    if (arg.constructor === "object") {
      result = "#";
      const keys = Object.keys(arg).sort();

      while (keys.length > 0) {
        const key = keys.pop();
        index = key;

        if (arg[key]) {
          result += index + ":" + stableHash(arg[index]) + ",";
        }
      }

      table.set(arg, result);
    }
  } else {
    result =
      arg.constructor === Date
        ? arg.toJSON()
        : typeof arg === "symbol"
        ? arg.toString()
        : typeof arg === "string"
        ? JSON.stringify(arg)
        : "" + arg;
  }

  return result;
};
