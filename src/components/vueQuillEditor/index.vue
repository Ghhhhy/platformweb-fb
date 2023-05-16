<template>
  <quill-editor
    ref="quillEditor"
    v-model="editorContent"
    :options="options"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'
import Quill from 'vue-quill-editor'
let fontFamily = [
  'SimSun',
  'SimHei',
  'Microsoft-YaHei',
  'KaiTi',
  'FangSong',
  'Arial',
  'Times-New-Roman',
  'sans-serif'
]
Quill.Quill.imports['formats/font'].whitelist = fontFamily
Quill.Quill.register(Quill.Quill.imports['formats/font'])

// 自定义文字大小
const fontSize = ['10px', '12px', '14px', '16px', '20px', '24px', '36px']
Quill.Quill.imports['attributors/style/size'].whitelist = fontSize
Quill.Quill.register(Quill.Quill.imports['attributors/style/size'])

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  // 需修改js和css文件
  [{ size: fontSize }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: fontFamily }], // 字体种类
  ['clean'] // 清除文本格式
]
const options = {
  theme: 'snow', // or 'bubble'
  placeholder: '请输入',
  modules: {
    toolbar: {
      container: toolbarOptions
    }
  }
}
export default defineComponent({
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const editorContent = computed({
      get() {
        return props.content
      },
      set(value) {
        emit('update:content', value)
      }
    })
    return {
      options,
      editorContent
    }
  }
})
</script>

<style lang='scss'>
  /*
    文字大小
  */
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='10px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='10px']::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='12px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='12px']::before {
    content: '12px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='14px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='14px']::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='16px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='16px']::before {
    content: '16px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='20px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='20px']::before {
    content: '20px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='24px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='24px']::before {
    content: '24px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='36px']::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='36px']::before {
    content: '36px';
  }

  /*
    字体
  */
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='SimSun']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='SimSun']::before {
    content: '宋体';
    font-family: 'SimSun' !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='SimHei']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='SimHei']::before {
    content: '黑体';
    font-family: 'SimHei';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Microsoft-YaHei']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Microsoft-YaHei']::before {
    content: '微软雅黑';
    font-family: '微软雅黑';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='KaiTi']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='KaiTi']::before {
    content: '楷体';
    font-family: 'KaiTi' !important;
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='FangSong']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='FangSong']::before {
    content: '仿宋';
    font-family: 'FangSong';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Arial']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Arial']::before {
    content: 'Arial';
    font-family: 'Arial';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='pingfang']::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='pingfang']::before {
    content: '苹方';
    font-family: '苹方';
  }
  // 设置每个字体的css字体样式
  .ql-font-SimSun {
    font-family: 'SimSun';
  }
  .ql-font-SimHei {
    font-family: 'SimHei';
  }
  .ql-font-Microsoft-YaHei {
    font-family: '微软雅黑';
  }
  .ql-font-KaiTi {
    font-family: 'KaiTi';
  }
  .ql-font-FangSong {
    font-family: 'FangSong';
  }
  .ql-font-Arial {
    font-family: 'Arial';
  }
  .ql-font-pingfang {
    font-family: '苹方';
  }

  /*
    标题
  */
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
  }
  .ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: var(--primary-color) !important
  }
  .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    color: var(--primary-color) !important
  }
</style>
