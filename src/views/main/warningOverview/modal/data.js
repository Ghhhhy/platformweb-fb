export const citys = ['陕西省', '西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市', '杨陵区', '西咸新区']
export const citysMap = [
  { name: '陕西省', key: 'sxCount' },
  { name: '西安市', key: 'xaCount' },
  { name: '铜川市', key: 'tcCount' },
  { name: '宝鸡市', key: 'bjCount' },
  { name: '咸阳市', key: 'xyCount' },
  { name: '渭南市', key: 'wnCount' },
  { name: '延安市', key: 'yaCount' },
  { name: '汉中市', key: 'hzCount' },
  { name: '榆林市', key: 'ylCount' },
  { name: '安康市', key: 'akCount' },
  { name: '商洛市', key: 'slCount' },
  { name: '杨陵区', key: 'ylqCount' },
  { name: '西咸新区', key: 'xxxqCount' }
]

// 位置固定不可改变对应 接口字段命名顺序
export const menus = ['基础信息', '项目库', '预算编制', '预算批复', '预算调整调剂', '预算执行', '会计核算', '决算和报告', '直达资金', '转移支付', '地方债', '三保']
export const menuMap = menus.map((item, index) => {
  const suffix = (index + 1) < 10 ? `0${index + 1}` : `${index + 1}`
  return { name: item, key: `warnCount${suffix}` }
})

export const menuModelData = [
  { code: '0204', name: '三保', postion: { top: '362px', left: '18px' } },
  { code: '0107', name: '会计核算', isOpen: true, postion: { top: '250px', left: '50px' }, report: ['/StatisticalFormsByCompartmentHs', '/StatisticalFormsByRankHs', '/StatisticalFormsByRuleHs'] },
  { code: '0203', name: '地方债务管理', postion: { top: '436px', left: '212px' } },
  { code: '0202', name: '转移支付', postion: { top: '88px', left: '94px' } },
  { code: '0103', name: '预算编制', postion: { top: '249px', left: '288px' } },
  { code: '0102', name: '项目库管理', postion: { top: '327px', left: '448px' } },
  { code: '0104', name: '预算调整调剂', postion: { top: '72px', left: '308px' } },
  { code: '0105', name: '预算批复', postion: { top: '172px', left: '480px' } },
  { code: '0106', name: '预算执行', isOpen: true, postion: { top: '238px', left: '622px' }, report: ['/StatisticalFormsByCompartment', '/StatisticalFormsByRank', '/StatisticalFormsByRule'] },
  { code: '0108', name: '决算和报告', postion: { top: '0px', left: '464px' } },
  { code: '0101', name: '基础信息管理', postion: { top: '82px', left: '610px' } },
  { code: '0201', name: '直达资金', postion: { top: '386px', left: '644px' } }
]

export const getViewAllRuleSelectOption = () => {
  return [
    { label: '按区划', value: 1 },
    { label: '按月份', value: 2 }
  ]
}
