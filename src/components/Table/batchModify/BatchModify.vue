<!--  table modify   Author:Titans@2396757591@qq.com -->
<template>
  <div class="table-batch-modify">
    <vxe-form
      ref="batchModifyForm"
      title-align="right"
      title-width="100"
      :data="formData"
      size="middle"
      @submit="submitEvent"
    >
      <vxe-form-item
        title-align="right"
        :title-width="30"
        align="left"
        span="9"
        title="列"
        field="modifyField"
      >
        <template v-slot>
          <vxe-select
            v-model="formData.modifyField"
            placeholder="请选择修改项"
            clearable
            @change="onModifyItemChange"
            @clear="onModifyItemClear"
          >
            <vxe-option
              v-for="(item, index) in batchModifyItemConfigOptionMapArr"
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
        span="12"
        title="修改为"
      >
        <div class="modify-form">
          <BsForm
            ref="modifyForm"
            :form-gloabal-config="formGloabalConfigIn"
            :form-items-config="modifyItemIn"
            :form-data-list="formData"
            @itemChange="itemChange"
          />
        </div>
      </vxe-form-item>
      <vxe-form-item align="center" span="3">
        <template v-slot>
          <vxe-button type="submit" status="primary">确定</vxe-button>
        </template>
      </vxe-form-item>
    </vxe-form>
  </div>
</template>

<script>
export default {
  name: 'TableBatchModifyVue',
  components: {},
  props: {
    batchModifyItemConfig: {
      type: Array,
      default() {
        return []
      }
    },
    batchModifyFields: {
      type: [Array, Boolean],
      default() {
        return true
      }
    }
  },
  data() {
    return {
      formGloabalConfigIn: {
        span: 4,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 0,
        titleColon: false,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      hasModifyItem: false, // 是否有修改项
      itemsConfig: [
        // 批量修改项表单配置
        {
          field: 'modifyField',
          title: '列',
          itemRender: {
            name: 'vxeSelect',
            props: {
              clearable: true,
              options: [],
              placeholder: '请选择修改项'
            }
          }
        },
        {
          field: 'modifyValue',
          title: '修改为',
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'text',
              clearable: true,
              placeholder: '请输入值'
            }
          }
        },
        {
          itemRender: {
            name: 'input',
            attrs: {
              type: 'submit',
              value: '确定'
            }
          }
        }
      ],
      modifyItemIn: [{
        // 修改项
        field: 'modifyValue',
        itemRender: {
          name: '$input',
          type: 'text'
        }
      }],
      modifyItem: {},
      formData: {
        modifyField: ''
      }, // 修改项表单数据
      formDataCp: {
        // 修改项表单数据
        modifyField: ''
      },
      batchModifyItemConfigMap: {
        batchModifyItemConfigFieldMap: {}, // 字段map: field:conlum
        batchModifyItemConfigOptionMap: {}, // 字段map: field:render
        batchModifyItemConfigOptionMapArr: [] // 批量修改源数据
      },
      batchModifyItemConfigFieldMap: {}, // 字段map: field:conlum
      batchModifyItemConfigOptionMap: {}, // 字段map: field:render
      batchModifyItemConfigOptionMapArr: [] // 批量修改源数据
    }
  },
  methods: {
    itemChange(obj) {
      this.$emit('onBatchModifyItemChange', obj, this.$refs.modifyForm)
    },
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
    riverColumnsGenerateColumnsMap(columns, obj) {
      // 递归生成列配置映射
      let self = this
      obj = obj || {
        batchModifyItemConfigFieldMap: {}, // 字段map: field:conlum
        batchModifyItemConfigOptionMap: {}, // 字段map: field:render
        batchModifyItemConfigOptionMapArr: [] // 批量修改源数据
      }
      columns.forEach((conlum, index) => {
        if (Array.isArray(conlum.children) && conlum.children.length) {
          self.riverColumnsGenerateColumnsMap(conlum.children, obj)
        } else {
          if (conlum.field && (self.batchModifyFields === true || self.batchModifyFields.indexOf(conlum.field) >= 0) && !conlum.formula) {
            obj.batchModifyItemConfigFieldMap[conlum.field] = conlum
            if (conlum.editRender) {
              obj.batchModifyItemConfigOptionMapArr.push({
                label: conlum.title,
                value: conlum.field
              })
              obj.batchModifyItemConfigOptionMap[conlum.field] = {
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
      const { batchModifyItemConfigOptionMap, batchModifyItemConfigOptionMapArr } = obj
      this.batchModifyItemConfigMap = obj
      this.batchModifyItemConfigOptionMap = batchModifyItemConfigOptionMap // 字段map: field:render
      this.batchModifyItemConfigOptionMapArr = batchModifyItemConfigOptionMapArr // 批量修改源数据
      this.hasModifyItem = false
    },
    onModifyItemChange({ value, $event }) {
      // 修改项改变
      this.formData.modifyField = value
      this.modifyItem = this.batchModifyItemConfigOptionMap[value]
      this.modifyItemIn = [this.modifyItem]
      this.formData = Object.assign(
        {},
        {
          modifyField: value
        },
        {
          [this.modifyItem.field]: ''
        }
      )
      this.hasModifyItem = true
    },
    onModifyItemClear({ value, $event }) {
      // 修改项置空
      this.hasModifyItem = false
      this.modifyItem = {
        field: 'modifyValue',
        itemRender: {
          name: '$input',
          type: 'text'
        }
      }
      this.modifyItemIn = [this.modifyItem]
      this.formData = Object.assign({}, this.formDataCp)
    },
    submitEvent() {
      // 提交修改
      let self = this
      if (!this.$parent.$parent.$parent.selection.length) {
        self.$message({
          type: 'info',
          message: '请先选中数据再进行批量修改！'
        })
      } else {
        this.$XModal
          .confirm('您确定要批量修改所选中数据吗?')
          .then(() => {
            let result = self.$refs.modifyForm.getFormData()
            delete result.modifyField
            self.$emit('onSureClick', {
              modifyItem: self.modifyItem,
              formData: result
            })
          })
          .catch(() => {
            self.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
      }
    },
    init() {
      this.generateColumnsMap(this.batchModifyItemConfig)
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    batchModifyFields: {
      handler() {
        this.init()
      },
      immediate: true
    },
    batchModifyItemConfig: {
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
.table-batch-modify {
  width: 480px;
  margin-right: 8px;
  .vxe-form {
    height: 34px;
    background-color: var(--hightlight-color);
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
