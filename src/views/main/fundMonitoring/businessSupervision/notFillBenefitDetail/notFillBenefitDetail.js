import store from '@/store/index'
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
      visible: !store.getters.isFuJian,
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
    },
    {
      title: '资金名称',
      field: 'proCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '资金名称',
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
    proCodes: ''
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
            // canInsert: true, // 自定义展示可钻取的JSON配置字段
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            isSubCode: '01'
          },
          {
            title: '惠企',
            field: 'amounthq',
            // canInsert: true,
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            isSubCode: '02'
          },
          {
            title: '惠企利民',
            field: 'amounthqli',
            // canInsert: true,
            width: 200,
            sortable: false,
            filters: false,
            align: 'right',
            isSubCode: '03'
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
            // canInsert: true,
            sortable: false,
            filters: false,
            align: 'right',
            isSubCode: '01'
          },
          {
            title: '惠企',
            field: 'amounthqFill',
            width: 200,
            sortable: false,
            // canInsert: true,
            filters: false,
            align: 'right',
            isSubCode: '02'
          },
          {
            title: '惠企利民',
            field: 'amounthqliFill',
            width: 200,
            sortable: false,
            // canInsert: true,
            filters: false,
            align: 'right',
            isSubCode: '03'
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
            canInsert: true,
            filters: false,
            width: 200,
            isSubCode: '01',
            align: 'right',
            formula: '{amountli}-{amountliFill}'
          },
          {
            title: '惠企',
            field: 'hq2',
            width: 200,
            sortable: false,
            filters: false,
            canInsert: true,
            isSubCode: '02',
            align: 'right',
            formula: '{amounthq}-{amounthqFill}'
          },
          {
            title: '惠企利民',
            field: 'hqlm2',
            width: 200,
            sortable: false,
            canInsert: true,
            filters: false,
            isSubCode: '03',
            align: 'right',
            formula: '{amounthqli}-{amounthqliFill}'
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
            // canInsert: true,
            isSubCode: '01',
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
            // canInsert: true,
            isSubCode: '02',
            formula: '({amounthq}-0==0)?0:({amounthqFill}/{amounthq}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          },
          {
            title: '惠企利民',
            field: 'hqlmbl',
            width: 200,
            // canInsert: true,
            isSubCode: '03',
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
export const modalTableColumns = [
  // {
  //   title: '序号',
  //   type: 'seq',
  //   width: 60
  // },
  {
    title: '地区名称',
    align: 'left',
    width: 260,
    field: 'mofDivName',
    formatter({ row }) {
      if (row.mofDivCode && row.mofDivName) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
      return `${row.mofDivName}`
    }
  },
  {
    title: '单位名称',
    align: 'left',
    width: 260,
    field: 'agencyName'
  },
  {
    title: '处室名称',
    align: 'left',
    width: 260,
    field: 'bgtMofDepName'
  },
  {
    title: '资金名称',
    align: 'left',
    width: 260,
    field: 'trackProName'
  },
  {
    title: '本级专项资金名称',
    align: 'left',
    width: 260,
    field: 'trackProName'
  },
  {
    title: '项目编码',
    align: 'left',
    width: 260,
    field: 'proCode'
  },
  {
    title: '项目名称',
    align: 'left',
    width: 260,
    field: 'proName'
  }
]
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
