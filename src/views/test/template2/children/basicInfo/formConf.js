const tableConf = {
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        // hasOptionRow: true // 操作列
        optionSort: true
      },
      formatters: {
      },
      cellRenderConfig: {
        // cellRender渲染器名字配置
        // autofocus 自动聚焦的类名
        // renderHeader(h, renderOpts, params) 表头
        // renderEdit(h, renderOpts, params) 表内容 - 编辑
        // renderCell(h, renderOpts, params) 表内容 - 显示
        // renderFooter(h, renderOpts, params) 表尾
        // editCellExportMethod(params) 单元格导出函数
        // footerCellExportMethod(params) 表尾单元格导出函数
        personality: {
          type: 'cellRender', // renderEdit
          name: 'personality'
        },
        optionRow: {
          type: 'cellRender', // renderEdit
          name: 'optionRow'
        }
      },
      renderers: {
        optionRow: {
          renderDefault(h, cellRender, params, context) {
            let self = context.$grid.$parent
            let { row, column } = params
            // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
            if (row.status === 0) {
              return [
                <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>,
                <a class="optionRow-edit fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>,
                <a class="optionRow-report fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>上报</a>,
                <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
              ]
            } else {
              return [
                <a class="optionRow-delete fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'delete' })}>删除</a>,
                <a class="optionRow-detail fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'detail' })}>详情</a>
              ]
            }
          }
        },
        personality: {
          renderDefault(h, cellRender, { row, column }, context) {
            let sex = ['女', '男']
            let age = ['优秀青年', '优秀青年', '优秀青年', '杰出中年', '杰出中年', '杰出中年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年', '颐养天年']
            let result = age[Math.floor(row.age / 10)] + sex[row.sex]
            return [<span class="text">{result}</span>]
          }
        }
      },
      methods: {
        // 用户自定义配置对应事件
        toolbarButtonClickEvent(obj, context, e) {
          switch (obj.code) {
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
      }
    },
    tableColumnsConfig: [
      {
        title: 'basicinfor',
        children: [
          {
            title: 'Name',
            field: 'name',
            width: 150,
            align: 'center',
            filters: false,
            filterRender: { name: 'FilterInput' },
            editRender: {
              name: '$href',
              defaultValue: '默认的名字',
              props: {
                type: 'string',
                redonly: true,
                placeholder: '抢输入姓名'
              }
            }
          },
          {
            title: 'Age',
            field: 'age',
            sortable: true,
            width: 120,
            align: 'center',
            combinedType: ['average'],
            editRender: {
              name: '$input',
              defaultValue: 1,
              props: {
                type: 'number',
                placeholder: '抢输入年龄',
                redonly: true
              }
            }
          },
          {
            title: 'Sex',
            field: 'sex',
            width: 120,
            align: 'center',
            filters: [
              { value: 1, label: '男' },
              { value: 0, label: '女' }
            ],
            filterMultiple: true,
            // filterMethod({ value, row, column }) {
            //   return row[column.property].toLowerCase().indexOf(value.toLowerCase()) >= 0
            // },
            editRender: {
              name: '$select',
              options: [
                { value: 1, label: '男' },
                { value: 0, label: '女' }
              ],
              props: {
                placeholder: '请选择性别'
              }
            }
          },
          {
            field: 'eduBack',
            title: 'education background',
            span: 8,
            width: 250,
            editRender: {
              name: '$select',
              defaultValue: '005',
              options: ((str) => {
                return str.split('+').map((item, index) => {
                  return { value: item.split('#')[0], label: item.split('#')[1] }
                })
              })('009#博士后+001#小学+002#初中+003#高中+004#中专+005#大专+006#本科+007#硕士+008#博士'),
              props: {
                placeholder: '请选择学历'
              }
            }
          },
          {
            title: 'Interest',
            field: 'interest',
            width: 250,
            align: 'center',
            editRender: {
              name: '$vxeCheckbox',
              options: [
                { value: 1, label: '绘画' },
                { value: 0, label: '棋牌' }
              ],
              props: {
                placeholder: '请选择兴趣'
              }
            }
          }
        ]
      },
      {
        title: 'Position the glory',
        children: [
          {
            title: 'Category',
            field: 'category',
            width: 150,
            editRender: {
              name: '$select',
              defaultValue: '前端',
              options: [
                { value: '前端', label: '前端' },
                { value: '后端', label: '后端' },
                { value: '运维', label: '测试' },
                { value: '实施', label: '实施' },
                { value: '测试', label: '测试' }
              ],
              props: {
                placeholder: '请输入角色'
              }
            }
          },
          {
            title: 'Personality',
            width: 150,
            field: 'personality'
          },
          {
            title: 'Whether in office',
            field: 'status',
            width: 200,
            editRender: {
              name: '$vxeRadio',
              defaultValue: 1,
              options: [
                { value: 1, label: '是' },
                { value: 0, label: '否' }
              ],
              props: {
                placeholder: '是否在职'
              }
            }
          },
          {
            title: 'Working days',
            field: 'days',
            width: 200,
            editRender: {
              name: '$vxeDays',
              defaultValue: 0,
              props: {
                placeholder: '在职天数',
                type: 'number'
              }
            }
          }
        ]
      },
      {
        title: 'calculation',
        children: [{
          title: 'income',
          field: 'income',
          fieldType: 'money',
          combinedType: ['average', 'total'],
          formula: '{age}>=18?Math.pow({age},4)/2:0',
          width: 150,
          align: 'right',
          cellRender: {
            name: '$calculateRender',
            defaultValue: 0,
            props: {
            }
          }
        },
        {
          title: 'Tax',
          field: 'tax',
          fieldType: 'money',
          align: 'right',
          combinedType: ['average', 'total'],
          width: 150,
          formula: '{income}>=60000?({income}-60000)*0.03:0',
          cellRender: {
            name: '$calculateRender',
            props: {
              type: 'float',
              placeholder: '应该交税额度'
            }
          }
        },
        {
          title: 'Deduction',
          field: 'deduction',
          width: 150,
          align: 'right',
          combinedType: ['average', 'total'],
          formula: '{income}*0.07',
          cellRender: {
            name: '$calculateRender',
            props: {
              type: 'float',
              placeholder: '其他扣除'
            }
          }
        },
        {
          title: 'Profit',
          field: 'profit',
          width: 150,
          align: 'right',
          combinedType: ['average', 'total'],
          formula: '{income}-{tax}-{deduction}',
          cellFormula: {
            // 4: '{0:income}*{1:tax}*{2:deduction}*{3:profit}'
            0: '{4:income}+{3:tax}+{2:deduction}+{1:profit}',
            4: '{0:income}+{1:tax}+{2:deduction}+{3:profit}'
          },
          cellRender: {
            name: '$calculateRender'
          }
        },
        {
          title: 'Bonus',
          width: 150,
          align: 'right',
          field: 'bonus',
          filters: [{ data: { type: 'has', isCase: false, value: '' } }],
          filterRender: { name: 'FilterComplex' },
          combinedType: ['average', 'total'],
          editRender: {
            name: '$moneyRender',
            props: {
              type: 'float'
            }
          }
        },
        {
          title: 'Actual income',
          width: 180,
          align: 'right',
          field: 'actualIncome',
          combinedType: ['average', 'total'],
          formula: '{profit}+{bonus}',
          cellRender: {
            name: '$calculateRender'
          }
        } ]
      },
      {
        title: 'Address',
        field: 'address',
        align: 'left',
        filters: [{ data: { vals: [], sVal: '' } }],
        filterRender: { name: 'FilterContent' },
        width: 300,
        tooltip: true,
        editRender: {
          name: '$EditDownTextarea',
          defaultValue: '陕西省西安市',
          props: {
            type: 'text',
            placeholder: '请输入联系地址'
          }
        }
      }
    ],
    editRules: {
      name: [
        {
          required: true,
          type: 'string',
          message: '名称长度需在 3 到 20 个字符',
          min: 2,
          max: 20,
          pattern: /^[a-zA-Z0-9_\s\u4e00-\u9fa5]+$/i,
          trigger: 'change'
        }
      ],
      nickname: [
        {
          required: true,
          type: 'string',
          message: '请输入昵称',
          trigger: 'change',
          // eslint-disable-next-line no-useless-escape
          pattern: /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i
          // validator({ c, rule, rules, row, rowIndex, column, columnIndex, $table }) {
          //   return new Promise((resolve, reject) => {
          //     let result = false
          //     if (cellValue.length>=2) {
          //       result = /^[a-zA-Z0-9_\(\)\{\}·.、\[\]\（\）\【\】\u4e00-\u9fa5]+$/i.test(itemValue)
          //     } else {
          //       result = true
          //     }
          //     if (result) {
          //       resolve(true)
          //     } else {
          //       reject(new Error(
          //         '校验失败'
          //       ))
          //     }
          //   })
          // }
        }],
      sex: [
        {
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
      age: [
        {
          required: true,
          message: '请输入年龄',
          min: 1,
          max: 150,
          type: 'number',
          trigger: 'change'
        }],
      eduBack: [
        {
          required: true,
          message: '请选择education background',
          trigger: 'change'
        }],
      category: [
        {
          required: true,
          message: '请选择角色',
          trigger: 'change'
        }
      ],
      bonus: [
        {
          required: true,
          message: '请输入奖金',
          trigger: 'change',
          min: 1000,
          max: 1000000,
          type: 'number'
        }],

      // personality: [
      //   {
      //     required: true,
      //     message: '请选择角色',
      //     trigger: 'change'
      //   }],
      address: [
        {
          required: true,
          message: '请填写通信地址,地址精确到小区门牌号',
          trigger: 'change'
        }],
      status: [
        {
          required: true,
          message: '请选择是否在职',
          trigger: 'change'
        }],
      interest: [
        {
          required: true,
          message: '请选择兴趣爱好',
          trigger: 'change',
          validator({ cellValue, rule, rules, row, rowIndex, column, columnIndex, $table }) {
            return new Promise((resolve, reject) => {
              let result = false
              if (Array.isArray(cellValue) && cellValue.length) {
                result = true
              }
              if (result) {
                resolve(true)
              } else {
                reject(new Error(
                  '至少选一个'
                ))
              }
            })
          }
        }],
      days: [
        {
          required: true,
          message: '请输入在职天数',
          trigger: 'change',
          min: 100,
          max: 1000000,
          type: 'number'
        }]
    },
    tableData: [
      {
        name: 'jack',
        age: 25,
        sex: 1,
        days: 380,
        eduBack: '008',
        category: '前端',
        interest: [0, 1],
        bonus: 40000,
        income: 300000,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        status: 0
      },
      {
        name: 'Tim',
        age: 26,
        sex: 1,
        interest: [0, 1],
        days: 390,
        eduBack: '008',
        category: '前端',
        bonus: 50000,
        income: 400000,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        status: 0
      },
      {
        name: 'John Brown',
        age: 18,
        interest: [0],
        sex: 0,
        days: 480,
        income: 100000,
        bonus: 10000,
        actualIncome: 0,
        eduBack: '009',
        category: '前端',
        address: 'New York No. 1 Lake Park',
        status: 0
      },
      {
        name: 'Jim Green',
        age: 24,
        sex: 1,
        interest: [0, 1],
        eduBack: '008',
        income: 80000,
        bonus: 18000,
        days: 580,
        actualIncome: 0,
        category: '前端',
        address: 'London No. 1 Lake Park',
        status: 1
      },
      {
        name: 'Joe Black',
        age: 30,
        sex: 0,
        eduBack: '008',
        category: '前端',
        interest: [0],
        bonus: 20000,
        income: 50000,
        days: 880,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        status: 0
      },
      {
        name: 'Jon Snow',
        age: 26,
        sex: 1,
        eduBack: '007',
        income: 60000,
        bonus: 30000,
        days: 680,
        status: 1,
        actualIncome: 0,
        interest: [0],
        category: '前端',
        address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
      },
      {
        name: 'Tom',
        age: 50,
        sex: 1,
        status: 1,
        bonus: 100000,
        days: 1680,
        interest: [0, 1],
        eduBack: '009',
        income: 70000,
        actualIncome: 0,
        category: '前端',
        address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
      }],
    toolbarConfig: { // table工具栏配置
      moneyConversion: true, // 是否有金额转换
      search: true, // 是否有search
      buttons: [
        {
          code: 'toolbar-saveData',
          name: '保存',
          callback: (obj, context, e) => {
            context.$parent.saveData(obj, context, e)
          }
        },
        {
          code: 'toolbar-insert',
          name: '新增一行',
          callback: (obj, context, e) => {
            context.$parent.onTableAddRowClick(obj, context, e)
          }
        },
        {
          code: 'toolbar-insert',
          name: '新增弹框',
          callback: (obj, context, e) => {
            context.$parent.onTableAddModelClick(obj, context, e)
          }
        },
        {
          code: 'toolbar-xh',
          name: '细化',
          status: 'primary',
          callback: (obj, context, e) => {
            context.$parent.onyXhysClick(obj, context, e)
          }
        }, {
          name: '更多操作',
          disabled: false,
          dropdowns: [
            {
              code: 'toolbar-insert',
              name: '编辑弹框',
              callback: (obj, context, e) => {
                context.$parent.onTableEditModelClick(obj, context, e)
              }
            }]
        }]
    }
  },
  basicInfo2: {
    type: 'table'
  }
}

export default function (tableType, configType) {
  if (tableType && configType) {
    return tableConf[tableType][configType]
  } else if (tableType) {
    return tableConf[tableType]
  } else {
    return null
  }
}
