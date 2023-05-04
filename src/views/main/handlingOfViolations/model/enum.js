import store from '@/store'
import transJson from '@/utils/transformMenuQuery.js'
/**
 * 由于该项目未接入ts，以下内容为模拟枚举
 */

/**
 * 主题列表
 * @type {[{code: string, label: string, suffix: string}, {code: string, label: string, suffix: string}]}
 */
export const regulationClassOptions = [
  { code: '', suffix: '', label: '通用主题' },
  { code: '0207', suffix: 'BySpe', label: '专项主题' }
]

/**
 * 页面（路由）来源枚举
 * @type {{DIVISION_AUDIT: string, DEPARTMENT_AUDIT: string, UNIT_FEEDBACK: string, UNIT_AUDIT: string, DEPARTMENT_REAUDIT: string, DIVISION_REAUDIT: string}}
 */
export const RouterPathEnum = () => {
  const enumMap = {
    // 监控预警单位反馈
    UNIT_FEEDBACK: '/unitFeedback',
    // 监控预警单位审核
    UNIT_AUDIT: '/unitAudit',
    // 监控预警主管部门初审
    DEPARTMENT_AUDIT: '/departmentAudit',
    // 监控预警主管部门复审
    DEPARTMENT_REAUDIT: '/departmentReAudit',
    // 监控预警处室初审
    DIVISION_AUDIT: '/divisionAudit',
    // 监控预警处室复审
    DIVISION_REAUDIT: '/divisionReAudit'
  }

  const regulationClass = transJson(store.state?.curNavModule?.param5)?.regulationClass
  Object.keys(enumMap).forEach(key => {
    enumMap[key] += regulationClassOptions.find(item => item.code === regulationClass)?.suffix || ''
  })

  return enumMap
}

/**
 * 打开弹窗类型
 * @type {{AUDIT: number, PREVIEW: number}}
 */
export const ModalTypeEnum = {
  // 处理
  AUDIT: '1',
  // 查看
  PREVIEW: '2'
}

/**
 * tab枚举
 * @type {{NO_SEND: number, DISABLED: number, RETURN: number, ALL: number, NO_AUDIT: number, SENDED: number, AUDITED: number}}
 */
export const TabEnum = {
  // 未送审
  NO_SEND: '1',
  // 已送审
  SENDED: '2',
  // 未审核
  NO_AUDIT: '1',
  // 已审核
  AUDITED: '2',
  // 已退回
  RETURN_SELF: '3',
  // 被退回
  RETURN: '4',
  // 已作废
  VOIDED: '5',
  // 被禁止
  DISABLED: '16',
  // 已禁止
  DISABLED_SELF: '18',
  // 全部 -> useTable-beforeFetch 过滤All的值
  ALL: 'all'
}

/**
 * 操作类型
 * @type {{ACTION_RETURN: string, ACTION_DISABLED: string, ACTION_AUDIT: string}}
 */
export const ActionTypeEnum = {
  // 审核 | 送审
  ACTION_AUDIT: '2',
  // 退回
  ACTION_RETURN: '6',
  // 禁止
  ACTION_DISABLED: '7'
}

/**
 * 预警级别枚举
 * @type {{RED: string, BLUE: string, YELLOW: string, ORANGE: string}}
 */
export const WarnLevelEnum = {
  // 红色预警
  RED: '1',
  // 橙色预警
  ORANGE: '2',
  // 黄色预警
  YELLOW: '3',
  // 蓝色预警
  BLUE: '4'
}

/**
 * 文件状态
 * @type {{}}
 */
export const FileStatusEnum = {
  // 保留
  RETAIN: 1,
  // 丢弃
  ABANDON: 2
}
