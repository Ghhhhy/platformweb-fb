// 页面：基础信息管理 => 支出标准管理 => 支出标准审核(非人员工用标准)
// 支出标准审核列表 表头配置 张颖捷 2020-7-13 12:05
export const columns = [
  {
    title: '标准分类',
    field: 'exp_cri_class',
    // formatter: (value, column) => {
    //   return value.cellValue === '1' ? '法定标准' : '固定标准'
    // }
    editRender: {
      name: '$select',
      options: [
        { value: '1', label: '法定标准' },
        { value: '2', label: '固定标准' },
        { value: '3', label: '暂定标准' }
      ]
    }
  },
  {
    title: '标准编码',
    field: 'exp_cri_code'
    // filters: [
    //   {
    //     label: '010',
    //     value: '010',
    //     filterMultiple: false,
    //     filterMethod: ({ value, row, column }) => { }
    //   }
    // ]
  },
  {
    title: '标准名称',
    field: 'exp_cri_name'
  },
  {
    title: '标准',
    field: 'exp_cri_val'
    // filters: [
    //   {
    //     label: '1000',
    //     value: '1000',
    //     filterMultiple: false,
    //     filterMethod: ({ value, row, column }) => { }
    //   },
    //   {
    //     label: '2000',
    //     value: '2000',
    //     filterMultiple: false,
    //     filterMethod: ({ value, row, column }) => { }
    //   }
    // ]
  },
  {
    title: '计量单位',
    field: 'unit'
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
    // editRender: {
    //   name: '$select',
    //   options: [
    //     { value: '1', label: '元' },
    //     { value: '2', label: '元/人' },
    //     { value: '3', label: '元/每平方米' },
    //     { value: '4', label: '元/每辆' }
    //   ]
    // }
    // filters: [
    //   {
    //     label: '元/人月',
    //     value: '元/人月',
    //     filterMultiple: false,
    //     filterMethod: ({ value, row, column }) => { }
    //   }
    // ]
  },
  {
    title: '计算方式',
    field: 'form',
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
    title: '启用状态',
    field: 'is_enabled',
    width: 120,
    // formatter: (value, column) => {
    //   return value.cellValue === 1 ? '是' : '否'
    // }
    editRender: {
      name: '$select',
      options: [
        { value: 1, label: '是' },
        { value: 0, label: '否' }
      ]
    }
  }
]

export default {
  expenseNormAudit: columns
}
