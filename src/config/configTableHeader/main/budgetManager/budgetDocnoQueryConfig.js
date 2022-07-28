// 指标管理--》指标文查询
// 界面配置文件
const tableConf = {
  basicInfo: {
    type: 'form',
    tableColumnsConfig: [
      {
        title: '展开',
        type: 'expand',
        width: 60,
        className: 'expand-user-addico',
        contentRender: {
          name: '$contentTable',
          props: {
            params: {}
          }
        }
      }
    ],
    editRules: {
    },
    toolbarConfig: { // table工具栏配置
      moneyConversion: false, // 是否有金额转换
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
  // 编辑 附件 操作日志
  rowbutton: {
    '1': {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="查看原件" class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'budgetFile' })}>查看原件</a>,
          <a title="查看指标" class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'budgetInfo' })}>查看指标</a>
        ]
      }
    }
  }
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return tableConf[tableType][configType]
  } else if (tableType) {
    return tableConf[tableType]
  } else {
    return null
  }
}
