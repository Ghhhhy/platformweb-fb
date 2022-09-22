const tableConf = {
  itemsConfig: [
    {
      title: '项目类别',
      sortable: true,
      field: 'pro_cat_name',
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
      // if (value.cellValue === '003') {
      //   return '阶段性项目'
      // }
      },
      filterMultiple: false,
      filters: [
        { label: '一次性项目', value: '001' },
        { label: '经常性项目', value: '002' }
      // { label: '阶段性项目', value: '003' }
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
      width: 300,
      align: 'left',
      cellRender: {
        name: '$href',
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
      title: '财政内部机构',
      field: 'mof_dep_name',
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
      field: 'fun_res_name',
      title: '职能职责',
      align: 'left',
      width: 200
    },
    {
      title: '项目起始年度',
      field: 'pro_start_year',
      align: 'right',
      width: 200
    },
    {
      title: '项目结束年度',
      field: 'end_year',
      align: 'right',
      width: 200
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
      width: 200,
      align: 'right',
      combinedType: ['average', 'total'],
      filterMultiple: false,
      filters: [
        { label: '项目金额大于100', value: 100 },
        { label: '项目金额大于500', value: 500 }
      ],
      editRender: {
        name: '$moneyRender'
      },
      // obj 中 value是选中选项的值 row 被遍历的列
      filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return obj.row.pro_total_amt > obj.value
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
    },
    {
      title: '设立依据',
      field: 'degisn_consideration',
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
      title: '项目概述',
      field: 'pro_desc',
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
    }],
  globalConfig: {
    tableName: '人员及公用经费项目申报'
  },
  formConfig: []
}

export default tableConf
