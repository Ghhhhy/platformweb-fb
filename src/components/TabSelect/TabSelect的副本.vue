<template>
  <div class="tab-select__con">
    <div v-if="isRenderTab" class="tab-select-con-list fn-inline">
      <ul>
        <li class="fn-inline pointer">
          <el-button class="fn-inline olh" title="指标额度">
            <!-- <i
              class="fn-inline base-font btn-icon base-edu"
            ></i> -->
            <img src="./img/base-zhibaio.png" class="prefix-btn-icon">
            <span>指标额度</span>
          </el-button>
        </li>
        <li class="fn-inline pointer">
          <el-select v-model="value" placeholder="请选择" class="fn-inline olh">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
            <template v-slot:prefix>
              <img src="./img/base-daiban.png" class="prefix-btn-icon">
            </template>
          </el-select>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TabSelect',
  props: {
    showNum: {
      type: Boolean
    },
    showZero: {
      type: Boolean
    },
    tabList: {
      type: [Array, Object],
      default() {
        return []
      }
    },
    defaultSelect: {
      type: [Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isRenderTab: false,
      tabListCp: [],
      tabListIn: [],
      curTabSelect: {}
    }
  },
  methods: {
    getbasicDataType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    init() {
      this.tabListCp = this.deepCopy(this.tabList) // 修复上面的深度copy 方法丢失问题
      this.tabListIn = this.tabListCp
    },
    deepCopy(obj) {
      // 深拷贝通用方法
      // var new_arr = JSON.parse(JSON.stringify(arr)) // 不仅可拷贝数组还能拷贝对象（ 但不能拷贝函数）
      // 只拷贝对象
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      // 根据obj的类型判断是新建一个数组还是一个对象
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        // 遍历obj,并且判断是obj的属性才拷贝
        if (obj.hasOwnProperty(key)) {
          // 判断属性值的类型，如果是对象递归调用深拷贝
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    onTabElClick(obj, index) {
      if (
        this.getbasicDataType(this.curTabSelect) === 'Object' &&
        obj.label !== this.curTabSelect.label
      ) {
        this.curTabSelect = Object.assign({}, obj)
        this.$emit('onTabClick', obj)
      }
    }
  },
  created() {

  },
  mounted() {
    this.isRenderTab = true
    this.init()
  },
  watch: {
    tabList: {
      handler() {
        this.init()
      },
      deep: true,
      immediately: true
    },
    defaultSelect: {
      handler(newVal) {
        this.onTabElClick(newVal)
      },
      immediately: true
    }
  }
}
</script>

<style  lang="scss">
  .tab-select-con-list{
    font-size: 0;
    .btn-icon{
      color: #2A8BFD;
      font-size: 20px;
      margin-top: -1px;
      margin-right: 4px;
    }
    .prefix-btn-icon{
      width: 21px;
      height: 21px;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 5px;
    }
    button{
      color: #2E3133;
      letter-spacing: 0;
      text-align: center;
      font-size: 16px;
      font-weight: 400;
      padding: 14px 24px;
      box-sizing: border-box;
      height: 48px;
      border-radius: unset;
      max-width: 300px;
    }
    .el-input__prefix{
      left: 24px;
      display: flex;
      justify-content: center;
      padding: 16px 0;
      height: 16px;
    }
    .el-input__suffix{
      right: 24px;
    }
    .el-input--suffix .el-input__inner{
      height: 48px;
      line-height: 48px;
      padding-left: 55px;
      font-size: 16px;
      border-radius: unset;
      color: var(--primary-color);
    }
    .el-select .el-input .el-select__caret{
      color: var(--primary-color);
    }
  }

</style>
