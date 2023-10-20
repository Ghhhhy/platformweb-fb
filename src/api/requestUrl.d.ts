interface BSURL {
  lmp_workflowOversightManagement:string,
  lmp_mofDivTree:string,//直达资金左侧树结构
  dfr_warningResultHandleRulePageQueryFlow:string,//流程监督列表查询
  api_simpleTreeWhere:string//平台树接口
}
declare global { // 全局变量设置
  interface Window {
    BSURL:BSURL
  }
}



