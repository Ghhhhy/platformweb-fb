<!--
 * @Description: 模态框穿梭组件
 * @Author: Comer
 * @Date: 2022-04-06 10:24:46
 * @LastEditors: Comer
 * @LastEditTime: 2022-04-07 15:03:40
-->
<template>
  <vxe-modal
    v-model="visible"
    :title="configIn.modalTitel"
    width="800"
    height="auto"
    remember
    transfer
    :destroy-on-close="true"
    @close="onClose"
  >
    <div class="tansfer-wrap">
      <el-transfer
        ref="transfer"
        v-model="value"
        :data="originData"
        :filter-placeholder="configIn.placeholder"
        :props="configIn.transferProps"
        :titles="configIn.titles"
        :target-order="configIn.targetOrder"
        :filterable="configIn.filterable"
        :left-default-checked="leftDefaultCheckedKeysIn"
        :right-default-checked="rightDefaultCheckedKeys"
        @change="onChange"
        @left-check-change="onLeftCheckChange"
        @right-check-change="onRightCheckChange"
      />
      <div class="tansfer-toolbar__wrap">
        <div class="fn-inline tansfer-custom__slot">
          <slot name="custom-toolbar"></slot>
        </div>
        <div v-if="configIn.isShow" class="fn-inline inner-time">
          <span class="tip">
            <span class="tip-red">*</span>
            <span class="tip-text">{{ configIn.innerTimeConfig.timeTip }}</span>
          </span>
          <el-select v-if="configIn.loop === 'quarter'" v-model="configIn.innerTimeConfig.curMonth" clearable placeholder="请选择" class="inner-month">
            <el-option
              v-for="(item, index) in configIn.innerTimeConfig.month"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="configIn.innerTimeConfig.curDay" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in configIn.innerTimeConfig.day"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-time-picker
            v-model="configIn.innerTimeConfig.time"
            placeholder="请选择"
          />
        </div>
        <div class="fn-inline group-btns fr">
          <vxe-button size="medium" content="中等尺寸" @click="onClose">关闭</vxe-button>
          <vxe-button type="submit" status="primary" size="medium" @click="onSave">保存</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>

<script>
export default {
  name: 'BsModalTransfer',
  props: {
    // 默认右侧值
    originValue: {
      type: Array,
      default() {
        return []
      }
    },
    transferModalVisibel: {
      // 是否打开穿梭模态框
      type: Boolean,
      default: true
    },
    sourceData: {
      // 数据源
      type: Array,
      default() {
        return []
      }
    },
    leftDefaultCheckedKeys: {
      // 初始状态下左侧列表的已勾选项的 key 数组
      type: Array,
      default() {
        return []
      }
    },
    rightDefaultCheckedKeys: {
      // 初始状态下右侧列表的已勾选项的 key 数组
      type: Array,
      default() {
        return []
      }
    },
    config: {
      // 穿梭框配置
      type: Object,
      default() {
        return {}
      }
    },
    filterMethod: { // 多选情况下勾选触发，回调
      type: Function,
      default: function(query, item) {}
    }
  },
  data() {
    return {
      value: this.originValue,
      originData: [...this.sourceData],
      visible: this.transferModalVisibel,
      leftDefaultCheckedKeysIn: [], // 默认展开树的主键
      rightDefaultCheckedKeysIn: [], // 默认勾选的节点的 key 的数组
      configIn: {
        isShow: true, // 是否显示内置的时间设置
        loop: 'quarter', // 按季度：quarter  按月：month
        filterable: true, // 是否可搜索
        targetOrder: 'original', // 若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前
        placeholder: '请输入搜索内容', // 搜索框提示
        titles: ['列表 1', '列表 2'],
        modalTitel: '任务',
        transferProps: {
          key: 'key',
          label: 'label',
          disabled: 'disabled'
        },
        format: {
          /* eslint-disable-next-line */
          noChecked: '${checked}/${total}',
          /* eslint-disable-next-line */
          hasChecked: '${checked}/${total}'
        },
        innerTimeConfig: {
          timeTip: '报送截止时间',
          curMonth: '1',
          curDay: '1',
          month: [
            { value: '1', label: '第一个月' },
            { value: '2', label: '第二个月' },
            { value: '3', label: '第三个月' },
            { value: '4', label: '第四个月' }
          ],
          day: [],
          time: new Date()
        }
      }
    }
  },
  methods: {
    /**
     * @description: 右侧列表元素变化时触发
     * @Author: Comer
     * @Date: 2022-04-06 15:36:49
     * @param {*} curVal
     * @param {*} direction
     * @param {*} movedKeys
     * @return {*}
     */
    onChange(curVal, direction, movedKeys) {
    },

    /**
     * @description: 左侧列表元素被用户选中 / 取消选中时触发
     * 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组
     * @Author: Comer
     * @Date: 2022-04-06 15:45:23
     * @param {*} keys
     * @param {*} changeKeys
     * @return {*}
     */
    onLeftCheckChange(keys, changeKeys) {
    },

    /**
     * @description: 右侧列表元素被用户选中 / 取消选中时触发
     * 当前被选中的元素的 key 数组、选中状态发生变化的元素的 key 数组
     * @Author: Comer
     * @Date: 2022-04-06 15:45:23
     * @param {*} keys
     * @param {*} changeKeys
     * @return {*}
     */
    onRightCheckChange(keys, changeKeys) {
    },

    /**
     * @description: 过滤数据
     * @Author: Comer
     * @Date: 2022-04-07 14:52:49
     * @param {*} source
     * @param {*} target
     * @return {*}
     */
    filterData(source = [], target = []) {
      return source.filter(item => {
        return !!target.includes(item.key)
      })
    },

    /**
     * @description: 点击保存按钮
     * @Author: Comer
     * @Date: 2022-04-06 15:37:57
     * @param {*}
     * @return {*}
     */
    onSave() {
      let data = this.deepCopy(this.filterData(this.sourceData, this.value))
      const month = this.configIn.innerTimeConfig.curMonth
      const day = this.configIn.innerTimeConfig.curDay
      const d = this.configIn.innerTimeConfig.time
      const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      // 如果用的是组件预设时间控件，则将其一起返回给父组件
      if (this.configIn.isShow && (!month || !day || !time)) {
        this.$message.error('请选择报送截止时间')
        return false
      }

      const confirmData = {
        month,
        day,
        time,
        data
      }

      this.$emit('tansferComfirm', confirmData)
      // 初始状态恢复
      this.onClose()
    },

    /**
     * @description: 关闭模太框
     * @Author: Comer
     * @Date: 2022-04-06 15:41:19
     * @param {*}
     * @return {*}
     */
    onClose() {
      this.visible = false
      this.clear()
      this.$emit('update:transferModalVisibel', this.visible)
    },

    /**
     * @description: 初始化数据
     * @Author: Comer
     * @Date: 2022-04-07 09:29:19
     * @param {*}
     * @return {*}
     */
    initData() {
      this.configIn.innerTimeConfig.day = this.generateDays()
    },

    /**
     * @description: 深拷贝通用方法
     * @Author: Comer
     * @Date: 2022-04-06 15:23:46
     * @param {*} obj
     * @return {*}
     */
    deepCopy(obj) {
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },

    /**
     * @description: 生成内置日期
     * @Author: Comer
     * @Date: 2022-04-07 09:30:14
     * @param {*}
     * @return {*}
     */
    generateDays() {
      let days = []
      for (let i = 1; i <= 31; i++) {
        let day = {
          label: `${i}日`,
          value: `${i}`
        }
        days.push(day)
      }
      return days
    },

    /**
     * @description: 返回穿梭框对象，提供直接操作穿梭框API能力
     * @Author: Comer
     * @Date: 2022-04-06 14:55:23
     * @param {*}
     * @return {*}
     */
    transferOptionFn() {
      return this.$refs.transfer
    },

    /**
     * @description: 清除
     * @Author: Comer
     * @Date: 2022-04-06 15:30:08
     * @param {*}
     * @return {*}
     */
    clear() {
      this.leftDefaultCheckedKeysIn = []
      this.rightDefaultCheckedKeysIn = []
      this.$refs.transfer.clearQuery('left')
      this.$refs.transfer.clearQuery('right')
      this.configIn = Object.assign(this.configIn, this.config)
      this.originData = []
      this.value = []
    },

    /**
     * @description: 自定义搜索方法
     * @Author: Comer
     * @Date: 2022-04-06 15:30:31
     * @param {*} query
     * @param {*} item
     * @return {*}
     */
    onFilterMethod(query, item) {
      if (this.filterMethod) {
        return this.filterMethod(query, item)
      }
    }

  },
  created() {

  },
  mounted() {
  },
  watch: {
    transferModalVisibel(val) {
      this.visible = val
      this.value = this.originValue
      this.configIn = Object.assign(this.configIn, this.config)
    },
    value: {
      handler(val) {
        this.value = val
      },
      deep: true,
      immediate: true
    },
    leftDefaultCheckedKeys: {
      handler(val) {
        this.leftDefaultCheckedKeysIn = val
      },
      deep: true,
      immediate: true
    },
    rightDefaultCheckedKeys: {
      handler(val) {
        this.rightDefaultCheckedKeysIn = val
      },
      deep: true,
      immediate: true
    },
    sourceData: {
      handler(val) {
        if (Array.isArray(val)) {
          this.originData = [...val]
        }
      },
      deep: true,
      immediate: true
    },
    config: {
      // 穿梭框 配置
      handler(val) {
        this.configIn = Object.assign(this.configIn, this.config)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style  lang="scss">
  .tansfer-wrap {
    .el-transfer {
      .el-transfer-panel__list.is-filterable {
        height: 240px;
      }
      .el-transfer-panel {
        width: 320px;
        .el-transfer-panel__body {
          height: 300px;
        }
      }
      .el-transfer__buttons {
        .el-button {
          padding: 6px 17px;
        }
      }

    }

    .el-transfer__buttons {
      padding: 0 10px;
    }
  }

  .tansfer-toolbar__wrap {
    padding: 15px 0;
    position: relative;
    .el-select {
      margin-right: 15px;
      .el-input__inner {
        height: 32px;
        line-height: 32px;
        width: 80px;
      }
      .el-input__suffix {
        top: 4px;
      }
    }
    .inner-month {
      .el-input__inner {
        width: 110px;
      }
    }
    .inner-time {
      .tip {
        margin-left: -4px;
        margin-right: 25px;
        position: relative;
        .tip-red {
          color: red;
        }
      }
    }

    .el-date-editor.el-input {
        width: 200px;
    }

    .el-input__inner {
      height: 32px;
      line-height: 32px;
      width: 200px;
    }
    .el-input__prefix, .el-input__suffix {
      top: -3px;
    }
  }
</style>
