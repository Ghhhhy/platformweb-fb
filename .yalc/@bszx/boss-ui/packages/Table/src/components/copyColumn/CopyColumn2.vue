<!--  table copy column -->
<template>
  <div class="table-copy-column">
    <vxe-form
      ref="copyColumnForm"
      title-align="right"
      title-width="100"
      :data="formData"
      size="middle"
      @submit="submitEvent"
    >
      <vxe-form-item
        title-align="right"
        :title-width="60"
        align="left"
        span="10"
        title="复制列"
        field="columnField"
      >
        <template v-slot>
          <vxe-select
            v-model="formData.columnField"
            placeholder="请选择被复制列"
            clearable
            @change="onColumnFieldItemChange"
            @clear="onColumnFieldItemClear"
          >
            <vxe-option
              v-for="(item, index) in columnItemConfigOptionMapArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item
        title-align="right"
        :title-width="60"
        span="10"
        title="到列"
      >
        <template v-slot>
          <vxe-select
            v-model="formData.columnCpField"
            placeholder="请选择复制列"
            clearable
            @change="onColumnCpFieldItemChange"
            @clear="onColumnCpFieldItemClear"
          >
            <vxe-option
              v-for="(item, index) in cpColumnItemConfigOptionMapArr"
              :key="index"
              :value="item.value"
              :label="item.label"
            />
          </vxe-select>
        </template>
      </vxe-form-item>
      <vxe-form-item align="center" span="4">
        <template v-slot>
          <vxe-button type="submit" status="primary">确定</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>

<script>
export default {
  name: 'CopyColumn',
  components: {},
  props: {
    copyColumnItemConfig: {
      type: Array,
      default() {
        return []
      }
    },
    columnFields: {
      type: [Array, Boolean],
      default() {
        return true
      }
    },
    cpColumnFields: {
      type: [Array, Boolean],
      default() {
        return true
      }
    },
    toolbarConfigIn: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      renderNames: [
        '$vxeMoney'
      ],
      formData: {
        columnField: '',
        columnCpField: ''
      }, // 修改项表单数据
      formDataCp: {
        // 修改项表单数据
        columnField: ''
      },
      // 被复制列
      columnItemConfigMap: {
        columnItemConfigFieldMap: {}, // 字段map: field:conlum
        columnItemConfigOptionMap: {}, // 字段map: field:render
        columnItemConfigOptionMapArr: [] // 被复制列下拉源数据
      },
      columnItemConfigFieldMap: {}, // 字段map: field:conlum
      columnItemConfigOptionMap: {}, // 字段map: field:render
      columnItemConfigOptionMapArr: [], // 批量修改源数据
      // 复制列
      cpColumnItemConfigMap: {
        cpColumnItemConfigFieldMap: {}, // 字段map: field:conlum
        cpColumnItemConfigOptionMap: {}, // 字段map: field:render
        cpColumnItemConfigOptionMapArr: [] // 复制列下拉源数据
      },
      cpColumnItemConfigFieldMap: {}, // 字段map: field:conlum
      cpColumnItemConfigOptionMap: {}, // 字段map: field:render
      cpColumnItemConfigOptionMapArr: [] // 批量修改源数据
    }
  },
  methods: {
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    riverColumnsGenerateColumnsMap(columns, obj, prefix) {
      // 递归生成列配置映射
      let self = this
      obj = obj || {
        columnItemConfigFieldMap: {}, // 字段map: field:conlum
        columnItemConfigOptionMap: {}, // 字段map: field:render
        columnItemConfigOptionMapArr: [] // 批量修改源数据
      }
      prefix = prefix || ''
      columns.forEach((conlum, index) => {
        if (Array.isArray(conlum.children) && conlum.children.length) {
          prefix = `${conlum.title} / `
          self.riverColumnsGenerateColumnsMap(conlum.children, obj, prefix)
        } else {
          // 默认被复制列只能为带渲染器$vxeMoney的列，如果要复制渲染器为$vxeInput的列，请通过columnFields参数来配置
          if (conlum.field && ((self.columnFields === true && this.renderNames.includes(conlum?.editRender?.name || conlum?.cellRender?.name || '')) || (Array.isArray(self.columnFields) && self.columnFields.includes(conlum.field))) && !conlum.formula) {
            obj.columnItemConfigFieldMap[conlum.field] = conlum
            obj.columnItemConfigOptionMapArr.push({
              label: prefix ? `${prefix}${conlum.title}` : conlum.title,
              value: conlum.field
            })
            obj.columnItemConfigOptionMap[conlum.field] = {
              span: 12,
              align: conlum.align,
              field: conlum.field,
              title: conlum.title
            }
          }
        }
      })
      return obj
    },
    riverColumnsGenerateCpColumnsMap(columns, obj, prefix) {
      // 递归生成列配置映射
      let self = this
      obj = obj || {
        cpColumnItemConfigFieldMap: {}, // 字段map: field:conlum
        cpColumnItemConfigOptionMap: {}, // 字段map: field:render
        cpColumnItemConfigOptionMapArr: [] // 批量修改源数据
      }

      prefix = prefix || ''
      columns.forEach((conlum, index) => {
        if (Array.isArray(conlum.children) && conlum.children.length) {
          prefix = `${conlum.title} / `
          self.riverColumnsGenerateCpColumnsMap(conlum.children, obj, prefix)
        } else {
          // 默认复制列必须为editRender可编辑的，且只能为带渲染器$vxeMoney的列，如果要复制渲染器为$vxeInput的列，请通过cpColumnFields参数来配置
          if (conlum.field && ((self.cpColumnFields === true && this.renderNames.includes(conlum?.editRender?.name || '')) || (Array.isArray(self.cpColumnFields) && self.cpColumnFields.includes(conlum.field))) && !conlum.formula) {
            obj.cpColumnItemConfigFieldMap[conlum.field] = conlum
            if (conlum.editRender) {
              obj.cpColumnItemConfigOptionMapArr.push({
                label: prefix ? `${prefix}${conlum.title}` : conlum.title,
                value: conlum.field
              })
              obj.cpColumnItemConfigOptionMap[conlum.field] = {
                span: 12,
                align: conlum.align,
                field: conlum.field,
                title: conlum.title,
                itemRender: conlum.editRender
              }
            }
          }
        }
      })
      return obj
    },
    generateColumnsMap(columns) {
      // 生成修改map
      let obj = this.riverColumnsGenerateColumnsMap(columns)
      const { columnItemConfigOptionMap, columnItemConfigOptionMapArr } = obj
      this.columnItemConfigMap = obj
      this.columnItemConfigOptionMap = columnItemConfigOptionMap // 字段map: field:render
      this.columnItemConfigOptionMapArr = columnItemConfigOptionMapArr // 批量修改源数据
    },
    generateCpColumnsMap(columns) {
      // 生成修改map
      let obj = this.riverColumnsGenerateCpColumnsMap(columns)
      const { cpColumnItemConfigOptionMap, cpColumnItemConfigOptionMapArr } = obj
      this.cpColumnItemConfigMap = obj
      this.cpColumnItemConfigOptionMap = cpColumnItemConfigOptionMap // 字段map: field:render
      this.cpColumnItemConfigOptionMapArr = cpColumnItemConfigOptionMapArr // 批量修改源数据
    },
    onColumnFieldItemChange({ value, $event }) {
      // 修改项改变
      this.formData.columnField = value
    },
    onColumnCpFieldItemChange({ value, $event }) {
      // 修改项改变
      this.formData.columnCpField = value
    },
    onColumnFieldItemClear({ value, $event }) {
      this.formData.columnField = ''
    },
    onColumnCpFieldItemClear({ value, $event }) {
      this.formData.columnCpField = ''
    },
    submitEvent() {
      // 提交修改
      let self = this
      // let columnField = this.columnItemConfigFieldMap[this.formData.columnField]
      // const columnFieldRenderName = columnField?.editRender?.name || columnField?.cellRender?.name || ''
      // let cpColumnField = this.cpColumnItemConfigFieldMap[this.formData.columnCpField]
      // const cpColumnFieldRenderName = cpColumnField?.editRender?.name || cpColumnField?.cellRender?.name || ''
      if (!this.formData.columnField) {
        this.$warn('被复制列不能为空')
        return
      }
      if (!this.formData.columnCpField) {
        this.$warn('复制列不能为空')
        return
      }
      // if (columnFieldRenderName !== cpColumnFieldRenderName) { // 暂时不扩展，如需再去掉注释
      //   this.$warn('被复制列和复制列数据类型不同')
      //   return
      // }
      const tip = (this.toolbarConfigIn.copyColumn.checkbox && this.$parent.$parent.$parent.selection.length) ? '您确定要复制所选中行的列数据吗?' : '您确定要复制列数据吗?'
      this.$XModal
        .confirm(tip)
        .then(() => {
          self.$emit('onSureClick', {
            columnField: this.formData.columnField,
            columnCpField: this.formData.columnCpField
          })
        })
        .catch(() => {
          self.$warn('已取消复制列')
        })
    },
    init() {
      this.generateColumnsMap(this.copyColumnItemConfig)
      this.generateCpColumnsMap(this.copyColumnItemConfig)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    columnFields: {
      handler() {
        this.generateColumnsMap(this.copyColumnItemConfig)
      },
      immediate: true
    },
    cpColumnFields: {
      handler() {
        this.generateCpColumnsMap(this.copyColumnItemConfig)
      },
      immediate: true
    },
    copyColumnItemConfig: {
      handler() {
        this.init()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.table-copy-column {
  width: 480px;
  margin-right: 8px;
  .vxe-form {
    height: 34px;
    background-color: #e3f1fe;
    .vxe-form--item {
      height: 100%;
      padding: 0 5px;
    }
    .vxe-col--3 {
      padding: 0 0 0 2px;
    }
    .vxe-form--item-inner {
      height: 100%;
      min-height: 32px;
    }
    .vxe-textarea {
      height: 100%;
    }
    .vxe-form--item-content {
      height: 100%;
      line-height: 32px;
    }
  }
  .modify-form{
    .vxe-form--item-title {
      display: none;
    }
    .vxe-form--item {
      width: 100%;
    }
  }
}
</style>
