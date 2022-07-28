
<template>
  <vxe-modal
    v-model="dialogVisible"
    title="配置取数"
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
              </div>
            </div>
            <div class="fn-inline option-line-group-btn" style="padding: 4px 10px 0 10px;">
              <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
            </div>
          </div>
        </template>
        <template v-slot:topTabPane>
          <div style="height:40px;">
            <JsEditor ref="JsEditor" v-model="curFormula" :config="{ lineWrapping: false }" @hook:mounted="onJsEditorMounted" />
          </div>
        </template>
        <template v-slot:query>

        </template>
        <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
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
              <BsTree
                ref="bsTree"
                :filter-text="letftTreeFilterText"
                :config="leftTreeConfig"
                :tree-data="dicTreeData"
                :queryparams="treeQueryparams"
                :default-expanded-keys="defaultExpandedKeys"
                :current-node-key="currentNodeKey"
                @onNodeClick="onNodeClick"
              />
            </div>
          </div>
        </template>
        <template v-slot:mainForm>
          <BsTable
            :edit-config="false"
            :table-config="tableTbodyConfig"
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
import utils from '../../utils/utils.js'
import tools from '../../utils/tool.js'

export default {
  name: 'FormAdd',
  components: {
  },
  props: {
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
    dicTreeData: {
      type: String,
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
      leftVisible: true,
      curFormula: '',
      letftTreeFilterText: '',
      leftTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}',
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: ''
          // url: 'bisConfig/config/basDicInfo/getDicInfoTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeQueryparams: {
        isFolder: '0'
      },
      defaultExpandedKeys: ['root', 'dicType', 'dicType1', 'dicType2', 'dicType3', 'dicType4'],
      currentNodeKey: 'root',
      loading: false,
      treeDataMap: {},
      tableColumnsMap: {},
      tableTbodyConfig: {},
      tableTbodyColumns: [],
      tableTbodyData: [],
      tableDataCodeMap: {}
    }
  },
  methods: {
    changeInput(val) {
      this.letftTreeFilterText = val
    },
    onNodeClick({ node, treeData }, UnitTree, tree) {
      this.queryTableConfig(node).then((obj) => {
        let { basicInfo = {}, columns = [], tableBody = [] } = obj
        this.curClickNode = node
        this.queryFormData = basicInfo
        this.tableTbodyData = tableBody
        this.tableTbodyColumns = utils.getRenderDataBylist(columns, 'orderNum')
        this.tableDataCodeMap = tools.generateTreeDateMap(this.tableTbodyData, 'itemCode')
        this.tableColumnsMap = tools.generateTreeDateMap(this.tableTbodyColumns, 'field')
      })
    },
    onSureClick() {
      let formula = this.$refs.JsEditor.getValue().replace('undefined', '')
      if (/^[A-Za-z0-9_$]{1,}:[A-Za-z0-9_$]{1,}:[0-9A-Za-z]{0,}$/.test(formula)) {
        let formulaCn = this.getFormulaCn(formula, this.treeDataMap, 1)
        if (tools.getCharLength(formula) >= 4000 || tools.getCharLength(formulaCn) >= 4000) {
          this.$XModal.message({ duration: 30000, status: 'error', message: '取数配置太长请联系管理员！' })
        } else {
          this.$emit('onSureClick', {
            configCellInfo: this.configCellInfo,
            formulaCn: formulaCn,
            formula: formula
          })
        }
        this.$emit('update:dialogVisible', false)
      } else if (formula === '') {
        this.$emit('onSureClick', {
          configCellInfo: this.configCellInfo,
          formulaCn: '',
          formula: ''
        })
        this.$emit('update:dialogVisible', false)
      } else {
        this.$XModal.message({ duration: 30000, status: 'error', message: '取数配置验证不通过，请按样例子 "tableId$xxxx::field:itemcode" 配置' })
      }
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
          tableName: nodeMap[formulaArr[0].split('$')[1]] ? String(nodeMap[formulaArr[0].split('$')[1]].name).replace(/undefined|\s+/ig, '') : '',
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
          let reg = new RegExp(item.replace('$', '\\$'), 'ig')
          formula = formula.replace(reg, map[item].formulaCn)
        }
      })
      return formula
    },
    onJsEditorMounted() {

    },
    onCellClick({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }) {
      // replaceSelection
      let formula = this.curClickNode.id + ':' + column.property + ':' + row['itemCode'].replace('undefined')
      if (/^[A-Za-z0-9_$]{1,}:[A-Za-z0-9_]{1,}:[0-9A-Za-z]{0,}$/.test(formula)) {
        this.$refs.JsEditor.setValue('tableId$' + formula)
      } else {
        this.$XModal.message({ duration: 10000, status: 'error', message: '取数所选数据验证不通过，请按样例子 "tableId$xxxx::field:itemcode" 配置' })
      }
    },
    queryTableConfig(node) {
      let self = this
      return new Promise((resolve, reject) => {
        // self.$http.get('/bisConfig/config/report/getBossReportConfig', { dicCode: node.code })
        self.$http.get('bisConfig/config/basDicInfo/getBasicDetailsByDicInfoId', {
          dicInfoId: node.id,
          isleaf: node.isleaf,
          mofDivCode: node.mofDivCode,
          fisalYear: node.fisalYear
        }).then(res => {
          if (res.code === '100000') {
            resolve(res.data)
          } else {
            reject(new Error('查询配置数据错误'))
          }
        }).catch(e => {

        })
      })
    },
    queryTableBody(node) {
      return new Promise((resolve, reject) => {
        self.$http.get().then(res => {

        }).catch(e => {

        })
      })
    },
    setData({ basicInfo, columns }, isleaf) {

    },
    init() {
      this.treeDataMap = tools.generateTreeDateMap(this.dicTreeData, 'id')
      this.curFormula = this.configCellInfo.formula || ''
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    dicTreeData: {
      handler(newVal) {
        this.treeDataMap = tools.generateTreeDateMap(this.dicTreeData, 'id')
      },
      immediately: true
    },
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
        if (newval) {
          this.init()
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
