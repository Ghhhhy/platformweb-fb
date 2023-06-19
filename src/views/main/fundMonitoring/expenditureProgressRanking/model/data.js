import { eachTree } from 'xe-utils'

/**
 * 获取表格列配置
 */
export const getColumns = () => {
  const columns = [
    {
      field: 'mofDivName',
      title: '地区名称',
      align: 'left',
      width: '60%',
      filters: false,
      formatter({ row }) {
        return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      }
    },
    {
      field: 'amountPro',
      title: '下达进度',
      align: 'center',
      width: '20%',
      filters: false,
      cellRender: {
        name: '$vxeRatio'
      }
    },
    {
      field: 'amountPayPro',
      title: '支出进度',
      align: 'center',
      width: '20%',
      filters: false,
      cellRender: {
        name: '$vxeRatio'
      }
    }
  ]

  eachTree(columns, item => {
    item.sortable = false
  })
  return columns
}
