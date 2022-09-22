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
        field: 'fiRuleName',
        sortable: true,
        align: 'center',
        width: 300
      },
      {
        title: '红色预警',
        field: '',
        width: 140,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未处理',
            field: 'redUndoNum',
            width: 140,
            filters: false,
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
            width: 140,
            align: 'center',
            filters: false,
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
        title: '橙色预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未上传附件',
            field: 'orangeUndoNum',
            width: 140,
            align: 'center',
            filters: false,
            cellRender: {
              name: '$vxeIcon6',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '已上传附件',
            field: 'orangeDoneNum',
            width: 140,
            align: 'center',
            filters: false,
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          }
          // {
          //   title: '认定违规',
          //   field: '',
          //   sortable: false,
          //   align: 'center',
          //   'children': [
          //     {
          //       title: '未处理',
          //       field: 'orangeUndoNumw',
          //       width: 140,
          //       filters: false,
          //       align: 'center',
          //       cellRender: {
          //         name: '$vxeIcon1',
          //         props: {
          //           $refs: this
          //         }
          //       }
          //     },
          //     {
          //       title: '已整改',
          //       field: 'orangeDoneNumw',
          //       width: 140,
          //       filters: false,
          //       align: 'center',
          //       cellRender: {
          //         name: '$vxeIcon3',
          //         props: {
          //           $refs: this
          //         }
          //       }
          //     }
          //   ]
          // }
        ]
      },
      {
        title: '黄色预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '疑点信息',
            field: 'yellowUndoNum',
            width: 140,
            filters: false,
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
            width: 140,
            filters: false,
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
            sortable: false,
            align: 'center',
            children: [
              {
                title: '未处理',
                field: 'yellowUndoNumw',
                width: 140,
                filters: false,
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
                width: 140,
                filters: false,
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
        title: '非人工干预蓝色预警',
        field: '',
        sortable: false,
        align: 'center',
        'children': [
          {
            title: '疑点信息',
            field: 'blueUndoNum',
            width: 140,
            filters: false,
            align: 'center',
            cellRender: {
              name: '$vxeIcon7',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '认定正常',
            field: 'blueDoneNum',
            width: 140,
            filters: false,
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
            sortable: false,
            align: 'center',
            children: [
              {
                title: '未处理',
                field: 'blueUndoNumw',
                width: 140,
                filters: false,
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
                field: 'blueDoneNumw',
                width: 140,
                filters: false,
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
