// 查询区条件
const leftFormItemData = {
  bgtMofDepName: '',
  proName: ''
}

// 查询表单设置
const leftFormItem = [
  {
    title: '资金主管部门',
    field: 'bgtDeptName',
    span: 12,
    align: 'left',
    name: '$vxeSelect',
    itemRender: {
      name: '$vxeNewInput',
      props: {
        placeholder: '资金主管部门',
        clearable: true
      }
    }
  },
  {
    title: '专项资金',
    field: 'proName',
    span: 12,
    align: 'left',
    itemRender: {
      name: '$vxeNewInput',
      props: {
        placeholder: '专项资金',
        clearable: true
      }
    }
  }
]

const leftTableColumnsConfig = [
  {
    title: '专项资金',
    field: 'proName'
  },
  // {
  //   title: '资金类型',
  //   field: 'fundTypeName'
  // },
  {
    title: '项目类别',
    field: 'proCatName'
  },
  {
    title: '资金主管部门',
    field: 'bgtDeptName'
  }
]
// 查询区条件
const rightFormItemData = {
  objName: '',
  ext2: ''
}

// 查询表单设置
const rightFormItem = [
  {
    title: '资金主管部门',
    field: 'bgtDeptName',
    span: 12,
    align: 'left',
    itemRender: {
      name: '$vxeInput',
      props: {
        placeholder: '资金主管部门',
        clearable: true
      }
    }
  },
  {
    title: '专项资金',
    field: 'objName',
    span: 12,
    align: 'left',
    itemRender: {
      name: '$vxeInput',
      props: {
        placeholder: '专项资金',
        clearable: true
      }
    }
  }
]

const rightTableColumnsConfig = [
  {
    title: '专项资金',
    field: 'objName'
  },
  // {
  //   title: '资金类型',
  //   field: 'ext2'
  // },
  {
    title: '项目类别',
    field: 'proCatName'
  },
  {
    title: '资金主管部门',
    field: 'bgtDeptName'
  }
]

export {
  leftFormItemData,
  leftFormItem,
  leftTableColumnsConfig,
  rightFormItemData,
  rightFormItem,
  rightTableColumnsConfig
}
