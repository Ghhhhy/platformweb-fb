import store from '@/store/index'
import { padStart } from 'xe-utils/methods'
const isSx = store.getters.isSx
let proconf = {
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
      title: '指标id',
      field: 'bgtId',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '指标id'
        }
      }
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
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
      title: '指标id',
      field: 'bgtId',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '指标id'
        }
      }
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
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
      title: '指标金额',
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
    },
    {
      title: '预算单位',
      field: 'agencyCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': false,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    }
  ],
  highQueryData: {
    bgtId: '',
    amount: '',
    corBgtDocNo: '',
    proName: ''
  },
  highQueryData1: {
    bgtId: '',
    proName: '',
    agencyCode: '',
    corBgtDocNo: '',
    amount: ''
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
        label: '挂接',
        code: 'hook_set',
        status: 'primary'
      },
      {
        label: '手动读取',
        code: 'peo_read',
        status: 'primary'
      }
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
      title: '序号',
      width: 60,
      type: 'seq',
      sortable: false,
      filters: false,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标id',
      width: 180,
      field: 'bgtId',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '金额(元)',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '项目代码',
      width: 180,
      field: 'proCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'proName',
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
      title: '街道(乡镇)编码',
      width: 180,
      field: 'townCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '街道(乡镇)名称',
      width: 180,
      field: 'townName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '村编码',
      width: 180,
      field: 'villageCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '村名称',
      width: 180,
      field: 'villageName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '姓名',
      width: 180,
      field: 'perName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '证件类型',
      width: 180,
      field: 'idenTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '证件号码',
      width: 180,
      field: 'idenNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '按户按人补助标识',
      width: 180,
      field: 'toPeopFamily',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '应发金额(元)',
      width: 180,
      field: 'payAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '实发金额(元)',
      width: 180,
      field: 'xpayAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '备注',
      width: 180,
      field: 'addWord',
      sortable: false,
      filters: false,
      align: 'center'
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
      title: '企业名称',
      width: 180,
      field: 'corpName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '统一社会信用代码',
      width: 180,
      field: 'unifsocCredCode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '月份',
      width: 180,
      field: 'month',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '补贴金额',
      width: 180,
      field: 'subsidyAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '指标金额(元)',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '已挂接金额(元)',
      width: 180,
      field: 'hookAmt',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标id',
      width: 180,
      field: 'bgtId',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金管理处室',
      width: 180,
      field: 'bgtMofDepCode',
      sortable: false,
      filters: false,
      align: 'center',
      // cellRender: {
      //   name: '$vxeInput',
      //   options: [],
      //   defaultValue: ''
      // },
      // formula: '{bgtMofDepCode}-{bgtMofDepName}'
      formatter({ row }) {
        return `${row.bgtMofDepCode}-${row.bgtMofDepName}`
      },
      exportFormatter: true
      // props: {
      //   format: '{bgtMofDepCode}-{bgtMofDepName}'
      // }
    },
    {
      title: '预算项目',
      width: 180,
      field: 'proName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位',
      width: 180,
      field: 'ysdw',
      sortable: false,
      filters: false,
      align: 'center',
      // formula: '',
      // cellRender: {
      //   name: '$vxeInput',
      //   options: [],
      //   defaultValue: '',
      //   props: {
      //     format: '{agencyCode}-{agencyName}'
      //   }
      // },
      // props: {
      //   format: '{agencyCode}-{agencyName}'
      // }
      formatter({ row }) {
        return `${row.agencyCode}-${row.agencyName}`
      },
      exportFormatter: true
    },
    {
      title: '上级指标文号',
      width: 180,
      field: 'supBgtDocNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '功能分类科目',
      width: 180,
      field: 'gnflkm',
      sortable: false,
      filters: false,
      align: 'center',
      // formula: '',
      // cellRender: {
      //   name: '$vxeInput',
      //   options: [],
      //   defaultValue: '',
      //   props: {
      //     format: '{expFuncCode}-{expFuncName}'
      //   }
      // },
      // props: {
      //   format: '{expFuncCode}-{expFuncName}'
      // }
      formatter({ row }) {
        return `${row.expFuncCode}-${row.expFuncName}`
      },
      exportFormatter: true
    },
    {
      title: '指标类型',
      width: 180,
      field: 'zblx',
      sortable: false,
      filters: false,
      align: 'center',
      // formula: '',
      // cellRender: {
      //   name: '$vxeInput',
      //   options: [],
      //   defaultValue: '',
      //   props: {
      //     format: '{bgtTypeCode}-{bgtTypeName}'
      //   }
      // },
      // props: {
      //   format: '{bgtTypeCode}-{bgtTypeName}'
      // }
      formatter({ row }) {
        return `${row.bgtTypeCode}-${row.bgtTypeName}`
      },
      exportFormatter: true
    }
  ]
}
if (isSx) {
  proconf.PoliciesTableColumns1 = proconf.PoliciesTableColumns1.filter(item => {
    return !['hookAmt', 'bgtMofDepCode'].includes(item.field)
  })
}
export { proconf }
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
