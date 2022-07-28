// 指标管理--》指标文号配置
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
  deptColumns: [
    {
      title: '处室名称',
      field: 'name',
      width: '240',
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          disabled: true
        }
      }
    }
  ],
  docno0Columns: [
    {
      title: '代字名称',
      field: 'name',
      width: '240',
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          disabled: true
        }
      }
    }
  ],
  docno1Columns: [
    {
      title: '前缀名称',
      field: 'name',
      width: '240',
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          disabled: true
        }
      }
    }
  ]
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
