// 支付应用树菜单
import store from '@/store/index'
import { Urls } from '@/api/frame/main/common/index.js'

/** 支付应用菜单下拉 **/
export const payAppMenu = {
  config: {
    valueKeys: ['id', 'name'],
    format: '{name}',
    treeProps: {
      labelFormat: '{name}', // {code}-{name}
      nodeKey: 'id',
      label: 'label',
      children: 'children'
    },
    placeholder: '请选择',
    multiple: true,
    readonly: false,
    isleaf: true
    // axiosConfig: {
    //   successCode: '000000', // 成功code
    //   statusField: 'code',
    //   method: 'post', // 请求方式
    //   url: 'large-monitor-platform/lmp/elementQuery/queryTreedElementByCode'
    // }
  },
  queryparams: {
    code: 'pay'
    // year: store.state.userInfo.year,
    // province: store.state.userInfo.province
  }
}

/** 预算单位treeSelect **/
export const getBudgetUnitTreeSelect = (config = {}, editConfig = {}, queryparams = {}) => {
  return {
    isServer: true,
    ajaxType: 'get',
    serverUri: Urls.MOf_DIV_TREE,
    multiple: true,
    props: {
      labelFormat: '{code}-{name}', // {code}-{name}
      nodeKey: 'id',
      label: 'label',
      children: 'children'
    },
    openFormatLabel: true,
    editConfig: {
      placeholder: '请选择',
      ...(editConfig || {})
    },
    queryparams: {
      elementCode: 'AGENCY',
      year: store.state.userInfo.year,
      province: store.state.userInfo.province,
      ...(queryparams || {})
    },
    ...(config || {})
  }
}
