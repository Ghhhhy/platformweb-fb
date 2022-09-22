
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="config.title"
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
          <!-- <div class="option-line-group-flex">
            <div class="fn-inline option-line-group-left">
            </div>
            <div class="fn-inline option-line-group-btn" style="padding: 4px 10px 0 10px;">
              <vxe-button v-preventClick="6000" status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
            </div>
          </div>
        -->
        </template>
        <template v-slot:topTabPane>
          <div style="height:80px;">
            <JsEditor ref="JsEditor" :config="{ lineWrapping: false }" @hook:mounted="onJsEditorMounted" />
          </div>
        </template>
        <template v-slot:query>
        </template>
        <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
        <template v-slot:mainTree>
          <ul class="formula-list">
            <li></li>
          </ul>
        </template>
        <template v-slot:mainForm>
          <BsTable
            :edit-config="false"
            :table-config="tableTbodyConfig"
            :table-columns-config="viewDataConfigRenderColumns"
            :table-data="viewDataConfigRenderData"
            :footer-config="{ showFooter: false }"
            :toolbar-config="false"
            :pager-config="false"
            @cellClick="cellClick"
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
    config: {
      type: Object,
      default() {
        return {
          title: '查看配置',
          type: 'getData'
        }
      }
    },
    calculateConstraintConfig: {
      type: Object,
      default() {
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
      loading: false,
      tableTbodyConfig: {
        globalConfig: {
          checkType: ''
        }
      },
      viewDataConfigRenderData: [],
      viewDataConfigRenderColumns: []
    }
  },
  methods: {
    cellClick({ column, row }) {
      this.$refs.JsEditor.setValue(row[column.property])
    },
    onSureClick() {
      this.$refs.JsEditor.getValue()
    },
    onJsEditorMounted() {

    },
    getViewDataConfigRenderColumns(columns, list = []) {
      let self = this
      columns.forEach((item, index) => {
        if ((Array.isArray(item.children) && !item.children.length) || !Array.isArray(item.children)) {
          list.push({
            title: item.title,
            field: item.field,
            editRender: {
              name: '$vxeEditDownTextarea',
              props: {
                type: 'text'
              }
            }
          })
        } else {
          self.getViewDataConfigRenderColumns(item.children, list)
        }
      })
      return list
    },
    initViewData(data, config, nestCodekey) {
      this.viewDataConfigRenderColumns = this.getViewDataConfigRenderColumns(this.tableTbodyColumns)
      this.viewDataConfigRenderData = data.map((row, rowIndex) => {
        let rowRow = {}
        tools.each(row, (key) => {
          if (config[row[nestCodekey] + ':' + key]) {
            rowRow[key] = config[row[nestCodekey] + ':' + key].formula
          } else if (key === nestCodekey) {
            rowRow[key] = row[key]
          } else {
            rowRow[key] = row[key]
          }
        })
        return rowRow
      })
    },
    init() {
      switch (this.config.type) {
        case 'advanceAttr':// 查看高级属性
          break
        default:
          this.initViewData(this.tableTbodyData, this.calculateConstraintConfig[this.config.type], this.calculateConstraintConfig.calcAndConstraintItemCodeField)
          break
      }
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    },
    tableTbodyColumns: {
      handler(newval) {
      },
      immediate: true
    },
    tableTbodyData: {
      handler(newval) {
      },
      immediate: true
    },
    calculateConstraintConfig: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    config: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
