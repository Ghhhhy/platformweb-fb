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
  statusButtons: [
    {
      code: '1',
      label: '未关联',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '已关联',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    },
    {
      code: '3',
      label: '无关数据',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '3'
    }
  ],
  curStatusButton: {
    label: '未关联',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  buttons1: {
    1: [
      {
        label: '删除',
        code: 'del'
      },
      {
        label: '导出',
        code: 'import'
      },
      {
        label: 'DBLINK同步',
        code: 'tb'
      },
      {
        label: '保存',
        code: 'bc'
      },
      {
        label: '标记无关数据',
        code: 'bjwgsj'
      },
      {
        label: '关联',
        code: 'gl',
        status: 'primary'
      },
      {
        label: '全部关联',
        code: 'qbgl',
        status: 'primary'
      },
      {
        label: '多对多关联',
        code: 'dddgl',
        status: 'primary'
      }
    ],
    2: [
      {
        label: '导出',
        code: 'export'
      },
      {
        label: '保存',
        code: 'bc'
      },
      {
        label: '取消关联',
        code: 'cannelgl',
        status: 'primary'
      }
    ],
    3: [
      {
        label: '删除',
        code: 'del'
      },
      {
        label: '导出',
        code: 'export'
      },
      {
        label: '取消标记',
        code: 'cannelbj',
        status: 'primary'
      }
    ]
  },
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '单位',
      field: 'dw',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '单位'
        }
      }
    },
    {
      title: '项目名称',
      field: 'xmmc',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '指标文号',
      field: 'zbwh',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '指标文号'
        }
      }
    },
    {
      title: '用途',
      field: 'yt',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '用途'
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
      title: '原指标ID',
      width: 180,
      field: 'yzbid',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '快捷码',
      width: 180,
      field: 'kjm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 180,
      field: 'je',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '可用额度',
      width: 180,
      field: 'kyed',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '关联金额',
      width: 180,
      field: 'glje',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'zbwh',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户名称',
      width: 180,
      field: 'fkfzhmc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方银行账户',
      width: 180,
      field: 'fkfyhzh',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方银行代码',
      width: 180,
      field: 'fkfyhdm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方银行名称',
      width: 180,
      field: 'fkfyhmc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标金额',
      width: 180,
      field: 'zbje',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付方式',
      width: 180,
      field: 'zffs',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付单据唯一标识',
      width: 180,
      field: 'zfdjwybs',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质',
      width: 180,
      field: 'zjxz',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目编码',
      width: 180,
      field: 'xmbm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'xmmc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款日期',
      width: 180,
      field: 'fkrq',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '申请单号',
      width: 180,
      field: 'sqdh',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'zcgnkm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '用途',
      width: 180,
      field: 'yt',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '单位',
      width: 180,
      field: 'dw',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '账户类型',
      width: 180,
      field: 'zhlx',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '原始支付ID号',
      width: 180,
      field: 'yszfidh',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '结算方式',
      width: 180,
      field: 'jsfs',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '政府支出经济分类科目',
      width: 180,
      field: 'zfzcjjflkm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方银行名称',
      width: 180,
      field: 'ckfyhmc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方银行代码',
      width: 180,
      field: 'ckfyhdm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户名称',
      width: 180,
      field: 'ckfzhmc',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'ckfzh',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '部门支出经济分类科目',
      width: 180,
      field: 'bmzcjjflkm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '扶贫标识',
      width: 180,
      field: 'fpbs',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '是否直达资金的地方对应安排',
      width: 180,
      field: 'sfzdzjddfdyap',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '是否补贴到人到企业',
      width: 180,
      field: 'sfbtdrdq',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '直达资金标识',
      width: 180,
      field: 'zdzjbs',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ]
}
