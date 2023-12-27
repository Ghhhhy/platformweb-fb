import store from '@/store/index'

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
      visible: !store.getters.isSx,
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
      title: '规则名称',
      field: 'fiRuleName',
      width: '150',
      sortable: false,
      align: 'left'
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
    {
      title: '红色预警',
      field: 'red',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'redWholeCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon1',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '已处理',
          field: 'redWholeHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon3',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '未处理',
          field: 'redWholeNoHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon1',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '处理进度',
          field: 'redProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '橙色预警',
      field: 'orange',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'orangeWholeCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon6',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '已处理',
          field: 'orangeWholeHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon3',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '未处理',
          field: 'orangeWholeNoHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon6',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '处理进度',
          field: 'orangeProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '黄色预警',
      field: 'yellow',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'yellowWholeCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon2',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '已处理',
          field: 'yellowWholeHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon3',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '未处理',
          field: 'yellowWholeNoHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon2',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '处理进度',
          field: 'yellowProcessingProgress',
          width: '150',
          align: 'center'
        }
      ]
    },
    {
      title: '蓝色预警',
      field: 'blue',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'blueWholeCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon7',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '已处理',
          field: 'blueWholeHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon3',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '未处理',
          field: 'blueWholeNoHandleCount',
          width: '150',
          align: 'center',
          cellRender: {
            name: '$vxeIcon7',
            props: {
              $refs: this
            }
          }
        },
        {
          title: '处理进度',
          field: 'blueProcessingProgress',
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
          visible: !store.getters.isHLJ,
          align: 'center'
        },
        {
          title: '涉及金额',
          field: 'orderCorrectionAmount',
          width: '150',
          align: 'center',
          visible: !store.getters.isHLJ,
          cellRender: { name: '$vxeMoney' }
        },
        {
          title: '已改正事项次数',
          field: 'correctedCount',
          width: '150',
          visible: !store.getters.isHLJ,
          align: 'center'
        },
        {
          title: '已改正事项涉及金额',
          field: 'correctedAmount',
          width: '150',
          align: 'center',
          visible: !store.getters.isHLJ,
          cellRender: { name: '$vxeMoney' }
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
