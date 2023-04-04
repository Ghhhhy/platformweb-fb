<!--  EditDownJson   Author:Titans@2396757591@qq.com -->
<template>
  <div class="edit-down-json">
    <vxe-pulldown ref="xDown" class="edit-down-pulldown" :transfer="true" @hide-panel="onHidePanel">
      <template>
        <vxe-input
          v-model="jsonValue"
          class="edit-down-input"
          readonly
          @click="clickEvent"
        />
      </template>
      <template v-slot:dropdown>
        <div class="edit-down-json-wrapper edit-down-json-dropbox">
          <JsonEditor v-model="data[property]" :read-only="false" />
          <!-- <div class="edit-down-btn-group">
            <vxe-button status="primary" content="确定" @click="onSureClick" />
            <vxe-button content="取消" @click="onCancelClick" />
          </div> -->
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>
<script>
export default {
  name: 'EditDownJson',
  props: {
    type: {
      type: String,
      default: 'table' // form
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: {},
      property: ''
    }
  },
  computed: {
    jsonValue() {
      return JSON.stringify(this.data[this.property])
    }
  },
  created() {
    this.load()
  },
  mounted() {},
  methods: {
    load() {
      if (this.type === 'table') {
        try {
          const { row, column } = this.params
          this.data = row
          this.property = column.property
        } catch (e) {
          const { property, data } = this.params
          this.data = data
          this.property = property
          throw (e)
        }
      } else {
        const { property, data } = this.params
        this.data = data
        this.property = property
      }
    },
    onHidePanel() {
      // 隐藏下拉框
      this.$emit('input', this.data[this.property])
    },
    onSureClick() {
      // console.log('onSureClick', this.row[this.column.property])
      this.$refs.xDown.hidePanel().then(() => {})
    },
    onCancelClick() {
      // 取消
      this.$refs.xDown.hidePanel().then(() => {})
    },
    clickEvent() {
      this.$refs.xDown.showPanel().then(() => {
        // this.$refs.xText.focus()
        // this.loadMounted()
      })
    }
  },
  watch: {
    params() {
      this.load()
    },
    type: {
      handler() {
        this.load()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.edit-down-pulldown {
  width: 100%;
}
.edit-down-json-wrapper.edit-down-json-dropbox {
  width: 500px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 5px;
  .edit-down-btn-group {
    padding: 10px 0;
    text-align: right;
    .vxe-button {
      cursor: pointer;
      border-radius: 0;
      margin: 0 0 0 10px;
    }
  }
}
.edit-down-text {
  display: block;
}
</style>
