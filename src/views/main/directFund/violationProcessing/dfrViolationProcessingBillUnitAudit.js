const statusButtons = [
  {
    code: '1',
    label: '未确认',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '已确认',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  }
]
const curStatusButton = {
  label: '未确认',
  code: '1',
  type: 'button',
  curValue: '1'
}

const buttons1 = {
  1: [
    {
      label: '确认',
      code: 'toorbar_audit',
      status: 'primary'
    },
    {
      label: '退回',
      code: 'toorbar_back'
    }
  ],
  2: [
    {
      label: '取消确认',
      code: 'toorbar_cancel'
    }
  ]
}

let proconf = {
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="查看明细" placement="top" effect="light">
          <a class="gloable-option-row-setting gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>查看明细</a>,
        </el-tooltip>,
        <el-tooltip content="附件查看" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件查看</a>
        </el-tooltip>
      ]
    }
  }
}

export {
  statusButtons,
  curStatusButton,
  proconf,
  buttons1
}
