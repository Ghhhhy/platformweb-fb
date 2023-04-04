<!--  EditDownIntervar   Author:Titans@2396757591@qq.com -->
<template>
  <div class="edit-input-intervar" @click.stop>
    <div class="fn-inline input-intervar input-intervar-left">
      <vxe-input
        v-if="editable"
        v-model="data[property[0]]"
        class="edit-down-input"
        :readonly="readonly"
        :type="dataType"
        :placeholder="prevPlaceholder"
        :transfer="true"
        :disabled-method="(obj) => { return disabledDateMethod(obj,'prev') }"
        @change="onInputchange('prev')"
      />
      <span v-if="!editable">{{ data[property[0]] }}</span>
    </div>
    <div class="fn-inline text-intervar">至</div>
    <div class="fn-inline input-intervar input-intervar-right">
      <vxe-input
        v-if="editable"
        v-model="data[property[1]]"
        class="edit-down-input"
        :readonly="readonly"
        :type="dataType"
        :disabled-method="(obj) => { return disabledDateMethod(obj,'next') }"
        :placeholder="nextPlaceholder"
        :transfer="true"
        @change="onInputchange('next')"
      />
      <span v-if="!editable">{{ data[property[1]] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditIntervar',
  props: {
    editable: {
      // 编辑还是仅仅展示
      type: Boolean
    },
    value: {
      // 选中的值 node,其中当为普通树时必须为node节点对象而非id
      type: [String, Object],
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'table' // form
    },
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    constProps: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: {},
      property: '',
      defaultProps: {
        format: 'YYYY-MM-DD', // 时间格式化
        type: 'date', // 类型
        interval: 0, // 间隔
        readonly: false,
        placeholder: '请选择' // 提示
      },
      readonly: true,
      dataType: 'date', // 当前类型
      prevProps: {}, // 前一个props
      nextProps: {}, // 后一个props
      interval: 0, // 相隔最小间断 若为时间为 值为ms
      format: 'YYYY-MM-DD', // 时间格式化
      disableDateType: ['date', 'datetime', 'week', 'month', 'year'], // 禁用类型
      numberDataType: ['number', 'float', 'integer'], // 数字类型值
      prevPlaceholder: '开始值', // 前一个提示
      nextPlaceholder: '结束值', // 后一个提示
      placeholderTypeMap: {
        // 选择类型映射
        date: '日期',
        datetime: '时间',
        week: '周',
        month: '月份',
        year: '年份',
        number: '值',
        float: '值',
        integer: '值'
      }
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      if (this.type === 'table') {
        const { row, column } = this.params
        this.data = row
        this.property = column.property
      } else {
        const { property, data } = this.params
        this.data = data
        this.property = property
      }
      this.propertyField = this.property
      this.property = this.property.split('##')
      this.initProps()
    },
    initProps() {
      this.defaultProps = Object.assign({}, this.defaultProps, this.constProps)
      const {
        format,
        type,
        interval,
        readonly,
        placeholder
      } = this.defaultProps
      this.dataType = type
      this.interval = interval
      this.format = format
      this.readonly = readonly
      this.prevPlaceholder = (placeholder + '').split('##')[0]
      this.nextPlaceholder = (placeholder + '').split('##')[1]
    },
    disabledDateMethod({ date, type, actionType }, disabledType) {
      // 时间禁选回调
      let result = false
      const { interval, property, data, dataType, disableDateType } = this
      let prevValue = data[property[0]]
      let nextValue = data[property[1]]
      // eslint-disable-next-line eqeqeq
      let prevValueF = new Date(prevValue) != 'Invalid Date' && new Date(prevValue)
      // eslint-disable-next-line eqeqeq
      let nextValueF = new Date(nextValue) != 'Invalid Date' && new Date(nextValue)
      if (disableDateType.indexOf(dataType) >= 0) {
        if (disabledType === 'next') {
          if (prevValueF && date.getTime() >= (prevValueF.getTime() + (interval))) {
            result = false
          } else if (!prevValueF) {
            result = false
          } else {
            result = true
          }
        } else {
          if (nextValueF && date.getTime() <= (nextValueF.getTime() - (interval))) {
            result = false
          } else if (!nextValueF) {
            result = false
          } else {
            result = true
          }
        }
      } else {
        result = true
      }
      return result
    },
    showToolTip(content, type = 'showToolTip') {
      // 展示提示
      this.$message({
        message: content,
        type: type
      })
    },
    onInputchange(type) {
      // change事件
      let prevValue = this.data[this.property[0]]
      let nextValue = this.data[this.property[1]]
      const { interval } = this
      if (this.disableDateType.indexOf(this.dataType) >= 0) {
        if (
          (new Date(prevValue).getTime() + interval) <= (new Date(nextValue)).getTime()
        ) {
          this.emitValue()
        } else if (prevValue && nextValue) {
          if (type === 'next') {
            this.showToolTip(`结束${this.placeholderTypeMap[this.dataType]}不能小于开始${this.placeholderTypeMap[this.dataType]}！`)
          } else {
            this.showToolTip(`开始${this.placeholderTypeMap[this.dataType]}不能大于结束${this.placeholderTypeMap[this.dataType]}！`)
          }
        } else {
          this.emitValue()
        }
      } else if (this.numberDataType.indexOf(this.dataType) >= 0) {
        if (
          (new Date(prevValue).getTime() + interval) <= (new Date(nextValue)).getTime()
        ) {
          this.emitValue()
        } else if (prevValue && nextValue) {
          if (type === 'next') {
            this.showToolTip(`结束${this.placeholderTypeMap[this.dataType]}不能小于开始${this.placeholderTypeMap[this.dataType]}！`)
          } else {
            this.showToolTip(`开始${this.placeholderTypeMap[this.dataType]}不能大于结束${this.placeholderTypeMap[this.dataType]}！`)
          }
        } else {
          this.emitValue()
        }
      } else {
        this.emitValue()
      }
    },
    emitValue() {
      // 更新值
      let prevValue = this.data[this.property[0]]
      let nextValue = this.data[this.property[1]]
      this.data[this.propertyField] = prevValue + '##' + nextValue
      this.value = prevValue + '##' + nextValue
      this.$emit('input', this.prevValue + '##' + this.nextValue)
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.load()
      },
      immediate: true
    },
    type: {
      handler() {

      },
      immediate: true
    },
    constProps: {
      handler(newVal, oldVal) {
        this.load()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.edit-input-intervar {
  width: 100%;
  text-align: center;
  display: flex;
  .fn-inline{
    line-height:34px;
  }
  .input-intervar-left {
    text-align: right;
  }
  .input-intervar-right {
    text-align: left;
  }
  .input-intervar {
    flex: 1;
    .vxe-input {
      background: transparent;
    }
  }
  .text-intervar {
    width: 30px;
  }
}
</style>
