/**
 * js不支持枚举，以下为模拟枚举
 */
// 监控情况 监控处室
export const SelectEnum = {
  BY_DEPARTMENT: '1',
  BY_SECTION: '2',
  BY_UNIT: '3'
}
export const getViewClassifySelectOption = () => {
  return [
    { label: '按业务处室', value: SelectEnum.BY_DEPARTMENT },
    { label: '按部门', value: SelectEnum.BY_SECTION },
    { label: '按单位', value: SelectEnum.BY_UNIT }
  ]
}
// 监控情况 主管处室
export const SelectMainEnum = {
  BY_SECTION: 1,
  BY_UNIT: 2
}
export const getViewClassifyMainSelectOption = () => {
  return [
    { label: '按部门', value: SelectMainEnum.BY_SECTION },
    { label: '按单位', value: SelectMainEnum.BY_UNIT }
  ]
}

// 监控情况 单位
export const SelectUnitEnum = {
  BY_RULE: 1
}
export const getViewClassifyUnitSelectOption = () => {
  return [
    { label: '按规则', value: SelectUnitEnum.BY_RULE }
  ]
}

// 专项支付进度分析
export const LeftEnum = {
  BY_ALL: 1,
  BY_DEPARTMENT: 2,
  BY_UNIT: 3
}
export const getViewLeftSelectOption = () => {
  return [
    { label: '全辖', value: LeftEnum.BY_ALL },
    { label: '按部门', value: LeftEnum.BY_DEPARTMENT },
    { label: '按单位', value: LeftEnum.BY_UNIT }
  ]
}
export const RightEnum = {
  BY_ALL: 1,
  BY_DEPARTMENT: 2,
  BY_UNIT: 3
}
export const getViewRightSelectOption = () => {
  return [
    { label: '2021', value: RightEnum.BY_ALL },
    { label: '2022', value: RightEnum.BY_DEPARTMENT },
    { label: '2023', value: RightEnum.BY_UNIT }
  ]
}
// 监控预警多维度分析
export const WarnEnum = {
  BY_FUND: 1,
  BY_RULE: 2
}
export const getViewWarnSelectOption = () => {
  return [
    { label: '按资金', value: WarnEnum.BY_FUND },
    { label: '按规则', value: WarnEnum.BY_RULE }
  ]
}

// 预警类型
export const WarnTypeEnum = {
  // 绿色预警 -> 正常
  GREEN: 0,
  // 红色预警 -> 预警
  RED: 1
}

// 地图获取数据的类型
export const RegulationClassEnum = {
  // 三保
  THREE_GUARANTEES_EXPENDITURE: '0204',
  // 三公
  THREE_PUBLIC_EXPENSES: '0205'
}
