// 指标管理--》可执行指标
// 界面配置文件
const statusButtons = [
  {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    label: '待办事项-全部',
    code: '2',
    is_end: '1'
  },
  {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    label: '已办事项-全部',
    code: '3',
    is_end: '1'
  },
  {
    type: 'button',
    iconName: 'base-zhibaio.png',
    iconNameActive: 'base-zhibaio-active.png',
    label: '全部单据',
    code: '23'
  }
]

const curStatusButton = {
  type: 'button',
  code: '2',
  curValue: '2'
}

const tabStatusNumConfigDefault = {
  '2': 0,
  '3': 0,
  '23': 0
}

const buttons = [
  { code: 'toolbar-insert', label: '新增', actionType: '1', glType: '1', actionName: '新增', action: '' },
  { code: 'toolbar-audit', label: '送审', actionType: '2', glType: '0', actionName: '送审', action: 'audit' },
  { code: 'toolbar-update', label: '修改', actionType: '4', glType: '2', actionName: '修改', action: 'modify' },
  { code: 'toolbar-delete', label: '删除', actionType: '5', glType: '5', actionName: '作废', action: 'delete' },
  { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
]

const buttonsInfos = {
  '2': [
    { code: 'toolbar-audit', label: '确认', actionType: '2', glType: '3', actionName: '确认', action: 'audit' }
  ],
  '3': [
    { code: 'toolbar-cancel', label: '撤销', actionType: '3', glType: '0', actionName: '撤销', action: 'audit' }
  ]
}
export {
  statusButtons,
  buttonsInfos,
  curStatusButton,
  buttons,
  tabStatusNumConfigDefault
}
