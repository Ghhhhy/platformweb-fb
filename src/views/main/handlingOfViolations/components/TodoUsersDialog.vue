<!-- 查看待办人员-->
<template>
  <div>
    <vxe-modal
      v-model="visibles"
      v-loading="showLoading"
      style="modals"
      width="40%"
      height="90%"
      :title="title"
      :destroy-on-close="true"
      :mask-closable="false"
      @click="dialogClose"
      @close="dialogClose"
    >
      <div style="margin-bottom: 16px; height:550px">
        <BsTable
          ref="table"
          :loading="tableLoading"
          :footer-config="{ showFooter: false }"
          :tree-config="treeConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :expand-config="{
            showIcon: true,
            accordion: false,
            lazy: true,
            loadMethod: loadContentMethod,
          }"
          :toolbar-config="false"
          :pager-config="false"
        />
      </div>
      <div style="float: right;height: 50px;margin:0 15px">
        <vxe-button @click="dialogClose">关闭</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>

<script>

export default {
  name: 'TodoUsersDialog',
  props: {
    logRow: {
      type: Object,
      default() {
        return {}
      }
    },
    visible: {
      type: Boolean,
      default() { return false }
    }
  },
  data() {
    return {
      tableData: [],
      showLoading: false,
      tableConfig: {
        globalConfig: { // 全局默认渲染列配置
          // 全局配置
          checkType: false,
          seq: true
        }
      },
      // 弹窗相关配置
      title: '以下为待操作人员列表',
      // 表格配置
      tableColumnsConfig: [
        {
          title: '待办角色',
          field: 'name',
          sortable: true,
          align: 'center',
          fixed: '',
          type: 'treeNode',
          'treeNode': true
        }, {
          title: '展开详细',
          type: 'expand',
          width: 100,
          contentRender: {
            name: '$contentTable',
            props: {
              params: {}
            }
          }
        }],
      tableLoading: false
    }
  },
  computed: {
    visibles: {
      get() {
        return this.visible
      },
      set(v) {
        this.visible = v
      }
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getRoleByMenuGuid() {
      let params = {
        menuid: this.logRow.menuId,
        province: this.userInfo.province,
        year: this.userInfo.year
      }
      this.tableData = []
      this.tableLoading = true
      this.$http.get('mp-b-perm-service/v2/menuRole', params).then(res => {
        this.tableLoading = false
        const { data, rscode } = res
        if (rscode === '100000') {
          this.tableData = data || []
        } else {
          this.tableData = []
        }
      })
    },
    async loadContentMethod({ row, rowIndex, $rowIndex }) {
      let childData = []
      childData = await this.getUsersByRole(row.guid)
      return new Promise((resolve) => {
        const childCols = [
          {
            title: '待办人',
            field: 'name',
            sortable: true,
            align: 'center'
          },
          {
            title: '所属单位',
            field: 'orgname',
            sortable: true,
            align: 'center'
          },
          {
            title: '电话',
            field: 'phonenumber',
            sortable: true,
            align: 'center'
          }
        ]
        row.childCols = childCols
        setTimeout(() => {
          row.childData = childData
          resolve(true)
        }, 50)
      })
    },
    getUsersByRole(roleGuid) {
      return new Promise((resolve) => {
        this.$http.get(`mp-b-perm-service/v1/roles/users/${roleGuid}`).then(res => {
          const { data, rscode } = res
          if (rscode === '10000') {
            resolve(data)
          } else {
            resolve([])
          }
        })
      })
    },
    // 关闭弹窗
    dialogClose() {
      this.$emit('changeVisible', false)
    }
  },
  mounted() {
    this.getRoleByMenuGuid()
  },
  watch: {
  }
}
</script>
<style lang='scss' scoped>

</style>
