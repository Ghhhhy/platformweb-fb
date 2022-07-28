/**
 * @description 深度合并对象
 * @param target 目标对象
 * @param source 源对象
 * @return 目标对象
*/
export const deepMergeObject = (target, source) => {
  for (const key in source) {
    if (key.hasOwnProperty) {
      target[key] =
        target[key] && typeof target[key] === 'object'
          ? deepMergeObject(target[key], source[key])
          : (target[key] = source[key])
    }
  }
  return target
}
