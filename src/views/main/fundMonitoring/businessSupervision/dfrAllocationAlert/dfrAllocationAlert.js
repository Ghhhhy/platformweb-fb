// import store from '@/store/index'
const proconf = {
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
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
      }
    },
    tableColumnsConfig: [
      // {
      //   title: '地区名称',
      //   type: 'name',
      //   align: 'left',
      //   sortable: false,
      //   filters: false,
      //   treeNode: true,
      //   width: 260,
      //   field: 'name',
      //   cellRender: { name: '$vxeIcon' }
      // },
      {
        title: '专项资金目录编码',
        field: 'speTypeCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '专项资金目录名称',
        field: 'speTypeName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '下达区划编码',
        field: 'xdRecDivCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '下达区划名称',
        field: 'xdRecDivName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '指标文号',
        field: 'corBgtDocNo',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '项目编码',
        field: 'proCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '项目名称',
        field: 'proName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '下达金额',
        field: 'amount',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '下达时间',
        field: 'xdTime',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '登记时间',
        field: 'djTime',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '登记天数',
        field: 'djDate',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '未登记预警',
        field: 'wdjWarn',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '分配金额',
        field: 'fpAmount',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '分配时间',
        field: 'fpTime',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '分配天数',
        field: 'fpDate',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '已登记未分配预警',
        field: 'ydjwfpWarn',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '追加金额',
        field: '',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        children: [
          {
            title: '本级',
            field: 'zjBjamount',
            width: 120,
            sortable: false,
            filters: false,
            align: 'center',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '下级',
            field: 'zjXjamount',
            width: 120,
            sortable: false,
            filters: false,
            align: 'center',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '追加时间',
        field: 'zjTime',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '已分配追加天数',
        field: 'yfpzjDate',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '已分配未追加预警',
        field: 'yfpwzjWarn',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center',
        name: '$vxeSelect',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '0', label: '' }, { value: '1', label: '预警' }
          ],
          props: {
            placeholder: '认定结果'
          }
        }
      },
      {
        title: '指标来源代码',
        field: 'sourceTypeCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '指标来源名称',
        field: 'sourceTypeName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '资金来源代码',
        field: 'foundTypeCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '资金来源名称',
        field: 'foundTypeName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '资金性质代码',
        field: 'fundTypeCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '资金性质名称',
        field: 'fundTypeName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '支出功能科目编码',
        field: 'expFuncCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '支出功能科目名称',
        field: 'expFuncName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '政府支出经济分类代码',
        field: 'govBgtEcoCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '政府支出经济分类名称',
        field: 'govBgtEcoName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '指标管理处室代码',
        field: 'bgtMofDepCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '指标管理处室名称',
        field: 'bgtMofDepName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '业务主管处室代码',
        field: 'manageMofDepCode',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      },
      {
        title: '业务主管处室名称',
        field: 'manageMofDepName',
        width: 120,
        sortable: false,
        filters: false,
        align: 'center'
      }
    ],
    tableData: []
  }
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
