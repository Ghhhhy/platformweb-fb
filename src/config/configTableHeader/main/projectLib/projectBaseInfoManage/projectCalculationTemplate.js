// 页面：项目库管理 => 项目基础信息管理 => 项目测算模板维护
// 项目测算模板维护 表头配置  2020-7-13 16:28
// 负责人：黄丹
export const columns = [
  {
    title: '项目类别',
    field: 'procat',
    width: 'fit',
    align: 'center'
  },
  {
    title: '编报模板代码',
    field: 'draft_template_code',
    width: 'fit',
    align: 'center'
  },
  {
    title: '编报模板名称',
    field: 'draft_template_name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '支出项目类别',
    field: 'payout_kind_',
    width: 'fit',
    align: 'center'
  },
  {
    title: '是否启用',
    field: 'isvalid',
    width: 'fit',
    align: 'center',
    formatter: (value, column) => {
      if (value.cellValue === 0) {
        return '否'
      }
      if (value.cellValue === 1) {
        return '是'
      }
    }
  }
]

export const taskDetailColumns = [
  {
    title: '任务明细',
    field: 'est_detail_name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '支出标准',
    field: 'exp_cri_class_name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '公式',
    field: 'formuladetname',
    width: 'fit',
    align: 'center'
  }
]

export const taskColumns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '任务名称',
    field: 'est_detail_name',
    width: 'fit',
    align: 'center'
  }
]

export default {
  projectCalculationTemplate: columns
}
