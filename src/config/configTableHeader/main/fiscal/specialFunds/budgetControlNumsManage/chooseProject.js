export const columns = [
  {
    title: '预算单位',
    field: 'agency',
    width: '180',
    editRender: {
      name: '$vxeTree',
      props: {
        config: {
          isHump: true,
          treeProps: {
            // 树配置选项
            labelFormat: '{code}-{name}', // {code}-{name}
            nodeKey: 'id', // 树的主键
            label: 'name', // 树的显示lalel字段
            children: 'children' // 树的嵌套字段
          }
        }
      }

    }
  },
  {
    title: '项目类别',
    field: 'proCatName',
    width: '180',
    align: 'left'
  },
  {
    title: '项目代码',
    field: 'proCode',
    width: '180',
    align: 'left'
  },
  {
    title: '项目名称',
    field: 'proName',
    width: '180',
    align: 'left'
  },
  {
    title: '支出项目类别',
    field: 'payoutKindName',
    width: '180',
    align: 'left'
  },
  {
    title: '专项资金目录',
    field: 'speTypeName',
    width: '180',
    align: 'left'
  },
  {
    title: '当年资金需求',
    field: 'applyUp',
    width: '180',
    combinedType: ['total'],
    align: 'right',
    cellRender: {
      name: '$vxeMoney',
      defaultValue: 0
    }
  },
  {
    title: '项目总额',
    field: 'proTotalAmt',
    width: '180',
    combinedType: ['total'],
    align: 'right',
    cellRender: {
      name: '$vxeMoney',
      defaultValue: 0
    }
  }
]
export default {
  chooseProject: columns
}
