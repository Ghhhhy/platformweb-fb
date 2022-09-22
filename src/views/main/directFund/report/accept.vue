<template>
  <vxe-modal
    ref="acceptDialog"
    v-model="dialogVisible"
    resize
    width="40%"
    height="80%"
    :position="{ top: '5%',left: '30%' }"
    transfer
    :title="title + '区划'"
    @close="closeDialog"
  >
    <div class="mmc-left-tree" style="height:calc(100% - 50px)">
      <div class="mmc-left-tree-body">
        <BsTree
          ref="acceptTree"
          open-loading
          :filter-text="acceptTreeFilterText"
          :config="acceptTreeConfig"
          :tree-data="acceptTreeData"
          :queryparams="acceptTreeQueryparams"
          @onNodeCheckChange="acceptTreeNodeCheckChange"
          @onNodeCheckClick="acceptTreeNodeCheckClick"
          @onNodeClick="acceptTreeNodeClick"
        />
      </div>
    </div>
    <div class="container-project">
      <div class="container-project-bottom">
        <div class="option-line-group" style="text-align:right!important;">
          <div class="fn-inline option-line-group-btn">
            <vxe-button status="primary" @click="doAccept">{{ title }}</vxe-button></vxe-button>
            <vxe-button @click="closeDialog">取消</vxe-button>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>

<script>
import resolveResult from '@/utils/result.js'

export default {
  name: 'CheckAuditDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    acceptType: {
      type: Number,
      default() {
        return 1
      }
    },
    curReportId: {
      type: String,
      default() {
        return 1
      }
    }
  },
  data() {
    return {
      acceptTreeConfig: {
        showFilter: true, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: 'pay-report-service/v1/payreportdata/accept/tree/' + this.acceptType // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      acceptTreeData: [],
      acceptTreeFilterText: '',
      acceptTreeQueryparams: {},
      title: '',
      currentCheck: []
    }
  },
  methods: {
    ...resolveResult,
    acceptTreeNodeCheckChange({ checked, childrenChecked, node }) {
    },
    acceptTreeNodeCheckClick({ nodes }) {
      let checks = []
      nodes.forEach(item => {
        if (item.isleaf) {
          checks.push(item.code)
        }
      })
      this.currentCheck = checks
    },
    acceptTreeNodeClick({ node }) {
    },
    showLoading() {
      return this.$loading({
        lock: true,
        text: '正在接收中...请您稍后',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },
    doAccept() {
      this.closeDialog()
      this.loadingPage = this.showLoading()
      setTimeout(() => {
        this.loadingPage.close()
        this.$XModal.message({ status: 'success', message: '接收成功!' })
      }, 3000)
      // let params = {}
      // params.mofDivCodes = this.currentCheck
      // params.actionType = this.acceptType
      // params.reportId = this.curReportId
      // this.$http.post('pay-report-service/v1/payreportdata/accept/back', params).then(res => {
      //   this.loadingPage.close()
      //   if (res) {
      //     if (res.code === '100000') {
      //       this.$XModal.message({ status: 'success', message: this.title + '成功!' })
      //       this.closeDialog()
      //     } else {
      //       this.$XModal.message({ status: 'error', message: this.title + '失败!' + res.message })
      //     }
      //   }
      // }).catch(e => {
      //   this.$XModal.message({ status: 'error', message: '勾稽审核查询失败' + e })
      //   this.loadingPage.close()
      // })
    },
    closeDialog() {
      this.$emit('update:dialogVisible', false)
    }
  },
  mounted() {
    // this.checkAuditResult()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    },
    acceptType: {
      handler(newval) {
        switch (newval) {
          case 1:
            this.title = '接收'
            break
          case 2:
            this.title = '退回'
            break
        }
      },
      immediate: true
    }
  }

}
</script>

<style scoped>
</style>
