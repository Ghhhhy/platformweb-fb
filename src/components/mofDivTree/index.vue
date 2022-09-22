<template>
  <BsTree
    ref="mofDivTreeRef"
    open-loading
    :config="treeConfig"
    :tree-data="treeData"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script>
import { defineComponent, watch, reactive, ref } from '@vue/composition-api'
import { deepMergeObject } from '@/utils/deepMergeObject'
import { getTreeData } from '@/api/frame/main/common'
import { Message } from 'element-ui'

export default defineComponent({
  props: {
    // BsTree配置，详细参数见BsTree内部说明
    config: {
      type: Object,
      default: null
    },
    // 请求前的钩子：可以对请求参数做修改
    beforeFetch: {
      type: Function,
      default: null
    },
    // 响应后的钩子：可以对响应结果做修改
    afterFetch: {
      type: Function,
      default: null
    }
  },
  setup(props, { root }) {
    const store = root.$store

    // 树ref实例
    const mofDivTreeRef = ref(null)

    // 树的数据源
    const treeData = ref([])

    // 内部初始化默认配置参数；更多属性配置属性可参考BsTree内部config
    const treeConfig = reactive({
      showFilter: false,
      valueKeys: ['code', 'name', 'id'],
      format: '{code}-{name}',
      treeProps: {
        // 树配置选项
        labelFormat: '{code}-{name}', // {code}-{name}
        nodeKey: 'code', // 树的主键
        label: 'name', // 树的显示lalel字段
        children: 'children' // 树的嵌套字段
      }
    })

    // 接口请求所需参数
    let treeQueryparams = {
      elementCode: 'admdiv',
      province: store.state.userInfo.province,
      year: store.state.userInfo.year,
      wheresql: 'and province =' + store.state.userInfo.province
    }

    /**
     * 刷新树（主要提供父组件调用）
     * @description 因当前组件在BsTree组件二次封装，项目中各个页面需要调用BsTree.refreshTree()，避免较多的侵入性修改各个页面逻辑部分；
     * 故此做一次代理，此方法内部调用BsTree.refreshTree()
     */
    function refreshTree() {
      mofDivTreeRef.value?.refreshTree()
    }

    /**
     * 获取BsTree组件实例
     * @returns {*}
     */
    function getTreeInstance() {
      return mofDivTreeRef.value
    }

    /**
     * 更新树的数据源
     * @returns {Promise<void>}
     */
    async function getMofDivTreeData() {
      const { beforeFetch, afterFetch } = props
      try {
        if (beforeFetch && beforeFetch instanceof Function) {
          treeQueryparams = (await beforeFetch(treeQueryparams)) || treeQueryparams
        }

        let { data } = await getTreeData(treeQueryparams)
        if (!Array.isArray(data)) return

        if (afterFetch && beforeFetch instanceof Function) {
          data = (await afterFetch(data)) || data
        }
        treeData.value = data
      } catch (e) {
        Message.error('获取树异常，请重试')
      }
    }
    getMofDivTreeData()

    watch(() => props.config, () => {
      if (!props.config) return
      deepMergeObject(treeConfig, props.config)
    }, { deep: true, immediate: true })

    return {
      treeConfig,
      mofDivTreeRef,
      treeData,
      refreshTree,
      getTreeInstance
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
