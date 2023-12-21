// 全局组件注册   Author:Titans@2396757591@qq.com
// component
import BsBossTree from './bossTree/BossTree.vue' // 树组件  Comer
import BsTreeInput from './treeinput/BossTreeInput.vue' // treeinput树组件  Comer
import BsTreeInputTest from './common/BossTreeInputTest.vue' // Comer
import BsUpload from './Upload/BossUpload.vue' // 上传组件  Comer
import BsToolBar from './Toolbar/toolbar.vue' // 工具条：Comer
import BsUploadBak from './UploadBak/BossUploadBak.vue' // 上传组件
import BsFilePreview from './filePreview/filePreview'
import FilterNumberRange from './renderers/tableFilters/FilterNumberRange/index.vue' // 数值范围过滤器
// import FilterNumberCompare from './renderers/tableFilters/FilterNumberCompare/FilterNumberCompare.vue' // 内容过滤器:Jigsaw

import BsTableBak from './TableBak/Table.vue' // table:Titans
import BsTable1 from './TableOld/Table.vue' // table:Titans // 仅限于表格表单配置使用
import BsAnchorNav from './anchorNav/AnchorNav.vue' // 锚点组件:Titans
import BsAnchorNavOption from './anchorNav/AnchorNavOption.vue' // 锚点内容:Titans
// import BsTable2 from './Table2/Table.vue' // table:Titans developing 暂未可用
import BsBasicGradeInforTable from './basicInfoTable/BasicGradeInfoTable.vue' // 报表:Titans

import LoadingMark from './loadingmark/loadingmark.js' // 李海发
import BsAppHeader from './common/MenuList/BsAppHeader' // czb
import InvoiceTable from './InvoiceTable/InvoiceTable'// zdf
import ToolFn from './tool/util.js' // util工具类库:Titans
import AESEAD from './tool/secret.js' // 加密解密工具类:Titans
import $BsUtils from './tool/bsUtil.js' // $BsUtils工具类库:Titans
import CardMenu from './CardMenu/cardMenu.vue' // 卡片菜单  Comer
import TabSelect from './TabSelect/TabSelect.vue'
import TabSelectTwo from './TabSelect/TabSelectTwo.vue'
import TreeScollLoad from './bossTreeScollLoad/TreeScollLoad.vue'
import BsPrintDrawer from './PrintDrawer/PrintDrawer.vue' // 报表打印
import BsPrintDrawerMultiply from './PrintDrawer/PrintDrawerMultiply.vue' // 报表批量打印
import BsPrintPreview from './PrintDrawer/PrintPreview.vue' // 报表预览
import BsPrintPreviewMultiply from './PrintDrawer/PrintPreviewMultiply.vue' // 报表批量预览
import PrintPreviewMultiplyBusDept from './PrintDrawer/PrintPreviewMultiplyBusDept.vue' // 报表批量预览
import BsMutipleReport from './PrintDrawer/MutipleReport.vue' // 三个报表
import BsProgress from './Progress/Progress.vue' // 进度条
import BsDirective from './directive/index' // keep-alive:Titans
import BsFunctionalComponents from './functionalComponent/index.js' // 具体业务组件:Titans
import JsEditor from './formulaEditor/children/jsEditor/JsEditor.vue' // JsonEditor:Titans
import BsFormaleEditor from './formulaEditor/FormulaEditor.vue' // 公式编辑器:Titans
import BsPerformanceTable from './performanceTable/PerformanceTable.vue' // 绩效表:Titans
import BsPerformanceBasicInfo from './performanceTable/PerformanceBasicInfo.vue' // 绩效基础信息表:Titans
import Big from '../utils/big.js' // Big
import { setConfig, getConfig } from './GlobalConfig/index' // 组件用户自定义配置:Titans 默认配置对应组件下globleConfig 用户配置对应config/customConfig
import MofDivTree from './mofDivTree/index' // 项目中区划树统一组件
import BsEmpty from './empty/index'
import BsTreeTitle from './treeTitle/index.vue' // 树组件头
import BsTableTitle from './tableTitle/index.vue' // 表格标题
import BsThemePicker from './ThemePicker/ThemePicker.vue'
import BsOperationLog from './OperationLog/operationLog.vue'// 操作日志
import BsTemplate from './BsTemplate'
// import LocalBsTable from './Table/Table.vue' // table:Titans
const componentsLib = {
  BsBossTree,
  BsTreeInput,
  BsTreeInputTest,
  BsUpload,
  BsToolBar,
  // LocalBsTable,
  BsTableBak,
  BsTable1,
  BsUploadBak,
  BsProgress,
  // FilterNumberCompare,
  BsAppHeader,
  InvoiceTable,
  CardMenu,
  TabSelect,
  TabSelectTwo,
  TreeScollLoad,
  BsPrintDrawer,
  BsPrintDrawerMultiply,
  BsPrintPreview,
  BsPrintPreviewMultiply,
  PrintPreviewMultiplyBusDept,
  BsMutipleReport,
  BsAnchorNav,
  BsAnchorNavOption,
  BsBasicGradeInforTable,
  JsEditor,
  BsFormaleEditor,
  BsPerformanceTable,
  BsPerformanceBasicInfo,
  MofDivTree,
  BsEmpty,
  BsTreeTitle,
  BsTableTitle,
  BsFilePreview,
  FilePreview: BsFilePreview,
  BsThemePicker,
  FilterNumberRange,
  BsOperationLog,
  BsTemplate
}
const utilsLib = {
  LoadingMark,
  ToolFn,
  AESEAD,
  Big,
  ConfigOption: {
    setConfig,
    getConfig
  }
}
const install = function(Vue) {
  if (install.installed) return
  Object.keys(utilsLib).forEach(util => {
    Vue.prototype['$' + util] = utilsLib[util]
  })
  Object.keys(componentsLib).forEach(key => {
    Vue.component(key, componentsLib[key])
  })
  Vue.use(BsDirective)
  Vue.use($BsUtils)
  Vue.use(BsFunctionalComponents)
}
const Api = {
  version: 'BS-UI@0.1.0',
  install,
  componentsLib: componentsLib,
  utilsLib: utilsLib,
  ConfigOption: {
    setConfig,
    getConfig
  }
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default Api
