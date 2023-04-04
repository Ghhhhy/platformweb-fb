
<!--  JsonEditor   Author:Titans@2396757591@qq.com -->
<template>
  <div class="T-editor-json">
    <div class="jsoneditor-vue"></div>
    <div v-if="showBtns" class="jsoneditor-btns">
      <el-button
        class="json-save-btn"
        type="button"
        :disabled="error"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script>

import 'jsoneditor/dist/jsoneditor.css'
import JsonEditor from 'jsoneditor'
/**
 * JSON编辑器
 */

export default {
  name: 'BsJsonEditor',
  props: {
    /**
     * value绑定
     */
    value: {
      type: [String, Number, Object, Array],
      default() {
        return {}
      }
    },
    /**
     * 保存按钮显示与否
     */
    showBtns: {
      type: Boolean,
      default: true
    },
    /**
     * 是否展开所有字段
     */
    expandedOnStart: {
      type: Boolean,
      default: false
    },
    /**
     * mode配置  when using the mode "code", it's important to specify charset utf-8
     * @value code
     */
    mode: {
      type: String,
      default: 'code'
    },
    /**
     * modes配置
     */
    modes: {
      type: Array,
      default: function () {
        return ['tree', 'code', 'text', 'view']
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      editor: null,
      error: false,
      json: this.value,
      internalChange: false,
      expandedModes: ['tree', 'view', 'form']
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let self = this
      let options = {
        mode: this.mode,
        modes: this.modes, // allowed modes
        onChange() {
          try {
            let json = self.editor.get()
            self.json = json
            self.internalChange = true
            /**
             * input event.
             * @property {object}  value json 数据
             */
            self.$emit('input', json)
            self.$nextTick(function () {
              self.internalChange = false
            })
          } catch (e) {
            self.$emit('has-error', e)
          }
        },
        onModeChange() {
          self.expandAll()
        }
      }

      this.editor = new JsonEditor(
        this.$el.querySelector('.jsoneditor-vue'),
        options,
        this.json
      )
    },
    expandAll() {
      if (
        this.expandedOnStart &&
        this.expandedModes.includes(this.editor.getMode())
      ) {
        this.editor.expandAll()
      }
    },
    onSave() {
      /**
       * input event.
       * @property {object}  value json 数据
       */
      this.$emit('input', this.json)
    },

    async setEditor(value) {
      if (this.editor) this.editor.set(value)
    }
  },
  watch: {
    value: {
      immediate: true,
      async handler(val) {
        if (!this.internalChange) {
          await this.setEditor(val)
          this.expandAll()
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.T-editor-json {
  height: 100%;
  .jsoneditor-vue {
    height: 100%;
  }
  .jsoneditor-menu {
    .jsoneditor-sort {
      display: none;
    }
    .jsoneditor-transform {
      display: none;
    }
    .jsoneditor-repair {
      display: none;
    }
    a.jsoneditor-poweredBy {
      display: none;
    }
    .jsoneditor-modes > button {
      color: #ffffff;
      font-weight: bold;
      opacity: 1;
    }
    .jsoneditor-search{
      input{
        padding: 6px;
        padding: 2px;
        line-height: 12px;
      }
    }
  }
  // .ace_line_group {
  //   text-align: left;
  // }
  // .json-editor-container {
  //   display: flex;
  //   width: 100%;
  // }
  // .json-editor-container .tree-mode {
  //   width: 50%;
  // }
  // .json-editor-container .code-mode {
  //   flex-grow: 1;
  // }
  // .jsoneditor-btns {
  //   text-align: center;
  //   margin-top: 10px;
  // }
  // .jsoneditor-vue .jsoneditor-outer {
  //   min-height: 150px;
  // }
  // .jsoneditor-vue div.jsoneditor-tree {
  //   min-height: 350px;
  // }
  // .json-save-btn {
  //   background-color: #20a0ff;
  //   border: none;
  //   color: #fff;
  //   padding: 5px 10px;
  //   border-radius: 5px;
  // }
  // .json-save-btn:focus {
  //   outline: none;
  // }
  // .json-save-btn[disabled] {
  //   background-color: #1d8ce0;
  // }
  // code {
  //   background-color: #f5f5f5;
  // }
}
</style>
