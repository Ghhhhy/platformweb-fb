/*
 * @Description: Bs-UI提供了哪些组件，本业务用哪些组件，不用哪些组件
 * @如果include有值时以它为准【无论exclude有没有值】，如果include值为[],则以Bs-UI导出的组件为基线，去除exclude里的组件
 * @Author: Comer
 * @Date: 2022-05-07 14:32:35
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-20 18:27:03
 */

/**
 * 详见文档《https://docs.qq.com/doc/DT2lCSlhwV0RFS1hM》
 *  BsCrumbs,
    BsDialog,
    BsForm,
    BsFormLayout,
    BsJsonEditor,
    BsKeepAlive,
    BsMainFormListLayout,
    BsOperationLog,
    BsQuickNav,
    BsQuery,
    BsTabKeepRouter,
    BsTable,
    BsTableForm,
    BsTabPanel,
    BsTitle,
    BsTree,
    BsTreeSet,
    BsTreeTable,
    BsTab,
    BsHeaderNav
 *
 */

window.__BS_UI_GLOBAL_CONFIG__ = {
  include: [],
  exclude: ['BsOperationLog'],
  project: {
    name: 'rh-dfr', // fiscal | pay | projectlib | baseinfo | gl | rh
    province: 'ShanXi' // ShanXi | FuJian | HeiLongJiang | NeiMengGu
  }
}
