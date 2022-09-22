export const common = {
  login: '',
  menu: 'http://10.100.3.151:9003', // 菜单
  platform: 'http://10.100.3.151:9003', // 登录的下拉接口IP
  unitTree: 'http://10.100.3.129:8166',
  leftTree: 'http://10.100.3.129:8166', // 左侧公共树
  dropMenu: 'http://10.100.3.129:8166' // 下拉菜单
}
// 基础信息
export const basicInfo = {
  // 人员信息管理
  personManage: {
    PersonInfoManage: 'http://10.100.3.129:8074', // 人员信息维护
    PersonInfoCheckBusiness: 'http://10.100.3.129:8074', // 人员信息审核（业务处）
    PersonInfoCheckSuper: 'http://10.100.3.129:8074' // 人员信息审核（主管部门)
  },
  // 单位信息管理
  unitInfoManage: {
    UnitInfoMaintain: 'http://10.100.3.129:8058', // 单位信息维护(预算管理)
    UnitInfoCheckSuper: 'http://10.100.3.129:8058', // 单位信息审核（主管部门）
    UnitInfoCheckBusiness: 'http://10.100.3.129:8058', // 单位信息审核（业务处）
    UnitInfoCheckBudget: 'http://10.100.3.129:8058', // 单位信息审核（预算处）
    UnitConfirmNums: 'http://10.100.3.129:8058', // 单位确认人数导入（预算处）
    BudgetUnitChange: 'http://10.100.3.129:8058' // 预算单位变更（预算处）
  },
  // 支出标准管理
  standardManage: {
    PayStandardPerson: 'http://10.100.3.238:8073', // 支出标准维护（人员公用标准）
    PayStandardNoPerson: 'http://10.100.3.238:8073', // 支出标准维护（非人员公用标准）
    PayStandardCheck: 'http://10.100.3.238:8073' // 支出标准审核（非人员公用标准）
  }
}

// 基础信息-预算编制管理
export const budgetPlan = {

}

//  项目库管理
export const projectLib = {
  // 项目基础信息管理
  projectBaseInfoManage: {
    FunctionMaintain: 'http://10.100.2.145:8091', // 职能职责维护
    ProjectCalcTemplate: '', // 项目测算模版维护
    ProjectTags: 'http://10.100.2.145:8091', // 项目标签维护
    SpecialFundsAuthor: 'http://10.100.3.165:8091', // 专项资金目录授权
    SpecialFundsList: 'http://10.100.3.165:8091', // 专项资金目录维护
    TaskTemplate: '', // 任务模版维护
    ProjectCheckSuper: 'http://10.100.3.64:8091', // 项目审核（主管部门）
    ProjectReserve: 'http://10.100.2.145:8091',
    FiscalConfig: 'http://10.100.2.145:8166'
  },
  // 项目申报管理
  projectDeclarationManage: {

  }
}

// const sermap = {
//   'mp-b-perm-service': {
//     dev: 'http://10.100.3.151:9003',
//     pro: 'http://10.100.3.151:9003',
//     apiurl: 'fiscal-config'
//   }
// }
