export const getIndexColumns = () => {
  return [
    {
      title: '主管部门',
      field: 'deptName',
      align: 'left',
      width: 'auto',
      minWidth: 160,
      sortable: false,
      filters: false
    },
    {
      title: '业务处室',
      field: 'manageMofDepName',
      align: 'left',
      width: 'auto',
      minWidth: 160,
      sortable: false,
      filters: false
    },
    {
      title: '支出处室审核时间（天）',
      align: 'left',
      sortable: false,
      filters: false,
      children: [
        {
          title: '当月数据',
          field: 'currentMonth',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        },
        {
          title: '累计数据',
          field: 'totalMonth',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        }
      ]
    },
    {
      title: '总笔数（单）',
      align: 'left',
      sortable: false,
      filters: false,
      children: [
        {
          title: '当月数量（A）',
          field: 'currentNum',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        },
        {
          title: '累计数量（B）',
          field: 'totalNum',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        }
      ]
    },
    {
      title: '处室逾期笔数（大于3工作日）',
      align: 'left',
      sortable: false,
      filters: false,
      children: [
        {
          title: '当月预期数（C）',
          field: 'currentNum',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        },
        {
          title: '累计预期数（D）',
          field: 'totalNum',
          align: 'center',
          width: 140,
          sortable: false,
          filters: false
        }
      ]
    },
    {
      title: '逾期占比（%）',
      align: 'left',
      sortable: false,
      filters: false,
      children: [
        {
          title: '当月预期占比（=C/A）',
          field: 'currentNum',
          align: 'center',
          width: 160,
          sortable: false,
          filters: false,
          cellRender: {
            name: '$vxeRatio'
          }
        },
        {
          title: '累计预期占比（=D/B）',
          field: 'totalNum',
          align: 'center',
          width: 160,
          sortable: false,
          filters: false,
          cellRender: {
            name: '$vxeRatio'
          }
        }
      ]
    },
    {
      title: '备注',
      field: 'text',
      align: 'left',
      width: 140,
      sortable: false,
      filters: false
    }
  ]
}

export const getSearchSchemas = () => {
  return [
    {
      title: '业务处室',
      field: 'manageMofDepCode',
      titleWidth: 0,
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            treeProps: {
              labelFormat: '{code}-{name}',
              nodeKey: 'code',
              label: 'label',
              children: 'children'
            },
            placeholder: '业务处室',
            multiple: true,
            readonly: true,
            isleaf: false
          }
        }
      }
    },
    {
      title: '主管部门',
      field: 'deptCode',
      titleWidth: 0,
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            treeProps: {
              labelFormat: '{code}-{name}',
              nodeKey: 'code',
              label: 'name',
              children: 'children'
            },
            placeholder: '主管部门',
            multiple: true,
            readonly: true,
            isleaf: false
          }
        }
      }
    },
    {
      title: '统计月份',
      field: 'month',
      titleWidth: 0,
      itemRender: {
        name: '$input',
        props: {
          type: 'month',
          placeholder: '统计月份'
        }
      }
    }
  ]
}
