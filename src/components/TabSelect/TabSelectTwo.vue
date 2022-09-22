<template>
  <div class="tab-select__con">
    <div v-if="isRenderTab" class="tab-select-two-con-list fn-inline">
      <ul>
        <li v-for="(item, index) in tabListIn" :key="index" class="fn-inline pointer btn-hover" :class="[curTabSelect.code === item.code ? 'active-btn' : 'no-active',item.type === 'button' ? 'button-btn' : '']" @click.stop="onTabElClick(item)">
          <!-- buton -->
          <el-button v-if="item.type === 'button'" class="fn-inline olh" :title="item.label">
            <img :src="curTabSelect.code === item.code ? item.iconUrlActive : item.iconUrl" class="prefix-btn-icon">
            <span>{{ showNum ? (showZero ? item.labelZero : item.labelNum) : item.label }}</span>
          </el-button>

          <!-- select -->
          <span v-if="(item.type === 'select') && (curTabSelect.code !== item.code)" class="select-tab__hover"></span>
          <el-select v-if="item.type === 'select'" v-model="item.curValue" placeholder="请选择" class="fn-inline olh" :change="changeOption(item)">
            <el-option v-for="(option, idx) in item.options" :key="idx" class="tab-select__two" :value="option.code" :label=" (showNum ? (showZero ? option.labelZero : option.labelNum) : `${item.label} - ${option.label}`)" />
            <template v-slot:prefix>
              <img :src="curTabSelect.code === item.code ? item.iconUrlActive : item.iconUrl" class="prefix-btn-icon">
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
      default () {
        return []
      }
    },
    defaultSelect: {
      type: [Object],
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      isRenderTab: false,
      tabListCp: [],
      tabListIn: [],
      curTabSelect: { ...this.defaultSelect },
      slectCurValueTemp: ''
    }
  },
  methods: {
    getbasicDataType(obj) {
      return Object.prototype.toString.call(obj).slice(8, -1)
    },
    init() {
      this.tabListCp = this.deepCopy(this.tabList) // 修复上面的深度copy 方法丢失问题
      this.tabListIn = this.tabListCp
      // console.log('5566', this.tabListIn, this.curTabSelect)
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
    getImageUrl() {
      this.tabListIn.forEach(item => {
        if (item.iconName) {
          item.iconUrl = require('./img/' + item.iconName)
        }
        if (item.iconNameActive) {
          item.iconUrlActive = require('./img/' + item.iconNameActive)
        }
      })
    },

    // 切换Tab的触发
    onTabElClick(obj) {
      if (
        this.getbasicDataType(this.curTabSelect) === 'Object' &&
        obj.code !== this.curTabSelect.code
      ) {
        this.slectCurValueTemp = ''
        this.curTabSelect = Object.assign({}, obj)
        if (obj.type === 'button') {
          this.$emit('onTabClick', obj)
        }
      }
    },

    // 切换select下的option触发
    changeOption(obj) {
      if (
        this.getbasicDataType(this.curTabSelect) === 'Object' &&
        obj.code !== this.curTabSelect.code
      ) {
        return
      }

      if (this.slectCurValueTemp === obj.curValue) {
        return
      }

      const curTab = Object.assign({}, obj)
      this.slectCurValueTemp = obj.curValue
      this.$emit('update:tabList', this.tabListIn)
      this.$emit('onTabClick', curTab)
    }
  },

  created() {

  },
  mounted() {
    // 加载本地图片

    // 初始化数据
    this.init()
    this.getImageUrl()
    // 开始渲染
    this.isRenderTab = true
    // 全部加载完成后，如果再调用下激活态panel
    this.$nextTick(() => {
      // this.$emit('onTabClick', this.curTabSelect)
      this.$emit('onTabAfterLoad', this.curTabSelect)
    })
  },
  watch: {
    tabList: {
      handler() {
        this.init()
        this.getImageUrl()
      },
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

<style lang="scss">
  .tab-select__two {
    font-size: 12px;
  }

  .tab-select-two-con-list {
    font-size: 0;
    margin-left: 24px;

    li {
      position: relative;
    }

    ul li:hover .el-input__inner {
      color: var(--primary-color);
    }

    ul li:nth-child(1) button {
      border-left: solid 1px #DCDFE6;
      border-bottom-left-radius: 8px;
    }

    ul li:last-child button {
      border-top-right-radius: 8px;
    }

    ul li:nth-child(1) .el-select {
      border-bottom-left-radius: 8px;
      border-left: solid 1px #DCDFE6;
    }

    ul li:last-child .el-select {
      border-top-right-radius: 8px;
    }

    .el-select .el-input .el-select__caret {
      color: #C0C4CC;
      font-size: 5px;
      -webkit-transition: -webkit-transform .3s;
      transition: -webkit-transform .3s;
      transition: transform .3s;
      transition: transform .3s, -webkit-transform .3s;
      transition: transform .3s, -webkit-transform .3s;
      -webkit-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
      cursor: pointer;
    }

    .prefix-btn-icon {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-top: -2px;
    }

    .el-select {
      box-sizing: border-box;
      height: 32px;
      border: solid 1px #DCDFE6;
      border-left: 0;
    }

    .el-button {
      height: 32px;
      border-radius: unset;
      box-sizing: border-box;
      padding: 8px 15px;
      font-size: 12px;
      font-weight: 400;
      border-left: 0;
    }

    .el-input__inner {
      border-left: 0;
    }

    .el-input__prefix {
      left: 15px;
      height: 32px;
      line-height: 32px;
    }

    .el-input__suffix {
      right: 8px;

      .el-input__icon {
        line-height: 32px;
      }
    }

    .el-input--suffix .el-input__inner {
      height: 32px;
      line-height: 32px;
      padding-left: 39px;
      padding-right: 33px;
      font-size: 12px;
      border-radius: unset;
      border: unset;
    }

    .el-button:hover {
      color: var(--tabbutton-color-active);
      opacity: 0.8;
    }

    .no-active {
      .el-input__inner {
        color: #606266;
      }

      .el-select__caret {
        color: #606266 !important;
      }
    }

    .active-btn:hover {
      opacity: 0.8;
      .el-input__inner {
        background-image: linear-gradient(0deg, var(--primary-color) 0%, var(--primary-color-anamorphism) 100%);
        color: #fff;
      }
    }

    .active-btn {
      .el-select {
        border-color: var(--tabbutton-color-active);
        box-shadow: 1px 0 0 0 var(--tabbutton-color-active);
      }

      .el-input__inner {
        background-image: linear-gradient(0deg, var(--primary-color) 0%, var(--primary-color-anamorphism) 100%);
        color: #fff;
      }

      button {
        border-color: var(--tabbutton-color-active);
        box-shadow: 1px 0 0 0 var(--tabbutton-color-active);
        background-image: linear-gradient(0deg, var(--primary-color) 0%, var(--primary-color-anamorphism) 100%);
        color: #fff;
      }

      .el-button:hover {
        color: #fff;
      }

      .el-input__suffix .el-input__icon {
        color: #fff;
      }
    }

    .select-tab__hover {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 99;
    }

    .select-tab__hover:hover {
      color: var(--primary-color);
      border-color: var(--hightlight-color);
      background-color: var(--hightlight-color);
      opacity: 0.3;
    }
  }
</style>
