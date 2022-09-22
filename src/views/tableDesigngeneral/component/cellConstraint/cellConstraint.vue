<!--
 * @Author: your name
 * @Date: 2021-10-11 10:02:01
 * @LastEditTime: 2021-10-11 10:31:43
 * @LastEditors: dell-pc-PC
 * @Description: In User Settings Edit
 * @FilePath: \caizheng-front\src\views\tableDesigngeneral\component\cellConstraint\cellConstraint.vue
-->

<template>
  <vxe-modal
    v-model="dialogVisible"
    title="配置单元格约束"
    width="98%"
    class-name="modal-content-padding0"
    height="90%"
    :position="{ top: '8%' }"
    resize
    remember
    transfer
  >
    <div class="height-all">
      <BsMainFormListLayout :left-visible.sync="leftVisible">
        <template v-slot:topTap>
          <div class="option-line-group-flex">
            <div class="fn-inline option-line-group-left">
              <div class="option-line-label">
                <label class="fn-inline">当前所配置</label>
                <label class="fn-inline">列:</label>
                <span class="fn-inline">{{ configCellInfo.colTitle }}</span>
                <label class="fn-inline">项:</label>
                <span class="fn-inline">{{ configCellInfo.itemCode }}</span>
                <label class="fn-inline">表id：</label>
                <span ref="tableIdRef" class="fn-inline">{{ 'tableId$' + configBasicInfo.guid }}</span>
                <div class="fn-inline option-line-copy">
                  <vxe-tooltip
                    placement="top"
                    content="注意：公式依赖项固定格式 '{tableId$id:colField:itemCode}' "
                    enterable
                  >
                    <i class="vxe-icon--edit-outline" @click="copyTableId"></i>
                  </vxe-tooltip>
                  <!--<vxe-button status="primary" icon="fa vxe-icon--edit-outline" circle @click="copyTableId" />-->
                </div>
              </div>
            </div>
            <div class="fn-inline option-line-group-btn" style="padding: 0">
              <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
            </div>
          </div>
        </template>
        <template v-slot:topTabPane>
          <div style="height:100px;">
            <JsEditor ref="JsEditor" v-model="curFormula" :config="{ lineWrapping: false }" @hook:mounted="onJsEditorMounted" />
          </div>
        </template>
        <template v-slot:query>
        </template>
        <template v-slot:mainTree>
          <div class="mmc-left-tree height-all">
            <div class="mmc-left-tree-title">
              <BsTreeSet
                :tree-config="{}"
                @onAsideChange="leftVisible = false"
                @onChangeInput="changeInput"
              />
            </div>
            <div class="mmc-left-tree-body">
              <ul class="list-and-option">
                <li>
                  <vxe-tooltip
                    placement="top"
                    content=""
                    enterable
                  >
                    <label class="label"></label>
                  </vxe-tooltip>
                  <div class="list-and-option-btns">
                    <span class="laob-btn">编辑</span>
                    <span class="laob-btn">删除</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </template>
        <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
        <template v-slot:mainForm>
          <BsTable
            :edit-config="false"
            :table-config="false"
            :table-columns-config="tableTbodyColumns"
            :table-data="tableTbodyData"
            :footer-config="{ showFooter: false }"
            :toolbar-config="false"
            :pager-config="false"
            @cellClick="onCellClick"
          />
        </template>
      </BsMainFormListLayout>
    </div>
  </vxe-modal>
</template>

<script>
import tools from '../../utils/tool.js'
export default {
  name: 'FormAdd',
  components: {
  },
  props: {
    model: {
      type: Object,
      default() {
        return {}
      }
    },
    configBasicInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    configCellInfo: { // 要配置的单元格信息
      type: Object,
      default() {
        return null
      }
    },
    tableTbodyColumns: {
      type: Array,
      default() {
        return []
      }
    },
    tableTbodyData: {
      type: Array,
      default() {
        return []
      }
    },
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      leftVisible: undefined,
      curFormula: '',
      loading: false,
      tableColumnsMap: {},
      tableTbodyConfig: {},
      tableDataCodeMap: {}
    }
  },
  methods: {
    onSureClick() {
      let formula = this.$refs.JsEditor.getValue().replace('undefined')
      // if (/^[A-Za-z0-9_$]{1,}:[A-Za-z0-9_$]{1,}:[0-9A-Za-z]{0,}$/.test(formula)) {
      let formulaCn = this.getFormulaCn(formula, this.configBasicInfo, 2)
      if (tools.getCharLength(formula) >= 4000 || tools.getCharLength(formulaCn) >= 4000) {
        this.$XModal.message({ duration: 30000, status: 'error', message: '单元格公式长度超出限制,请核查单元格公式配置或联系管理员！' })
      } else {
        this.$emit('onSureClick', {
          configCellInfo: this.configCellInfo,
          formulaCn: formulaCn,
          formula: formula
        })
      }
      this.$emit('update:dialogVisible', false)
      // } else {
      //   this.$XModal.message({ duration: 1000000, status: 'error', message: '取数配置验证不通过，请按样例子 "tableId$xxxx::field:itemcode" 配置' })
      // }
    },
    getFormulaCn(formula, nodeMap, type) {
      let self = this
      let regR = ''
      if (type === 1) {
        regR = new RegExp('([a-zA-Z0-9$_]{1,}:[a-zA-Z0-9_]{1,}:[a-zA-Z0-9_]{1,})', 'ig')
      } else if (type === 2) {
        regR = new RegExp('({[$a-zA-Z0-9_:]*})', 'ig')
      } else {
      }
      let rowsKey = formula.match(regR) || []
      let map = {}
      rowsKey.forEach((item, index) => {
        let formulaArr = item.replace(/\{|\}/g, '').split(':')
        map[item] = {
          formula: item,
          tableId: formulaArr[0],
          tableName: nodeMap.guid === formulaArr[0].split('$')[1] ? String(nodeMap.dicName).replace(/undefined|\s+/ig, '') : '',
          itemCode: formulaArr[2],
          itemName: self.tableDataCodeMap[formulaArr[2]] ? String(self.tableDataCodeMap[formulaArr[2]].itemName).replace(/undefined|\s+/ig, '') : '',
          colfield: formulaArr[1],
          colTitle: self.tableColumnsMap[formulaArr[1]] ? String(self.tableColumnsMap[formulaArr[1]].title).replace(/undefined|\s+/ig, '') : ''
        }
        map[item].formulaCn = map[item].tableName + ':' + map[item].colTitle + ':' + map[item].itemName
        map[item].enabled = map[item].tableName && map[item].itemName && map[item].colTitle
      })
      rowsKey.forEach((item, index) => {
        if (map[item].enabled) {
          let reg = new RegExp(item.replace(/\{|\}/g, '').replace('$', '\\$'), 'ig')
          formula = formula.replace(reg, map[item].formulaCn)
        }
      })
      return formula
    },
    onJsEditorMounted() {

    },
    onCellClick({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }) {
      // replaceSelection
      let formula = this.configBasicInfo.guid + ':' + column.property + ':' + row['itemCode'].replace('undefined')
      if (/^[A-Za-z0-9_$]{1,}:[A-Za-z0-9_]{1,}:[0-9A-Za-z]{0,}$/.test(formula)) {
        this.$refs.JsEditor.replaceSelection('{tableId$' + formula + '}')
      } else {
        this.$XModal.message({ duration: 10000, status: 'error', message: '单元格公式所选依赖数据验证不通过，请按样例子 "tableId$xxxx::field:itemcode" 配置' })
      }
    },
    copyTableId() {
      var range = null
      var div = this.$refs.tableIdRef
      if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(div)
        range.select()
      } else if (window.getSelection) {
        var selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(div)
        selection.removeAllRanges()
        selection.addRange(range)
        /* if(selection.setBaseAndExtent){
                    selection.setBaseAndExtent(text, 0, text, 1);
        } */
      } else {
        console.warn('none')
      }
      document.execCommand('Copy') // 执行浏览器复制命令
    },
    init() {
      this.curFormula = this.configCellInfo.formula || ''
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
        if (newval) {
          this.init()
        }
      },
      immediate: true
    },
    configBasicInfo: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    tableTbodyColumns: {
      handler(newval) {
        this.tableColumnsMap = tools.generateTreeDateMap(this.tableTbodyColumns, 'field')
      },
      immediate: true
    },
    tableTbodyData: {
      handler(newval) {
        this.tableDataCodeMap = tools.generateTreeDateMap(this.tableTbodyData, 'itemCode')
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
