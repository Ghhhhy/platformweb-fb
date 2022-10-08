/**
 * 获取指标列表columns
 * @return {[{field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string}, {field: string, title: string, type: string}, null, null, null, null, null, null, null, null]}
 */
export function getIndexColumns() {
  const column = [
    {
      field: 'cznsjg',
      title: '财政内设机构'
    },
    {
      field: 'bm',
      title: '部门'
    },
    {
      field: 'zxzj',
      title: '专项资金'
    },
    {
      field: 'zcgnfl',
      title: '支出功能分科科目'
    },
    {
      field: 'ysly',
      title: '预算来源',
      visible: false
    },
    {
      field: 'zjxz',
      title: '资金性质'
    },
    {
      field: 'zwbs',
      title: '债务标识',
      visible: false
    },
    {
      field: 'sjwh',
      title: '上级文号'
    },
    {
      field: 'sjzx',
      title: '上级专项'
    },
    {
      field: 'amount',
      title: '金额',
      type: 'money'
    },
    {
      field: 'sfzd',
      title: '是否直达资金'
    },
    {
      field: 'toctrlId',
      visible: false
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
      field: 'zbwh',
      title: '指标文号'
    },
    {
      field: 'dw',
      title: '单位'
    },
    {
      field: 'zxzj',
      title: '专项资金'
    },
    {
      field: 'xmmc',
      title: '项目名称'
    },
    {
      field: 'zcgnfl',
      title: '支出功能分类科目'
    },
    {
      field: 'zbze',
      title: '指标总额',
      type: 'money',
      sort: true
    },
    {
      field: 'yapje',
      title: '已安排金额',
      type: 'money'
    },
    {
      field: 'ztje',
      title: '正在办理金额',
      type: 'money'
    },
    {
      field: 'zbye',
      title: '指标金额',
      type: 'money'
    },
    {
      field: 'zjbs',
      title: '债务标识',
      visible: false
    },
    {
      field: 'cznsjg',
      title: '财政内设机构'
    },
    {
      field: 'ysly',
      title: '预算来源',
      visible: false
    },
    {
      field: 'zjxz',
      title: '资金性质唯一标识'
    },
    {
      field: 'csnd',
      title: '资金安排初输年度'
    },
    {
      field: 'sjwh',
      title: '上级文号'
    },
    {
      field: 'sjzx',
      title: '上级专项'
    },
    {
      field: 'zffs',
      title: '支付方式'
    },
    {
      field: 'zcjjfl',
      title: '支出经济分类科目'
    },
    {
      field: 'zfyszcjjfl',
      title: '政府预算支出经济分类'
    }
  ]
  column.forEach(item => {
    item.width = 120
  })
  return column
}
