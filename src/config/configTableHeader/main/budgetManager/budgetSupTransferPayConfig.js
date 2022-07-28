// 指标管理--》转移支付提前下达录入
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
      moneyConversion: true, // 是否有金额转换
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
    }
  },
  // 编辑 附件 操作日志
  rowbutton: {
    sjzyzf: {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="编辑" class="gloable-option-row-edit gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>
        ]
      }
    },
    zyzf1: {
      renderDefault(h, cellRender, params, context) {
        let self = context.$grid.$parent
        let { row, column } = params
        return [
          <a title="操作日志" class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
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
