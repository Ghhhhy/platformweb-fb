<template>
  <el-dialog
    :visible.sync="isVisible"
    :style="dialogstyle"
    :close-on-press-escape="false"
    :close-on-click-modal="true"
    :append-to-body="appendtobody"
    :show-close="showClose"
    :fullscreen="fullscreen"
    :modal-append-to-body="false"
    :width="width"
    @close="close"
  >
    <div v-if="showHeader" slot="title" :style="titlestyle" :class="titleclass">
      <!-- @slot Use this slot header -->
      <slot name="header"><h1>{{ title }}</h1></slot>
    </div>
    <!-- @slot Use this slot context -->
    <slot name="context" :style="contextstyle" :class="contextclass"></slot>
    <div v-if="showFooter" slot="footer" class="dialog-footer" :style="footerstyle" :class="footerclass">
      <!-- @slot Use this slot footer -->
      <slot name="footer">
        <el-row>
          <el-button type="primary" @click.stop="saveData">保存</el-button>
          <el-button @click="close">取消</el-button>
        </el-row>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
/**
 * 基于elmentUI的 模态框组件
 */
export default {
  name: 'BsDialog',
  props: {
    /**
     * 组件展示与否
     * @values true || false
     */
    visible: {
      type: Boolean,
      default: true
    },
    /**
     * Header - title展示与否
     * @values true || false
     */
    showHeader: {
      type: Boolean,
      default: true
    },
    /**
     * 组件宽度
     */
    width: {
      type: String,
      default: '50%'
    },
    /**
     * Dialog 的标题
     */
    title: {
      type: String,
      default: 'dialog title'
    },
    /**
     * 底部按钮组展示与否
     */
    showFooter: {
      type: Boolean
    },
    /**
     * 是否显示关闭按钮
     */
    showClose: {
      type: Boolean,
      default: true
    },
    /**
     * Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
     */
    appendtobody: {
      type: Boolean
    },
    /**
     * style样式添加
     * @values {background: '#ccc'}
     */
    dialogstyle: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否为全屏 Dialog
     */
    fullscreen: {
      type: Boolean
    },
    /**
     * 标题class
     */
    titleclass: {
      type: Object,
      default: () => ({})
    },
    /**
     * 标题style
     */
    titlestyle: {
      type: Object,
      default: () => ({})
    },
    /**
     * 内容class
     */
    contextclass: {
      type: Object,
      default: () => ({})
    },
    /**
     * 内容style
     */
    contextstyle: {
      type: Object,
      default: () => ({})
    },
    /**
     * 底部clsss
     */
    footerclass: {
      type: Object,
      default: () => ({})
    },
    /**
     * 底部style
     */
    footerstyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isVisible: this.visible
    }
  },
  methods: {
    close() {
      /**
       * Close event.
       */
      this.$emit('onClose')
      this.isVisible = false
      /**
       * update:visible event.
       * @property {boolean} isVisible
       */
      this.$emit('update:visible', this.isVisible)
      // this.value = false
    },
    saveData() {
      /**
       * onSaveData event.
       */
      this.$emit('onSaveData')
      this.close()
    }
  },
  updated() {
  },
  mounted() {
  },
  watch: {
    visible (newVal) {
      this.isVisible = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dialog__body {
    padding: 15px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  /*新增-修改等全屏dialog*/
  .dialog_one{
    background:#fff;
    padding: 16px;
    .el-dialog{
      box-shadow:none;
      background:#f4faff;
      .el-dialog__header{
        border:0;
        background:#fff;
        padding: 0;
        .el-page-header{
          font-size:18px;
          font-weight: 600;
          padding:6px 0;
          .el-page-header__left{
            width: 28px;
            height: 28px;
            margin-left: 4px;
            border: 0;
            background: #fff;
            border-radius: 50%;
            padding: 0;
            font-weight: 900;
            font-size: 18px;
            box-shadow: 0px 0px 3px 2px #eee;
            .el-icon-back{
              margin-left:5px;
            }
          }
        }
        .el-row .el-col:last-child{
          text-align: right;
          padding:6px;
        }
      }
      .el-dialog__body{
        padding: 0;
        background:#f4faff;
        .el-tabs__nav-scroll{
          padding: 16px;
          .el-tabs__active-bar{
            display: none;
          }
          .el-tabs__item{
            padding: 0 16px;
            font-size: 14px;
            background: #fff;
            height: 32px;
            line-height: 32px;
            border: 1px solid #ccd2d8;
          }
          .el-tabs__item.is-active{
            border-color: #2A8BFD;
          }
        }
        .vxe-form{
          background: transparent;
          padding: 16px;
        }
      }
    }
  }
</style>
