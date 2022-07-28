// 页面：基础信息管理 => 支出标准管理 => 支出标准维护（人员、公用）
// 支出标准维护(财政部门)表单 表头配置 张颖捷 2020-7-13 11:37
// reportguid: 85759
export const columns = [
  {
    title: '标准分类',
    field: 'exp_cri_class',
    width: 120
  },
  {
    title: '支出标准类别',
    field: 'cri_type_name',
    width: 120,
    editRender: {
      name: '$treeText'
      // props: {
      //   // noCode: true
      // }
    }
  },
  {
    title: '标准编码',
    field: 'exp_cri_code',
    width: 120
  },
  {
    title: '标准名称',
    field: 'exp_cri_name',
    width: 180
  },
  {
    title: '支出档次',
    field: 'cri_level',
    width: 120
  },
  {
    title: '计量单位',
    field: 'unit',
    width: 120,
    // formatter: (value, column) => {
    //   // return value.cellValue === 1 ? '是' : '否'
    //   switch (value.cellValue) {
    //     case '1':
    //       return '元'
    //     case '2':
    //       return '元/人'
    //     case '3':
    //       return '元/每平方米'
    //     case '4':
    //       return '元/每辆'
    //     default:
    //       return value.cellValue
    //   }
    // }
    editRender: {
      name: '$select',
      options: [
        { value: '1', label: '元' },
        { value: '2', label: '元/人' },
        { value: '3', label: '元/每平方米' },
        { value: '4', label: '元/每辆' }
      ]
    }
  },
  {
    title: '财政内设机构',
    field: 'mof_dep_name',
    width: 120
  },
  {
    title: '标准',
    field: 'exp_cri_val',
    width: 120
  },
  {
    title: '计算方式',
    field: 'form',
    width: 120,
    // formatter: (value, column) => {
    //   // return value.cellValue === 1 ? '是' : '否'
    //   if (value.cellValue === '1') {
    //     return '定额'
    //   } else if (value.cellValue === '2') {
    //     return '比例'
    //   } else if (value.cellValue === '3') {
    //     return '限额'
    //   } else {
    //     return value.cellValue
    //   }
    // }
    editRender: {
      name: '$select',
      options: [
        { value: '1', label: '定额' },
        { value: '2', label: '比例' },
        { value: '3', label: '限额' }
      ]
    }
  },
  {
    title: '支出经济分类',
    field: 'dep_bgt_eco_type_',
    width: 120
  },
  {
    title: '启用日期',
    field: 'start_date',
    width: 120
  },
  {
    title: '启用状态',
    field: 'is_enabled',
    width: 120,
    // formatter: (value, column) => {
    //   return value.cellValue === 1 ? '是' : '否'
    // }
    editRender: {
      name: '$selcet',
      options: [
        { value: '1', label: '是' },
        { value: '2', label: '否' }
      ]
    }
  },
  {
    title: '开支范围',
    field: 'exp_scope',
    width: 120
  },
  {
    title: '开支内容',
    field: 'exp_content',
    width: 120
  }
]

export default {
  expenseNormEgisFinancialDeptAnother: columns
}
