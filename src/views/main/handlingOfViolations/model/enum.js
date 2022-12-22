/**
 * 由于该项目未接入ts，以下内容为模拟枚举
 */

/**
 * 页面（路由）来源枚举
 * @type {{DIVISION_AUDIT: string, DEPARTMENT_AUDIT: string, UNIT_FEEDBACK: string, UNIT_AUDIT: string, DEPARTMENT_REAUDIT: string, DIVISION_REAUDIT: string}}
 */
export const RouterPathEnum = {
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
  NO_AUDIT: '3',
  // 已审核
  AUDITED: '4',
  // 被退回
  RETURN: '5',
  // 被禁止
  DISABLED: '6',
  // 全部 -> useTable-beforeFetch 过滤All的值
  ALL: '7'
}

/**
 * 预警级别枚举
 * @type {{RED: string, BLUE: string, YELLOW: string, ORANGE: string}}
 */
export const WarnLevelEnum = {
  // 黄色预警
  YELLOW: '1',
  // 橙色预警
  ORANGE: '2',
  // 红色预警
  RED: '3',
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