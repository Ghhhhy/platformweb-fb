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
      title: '监控规则名称',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则名称'
        }
      }
    }
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
      title: '规则名称',
      field: 'fiRuleName',
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
        },
        {
          title: '处理进度',
          field: 'wholeProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '省本级',
      field: 'sx',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'sxCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'sxHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'sxNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'sxProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '西安市',
      field: 'xa',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'xaCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'xaHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'xaNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'xaProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '铜川市',
      field: 'tc',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'tcCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'tcHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'tcNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'tcProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '宝鸡市',
      field: 'bj',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'bjCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'bjHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'bjNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'bjProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '咸阳市',
      field: 'xy',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'xyCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'xyHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'xyNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'xyProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '渭南市',
      field: 'wn',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'wnCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'wnHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'wnNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'wnProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '延安市',
      field: 'ya',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'yaCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'yaHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'yaNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'yaProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '汉中市',
      field: 'hz',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'hzCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'hzHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'hzNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'hzProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '榆林市',
      field: 'yl',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'ylCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'ylHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'ylNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'ylProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '安康市',
      field: 'ak',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'akCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'akHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'akNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'akProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '商洛市',
      field: 'sl',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'slCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'slHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'slNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'slProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '杨凌示范区',
      field: 'ylq',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计违规',
          field: 'ylqCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'ylqHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'ylqNoHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '处理进度',
          field: 'ylqProcessingProgress',
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
