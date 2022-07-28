/*
 * @Author: ChenHuanJie
 * @Date: 2021-12-15 11:51:49
 * @LastEditors: ChenHuanJie
 * @LastEditTime: 2021-12-15 11:58:29
 * @FilePath: \caizheng-front\src\config\configTableHeader\reportConfig\Reply\917200\children\917211.js
 * @Description: 预算批复-》部门预算批复-》指标挂接弹窗-》上表表头配置
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
  '917211': {
    tableCols: [
      {
        title: '预算单位',
        field: 'agency_name',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false
      },

      {
        title: '政府支出经济分类',
        field: 'gov_bgt_eco_name',
        align: 'left',
        width: 180
      },
      {
        title: '部门支出经济分类',
        field: 'dep_bgt_eco_name',
        align: 'left',
        width: 180
      },
      {
        title: '功能科目',
        field: 'exp_func_name',
        align: 'left',
        width: 180
      },
      {
        title: '资金性质',
        field: 'fund_type_name',
        align: 'left',
        width: 180
      },
      {
        title: '指标文号',
        field: 'cor_bgt_doc_no',
        align: 'left',
        width: 180
      },
      {
        title: '指标来源类型',
        field: 'bgt_source_name',
        align: 'left',
        width: 180
      },
      {
        title: '资金来源',
        field: 'found_type_name',
        align: 'left',
        width: 180
      },
      {
        title: '指标来源',
        field: 'source_type_name',
        align: 'left',
        width: 180
      },
      {
        title: '是否政府采购预算',
        field: 'is_gov_pur_name',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false
      },

      {
        title: '项目名称',
        field: 'pro_name',
        align: 'left',
        width: 180,
        tooltip: true,
        visible: true,
        formatter: ''
      },

      {
        title: '指标金额',
        field: 'amount',
        width: 180,
        align: 'right',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: { type: 'float', min: 0 }
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
