/*
 * @Author: 轻语
 * @Date: 2021-11-01 10:05:56
 * @LastEditors: 传让
 * @LastEditTime: 2022-05-18 11:41:55
 * @Description:
 */
import { tableFormConfig } from '../config/tableDefaultConfig'

export default function () {
  return {
    importFileList: [], // 导入的文件列表
    rowClass: this.tableRowClass ? this.tableRowClass : (this.useBsuiTableRowClass ? this.rowClassName : this.tableRowClass),
    ifRenderTable: true,
    tableDataIn: [],
    tableColumnsConfigIn: [],
    exportModalData: {},
    importData: [], // 导入数据
    importModalVisible: false, // 导入弹框
    fileConfig: {
      fileName: '',
      maxSize: 1024 * 1024 * 10
    }, // 导入文件配置
    exportModalVisible: false, // 导出弹框
    highConfigIn: {
      scrollY: {
        enabled: true,
        gt: 0 // 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭（注：启用纵向虚拟滚动之后将不能支持动态行高）
      },
      scrollX: {
        gt: -1
      }
    },
    editRulesIn: { // 校验规则
    },
    curSelectMoneyUnitOption: { // 当前选择金额单位配置
      value: 1,
      label: '元', // 元
      inputDigits: 2, // 录入最大允许位数
      viewDigits: 2 // 显示位数
    },

    rowVisibleConfigIn: {
      visibleMethod(obj) {
        return true
      }
    },
    validConfig: { // 校验配置
      autoPos: true,
      message: 'tooltip',
      maxWidth: '300'
    },
    treeConfigIn: {},
    tableFormConfigIn: { ...tableFormConfig } // 表格form配置
  }
}
