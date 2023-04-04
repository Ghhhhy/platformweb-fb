<!--
 * @Description: 
 * @Author: Comer
 * @Date: 2023-02-09 18:03:31
 * @LastEditors: Comer
 * @LastEditTime: 2023-02-10 09:16:06
-->
<template>
  <div class="my-filter-input" @keydown.stop>
    <vxe-input
      v-model="option.data"
      type="text"
      placeholder="输入关键字过滤"
      @keyup="keyupEvent"
      @input="changeOptionEvent"
    />
    <div class="my-fc-footer">
      <vxe-button @click="confirmFilterEvent">筛选</vxe-button>
      <vxe-button @click="resetFilterEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterInput',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      column: null,
      option: null
    }
  },
  watch: {
    params () {
      this.load()
    }
  },
  created () {
    this.load()
  },
  methods: {
    confirmFilterEvent (evnt) {
      const { params } = this
      const { $panel } = params
      this.$parent.$parent.clearCheckboxRow()
      $panel.confirmFilter()
    },
    load () {
      // filters 可以配置多个，实际只用一个就可以满足需求了
      const { column } = this.params
      const option = column.filters[0]
      this.column = column
      this.option = option
    },
    changeOptionEvent () {
      const { params, option } = this
      const { $panel } = params
      const checked = !!option.data
      $panel.changeOption(null, checked, option)
    },
    keyupEvent ({ $event }) {
      const { params } = this
      const { $panel } = params
      if ($event.keyCode === 13) {
        this.$parent.$parent.clearCheckboxRow()
        $panel.confirmFilter()
      }
    },
    resetFilterEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    }
  }
}
</script>

<style scoped>
.my-filter-input {
  padding: 10px;
}
.my-filter-input .my-fc-footer button {
  padding: 0 5px;
  margin-left: 10px;
  background: none;
  border:none;
  font-size:12px;
}
.my-filter-input .my-fc-footer button:nth-child(1){
  color: #606266;
}
</style>
