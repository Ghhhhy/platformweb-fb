<!--  query组件   Author:Titans@2396757591@qq.com -->
<template>
  <div class="T-search">
    <div class="basicsearch">
      <div class="basicsearch-form">
        <BsForm
          v-if="ifRenderQuerySearch"
          ref="queryForm"
          :form-gloabal-config="formGloabalConfigIn"
          :form-items-config="queryFormItemConfigIn"
          :form-data-list.sync="queryFormDataIn"
          @itemChange="itemChange"
        />
        <div v-show="isMoreSearch" class="query-form-bottom">
          <slot name="formFootSlot"> </slot>
        </div>
      </div>
      <div class="basicsearch-btngroups">
        <vxe-button
          v-if="queryConfigIn.searchBtnText"
          :content="queryConfigIn.searchBtnText"
          status="primary"
          size="medium"
          @click="onSearchClick"
        />
        <vxe-button
          v-if="queryConfigIn.resetBtnText"
          :content="queryConfigIn.resetBtnText"
          size="medium"
          @click="onSearchResetClick"
        />
        <vxe-button
          v-if="isRenderHighSearchBtn"
          size="medium"
          @click="onMoreSearchClick(undefined)"
        >
          <span class="fn-inline">{{ queryConfigIn.moreBtnText }}</span>
          <i
            class="fn-inline drop"
            :class="
              isMoreSearch ? 'vxe-icon--arrow-top' : 'vxe-icon--arrow-bottom'
            "
          ></i>
        </vxe-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QueryForm',
  components: {},
  props: {
    queryConfig: {
      type: Object,
      default() {
        return {
          searchBtnText: '搜索',
          resetBtnText: '重置',
          moreBtnText: '更多查询'
        }
      }
    },
    queryFormItemConfig: {
      type: Array,
      default() {
        return []
      }
    },
    perLineItemCount: {
      type: Number,
      default() {
        return 6
      }
    },
    formGloabalConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    queryFormData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      mapRenderEmptyValue: {
        $vxeTree: '', // 新全局下拉树
        $vxeInput: '', // 文本数字输入
        $vxeSelect: '', // 下拉选择
        $vxeCalculate: '', // 计算渲染器
        $vxeMoney: '', // 金额输入
        $vxeEditDownTextarea: '', // 下拉文本框
        $vxeDays: '', // 天数
        $vxeTime: '', // 时间日期
        $vxeRadio: '', // 单选
        $vxeCheckbox: '', // 多选
        $vxeIntervar: '', // 间隔时间或数值选择输入渲染器
        $vxeSwitch: '', // 开关
        vxeProgress: '' // 进度条
      },
      ifRenderQuerySearch: true,
      queryConfigIn: {},
      isMoreSearch: false,
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
      queryFormDataIn: {},
      perLineItemCountCp: 6,
      defaultQueryFormData: false,
      queryFormItemConfigIn: []
    }
  },
  computed: {
    isRenderHighSearchBtn() {
      return this.queryFormItemConfig.length > this.perLineItemCountCp
    }
  },
  methods: {
    queryFormOptionFn() {
      return this.$refs.queryForm
    },
    getFormData() {
      return this.$refs.queryForm.getFormData()
    },
    setDefaultQueryFormData(formItems, data) {
      formItems.forEach((item, index) => {
        if (item.field) {
          if (item.itemRender && item.itemRender.name === '$vxeTree') {
            let { isHump } = (item.props && item.props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
            let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (item.field.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
            data[item.field + fieldkeys[0]] = data[item.field + fieldkeys[0]] === undefined ? '' : data[item.field + fieldkeys[0]]
            data[item.field + fieldkeys[1]] = data[item.field + fieldkeys[1]] === undefined ? '' : data[item.field + fieldkeys[1]]
            data[item.field + fieldkeys[2]] = data[item.field + fieldkeys[2]] === undefined ? '' : data[item.field + fieldkeys[2]]
          } else if (item.itemRender && item.itemRender.name === '$formTreeInput') {
            data[item.field + 'name'] = data[item.field + 'name'] === undefined ? '' : data[item.field + 'name']
            data[item.field + 'code'] = data[item.field + 'code'] === undefined ? '' : data[item.field + 'code']
            data[item.field + 'id'] = data[item.field + 'id'] === undefined ? '' : data[item.field + 'id']
          } else {
          }
          data[item.field] = data[item.field] === undefined ? '' : data[item.field]
        }
      })
      return data
    },
    getMultipleValue(formItems, queryFormData) {
      let obj = {}
      formItems.forEach((item, index) => {
        if (item.field) {
          if (item.itemRender && item.itemRender.props) {
            const { multiple } = item.itemRender.props
            if (multiple) {
              obj[item.field] = typeof (queryFormData[item.field]) === 'string' ? queryFormData[item.field].split(',') : Array.isArray(queryFormData[item.field]) ? queryFormData[item.field] : []
              if (item.itemRender.name === '$vxeTree') {
                let { isHump } = (item.props && item.props.config) || { multiple: false, format: '{code}-{name}', showField: '', isHump: false }
                let fieldkeys = isHump ? ['Code', 'Name', 'Id'] : (item.field.endsWith('_') ? ['code', 'name', 'id'] : ['_code', '_name', '_id'])
                obj[item.field + fieldkeys[0]] = typeof (queryFormData[item.field + fieldkeys[0]]) === 'string' ? queryFormData[item.field + fieldkeys[0]].split(',') : Array.isArray(queryFormData[item.field + fieldkeys[0]]) ? queryFormData[item.field + fieldkeys[0]] : []
                obj[item.field + fieldkeys[1]] = typeof (queryFormData[item.field + fieldkeys[1]]) === 'string' ? queryFormData[item.field + fieldkeys[1]].split(',') : Array.isArray(queryFormData[item.field + fieldkeys[1]]) ? queryFormData[item.field + fieldkeys[1]] : []
                obj[item.field + [2]] = typeof (queryFormData[item.field + [2]]) === 'string' ? queryFormData[item.field + [2]].split(',') : Array.isArray(queryFormData[item.field + [2]]) ? queryFormData[item.field + [2]] : []
              }
            }
          } else {
            obj[item.field] = queryFormData[item.field]
            if (item.itemRender === '$vxeFormTreeinput') {
              obj[item.field + 'code'] = obj[item.field + 'code'] === undefined ? '' : obj[item.field + 'code']
              obj[item.field + 'name'] = obj[item.field + 'name'] === undefined ? '' : obj[item.field + 'name']
              obj[item.field + 'id'] = obj[item.field + 'id'] === undefined ? '' : obj[item.field + 'id']
            }
          }
        }
      })
      return obj
    },
    itemChange(obj, form) {
      //  项改变
      this.$emit('itemChange', obj, form)
    },
    onSearchClick() {
      // 搜索
      this.queryFormDataIn = this.$refs.queryForm.getFormData()
      this.$emit('onSearchClick', this.queryFormDataIn, this.getMultipleValue(this.queryFormItemConfig, this.queryFormDataIn))
    },
    resetMultipleData(data) {
      Object.keys(data).forEach((key) => {
        if (!data[key] && data[key + '__multiple']) {
          data[key + '__multiple'] = []
        }
      })
      return data
    },
    reset() {
      // 重置
      let self = this
      return new Promise((resolve, reject) => {
        self.queryFormDataIn = self.resetMultipleData(Object.assign(self.$refs.queryForm.getFormData(), self.defaultQueryFormData))
        self.queryFormItemConfigIn = []
        // this.ifRenderQuerySearch = false
        self.$nextTick().then(() => {
          self.onMoreSearchClick(self.isMoreSearch)
          resolve(this.queryFormDataIn)
        })
      })
    },
    onSearchResetClick() {
      // 重置点击事件
      this.reset().then((res) => {
        if (this.$listeners.onSearchResetClick) {
          this.$emit('onSearchResetClick', this.queryFormDataIn)
        } else {
          this.$emit('onSearchClick', this.queryFormDataIn, this.getMultipleValue(this.queryFormItemConfig, this.queryFormDataIn))
        }
      })
    },
    getActualPerLineItemCount(queryFormItemConfig, perLineItemCountCp) {
      // 获取除隐藏列 实际显示的内容
      queryFormItemConfig.forEach((item, index) => {
        if (index < perLineItemCountCp) {
          if (item.visible + '' === 'false') {
            perLineItemCountCp += 1
          }
        }
      })
      return perLineItemCountCp
    },
    onMoreSearchClick(isMoreSearch) {
      this.perLineItemCountCp = this.perLineItemCount
      this.isMoreSearch = isMoreSearch === undefined ? !this.isMoreSearch : isMoreSearch
      if (this.isMoreSearch) {
        this.queryFormItemConfigIn = this.queryFormItemConfig.slice(0)
      } else {
        this.queryFormItemConfigIn = this.queryFormItemConfig.slice(0, this.getActualPerLineItemCount(this.queryFormItemConfig, this.perLineItemCountCp))
      }
    }
  },
  mounted() {
    this.$emit('register', this.$refs.queryForm?.$refs?.form || this.$refs.queryForm)
  },
  watch: {
    queryConfig: {
      handler(newval) {
        this.queryConfigIn = Object.assign({}, this.queryConfigIn, this.queryConfig)
      },
      deep: true,
      immediate: true
    },
    queryFormItemConfig: {
      handler(newval) {
        this.defaultQueryFormData = this.setDefaultQueryFormData(this.queryFormItemConfig, {})
        this.queryFormDataIn = Object.assign({}, this.queryFormData, this.defaultQueryFormData)
        this.onMoreSearchClick(false)
      },
      immediate: true
    },
    formGloabalConfig: {
      handler(newval) {
        this.formGloabalConfigIn = Object.assign(
          {},
          this.formGloabalConfigIn,
          this.formGloabalConfig
        )
      },
      deep: true,
      immediate: true
    },
    perLineItemCount: {
      handler(newval) {
        this.perLineItemCountCp = this.perLineItemCount
        this.onMoreSearchClick(false)
        this.onSearchResetClick()
      }
    },
    queryFormDataIn: {
      handler(newval) {
      },
      deep: true,
      immediate: true
    },
    queryFormData: {
      handler(newval) {
        this.queryFormDataIn = Object.assign({}, this.defaultQueryFormData, this.queryFormData)
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.T-search {
  flex: 1;
  background: var(--hightlight-color);
  min-height: 56px;

  .basicsearch {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
  }

  .basicsearch-form {
    padding-left:8px;
    flex: 1;

    .vxe-form {
      background: transparent;
      font-size: 12px !important;
    }
    .vxe-pulldown{
      .vxe-input--inner{
        padding-right: 30px;
      }
    }
    .vxe-form--item {
      padding: 12px 8px;

      .vxe-input.size--medium {
        height: 32px;
      }
      .vxe-default-textarea {
        resize: none;
        vertical-align: middle;
        height: 32px;
        border-radius: 2px;
      }
    }

    .vxe-form--item-title {
      display: none;
    }
    .vxe-input--inner {
      box-shadow: none;
      background: #ffffff;
      border: 1px solid #cfd2d4;
      border-radius: 2px;
      border-radius: 2px;
      // padding: 0 30px 0 16px;
    }
    // .vxe-input--suffix {
    //   right: 10px;
    // }
    .boss-tree__input {
      .el-input {
        font-size: 12px;
      }
      .el-select {
        height: 32px;
      }
      .el-input__inner {
        background-color: #fff;
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        height: 32px;
        line-height: 32px;
      }
      .el-select__caret {
        color: #c0c4cc;
        line-height: 32px;
        font-size: 5px;
        transform-origin: center center;
      }
    }
    .vxe-input--inner {
      padding: 0 15px;
    }
    .type--date {
      .vxe-input--extra-suffix {
        right: 0.5em;
      }
      .vxe-input--inner {
        padding: 0 30px 0 15px;
      }
    }
  }
  .query-form-bottom {
    .vxe-checkbox {
      padding: 6px 12px;
    }
    line-height: 32px;
  }
  .basicsearch-btngroups {
    padding: 12px 16px;

    .vxe-button {
      border-radius: 2px;
      font-size: 12px;
      margin: 0 0 0 8px;
      line-height: 19px;
      padding: 0 14px;
      display: inline-block;
      vertical-align: middle;

      .drop {
        margin-left: 5px;
        font-size: 5px;
      }
    }
  }
}
</style>
