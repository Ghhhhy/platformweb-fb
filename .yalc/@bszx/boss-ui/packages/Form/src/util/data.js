// data   Author:Titans@2396757591@qq.com
/* eslint-disable no-useless-escape */
import { defaultformGloabalConfig } from '../config/formDefaultConfig'
export default function () {
  return {
    moneyUnit: 1,
    isRoundIn: false,
    formInitGloabalDataCp: Object.freeze({
      ...defaultformGloabalConfig
    }),
    formGloabalConfigIn: { // 当前全局配置
      ...defaultformGloabalConfig
    },
    formItemsConfigIn: [], // 项配置
    formDataListIn: {}, // 数据
    formValidationConfigIn: {}, // 校验配置
    ifRenderForm: true, // 是否渲染form
    constrainDataMap: { // 约束最终渲染数据
      // testTempalte: { // 作用字段
      //   visible: true, // 是否可见
      //   editable: true, // 是否可编辑
      //   clear: true, // 是否置空
      //   getData: {}, // 取数
      //   style: { // 样式
      //   },
      //   value: 'value' // 设置值
      // }
    },
    itemsAllMap: { // 表单项映射数据
      fieldMap: {},
      titleFieldMap: {},
      formulaConfig: {},
      titleMap: {},
      constraintConfig: {}
    },
    calculateConstraintConfigIn: { // 约束配置
      enabled: true, // 是否开启此项功能
      enabledType: { // 执行开关
        initPerformConstraint: false, // 是否初始化先执行一次约束
        performFormula: true, // 项公式
        performConstraint: false // 项约束
      },
      itemFormulaConfig: { // 项公式配置，采用值来源形式定义，可以交叉定义，例如B的值来源于A，C的值来源于B
        // 单条数据计算
        // rowFormulaMap= { "colfield":"{colfield}[运算符]" }
        // profit: '{income}-{tax}-{deduction}',
        // income: '{age}*2'
      },
      constraintConfig: { // 表单约束配置,采用扫雷形式导火索形式定义，不可以交叉定义，例如配置了A导致B发生改变，又配置了 B会导致C发生改变，只允许合二为一直接配置 A 导致 B和C 同时发生改变,这是一个 原则 问题。
        // 'age': 'income::value::{age}>=18?Math.pow({age},4)/2:0--&&--income::disabled::{age}>=18--&&--income::editable::{age}>=18--&&--income::style::{age}>18&&{age}<=60--??--color=#F00&fontSize=20px--+--{age}>60--??--color=#ff0&fontSize=20px'
        // 'age': 'income::value::IF(GE({age},18),DIV(POW({age},4),2),0)--&&--income::editable::GT({age},18)--&&--income::style::IFS(IF(AND(GT({age},18),LE({age},60)),STRTOOBJ(@(color=#F00&fontSize=12px))),IF(LE({age},60),STRTOOBJ(@(color=#ff0&fontSize=20px))))'
      }
    },
    formConfigCp: { // 废弃
      formRenderConfig: {},
      renderers: {},
      axiosDatas: {}
    },
    curSelectMoneyUnitOption: { // 当前金额单位
      value: 1,
      label: '元', // 元
      inputDigits: 2, // 录入最大允许位数
      viewDigits: 2 // 显示位数
    },
    formDataBeforeChange: {}
  }
}
