const statusButtons = [
  {
    code: '1',
    label: '未生成',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '1'
  },
  {
    code: '2',
    label: '未送审 ',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '2'
  },
  {
    code: '3',
    label: '已送审',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    type: 'button',
    curValue: '3'
  }
]
const curStatusButton = {
  label: '未生成',
  code: '1',
  type: 'button',
  curValue: '1'
}

const buttons1 = {
  1: [
    {
      label: '生成',
      code: 'toorbar_set',
      status: 'primary'
    }
  ],
  2: [
    // {
    //   label: '新增',
    //   code: 'toorbar_add',
    //   status: 'primary'
    // },
    // {
    //   label: '修改',
    //   code: 'toorbar_modif'
    // },
    {
      label: '删除',
      code: 'toorbar_delete',
      status: 'primary'
    },
    {
      label: '送审',
      code: 'toorbar_send'
    }
  ],
  3: [
    {
      label: '取消送审',
      code: 'toorbar_cancel',
      status: 'primary'
    }
  ]
}

let proconf = {
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="编辑" placement="top" effect="light">
          <a class="gloable-option-row-edit gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>,
        </el-tooltip>,
        <el-tooltip content="查看明细" placement="top" effect="light">
          <a class="gloable-option-row-setting gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>查看明细</a>,
        </el-tooltip>,
        <el-tooltip content="附件查看" placement="top" effect="light">
          <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件查看</a>
        </el-tooltip>,
        <el-tooltip content="删除" placement="top" effect="light">
          <a class="gloable-option-row-delete gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>
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
