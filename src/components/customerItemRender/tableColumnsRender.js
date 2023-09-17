/* eslint-disable */
// const h = new Vue().$createElement
import store from "@/store/index"
export const customerTableCellRender = {
  $warningLevelRender: {
    //表单 预警级别 带颜色
    renderDefault(h, cellRender, params, context) {
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" style={ store.getters.dict.find(item=>item.value==row[column.property]).colorStyle}>{store.getters.dict.find(item=>item.value==Number(row[column.property])).warningLabel}</a>
        </el-tooltip>
      ]
    }
  }
}
