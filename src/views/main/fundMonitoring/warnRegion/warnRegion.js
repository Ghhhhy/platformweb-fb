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
        title: '地区名称',
        type: 'agencyName',
        treeNode: true,
        align: 'left',
        width: 260,
        field: 'agencyName',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '是否下达附件',
        width: 260,
        align: 'center',
        children: [
          {
            title: '未处理',
            align: 'center',
            width: 200,
            field: 'notHandle',
            cellRender: {
              name: '$vxeIcon1',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '已整改',
            align: 'center',
            width: 200,
            field: 'handled',
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
        width: 200,
        align: 'center',
        children: [
          {
            title: '未处理',
            field: 'znotHandle',
            width: 200,
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
            field: 'zhandled',
            align: 'center',
            width: 200,
            cellRender: {
              name: '$vxeIcon3',
              props: {
                $refs: this
              }
            }
          },
          {
            title: '认定违规',
            width: 200,
            align: 'center',
            children: [
              {
                title: '未整改',
                field: 'wnotHandle',
                width: 200,
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
                field: 'whandled',
                align: 'center',
                width: 200,
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
        title: '未导入惠企业利民明细',
        width: 200,
        align: 'center',
        children: [
          {
            title: '未处理',
            field: 'dnotHandle',
            width: 200,
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
            field: 'dhandled',
            width: 200,
            align: 'center',
            cellRender: {
              name: '$vxeIcon1',
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
        notHandle: 1,
        handled: 4,
        znotHandle: 0,
        zhandled: 0,
        wnotHandle: 0,
        dhandled: 0,
        whandled: 0,
        dnotHandle: 0,
        'recDivCode': '619900000',
        'children': [
          {
            notHandle: 1,
            handled: 4,
            znotHandle: 0,
            zhandled: 0,
            wnotHandle: 0,
            dhandled: 0,
            whandled: 0,
            dnotHandle: 0,
            'recDivCode': '610000000',
            'agencyName': '陕西省本级',
            sPro: 89.9,
            shPro: 94.8,
            xPro: 49.8,
            payPro: 99.4
          },
          {
            notHandle: 1,
            handled: 4,
            znotHandle: 0,
            zhandled: 0,
            wnotHandle: 0,
            dhandled: 0,
            whandled: 0,
            dnotHandle: 0,
            'recDivCode': '610000000',
            'children': [
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610100000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610100000',
                    'agencyName': '西安市本级',
                    sPro: 89.9,
                    shPro: 94.8,
                    xPro: 49.8,
                    payPro: 99.4
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610198000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610102000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610102000',
                            'agencyName': '新城区本级',
                            sPro: 89.9,
                            shPro: 94.8,
                            xPro: 49.8,
                            payPro: 99.4
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610102000',
                            'agencyName': '新城区辖区'
                          }
                        ],
                        'agencyName': '新城区',
                        sPro: 89.9,
                        shPro: 94.8,
                        xPro: 49.8,
                        payPro: 99.4
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610103000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610103000',
                            'agencyName': '碑林区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610103000',
                            'agencyName': '碑林区辖区'
                          }
                        ],
                        'agencyName': '碑林区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610104000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610104000',
                            'agencyName': '莲湖区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610104000',
                            'agencyName': '莲湖区辖区'
                          }
                        ],
                        'agencyName': '莲湖区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610111000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610111000',
                            'agencyName': '灞桥区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610111000',
                            'agencyName': '灞桥区辖区'
                          }
                        ],
                        'agencyName': '灞桥区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610112000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610112000',
                            'agencyName': '未央区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610112000',
                            'agencyName': '未央区辖区'
                          }
                        ],
                        'agencyName': '未央区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610113000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610113000',
                            'agencyName': '雁塔区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610113000',
                            'agencyName': '雁塔区辖区'
                          }
                        ],
                        'agencyName': '雁塔区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610114000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610114000',
                            'agencyName': '阎良区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610114000',
                            'agencyName': '颜良区辖区'
                          }
                        ],
                        'agencyName': '阎良区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610115000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610115000',
                            'agencyName': '临潼区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610115000',
                            'agencyName': '临潼区辖区'
                          }
                        ],
                        'agencyName': '临潼区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610116000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610116000',
                            'agencyName': '长安区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610116000',
                            'agencyName': '长安区辖区'
                          }
                        ],
                        'agencyName': '长安区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610117000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610117000',
                            'agencyName': '高陵区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610117000',
                            'agencyName': '高陵区辖区'
                          }
                        ],
                        'agencyName': '高陵区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610118000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610118000',
                            'agencyName': '鄠邑区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610118000',
                            'agencyName': '鄠邑区辖区'
                          }
                        ],
                        'agencyName': '鄠邑区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610122000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610122000',
                            'agencyName': '蓝田县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610122000',
                            'agencyName': '蓝田县辖区'
                          }
                        ],
                        'agencyName': '蓝田县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610124000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610124000',
                            'agencyName': '周至县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610124000',
                            'agencyName': '周至县辖区'
                          }
                        ],
                        'agencyName': '周至县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610131000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610131000',
                            'agencyName': '西安市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610131000',
                            'agencyName': '西安市高新区辖区'
                          }
                        ],
                        'agencyName': '西安市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610132000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610132000',
                            'agencyName': '西安市经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610132000',
                            'agencyName': '西安市经济开发区辖区'
                          }
                        ],
                        'agencyName': '西安市经济开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610133000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610133000',
                            'agencyName': '西安市曲江新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610133000',
                            'agencyName': '西安市曲江新区辖区'
                          }
                        ],
                        'agencyName': '西安市曲江新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610136000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610136000',
                            'agencyName': '西安市浐灞生态区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610136000',
                            'agencyName': '西安市浐灞生态区辖区'
                          }
                        ],
                        'agencyName': '西安市浐灞生态区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610139000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610139000',
                            'agencyName': '西安市国际港务区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610139000',
                            'agencyName': '西安市国际港务区辖区'
                          }
                        ],
                        'agencyName': '西安市国际港务区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610140000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610140000',
                            'agencyName': '西安市航天基地本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610140000',
                            'agencyName': '西安市航天基地辖区'
                          }
                        ],
                        'agencyName': '西安市航天基地'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610141000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610141000',
                            'agencyName': '西安市航空基地本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610141000',
                            'agencyName': '西安市航空基地辖区'
                          }
                        ],
                        'agencyName': '西安市航空基地'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610150000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610150000',
                            'agencyName': '西咸新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610150000',
                            'children': [
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150101',
                                'agencyName': '沣西新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150102',
                                'agencyName': '空港新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150103',
                                'agencyName': '泾河新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150104',
                                'agencyName': '沣东新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150105',
                                'agencyName': '秦汉新城本级'
                              }
                            ],
                            'agencyName': '西咸新区辖区'
                          }
                        ],
                        'agencyName': '西咸新区'
                      }
                    ],
                    'agencyName': '西安市辖区'
                  }
                ],
                'agencyName': '西安市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610200000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610200000',
                    'agencyName': '铜川市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610200000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610202000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610202000',
                            'agencyName': '王益区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610202000',
                            'agencyName': '王益区辖区'
                          }
                        ],
                        'agencyName': '王益区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610203000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610203000',
                            'agencyName': '印台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610203000',
                            'agencyName': '印台区辖区'
                          }
                        ],
                        'agencyName': '印台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610204000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610204000',
                            'agencyName': '耀州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610204000',
                            'agencyName': '耀州区辖区'
                          }
                        ],
                        'agencyName': '耀州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610222000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610222000',
                            'agencyName': '宜君县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610222000',
                            'agencyName': '宜君县辖区'
                          }
                        ],
                        'agencyName': '宜君县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610223000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610223000',
                            'agencyName': '铜川新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610223000',
                            'agencyName': '铜川新区辖区'
                          }
                        ],
                        'agencyName': '铜川新区'
                      }
                    ],
                    'agencyName': '铜川市辖区'
                  }
                ],
                'agencyName': '铜川市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610399000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610300000',
                    'agencyName': '宝鸡市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610300000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610302000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610302000',
                            'agencyName': '渭滨区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610302000',
                            'agencyName': '渭滨区辖区'
                          }
                        ],
                        'agencyName': '渭滨区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610303000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610303000',
                            'agencyName': '金台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610303000',
                            'agencyName': '金台区辖区'
                          }
                        ],
                        'agencyName': '金台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610304000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610304000',
                            'agencyName': '陈仓区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610304000',
                            'agencyName': '陈仓区辖区'
                          }
                        ],
                        'agencyName': '陈仓区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610322000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610322000',
                            'agencyName': '凤翔县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610322000',
                            'agencyName': '凤翔县辖区'
                          }
                        ],
                        'agencyName': '凤翔县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610323000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610323000',
                            'agencyName': '岐山县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610323000',
                            'agencyName': '岐山县辖区'
                          }
                        ],
                        'agencyName': '岐山县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610324000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610324000',
                            'agencyName': '扶风县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610324000',
                            'agencyName': '扶风县辖区'
                          }
                        ],
                        'agencyName': '扶风县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610326000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610326000',
                            'agencyName': '眉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610326000',
                            'agencyName': '眉县辖区'
                          }
                        ],
                        'agencyName': '眉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610327000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610327000',
                            'agencyName': '陇县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610327000',
                            'agencyName': '陇县辖区'
                          }
                        ],
                        'agencyName': '陇县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610328000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610328000',
                            'agencyName': '千阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610328000',
                            'agencyName': '千阳县辖区'
                          }
                        ],
                        'agencyName': '千阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610329000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610329000',
                            'agencyName': '麟游县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610329000',
                            'agencyName': '麟游县辖区'
                          }
                        ],
                        'agencyName': '麟游县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610330000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610330000',
                            'agencyName': '凤县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610330000',
                            'agencyName': '凤县辖区'
                          }
                        ],
                        'agencyName': '凤县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610331000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610331000',
                            'agencyName': '太白县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610331000',
                            'agencyName': '太白县辖区'
                          }
                        ],
                        'agencyName': '太白县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610332000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610332000',
                            'agencyName': '宝鸡市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610332000',
                            'agencyName': '宝鸡市高新区辖区'
                          }
                        ],
                        'agencyName': '宝鸡市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610333000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610333000',
                            'agencyName': '宝鸡市蔡家坡经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610333000',
                            'agencyName': '宝鸡市蔡家坡经济开发区辖区'
                          }
                        ],
                        'agencyName': '宝鸡市蔡家坡经济开发区'
                      }
                    ],
                    'agencyName': '宝鸡市辖区'
                  }
                ],
                'agencyName': '宝鸡市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610400000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610400000',
                    'agencyName': '咸阳市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610400000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610402000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610402000',
                            'agencyName': '秦都区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610402000',
                            'agencyName': '秦都区辖区'
                          }
                        ],
                        'agencyName': '秦都区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610404000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610404000',
                            'agencyName': '渭城区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610404000',
                            'agencyName': '渭城区辖区'
                          }
                        ],
                        'agencyName': '渭城区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610422000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610422000',
                            'agencyName': '三原县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610422000',
                            'agencyName': '三原县辖区'
                          }
                        ],
                        'agencyName': '三原县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610423000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610882000',
                            'agencyName': '泾阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610423000',
                            'agencyName': '泾阳县辖区'
                          }
                        ],
                        'agencyName': '泾阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610424000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610424000',
                            'agencyName': '乾县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610424000',
                            'agencyName': '乾县辖区'
                          }
                        ],
                        'agencyName': '乾县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610425000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610425000',
                            'agencyName': '礼泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610425000',
                            'agencyName': '礼泉县辖区'
                          }
                        ],
                        'agencyName': '礼泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610426000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610426000',
                            'agencyName': '永寿县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610426000',
                            'agencyName': '永寿县辖区'
                          }
                        ],
                        'agencyName': '永寿县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610428000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610428000',
                            'agencyName': '长武县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610428000',
                            'agencyName': '长武县辖区'
                          }
                        ],
                        'agencyName': '长武县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610429000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610429000',
                            'agencyName': '旬邑县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610429000',
                            'agencyName': '旬邑县辖区'
                          }
                        ],
                        'agencyName': '旬邑县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610430000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610430000',
                            'agencyName': '淳化县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610430000',
                            'agencyName': '淳化县辖区'
                          }
                        ],
                        'agencyName': '淳化县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610431000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610431000',
                            'agencyName': '武功县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610431000',
                            'agencyName': '武功县辖区'
                          }
                        ],
                        'agencyName': '武功县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610481000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610481000',
                            'agencyName': '兴平市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610481000',
                            'agencyName': '兴平市辖区'
                          }
                        ],
                        'agencyName': '兴平市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610482000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610482000',
                            'agencyName': '彬州市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610482000',
                            'agencyName': '彬州市辖区'
                          }
                        ],
                        'agencyName': '彬州市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610492000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610492000',
                            'agencyName': '咸阳市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610492000',
                            'agencyName': '咸阳市高新区辖区'
                          }
                        ],
                        'agencyName': '咸阳市高新区'
                      }
                    ],
                    'agencyName': '咸阳市辖区'
                  }
                ],
                'agencyName': '咸阳市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610500000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610500000',
                    'agencyName': '渭南市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610500000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610502000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610502000',
                            'agencyName': '临渭区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610502000',
                            'agencyName': '临渭区辖区'
                          }
                        ],
                        'agencyName': '临渭区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610503000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610503000',
                            'agencyName': '华州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610503000',
                            'agencyName': '华州区辖区'
                          }
                        ],
                        'agencyName': '华州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610522000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610522000',
                            'agencyName': '潼关县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610522000',
                            'agencyName': '潼关县辖区'
                          }
                        ],
                        'agencyName': '潼关县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610523000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610523000',
                            'agencyName': '大荔县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610523000',
                            'agencyName': '大荔县辖区'
                          }
                        ],
                        'agencyName': '大荔县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610524000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610524000',
                            'agencyName': '合阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610524000',
                            'agencyName': '合阳县辖区'
                          }
                        ],
                        'agencyName': '合阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610525000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610525000',
                            'agencyName': '澄城县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610525000',
                            'agencyName': '澄城县辖区'
                          }
                        ],
                        'agencyName': '澄城县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610526000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610526000',
                            'agencyName': '蒲城县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610526000',
                            'agencyName': '蒲城县辖区'
                          }
                        ],
                        'agencyName': '蒲城县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610527000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610527000',
                            'agencyName': '白水县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610527000',
                            'agencyName': '白水县辖区'
                          }
                        ],
                        'agencyName': '白水县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610528000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610528000',
                            'agencyName': '富平县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610528000',
                            'agencyName': '富平县辖区'
                          }
                        ],
                        'agencyName': '富平县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610581000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610581000',
                            'agencyName': '韩城市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610581000',
                            'agencyName': '韩城市辖区'
                          }
                        ],
                        'agencyName': '韩城市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610582000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610582000',
                            'agencyName': '华阴市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610582000',
                            'agencyName': '华阴市辖区'
                          }
                        ],
                        'agencyName': '华阴市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610583000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610583000',
                            'agencyName': '渭南市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610583000',
                            'agencyName': '渭南市高新区辖区'
                          }
                        ],
                        'agencyName': '渭南市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610584000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610584000',
                            'agencyName': '渭南市经济技术开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610584000',
                            'agencyName': '渭南市经济技术开发区辖区'
                          }
                        ],
                        'agencyName': '渭南市经济技术开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610585000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610585000',
                            'agencyName': '渭南市卤阳湖开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610585000',
                            'agencyName': '渭南市卤阳湖开发区辖区'
                          }
                        ],
                        'agencyName': '渭南市卤阳湖开发区'
                      }
                    ],
                    'agencyName': '渭南市辖区'
                  }
                ],
                'agencyName': '渭南市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610699000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610600000',
                    'agencyName': '延安市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610600000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610602000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610602000',
                            'agencyName': '宝塔区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610602000',
                            'agencyName': '宝塔区辖区'
                          }
                        ],
                        'agencyName': '宝塔区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610603000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610603000',
                            'agencyName': '安塞区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610603000',
                            'agencyName': '安塞区辖区'
                          }
                        ],
                        'agencyName': '安塞区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610621000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610621000',
                            'agencyName': '延长县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610621000',
                            'agencyName': '延长县辖区'
                          }
                        ],
                        'agencyName': '延长县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610622000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610622000',
                            'agencyName': '延川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610622000',
                            'agencyName': '延川县辖区'
                          }
                        ],
                        'agencyName': '延川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610625000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610625000',
                            'agencyName': '志丹县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610625000',
                            'agencyName': '志丹县辖区'
                          }
                        ],
                        'agencyName': '志丹县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610626000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610626000',
                            'agencyName': '吴起县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610626000',
                            'agencyName': '吴起县辖区'
                          }
                        ],
                        'agencyName': '吴起县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610627000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610627000',
                            'agencyName': '甘泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610627000',
                            'agencyName': '甘泉县辖区'
                          }
                        ],
                        'agencyName': '甘泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610628000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610628000',
                            'agencyName': '富县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610628000',
                            'agencyName': '富县辖区'
                          }
                        ],
                        'agencyName': '富县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610629000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610629000',
                            'agencyName': '洛川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610629000',
                            'agencyName': '洛川县辖区'
                          }
                        ],
                        'agencyName': '洛川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610630000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610630000',
                            'agencyName': '宜川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610630000',
                            'agencyName': '宜川县辖区'
                          }
                        ],
                        'agencyName': '宜川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610631000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610631000',
                            'agencyName': '黄龙县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610631000',
                            'agencyName': '黄龙县辖区'
                          }
                        ],
                        'agencyName': '黄龙县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610632000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610632000',
                            'agencyName': '黄陵县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610632000',
                            'agencyName': '黄陵县辖区'
                          }
                        ],
                        'agencyName': '黄陵县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610633000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610633000',
                            'agencyName': '延安市经济技术开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610633000',
                            'agencyName': '延安市经济技术开发区辖区'
                          }
                        ],
                        'agencyName': '延安市经济技术开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610681000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610681000',
                            'agencyName': '子长市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610681000',
                            'agencyName': '子长市辖区'
                          }
                        ],
                        'agencyName': '子长市'
                      }
                    ],
                    'agencyName': '延安市辖区'
                  }
                ],
                'agencyName': '延安市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610700000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610700000',
                    'agencyName': '汉中市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610700000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610702000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610702000',
                            'agencyName': '汉台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610702000',
                            'agencyName': '汉台区辖区'
                          }
                        ],
                        'agencyName': '汉台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610703101',
                        'agencyName': '南郑区大河坎镇'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610703000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610703000',
                            'agencyName': '南郑区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610703000',
                            'agencyName': '南郑区辖区'
                          }
                        ],
                        'agencyName': '南郑区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610722000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610722000',
                            'agencyName': '城固县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610722000',
                            'agencyName': '城固县辖区'
                          }
                        ],
                        'agencyName': '城固县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610723000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610723000',
                            'agencyName': '洋县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610723000',
                            'agencyName': '洋县辖区'
                          }
                        ],
                        'agencyName': '洋县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610724000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610724000',
                            'agencyName': '西乡县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610724000',
                            'agencyName': '西乡县辖区'
                          }
                        ],
                        'agencyName': '西乡县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610725000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610725000',
                            'agencyName': '勉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610725000',
                            'agencyName': '勉县辖区'
                          }
                        ],
                        'agencyName': '勉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610726000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610726000',
                            'agencyName': '宁强县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610726000',
                            'agencyName': '宁强县辖区'
                          }
                        ],
                        'agencyName': '宁强县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610727000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610727000',
                            'agencyName': '略阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610727000',
                            'agencyName': '略阳县辖区'
                          }
                        ],
                        'agencyName': '略阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610728000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610728000',
                            'agencyName': '镇巴县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610728000',
                            'agencyName': '镇巴县辖区'
                          }
                        ],
                        'agencyName': '镇巴县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610729000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610729000',
                            'agencyName': '留坝县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610729000',
                            'agencyName': '留坝县辖区'
                          }
                        ],
                        'agencyName': '留坝县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610730000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610730000',
                            'agencyName': '佛坪县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610730000',
                            'agencyName': '佛坪县辖区'
                          }
                        ],
                        'agencyName': '佛坪县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610731000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610731000',
                            'agencyName': '汉中市经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610731000',
                            'agencyName': '汉中市经济开发区辖区'
                          }
                        ],
                        'agencyName': '汉中市经济开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610732000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610732000',
                            'agencyName': '汉中市兴元新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610732000',
                            'agencyName': '汉中市兴元新区辖区'
                          }
                        ],
                        'agencyName': '汉中市兴元新区'
                      }
                    ],
                    'agencyName': '汉中市辖区'
                  }
                ],
                'agencyName': '汉中市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610800000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610800000',
                    'agencyName': '榆林市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610800000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610802000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610802000',
                            'agencyName': '榆阳区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610802000',
                            'agencyName': '榆阳区辖区'
                          }
                        ],
                        'agencyName': '榆阳区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610803000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610803000',
                            'agencyName': '横山区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610803000',
                            'agencyName': '横山区辖区'
                          }
                        ],
                        'agencyName': '横山区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610822000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610822000',
                            'agencyName': '府谷县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610822000',
                            'agencyName': '府谷县辖区'
                          }
                        ],
                        'agencyName': '府谷县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610824000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610824000',
                            'agencyName': '靖边县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610824000',
                            'agencyName': '靖边县辖区'
                          }
                        ],
                        'agencyName': '靖边县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610825000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610825000',
                            'agencyName': '定边县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610825000',
                            'agencyName': '定边县辖区'
                          }
                        ],
                        'agencyName': '定边县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610826000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610826000',
                            'agencyName': '绥德县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610826000',
                            'agencyName': '绥德县辖区'
                          }
                        ],
                        'agencyName': '绥德县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610827000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610827000',
                            'agencyName': '米脂县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610827000',
                            'agencyName': '米脂县辖区'
                          }
                        ],
                        'agencyName': '米脂县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610828000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610828000',
                            'agencyName': '佳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610828000',
                            'agencyName': '佳县辖区'
                          }
                        ],
                        'agencyName': '佳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610829000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610829000',
                            'agencyName': '吴堡县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610829000',
                            'agencyName': '吴堡县辖区'
                          }
                        ],
                        'agencyName': '吴堡县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610830000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610830000',
                            'agencyName': '清涧县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610830000',
                            'agencyName': '清涧县辖区'
                          }
                        ],
                        'agencyName': '清涧县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610831000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610831000',
                            'agencyName': '子洲县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610831000',
                            'agencyName': '子洲县辖区'
                          }
                        ],
                        'agencyName': '子洲县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610832000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610832000',
                            'agencyName': '榆横工业区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610832000',
                            'agencyName': '榆横工业区辖区'
                          }
                        ],
                        'agencyName': '榆横工业区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610833000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610833000',
                            'agencyName': '榆神工业区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610833000',
                            'agencyName': '榆神工业区辖区'
                          }
                        ],
                        'agencyName': '榆神工业区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610881000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610881000',
                            'agencyName': '神木市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610881000',
                            'agencyName': '神木市辖区'
                          }
                        ],
                        'agencyName': '神木市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610000000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610882000',
                            'agencyName': '大柳塔镇本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610000000',
                            'agencyName': '大柳塔镇辖区'
                          }
                        ],
                        'agencyName': '大柳塔镇'
                      }
                    ],
                    'agencyName': '榆林市辖区'
                  }
                ],
                'agencyName': '榆林市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610900000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610900000',
                    'agencyName': '安康市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610900000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610902000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610902000',
                            'agencyName': '汉滨区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610902000',
                            'agencyName': '汉滨区辖区'
                          }
                        ],
                        'agencyName': '汉滨区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610921000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610921000',
                            'agencyName': '汉阴县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610921000',
                            'agencyName': '汉阴县辖区'
                          }
                        ],
                        'agencyName': '汉阴县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610922000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610922000',
                            'agencyName': '石泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610922000',
                            'agencyName': '石泉县辖区'
                          }
                        ],
                        'agencyName': '石泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610923000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610923000',
                            'agencyName': '宁陕县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610923000',
                            'agencyName': '宁陕县辖区'
                          }
                        ],
                        'agencyName': '宁陕县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610924000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610924000',
                            'agencyName': '紫阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610924000',
                            'agencyName': '紫阳县辖区'
                          }
                        ],
                        'agencyName': '紫阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610925000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610925000',
                            'agencyName': '岚皋县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610925000',
                            'agencyName': '岚皋县辖区'
                          }
                        ],
                        'agencyName': '岚皋县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610926000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610926000',
                            'agencyName': '平利县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610926000',
                            'agencyName': '平利县辖区'
                          }
                        ],
                        'agencyName': '平利县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610927000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610927000',
                            'agencyName': '镇坪县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610927000',
                            'agencyName': '镇坪县辖区'
                          }
                        ],
                        'agencyName': '镇坪县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610928000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610928000',
                            'agencyName': '旬阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610928000',
                            'agencyName': '旬阳县辖区'
                          }
                        ],
                        'agencyName': '旬阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610929000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610929000',
                            'agencyName': '白河县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610929000',
                            'agencyName': '白河县辖区'
                          }
                        ],
                        'agencyName': '白河县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610930000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610930000',
                            'agencyName': '安康市高新技术产业开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610930000',
                            'agencyName': '安康市高新技术产业开发区辖区'
                          }
                        ],
                        'agencyName': '安康市高新技术产业开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610932000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610932000',
                            'agencyName': '安康市恒口示范区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610932000',
                            'agencyName': '安康市恒口示范区辖区'
                          }
                        ],
                        'agencyName': '安康市恒口示范区'
                      }
                    ],
                    'agencyName': '安康市辖区'
                  }
                ],
                'agencyName': '安康市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '611000000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '611000000',
                    'agencyName': '商洛市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '611000000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611002000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611002000',
                            'agencyName': '商州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611002000',
                            'agencyName': '商州区辖区'
                          }
                        ],
                        'agencyName': '商州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611021000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611021000',
                            'agencyName': '洛南县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611021000',
                            'agencyName': '洛南县辖区'
                          }
                        ],
                        'agencyName': '洛南县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611022000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611022000',
                            'agencyName': '丹凤县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611022000',
                            'agencyName': '丹凤县辖区'
                          }
                        ],
                        'agencyName': '丹凤县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611023000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611023000',
                            'agencyName': '商南县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611023000',
                            'agencyName': '商南县辖区'
                          }
                        ],
                        'agencyName': '商南县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611024000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611024000',
                            'agencyName': '山阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611024000',
                            'agencyName': '山阳县辖区'
                          }
                        ],
                        'agencyName': '山阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611025000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611025000',
                            'agencyName': '镇安县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611025000',
                            'agencyName': '镇安县辖区'
                          }
                        ],
                        'agencyName': '镇安县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611026000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611026000',
                            'agencyName': '柞水县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611026000',
                            'agencyName': '柞水县辖区'
                          }
                        ],
                        'agencyName': '柞水县'
                      }
                    ],
                    'agencyName': '商洛市辖区'
                  }
                ],
                'agencyName': '商洛市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610432000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610432000',
                    'agencyName': '杨凌示范区本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610432000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610403000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610403000',
                            'agencyName': '杨陵区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610403000',
                            'agencyName': '杨陵区辖区'
                          }
                        ],
                        'agencyName': '杨陵区'
                      }
                    ],
                    'agencyName': '杨凌示范区辖区'
                  }
                ],
                'agencyName': '杨凌示范区'
              }
            ],
            'agencyName': '陕西省辖区',
            sPro: 89.9,
            shPro: 94.8,
            xPro: 49.8,
            payPro: 99.4
          }
        ],
        'agencyName': '陕西省',
        sPro: 89.9,
        shPro: 94.8,
        xPro: 49.8,
        payPro: 99.4
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
