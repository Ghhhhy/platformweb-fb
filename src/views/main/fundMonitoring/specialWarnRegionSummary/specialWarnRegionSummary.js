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
    },
    {
      title: '规则',
      field: 'ruleCodes',
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
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '规则',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    }, {
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
    }
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    proCodes: '',
    ruleCodes: '',
    warnStartDate: '',
    warnEndDate: ''
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
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '指标预警',
        field: '',
        width: 140,
        sortable: false,
        align: 'center',
        children: [
          {
            title: '待整改',
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
            width: 210,
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
            width: 210,
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
                width: 210,
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
                width: 200,
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
      }
      /*
      {
        title: '未导入惠企利民明细',
        field: '',
        sortable: false,
        align: 'center',
        children: [
          {
            title: '未认定',
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
      */
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
