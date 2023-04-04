<!--
 * @Author: sunlight
 * @Mail: gonghuatao@bosssoft.com.cn
 * @Date: 2022-04-14 12:20:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-15 11:39:02
 * @Description: 项目密级期限，展现形式为将6位数(000000)拆分为年月天 => 00年00月00天
-->

<template>
  <div class="edit-down-term" @click.stop>
    <vxe-pulldown ref="xDown" class="edit-down-pulldown" :transfer="true" @hide-panel="onHidePanel">
      <template>
        <vxe-input v-model="valueStr" class="edit-down-input" readonly :disabled="configIn.disabled" @click="clickEvent" />
      </template>
      <template v-slot:dropdown>
        <div
          class="edit-down-wrapper edit-input-term"
          @click.stop
        >
          <div class="fn-inline input-term input-term-left">
            <vxe-input
              v-if="editable"
              ref="yearInput"
              v-model="year"
              class="edit-down-input"
              :readonly="configIn.yearConfig.readonly"
              :type="configIn.yearConfig.type"
              :placeholder="configIn.yearConfig.placeholder"
              :max="configIn.yearConfig.max"
              :min="configIn.yearConfig.min"
              @change="onInputchange('year')"
            />
            <span v-if="!editable">{{ year }}</span>
          </div>
          <div class="fn-inline text-term">年</div>
          <div class="fn-inline input-term input-termr-right">
            <vxe-input
              v-if="editable"
              v-model="month"
              class="edit-down-input"
              :readonly="configIn.monthConfig.readonly"
              :type="configIn.monthConfig.type"
              :placeholder="configIn.monthConfig.placeholder"
              :max="configIn.monthConfig.max"
              :min="configIn.monthConfig.min"
              @change="onInputchange('month')"
            />
            <span v-if="!editable">{{ month }}</span>
          </div>
          <div class="fn-inline text-term">月</div>
          <div class="fn-inline input-term input-termr-right">
            <vxe-input
              v-if="editable"
              v-model="day"
              class="edit-down-input"
              :readonly="configIn.dayConfig.readonly"
              :type="configIn.dayConfig.type"
              :placeholder="configIn.dayConfig.placeholder"
              :max="configIn.dayConfig.max"
              :min="configIn.dayConfig.min"
              @change="onInputchange('day')"
            />
            <span v-if="!editable">{{ day }}</span>
          </div>
          <div class="fn-inline text-term">天</div>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script>
export default {
  name: 'EditDownTerm',
  props: {
    editable: {
      // 编辑还是仅仅展示
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'table' // form
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: String,
      default: '000000'
    }
  },
  data() {
    return {
      data: {},
      property: '',
      year: '',
      month: '',
      day: '',
      configIn: {
        disabled: false,
        yearConfig: {
          min: 0,
          max: 99,
          readonly: false,
          length: 2,
          type: 'number',
          placeholder: '请填写'
        },
        monthConfig: {
          min: 0,
          max: 99,
          readonly: false,
          length: 2,
          type: 'number',
          placeholder: '请填写'
        },
        dayConfig: {
          min: 0,
          max: 99,
          readonly: false,
          length: 2,
          type: 'number',
          placeholder: '请填写'
        }
      },
      valueStr: ''
    }
  },
  watch: {
    value: {
      handler(newVal, oldVal) {
        this.initProps()
      },
      immediate: true
    }
  },
  methods: {
    initProps() {
      this.configIn = Object.assign({}, this.configIn, this.config)
      this.initValue()
    },
    initValue() {
      this.year = this.value.slice(0, 2)
      this.month = this.value.slice(2, 4)
      this.day = this.value.slice(4, 6)
      this.setTitleTip()
    },
    onInputchange(type) {
      if (this.configIn[`${type}Config`]) {
        if (this[type].length > this.configIn[`${type}Config`].length) {
          this[type] = (this[type] + '').slice(0, this.configIn[`${type}Config`].length)
        }
      }
      this.setTitleTip()
    },
    emitValue() {
      // 更新值
      const year = this.year || '00'
      const month = this.month || '00'
      const day = this.day || '00'
      const value = `${this.addZero(year)}${this.addZero(month)}${this.addZero(day)}`
      this.data[this.propertyField] = value
      this.$emit('input', value)
    },
    addZero(val = '') {
      if (Number(val) < 10) {
        return '0' + Number(val)
      }
      return val
    },
    onHidePanel() {
      // 隐藏下拉框
      // this.$emit('input', this.data[this.property])
      this.emitValue()
    },
    clickEvent() {
      this.$refs.xDown.showPanel().then(() => {
        this.$refs.yearInput.focus()
      })
    },
    setTitleTip() {
      const year = this.year || 0
      const month = this.month || 0
      const day = this.day || 0
      this.valueStr = `${this.addZero(year)}年${this.addZero(month)}月${this.addZero(day)}天`
    }
  },
  created() {
    this.initProps()
  }
}
</script>

<style lang="scss">
.edit-down-term {
  .edit-input-term {
    width: 100%;
    text-align: center;
    display: flex;
    .input-termr-left {
      text-align: right;
    }
    .input-termr-right {
      text-align: left;
    }
    .input-termr {
      flex: 1;
      .vxe-input {
        background: transparent;
      }
    }
    .text-intervar {
      width: 30px;
    }
    .edit-down-pulldown {
      width: 100%;
    }
  }

}
.edit-input-term {
  padding: 20px 10px 20px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
.edit-down-wrapper.edit-down-conditions-dropbox {
  padding: 0 10px;
  border-radius: 6px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
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
</style>
