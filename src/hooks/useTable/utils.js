/**
 * 获取每个action的label
 * @param action
 * @param params
 * @returns {string}
 */
export function getActionLabel(action, params) {
  let label = action.label
  if (action?.label && typeof action.label === 'function') {
    label = action.label(params) || ''
  }
  return label
}

/**
 * 获取每个action的class
 * @param action
 * @param params
 * @returns {*[]}
 */
export function getClass(action, params) {
  const classList = []
  // 提供动态配置（可根据params信息动态设置class）
  if (action?.class && typeof action.class === 'function') {
    action.calss = action.class(params) || ''
  }
  if (typeof action.class === 'string') {
    classList.push(action.class)
  } else if (Array.isArray(action.class)) {
    classList.push(...action.class)
  }
  return classList
}

/**
 * 过滤不显示的action
 * @param columnActions
 * @returns {*|*[]}
 */
export function fliterActions(columnActions, params) {
  return columnActions?.filter(item => {
    if (typeof item.show === 'function') {
      return item.show(params)
    }
    return item?.show !== undefined ? !!item.show : true
  }) || []
}

/**
 * 深层取值（例如res.data.a.b）
 * @param data
 * @param defaultKey
 * @return {T|*}
 */
export function transformFetchData(data, defaultKey = 'records') {
  const keys = defaultKey?.split('.')
  if (!keys.length) {
    return data
  }
  return keys.reduce((res, key) => {
    return res[key]
  }, data)
}
