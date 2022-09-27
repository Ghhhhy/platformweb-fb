/**
 * 合并
 * @description *数组项直接替换*
 * @param target
 * @param origin
 */
export function merge(target, origin) {
  for (let key in origin) {
    if (typeof origin[key] !== 'object') {
      target[key] = origin[key]
    } else if (Array.isArray(origin[key])) {
      target[key] = origin[key]
    } else {
      merge(target[key], origin[key])
    }
  }
}
