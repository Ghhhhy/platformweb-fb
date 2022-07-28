<!--  js-editble   Author:Titans@2396757591@qq.com -->
<template>
  <div class="T-formale-editble">
    <div ref="formalaInputBox" class="formala-input-box" :contentEditble="true">
    </div>
  </div>
</template>

<script>
// 引入全局实例
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/javascript-hint.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/abcdef.css'
export default {
  name: '',
  props: {
    value: {
      // 选中的值 node,其中当为普通树时必须为node节点对象而非id
      type: [String],
      default() {
        return ''
      }
    }
  },
  config: {
    type: Object,
    default() {
      return {
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  components: {
  },
  data() {
    return {
      editor: '',
      code: ''
    }
  },
  methods: {
    init() {
      this.editor = CodeMirror(this.$refs.formalaInputBox, Object.assign({
        keywords: [],
        textWrapping: true,
        lineWrapping: true,
        lineNumbers: true,
        matchBrackets: true,
        // eslint-disable-next-line no-control-regex
        specialChars: /[\u0000-\u001f\u007f\u00ad\u200c-\u200f\u2028\u2029\ufeff]/,
        mode: 'text/javascript', // 识别的语言javascript
        theme: 'lee', // 设置主题
        foldGutter: true,
        parserfile: ['tokenizejavascript.js', 'parsejavascript.js'],
        stylesheet: 'css/jscolors.css',
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
      }, this.config))
      this.editor.setValue(this.value || this.code)
      this.$emit('onJsEditorReady', this.editor, this)
    },
    getValue() { // 获取值
      return this.editor.getValue()
    },
    setValue(value) { // 设置值
      this.editor.setValue(value || this.code)
    },
    replaceSelection(value) {
      this.editor.replaceSelection(value)
      this.editor.focus()
    }
  },
  created() {

  },
  mounted() {
    this.init()
  },
  watch: {
    config: {
      handler() {
      },
      deep: true,
      immediate: true
    },
    value: {
      handler() {
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.T-formale-editble{
  height: 100%;
  .formala-input-box {
     font-size: 20px;
     height: 100%;
     .cm-s-lee.CodeMirror {
       background: #0f0f0f;
       color: #defdef;
       z-index: 10;
       height: 100%;
       div.CodeMirror-selected {
         background: #525252;
       }

       .CodeMirror-line::selection,
       .CodeMirror-line > span::selection,
       .CodeMirror-line > span > span::selection {
          background: rgba(56, 56, 56, 0.99);
       }
       .CodeMirror-line::-moz-selection,
       .CodeMirror-line > span::-moz-selection,
       .CodeMirror-line > span > span::-moz-selection {
         background: rgba(56, 56, 56, 0.99);
       }
       span.cm-def{
          color: #2fd061;
       }
       span.cm-variable{
          color: #07f9ef
       }
       span.cm-variable-2{
         color: #5ed9ff;
       }
       span.cm-variable-3 {
          color: #d2e85b;
       }
       .CodeMirror-gutters {
         background: #3e3d3d;
         border-right: 2px solid #ababab;
       }
       .CodeMirror-guttermarker {
         color: #222;
       }
       .CodeMirror-guttermarker-subtle {
         color: azure;
       }
       .CodeMirror-linenumber {
         color:  #eee;
       }
       .CodeMirror-cursor {
         border: 1px solid #ded7dc;
       }
       span.cm-keyword {
         color:  #f34444;
         font-weight: bold;
       }
       span.cm-atom {
         color: #77F;
       }
       span.cm-number {
         color: violet;
       }
       span.cm-comment {
        color: #545454;
       }
       span.cm-property {
         color: #fdb03b;
       }
       span.cm-operator {
         color: #faff00;
       }
       span.cm-string {
         color: #2b4;
       }
       span.cm-meta {
         color: #C9F;
       }
       span.cm-qualifier {
         color: #FFF700;
       }
       span.cm-builtin {
         color: #30aabc;
       }
       span.cm-bracket {
         color: #8a8a8a;
       }
       span.cm-tag {
         color: #FFDD44;
       }
       span.cm-attribute {
         color: #DDFF00;
       }
       span.cm-error {
         color: #FF0000;
       }
       span.cm-header {
         color: aquamarine;
         font-weight: bold;
       }
       span.cm-link {
         color: blueviolet;
       }
     }
  }
}

</style>
