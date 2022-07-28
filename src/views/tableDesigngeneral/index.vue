<template>
  <div class="height-all table-design">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:mainTree>
        <div class="mmc-left-tree height-all">
          <div class="mmc-left-tree-title">
            <BsTreeSet
              :tree-config="treeConfig"
              @onAsideChange="leftVisible = false"
              @onChangeInput="changeInput"
            />
          </div>
          <div class="mmc-left-tree-body">
            <BsTree
              ref="bsTree"
              :filter-text="letftTreeFilterText"
              :config="leftTreeConfig"
              :tree-data="treeData"
              :queryparams="treeQueryparams"
              :default-expanded-keys="defaultExpandedKeys"
              :current-node-key="currentNodeKey"
              @onNodeCheckClick="onNodeCheckClick"
              @onNodeClick="onNodeClick"
              @onTreeLoaded="onTreeLoaded"
            />
          </div>
        </div>
      </template>
      <template v-slot:mainForm>
        <TableDesign
          ref="tableDesign"
          v-loading="tableDesignLoading"
          :tree-data="treeData"
          :dic-info-id="currentNodeKey"
          :dic-info-code="currentNodeCode"
          :current-node="currentNode"
          @onRefersh="refresh"
          @onBtnClick="onTableDesignBtnClick"
        >
          <template v-slot:cardLeftSlots>
            <div
              v-if="leftVisible === false"
              class="table-toolbar-contro-leftvisible"
              @click="leftVisible = true"
            ></div>
          </template>
        </TableDesign>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import TableDesign from './component/mainForm/tableDesign.vue'
import { myMethods } from './js/methods.js'
import mix from '@/mixin/commonMixin'
export default {
  name: 'TableDesignGeneral',
  mixins: [mix],
  components: {
    TableDesign
  },
  props: {},
  computed: {},
  data() {
    return {
      currentNodeCode: '',
      leftVisible: true,
      letftTreeFilterText: '',
      leftTreeConfig: {},
      treeQueryparams: {},
      defaultExpandedKeys: [],
      currentNodeKey: '',
      currentNode: {},
      treeData: [],
      tableDesignLoading: false,
      treeConfig: {
        curRadio: '',
        placeholder: '请输入报表编码或名称',
        radioGroup: []
      }
    }
  },
  methods: {

    ...myMethods
  },
  mounted() {
    this.initMounted()
  },
  created() {
    this.initCreated()
  },
  watch: {
    currentNode: {
      handler(newVal) {
      },
      deep: true,
      immediately: true
    }
  }
}
</script>

<style lang="scss">
@import './css/index.scss';
</style>
