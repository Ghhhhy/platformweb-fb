// 页面：项目库管理 => 项目申报管理 => 一键测算
// 修改记录表 表头配置 陈茁 2020-7-13 15:59
export const oneClickConfig = {
  columns: [
    {
      title: '项目类别',
      field: 'pro_cat_name',
      width: 200,
      align: 'left',
      type: 'treeinput'
    },
    {
      title: '存续状态',
      field: 'exist_statue_code',
      width: 150,
      align: 'left',
      formatter: (value, column) => {
        if (value.cellValue === '001') {
          return '一次性项目'
        }
        if (value.cellValue === '002') {
          return '经常性项目'
        }
        if (value.cellValue === '003') {
          return '阶段性项目'
        }
      },
      filterMultiple: false,
      filters: [
        { label: '一次性项目', value: '001' },
        { label: '经常性项目', value: '002' },
        { label: '阶段性项目', value: '003' }
      ]
    },
    {
      title: '支出项目类别',
      field: 'payout_kind_name',
      width: 300,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '项目代码',
      field: 'pro_code',
      width: 200,
      align: 'right',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '项目名称',
      field: 'pro_name',
      width: 200,
      align: 'left',
      cellRender: {
        name: '$href',
        props: {
          type: 'text'
        }
      }
    },
    {
      title: '项目单位',
      field: 'use_agency_name',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '主管部门',
      field: 'dept_name',
      align: 'left',
      width: 300
    },
    {
      title: '财政内部机构',
      field: 'mof_dep_name',
      width: 150,
      align: 'left',
      type: 'treeinput'
    },
    {
      title: '职能职责',
      field: 'fun_res_name',
      align: 'left',
      width: 200
    },
    {
      title: '项目开始时间',
      field: 'pro_start_year',
      align: 'right',
      width: 150
    },
    {
      title: '项目结束时间',
      field: 'end_year',
      align: 'right',
      width: 150
    },
    {
      title: '项目期限(年)',
      field: 'pro_term',
      align: 'right',
      width: 200
    },
    {
      title: '项目金额',
      field: 'pro_total_amt',
      align: 'right',
      width: 120,
      editRender: {
        name: '$moneyRender'
      }
    },
    {
      title: '申报单位联系人',
      field: 'apply_link_man',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '申报联系电话',
      field: 'apply_link_tel',
      width: 200,
      align: 'right',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    }
    // {
    //   title: '项目来源',
    //   field: 'pro_source',
    //   width: 200,
    //   formatter: (value, column) => {
    //     if (value.cellValue === '1') {
    //       return '本级申报项目'
    //     }
    //     if (value.cellValue === '2') {
    //       return '下级上报的转移支付项目'
    //     }
    //     if (value.cellValue === '3') {
    //       return '下级上报的债卷安排项目'
    //     }
    //   }
    // }
  ],
  buttons: [
    { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
    {
      code: 'toolbar-insert',
      name: '生成',
      callback: function () {
        alert(1)
      } },
    { code: 'toolbar-view', name: '查看详情' }
  ]
}
export let formItemsConfig = [
  {
    field: 'pro_cat_',
    title: '项目类别',
    span: 8,
    itemRender: {
      name: '$treeinput',
      required: true,
      props: {
        isServer: true,
        isleaf: true,
        elecode: 'procat',
        disabled: true,
        queryparams: {
          eleCode: 'procat',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'pro_name',
    title: '项目名称',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        type: 'text',
        disabled: true,
        placeholder: '请输入内容'
      }
    }
  },
  {
    field: 'agency_',
    title: '申报单位',
    span: 8,
    itemRender: {
      name: '$treeinput',
      props: {
        disabled: true,
        isServer: true,
        isleaf: true,
        elecode: 'agency',
        queryparams: {
          eleCode: 'agency',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'dept_',
    title: '主管部门',
    span: 8,
    itemRender: {
      name: '$treeinput',
      props: {
        disabled: true,
        isServer: true,
        isleaf: true,
        elecode: 'dep',
        queryparams: {
          eleCode: 'dep',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'mof_dep_',
    title: '财政内部机构',
    span: 8,
    itemRender: {
      name: '$treeinput',
      props: {
        disabled: true,
        isServer: true,
        elecode: 'DEPARTMENT',
        queryparams: {
          eleCode: 'DEPARTMENT',
          sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
        }
      }
    }
  },
  {
    field: 'pro_start_year',
    title: '项目开始时间',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'year',
        placeholder: '选择日期'
      }
    }
  },
  {
    field: 'end_year',
    title: '项目结束时间',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'year',
        placeholder: '选择日期'
      }
    }
  },
  {
    field: 'pro_total_amt',
    title: '项目总额',
    span: 8,
    itemRender: {
      name: '$input',
      props: {
        disabled: true,
        type: 'number',
        placeholder: '请输入数字'
      }
    }
  },
  {
    field: 'pro_source',
    title: '项目来源',
    span: 8,
    itemRender: {
      name: '$select',
      props: {
        disabled: true,
        type: 'select',
        options: [{
          value: '1',
          label: '本级申报项目'
        }, {
          value: '2',
          label: '下级上报的转移支付项目'
        }, {
          value: '3',
          label: '下级上报的债卷安排项目'
        }],
        placeholder: '请选择项目来源'
      }
    }
  },
  {
    field: 'exist_statue_code',
    title: '存续状态',
    span: 8,
    itemRender: {
      name: '$select',
      props: {
        disabled: true,
        type: 'select',
        options: [{
          value: '001',
          label: '一次性项目'
        }, {
          value: '002',
          label: '经常性项目'
        }, {
          value: '003',
          label: '延续性项目'
        }],
        placeholder: '请选择存续状态'
      }
    }
  }
]
// 表格双向绑定
export let formDataList = {
  pro_cat_: '',
  pro_name: '',
  agency_: '',
  dept_: '',
  mof_dep_: '',
  pro_start_year: '',
  end_year: '',
  pro_total_amt: '',
  pro_source: '',
  exist_statue_code: ''
}
