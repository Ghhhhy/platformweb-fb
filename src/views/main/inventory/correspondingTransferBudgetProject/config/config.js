// 查询区条件
const leftFormItemData = {
  bgtDeptName: '',
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
    field: 'proName',
    formatter({ row }) {
      if (row.proCode && row.proName) {
        return `${row.proCode}-${row.proName}`
      }
      return `${row.proName}`
    }
  },
  // {
  //   title: '资金类型',
  //   field: 'fundTypeName'
  // },
  {
    title: '项目类别',
    field: 'proCatName',
    formatter({ row }) {
      if (row.proCatCode && row.proCatName) {
        return `${row.proCatCode}-${row.proCatName}`
      }
      return `${row.proCatName}`
    }
  },
  {
    title: '资金主管部门',
    field: 'bgtDeptName',
    formatter({ row }) {
      if (row.bgtDeptCode && row.bgtDeptName) {
        return `${row.bgtDeptCode}-${row.bgtDeptName}`
      }
      return `${row.bgtDeptName}`
    }
  },
  {
    title: '资金主管处室',
    field: 'fundMofDepName',
    span: 12,
    align: 'left',
    formatter({ row }) {
      if (row.fundMofDepCode && row.fundMofDepName) {
        return `${row.fundMofDepCode}-${row.fundMofDepName}`
      }
      return `${row.fundMofDepName}`
    },
    itemRender: {
      name: '$vxeNewInput',
      props: {
        placeholder: '专项资金',
        clearable: true
      }
    }
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
    field: 'objName',
    formatter({ row }) {
      if (row.objCode && row.objName) {
        return `${row.objCode}-${row.objName}`
      }
      return `${row.objName}`
    }
  },
  // {
  //   title: '资金类型',
  //   field: 'ext2'
  // },
  {
    title: '项目类别',
    field: 'proCatName',
    formatter({ row }) {
      if (row.proCatCode && row.proCatName) {
        return `${row.proCatCode}-${row.proCatName}`
      }
      return `${row.proCatName}`
    }
  },
  {
    title: '资金主管部门',
    field: 'bgtDeptName',
    formatter({ row }) {
      if (row.bgtDeptCode && row.bgtDeptName) {
        return `${row.bgtDeptCode}-${row.bgtDeptName}`
      }
      return `${row.bgtDeptName}`
    }
  },
  {
    title: '资金主管处室',
    field: 'manageMofDepName',
    span: 12,
    align: 'left',
    formatter({ row }) {
      if (row.manageMofDepCode && row.manageMofDepName) {
        return `${row.manageMofDepCode}-${row.manageMofDepName}`
      }
      return `${row.manageMofDepName}`
    }
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
