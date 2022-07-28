// 预算编制管理 => 预算下达 => 预算预下达（预算处（科））
// 预算编制管理 => 预算下达 => 预算下达（预算处（科））
// 预算批复表 表头配置 张颖捷 2020-07-14 13:55
export const columns = [
  {
    title: '单位编码',
    field: 'agency',
    width: 120
  },
  {
    title: '单位名称',
    field: 'agencyname',
    width: 120
  },
  {
    title: '数据节点',
    field: 'oldnode',
    width: 120
  },
  {
    title: '当前状态',
    field: 'currnode',
    width: 120
  },
  {
    title: '数据状态',
    field: 'status',
    width: 120
  },
  {
    title: '公共预算拨款',
    width: 120,
    children: [
      {
        title: '财政下发',
        field: 'f25',
        width: 120
      },
      {
        title: '部门下发',
        field: 'f1',
        width: 120
      }
    ]
  },
  {
    title: '专项资金项目',
    width: 120,
    children: [
      {
        title: '专项资金项目（省级）',
        field: 'f2',
        width: 120
      },
      {
        title: '专项资金项目（中央）',
        field: 'f3',
        width: 120
      }
    ]
  },
  {
    title: '政府性基金拨款',
    width: 120,
    children: [
      {
        title: '省级',
        field: 'f4',
        width: 120
      },
      {
        title: '中央',
        field: 'f5',
        width: 120
      }
    ]
  },
  {
    title: '“三公”经费',
    width: 120,
    children: [
      {
        title: '公共预算拨款',
        width: 120,
        children: [
          {
            title: '因公出国（境）费用',
            field: 'f18',
            width: 120
          },
          {
            title: '公务接待费',
            field: 'f19',
            width: 120
          },
          {
            title: '公务用车运行维护费',
            field: 'f10',
            width: 120
          }
        ]
      },
      {
        title: '政府性基金拨款（省级）',
        width: 120,
        children: [
          {
            title: '因公出国（境）费用',
            field: 'f20',
            width: 120
          },
          {
            title: '公务接待费',
            field: 'f11',
            width: 120
          },
          {
            title: '公务用车运行维护费',
            field: 'f12',
            width: 120
          }
        ]
      },
      {
        title: '政府性基金拨款（中央）',
        width: 120,
        children: [
          {
            title: '因公出国（境）费用',
            field: 'f13',
            width: 120
          },
          {
            title: '公务接待费',
            field: 'f21',
            width: 120
          }
        ]
      }
    ]
  },
  {
    title: '公务用车运行维护费',
    field: 'f26',
    width: 120
  },
  {
    title: '部门下发控制数',
    field: '无',
    width: 120
  },
  {
    title: '公共预算拨款',
    field: 'f14',
    width: 120
  },
  {
    title: '专项资金项目',
    field: 'f16',
    width: 120
  },
  {
    title: '专项资金项目（省级）',
    field: 'f27',
    width: 120
  },
  {
    title: '专项资金项目（中央）',
    field: 'f22',
    width: 120
  },
  {
    title: '政府性基金拨款',
    field: 'f15',
    width: 120
  },
  {
    title: '政府性基金拨款（省级）',
    field: 'f23',
    width: 120
  },
  {
    title: '政府性基金拨款（中央）',
    field: 'f24',
    width: 120
  }
]
export default {
  budgetApproval: columns
}
