// import store from '@/store/index'
import { padStart } from 'xe-utils/methods'

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
      title: '支付凭证号',
      field: 'payCertNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付凭证号'
        }
      }
    },
    {
      title: '金额',
      field: 'amount',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '金额'
        }
      }
    }
  ],
  highQueryConfig1: [
    {
      title: '支付凭证号',
      field: 'payCertNo',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支付凭证号'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
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
      title: '预算单位',
      field: 'agencyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            treeProps: {
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '预算单位',
            multiple: true,
            readonly: true,
            isleaf: true
          }
        }
      }
    },
    {
      title: '指标文号',
      field: 'corBgtDocNoName',
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
      title: '资金用途',
      field: 'useDes',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '资金用途'
        }
      }
    }
  ],
  highQueryData: {
    payCertNo: '',
    amount: ''
  },
  highQueryData1: {
    payCertNo: '',
    proName: '',
    agencyName: '',
    corBgtDocNoName: '',
    useDes: ''
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
  statusButtons: [
    {
      code: '1',
      label: '待挂接',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '已挂接',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    }
  ],
  curStatusButton: {
    label: '待挂接',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  buttons: {
    1: [
      {
        label: '到人到户导入',
        code: 'person-import'
      },
      {
        label: '企业补贴导入',
        code: 'company-import'
      },
      {
        label: '删除',
        code: 'delete'
      },
      {
        label: '更新',
        code: 'update'
      // },
      // {
      //   label: '挂接',
      //   code: 'hook_set',
      //   status: 'primary'
      }
      // ,
      // {
      //   label: '手动读取',
      //   code: 'peo_read',
      //   status: 'primary'
      // }
    ],
    2: [
      {
        label: '取消挂接',
        code: 'hook_not',
        status: 'primary'
      }
    ]
  },
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  PoliciesTableColumns: [
    {
      title: '区划',
      width: 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付凭证号',
      width: 180,
      field: 'payCertNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额(元)',
      width: 180,
      field: 'payAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '项目代码',
    //   width: 180,
    //   field: 'proCode',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '项目名称',
    //   width: 180,
    //   field: 'proName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '收款账户名称',
      width: 180,
      field: 'payeeAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'payeeAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人开户银行',
      width: 180,
      field: 'payeeAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '编号',
      width: 180,
      field: 'nhbh',
      sortable: false,
      filters: false,
      align: 'center',
      visible: false
    },
    {
      title: '街道(乡镇)名称',
      width: 180,
      field: 'townName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '村名称',
      width: 180,
      field: 'villageName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '姓名',
      width: 180,
      field: 'perName',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '按户或按人补助',
      width: 180,
      field: 'toPeopFamily',
      sortable: false,
      filters: false,
      formatter: ({ row }) => {
        const mapEnmu = { '01': '到人', '02': '到户' }
        return mapEnmu[row.toPeopFamily] || ''
      },
      align: 'left'
    },
    {
      title: '备注',
      width: 180,
      field: 'addWord',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '发放月份',
      width: 180,
      field: 'payMonth',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '社会统一信用代码',
      width: 180,
      field: 'unifsocCredCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '企业名称',
      width: 180,
      field: 'corpName;',
      sortable: false,
      filters: false,
      align: 'center'
    }
    // ,
    // {
    //   title: '证件号码',
    //   width: 180,
    //   field: 'idenNo',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   visible: false
    // },
    // {
    //   title: '支付日期',
    //   width: 180,
    //   field: 'xpayDate',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   visible: false
    // },
    // {
    //   title: '四字标识',
    //   width: 180,
    //   field: 'szbs',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   visible: false
    // },
    // {
    //   title: '可执行指标ID',
    //   width: 180,
    //   field: 'thirdindi',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   visible: false
    // }
  ],
  PoliciesTableColumns1: [
    {
      title: '金额(元)',
      width: 180,
      field: 'payAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付凭证号',
      width: 180,
      field: 'payCertNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算项目',
      width: 180,
      field: 'ysxm',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter: ({ row }) => {
        return row.proCode + '-' + row.proName
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'ysdw',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter: ({ row }) => {
        return row.agencyCode + '-' + row.agencyName
      }
    },
    {
      title: '付款账户名称',
      width: 180,
      field: 'payAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款方账户',
      width: 180,
      field: 'payAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '付款人开户银行',
      width: 180,
      field: 'payAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款账户名称',
      width: 180,
      field: 'payeeAcctName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款方账户',
      width: 180,
      field: 'payeeAcctNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '收款人开户银行',
      width: 180,
      field: 'payeeAcctBankName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付方式',
      width: 180,
      field: 'payTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金用途',
      width: 180,
      field: 'useDes',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '结算方式',
      width: 180,
      field: 'setModeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付时间',
      width: 180,
      field: 'xpayDate',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ]
}

/**
 * 将时间戳转dateString
 * @param timestamp
 * @returns {string}
 */
export function getDateString(timestamp) {
  const curDate = new Date(timestamp)
  const year = curDate.getFullYear()
  const month = padStart((curDate.getMonth() + 1).toString(), 2, '0')
  const day = padStart(curDate.getDate().toString(), 2, '0')
  const hh = padStart(curDate.getHours().toString(), 2, '0')
  const mm = padStart(curDate.getMinutes().toString(), 2, '0')
  const ss = padStart(curDate.getSeconds().toString(), 2, '0')
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
}
