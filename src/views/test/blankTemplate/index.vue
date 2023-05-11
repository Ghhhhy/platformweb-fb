<!--  模版   Author:ROYIANS -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :show-zero="false"
          :is-open="isShowQueryConditions"
          :tab-status-btn-config="tabStatusBtnConfig"
          :is-hide-query="false"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryForm"
            :query-form-item-config="queryFormItemConfig"
            :query-form-data="queryFormData"
            @onSearchClick="onSearchClick"
            @onSearchResetClick="onSearchResetClick"
          />
        </div>
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
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
              ref="testTree"
              open-loading
              :filter-text="letftTreeFilterText"
              :config="leftTreeConfig"
              :tree-data="treeData"
              :queryparams="treeQueryparams"
              @onNodeCheckClick="onNodeCheckClick"
              @onNodeClick="onNodeClick"
            />
          </div>
        </div>
        <div class=""></div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="bsTableRef"
          :footer-config="footerConfig"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :edit-config="editConfig"
          :toolbar-config="toolbarConfig"
          :edit-rules="editRules"
          :pager-config="pagerConfig"
          :default-money-unit="10000"
          @ajaxData="ajaxData"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftVisible = true"
              ></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ tableHeader }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <div>
    </div>
  </div>
</template>
<script>
import { myMethods } from './js/methods.js'
import mix from '@/mixin/commonMixin'
export default {
  name: 'BlankTemplate',
  mixins: [mix],
  components: {
  },
  props: {
  },
  data() {
    return {
      tabStatusBtnConfig: {},
      treeConfig: {},
      leftVisible: false,
      letftTreeFilterText: '',
      leftTreeConfig: {},
      treeData: [],
      treeQueryparams: {},
      footerConfig: {},
      tableConfig: {},
      tableColumnsConfig: [],
      tableData: [],
      editConfig: false,
      toolbarConfig: {},
      editRules: {},
      pagerConfig: {},
      tableHeader: '转移支付数据列表',
      queryFormItemConfig: [],
      queryFormData: {},
      isShowQueryConditions: true
    }
  },
  computed: {
  },
  methods: {
    ...myMethods
  },
  async mounted() {
    await this.initMounted()
  },
  created() {
    this.initCreated()
  },
  watch: {
    queryFormData: {
      handler(newval) {
        console.log(newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
