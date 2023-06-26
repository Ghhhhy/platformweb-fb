<template>
  <vxe-modal
    v-model="itemVisible"
    show-zoom
    resize
    transfer
    width="90%"
    height="90%"
    title="录入配置项"
    class="item-config"
    @close="itemClose"
  >
    <BsJsonEditor v-if="editorVisible" v-model="jsonData" :read-only="false" />
    <div style="height:40px" class="item-btn">
      <vxe-button size="medium" content="取消" style="margin-left:10px" @click="onStopItemClick" />
      <vxe-button size="medium" status="primary" content="保存" @click="onSaveItemClick" />
    </div>
  </vxe-modal>
  </div>
</template>

<script>
export default {
  name: 'EnterItemConfigModal',
  props: {
    itemVisible: {
      type: Boolean,
      default: false
    },
    configParams: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      jsonData: {
        configure: {
          itemsConfig: [],
          globalConfig: {},
          pageConfig: {},
          editConfig: {},
          editRules: {},
          footerConfig: {},
          dataConfig: {
            dataSouceType: ''
          }
        }
      },
      editorVisible: false
    }
  },
  methods: {
    onSaveItemClick(tableConfStr) {
      // 保存表格配置
      let self = this
      this.jsonData.configure = JSON.stringify(this.jsonData.configure)
      this.$http[self.configParams.optionType === 'add' ? 'post' : 'put']('mp-b-perm-service/v1/tableconf', this.jsonData)
        .then((res) => {
          if (res.rscode === '100000') {
            self.itemVisible = false
            self.editorVisible = false
            self.$emit('onItemClose')
            self.$message({
              showClose: true,
              message: self.params.optionType === 'add' ? '数据新增成功' : '数据保存成功',
              type: 'success'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onStopItemClick() {
      this.editorVisible = false
      this.itemVisible = false
    },
    itemClose() {
      this.editorVisible = false
      this.itemVisible = false
    }
  },
  created() {

  },
  watch: {
    itemVisible: {
      handler(newValue) {
        this.$emit('update:itemVisible', newValue)
        if (newValue === true) {
          this.editorVisible = true
        }
      },
      immediate: true
    },
    configParams: {
      handler(newValue) {
        this.jsonData = newValue
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
  .item-config {
    .T-editor-json {
      height: 90%;

      .BsJsonEditor-vue {
        height: 100%;
      }
    }

    .item-btn {
      margin:20px 0 0 0;
      height: 40px;
      display: flex;
      flex-direction: row-reverse;
    }
  }
</style>
