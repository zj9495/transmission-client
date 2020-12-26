import { camelCase, isEmpty } from "lodash"

interface obj {
  [propName: string]: any;
}

export const objectToCamelCase = (obj: obj) => {
  const result:obj = {}
  Object.keys(obj).forEach(oldKey => {
    const newKey = camelCase(oldKey)
    const child = obj[oldKey]
    result[newKey] = child
    if (result[newKey] instanceof Array && !isEmpty(result[newKey])) {
      result[newKey] = result[newKey].map((item:obj) => {
        if (item instanceof Object && !isEmpty(item)) {
          return objectToCamelCase(item)
        }
        return item
      })
    } else if (result[newKey] instanceof Object && !isEmpty(result[newKey])) {
      result[newKey] = objectToCamelCase(result[newKey])
    }
  })

  return result
}