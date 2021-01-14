import { camelCase, isEmpty } from "lodash";

interface AnyObject {
  [propName: string]: any;
}

export const objectToCamelCase = (obj: AnyObject) => {
  const result: AnyObject = {};
  Object.keys(obj).forEach((oldKey) => {
    const newKey = camelCase(oldKey);
    const child = obj[oldKey];
    result[newKey] = child;
    if (Array.isArray(result[newKey]) && !isEmpty(result[newKey])) {
      result[newKey] = result[newKey].map((item: AnyObject) => {
        if (item instanceof Object && !isEmpty(item)) {
          return objectToCamelCase(item);
        }
        return item;
      });
    } else if (result[newKey] instanceof Object && !isEmpty(result[newKey])) {
      result[newKey] = objectToCamelCase(result[newKey]);
    }
  });

  return result;
};
