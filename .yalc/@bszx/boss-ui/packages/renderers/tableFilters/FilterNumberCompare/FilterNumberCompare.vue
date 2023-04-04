<template>
  <div class="my-filter-compare">
    <div class="my-fc-value">
      <vxe-input v-model="option.data.minValue" type="text" placeholder="输入最小值" @input="changeOptionEvent" />
    </div>
    <div class="my-fc-value">
      <vxe-input v-model="option.data.maxValue" type="text" placeholder="输入最大值" @input="changeOptionEvent" />
    </div>
    <div class="my-fc-footer">
      <vxe-button status="primary" @click="confirmEvent">确认</vxe-button>
      <vxe-button @click="resetEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterNumberCompare',
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
      size: 'mini', // 被所有子组件继承 size
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
      const checked = !!(option.data.maxValue && option.data.minValue)
      $panel.changeOption(null, checked, option)
    },
    confirmEvent () {
      const { $panel } = this.params
      $panel.confirmFilter()
    },
    resetEvent () {
      const { $panel } = this.params
      $panel.resetFilter()
    }
  }
}
</script>

<style scoped>
.my-filter-compare {
  padding: 10px;
  user-select: none;
}
.my-filter-compare .my-fc-value {
  position: relative;
  padding: 5px 0;
}
.my-filter-compare .my-fc-footer {
  text-align: center;
}
</style>
