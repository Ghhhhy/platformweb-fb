// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'detail', label: '查看详情' },
      { code: 'del', label: '删除' }
    ]
  },
  statusRightToolBarSelectButton: {
    '1': [
      { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  highQueryConfig: [
    {
      title: '政策法规名称',
      field: 'regulationsName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '政策法规名称'
        }
      }
    }
  ],
  highQueryData: {
    regulationsName: ''
  },
  PoliciesTableColumns: [
    /* {
      title: '政策法规编码',
      field: 'regulationsCode',
      sortable: false,
      align: 'left'
    }, */
    {
      title: '政策法规名称',
      field: 'regulationsName',
      sortable: false,
      align: 'center'
    },
    {
      title: '创建人',
      field: 'createPersonName',
      sortable: false,
      align: 'center'
    },
    {
      title: '创建日期',
      field: 'createTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '修改人',
      field: 'updatePersonName',
      sortable: false,
      align: 'center'
    },
    {
      title: '修改时间',
      field: 'updateTime',
      sortable: false,
      align: 'center'
    },
    {
      title: '所属级别',
      field: 'province',
      sortable: false,
      align: 'center'
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 100,
      cellRender: {
        name: '$gloableOptionRow'
      }
    }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  },
  // 新增弹框表格
  addDialogTableColumns: [
    {
      title: '预算单位',
      field: 'agency',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '功能分类',
      field: 'exp_func',
      filters: false,
      sortable: false,
      align: 'left'
    },
    {
      title: '政府支出经济分类',
      field: 'gov_bgt_eco',
      filters: false,
      sortable: false,
      align: 'left'
    },
    {
      title: '资金性质',
      field: 'fund_type',
      filters: false,
      sortable: false,
      align: 'left'
    },
    {
      title: '支付方式',
      field: 'pay_type',
      filters: false,
      sortable: false,
      align: 'left'
    },
    {
      title: '项目',
      field: 'pro_name',
      filters: false,
      sortable: false,
      align: 'left'
    }
  ],
  // 新增弹框表头工具栏配置
  addToolBarConfig: {
    disabledMoneyConversion: false,
    moneyConversion: false, // 是否有金额转换
    export: false, // 导出
    print: false, // 打印
    zoom: false, // 缩放
    custom: false // 选配展示列
  }
}
