import { camelCase, kebabCase, isEmpty } from "lodash";

export const objectToCamelCase = (obj: Record<string, any>) => {
  const result: Record<string, any> = {};
  Object.keys(obj).forEach((oldKey) => {
    const newKey = camelCase(oldKey);
    const child = obj[oldKey];
    result[newKey] = child;
    if (Array.isArray(result[newKey]) && !isEmpty(result[newKey])) {
      result[newKey] = result[newKey].map((item: Record<string, any>) => {
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

export const objectToKebabCase = (
  obj: Record<string, any>,
  exclude?: string[]
) => {
  const result: Record<string, any> = {};
  exclude = exclude || [];

  Object.keys(obj).forEach((oldKey) => {
    const isExclude = exclude?.includes(oldKey);
    const newKey = isExclude ? oldKey : kebabCase(oldKey);

    const child = obj[oldKey];
    result[newKey] = child;
    if (Array.isArray(result[newKey]) && !isEmpty(result[newKey])) {
      result[newKey] = result[newKey].map((item: Record<string, any>) => {
        if (item instanceof Object && !isEmpty(item)) {
          return objectToKebabCase(item, exclude);
        }
        return item;
      });
    } else if (result[newKey] instanceof Object && !isEmpty(result[newKey])) {
      result[newKey] = objectToKebabCase(result[newKey], exclude);
    }
  });

  return result;
};
