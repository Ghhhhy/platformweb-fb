// 页面：指标管理 => 指标导入配置界面
export let buttonInfo = {
  buttons: [
    // { code: 'toolbar-save', name: '保存' },
    { code: 'toolbar-add', name: '新增' },
    { code: 'toolbar-update', name: '修改' },
    { code: 'toolbar-remove', name: '删除' },
    { code: 'toolbar-upload', name: '上传模板' },
    { code: 'toolbar-delete', name: '删除模板' }
  ],
  moneyConversion: false
}

export const columns = [
  {
    field: 'title',
    title: '中文名',
    align: 'left',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '字段名',
    field: 'field',
    align: 'left',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '类型',
    field: 'type',
    width: '200',
    filterMultiple: true,
    itemRender: {
      disabled: false,
      name: '$vxeFormSelect',
      options: [
        { label: '要素', value: 'treeinput' },
        { label: '文本', value: 'text' },
        { label: '金额', value: 'money' }
      ],
      props: {
        disabled: false,
        placeholder: '请选择'
      }
    }
  },
  {
    title: '要素编码',
    field: 'elecode',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '格式',
    field: 'formatter',
    width: '200',
    filterMultiple: true,
    itemRender: {
      disabled: false,
      name: '$select',
      options: [
        { label: '编码', value: 'code' },
        { label: '名称', value: 'name' },
        { label: '编码-名称', value: 'code-name' }
      ],
      props: {
        disabled: false,
        placeholder: '请选择'
      }
    }
  },
  {
    title: '排序',
    field: 'ordernum',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'number',
        min: 0
      }
    }
  },
  // {
  //   title: '默认值',
  //   field: 'default_value',
  //   width: '200',
  //   itemRender: {
  //     name: '$input',
  //     props: {
  //       type: 'text'
  //     }
  //   }
  // },
  {
    title: '级次',
    field: 'isleaf',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        type: 'text'
      }
    }
  },
  {
    title: '模板编码',
    field: 'main_code',
    width: '200',
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'text'
      }
    }
  }
]

export let insertMainFormConfig = [
  {
    field: 'name',
    title: '模板名称',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: false,
        type: 'text',
        placeholder: '规则名称'
      }
    }
  }
]

export const insertMainDataDefault = {
  name: '' // 模板名称
}

export const tableFiledCheck = {
  title: [
    {
      required: true,
      message: '中文名不能为空'
    }
  ],
  field: [
    {
      required: true,
      message: '字段名不能为空'
    }
  ],
  type: [
    {
      required: true,
      message: '类型不能为空'
    }
  ],
  elecode: [
    {
      required: true,
      message: '要素编码不能为空'
    }
  ],
  formatter: [
    {
      required: true,
      message: '格式不能为空'
    }
  ],
  ordernum: [
    {
      required: true,
      message: '排序不能为空'
    }
  ]
}

export const insertFormData = {
  title: '', // 标题
  field: '', // 项目
  type: '',
  elecode: '',
  formatter: '',
  ordernum: '',
  isleaf: '',
  main_code: ''
}
