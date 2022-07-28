// 页面：项目库管理 => 项目基础信息管理 => 专项资金目录维护
// 页面：项目库管理 => 项目基础信息管理 => 专项资金目录授权
// 专项资金目录主视图 表头配置  2020-7-13 16:02
// 负责人：黄丹
export const columns = [
  {
    title: '专项资金类别',
    field: 'spe_level',
    align: 'left',
    width: 150,
    formatter: (value, column) => {
      switch (value.row.spe_level) {
        case '1':
          return '中央专项'
        case '2':
          return '省级专项'
        case '3':
          return '市级专项'
        case '4':
          return '县/区级专项'
        default:
          return value.row.spe_level
      }
    }
  },
  {
    title: '父级专项资金',
    field: 'parent_name',
    align: 'left',
    width: 150,
    formatter: (value, column) => {
      return value.row.parent_name
    }
  },
  {
    title: '专项资金目录代码',
    field: 'spe_code',
    align: 'left',
    width: 200
  },
  {
    title: '专项资金目录名称',
    field: 'spe_name',
    align: 'left',
    width: 200
  },
  {
    title: '财政内部机构',
    field: 'mof_dep_name',
    align: 'left',
    width: 200
  },
  {
    title: '主管部门',
    field: 'dept_name',
    align: 'left',
    width: 300
  },
  {
    title: '上级主管部门',
    field: 'up_dept_name',
    align: 'left',
    width: 300
  }, {
    title: '上级财政内部机构',
    field: 'up_mof_dep_name',
    align: 'left',
    width: 300
  }, {
    title: '是否启用',
    field: 'is_enable',
    align: 'left',
    width: 150,
    formatter: (value, column) => {
      switch (value.row.is_enable) {
        case '0':
          return '禁用'
        case '1':
          return '启用'
        default:
          return value.row.is_enable
      }
    }
  },
  {
    title: '是否外网授权',
    field: 'is_author',
    align: 'left',
    width: 150,
    formatter: (value, column) => {
      switch (value.row.is_author) {
        case '0':
          return '否'
        case '1':
          return '是'
        default:
          return value.row.is_author
      }
    }
  },
  // {
  //   title: '是否录入发布指南',
  //   field: 'is_guide',
  //   width: 120
  // },
  {
    title: '说明',
    field: 'remark',
    align: 'left',
    width: 300
  }
]

export const fileColumn = [
  {
    title: '指南名称',
    field: 'filename',
    align: 'center'
  }
]

export const specialFundsTableList = [{
  spe_level: '',
  parent_name: '',
  spe_code: '',
  spe_name: '',
  mof_dep_name: '',
  dept_name: '',
  up_dept_name: '',
  up_mof_dep_name: '',
  is_leaf: '',
  is_enable: '',
  remark: ''
}]
export default {
  specialFundsList: columns
}
