/**
 * 获取指标列表columns
 * @return {[{field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string, type: string}, null, null, null, null, null, null, null, null]}
 */
export function getIndexColumns() {
  const column = [
    {
      field: 'column1',
      title: '财政内设机构'
    },
    {
      field: 'column2',
      title: '专户'
    },
    {
      field: 'column3',
      title: '专项资金'
    },
    {
      field: 'column4',
      title: '资金初输安'
    },
    {
      field: 'column5',
      title: '金额（元）',
      type: 'money'
    },
    {
      field: 'column6',
      title: '备注'
    },
    {
      field: 'column7',
      title: '支出功能分科科目'
    },
    {
      field: 'column8',
      title: '预算来源'
    },
    {
      field: 'column9',
      title: '资金性质'
    },
    {
      field: 'column10',
      title: '债务标识'
    },
    {
      field: 'column11',
      title: '上级文号'
    },
    {
      field: 'column12',
      title: '上级专项'
    },
    {
      field: 'column13',
      title: '是否直达资金'
    }
  ]
  column.forEach(item => {
    item.width = 120
  })
  return column
}

/**
 * 获取指标来源去向columns
 * @return {[{field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string}, null, null, null, null, null, null, null, null, null, null, null, null, null]}
 */
export function getIndexSourceGoneColumns() {
  const column = [
    {
      field: 'column1',
      title: '指标文号'
    },
    {
      field: 'column2',
      title: '单位'
    },
    {
      field: 'column3',
      title: '专项资金'
    },
    {
      field: 'column4',
      title: '项目名称'
    },
    {
      field: 'column5',
      title: '支出功能分类科目'
    },
    {
      field: 'column6',
      title: '指标总额',
      type: 'money',
      sort: true
    },
    {
      field: 'column7',
      title: '已安排金额',
      type: 'money'
    },
    {
      field: 'column8',
      title: '正在办理金额',
      type: 'money'
    },
    {
      field: 'column9',
      title: '指标金额',
      type: 'money'
    },
    {
      field: 'column10',
      title: '债务标识'
    },
    {
      field: 'column11',
      title: '财政内设机构'
    },
    {
      field: 'column12',
      title: '预算来源'
    },
    {
      field: 'column13',
      title: '资金性质唯一标识'
    },
    {
      field: 'column14',
      title: '资金安排初输年度'
    },
    {
      field: 'column15',
      title: '上级文号'
    },
    {
      field: 'column16',
      title: '上级专项'
    },
    {
      field: 'column17',
      title: '需要跟踪的专项资金'
    },
    {
      field: 'column18',
      title: '支付方式'
    }
  ]
  column.forEach(item => {
    item.width = 120
  })
  return column
}
