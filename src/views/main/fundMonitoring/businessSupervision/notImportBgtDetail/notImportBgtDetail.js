import store from '@/store/index'
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
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: '',
    fiscalYear: store.state.userInfo.year
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  PoliciesTableColumns: [
    {
      title: '地区名称',
      'width': 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级文号',
      'width': 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级专项资金',
      'width': 180,
      field: 'supSpeTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '未接收金额',
      'width': 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: {
        name: '$vxeMoney'
      }
    }
  ]
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
