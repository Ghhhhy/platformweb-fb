<template>
  <div class="my-filter-complex" @keydown.stop>
    <div class="my-fc-type">
      <div>
        （按单位 元 过滤）
      </div>
      <div>
        <vxe-radio v-model="option.data.type" name="fType" label="has" @change="changeTypeEvent">包含</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="eq" @change="changeTypeEvent">等于</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="gt" @change="changeTypeEvent">大于</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="lt" @change="changeTypeEvent">小于</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="ltgt" @change="changeTypeEvent">区间</vxe-radio>
        <vxe-radio v-model="option.data.type" name="fType" label="null" @change="changeTypeEvent">空值</vxe-radio>
      </div>
    </div>
    <div class="my-fc-name">
      <vxe-input
        v-model="value"
        :disabled="disabled"
        :type="option.data.dataType || 'text'"
        placeholder="请输入..."
      />
      <div v-show="regionShow" class="my-fc-name-to">至</div>
      <vxe-input
        v-show="regionShow"
        v-model="valueGt"
        :type="option.data.dataType || 'text'"
        placeholder="请输入..."
      />
    </div>
    <div class="my-fc-iscase">
      <vxe-checkbox v-model="option.data.isCase">不区分大小写</vxe-checkbox>
    </div>
    <div class="my-fc-footer">
      <vxe-button status="primary" @click="confirmEvent">确认</vxe-button>
      <vxe-button @click="resetEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterComplex',
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
      value: '', // 输入值
      valueGt: '', // 后输入框的值
      disabled: false, // 输入框禁用
      regionShow: false, // 区间输入框显示
      isltgt: false,
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
      const { cellRender, editRender } = column.own
      let render = (cellRender || editRender || { props: { type: 'text', format: 'YYYY-MM-DD' } })
      const { type, format } = render.props
      if (option.data[0]) {
        option.data = Object.assign(option.data, option.data[0].data, option.data)
      }
      option.data.format = format || option.data.format
      option.data.dataType = type || option.data.dataType
      this.column = column
      this.option = option
    },
    // 单选按钮点击事件
    changeTypeEvent () {
      this.disabled = false
      this.regionShow = false
      // 空值
      if (this.option.data.type === 'null') {
        this.disabled = true // 禁用输入框
      // 区间
      } else if (this.option.data.type === 'ltgt') {
        this.regionShow = true // 启用区间输入框
      } else {}
    },
    confirmEvent () {
      const { params, option } = this
      if (this.value && option.data.dataType === 'float') { // 为了去掉后缀，使'10.00'变为'10'，要不然过滤异常
        option.data.value = this.value.slice(0, -3)
        option.data.valuegt = this.valueGt.slice(0, -3)
      } else {
        option.data.value = this.value
        option.data.valuegt = this.valueGt
      }
      const checked = !!option.data.value || option.data.type === 'null'
      const { $panel } = params
      $panel.changeOption(null, checked, option) // 进行过滤的必要操作
      $panel.confirmFilter()
    },
    resetEvent () {
      const { params, option } = this
      const { $panel } = params
      $panel.resetFilter(option.data)
    }
  }
}
</script>

<style lang="scss">
.my-filter-complex {
  width: 375px;
  padding: 5px 15px 10px 15px;
  .my-fc-type {
    padding: 8px 0;
  }
  .my-fc-iscase {
    padding: 12px 0;
  }
  .my-fc-footer {
    text-align: center;
  }
  .my-fc-name{
    display: flex;
    .my-fc-name-to{
      width: 50px;
      text-align: center;
      line-height: 30px;
    }
  }
}

</style>
