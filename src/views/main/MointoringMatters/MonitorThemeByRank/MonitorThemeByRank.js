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
            'multiple': false,
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
      title: '管理级次',
      field: 'regulationType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    }
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
      title: '红色预警',
      field: 'red',
      sortable: false,
      align: 'left',
      children: [
        {
          title: '累计预警',
          field: 'redWholeCount',
          width: '150',
          align: 'center'
        },
        {
          title: '已处理',
          field: 'redWholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '未处理',
          field: 'redWholeNoHandleCount',
          width: '150',
          align: 'center'
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
          align: 'center'
        },
        {
          title: '问询单',
          field: 'orangeWholeInquiriesCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单已处理',
          field: 'orangeWholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单未完成',
          field: 'orangeWholeNoHandleCount',
          width: '150',
          align: 'center'
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
          align: 'center'
        },
        {
          title: '问询单',
          field: 'yellowWholeInquiriesCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单已处理',
          field: 'yellowWholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单未完成',
          field: 'yellowWholeNoHandleCount',
          width: '150',
          align: 'center'
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
          align: 'center'
        },
        {
          title: '问询单',
          field: 'blueWholeInquiriesCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单已处理',
          field: 'blueWholeHandleCount',
          width: '150',
          align: 'center'
        },
        {
          title: '问询单未完成',
          field: 'blueWholeNoHandleCount',
          width: '150',
          align: 'center'
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
