// 预算执行报表-指标数据查询
import store from '@/store/index'

export let proconf = {
  tabStatusBtnConfigButtons: [
    /*  {
      type: 'button',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png',
      iconUrl: '',
      label: '未发送',
      code: '0',
      curValue: '0'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '已发送',
      code: '1',
      curValue: '1'
    },
    {
      type: 'button',
      iconName: 'base-yiban.png',
      iconNameActive: 'base-yiban-active.png',
      iconUrl: '',
      label: '对账结果',
      code: '2',
      curValue: '2'
    } */
  ],
  tabStatusBtnConfigButtonsInfo: {
    // 待办
    '0': [
      { code: 'operation-setting', label: '设置', status: 'primary' },
      { code: 'operation-expand-tree', label: '树全部展开', status: 'primary' },
      { code: 'operation-close-tree', label: '树全部合并', status: 'primary' }
    ],
    '1': [
      { code: 'operation-setting', label: '设置', status: 'primary' },
      { code: 'operation-expand-tree', label: '树全部展开', status: 'primary' },
      { code: 'operation-close-tree', label: '树全部合并', status: 'primary' }
    ],
    '2': [
      { code: 'operation-setting', label: '设置', status: 'primary' },
      { code: 'operation-expand-tree', label: '树全部展开', status: 'primary' },
      { code: 'operation-close-tree', label: '树全部合并', status: 'primary' }
    ],
    '3': [
      { code: 'operation-setting', label: '设置', status: 'primary' },
      { code: 'operation-expand-tree', label: '树全部展开', status: 'primary' },
      { code: 'operation-close-tree', label: '树全部合并', status: 'primary' }
    ]
  },
  queryFormItemConfig: [
    {
      field: 'agency_',
      title: '预算单位',
      titleWidth: '180',
      span: 4,
      itemRender: {
        name: '$formTreeInput',
        required: true,
        props: {
          isServer: true,
          serverUri: 'pay-clear-service/v3/elementtree',
          elecode: 'AGENCY',
          formatter: '#name',
          openFormatLabel: true,
          editConfig: { placeholder: '预算单位' },
          queryparams: {
            elementCode: 'AGENCY',
            menuguid: store.state.curNavModule.guid
          }
        }
      }
    },
    {
      field: 'ywcs',
      title: '业务处室',
      titleWidth: '180',
      span: 4,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            label: '业务处室1',
            value: '1'
          },
          {
            label: '业务处室2',
            value: '2'
          }
        ],
        props: {
          placeholder: '业务处室'
        }
      }
    },
    {
      title: '资金性质',
      field: 'fund_type_',
      titleWidth: '180',
      span: 4,
      itemRender: {
        name: '$formTreeInput',
        props: {
          // disabled: true,
          isServer: true,
          serverUri: 'pay-clear-service/v3/elementtree',
          editConfig: { placeholder: '资金性质' },
          elecode: 'FUNDTYPE',
          queryparams: {
            elementCode: 'FUNDTYPE',
            menuguid: store.state.curNavModule.guid
          }
        }
      }
    },
    {
      field: 'zbwh',
      title: '指标文号',
      titleWidth: '100',
      itemRender: {
        name: '$input',
        required: true,
        props: {
          placeholder: '指标文号'
        }
      }
    }
  ],
  queryFormData: {
    agency_: '',
    ywcs: '',
    fund_type_: '',
    zbwh: ''
  },
  tableColumnsConfig: [
    {
      title: '指标标识',
      type: 'treeNode',
      treeNode: true,
      field: 'bgt_exe_flag',
      width: 100,
      align: 'center'
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 130,
      cellRender: {
        name: '$gloableOptionRow'
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
        <el-tooltip content='附件' placement='top' effect='light'>
          <a class='gloable-option-row-attachment gloable-option-row  fn-inline'
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>,
        <el-tooltip content='编辑' placement='top' effect='light'>
          <a class='gloable-option-row-edit gloable-option-row fn-inline'
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</ a>,
        </el-tooltip>,
        <el-tooltip content='操作日志' placement='top' effect='light'>
          <a class='gloable-option-row-optionlog gloable-option-row  fn-inline'
            onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
        </el-tooltip>
      ]
    }
  },
  settingTableColumnsConfig: [
    {
      title: '字段名称',
      field: 'title',
      align: 'center'
    },
    {
      title: '汇总级次',
      field: 'level',
      width: 400,
      align: 'center',
      cellRender: {
        name: '$editLevel'
      }
    },
    {
      title: '显示编码',
      field: 'showCode',
      width: 200,
      align: 'center',
      cellRender: {
        name: '$editCodeCheckbox'
      }
    }
  ],
  editRadio: {
    renderDefault(h, cellRender, params, context) {
      let { row } = params
      return [
        <vxe-radio-group v-model={row.type} onChange={() => { if (row.type === '0') row.condition = false }}>
          <vxe-radio label="2" content="逐级汇总" size="small" disabled={row.code === 'cor_bgt_doc_no'}></vxe-radio>
          <vxe-radio label="1" content="汇总" size="small"></vxe-radio>
          <vxe-radio label="0" content="不汇总" size="small"></vxe-radio>
        </vxe-radio-group>
      ]
    }
  },
  editLevel: {
    renderDefault(h, cellRender, params, context) {
      let { row } = params
      return [
        <vxe-radio-group v-model={row.level}>
          <vxe-radio label="1" content="一级" size="small" disabled={row.totalLevel < '1'} ></vxe-radio>
          <vxe-radio label="2" content="二级" size="small" disabled={row.totalLevel < '2'} ></vxe-radio>
          <vxe-radio label="3" content="三级" size="small" disabled={row.totalLevel < '3'} ></vxe-radio>
          <vxe-radio label="6" content="底级" size="small" ></vxe-radio>
        </vxe-radio-group>
      ]
    }
  },
  editCodeCheckbox: {
    renderDefault(h, cellRender, params, context) {
      let { row } = params
      return [
        <vxe-checkbox v-model={row.showCode} size="small"></vxe-checkbox>
      ]
    }
  },
  editCheckbox: {
    renderDefault(h, cellRender, params, context) {
      let { row } = params
      return [
        <div>
          <vxe-checkbox v-model={row.checked} size="small" disabled={ row.type === '0' }></vxe-checkbox>
        </div>
      ]
    }
  },
  order: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent.$parent.$parent
      return [
        <div>
          <el-tooltip content='上移' placement='top' effect='light' style='margin: 0 auto;cursor: pointer;'>
            <i class='vxe-tree--node-btn vxe-icon--caret-top'
              onClick={() => self.onOptionRowClick({ params, optionType: 'top' })}></i>
          </el-tooltip>
          <el-tooltip content='下移' placement='top' effect='light' style='margin: 0 auto;cursor: pointer;'>
            <i class='vxe-tree--node-btn vxe-icon--caret-bottom'
              onClick={() => self.onOptionRowClick({ params, optionType: 'bottom' })}></i>
          </el-tooltip>
        </div>
      ]
    }
  },
  colFieldList: [
    {
      title: '预算单位',
      name: 'AGENCY',
      type: '0',
      showCode: true,
      level: '4',
      totalLevel: '4',
      checked: false
    },
    {
      title: '业务管理处室',
      name: 'MANAGE_MOF_DEP',
      type: '0',
      showCode: true,
      level: '3',
      totalLevel: '3',
      checked: false
    },
    {
      title: '功能科目',
      name: 'EXP_FUNC',
      type: '0',
      showCode: true,
      level: '4',
      totalLevel: '4',
      checked: false
    },
    {
      title: '指标文号', // 没有逐级汇总
      name: 'COR_BGT_DOC_NO',
      type: '0',
      showCode: true,
      level: '1',
      totalLevel: '1',
      checked: false
    },
    {
      title: '部门经济分类',
      name: 'DEP_BGT_ECO',
      type: '0',
      showCode: true,
      level: '1',
      totalLevel: '1',
      checked: false
    },
    {
      title: '指标管理处',
      name: 'BGT_MOF_DEP',
      type: '0',
      showCode: true,
      level: '3',
      totalLevel: '3',
      checked: false
    },
    {
      title: '政府经济分类',
      name: 'GOV_BGT_ECO',
      type: '0',
      showCode: true,
      level: '3',
      totalLevel: '3',
      checked: false
    },
    {
      title: '部门',
      name: 'DEPT',
      type: '0',
      showCode: true,
      level: '6',
      totalLevel: '6',
      checked: false
    },
    {
      title: '项目',
      name: 'PRO',
      type: '0',
      showCode: true,
      level: '6',
      totalLevel: '6',
      checked: false
    },
    {
      title: '支付方式',
      name: 'PAY_TYPE',
      type: '0',
      showCode: true,
      level: '4',
      totalLevel: '4',
      checked: false
    },
    {
      title: '资金性质',
      name: 'FUND_TYPE',
      type: '0',
      showCode: true,
      level: '4',
      totalLevel: '4',
      checked: false
    },
    {
      title: '收支类型',
      name: 'PRO_CAT',
      type: '0',
      showCode: true,
      level: '6',
      totalLevel: '6',
      checked: false
    },
    {
      title: '指标类型',
      name: 'BGT_TYPE',
      type: '0',
      showCode: true,
      level: '4',
      totalLevel: '4',
      checked: false
    }
  ],
  templateTableColumnsConfig: [
    {
      title: '配置条件',
      field: 'fields',
      align: 'center',
      visible: false
    },
    {
      title: '高级查询',
      field: 'condition',
      align: 'center',
      visible: false
    },
    {
      title: '金额合计',
      field: 'sum_amt',
      align: 'center',
      visible: false
    },
    {
      title: '模板名称',
      field: 'template_name',
      width: 'fix',
      align: 'center'
    }
  ]
}
