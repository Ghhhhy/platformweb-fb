// 查询区条件
const leftFormItemData = {
  fund_type_name: '',
  proName: ''
}

// 查询表单设置
const leftFormItem = [
  {
    title: '专项资金',
    field: 'proName',
    span: 12,
    align: 'left',
    formatter({ row }) {
      if (row.proCode && row.proName) {
        return <div>{row.proCode}-{row.proName}</div>
      }
      return <div>{row.proName}</div>
    },
    itemRender: {
      name: '$vxeInput',
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
    title: '专项资金',
    field: 'objName',
    span: 12,
    align: 'left',
    formatter({ row }) {
      if (row.proCode && row.proName) {
        return <div>{row.proCode}-{row.proName}</div>
      }
      return <div>{row.proName}</div>
    },
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
