<template>
  <div class="search-wrapper-fix-top">
    <div class="header-container">
      <el-radio-group
        v-model="currentComponent"
        size="small"
      >
        <el-radio-button
          v-for="item in moduleTabs"
          :key="item.value"
          :label="item.value"
          size="small"
          class="search-wrapper-tab"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
      <div class="search-wrapper">
        <div class="search-wrapper-left">
          <SelectTree
            v-model="treeValue"
            :data="treeData"
            :props="treeProps"
            size="small"
            style="width: 242px"
            v-on="$listeners"
          />
          <div class="deta-wrapper">
            <el-date-picker
              v-model="date"
              :clearable="false"
              format="yyyy 年 MM 月"
              value-format="timestamp"
              type="month"
              size="small"
              style="width: 250px"
              placeholder="截止时间"
              @change="dateChange"
            />
          </div>
        </div>
        <div class="search-wrapper-right">
          <span
            class="search-wrapper-right-btn search-btn"
            @click="search"
          >
            搜索
          </span>
          <span
            class="search-wrapper-right-btn reset-btn"
            @click="reset"
          >
            重置
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, unref, onMounted, watch } from '@vue/composition-api'
import SelectTree from '@/components/SelectTree'
import httpHandles from '@/api/frame/main/Monitoring/Declaration.js'
import { moduleTabs } from '../model/data'
import store from '@/store'
export default defineComponent({
  components: {
    SelectTree
  },
  props: {
    defaultDate: {
      type: [String, Number],
      default: new Date().getTime()
    },
    defaultMofDivCode: {
      type: String,
      default: ''
    },
    curComponentName: {
      type: String,
      default: ''
    }
  },
  emits: ['dateChange', 'search', 'reset'],
  setup(props, { emit }) {
    // 当前tab选中 => 对应相关模块组件
    const currentComponent = ref(moduleTabs[0].value)
    // date-picker绑定值
    const date = ref(props.defaultDate)
    // 区划树属性
    const treeProps = {
      label: 'text'
    }
    const province = store.state.userInfo.province
    // 请求区划树的属性
    const getTreeQuery = {
      elementcode: 'admdiv',
      province,
      year: '2021',
      wheresql: 'and code like \'' + province.slice(0, 2) + '%\''
    }

    // 区划树选中值<=>select值
    const treeValue = ref(props.defaultMofDivCode)
    // 区划树数据源
    const treeData = ref([])
    // date-picker改变
    const dateChange = (value) => {
      emit('dateChange', value)
    }
    // 点击搜索
    const search = () => {
      emit('search')
    }
    // 点击重置
    const reset = () => {
      date.value = props.defaultDate
      treeValue.value = props.defaultMofDivCode
      emit('reset')
    }
    onMounted(async () => {
      // 拉取区划树数据
      const res = await httpHandles.getLeftTree(getTreeQuery)
      if (res?.data) {
        treeData.value = Array.isArray(res.data) ? res.data : []
      }
    })
    watch(currentComponent, (curValue, preValue) => {
      if (curValue === preValue) return
      emit('tabChange', unref(curValue))
    })
    watch(() => props.curComponentName, () => {
      currentComponent.value = props.curComponentName
    })
    return {
      treeData,
      date,
      treeValue,
      treeProps,
      dateChange,
      search,
      reset,
      moduleTabs,
      currentComponent
    }
  }
})
</script>

<style lang='scss' scoped>
.search-wrapper-fix-top {
  position: fixed;
  top: 98px;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 99;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.08);

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 48px;
    background: #fff;
    box-sizing: border-box;
  }

  .search-wrapper-tab {
    /deep/.el-radio-button__inner {
      color: #2e3133
    }
    &.is-active /deep/.el-radio-button__inner{
      color: #fff;
      background-color: #2A8BFD;
    }
    &:first-child /deep/.el-radio-button__inner {
      border-radius: 2px 0 0 2px;
    }
    &:last-child /deep/.el-radio-button__inner {
      border-radius: 0 2px 2px 0;
    }
  }
}

.search-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  box-sizing: border-box;

  .search-wrapper-left,
  .search-wrapper-right {
    display: flex;
    align-items: center;
  }

  .search-wrapper-left {
    margin-right: 30px;
  }

  .search-wrapper-right {
    .search-wrapper-right-btn {
      display: inline-block;
      min-width: 56px;
      height: 32px;
      margin-left: 8px;
      font-size: 12px;
      line-height: 32px;
      border-radius: 2px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      box-sizing: border-box;

      &.search-btn {
        color: #fff;
        background: #2A8BFD;

        &:hover {
          background: rgba(#2A8BFD, 0.8);
        }
      }

      &.reset-btn {
        border: 1px solid rgba(204, 210, 216, 1);
        background: #FFFFFF;
        color: #2E3133;

        &:hover {
          background: rgba(#FFFFFF, 0.8);
        }
      }
    }
  }

  .deta-wrapper {
    margin-left: 16px;
  }
}
</style>
