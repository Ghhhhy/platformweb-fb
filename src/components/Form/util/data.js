// data   Author:Titans@2396757591@qq.com
/* eslint-disable no-useless-escape */
import { defaultformGloabalConfig } from '../config/formDefaultConfig'
import { formItemsConfig, formConfig, formValidationConfig, formDataList } from '../config/config'
export default function () {
  return {
    moneyUnit: 1,
    formInitGloabalDataCp: {
      ...defaultformGloabalConfig
    },
    formGloabalConfigIn: {
      ...defaultformGloabalConfig
    },
    formItemsConfigIn: [] || formItemsConfig,
    formDataListIn: [] || formDataList,
    formValidationConfigIn: {} || formValidationConfig,
    ifRenderForm: true,
    constrainDataMap: { // 约束最终渲染数据
      testTempalte: { // 作用字段
        visible: true, // 是否可见
        editable: true, // 是否可编辑
        clear: true, // 是否置空
        getData: {}, // 取数
        style: { // 样式
        },
        value: 'value' // 设置值
      }
    },
    itemsAllMap: { // 表单项映射数据
      fieldMap: {},
      titleFieldMap: {},
      formulaConfig: {},
      titleMap: {}
    },
    calculateConstraintConfigIn: { // 约束配置
      itemFormulaConfig: { // 项公式配置
        // 单条数据计算
        // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
        // profit: '{income}-{tax}-{deduction}',
        // income: '{age}*2'
      },
      constraintConfig: { // 表单约束配置
        // cell: {
        //    'age:1001': 'income:1001::value::{age:1001}>=18?Math.pow({age:1001},4)/2:0--&&--name::style::{age:1001}>18&&{age:1001}<=60??color=#F00&fontSize=20px--+--{age:1001}>60??color=#ff0&fontSize=20px',
        // },
        // 'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--income::disabled::{age}>=18--&&--income::editable::{age}>=18--&&--income::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
      }
    },
    formConfigCp: {
      formRenderConfig: {},
      renderers: {},
      axiosDatas: {}
    } || formConfig
  }
}
