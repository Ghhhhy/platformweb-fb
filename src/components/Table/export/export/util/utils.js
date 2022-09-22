/**
 * 导出格式化column（fixed：导出对单位无效）
 * @param columns
 */
export const formatterExpandColumns = (columns) => {
  columns.forEach(column => {
    if (column.type === 'money' || column.cellRender?.name === '$vxeMoney') {
      // 设置column字段为formatter后的字段
      column.field = `${column.field}__viewSort`
    }
    if (column.cellRender?.name === '$vxeRatio') {
      // 设置column字段为formatter后的字段
      column.field = `${column.field}__viewRatio`
    }
    if (column.children?.length) {
      formatterExpandColumns(column.children)
    }
  })
}
