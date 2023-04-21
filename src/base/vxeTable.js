/* eslint-disable no-undef */
// import Vue from 'vue'
// import VXETablePluginExcel from 'vxe-table-plugin-excel'
// import 'vxe-table-plugin-excel/dist/style.css'
import XEUtils from 'xe-utils'
import VXETable from '@bszx/bs-vxe-table'
// import VXETable from '../common/js/lib/vxe-table/packages/vxe-table.js'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import XEClipboard from 'xe-clipboard'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginMenus from 'vxe-table-plugin-menus'
import Sortable from 'sortablejs'
import jsoneditor from 'jsoneditor'
// 本地渲染器引入
// import globleRenders from '../components/Table/config/defaultRenders.js'

// Vue.use(VXETable)
// VXETable.use(VXETablePluginExcel)
const vxeTable = {
  install: function (Vue) {
    // for (let i in globleRenders) {
    //   VXETable.renderer.add(i, globleRenders[i])
    // }
    VXETable.setup({
      icon: {
        TOOLBAR_TOOLS_CUSTOM: 'ri-apps-2-line',
        //   // table
        //   TABLE_SORT_ASC: 'vxe-icon--caret-top',
        //   TABLE_SORT_DESC: 'vxe-icon--caret-bottom',
        TABLE_FILTER_NONE: 'ri-filter-2-fill',
        TABLE_FILTER_MATCH: 'ri-filter-2-fill',
        TABLE_EDIT: 'ri-edit-box-line',
        TABLE_TREE_LOADED: 'vxe-icon--refresh roll',
        TABLE_TREE_OPEN: 'vxe-icon--caret-right rotate90',
        TABLE_TREE_CLOSE: 'vxe-icon--caret-right',
        //   TABLE_EXPAND_LOADED: 'vxe-icon--refresh roll',
        //   TABLE_EXPAND_OPEN: 'vxe-icon--arrow-right rotate90',
        //   TABLE_EXPAND_CLOSE: 'vxe-icon--arrow-right',

        //   // button
        //   BUTTON_DROPDOWN: 'vxe-icon--arrow-bottom',
        BUTTON_LOADING: 'ri-loader-4-line roll',

        //   // select
        //   SELECT_OPEN: 'vxe-icon--caret-bottom rotate180',
        //   SELECT_CLOSE: 'vxe-icon--caret-bottom',

        //   // pager
        PAGER_JUMP_PREV: 'ri-skip-back-mini-fill',
        PAGER_JUMP_NEXT: 'ri-skip-forward-mini-fill',
        PAGER_PREV_PAGE: 'ri-arrow-left-s-line',
        PAGER_NEXT_PAGE: 'ri-arrow-right-s-line',
        PAGER_JUMP_MORE: 'ri-more-fill',

        //   // input
        //   INPUT_CLEAR: 'vxe-icon--close',
        //   INPUT_PWD: 'vxe-icon--eye-slash',
        //   INPUT_SHOW_PWD: 'vxe-icon--eye',
        //   INPUT_PREV_NUM: 'vxe-icon--caret-top',
        //   INPUT_NEXT_NUM: 'vxe-icon--caret-bottom',
        //   INPUT_DATE: 'vxe-icon--calendar',
        //   INPUT_SEARCH: 'vxe-icon--search',

        //   // modal
        //   MODAL_ZOOM_IN: 'vxe-icon--square',
        //   MODAL_ZOOM_OUT: 'vxe-icon--zoomout',
        //   MODAL_CLOSE: 'vxe-icon--close',
        MODAL_INFO: 'ri-information-fill',
        MODAL_SUCCESS: 'ri-checkbox-circle-fill',
        MODAL_WARNING: 'ri-error-warning-fill',
        MODAL_ERROR: 'ri-close-circle-fill',
        MODAL_QUESTION: 'ri-question-fill'
        //   MODAL_LOADING: 'vxe-icon--refresh roll',

        //   // toolbar
        //   TOOLBAR_TOOLS_REFRESH: 'vxe-icon--refresh',
        //   TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon--refresh roll',
        //   TOOLBAR_TOOLS_IMPORT: 'vxe-icon--upload',
        //   TOOLBAR_TOOLS_EXPORT: 'vxe-icon--download',
        //   TOOLBAR_TOOLS_ZOOM_IN: 'vxe-icon--zoomin',
        //   TOOLBAR_TOOLS_ZOOM_OUT: 'vxe-icon--zoomout',
        //   TOOLBAR_TOOLS_CUSTOM: 'vxe-icon--menu',

      //   // form
      //   FORM_PREFIX: 'vxe-icon--info',
      //   FORM_SUFFIX: 'vxe-icon--info',
      //   FORM_FOLDING: 'vxe-icon--arrow-top rotate180',
      //   FORM_UNFOLDING: 'vxe-icon--arrow-top'
      }
    })
    VXETable.use(VXETablePluginMenus)
    VXETable.use(VXETablePluginExportXLSX)
    VXETable.use(VXETablePluginElement)
    Vue.prototype.$JsonEditor = jsoneditor

    // 给 vue 实例挂载全局窗口对象，属性名称随意定义，例如：$XModal
    Vue.use(VXETable)
    window.XEUtils = XEUtils
    window.Sortable = Sortable
    Vue.prototype.$Sortable = Sortable
    Vue.prototype.$XEUtils = XEUtils
    Vue.prototype.$VXETable = VXETable
    Vue.prototype.$modal = VXETable.modal
    Vue.prototype.$XEClipboard = XEClipboard
  }
}
export default vxeTable
