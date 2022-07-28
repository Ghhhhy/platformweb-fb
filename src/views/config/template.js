const tableConf = {
  itemsConfig: [
    {
      title: '展开',
      type: 'expand',
      width: 60,
      className: 'expand-user-addico',
      contentRender: {
        name: '$contentTable',
        props: {
          params: {}
        }
      }
    },
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
            name: '$vxeSelect',
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
        }]
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
          title: 'In the time',
          field: 'time',
          width: 200,
          editRender: {
            name: '$vxeTime',
            defaultValue: '',
            format: 'YYYY-MM-DD',
            props: {
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
        }]
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
          name: '$calculateRender',
          defaultValue: 0,
          props: {}
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
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        formula: '{income}*0.1',
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
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
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
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
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
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        formula: '{profit}+{bonus}',
        cellRender: {
          name: '$calculateRender'
        }
      }]
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
    },
    {
      title: 'Conditions',
      field: 'conditions',
      align: 'left',
      filters: [{ data: '' }],
      filterRender: { name: 'FilterInput' },
      width: 300,
      tooltip: true,
      editRender: {
        name: '$EditDownConditions',
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
      title: 'gloableOptionRow',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 140,
      cellRender: {
        name: '$gloableOptionRow'
      }
    }],
  globalConfig: {
    tableName: '测试模版'
  },
  formConfig: []
}
export default tableConf
