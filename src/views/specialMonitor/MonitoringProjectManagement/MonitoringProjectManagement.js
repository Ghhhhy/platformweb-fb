// import store from '@/store/index'
import { padStart } from 'xe-utils/methods'
export let proconf = {
  highQueryConfig: [
    {
      title: '项目编码',
      field: 'objCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目编码'
        }
      }
    },
    {
      title: '项目名称',
      field: 'objName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目名称'
        }
      }
    },
    {
      title: '业务主管处室',
      field: 'manageMofDepCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务主管处室'
        }
      }
    },
    {
      title: '管理级次',
      field: 'objLevel',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    }
  ],
  highQueryData: {
    objCode: '',
    objName: '',
    manageMofDepCode: '',
    objLevel: ''
  },
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
      { code: 'add', label: '添加', status: 'primary' },
      { code: 'export', label: '导出' }
    ]
  },
  PoliciesTableColumns: [
    {
      title: '项目编码',
      field: 'objCode',
      sortable: false,
      filters: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'objName',
      sortable: false,
      align: 'left'
    },
    {
      title: '业务主管处室',
      field: 'manageMofDepName',
      sortable: false,
      align: 'left'
    },
    {
      title: '监控业务分类',
      field: 'bizType',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '01', label: '中央转移支付专项' },
          { value: '02', label: '直达资金监控' },
          { value: '03', label: '中央本级监控' }
        ],
        props: {
          placeholder: '监控业务分类'
        }
      }
    },
    {
      title: '是否私有',
      field: 'pubFlag',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '私有' },
          { value: '1', label: '公有' }
        ],
        props: {
          placeholder: '是否私有'
        }
      }
    },
    {
      title: '管理级次',
      field: 'objLevel',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    },
    {
      title: '显示顺序',
      field: 'orderNum',
      sortable: false,
      align: 'left'
    },
    {
      title: '生效日期',
      field: 'beginDate',
      sortable: false,
      align: 'left',
      editRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '生效日期'
        }
      }
    },
    {
      title: '失效日期',
      field: 'endDate',
      sortable: false,
      align: 'left',
      editRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '失效日期'
        }
      }
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
