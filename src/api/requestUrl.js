// 统一管理 不要在单独去建立文件夹以及文件
// 命名规则  服务(代理)的缩写_后端具体server  eg：lmp_workflowOversightManagement: 'large-monitor-platform/lmp/ruleClassify/pageQuery'
const BSURL = {
  // large-monitor-platform/lmp  大监控
  lmp_workflowOversightManagement: 'large-monitor-platform/lmp/ruleClassify/pageQuery',
  lmp_mofDivTree: 'large-monitor-platform/lmp/mofDivTree',

  // dfr-monitor-service/dfr 直达资金
  dfr_warningResultHandleRulePageQueryFlow: 'dfr-monitor-service/dfr/warningResultHandleRule/pageQueryFlow',

  // mp-b-basedata-service 平台
  api_simpleTreeWhere: 'mp-b-basedata-service/v2/basedata/simpletree/where'

}
export {
  BSURL
}
