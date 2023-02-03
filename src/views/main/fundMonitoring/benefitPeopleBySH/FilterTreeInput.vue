<template>
  <div class="boss-tree-filter-wrapper tree-set__content">
    <div class="fn-inline aside-tree-show-leftvisible" @click="changeAside">
      <i class="ri-indent-decrease"></i>
    </div>
    <div class="fn-inline tree-set__tip">
      <span>筛选</span>
    </div>
    <el-input
      v-model="filterTextIn"
      size="small"
      clearable
      placeholder="输入关键字按回车键过滤"
      @keyup.enter.native="enterHandle"
    />
  </div>
</template>

<script>
import { defineComponent, ref, unref, watch } from '@vue/composition-api'
export default defineComponent({
  props: {
    // 左侧是否折叠起来，默认展开
    expend: {
      type: Boolean,
      default() {
        return true
      }
    },
    filterText: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const filterTextIn = ref('')

    const leftVisible = ref(props.expend)

    /**
     * 回车
     */
    const enterHandle = () => {
      emit('search', unref(filterTextIn))
    }

    // aside状态切换
    const changeAside = () => {
      leftVisible.value = !leftVisible.value
      emit('update:expend', false)
    }

    watch(() => props.filterText, () => {
      filterTextIn.value = props.filterText
    })

    return {
      filterTextIn,
      enterHandle,
      changeAside
    }
  }
})
</script>

<style lang="scss" scoped>
.boss-tree-filter-wrapper {
  display: flex;
  align-items: center;

  .tree-set__tip {
    display: inline-block;
    flex-shrink: 0;
  }
}
</style>
