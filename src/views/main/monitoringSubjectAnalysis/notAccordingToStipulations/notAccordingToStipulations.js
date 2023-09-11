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
      title: '项目名称',
      field: 'xmmc',
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
    fiscalYear: '',
    mofDivCodes: '',
    xmmc: ''
  },
  PoliciesTableColumns: [
    {
      title: '指标文号',
      field: 'bgtDocNo',
      sortable: false,
      width: 150,
      align: 'left'
    },
    {
      title: '预算年度',
      field: 'fiscalYear',
      sortable: false,
      width: 100,
      align: 'left'
    },
    {
      title: '区划名称',
      field: 'supMofDivName',
      sortable: false,
      width: 100,
      align: 'left'
    },
    // {
    //   title: '下级财政区划名称',
    //   field: 'lowMofDivName',
    //   width: 100,
    //   sortable: false,
    //   align: 'left'
    // },
    // {
    //   title: '项目类别',
    //   field: 'proCatName',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    {
      title: '项目名称',
      field: 'trackProName',
      sortable: false,
      width: 200,
      align: 'left'
    },
    // {
    //   title: '指标类型',
    //   field: 'bgtTypeCode',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    // {
    //   title: '指标来源',
    //   field: 'sourceTypeCode',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    // {
    //   title: '资金性质',
    //   field: 'fundTypeCode',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    {
      title: '接收时间',
      field: 'jsTime',
      width: 100,
      sortable: false,
      align: 'left'
    },
    {
      title: '接收金额',
      field: 'jsAmount',
      sortable: false,
      width: 100,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney'
        // props: {
        //   type: 'float',
        //   digits: 3
        // }
      }
    },
    // {
    //   title: '支出方向',
    //   field: 'expDirCode',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    {
      title: '下达时间',
      field: 'xdTime',
      sortable: false,
      width: 180,
      align: 'left'
    },
    // {
    //   title: '追加时间',
    //   field: 'postorDate',
    //   sortable: false,
    //   width: 100,
    //   align: 'left'
    // },
    // {
    //   title: '指标余额',
    //   field: 'amount',
    //   sortable: false,
    //   width: 100,
    //   align: 'left',
    // },
    {
      title: '下达金额',
      field: 'xdAmount',
      sortable: false,
      width: 100,
      align: 'right',
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配天数预警',
      field: 'dayNum',
      sortable: false,
      width: 120,
      align: 'left',
      cellRender: {
        name: '$gloableOptionRow'
      }
    }
  ],
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let { row } = params
      let text = row.dayNum
      let resItem = row.dayNum > 30 ? [
        <span style="color:red;" >{text}</span>
      ] : [<span>{text}</span>]
      return resItem
    }
  }
}
