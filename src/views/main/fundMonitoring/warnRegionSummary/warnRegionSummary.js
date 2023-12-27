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
    // {
    //   title: '业务年度',
    //   field: 'fiscalYear',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   visible: !store.getters.isFuJian,
    //   itemRender: {
    //     name: '$vxeInput',
    //     // options: [
    //     //   // { value: '2020', label: '2020年' },
    //     //   // { value: '2021', label: '2021年' },
    //     //   { value: '2022', label: '2022年' },
    //     //   { value: '2023', label: '2023年' }
    //     // ],
    //     props: {
    //       type: 'year',
    //       valueFormat: 'yyyy',
    //       placeholder: '业务年度'
    //     }
    //   }
    // },
    {
      title: '预警开始时间',
      field: 'warnStartDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '预警开始时间'
        }
      }
    },
    {
      title: '预警结束时间',
      field: 'warnEndDate',
      sortable: false,
      align: 'left',
      itemRender: {
        name: '$vxeTime',
        defaultValue: '',
        format: 'YYYY-MM-DD',
        props: {
          type: 'date', //
          placeholder: '预警结束时间'
        }
      }
    },
    {
      title: '认定开始时间',
      field: 'affirmTimeStartDate',
      width: 180,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          // format: 'YYYY-MM-DD 00:00:00', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          'label-format': 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd 00:00:00',
          placeholder: '认定开始时间'
        }
      }
    },
    {
      title: '认定截止时间',
      field: 'affirmTimeEndDate',
      width: 180,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          // format: 'YYYY-MM-DD 23:59:59', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          'label-format': 'yyyy-MM-dd',
          'value-format': 'yyyy-MM-dd 23:59:59',
          placeholder: '认定截止时间'
        }
      }
    }

  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year
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
        treeNode: true,
        align: 'left',
        width: 260,
        field: 'name',
        filters: false,
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '是否上传附件',
        field: '',
        width: 140,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未认定',
            field: 'numbernofileNum',
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
            field: 'numberfileNum',
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
        title: '支出预警',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未认定',
            field: 'numberwarnUndoNum',
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
            title: '认定正常',
            field: 'numberwarndoNum',
            width: 140,
            align: 'center',
            filters: false,
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '认定违规',
            field: 'numberwarndoNoNum',
            width: 140,
            align: 'center',
            children: [
              {
                title: '待整改',
                field: 'numberwarnUndoNoNum',
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
                field: 'numberwarndidNum',
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
          }
        ]
      },
      {
        title: '未导入惠企利民明细',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未处理',
            field: 'numberhqlmUndoNum',
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
            title: '已整改',
            field: 'numberhqlmdoNum',
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
