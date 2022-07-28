// 表格测试数据  表格回读必须得给prefix_id prefix_name值
export const tableDataList = [
  {
    bgt_dept_id: '6BC41720F51A3B3A573181BB6F6833F8',
    bgt_dept_name: '预算处预留',
    bgt_dept_code: '000',
    name: 'lisi',
    age: 34
  }, {
    bgt_dept_: '',
    name: 'zhangsan',
    age: 24
  }
]

export const tableValidationConfig = {
  bgt_dept_: [
    {
      required: true,
      message: '必填项',
      trigger: 'change'
    }],
  mof_: [
    {
      required: true,
      message: '必填项',
      trigger: 'change'
    }],
  name: [
    {
      required: true,
      message: '必填项',
      trigger: 'change'
    }],
  age: [
    {
      required: true,
      message: '必填项',
      trigger: 'change'
    }]

}

export const tableItemsConfig = [
  {
    field: 'bgt_dept_',
    title: '主管部门',
    span: 8,
    filters: [{ data: '' }],
    filterRender: { name: 'FilterInput' },
    editRender: {
      name: '$treeinput',
      props: {
        isServer: true,
        elecode: 'procat',
        isleaf: true,
        queryparams: {
          eleCode: 'procat',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'name',
    title: '姓名',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        type: 'text',
        placeholder: '请输入姓名',
        disabled: 'disabled'
      }
    }
  },
  {
    title: 'Age',
    field: 'age',
    sortable: true,
    width: 120,
    align: 'center',
    combinedType: ['average'],
    editRender: {
      name: '$input',
      defaultValue: 1,
      props: {
        type: 'number',
        placeholder: '抢输入年龄',
        redonly: true
      }
    }
  }
]
