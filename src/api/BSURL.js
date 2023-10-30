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
  /* ==========================dfr-monitor-service/dfr 直达资金    ========================== */
  dfr_warningResultHandleRulePageQueryFlow: 'dfr-monitor-service/dfr/warningResultHandleRule/pageQueryFlow',
  dfr_supervisionQuery: 'dfr-monitor-service/dfr/supervision/query',
  dfr_supervisionPageQuery: 'dfr-monitor-service/dfr/supervision/pageQuery',
  dfr_benefitEnterprisesAndPeoplePageQueryFfb: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/pageQueryFfb', // 直达资金项目台账_惠企利民发放表明细查询
  dfr_benefitPeoplePageQuery: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/queryBenefitImportData', // 惠企利民支付明细导入_明细数据查询
  dfr_benefitPeoplePagePayQuery: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/queryPayCertInfo', // 惠企利民支付明细导入_支付凭证数据查询
  dfr_benefitPeopleNotHook: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/notHookBenefitImport', // 惠企利民支付明细导入_取消挂接
  dfr_benefitPeopleDelete: 'dfr-monitor-service/dfr/benefitEnterprisesAndPeople/deleteBenefitData', // 惠企利民支付明细导入_删除惠企明细数据
  // mp-b-basedata-service 平台
  api_simpleTreeWhere: 'mp-b-basedata-service/v2/basedata/simpletree/where'

}
export {
  BSURL
}
