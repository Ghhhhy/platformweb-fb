/*
 * @Author: ChenHuanJie
 * @Date: 2021-12-15 11:51:48
 * @LastEditors: ChenHuanJie
 * @LastEditTime: 2021-12-15 11:57:16
 * @FilePath: \caizheng-front\src\config\configTableHeader\reportConfig\Reply\917200\children\917202.js
 * @Description: 预算批复-》部门预算批复-》待生成指标页签-》主表表头配置
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
  '917202': {
    tableCols: [
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '项目支出类别',
        field: 'payoutKind',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '项目代码',
        field: 'proCode',
        align: 'left',
        width: 180,
        tooltip: true,
        visible: true,
        formatter: ''
      },
      {
        title: '项目名称',
        field: 'proName',
        align: 'left',
        width: 180,
        tooltip: true,
        visible: true,
        formatter: ''
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '部门预算经济分类',
        field: 'depBgtEco',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '政府预算经济分类',
        field: 'govBgtEco',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '是否政府采购',
        field: 'isGov',
        width: 140,
        align: 'left',
        editRender: {
          disabled: true,
          name: '$select',
          props: {
            disabled: true
          },
          options: [
            {
              value: '0',
              label: '否'
            },
            {
              value: '1',
              label: '是'
            }
          ]
        }
      }, {
        title: '是否政府购买服务',
        field: 'isGovBuy',
        width: 120,
        align: 'left',
        editRender: {
          disabled: true,
          name: '$select',
          props: {
            disabled: true
          },
          options: [
            {
              value: '0',
              label: '否'
            },
            {
              value: '1',
              label: '是'
            }
          ]
        }
      },
      {
        title: '是否新增资产配置',
        field: 'isAsset',
        align: 'left',
        width: 180,
        editRender: {
          name: '$select',
          props: {
            disabled: true
          },
          options: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$treeText'
        }
      },
      {
        title: '预算金额合计',
        field: 'replyAmt',
        width: 180,
        filters: false,
        sortable: false,
        align: 'right',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        editRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
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
