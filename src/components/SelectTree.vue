<template>
  <el-select
    ref="selectRef"
    :value="value"
    placeholder="财政区划"
    clearable
    size="small"
    style="width: 100%;"
    @visible-change="visibleChange"
    @clear="clear"
  >
    <el-option
      ref="optionRef"
      class="option"
      :value="optionData.id"
      :label="optionData.name"
      @focus="inputFocus"
    >
      <el-input
        v-if="filter"
        v-model="filterText"
        placeholder="输入关键字进行过滤"
      />
      <el-tree
        ref="treeRef"
        class="tree"
        :node-key="nodeKey"
        :data="data"
        :props="props"
        :default-expanded-keys="[value]"
        highlight-current
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </el-option>
  </el-select>

</template>

<script>
import { defineComponent, reactive, watch, ref, unref, nextTick } from '@vue/composition-api'
export default defineComponent({
  props: {
    // v-model绑定
    value: {
      type: [String, Number],
      default: ''
    },
    // 树形的数据
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: [String, Number],
      default: 'code'
    },
    filter: {
      type: Boolean,
      default: false
    },
    // tree的props配置
    props: {
      type: Object,
      default: function () {
        return {
          label: 'label',
          children: 'children'
        }
      }
    }
  },
  setup(props, { emit }) {
    const filterText = ref('')
    const optionData = reactive({
      id: '',
      name: ''
    })
    const [selectRef, optionRef, treeRef] = [ref(null), ref(null), ref(null)]
    // 是否为空
    const isEmpty = (val) => {
      for (let key in val) {
        return false
      }
      return true
    }
    // 树节点点击
    const handleNodeClick = (data) => {
      emit('input', data[props.nodeKey])
      selectRef.value.visible = false
    }
    // 过滤回调
    const filterNode = (value, data) => {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
    // 初始化
    const init = (val) => {
      if (val) {
        nextTick(() => {
          treeRef.value?.setCurrentKey(val)
          const node = treeRef.value?.getNode(val)
          optionData.id = val
          optionData.name = node.label
        })
      } else {
        treeRef.value?.setCurrentKey(null)
      }
    }
    // 树的显隐改变
    const visibleChange = (e) => {
      if (e) {
        let selectDom = treeRef.value?.$el.querySelector('.is-current')
        setTimeout(() => {
          selectRef.value?.scrollToOption({ $el: selectDom })
        }, 0)
      }
    }
    // 过滤数据框聚焦
    const inputFocus = () => {
      selectRef.value.visible = true
    }
    // 清除
    const clear = () => {
      emit('input', '')
    }
    // 监听默认值
    watch(() => props.value, (val) => {
      if (!isEmpty(props.data)) {
        init(val)
      }
    }, { immediate: true })
    // 监听数据源
    watch(() => props.data, (val) => {
      if (!isEmpty(val)) {
        init(props.value)
      }
    }, { immediate: true })
    // 监听过滤
    watch(filterText, (val) => {
      treeRef.value?.filter(unref(val))
    })
    return {
      optionData,
      selectRef,
      optionRef,
      treeRef,
      visibleChange,
      clear,
      handleNodeClick,
      filterNode,
      filterText,
      inputFocus
    }
  }
})
</script>

<style lang="scss" scoped>
.option {
  height: auto;
  line-height: 1;
  padding: 0;
  background-color: #fff;
}

.tree {
  padding: 4px 20px;
  height: auto;
  font-weight: 400;
}
</style>
