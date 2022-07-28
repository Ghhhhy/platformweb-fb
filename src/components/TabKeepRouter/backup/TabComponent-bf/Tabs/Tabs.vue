<!-- Author:Titans@2396757591@qq.com tabs栏-->
<template>
  <div class="tabs" :class="!ishideTabOption ? 'show-tab-option' : 'hide-tab-option'">
    <!-- <div>
      <i class="el-icon-caret-left"></i>
    </div>-->
    <div class="tabs-main fn-inline">
      <el-tabs
        type="card"
        :editable="true"
        :addable="false"
        @tab-click="onTabClick"
        @edit="onTabRemoveClick"
      >
        <el-tab-pane
          v-for="(item,index) in tabListIn"
          :key="index"
          :label="item.name"
          :name="item.name"
        >
          <!-- {{ item.content }} -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="fn-inline collect-nav"></div>
    <div v-if="!ishideTabOption" class="right-option fn-inline">
      <el-select
        v-model="rightOptionsValue"
        placeholder="页面操作"
        class="sele"
        @change="onRightOptionsChange"
      >
        <el-option
          v-for="item in rightOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tabs',
  components: {},
  props: {
    value: {
      type: Object,
      default: function() {
        return []
      }
    },
    tabList: {
      type: Object,
      default: function() {
        return {}
      }
    },
    ishideTabOption: {
      type: Boolean
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      isTabEdit: false,
      tabListIn: [],
      curTabObj: this.defaultTabObj,
      curTabIndex: 0,
      rightOptionsValue: '',
      rightOptions: [
        {
          code: 'closeOther',
          value: 'closeOther',
          label: '关闭除当前标签外其他'
        },
        {
          code: 'closeAll',
          value: 'closeAll',
          label: '关闭所有'
        },
        {
          code: 'closeCur',
          value: 'closeCur',
          label: '关闭当前'
        },
        {
          code: 'refreshCur',
          value: 'refreshCur',
          label: '刷新当前'
        }
      ],
      value1: ''
    }
  },
  methods: {
    getIndexOf(arr, name, key) {
      // 按key值获取索引
      let indexOf = -1
      if (!Array.isArray(arr)) return -1
      let someof = arr.some((item, index) => {
        indexOf = index
        return item[key] === name
      })
      if (someof) {
        return indexOf
      }
      return -1
    },
    onTabClick(obj) {
      let index = this.getIndexOf(this.tabListIn, obj.name, 'name')
      if (this.curTabIndex !== index) {
        this.curTabIndex = index
        this.curTabObj = this.tabListIn[index]
        this.$emit(
          'onTabClick',
          this.tabListIn[this.curTabIndex],
          false,
          this.curTabIndex
        )
      } else {
        this.$emit(
          'onTabClick',
          this.tabListIn[this.curTabIndex],
          true,
          this.curTabIndex
        )
      }
    },
    onTabRemoveClick(action) {
      this.isTabEdit = true
      if (action === 'remove' && this.curTabIndex >= 1) {
        let indexOf = this.getIndexOf(this.tabListIn, name, 'name')
        this.tabListIn.splice(indexOf, 1)
        if (this.tabListIn.length > 0) {
          this.curTabIndex -= 1
          this.defaultTabObj = this.tabListIn[this.curTabIndex]
        }
      }
      this.$nextTick(vm => {
        this.isTabEdit = true
      })
    },
    onRightOptionsChange(value) {
      // 下拉框执行操作
      switch (value) {
        case 'closeOther':
          this.isTabEdit = true
          this.tabListIn = this.curTabObj
          this.$nextTick(vm => {
            this.isTabEdit = true
          })
          break
        case 'closeAll':
          this.isTabEdit = true
          this.tabListIn.splice(1, this.tabListIn.length)
          this.$nextTick(vm => {
            this.isTabEdit = true
          })
          break
        case 'closeCur':
          if (this.curTabIndex >= 1) {
            this.isTabEdit = true
            this.tabListIn.splice(this.curTabIndex, 1)
            if (this.tabListIn.length > 0) {
              this.curTabIndex -= 1
              this.defaultTabObj = this.tabListIn[this.curTabIndex]
            }
            this.$nextTick(vm => {
              this.isTabEdit = true
            })
          }
          break
        case 'refreshCur':
          if (this.curTabIndex >= 0) {
            this.$emit('onTabClick', this.tabListIn[this.curTabIndex], true)
          }
          break
        default:
          console.log('default')
      }
      this.$nextTick(vm => {
        this.rightOptionsValue = ''
      })
    },
    initTab(obj, index) {
      if (obj) {
        this.onTabClick(obj)
      }
    }
  },
  mounted() {
    this.tabListIn = this.tabList
    this.onTabClick(this.tabListIn[0])
  },
  watch: {
    rightOptionsValue: {
      handler(newValue) {
        // this.onRightOptionsChange(newValue)
      },
      deep: true,
      immediate: true
    },
    value: {
      handler(newValue) {
        this.initTab(newValue)
      },
      deep: true,
      immediate: true
    },
    tabList: {
      handler(newValue) {
        this.tabListIn = this.tabList
      },
      deep: true,
      immediate: true
    },
    tabListIn: {
      handler(newValue) {
        if (this.isTabEdit) {
          this.$emit('onTabEdit', newValue)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.tabs {
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 0;
  background: #fff;
  .el-tabs__nav-wrap {
    margin-bottom: 0;
  }
  .el-tabs__header {
    margin: 0;
  }
  .right-option {
    input {
      width: 100px;
      background: #fff;
      border: 0;
      height: 30px;
      line-height: 30px;
      outline: none;
    }
  }
  .el-tabs__new-tab {
    margin: 10px 0 10px 10px;
  }
}
</style>
