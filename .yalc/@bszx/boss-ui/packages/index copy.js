/*
 * @Description: 
 * @Author: Comer
 * @Date: 2023-03-27 14:44:58
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-27 14:44:58
 */

import './theme/index.js'

//************vxeTable相关******************/
// import VXETable from 'vxe-table'
import VXETable from '@bszx/bs-vxe-table'  // 本地仓库vxe-table，做了部分定制化修改，支持合计行放在首行  src/plugin/UI.js的引入要和这个对应，否则无法注册组件
import '@bszx/bs-vxe-table/lib/index.css'
import XEUtils from 'xe-utils'
import renders from './renderers/index.js'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginExcel from 'vxe-table-plugin-excel'
import globalRenders from './Table/src/config/render/index'

//************ElementUI相关******************/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import Sortable from 'sortablejs'
import lodash from 'lodash'
import $BsUtils from './tools/bsUtil.js' // $BsUtils工具类库:Titans
import directives from './tools/directives/index.js' // $BsUtils工具类库:Titans
import buildInfo from '../package.json'

//************组件******************/
import Crumbs from './Crumbs/index.js'
import Dialog from './Dialog/index.js'
import Form from './Form/index.js'
import FormLayout from './FormLayout/index.js'
import JsonEditor from './JsonEditor/index.js'
import KeepAlive from './KeepAlive/index.js'
import MainFormListLayout from './MainFormListLayout/index.js'
import OperationLog from './OperationLog/index.js'
import QuickNav from './QuickNav/index.js'
import Query from './Query/index.js'
import TabKeepRouter from './TabKeepRouter/index.js'
import Table from './Table/index.js'
import TableForm from './TableForm/index.js'
import TabPanel from './TabPanel/index.js'
import Title from './Title/index.js'
import Tree from './Tree/index.js'
import TreeSet from './TreeSet/index.js'
import TreeTable from './TreeTable/index.js'
import HeaderNav from './HeaderNav/index.js'
import Tab from './Tab/index.js'
import Cron from './Cron/index.js'
import ModalTransfer from './Transfer/index.js'
// import QuickNavTree from './QuickNavTree/index.js'
import macroFn from './tools/macroFn.js' // 宏函数
import BigNumber from './tools/big.js'
import EvalCall from './tools/Eval.js'

const vxeTable = {
  install: function (Vue) {
    for (let i in globalRenders) {
      VXETable.renderer.add(i, globalRenders[i])
    }
    VXETable.setup({
      icon: {
        TABLE_FILTER_NONE: 'base-font baseicon-shaixuan-moren',
        TABLE_FILTER_MATCH: 'base-font baseicon-shaixuan-moren'
      }
    })
    VXETable.use(VXETablePluginMenus)
    VXETable.use(VXETablePluginExportXLSX)
    VXETable.use(VXETablePluginElement)
    VXETable.use(VXETablePluginExcel)
    Vue.use(VXETable)
  }
}

let components =
  [
    Crumbs,
    Dialog,
    Form,
    FormLayout,
    JsonEditor,
    KeepAlive,
    MainFormListLayout,
    OperationLog,
    QuickNav,
    Query,
    TabKeepRouter,
    Table,
    TableForm,
    TabPanel,
    Title,
    Tree,
    TreeSet,
    TreeTable,
    Tab,
    HeaderNav,
    // QuickNavTree,
    Cron,
    ModalTransfer
  ]

// 工具包
const utilsLib = {
  macroFn,
  BigNumber,
  EvalCall
}
// 定义 install 方法
const install = function (Vue) {
  if (install.installed) return
  console.warn(`当前bs-ui版本：${buildInfo.version}`)
  Vue.use(ElementUI)
  Vue.use($BsUtils)
  Vue.use(vxeTable)
  Vue.use(directives)
  Vue.use(renders)
  // Vue.use(VXETable)
  Vue.prototype.$Sortable = Sortable
  Vue.prototype.$XEUtils = XEUtils
  Vue.prototype.$lodash = lodash
  Vue.prototype.$VXETable = VXETable
  Vue.prototype.$modal = VXETable.modal
  window.Sortable = Sortable
  window.XEUtils = XEUtils
  window.lodash = lodash

  // 遍历注册全局组件
  components.map((component) => Vue.component(component.name, component))
  Object.keys(utilsLib).forEach(util => {
    Vue.prototype['$' + util] = utilsLib[util]
  })
}

if (typeof window !== 'undefined' && window.__BS_UI_GLOBAL_CONFIG__) {
  components = components.filter(
    item => {
      return window.__BS_UI_GLOBAL_CONFIG__.include.length ? window.__BS_UI_GLOBAL_CONFIG__.include.includes(item.name) : !window.__BS_UI_GLOBAL_CONFIG__.exclude.includes(item.name)
    }
  )
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// console.log(556677, window.__BS_UI_GLOBAL_CONFIG__, components)

export default {
  install,
  Crumbs,
  Dialog,
  Form,
  FormLayout,
  JsonEditor,
  KeepAlive,
  MainFormListLayout,
  OperationLog,
  QuickNav,
  Query,
  TabKeepRouter,
  Table,
  TableForm,
  TabPanel,
  Title,
  Tree,
  TreeSet,
  // QuickNavTree,
  Cron,
  ModalTransfer
}
