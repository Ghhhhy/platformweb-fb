<template>
  <div class="filter-number-range-wrapper" @keydown.stop>
    <div class="filter-number-range-content">
      <el-input
        v-model="min"
        :min="0"
        type="number"
        size="mini"
        placeholder="请输入最小值"
        style="margin-bottom: 10px"
      />
      <el-input
        v-model="max"
        :min="0"
        type="number"
        size="mini"
        placeholder="请输入最大值"
      />
    </div>
    <div class="filter-number-range-footer">
      <vxe-button status="primary" size="mini" @click="confirmHandle">确认</vxe-button>
      <vxe-button size="mini" @click="resetHandle">重置</vxe-button>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
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
      min: '', // 最小值
      max: '', // 最大值
      option: null // 传入的默认值{Object}: {data: { min, max }}
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
      const { column } = this.params
      const option = column.filters[0]
      // 经实验必须报存储传入的option引用。后续确认刷选时用此引用传入changeOption
      this.option = option
      this.min = option.data.min
      this.max = option.data.max
    },
    /**
     * 确认
     * */
    confirmHandle(event) {
      const { params, option, min, max } = this
      const [numberMin, numberMax] = [Number(min), Number(max)]
      option.data.min = numberMin
      option.data.max = numberMax

      if (!numberMax || numberMin < 0 || numberMax <= 0) {
        Message({
          type: 'warning',
          message: '请设置合理的区间',
          customClass: 'modal-layout-message' // 自定义类名，名设置z-index解决modal层级覆盖了message
        })
        return
      }
      if (numberMax <= numberMin) {
        Message({
          type: 'warning',
          message: '请设置合理的最大值',
          customClass: 'modal-layout-message' // 自定义类名，名设置z-index解决modal层级覆盖了message
        })
        return
      }

      params.$panel.changeOption(event, true, option)
      params.$panel.confirmFilter()
    },
    /**
     * 重置
     */
    resetHandle() {
      const { params, option } = this
      params.$panel.resetFilter(option.data)
    }
  }
}
</script>
<style>
</style>

<style lang="scss" scoped>
.filter-number-range-wrapper {
  width: 160px;
  padding: 10px;
}

.filter-number-range-footer {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
