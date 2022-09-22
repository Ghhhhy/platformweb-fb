// 页面：基础信息管理 => 资产信息管理 => 资产信息维护
// 资产信息表 表头配置  2020-8-5 21:30
// 负责人：黄丹
export const columns = [
  {
    title: '资产分类',
    field: 'fixed_asset_type_',
    treeNode: true,
    width: 200,
    align: 'left',
    editRender: {
      name: '$treeText'
    },
    sortable: false
    // filters: false
  },
  {
    title: '资产编号',
    field: 'asset_code',
    width: 200
    // //sortable: false,
    // filters: false
  },
  {
    title: '资产名称',
    field: 'asset_name',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '单位',
    field: 'agency_',
    width: 200,
    editRender: {
      name: '$treeText'
    }
    // sortable: false,
    // filters: false
  },
  {
    title: '权属性质',
    field: 'ownership_nature_code',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '产权形式',
    field: 'ownership_form_code',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '固定资产状态',
    field: 'fixed_asset_state_code',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '使用责任主体',
    field: 'use_respon_subject_code',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '资产编制情况',
    field: 'asset_auth_situ_code',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '取得日期',
    field: 'acqu_date',
    width: 200
    // sortable: false,
    // filters: false
  },
  {
    title: '票面金额',
    field: 'par_val_amt',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    width: 200,
    align: 'right'
    // sortable: false,
    // filters: false
  },
  {
    title: '原值',
    field: 'init_asset_val',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    width: 200,
    align: 'right'
    // sortable: false,
    // filters: false
  },
  {
    title: '净值',
    field: 'net_val',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    width: 200,
    align: 'right'
    // sortable: false,
    // filters: false
  },
  {
    title: '累计折扣',
    field: 'acc_dep',
    editRender: { name: '$moneyRender', props: { type: 'float' } },
    width: 200,
    align: 'right'
    // sortable: false,
    // filters: false
  }
]

export const proconf = {
  buttonConf: { // table工具栏配置
    moneyConversion: false,
    search: false,
    advancedSearch: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' }
      // { code: 'toolbar-sync', name: '同步' }
    ]
  }
}
