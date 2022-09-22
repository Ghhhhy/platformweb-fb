const tableConf = {
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        checkType: 'checkbox', // hasCheckbox
        seq: true, // 序号列
        cellClickCheck: true
      },
      formatters: {
      },
      renderers: {
        // 编辑 附件 操作日志
        $gloableOptionRow: {
          renderDefault(h, cellRender, params, context) {
            let self = context.$grid.$parent
            let { row, column } = params
            // <a class="optionRow" href={row.link}>{'操作' + row[column.property]}</a>
            return [
              <a class="gloable-option-row-edit gloable-option-row fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'edit' })}>编辑</a>,
              <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
              <a class="gloable-option-row-optionlog gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'report' })}>操作日志</a>
            ]
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
        onOptionRowClick({ row, optionType }, context) {
          console.log(context.$parent.$parent.$parent)
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
      // {
      //   title: '展开树',
      //   type: 'treeNode',
      //   treeNode: true,
      //   width: 60,
      //   field: 'name'
      // },
      {
        title: '预算单位',
        field: 'agency_',
        width: 200,
        align: 'center',
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              tokenid: 'b75ee9e2f1583f15b5259979c098549f',
              appguid: 'zfys',
              parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
            },
            config: {
              multiple: false,
              readonly: false,
              treeProps: {
              // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '200', // 成功code
                statusField: 'rscode',
                method: 'postStringify', // 请求方式
                url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      {
        title: '预算单位2222',
        field: 'agency_hhhh_',
        width: 200,
        align: 'center',
        editRender: {
          name: '$vxeTree',
          props: {
            queryparams: {
              tokenid: 'b75ee9e2f1583f15b5259979c098549f',
              appguid: 'zfys',
              parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
            },
            config: {
              multiple: true,
              treeProps: {
              // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '200', // 成功code
                statusField: 'rscode',
                method: 'postStringify', // 请求方式
                url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      },
      // {
      //   title: '展开内容',
      //   type: 'expand',
      //   width: 60,
      //   className: 'expand-user-addico',
      //   contentRender: {
      //     name: '$vxeTableContentTable',
      //     props: {
      //       params: {}
      //     }
      //   }
      // },
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
              name: '$vxeInput',
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
              name: '$vxeInput',
              defaultValue: 1,
              props: {
                min: 0,
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
              { value: '1', label: '男' },
              { value: '0', label: '女' }
            ],
            filterMultiple: true,
            // filterMethod({ value, row, column }) {
            //   return row[column.property].toLowerCase().indexOf(value.toLowerCase()) >= 0
            // },
            editRender: {
              name: '$vxeSelect',
              defaultValue: '1',
              options: [
                { value: '1', label: '男' },
                { value: '0', label: '女' }
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
              name: '$vxeSelect',
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
            filters: [{ data: { vals: [], sVal: '' } }],
            filterRender: { name: 'FilterSelect' },
            align: 'center',
            editRender: {
              name: '$vxeCheckbox',
              options: [
                { value: '1', label: '绘画' },
                { value: '0', label: '棋牌' }
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
              name: '$vxeSelect',
              defaultValue: '前端',
              options: [
                { value: '前端', label: '前端' },
                { value: '后端', label: '后端' },
                { value: '运维', label: '测试' },
                { value: '实施', label: '实施' },
                { value: '测试', label: '测试' }
              ],
              props: {
                multiple: true,
                placeholder: '请输入角色'
              }
            }
          },
          {
            title: 'Personality',
            width: 150,
            field: 'personality',
            cellRender: {
              name: 'personality'
            }
          },
          {
            title: 'Whether open glory',
            field: 'glory',
            width: 200,
            editRender: {
              name: '$vxeSwitch',
              defaultValue: 1,
              options: [
                { value: '1', label: '是' },
                { value: '0', label: '否' }
              ],
              props: {
                placeholder: '是否在职'
              }
            }
          },
          {
            title: 'Induction time and departure time',
            field: 'inductionTime##departureTime',
            width: 400,
            editRender: {
              name: '$vxeIntervar',
              defaultValue: 1,
              props: {
                format: 'YYYY-MM-DD', // 时间格式化
                type: 'date', // 类型
                interval: 0, // 间隔
                readonly: true,
                placeholder: '请选择入职时间##请选择离职时间' // 提示
              }
            }
          },
          {
            title: 'Whether in office',
            field: 'status',
            width: 200,
            editRender: {
              name: '$vxeRadio',
              defaultValue: '1',
              options: [
                { value: '1', label: '是' },
                { value: '0', label: '否' }
              ],
              props: {
                placeholder: '是否在职'
              }
            }
          },
          {
            title: 'In the time',
            field: 'time',
            width: 200,
            editRender: {
              name: '$vxeTime',
              defaultValue: '',
              props: {
                format: 'YYYY-MM-DD',
                type: 'date', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
                placeholder: '入职时间'
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
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          formula: '{age}>=18?Math.pow({age},4)/2:0',
          width: 150,
          align: 'right',
          cellRender: {
            name: '$vxeCalculate',
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
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          width: 150,
          formula: '{income}>=60000?({income}-60000)*0.03:0',
          cellRender: {
            name: '$vxeCalculate',
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
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          formula: '{income}*0.1',
          cellRender: {
            name: '$vxeCalculate',
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
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          formula: '{income}-{tax}-{deduction}',
          cellFormula: {
            // 4: '{0:income}*{1:tax}*{2:deduction}*{3:profit}'
            0: '{4:income}+{3:tax}+{2:deduction}+{1:profit}',
            4: '{0:income}+{1:tax}+{2:deduction}+{3:profit}'
          },
          cellRender: {
            name: '$vxeCalculate',
            props: {
              type: 'float'
            }
          }
        },
        {
          title: 'Bonus',
          width: 150,
          align: 'right',
          field: 'bonus',
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          editRender: {
            name: '$vxeMoney',
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
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          formula: '{profit}+{bonus}',
          cellRender: {
            name: '$vxeCalculate'
          }
        }]
      },
      {
        title: 'Address',
        field: 'address',
        align: 'left',
        width: 300,
        tooltip: true,
        editRender: {
          name: '$vxeEditDownTextarea',
          defaultValue: '陕西省西安市',
          props: {
            type: 'text',
            placeholder: '请输入联系地址'
          }
        }
      },
      {
        title: 'Params',
        field: 'params',
        align: 'left',
        width: 300,
        tooltip: true,
        editRender: {
          name: '$vxeEditDownJson',
          defaultValue: {},
          props: {
          }
        }
      },
      {
        title: 'Conditions',
        field: 'conditions',
        align: 'left',
        width: 300,
        tooltip: true,
        editRender: {
          name: '$vxeEditDownConditions',
          defaultValue: '',
          props: {
            matchSourcePostMethods: 'get',
            matchTargetPostMethods: 'get',
            matchSourceUrl: 'mp-b-user-service/v1/user/app/message',
            matchTargetUrl: 'mp-b-user-service/v1/user/app/message',
            matchSourcePostRequestParams: {},
            matchTargetRequestParams: {}
          }
        }
      },
      {
        title: 'renderOptionRow',
        field: 'gloableOptionRow',
        className: 'gloableOptionRow',
        align: 'center',
        fixed: 'right',
        sortable: false,
        filters: false,
        width: 140,
        cellRender: {
          name: '$vxeTableOptionRow',
          props: {
            statusField: 'status',
            options: {
              '0': [{
                label: '编辑',
                code: 'edit',
                class: 'edit',
                btnStatus: '',
                type: 'text' // text||button
              },
              {
                label: '下发',
                code: 'issued',
                class: 'issued',
                btnStatus: '',
                type: 'text' // text||button
              },
              {
                label: '删除',
                code: 'delete',
                class: 'delete',
                btnStatus: '',
                type: 'text' // text||button
              }],
              '1': [{
                label: '详情',
                code: 'detail',
                class: 'detail',
                btnStatus: '',
                type: 'text' // text||button
              },
              {
                label: '删除',
                code: 'delete',
                class: 'delete',
                btnStatus: '',
                type: 'text' // text||button
              }]
            }
          }
        }
      },
      {
        title: 'gloableOptionRow',
        field: 'gloableOptionRow1',
        className: 'gloableOptionRow',
        align: 'center',
        fixed: 'right',
        sortable: false,
        filters: false,
        width: 140,
        cellRender: {
          name: '$gloableOptionRow'
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
        id: 1,
        name: 'jack',
        age: 24,
        sex: '1',
        days: 380,
        eduBack: '008',
        category: '前端',
        interest: [0, 1],
        bonus: 40000,
        time: '2020-2-2',
        params: {},
        income: 20000,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        conditions: '',
        status: '0',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 2,
        name: 'Tim',
        age: 26,
        sex: '1',
        interest: [0, 1],
        days: 390,
        eduBack: '008',
        time: '2020-2-2',
        params: {},
        category: '前端',
        bonus: 50000,
        income: 400000,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        conditions: '',
        status: '0',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 3,
        name: 'John Brown',
        age: 30,
        interest: [0],
        sex: '0',
        days: 480,
        income: 100000,
        bonus: 12000,
        actualIncome: 0,
        time: '2020-2-2',
        params: {},
        eduBack: '009',
        category: '前端',
        address: 'New York No. 1 Lake Park',
        conditions: '',
        status: '0',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 4,
        name: 'Jim Green',
        age: 18,
        sex: '1',
        interest: [0, 1],
        eduBack: '008',
        income: 80000,
        bonus: 10000,
        time: '2020-2-2',
        params: {},
        days: 580,
        actualIncome: 0,
        category: '前端',
        address: 'London No. 1 Lake Park',
        conditions: '',
        status: 1,
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 5,
        name: 'Joe Black',
        age: 22,
        sex: '0',
        eduBack: '008',
        category: '前端',
        interest: [0],
        bonus: 20000,
        income: 50000,
        time: '2020-2-2',
        params: {},
        days: 880,
        actualIncome: 0,
        address: 'Sydney No. 1 Lake Park',
        conditions: '',
        status: '0',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 6,
        name: 'Jon Snow',
        age: 26,
        sex: '1',
        eduBack: '007',
        income: 60000,
        bonus: 50000,
        days: 680,
        status: '1',
        actualIncome: 0,
        time: '2020-2-2',
        params: {},
        interest: [0],
        category: '前端',
        address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park',
        conditions: '',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 7,
        name: 'Rose',
        age: 35,
        sex: '1',
        eduBack: '007',
        income: 60000,
        bonus: 200000,
        days: 680,
        status: '1',
        actualIncome: 0,
        time: '2020-2-2',
        params: {},
        interest: [0],
        category: '前端',
        address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park',
        conditions: '',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
      },
      {
        id: 8,
        name: 'Tom',
        age: 50,
        sex: '1',
        status: '1',
        bonus: 1000000,
        days: 1680,
        interest: [0, 1],
        eduBack: '009',
        time: '2020-2-2',
        params: {},
        income: 70000,
        actualIncome: 0,
        category: '前端',
        address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park',
        conditions: '',
        inductionTime: '2020-01-01',
        departureTime: '2023-01-01'
        // children: [{
        //   name: 'Tom-children',
        //   age: 50,
        //   sex: '1',
        //   status: '1',
        //   bonus: 100000,
        //   days: 1680,
        //   interest: [0, 1],
        //   eduBack: '009',
        //   time: '2020-2-2',
        //   params: {},
        //   income: 70000,
        //   actualIncome: 0,
        //   category: '前端',
        //   address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park',
        //   conditions: '',
        //   children: [{
        //     name: 'Tom-children-children',
        //     age: 50,
        //     sex: '1',
        //     status: '1',
        //     bonus: 100000,
        //     days: 1680,
        //     interest: [0, 1],
        //     eduBack: '009',
        //     time: '2020-2-2',
        //     params: {},
        //     income: 70000,
        //     actualIncome: 0,
        //     category: '前端',
        //     address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park',
        //     conditions: ''
        //   }]
        // }]
      }],
    toolbarConfig: { // table工具栏配置
      reverseCheck: true,
      batchModify: true,
      moneyConversion: true, // 是否有金额转换,
      import: true,
      slots: {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
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
