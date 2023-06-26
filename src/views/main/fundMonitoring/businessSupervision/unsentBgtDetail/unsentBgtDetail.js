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
    firulename: ''
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
      width: 180,
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
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '处室',
      width: 180,
      field: 'manageMofDepName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{manageMofDepCode}-{manageMofDepName}'
        }
      },
      props: {
        format: '{manageMofDepCode}-{manageMofDepName}'
      }
    },
    {
      title: '本级文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '本级专项资金',
      width: 180,
      field: 'speTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级文号',
      width: 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级专项资金',
      width: 180,
      field: 'supSpeTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '下级地区',
      width: 180,
      field: 'recDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '下级地区名称',
      width: 180,
      field: 'recDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '未发送金额',
      width: 180,
      field: 'curAmt',
      sortable: false,
      filters: false,
      align: 'right',
      cellRender: {
        name: '$vxeMoney'
      }
    },
    {
      title: '制单人姓名',
      width: 180,
      field: 'creater',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ]
}
