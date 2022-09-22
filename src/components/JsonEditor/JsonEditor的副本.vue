<!--  JsonEditor   Author:Titans@2396757591@qq.com -->
<template>
  <div class="json-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'
// eslint-disable-next-line import/no-webpack-loader-syntax
require('script-loader!jsonlint')
export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    // 是否只读，默认否
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  model: {
    props: 'value',
    event: 'input'
  },
  data() {
    return {
      jsonEditor: null
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 8))
      }
    }
  },
  mounted() {
    this.initJsonEditor()
    this.jsonEditor.setOption('readOnly', this.readOnly)
  },
  methods: {
    // 初始化jsonEditor
    initJsonEditor() {
      let self = this
      self.jsonEditor = CodeMirror.fromTextArea(self.$refs.textarea, {
        lineNumbers: true,
        mode: 'application/json',
        gutters: ['CodeMirror-lint-markers'],
        // theme: 'rubyblue',
        lint: true
      })
      self.jsonEditor.setValue(JSON.stringify(self.value, null, 8))
      self.jsonEditor.on('change', (cm) => {
        self.$emit('input', self.getValue())
      })
    },
    // 获取json
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="scss">
.json-editor {
  overflow-y: auto;
  position: relative;
  font-size: 14px;
  width: 500px;
  border: 1px solid #ddd;
  .CodeMirror {
    font-size: 14px;
    min-height: 300px;
    .CodeMirror-line {
      line-height: 1.5;
    }
  }
  .CodeMirror-scroll {
    min-height: 300px;
    padding-bottom: 0;
  }
  .CodeMirror-linenumber {
    color: #2b91af;
    height: 21px;
    line-height: 21px;
  }
  .CodeMirror-cursors {
    .CodeMirror-cursor {
      height: 21px !important;
    }
  }
  .CodeMirror-gutters {
    background-color: #fff;
    border-right: 0;
  }
  span.cm-string {
    color: #f08047;
  }
}
</style>
