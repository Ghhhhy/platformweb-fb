export let proconf = {
  buttonConf: { // table工具栏配置
    buttons: [
      {
        name: '新增',
        disabled: false,
        dropdowns: [
          {
            code: 'other1',
            name: '其他运转类项目管理',
            type: 'text'
          },
          {
            code: 'other2',
            name: '特定目标类项目管理',
            type: 'text'
          }]
      },
      { code: 'toolbar-modify', name: '修改' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-audit', name: '送审' }
    ]
  },
  buttonConf2: { // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  },

  columns: [
    {
      title: '项目类别',
      field: 'pro_cat_',
      width: 200
    },
    {
      title: '支出项目类别',
      field: 'payout_kind_',
      width: 200
    },
    {
      title: '存续状态',
      field: 'exist_statue_code',
      width: 200
    },
    {
      title: '项目编码',
      field: 'pro_code',
      width: 200
    },
    {
      title: '项目名称',
      field: 'pro_name',
      width: 200
    },
    {
      title: '项目单位',
      field: 'use_agency_',
      width: 200
    },
    {
      title: '其中：社会投入金额',
      field: 'scoi_invest_fund',
      width: 200,
      editRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '主管部门',
      field: 'dept_name',
      width: 200
    },
    {
      title: '财政内部机构',
      field: 'mof_dep_name',
      width: 200
    },
    {
      title: '项目开始时间',
      field: 'pro_start_year',
      width: 200
    },
    {
      title: '项目结束时间',
      field: 'end_year',
      width: 200
    },
    {
      title: '项目期限(年)',
      field: 'pro_term',
      width: 200
    },
    {
      title: '申报联系人',
      field: 'apply_link_man',
      width: 200
    },
    {
      title: '申报联系电话',
      field: 'apply_link_tel',
      width: 200
    },
    {
      title: '热点分类',
      field: 'hot_std_',
      width: 200
    },
    {
      title: '分配方式',
      field: 'distri_type_code',
      width: 200
    }
  ]

}
