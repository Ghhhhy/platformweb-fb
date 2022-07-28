<template>
  <div class="search-wrapper-fix-top">
    <div class="search-wrapper">
      <div class="search-wrapper-left">
        <SelectTree
          v-model="treeValue"
          :data="treeData"
          :props="treeProps"
          style="width: 242px"
        />
        <div class="deta-wrapper">
          <el-date-picker
            v-model="date"
            type="month"
            size="small"
            style="width: 250px"
            placeholder="截止时间"
          />
        </div>
      </div>
      <div class="search-wrapper-right">
        <span class="search-wrapper-right-btn search-btn">搜索</span>
        <span class="search-wrapper-right-btn reset-btn">重置</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import SelectTree from '@/components/SelectTree'
import httpHandles from '@/api/frame/main/Monitoring/Declaration.js'
import store from '@/store/index'
export default defineComponent({
  components: {
    SelectTree
  },
  setup() {
    // 当前时间戳
    const nowDate = new Date().getTime()
    // date-picker绑定值
    const date = ref(nowDate)
    // 区划树属性
    const treeProps = {
      label: 'text'
    }
    // 请求区划树的属性
    const getTreeQuery = {
      elementcode: 'admdiv',
      province: store.state.userInfo.province,
      year: store.state.userInfo.year,
      wheresql: 'and code like \'' + 61 + '%\''
    }
    // 区划树选中值<=>select值
    const treeValue = ref('')
    // 区划树数据源
    const treeData = ref([])
    const treeNodeClickHandle = () => {

    }
    onMounted(async () => {
      // 拉取区划树数据
      const res = await httpHandles.getLeftTree(getTreeQuery)
      if (res?.data) {
        treeData.value = Array.isArray(res.data) ? res.data : []
      }
    })
    return {
      treeData,
      date,
      treeValue,
      treeNodeClickHandle,
      treeProps
    }
  }
})
</script>

<style lang='scss' scoped>
.search-wrapper-fix-top {
  position: fixed;
  top: 98px;
  left: 0;
  width: calc(100% - 24px);
  padding: 13px 0 0 24px;
  box-sizing: border-box;
  background: var(--hightlight-color);
  z-index: 99;
}

.search-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 24px;
  box-sizing: border-box;
  background: #E3F1FF;

  .search-wrapper-left,
  .search-wrapper-right {
    display: flex;
    align-items: center;
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
