// 页面：项目库管理 => 项目基础信息管理 => 任务模板维护
// 任务模板维护 表头配置  2020-7-13 16:28
// 负责人：黄丹
export const columns = [
  {
    title: '项目类别',
    field: 'proCatName',
    width: 'fit',
    align: 'left'
  },
  {
    title: '项目任务明细代码',
    field: 'estDetailCode',
    width: 'fit',
    align: 'left'
  },
  {
    title: '项目任务明细名称',
    field: 'estDetailName',
    width: 'fit',
    align: 'left'
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

export const taskFormula = [
  {
    title: '公式名称',
    field: 'name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '公式',
    field: 'formulaName',
    width: 'fit',
    align: 'center'
  }
]

export const formula = [
  {
    title: '公式名称',
    field: 'name',
    width: 'fit',
    align: 'center'
  },
  {
    title: '公式内容',
    field: 'formulaName',
    width: 'fit',
    align: 'center'
  }
]

export const group = [
  {
    title: '分组名称',
    field: 'groupname',
    width: 'fit',
    align: 'center'
  }
]

export default {
  taskTemplateMaintain: columns
}
