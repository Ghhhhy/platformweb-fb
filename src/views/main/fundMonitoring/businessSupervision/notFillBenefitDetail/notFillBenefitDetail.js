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
      { code: 'bore', label: '口径说明', status: 'primary' },
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'bore', label: '口径说明', status: 'primary' },
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
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
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
      {
        title: '地区名称',
        type: 'name',
        sortable: false,
        filters: false,
        align: 'left',
        treeNode: true,
        width: 260,
        field: 'name',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '惠企利民项目数量',
        width: 200,
        align: 'center',
        children: [
          {
            title: '合计',
            field: 'hj',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '{amountli}+{amounthq}+{amounthqli}'
          },
          {
            title: '利民',
            field: 'amountli',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '惠企',
            field: 'amounthq',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '惠企利民',
            field: 'amounthqli',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          }
        ]
      },
      {
        title: '已填报明细数据项目数',
        width: 200,
        align: 'center',
        children: [
          {
            title: '合计',
            field: 'hj1',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '{amountliFill}+{amounthqFill}+{amounthqliFill}'
          },
          {
            title: '利民',
            field: 'amountliFill',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '惠企',
            field: 'amounthqFill',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          },
          {
            title: '惠企利民',
            field: 'amounthqliFill',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right'
          }
        ]
      },
      {
        title: '未填报明细数据项目数',
        width: 200,
        align: 'center',
        children: [
          {
            title: '合计',
            field: 'hj2',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '{hj}-{hj1}'
          },
          {
            title: '利民',
            field: 'lm2',
            sortable: false,
            filters: false,
            width: 200,
            align: 'right',
            formula: '{amountli}-{amounthqFill}'
          },
          {
            title: '惠企',
            field: 'hq2',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '{amounthq}-{amounthqFill}'
          },
          {
            title: '惠企利民',
            field: 'hqlm2',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '{amounthqli}-{amounthqlmFill}'
          }
        ]
      },
      {
        title: '填报比例',
        width: 200,
        align: 'center',
        children: [
          {
            title: '利民',
            field: 'lmbl',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '({amountli}-0==0)?0:({amountliFill}/{amountli}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '惠企',
            field: 'hqbl',
            width: 200,
            align: 'right',
            sortable: false,
            filters: false,
            formula: '({amounthq}-0==0)?0:({amounthqFill}/{amounthq}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '惠企利民',
            field: 'hqlmbl',
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            formula: '({amounthqli}-0==0)?0:({amounthqliFill}/{amounthqli}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '总导入比例',
        width: 200,
        align: 'center',
        sortable: false,
        filters: false,
        field: 'zdrbl',
        formula: '({hj}-0==0)?0:({hj1}/{hj}*100)',
        cellRender: {
          name: '$vxeRatio'
        }
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
