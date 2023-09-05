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
    // '1': [
    //   { code: 'add', label: '新增', status: 'primary' },
    //   { code: 'del', label: '删除' }
    // ]
  },
  highQueryConfig: [
    {
      title: '区划名称',
      field: 'mofDivName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '区划名称'
        }
      }
    },
    {
      title: '业务处室名称',
      field: 'manageMofDepName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '业务处室名称'
        }
      }
    },
    {
      title: '部门名称',
      field: 'deptName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '部门名称'
        }
      }
    },
    {
      title: '单位名称',
      field: 'agencyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '单位名称'
        }
      }
    },
    {
      title: '项目名称',
      field: 'proName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目名称'
        }
      }
    }
  ],
  highQueryData: {
    mofDivName: '',
    manageMofDepName: '',
    deptName: '',
    agencyName: '',
    proName: ''
  },
  PoliciesTableColumns: [
    {
      title: '区划',
      field: 'mofDiv',
      sortable: false,
      align: 'center',
      width: 200
    },
    {
      title: '业务处室',
      field: 'manageMofDep',
      sortable: false,
      align: 'center',
      width: 200
    },
    {
      title: '部门',
      field: 'dept',
      sortable: false,
      align: 'center',
      width: 200
    },
    {
      title: '单位',
      field: 'agency',
      sortable: false,
      align: 'center',
      width: 200
    },
    {
      title: '项目',
      field: 'pro',
      sortable: false,
      align: 'center',
      width: 300
    },
    {
      title: '项目金额',
      field: 'projectAmount',
      sortable: false,
      align: 'center',
      width: 120,
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '预算金额',
      field: 'bgtAmount',
      sortable: false,
      align: 'center',
      width: 120,
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '指标金额',
      field: 'baBgtAmount',
      sortable: false,
      align: 'center',
      width: 120,
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '执行金额',
      field: 'payAmount',
      sortable: false,
      align: 'center',
      width: 120,
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '核算金额',
      field: 'glaAmount',
      sortable: false,
      align: 'center',
      width: 120,
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeMoney',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
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
