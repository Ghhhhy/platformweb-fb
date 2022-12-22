// 支付应用树菜单
import store from '@/store/index'
import { Urls } from '@/api/frame/main/common/index.js'

/** 支付应用菜单下拉 **/
export const payAppMenu = {
  config: {
    valueKeys: ['code', 'name', 'id'],
    format: '{name}',
    treeProps: {
      labelFormat: '{code}-{name}', // {code}-{name}
      nodeKey: 'id',
      label: 'label',
      children: 'children'
    },
    placeholder: '请选择',
    multiple: true,
    readonly: false,
    isleaf: true,
    axiosConfig: {
      successCode: '100000', // 成功code
      statusField: 'rscode',
      method: 'get', // 请求方式
      url: 'mp-b-perm-service/v2/menus' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
    }
  },
  queryparams: {
    appids: ['pay'],
    year: store.state.userInfo.year,
    province: store.state.userInfo.province
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
