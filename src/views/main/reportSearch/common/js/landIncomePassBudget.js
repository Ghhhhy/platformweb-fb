import store from '@/store/index'
// 内蒙8土地出让收入大于一般公共预算收入
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
      title: '区划',
      field: 'nm-agencyCode',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        defaultValue: '',
        props: {
          placeholder: '请选择区划',
          isServer: true,
          format: '{code}-{name}',
          config: {
            treeProps: {
              nodeKey: 'guid',
              label: 'name',
              children: 'children',
              labelFormat: '{code}-{name}'
            },
            placeholder: '请选择区划',
            multiple: false,
            isleaf: false,
            axiosConfig: {
              method: 'post',
              successCode: '100000',
              statusField: 'rscode',
              url: 'dfr-monitor-service/dfr/mofDivList/query'
            }
          },
          queryparams: {
            fiscalYear: '2023'
          }
        }
      }
    },
    {
      title: '级次',
      field: 'nm-levels',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '全部' },
          { value: '1', label: '省本级' },
          { value: '2', label: '市本级' },
          { value: '3', label: '县级' }
        ],
        props: {
          placeholder: '级次'
        }
      }
    },
    {
      field: 'income_sort_',
      title: '收入科目（二级）',
      width: '8',
      itemRender: {
        name: '$formTreeInput',
        props: {
          'placeholder': '收入科目（二级）',
          type: 'text',
          isleaf: true,
          isServer: true,
          elecode: 'income_sort',
          editConfig: {
            initLoadTree: false
          },
          serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
          queryparams: {
            eleCode: 'income_sort'
          }
        }
      }
    },
    {
      'title': '当年当月累计最小收入',
      'field': 'nm-amountSnjzhje1',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年当月累计最小收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '当年当月累计最大收入',
      'field': 'nm-amountSnjzhje2',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '当年当月累计最大收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '上年同期累计最小收入',
      'field': 'nm-amountSnjxd1',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上年同期累计最小收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '上年同期累计最大收入',
      'field': 'nm-amountSnjxd2',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '上年同期累计最大收入'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '最小增幅',
      'field': 'nm-sLoad1',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最小增幅'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    },
    {
      'title': '最大增幅',
      'field': 'nm-sLoad2',
      'width': '8',
      'align': 'left',
      'formula': '',
      'name': '$vxeMoney',
      'itemRender': {
        'name': '$vxeMoney',
        'options': [],
        'defaultValue': '',
        'props': {
          'placeholder': '最大增幅'
        }
      },
      'fixed': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '',
      'filters': '',
      'associatedQuery': '',
      'className': ''
    }
  ],
  highQueryData: {
    fiscalYear: store.state.userInfo.year,
    proCodes: '',
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
    // 非直辖（省、市、县）
    tableColumnsConfig: [
      {
        'title': '地区名称',
        'type': 'nm-name',
        'treeNode': true,
        'fixed': 'left',
        'align': 'left',
        'width': 240,
        'field': 'name',
        'cellRender': {
          'name': '$vxeIcon'
        }
      },
      {
        'title': '区划代码',
        'width': 150,
        'field': 'nm-agencyCode',
        'filters': true,
        'align': 'right',
        'type': 'nm-agencyCode',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '级次（省、市、县）',
        'min-width': '200px',
        'max-width': '300px',
        'filters': true,
        'field': 'nm-amountZyxd',
        'align': 'right',
        'type': 'nm-amountZyxd',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '收入科目编码（土地出让收入）',
        'width': 260,
        'filters': true,
        'field': 'nm-income_sort_code',
        'align': 'right',
        'type': 'nm-income_sort_code',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '收入科目名称（土地出让收入）',
        'width': 260,
        'filters': true,
        'field': 'nm-income_sort_name',
        'align': 'right',
        'type': 'nm-income_sort_name',
        'cellRender': {
          'name': '$vxeInput'
        }
      },
      {
        'title': '当年当月累计收入（土地出让收入）',
        'width': 320,
        'field': 'nm-amountSnjzhje',
        'align': 'right',
        'type': 'nm-amountSnjzhje',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      },
      {
        'title': '当年累计一般公共预算收入',
        'field': 'nm-amountSnjxd',
        'width': 320,
        'align': 'right',
        'cellRender': {
          'name': '$vxeMoney'
        },
        'visible': true
      }
    ],
    // 直辖（市、区、镇）
    tableColumnsConfigCity: [
      // {
      //   title: '地区编码',
      //   type: 'code',
      //   treeNode: true,
      //   align: 'left',
      //   width: 260,
      //   field: 'name',
      //   cellRender: {
      //     name: '$vxeIcon'
      //   },
      //   visible: false
      // },
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        fixed: 'left',
        align: 'left',
        width: 260,
        field: 'name',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '中央下达',
        width: 200,
        field: 'amountZyxd',
        align: 'right',
        type: 'amountZyxd',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '中央下达（不含分配下级）',
        width: 200,
        field: 'amountZyxd2',
        align: 'right',
        type: 'amountZyxd',
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
            sortable: true,
            field: 'amountPayAll',
            formula: '{amountSnjpay}+{amountSjpay}+{amountXjpay}'
          },
          {
            title: '进度',
            align: 'right',
            width: 200,
            field: 'jLoad',
            formula: '({amountZyxd2}-0==0)?0:Math.round(({amountPayAll}/{amountZyxd2}*100*10)/10)',
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
            areaType: 'city',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSnjxd',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSnjbjfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSnjxjfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSnjwfp',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSnjbjfp}-{amountSnjxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSnjpay',
            width: 200,
            align: 'right',
            areaType: 'city',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'sLoad',
            width: 200,
            align: 'right',
            areaType: 'city',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100*10)/10',
            // formula: '({amountZyxd}-0==0)?0:Number(({amountSnjbjfp}+{amountSnjxjfp})/{amountZyxd}*100).toFixed(1)',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '区级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountSjzhje',
            align: 'right',
            areaType: 'region',
            type: 'amountSjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountSjxd',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '分配本级',
            field: 'amountSbjfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配下级',
            field: 'amountSxjfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountSjwfp',
            width: 100,
            align: 'right',
            areaType: 'region',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountSbjfp}-{amountSxjfp}'
          },
          {
            title: '本级已支出',
            field: 'amountSjpay',
            width: 120,
            areaType: 'region',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'aLoad',
            width: 100,
            align: 'right',
            areaType: 'region',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountSbjfp}+{amountSxjfp})/{amountZyxd}*100*10)/10',
            cellRender: {
              name: '$vxeRatio'
            }
          }
        ]
      },
      {
        title: '镇级',
        width: 100,
        align: 'center',
        children: [
          {
            title: '整合金额',
            width: 100,
            field: 'amountXjzhje',
            align: 'right',
            areaType: 'town',
            type: 'amountXjzhje',
            cellRender: { name: '$vxeMoney' },
            visible: store.getters.isSx
          },
          {
            title: '中央下达',
            field: 'amountXjxd',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' },
            visible: false
          },
          {
            title: '已分配',
            field: 'amountXjfp',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '未分配',
            field: 'amountXjwfp',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
            // formula: '{amountZyxd}-{amountXjfp}'
          },
          {
            title: '已支出',
            field: 'amountXjpay',
            width: 100,
            align: 'right',
            areaType: 'town',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '分配进度',
            field: 'xLoad',
            width: 100,
            align: 'right',
            areaType: 'town',
            formula: '({amountZyxd}-0==0)?0:Math.round(({amountXjfp}/{amountZyxd}*100)*10)/10',
            cellRender: {
              name: '$vxeRatio'
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
