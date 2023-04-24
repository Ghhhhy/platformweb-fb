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
  highQueryConfig: [
    {
      title: '执行期间',
      field: 'exePeriod',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          type: 'month',
          placeholder: '执行期间'
        }
      }
    },
    {
      title: '财政区划',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{codeFragment}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '财政区划',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '预算单位',
      field: 'agencyCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id', 'codeFragment'],
            format: '{name}',
            treeProps: {
              labelFormat: '{codeFragment}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '预算单位',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '全国平均执行率',
      field: 'nationalPayRate',
      width: '8',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          titleAsterisk: true,
          placeholder: '全国平均执行率',
          config: {
            multiple: false,
            readonly: false,
            isleaf: true
          }
        }
      }
    }
  ],
  highQueryData: {
    exePeriod: '',
    mofDivCodes: '',
    agencyCodes: '',
    nationalPayRate: ''
  },
  PoliciesTableColumns: [
    {
      title: '指标文号',
      field: 'bgtDocNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '执行期间',
      field: 'exePeriod',
      sortable: false,
      align: 'left'
    },
    {
      title: '评价年度',
      field: 'evaluationYear',
      sortable: false,
      align: 'left'
    },
    {
      title: '财政区划名称',
      field: 'mofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '单位名称',
      field: 'agencyName',
      sortable: false,
      align: 'left'
    },
    {
      title: '项目名称',
      field: 'trackProCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '指标类型',
      field: 'bgtTypeCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '指标来源',
      field: 'sourceTypeCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金性质',
      field: 'fundTypeCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '支出方向',
      field: 'expDirCode',
      sortable: false,
      align: 'left'
    },
    {
      title: '指标余额',
      field: 'amount',
      sortable: false,
      align: 'left'
    },
    {
      title: '本月执行数',
      field: 'curMonthExeAmount',
      sortable: false,
      align: 'left'
    },
    {
      title: '资金执行率',
      field: 'rate',
      sortable: false,
      align: 'left'
    }
  ]
}
