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
      <span>复制列</span>
      <el-cascader
        v-model="formData.columnField"
        :options="columnItemConfigOptionMapArr"
        :props="{ expandTrigger: 'hover' }"
        size="small"
        :show-all-levels="false"
      />

      <span>到列</span>
      <el-cascader
        v-model="formData.columnCpField"
        :options="cpColumnItemConfigOptionMapArr"
        size="small"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
      />
      <span>
        <vxe-button type="submit" status="primary">确定</vxe-button>
      </span>
    </vxe-form>
    <!-- <vxe-form
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
    </vxe-form> -->
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
      columnItemConfigOptionMapArr: [],
      cpColumnItemConfigOptionMapArr: [],
      formData: {
        columnField: '',
        columnCpField: ''
      } // 修改项表单数据
    }
  },
  methods: {
    submitEvent() {
      // 提交修改
      let self = this
      // let columnField = this.columnItemConfigFieldMap[this.formData.columnField]
      // const columnFieldRenderName = columnField?.editRender?.name || columnField?.cellRender?.name || ''
      // let cpColumnField = this.cpColumnItemConfigFieldMap[this.formData.columnCpField]
      // const cpColumnFieldRenderName = cpColumnField?.editRender?.name || cpColumnField?.cellRender?.name || ''
      // let preField = ''
      // let nextField = ''
      // if (this.formData.columnField.length === 2) {
      //   preField = this.formData.columnField[1]
      //   nextField = this.formData.columnCpField[1]
      // } else {
      //   preField = this.formData.columnField[2]
      //   nextField = this.formData.columnCpField[2]
      // }
      const preField = this.formData.columnField[this.formData.columnField.length - 1]
      const nextField = this.formData.columnCpField[this.formData.columnCpField.length - 1]
      // const data = {}
      // console.log(this.formData)
      // console.log(preField)
      // console.log(nextField)
      // const { columnField: [, preField], columnCpField: [, nextField] } = this.formData
      if (!preField || !nextField) return this.$warn('请保证复制列或被复制列不能为空')

      // if (columnFieldRenderName !== cpColumnFieldRenderName) { // 暂时不扩展，如需再去掉注释
      //   this.$warn('被复制列和复制列数据类型不同')
      //   return
      // }
      // const columnField = {
      //   label: preField.split('-')[0],
      //   value: preField.split('-')[0]
      // }
      // const columnCpField = {
      //   label: nextField.split('-')[1],
      //   value: nextField.split('-')[1]
      // }
      const tip =
        (this.toolbarConfigIn.copyColumn.checkbox && this.$parent.$parent.$parent.selection.length)
          ? '您确定要复制所选中行的列数据吗?' : '您确定要复制列数据吗?'
      this.$XModal
        .confirm(tip)
        .then(() => {
          self.$emit('onSureClick', {
            columnField: preField.split('-')[1],
            columnCpField: nextField.split('-')[1]
          })
        })
        .catch(() => {
          self.$warn('已取消复制列')
        })
    },
    transformPre(data) {
      data = JSON.parse(JSON.stringify(data))
      const treeFilter = (tree, func) => {
        return tree.filter(node => {
          node.children = node.children && treeFilter(node.children, func)
          return func(node) || (node.children && node.children.length)
        })
      }
      var res = treeFilter(data, (node) => {
        node.label = node.title
        node.value = `${node.title}-${node.field}`
        // 是否是金额类型
        if (this.renderNames.includes(node?.editRender?.name || node?.cellRender?.name)) {
          return node
        }
      })
      this.changeLabel(res)
      this.columnItemConfigOptionMapArr = res
      // console.log(this.columnItemConfigOptionMapArr)
    },
    transformNext(data) {
      data = JSON.parse(JSON.stringify(data))
      const treeFilter = (tree, func) => {
        return tree.filter(node => {
          node.children = node.children && treeFilter(node.children, func)
          return func(node) || (node.children && node.children.length)
        })
      }
      var res = treeFilter(data, (node) => {
        node.label = node.title
        node.value = `${node.title}-${node.field}`
        // 是否可编辑
        return node?.editRender
      })
      res = res.filter(item => item.label !== '备注栏' && item.label !== '备注')
      this.changeLabel(res)
      this.cpColumnItemConfigOptionMapArr = res
      // console.log(this.cpColumnItemConfigOptionMapArr)
    },
    changeLabel(res) {
      for (let i of res) {
        if (i.children) {
          for (let j of i.children) {
            if (j.children) {
              for (let k of j.children) {
                k.label = i.label + '-' + j.label + '-' + k.label
              }
            } else {
              j.label = i.label + '-' + j.label
            }
          }
        }
      }
      return res
    },
    init() {
      // console.log(this.copyColumnItemConfig, this.copyColumnItemConfig)
      this.transformPre(this.copyColumnItemConfig)
      this.transformNext(this.copyColumnItemConfig)
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang='scss'>
.table-copy-column {
  width: 700px;

  margin-right: 8px;
  .vxe-form {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: #e3f1fe;
      span{
        margin: 0 10px;
      }
      .el-cascader{
        flex: 1
      }
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
