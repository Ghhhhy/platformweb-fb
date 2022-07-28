/*
 * @Author: ChenHuanJie
 * @Date: 2021-12-15 11:50:47
 * @LastEditors: ChenHuanJie
 * @LastEditTime: 2021-12-15 11:56:44
 * @FilePath: \caizheng-front\src\config\configTableHeader\reportConfig\Reply\917200\children\917201.js
 * @Description: 预算批复-》部门预算批复-》部门预算总览页签-》主表表头配置
 * @Signature: ↓↓↓↓↓↓
 * ************咏代码*****************
 * ** 日出东隅照我床，悠悠青龙倚斜阳。**
 * ** 陋室区区徒四壁，代码行行正铿锵。**
 * ****************************************
 * ** 世人皆说程序员好，人高端，工资高。    **
 * ** 狗屁，常加班，起不早，挣得不够去烧烤。**  (中指大法好)
 * ** Bug、Code知多少，只是屏幕显人老。    **
 * ****************************************
 * ** 年少太轻狂，误入IT行。  **
 * ** 白发森森立，两眼直茫茫。**
 * ***************************
 */
export default {
  '917201': {
    tableCols: [
      {
        title: '状态',
        field: 'status',
        align: 'left',
        sortable: false,
        filters: false,
        editRender: {
          name: '$select',
          props: {
            disabled: true
          },
          options: [
            { value: 1, label: '已批复' },
            { value: 0, label: '未批复' }
          ]
        }
      },
      {
        title: '主管部门',
        field: 'deptName',
        align: 'left',
        sortable: false,
        filters: false
      },
      {
        field: 'supportAmount',
        title: '财政拨款资金',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        },
        align: 'right'
      },
      {
        field: 'specialAccountFunds',
        title: '财政专户资金',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        },
        align: 'right'
      },
      {
        field: 'agencyBudgetFunds',
        title: '单位预算资金',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        },
        align: 'right'
      },
      {
        title: '操作',
        field: 'gloableOptionRow',
        className: 'gloableOptionRow',
        align: 'center',
        fixed: 'right',
        width: 240,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$gloableOptionRow'
        }
      }
    ], // 只读表格列
    editTableCols: [], // 可编辑表格列
    formItems: [], // 表单列
    validateRules: {}, // 校验规则
    extendAttrs: {}, // 高级属性
    formData: {} // 默认值
  }
}
