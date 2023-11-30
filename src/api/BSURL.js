/*
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-18 10:41:08
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-29 18:07:48
 * @FilePath: \platformweb-fb\src\api\BSURL.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 统一管理 不要在单独去建立文件夹以及文件
// 命名规则  服务(代理)的缩写_后端具体server  eg：lmp_workflowOversightManagement: 'large-monitor-platform/lmp/ruleClassify/pageQuery'
const BSURL = {
  /* ==========================large-monitor-platform/lmp  大监控  ========================== */
  lmp_workflowOversightManagement: 'large-monitor-platform/lmp/ruleClassify/pageQuery',
  lmp_mofDivTree: 'large-monitor-platform/lmp/mofDivTree',
  lmp_warningResultHandleRuleQueryDetail: 'large-monitor-platform/lmp/loginLog/queryDetail',
  lmp_executeWarnWarnInfos: 'large-monitor-platform/lmp/executeWarn/warnInfos', // 监控主题分析  预警明细查询 表格table查询
  lmp_executeWarnPayDiBillInfo: 'large-monitor-platform/lmp/executeWarn/payDiBillInfo', // 福建-预算执行-监控预警明细查询
  lmp_guaranteedSalaryNotice: 'large-monitor-platform/lmp/three/guaranteedSalaryNotice', // 保工资预警提醒
  lmp_dictionary_violationTypePageQuery: 'large-monitor-platform/lmp/violationType/pageQuery', // 字典 违规处室生成  获取违规类型枚举
  lmp_totalWarnAdd: 'large-monitor-platform/lmp/totalWarn/add', // 福建 违规处理单生成
  lmp_totalWarnPageQueryForCreate: 'large-monitor-platform/lmp/totalWarn/pageQueryForCreate', // 福建 监控处理单生成  分页查询页面
  lmp_totalWarnCreateUpdate: 'large-monitor-platform/lmp/totalWarn/createUpdate', // 福建 监控处理单生成  生成工作流接口
  lmp_totalWarnPageQueryForCreateCount: 'large-monitor-platform/lmp/totalWarn/pageQueryForCreateCount', // 福建 监控处理单生成 数量查询
  lmp_executeWarnGetDetail: 'large-monitor-platform/lmp/executeWarn/getDetail/', // 预算执行 查看违规明细信息
  lmp_workFlowWorkFlowUpdate: 'large-monitor-platform/lmp/workFlow/workFlowUpdate', // 事后工作流 违规处理弹窗 更新状态
  lmp_businessFunctionsList: 'large-monitor-platform/lmp/businessFunctions/list', // 监控白名单  获取业务模块
  lmp_ruleClassifyTree: 'large-monitor-platform/lmp/ruleClassify/tree/', // 获取监控主题列表
  lmp_regulationDetail: 'large-monitor-platform/lmp/regulation/detail/', // 获取规则详情信息
  lmp_regulationDetailfj: 'large-monitor-platform/lmp/regulation/detailfj/', // 福建 获取规则详情信息
  lmp_transferBudgetProjectShowButton: 'large-monitor-platform/lmp/payReportConfig/queryConfig', // 本级预算项目和上级转移预算项目新增按钮功能 初始化按钮
  lmp_transferBudgetProjectSwitchButton: 'large-monitor-platform/lmp/payReportConfig/updateConfig', // 本级预算项目和上级转移预算项目新增按钮功能 切换按钮
  lmp_regulationsDetail: 'large-monitor-platform/lmp/regulations/detail', // 获取主题详情列表
  lmp_commomGetCurrentTime: 'large-monitor-platform/lmp/commom/getCurrentTime', // 获取服务器时间

  /* ==========================dfr-monitor-service/dfr 直达资金    ========================== */
  dfr_warningResultHandleRulePageQueryFlow: 'dfr-monitor-service/dfr/warningResultHandleRule/pageQueryFlow',
  dfr_supervisionQuery: 'dfr-monitor-service/dfr/supervision/query', // 陕西 通用报表查询
  dfr_supervisionPageQuery: 'dfr-monitor-service/dfr/supervision/pageQuery', // 陕西 通用报表查询 分页模式
  dfr_supervisionSum: 'dfr-monitor-service/dfr/supervision/sum', // 陕西 通用报表查询合计行
  dfr_benefitEnterprisesAndPeoplePageQueryFfb: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/pageQueryFfb', // 直达资金项目台账_惠企利民发放表明细查询
  dfr_benefitPeoplePageQuery: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/queryBenefitImportData', // 惠企利民支付明细导入_明细数据查询
  dfr_benefitPeoplePagePayQuery: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/queryPayCertInfo', // 惠企利民支付明细导入_支付凭证数据查询
  dfr_benefitPeopleNotHook: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/notHookBenefitImport', // 惠企利民支付明细导入_取消挂接
  dfr_benefitPeopleDelete: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/deleteBenefitData', // 惠企利民支付明细导入_删除惠企明细数据
  dfr_zdzjledgerExportData: 'dfr-monitor-service/dfr/zdzjledger/exportData', // 报表明细钻取大数据（>50w）导出接口

  // 平台  文件服务
  api_fileservice_v2_files: 'fileservice/v2/files', // 平台获取文件列表

  // mp-b-perm-service 平台  权限服务
  api_tableconfMenuguid: 'mp-b-perm-service/v1/tableconf/menuguid', // 平台 获取菜单配置的动态表格列表
  api_tableconf: 'mp-b-perm-service/v1/tableconf', // 平台 查询单个动态表单JSON配置项

  // mp-b-basedata-service 平台 基础服务接口
  api_v2Dicds: 'mp-b-basedata-service/v2/dicds', // 平台 函数值字典
  api_v2Basedata: 'mp-b-basedata-service/v2/basedata', // 平台 规则设置 查询要素信息字典

  // 预算   eg: bgt_xxx: 'budget/api/budget'
  bgt_transferBudgetProjectGetLeftData: 'budget/api/budget/bisProject/project/pmProjectInfo/fj/querySpeProjectDetail' // 本级预算项目获取左侧表格数据

}
export {
  BSURL
}
