
import store from '@/store/index'
// 福建总表
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
      field: 'mofDivCodes',
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
            multiple: true,
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
      field: 'levels',
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
    // 非直辖（省、市、县）
    tableColumnsConfig: [
      {
        title: '地区名称',
        type: 'name',
        treeNode: true,
        align: 'left',
        width: 200,
        fixed: 'left',
        field: 'name',
        cellRender: {
          name: '$vxeIcon'
        }
      },
      {
        title: '合计',
        width: 100,
        field: 'amountHj',
        align: 'right',
        type: 'amountHj',
        cellRender: { name: '$vxeMoney' }
      },
      {
        title: '一般公共预算收入当月环比增幅超过50%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj1',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'amonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'amonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'amonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'amonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'amonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'amonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'amonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'amonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'amonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'amonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'amonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'amonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '一般公共预算收入当月同比增幅超过50%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj2',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'bmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'bmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'bmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'bmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'bmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'bmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'bmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'bmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'bmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'bmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'bmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'bmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '一般公共预算收入累计同比增幅超20%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj3',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'cmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'cmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'cmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'cmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'cmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'cmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'cmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'cmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'cmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'cmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'cmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'cmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '税收收入二级科目累计同比增幅超50%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj4',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'dmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'dmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'dmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'dmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'dmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'dmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'dmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'dmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'dmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'dmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'dmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'dmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '非税收收入二级科目累计同比增幅超50%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj5',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'emonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'emonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'emonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'emonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'emonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'emonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'emonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'emonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'emonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'emonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'emonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'emonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '土地出让累计收入同比增幅超100%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj6',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'fmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'fmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'fmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'fmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'fmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'fmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'fmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'fmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'fmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'fmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'fmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'fmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '税收占比小于80%',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj7',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'gmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'gmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'gmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'gmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'gmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'gmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'gmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'gmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'gmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'gmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'gmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'gmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '土地出让收入大于一般公共预算收入',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj8',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'hmonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'hmonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'hmonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'hmonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'hmonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'hmonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'hmonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'hmonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'hmonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'hmonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'hmonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'hmonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      },
      {
        title: '“三保”支出管理',
        width: 100,
        align: 'center',
        children: [
          {
            title: '小计',
            width: 100,
            field: 'amountXj9',
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '1月',
            field: 'smonth1',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '2月',
            field: 'smonth2',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '3月',
            field: 'smonth3',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '4月',
            field: 'smonth4',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '5月',
            field: 'smonth5',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '6月',
            field: 'smonth6',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '7月',
            field: 'smonth7',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '8月',
            field: 'smonth8',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '9月',
            field: 'smonth9',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '10月',
            field: 'smonth10',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '11月',
            field: 'smonth11',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          },
          {
            title: '12月',
            field: 'smonth12',
            width: 100,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }]
      }
    ],
    // 直辖（市、区、镇）
    tableColumnsConfigCity: [],
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
