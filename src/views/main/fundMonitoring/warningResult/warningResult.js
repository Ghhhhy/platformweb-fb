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
      {
        title: '规则名称',
        field: 'ruleName',
        sortable: true,
        align: 'center',
        width: 300
      },
      {
        title: '红灯',
        field: '',
        sortable: true,
        align: 'center',
        'children': [
          {
            title: '未处理',
            field: 'redUndoNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon1',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '已整改',
            field: 'redDoneNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          }
        ]
      },
      {
        title: '黄灯',
        field: '',
        sortable: true,
        align: 'center',
        'children': [
          {
            title: '疑点信息',
            field: 'yellowUndoNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon2',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '认定正常',
            field: 'yellowDoneNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '认定违规',
            field: '',
            sortable: true,
            align: 'center',
            'children': [
              {
                title: '未处理',
                field: 'yellowUndoNumw',
                width: '150',
                align: 'center',
                cellRender: {
                  name: '$vxeIcon1',
                  props: {
                    $refs: this
                  }
                }
              },
              {
                title: '已整改',
                field: 'yellowDoneNumw',
                width: '150',
                align: 'center',
                cellRender: {
                  name: '$vxeIcon3',
                  props: {
                    $refs: this
                  }
                }
              }
            ]
          }
        ]
      },
      {
        title: '黄色警铃',
        field: '',
        sortable: true,
        align: 'center',
        'children': [
          {
            title: '未处理',
            field: 'blueUndoNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon4',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '已整改',
            field: 'blueDoneNum',
            width: '150',
            align: 'center',
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          }
        ]
      }
    ],
    tableData: [
      {
        ruleName: '未上传发文件扫描_直达资金',
        redUndoNum: '0',
        redDoneNum: '0',
        yellowUndoNum: '0',
        yellowDoneNum: '0',
        yellowUndoNumw: '0',
        yellowDoneNumw: '0',
        blueUndoNum: '0',
        blueDoneNum: '0'
      },
      {
        ruleName: '疑似违规收款户账户',
        redUndoNum: '0',
        redDoneNum: '0',
        yellowUndoNum: '0',
        yellowDoneNum: '0',
        yellowUndoNumw: '0',
        yellowDoneNumw: '0',
        blueUndoNum: '0',
        blueDoneNum: '0'
      },
      {
        ruleName: '疑似违规将创业担保贷款资金用于禁止支出范围',
        redUndoNum: '0',
        redDoneNum: '0',
        yellowUndoNum: '0',
        yellowDoneNum: '0',
        yellowUndoNumw: '0',
        yellowDoneNumw: '0',
        blueUndoNum: '0',
        blueDoneNum: '0'
      },
      {
        ruleName: '疑似违规用于禁止支出范围_就业补助',
        redUndoNum: '0',
        redDoneNum: '0',
        yellowUndoNum: '0',
        yellowDoneNum: '0',
        yellowUndoNumw: '0',
        yellowDoneNumw: '0',
        blueUndoNum: '0',
        blueDoneNum: '0'
      },
      {
        ruleName: '未导入惠企利民明细',
        redUndoNum: '0',
        redDoneNum: '0',
        yellowUndoNum: '0',
        yellowDoneNum: '0',
        yellowUndoNumw: '0',
        yellowDoneNumw: '0',
        blueUndoNum: '0',
        blueDoneNum: '0'
      }
    ]
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
