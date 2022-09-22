// import {
//   post
// } from '../http'
export default {
  getTableData(data) {
    return new Promise((resolve) => {
      resolve({
        'code': 200,
        'message': 'success',
        'data': {
          'recordCount': 10, //
          'totalCount': 100, // 数据总条数
          'pageNo': 1, // 当前页面
          'pageSize': 10, // 分页尺寸
          'totalPage': 10, // 数据总页数
          'list': [
            {
              name: 'John Brown',
              age: 18,
              sex: 0,
              category: '前端',
              address: 'New York No. 1 Lake Park',
              status: 0
            },
            {
              name: 'Jim Green',
              age: 24,
              sex: 1,
              category: '运维',
              address: 'London No. 1 Lake Park',
              status: 1
            },
            {
              name: 'Joe Black',
              age: 30,
              sex: 0,
              category: '后端',
              address: 'Sydney No. 1 Lake Park',
              status: 0
            },
            {
              name: 'Jon Snow',
              age: 26,
              sex: 1,
              status: 1,
              category: '实施',
              address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
            },
            {
              name: 'Tom',
              age: 50,
              sex: 1,
              status: 1,
              category: '测试',
              address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
            }] // 分页数据集
        }
      })
    },
    error => {
      console.log(error)
    })
  },
  getTableConlums(data) {
    return new Promise((resolve) => {
      resolve({
        'code': 200,
        'message': 'success',
        'data': {
          'recordCount': 10, //
          'totalCount': 100, // 数据总条数
          'pageNo': 1, // 当前页面
          'pageSize': 10, // 分页尺寸
          'totalPage': 10, // 数据总页数
          'list': [
            {
              title: 'basicinfor',
              align: 'center',
              children: [
                {
                  title: 'Name',
                  field: 'name',
                  align: 'center'
                },
                {
                  title: 'Age',
                  field: 'age',
                  sortable: true,
                  align: 'center'
                }]
            },
            {
              title: 'Sex',
              field: 'sex',
              align: 'center',
              cellrender: {}
            },
            {
              title: 'Personality',
              field: 'personality',
              align: 'center'
            },
            {
              title: 'Category',
              field: 'category',
              align: 'center'
            },
            {
              title: 'Address',
              field: 'address',
              align: 'center',
              tooltip: true,
              visible: true,
              width: '10%',
              formatter: ''
            },
            {
              title: 'Status',
              field: 'status',
              align: 'center'
            }] // 分页数据集
        }
      })
    },
    error => {
      console.log(error)
    })
  },
  getTableConfig(data) {
    return new Promise((resolve) => {
      resolve({
        'code': 200,
        'message': 'success',
        'data': {
          'data': {
            globalConfig: {
              // 全局配置
              checkType: 'checkbox',
              seq: true,
              hasOptionRow: true
            },
            slots: {
              // 全局所用slot名字配置
              optionRow: {
                default ({ row, $table, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex }, h) {
                  let self = $table.$parent.$parent
                  return [
                    h('span', {
                      style: {
                        color: 'blue'
                      },
                      on: {
                        click() {
                          self.onOptionRowClick({ row, type: 'edit' })
                        }
                      }
                    }, '删除')
                  ]
                }
              }
            },
            formatters: {
              // formatter名字配置
              status: function ({ cellValue }) {
                return cellValue === 1 ? '已发布' : '未发布'
              },
              // sex: function({ cellValue, row, column }) {
              //   return cellValue === 1 ? '男' : '女'
              // },
              personality: function ({ cellValue, row, column }) {
                let sex = [ '女', '男' ]
                let age = ['优秀青年', '杰出中年', '颐养天年']
                return age[Math.floor(row.age / 25)] + sex[row.sex]
              }
            },
            cellRenderConfig: {
              // cellRender渲染器名字配置
              optionRow: {
                name: 'optionRow'
              },
              sex: {
                name: 'sexRow'
              }
            },
            renderers: {
              // cellRender渲染器
              sexRow: {
                renderDefault(h, cellRender, { row, column }, context) {
                  return (<span class="text">{ row[column.property === 1 ? '男男' : '女女'] }</span>)
                },
                renderCell(h, cellRender, { row, column }, context) {
                  return [ <span class="text">{ row[column.property] }</span> ]
                }
              },
              optionRow: {
                renderDefault(h, cellRender, params, context) {
                  let self = context.$grid.$parent
                  let { row, column } = params
                  // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
                  if (row.status === 0) {
                    return [
                      <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' }) }>删除</a>,
                      <a class="optionRow-edit fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' }) }>编辑</a>,
                      <a class="optionRow-report fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' }) }>上报</a>,
                      <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' }) }>详情</a>
                    ]
                  } else {
                    return [
                      <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' }) }>删除</a>,
                      <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' }) }>详情</a>
                    ]
                  }
                },
                // 可编辑激活模板
                renderEdit (h, editRender, { row, column }) {
                  return [
                    <input class="my-cell" text="text" v-modal={ row[column.property] }/>
                  ]
                },
                // 可编辑显示模板
                renderCell (h, editRender, { row, column }) {
                  return [
                    <span>{ row[column.property] }</span>
                  ]
                }
              }
            },
            methods: {
              // 用户自定义配置对应事件
              toolbarButtonClickEvent({ code, $event }) {
                switch (code) {
                  case '':
                    break
                  default:
                }
              },
              onOptionRowClick({ row, optionType }) {
                console.log(this)
                switch (optionType) {
                  case 'delete':
                    console.log('delete', row)
                    break
                  case 'edit':
                    console.log('edit', row)
                    break
                  case 'report':
                    console.log('report', row)
                    break
                  case 'detail':
                    console.log('detail', row)
                    break
                  default:
                }
              }
            },
            axiosDatas: { // 全局请求数据方法，必须为一个异步
              saveData({ data }) {
                console.log('saveData', data)
              },
              loadData({ query, currentPage, pageSize }) {
                console.log('loadData')
              },
              deleteData({ data }) {
                console.log('deleteData', data)
                return new Promise((resolve) => {
                  resolve('success')
                }, error => {
                  console.log(error)
                })
              },
              insertData(data) {
                console.log('insertData', data)
              }
            }
          } // 分页数据集
        }
      })
    },
    error => {
      console.log(error)
    })
  }
}
