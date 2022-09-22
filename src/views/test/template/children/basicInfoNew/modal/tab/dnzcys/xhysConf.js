const xhysConf = {
  dnzcxmys: {
    formItemsConfig: [
      {
        field: 'name',
        title: '名称',
        itemRender: {
          name: '$span'
        }
      },
      {
        field: 'nickname',
        title: '昵称',
        span: 8,
        itemRender: {
          name: '$span'
        }
      }, {
        field: 'age',
        title: '年龄',
        span: 8,
        itemRender: {
          name: '$span'
        }
      }, {
        field: 'sex',
        title: '性别',
        span: 8,
        itemRender: {
          name: '$span'
        }
      },
      {
        field: 'category',
        title: '角色',
        span: 8,
        itemRender: {
          name: '$span'
        }
      },
      {
        field: 'select',
        title: '学历',
        span: 8,
        itemRender: {
          name: '$span'
        }
      }],
    formDataList: {
      name: 'John Brown',
      nickname: 'John Brown nick',
      age: 18,
      sex: 0,
      select: '001',
      treeinput: '',
      category: '前端',
      address: 'New York No. 1 Lake Park',
      status: 0
    }, // 表单数据集
    formConfig: {} // 表单用户配置
  }
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return xhysConf[tableType][configType]
  } else if (tableType) {
    return xhysConf[tableType]
  } else {
    return null
  }
}
