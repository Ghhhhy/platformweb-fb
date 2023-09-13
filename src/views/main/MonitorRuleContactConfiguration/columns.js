import store from '@/store/index'
const dict = store.state.warnInfo.warnLevelOptions.map(item => {
  return {
    ...item,
    value: String(item.value)
  }
})

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
      { code: 'setup', label: '设置规则联系人', status: 'primary' }
      // { code: 'edit', label: '修改规则联系人', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '监控规则名称',
      field: 'regulationName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则名称',
          clearable: true
        }
      }
    },
    {
      title: '规则类型',
      field: 'fiRuleTypeCode',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeTree',
        options: [
          { value: '1',
            label: '中央监控规则',
            children: [
              { value: '11', label: '通用类监控规则' },
              { value: '12', label: '专项类监控规则' },
              { value: '19', label: '其他监控规则' }
            ]
          },
          { value: '2',
            label: '地方监控规则',
            children: [
              { value: '21', label: '通用类监控规则' },
              { value: '22', label: '专项类监控规则' },
              { value: '29', label: '其他监控规则' }
            ]
          }
        ],
        props: {
          config: {
            valueKeys: ['value', 'label', 'value'],
            format: '{name}',
            treeProps: {
              labelFormat: '{value}-{label}', // {code}-{name}
              nodeKey: 'value',
              label: 'label',
              children: 'children'
            },
            placeholder: '规则类型',
            multiple: false,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '管理级次',
      field: 'regulationType',
      'width': 180,
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
          placeholder: '管理级次',
          clearable: true
        }
      }
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: dict,
        props: {
          placeholder: '预警级别',
          clearable: true
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
    }
    // {
    //   title: '处理方式',
    //   field: 'handleType',
    //   'width': 180,
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeSelect',
    //   itemRender: {
    //     name: '$vxeSelect',
    //     options: store.state.warnInfo.warnControlTypeOptions.map(item => {
    //       return {
    //         ...item,
    //         value: String(item.value)
    //       }
    //     }),
    //     props: {
    //       placeholder: '处理方式'
    //     }
    //   }
    // },
    // {
    //   title: '规则模板',
    //   field: 'GZMB',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     props: {
    //       placeholder: '规则模板'
    //     }
    //   }
    // }
  ],
  PoliciesTableColumns: [
    {
      title: '区划',
      field: 'mofDivName',
      align: 'center'
    },
    {
      title: '监控主题',
      field: 'regulationClassName',
      sortable: false,
      align: 'center'
    },
    {
      title: '规则类型',
      field: 'fiRuleTypeName',
      sortable: false,
      align: 'center'
    },
    {
      title: '管理级次',
      width: 180,
      field: 'regulationType',
      sortable: true,
      align: 'center',
      name: '$vxeSelect',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '是否启用'
        }
      }
    },
    {
      title: '监控规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warningLevel',
      sortable: false,
      align: 'center',
      name: '$vxeSelect',
      slots: {
        default({ row }) {
          return [
            <div class={'warningLevel' + row.warningLevel}>{dict.find(item => item.value === String(row.warningLevel))?.label}</div>
          ]
        }
      },
      cellRender: {
        name: '$vxeSelect',
        options: dict,
        props: {
          placeholder: '是否启用'
        }
      }
    },
    {
      title: '是否启用',
      field: 'isEnable',
      sortable: false,
      align: 'center',
      formatter: ({ row }, column) => {
        const dictMap = { 1: '是', 2: '否' }
        return dictMap[row.isEnable] || ''
      }
    },
    {
      title: '联系人',
      field: 'contactPerson',
      sortable: false,
      align: 'center'
    },
    {
      title: '联系电话',
      field: 'officePhone',
      sortable: false,
      align: 'center'
    }
  ],
  highQueryData: {
    regulationName: '',
    warningLevel: '',
    regulationType: '',
    ruleTypeCode: ''
  },
  createConfig: [
    {
      title: '联系人',
      field: 'contactPerson',
      titleWidth: '180',
      span: 24,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: '办公电话',
      field: 'officePhone',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' } }
    },
    {
      title: '手机',
      field: 'mobilePhone',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: '邮箱',
      field: 'email',
      align: 'center',
      titleWidth: '180',
      span: 24,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: '微信',
      field: 'weChat',
      span: 24,
      className: 'test',
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: 'QQ号码',
      field: 'qqNumber',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: '其他联系方式',
      field: 'otherWay',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
    },
    {
      title: '其他信息',
      field: 'otherInfo',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '请输入' }
      }
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
// 校验移动电话
export const mobilePhoneValid = ({ itemValue: value }) => {
  // let myreg = /^1[3-9]\d{9}$/ // 手机号
  // if (value !== '' && value !== null && value !== undefined) {
  //   if (!myreg.test(value)) {
  //     return Promise.reject(new Error('请输入正确的手机号码'))
  //   } else {
  //     return Promise.resolve()
  //   }
  // }
  return Promise.resolve()
}
// 校验座机电话号码
export const officePhoneValid = ({ itemValue: value }) => {
  // const re = /^1\d{10}$/ // 手机号码
  // const re1 = /^\d{3}-\d{8}$|\d{4}-\d{7}$/ // 座机号
  // const re2 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/ // 固定号码
  // // if (!value) {
  // //   return Promise.reject(new Error('请填写办公电话'))
  // // } else if (value && (!re1.test(value) && !re.test(value) && !re2.test(value))) {
  // //   return Promise.reject(new Error('请填写正确的办公电话'))
  // // }
  return Promise.resolve()
}
// 校验邮箱
export const emailValid = ({ itemValue: value }) => {
  let regexp = /^[a-z0-9A-Z]+([.-]*[a-z0-9A-Z])*@([a-z0-9A-Z]+[-a-z0-9A-Z]*[a-z0-9A-Z]+.){1,63}[a-z0-9A-Z]+$/
  if (value) {
    if (value.match(regexp)) {
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('请输入正确格式的邮箱'))
    }
  }
  return Promise.resolve()
}
