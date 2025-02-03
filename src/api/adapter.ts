/* eslint-disable @typescript-eslint/no-explicit-any */
const snakeToCamel = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );

const camelToSnake = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const convertKeys = (obj: any, converter: (str: string) => string): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeys(item, converter));
  }

  return Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    const newKey = converter(key);
    result[newKey] = convertKeys(value, converter);
    return result;
  }, {} as Record<string, any>);
};

export const snakeToCamelObject = (obj: any): any =>
  convertKeys(obj, snakeToCamel);

export const camelToSnakeObject = (obj: any): any =>
  convertKeys(obj, camelToSnake);
