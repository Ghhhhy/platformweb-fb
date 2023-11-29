// import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'Export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2021', label: '2021' },
          { value: '2022', label: '2022' },
          { value: '2023', label: '2023' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '区划',
      field: 'mofDivCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '区划',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '监控主题',
      field: 'regulationClass',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '监控主题',
            'multiple': true,
            'readonly': true,
            'isleaf': true
          }
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodeList',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '预算单位',
            'multiple': true,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      title: '预警开始时间',
      field: 'startTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '预警开始时间'
        }
      }
    },
    {
      title: '预警结束时间',
      field: 'endTime',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        props: {
          format: 'YYYY-MM-DD hh:mm:ss',
          type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          placeholder: '预警结束时间'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: '',
    startTime: '',
    endTime: ''
  },
  PoliciesTableColumns: [
    {
      title: '地区名称',
      field: 'mofDivName',
      align: 'left',
      fixed: 'left',
      width: 150,
      cellRender: {
        name: '$vxeIcon'
      }
    },
    {
      title: '整体预警情况',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'wholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'wholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'wholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    // {
    //   title: '基本信息主题',
    //   field: 'sx',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class01WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class01WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class01WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '项目库主题',
    //   field: 'xa',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class02WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class02WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class02WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '预算编制主题',
    //   field: 'tc',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class03WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class03WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class03WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '预算调整调剂主题',
    //   field: 'bj',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class04WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class04WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class04WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '预算批复主题',
    //   field: 'xy',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class05WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class05WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class05WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '预算执行主题',
    //   field: 'wn',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class06WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class06WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class06WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '会计核算主题',
    //   field: 'ya',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class07WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class07WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class07WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    // {
    //   title: '决算和报告主题',
    //   field: 'hz',
    //   sortable: false,
    //   align: 'left',
    //   children: [
    //     {
    //       title: '累计预警',
    //       field: 'class08WholeCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '已处理',
    //       field: 'class08WholeHandleCount',
    //       width: '150',
    //       align: 'center'
    //     },
    //     {
    //       title: '未处理',
    //       field: 'class08WholeNoHandleCount',
    //       width: '150',
    //       align: 'center'
    //     }
    //   ]
    // },
    {
      title: '监控问询情况',
      field: 'thing',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计问询单',
          field: 'correctedCount',
          width: '150',
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'correctedAmount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'orderCorrectionCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理涉及金额',
          field: 'orderCorrectionAmount',
          width: '150',
          align: 'center'
        }
      ]
    }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
