// 页面：预算编制管理 => 预算管理 => 部门预算编报（预算单位） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（主管部门） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（资产处） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（业务处） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算绩效审核（绩效处） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算数据评审（评审中心） => 收入预算
// 页面：预算编制管理 => 预算确认 => 预算数据审阅（预算处） => 收入预算
// 非税征收计划表 表头配置  2020-7-14 09:43
// 负责人：黄丹
export const columns = [
  {
    title: '预算单位',
    field: 'agency_',
    width: '120'
  },
  {
    title: '收费项目',
    field: 'incitem',
    width: '120'
  },
  {
    title: '收入科目',
    field: 'incomesort',
    width: '120'
  },
  {
    title: '2021年征收计划',
    field: 'title1',
    width: '120',
    childrens: [
      {
        title: '合计',
        field: 'f1',
        width: '120'
      },
      {
        title: '县',
        field: 'f2',
        width: '120'
      },
      {
        title: '市',
        field: 'f3',
        width: '120'
      },
      {
        title: '省',
        field: 'f4',
        width: '120'
      },
      {
        title: '中央',
        field: 'f5',
        width: '120'
      }
    ]
  },
  {
    title: '2022年征收计划',
    field: 'title2',
    width: '120',
    childrens: [
      {
        title: '合计',
        field: 'f6',
        width: '120'
      },
      {
        title: '县',
        field: 'f7',
        width: '120'
      },
      {
        title: '市',
        field: 'f8',
        width: '120'
      },
      {
        title: '省',
        field: 'f9',
        width: '120'
      },
      {
        title: '中央',
        field: 'f10',
        width: '120'
      }
    ]
  },
  {
    title: '2023年征收计划',
    field: 'title3',
    width: '120',
    childrens: [
      {
        title: '合计',
        field: 'f11',
        width: '120'
      },
      {
        title: '县',
        field: 'f12',
        width: '120'
      },
      {
        title: '市',
        field: 'f13',
        width: '120'
      },
      {
        title: '省',
        field: 'f14',
        width: '120'
      },
      {
        title: '中央',
        field: 'f15',
        width: '120'
      }
    ]
  },
  {
    title: '2019年决算',
    field: 'title4',
    width: '120',
    childrens: [
      {
        title: '合计',
        field: 'f16',
        width: '120'
      },
      {
        title: '县',
        field: 'f17',
        width: '120'
      },
      {
        title: '市',
        field: 'f18',
        width: '120'
      },
      {
        title: '省',
        field: 'f19',
        width: '120'
      },
      {
        title: '中央',
        field: 'f20',
        width: '120'
      }
    ]
  },
  {
    title: '2020年实际征收情况（截止6月30日）',
    field: 'title5',
    width: '120',
    childrens: [
      {
        title: '合计',
        field: 'f21',
        width: '120'
      },
      {
        title: '县',
        field: 'f22',
        width: '120'
      },
      {
        title: '市',
        field: 'f23',
        width: '120'
      },
      {
        title: '省',
        field: 'f24',
        width: '120'
      },
      {
        title: '中央',
        field: 'f25',
        width: '120'
      }
    ]
  },
  {
    title: '说明',
    field: 'remark',
    width: '120'
  }
]

export default {
  nonTaxCollectionPlan: columns
}
