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
    }
    // {
    //   title: '监控规则名称',
    //   field: 'fiRuleName',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '监控规则名称'
    //     }
    //   }
    // }
    // {
    //   title: '区划',
    //   field: 'businessModuleCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeTree',
    //   itemRender: {
    //     name: '$vxeTree',
    //     options: [],
    //     'props': {
    //       'config': {
    //         treeData: [],
    //         'placeholder': '区划',
    //         'multiple': true,
    //         'readonly': true,
    //         'isleaf': false
    //         // 'axiosConfig': {
    //         //   'method': 'get',
    //         //   'url': 'large-monitor-platform/lmp/mofDivTree'
    //         // }
    //       }
    //       // 'queryparams': {
    //       //   'elementCode': 'admdiv',
    //       //   year: '2022',
    //       //   province: '610000000'
    //       // }
    //     }
    //   }
    // }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  PoliciesTableColumns: [
    {
      title: '地区名称',
      field: 'mofDivName',
      width: '150',
      sortable: false,
      align: 'left'
    },
    {
      title: '整体违规情况',
      field: 'totals',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
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
    {
      title: '基本信息主题',
      field: 'sx',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class01WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class01WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class01WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '项目库主题',
      field: 'xa',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class02WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class02WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class02WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '预算编制主题',
      field: 'tc',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class03WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class03WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class03WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '预算调整调剂主题',
      field: 'bj',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class04WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class04WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class04WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '预算批复主题',
      field: 'xy',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class05WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class05WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class05WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '预算执行主题',
      field: 'wn',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class06WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class06WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class06WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '会计核算主题',
      field: 'ya',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class07WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class07WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class07WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '决算和报告主题',
      field: 'hz',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'class08WholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'class08WholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'class08WholeNoHandleCount',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '责令改正事项',
      field: 'thing',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '次数',
          field: 'orderCorrectionCount',
          width: '150',
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'orderCorrectionAmount ',
          width: '150',
          align: 'center'
        },
        {
          title: '已改正事项次数',
          field: 'correctedCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已改正事项涉及金额',
          field: 'correctedAmount',
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
