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
      title: '区划',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'code',
              label: 'name',
              children: 'children'
            },
            placeholder: '地区',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '生成状态',
      field: 'generateStatus',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '生成中' },
          { value: '1', label: '生成完成' }
        ],
        props: {
          placeholder: '生成状态'
        }
      }
    },
    {
      title: '确认状态',
      field: 'confirmStatus',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未确认' },
          { value: '1', label: '已确认' }
        ],
        props: {
          placeholder: '确认状态'
        }
      }
    },
    {
      title: '上报状态',
      field: 'escalationStatus',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未上报' },
          { value: '1', label: '已上报' },
          { value: '2', label: '上报中' },
          { value: '3', label: '撤销上报中' }
        ],
        props: {
          placeholder: '上报状态'
        }
      }
    }
  ],
  highQueryData: {
    mofDivCodes: '',
    generateStatus: '',
    confirmStatus: '',
    escalationStatus: ''
  },
  statusButtons: [
    {
      code: '1',
      label: '全部',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    }
    // {
    //   code: '2',
    //   label: '已挂接',
    //   iconName: 'base-all.png',
    //   iconNameActive: 'base-all-active.png',
    //   type: 'button',
    //   curValue: '2'
    // }
  ],
  curStatusButton: {
    label: '全部',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  buttons: {
    1: [
      {
        label: '生成',
        code: 'add_log',
        status: 'primary'
      },
      {
        label: '撤销生成',
        code: 'delete_log'
      },
      {
        label: '上报',
        code: 'confirm_escalation',
        status: 'primary'
      },
      {
        label: '撤销上报',
        code: 'cancel_escalation'
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
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
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
      title: '生成状态',
      field: 'generateStatus',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '生成中' },
          { value: '1', label: '生成完成' }
        ],
        props: {
          placeholder: '生成状态'
        }
      }
    },
    {
      title: '确认状态',
      field: 'confirmStatus',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未确认' },
          { value: '1', label: '已确认' }
        ],
        props: {
          placeholder: '确认状态'
        }
      }
    },
    {
      title: '上报状态',
      field: 'escalationStatus',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未上报' },
          { value: '1', label: '已上报' },
          { value: '2', label: '上报中' },
          { value: '3', label: '撤销上报中' }
        ],
        props: {
          placeholder: '上报状态'
        }
      }
    },
    {
      title: '生成时间',
      field: 'createdTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '确认时间',
      field: 'confirmTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上报时间',
      field: 'escalationTime',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  PoliciesTableColumns1: [
    {
      title: '选中地区名称',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '报表名称',
      field: 'reportName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '涉及表',
      field: 'involveTable',
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