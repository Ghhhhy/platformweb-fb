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
          // // { value: '2020', label: '2020年' },
          // // { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '地区',
      field: 'mofDivCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code'],
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '地区',
            multiple: false,
            readonly: false,
            isleaf: true
          }
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
    fiscalYear: '2022',
    mofDivCodes: '',
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
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 160,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountSnjxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '整合',
        width: 200,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        cellRender: { name: '$vxeMoney' },
        visible: false
      },
      {
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:({amountPayAll}/{amountZyxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '省级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 200,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({amountSnjxd}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '市级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 200,
            field: 'amountSjzhje',
            align: 'right',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSjxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 200,
            align: 'right',
            formula: '({amountSjxd}-0==0)?0:(({amountSbjfp}+{amountSxjfp})/{amountSjxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '县级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 200,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            formula: '({amountXjfp}-0==0)?0:({amountXjfp}/{amountXjfp}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableColumnsConfigCity: [
      // {
      //   title: '资金编码',
      //   type: 'code',
      //   fixed: false,
      //   align: 'left',
      //   width: 160,
      //   field: 'code',
      //   visible: false
      // },
      {
        title: '资金名称',
        type: 'name',
        treeNode: true,
        fixed: false,
        align: 'left',
        width: 160,
        field: 'name',
        cellRender: {
          name: '$vxeIcon',
          props: {
            $refs: this
          }
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountSnjxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '整合',
        width: 200,
        field: 'amountZhje',
        align: 'right',
        type: 'amountZhje',
        cellRender: { name: '$vxeMoney' },
        visible: false
      },
      {
        title: '支出',
        width: 260,
        align: 'center',
        children: [
          {
            title: '金额',
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            width: 200,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd}-0==0)?0:({amountPayAll}/{amountZyxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '市级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 200,
            field: 'amountSnjzhje',
            align: 'right',
            type: 'amountSnjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountSnjxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            formula: '({amountSnjxd}-0==0)?0:(({amountSnjbjfp}+{amountSnjxjfp})/{amountSnjxd}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '区级',
        width: 200,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 200,
            field: 'amountXjzhje',
            align: 'right',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' },
            formula: '{amountXjxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 200,
            align: 'right',
            formula: '({amountXjfp}-0==0)?0:({amountXjfp}/{amountXjfp}*100)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      }
    ],
    tableData: []
    // tableData: [
    //   {
    //     speTypeCode: '1001',
    //     speTypeName: '直达资金',
    //     amountZyxd: 61669701613,
    //     amountSnjbjfp: 6278751613,
    //     amountSnjxjfp: 5390950000,
    //     amountSnjpay: 138576576.31,
    //     amountSbjfp: 0,
    //     amountSxjfp: 0,
    //     amountSjpay: 0,
    //     amountXjfp: 106680674.01,
    //     amountXjpay: 5026387.94,
    //     children: [
    //       {
    //         speTypeCode: '10001',
    //         speTypeName: '共同财政事权转移支付',
    //         amountZyxd: 20569701613,
    //         amountSnjbjfp: 6278751613,
    //         amountSnjxjfp: 5390950000,
    //         amountSnjpay: 138576576.31,
    //         amountSbjfp: 0,
    //         amountSxjfp: 0,
    //         amountSjpay: 0,
    //         amountXjfp: 106680674.01,
    //         amountXjpay: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '10001',
    //             speTypeName: '城乡义务教育补助经费',
    //             amountZyxd: 11669701613,
    //             amountSnjbjfp: 6278751613,
    //             amountSnjxjfp: 5390950000,
    //             amountSnjpay: 138576576.31,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 106680674.01,
    //             amountXjpay: 5026387.94
    //           },
    //           {
    //             speTypeCode: '1007',
    //             speTypeName: '支出地方高校改革发展资金',
    //             amountZyxd: 16122680000,
    //             amountSnjbjfp: 16122680000,
    //             amountSnjxjfp: 0,
    //             amountSnjpay: 264559042.41,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '101101',
    //             speTypeName: '机关事业单位基本养老保险（人社厅）',
    //             amountZyxd: 3258540000,
    //             amountSnjbjfp: 726410000,
    //             amountSnjxjfp: 2532130000,
    //             amountSnjpay: 726410000,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 32380000,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '101102',
    //             speTypeName: '企业职工基本养老保险（人社厅）',
    //             amountZyxd: 1365220000,
    //             amountSnjbjfp: 1365220000,
    //             amountSnjxjfp: 0,
    //             amountSnjpay: 9283240000,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '101103',
    //             speTypeName: '城乡居民基本养老保险（人社厅）',
    //             amountZyxd: 5709410000,
    //             amountSnjbjfp: 0,
    //             amountSnjxjfp: 5709410000,
    //             amountSnjpay: 0,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '1012',
    //             speTypeName: '困难群众救助补助资金',
    //             amountZyxd: 4896150000,
    //             amountSnjbjfp: 0,
    //             amountSnjxjfp: 4896150000,
    //             amountSnjpay: 0,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 7413218,
    //             amountXjpay: 300320
    //           },
    //           {
    //             speTypeCode: '1017',
    //             speTypeName: '城乡居民基本医疗保险补助',
    //             amountZyxd: 12933620000,
    //             amountSnjbjfp: 0,
    //             amountSnjxjfp: 12933620000,
    //             amountSnjpay: 0,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '1018',
    //             speTypeName: '基本公共卫生服务补助资金',
    //             amountZyxd: 2268876000,
    //             amountSnjbjfp: 55148000,
    //             amountSnjxjfp: 2213728000,
    //             amountSnjpay: 420665.38,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10002',
    //         speTypeName: '一般性转移支付',
    //         amountZyxd: 30269701613,
    //         amountSnjbjfp: 6278751613,
    //         amountSnjxjfp: 4690950000,
    //         amountSnjpay: 138576576.31,
    //         amountSbjfp: 0,
    //         amountSxjfp: 0,
    //         amountSjpay: 0,
    //         amountXjfp: 106680674.01,
    //         amountXjpay: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '10002',
    //             speTypeName: '生猪（牛羊）调出大县奖励资金',
    //             amountZyxd: 11669701613,
    //             amountSnjbjfp: 6278751613,
    //             amountSnjxjfp: 5390950000,
    //             amountSnjpay: 138576576.31,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 106680674.01,
    //             amountXjpay: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10027',
    //             speTypeName: '县级基本财力保障机制奖补资金',
    //             amountZyxd: 1116122680000,
    //             amountSnjbjfp: 1116122680000,
    //             amountSnjxjfp: 0,
    //             amountSnjpay: 264559042.41,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           },
    //           {
    //             speTypeCode: '101201',
    //             speTypeName: '中央财政衔接推进乡村振兴补助资金',
    //             amountZyxd: 3258540000,
    //             amountSnjbjfp: 726410000,
    //             amountSnjxjfp: 2532130000,
    //             amountSnjpay: 726410000,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 32380000,
    //             amountXjpay: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10003',
    //         speTypeName: '支持基层落实减税降费和重点民生等专项转移支付',
    //         amountZyxd: 10669701613,
    //         amountSnjbjfp: 6278751613,
    //         amountSnjxjfp: 1390950000,
    //         amountSnjpay: 138576576.31,
    //         amountSbjfp: 0,
    //         amountSxjfp: 0,
    //         amountSjpay: 0,
    //         amountXjfp: 106680674.01,
    //         amountXjpay: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100031',
    //             speTypeName: '其他减税降费资金转移支付',
    //             amountZyxd: 11669701613,
    //             amountSnjbjfp: 6278751613,
    //             amountSnjxjfp: 5390950000,
    //             amountSnjpay: 138576576.31,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 106680674.01,
    //             amountXjpay: 5026387.94
    //           },
    //           {
    //             speTypeCode: '10037',
    //             speTypeName: '增值税留抵退税资金转移支付',
    //             amountZyxd: 1116122680000,
    //             amountSnjbjfp: 1116122680000,
    //             amountSnjxjfp: 0,
    //             amountSnjpay: 264559042.41,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 0,
    //             amountXjpay: 0
    //           }
    //         ]
    //       },
    //       {
    //         speTypeCode: '10004',
    //         speTypeName: '专项转移支付',
    //         amountZyxd: 164674613,
    //         amountSnjbjfp: 164674613,
    //         amountSnjxjfp: 950000,
    //         amountSnjpay: 138576576.31,
    //         amountSbjfp: 0,
    //         amountSxjfp: 0,
    //         amountSjpay: 0,
    //         amountXjfp: 106680674.01,
    //         amountXjpay: 5026387.94,
    //         children: [
    //           {
    //             speTypeCode: '100041',
    //             speTypeName: '普惠金融发展专项资金',
    //             amountZyxd: 64674613,
    //             amountSnjbjfp: 64674613,
    //             amountSnjxjfp: 5390950000,
    //             amountSnjpay: 138576576.31,
    //             amountSbjfp: 0,
    //             amountSxjfp: 0,
    //             amountSjpay: 0,
    //             amountXjfp: 106680674.01,
    //             amountXjpay: 5026387.94
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]
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
