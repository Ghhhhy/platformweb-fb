import { eachTree } from 'xe-utils'

/**
 * 获取表格列配置
 */
export const getColumns = () => {
  const columns = [
    {
      title: '区划',
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '',
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
    },
    {
      title: '版本',
      field: 'version',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '月份',
      field: 'logMonth',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '起始时间',
      field: 'startTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '截止时间',
      field: 'endTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '生成时间',
      field: 'createdTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '确认状态',
      field: 'confirmStatus',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          { value: '0', label: '未确认' },
          { value: '1', label: '已确认' }
        ],
        props: {
          placeholder: '确认状态'
        }
      }
    }
  ]

  eachTree(columns, item => {
    item.sortable = false
  })
  return columns
}
