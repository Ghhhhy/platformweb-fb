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
      title: '截止日期',
      field: 'endTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '截止日期'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    endTime: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true, // 序号列
        useMoneyFilter: true
      }
    },
    tableColumnsConfig: [
      {
        title: '地区',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 160,
        field: 'name'
      },
      {
        title: '分配情况（满分30分）',
        width: 100,
        align: 'center',
        children: [
          {
            title: '直达资金（汇总）（7分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'fpProZdzj',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'fpProZdzjXj',
                width: 100,
                align: 'right',
                formula: '({fpProZdzj}*7*0.01)'
              }
            ]
          },
          {
            title: '中央直达（9分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'fpProZyzd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'fpProZyzdXj',
                width: 100,
                align: 'right',
                formula: '({fpProZyzd}*9*0.01)'
              }
            ]
          },
          {
            title: '参照直达（7分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'fpProCzzd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'fpProCzzdXj',
                width: 100,
                align: 'right',
                formula: '({fpProCzzd}*0.01*7)'
              }
            ]
          },
          {
            title: '地方配套（7分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'fpProDfpt',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'fpProDfptXj',
                width: 100,
                align: 'right',
                formula: '({fpProDfpt}*0.01*7)'
              }
            ]
          },
          {
            title: '合计',
            width: 100,
            align: 'right',
            formula: '({fpProZdzjXj}+{fpProZyzdXj}+{fpProCzzdXj}+{fpProDfptXj})'
          }
        ]
      },
      {
        title: '支出情况（满分40分）',
        width: 100,
        align: 'center',
        children: [
          {
            title: '直达资金（汇总）（9分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'zcProZdzj',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'zcProZdzjXj',
                width: 100,
                align: 'right',
                formula: '({zcProZdzj}*9*0.01)'
              }
            ]
          },
          {
            title: '中央直达（13分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'zcProZyzd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'zcProZyzdXj',
                width: 100,
                align: 'right',
                formula: '({zcProZyzd}*13*0.01)'
              }
            ]
          },
          {
            title: '参照直达（9分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'zcProCzzd',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'zcProCzzdXj',
                width: 100,
                align: 'right',
                formula: '({zcProCzzd}*0.01*9)'
              }
            ]
          },
          {
            title: '地方配套（9分）',
            width: 100,
            align: 'center',
            children: [
              {
                title: '分配进度',
                field: 'zcProDfpt',
                width: 100,
                align: 'right',
                cellRender: { name: '$vxeRatio' }
              },
              {
                title: '小计',
                field: 'zcProDfptXj',
                width: 100,
                align: 'right',
                formula: '({zcProDfpt}*0.01*9)'
              }
            ]
          },
          {
            title: '合计',
            width: 100,
            align: 'right',
            formula: '({zcProZdzjXj}+{zcProZyzdXj}+{zcProCzzdXj}+{zcProDfptXj})'
          }
        ]
      },
      {
        title: '未处理预警信息处理（满分15分）',
        width: 100,
        align: 'center',
        children: [
          {
            title: '未处理预警信息占比',
            field: 'notHandlePro',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeRatio' }
          },
          {
            title: '小计',
            field: 'notHandleProXj',
            width: 100,
            align: 'right',
            formula: '((1-{notHandlePro}*0.01)*15)'
          }
        ]
      },
      {
        title: '报送月报（满分15分）',
        width: 100,
        align: 'center',
        children: [
          {
            title: '及时性',
            field: 'jsx',
            width: 100,
            align: 'right'
          },
          {
            title: '完整性',
            field: 'wzx',
            width: 100,
            align: 'right'
          },
          {
            title: '逻辑性',
            field: 'ljx',
            width: 100,
            align: 'right'
          },
          {
            title: '小计',
            field: 'xj',
            width: 100,
            align: 'right',
            formula: '({jsx}+{wzx}+{ljx})'
          }
        ]
      },
      {
        title: '总计（满分100分）',
        field: 'zj',
        width: 100,
        align: 'right'
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
