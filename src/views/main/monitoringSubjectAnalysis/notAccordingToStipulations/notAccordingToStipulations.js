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
      title: '预算年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '预算年度'
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
    }
  ],
  highQueryData: {
    fiscalYear: '',
    mofDivCodes: '',
    agencyCodes: ''
  },
  PoliciesTableColumns: [
    {
      title: '指标文号',
      field: 'bgtDocNo',
      sortable: false,
      align: 'left'
    },
    {
      title: '预算年度',
      field: 'fiscalYear',
      sortable: false,
      align: 'left'
    },
    {
      title: '上级财政区划名称',
      field: 'supMofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '下级财政区划名称',
      field: 'lowMofDivName',
      sortable: false,
      align: 'left'
    },
    {
      title: '项目类别',
      field: 'proCatName',
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
      title: '上级指标接收时间',
      field: 'supBgtRecDate',
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
      title: '分配记账时间',
      field: 'postorDate',
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
      title: '下达金额',
      field: 'issuedAmount',
      sortable: false,
      align: 'left'
    }
  ]
}
