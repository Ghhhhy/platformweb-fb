<!--监控规则函数管理新增页面弹框-->
<template>
  <div style="height: 100%">
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="80%"
      height="646px"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-show="isShowQueryConditions" class="main-query">
        <BsQuery
          ref="queryFrom"
          :query-form-item-config="queryConfig"
          :query-form-data="searchDataList"
          @onSearchClick="search"
        />
      </div>
      <div v-loading="addLoading" class="payVoucherInput">
        <BsTable
          ref="addTableRef"
          height="400"
          :footer-config="false"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="false"
          @ajaxData="ajaxTableData"
        />
      </div>
      <div slot="footer" style="height: 80px; margin: 0 15px">
        <div type="flex" justify="space-around">
          <div>
            <vxe-button v-if="btnShow" status="primary" @click="doInsert">执行</vxe-button>
            <vxe-button v-if="!btnShow" status="primary" @click="goNext">确认</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
    <DetailDialog
      v-if="mofShow"
      :add-param="addParam"
    />
  </div>
</template>
<script>
// import { proconf } from '../PoliciesAndRegulationsManagement.js'
import DetailDialog from './mofDialog'
import HttpModule from '@/api/frame/main/Monitoring/Monitoring.js'

export default {
  name: 'AddDialog',
  components: {
    DetailDialog
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    functionCode: {
      type: String,
      default: ''
    },
    userInfo: {
      type: Object,
      default: function _default() {
        return {}
      }
    }
  },
  data() {
    return {
      mofShow: false,
      btnShow: true,
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [],
      tableConfig: {},
      tableColumnsConfig: [
        {
          title: '监控主题',
          field: 'regulationClassName',
          sortable: false,
          align: 'left'
        },
        {
          title: '管理级次',
          field: 'regulationType',
          sortable: false,
          width: 100,
          align: 'left',
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '系统'
              },
              {
                value: '2',
                label: '财政'
              },
              {
                value: '3',
                label: '部门'
              }
            ],
            defaultValue: '',
            props: {}
          }
        },
        {
          title: '规则名称',
          width: 333,
          field: 'fiRuleName',
          align: 'left',
          sortable: 'true'
        },
        {
          title: '预警级别',
          field: 'warnLevel',
          sortable: false,
          align: 'left',
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '黄色预警'
              },
              {
                value: '2',
                label: '橙色预警'
              },
              {
                value: '3',
                label: '红色预警'
              },
              {
                value: '4',
                label: '蓝色预警'
              }
            ],
            defaultValue: '',
            props: {}
          }
        },
        {
          title: '处理方式',
          field: 'controlType',
          sortable: false,
          align: 'left',
          cellRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '预警'
              },
              {
                value: '2',
                label: '拦截'
              },
              {
                value: '3',
                label: '冻结'
              },
              {
                value: '4',
                label: '记录'
              }
            ],
            defaultValue: '',
            props: {}
          }
        },
        {
          title: '规则模板',
          field: 'regulationModelName',
          width: 240,
          sortable: false,
          align: 'left'
        },
        {
          title: '规则说明',
          field: 'fiRuleDesc',
          width: 67,
          sortable: false,
          align: 'left'
        },
        {
          title: '启用时间',
          field: 'beginTime',
          sortable: false,
          align: 'left'
        }
      ],
      dataSourceCode: '',
      dataSourceName: '',
      dataSourceCodeoptions: [],
      functionType: '',
      functionTypeoptions: [
        { value: '1', label: '字段' },
        { value: '2', label: '自定义SQL' },
        { value: '3', label: '自定义接口' },
        { value: '4', label: '自定义校验接口' }
      ],
      functionName: '',
      functionApi: '',
      functionParameter: '',
      description: '',
      dialogVisible: true,
      addLoading: true,
      token: '',
      isContinuity: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      attachmentId: '',
      showbox: false,
      addParam: {},
      queryConfig: [
        {
          title: '监控主题',
          field: 'regulationClass',
          align: 'left',
          formula: '',
          name: '$vxeSelect',
          itemRender: {
            name: '$vxeSelect',
            options: [],
            props: {
              placeholder: '监控主题'
            }
          }
        },
        {
          title: '规则名称',
          field: 'fiRuleName',
          align: 'left',
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '规则名称'
            }
          }
        }
      ],
      searchDataList: {
        regulationClass: '',
        fiRuleName: ''
      },
      isShowQueryConditions: true,
      fiRuleName: '',
      regulationClass: ''
    }
  },
  methods: {
    // 初始化高级查询data
    getSearchDataList() {
      // 下拉树
      let searchDataObj = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
          if (item.field) {
            searchDataObj[item.field + 'code'] = ''
          }
        } else {
          if (item.field) {
            searchDataObj[item.field] = ''
          }
        }
      })
      this.searchDataList = searchDataObj
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryConfig.forEach((item) => {
        if (
          item.itemRender.name === '$formTreeInput' ||
          item.itemRender.name === '$vxeTree'
        ) {
          if (item.field) {
            if (item.field === 'cor_bgt_doc_no_') {
              condition[item.field + 'name'] = []
            } else {
              condition[item.field + 'code'] = []
            }
          }
        } else {
          if (item.field) {
            condition[item.field] = []
          }
        }
      })
      return condition
    },
    // 搜索
    search(val) {
      console.log(val)
      this.searchDataList = val
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (this.searchDataList[key] !== undefined) &
          (this.searchDataList[key] !== null)
        ) {
          if (Array.isArray(this.searchDataList[key])) {
            condition[key] = this.searchDataList[key]
          } else if (typeof this.searchDataList[key] === 'string') {
            if (this.searchDataList[key].trim() !== '') {
              this.searchDataList[key].split(',').forEach((item) => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      this.condition = condition
      // this.regulationClassName = this.condition.regulationClassName[0]
      this.regulationClass = this.condition.regulationClass[0]
      this.fiRuleName = this.condition.fiRuleName[0]
      this.getDataSourceInfo()
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.getDataSourceInfo()
    },
    dialogClose() {
      this.$parent.addDialogVisible = false
      this.$parent.queryTableDatas()
    },
    // 获取数据源列表
    getDataSourceInfo() {
      this.addLoading = true
      const param = {
        regulationClass: this.regulationClass,
        fiRuleName: this.fiRuleName,
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize // 每页条数
      }
      HttpModule.qyeryRuleList(param).then((res) => {
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          // this.tabStatusNumConfig['1'] = res.data.totalCount
          this.addLoading = false
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 选择数据源编码
    changeDataSourceCode(val) {
      console.log(val)
      this.SysparentId = val
      this.dataSourceCode = ''
      let busName = this.dataSourceCodeoptions.find((item) => {
        return item.id === val
      })
      this.dataSourceName = busName.dataSourceName
      this.dataSourceCode = busName.dataSourceCode
    },
    // 修改回显
    showInfo() {
      if (this.title === '新增') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
        return
      }
      /* HttpModule.getDetail(params).then((res) => {
        if (res.code === '000000') {
          this.functionName = res.data.functionName
          this.functionType = res.data.functionType.toString()
          this.functionApi = res.data.functionApi
          this.functionParameter = res.data.functionParameter
          this.description = res.data.description
          this.dataSourceName = res.data.dataSourceName
          this.dataSourceCode = res.data.dataSourceCode
        } else {
          this.$message.error(res.message)
        }
      }) */
      this.attachmentId =
        this.modifyData.attachment_id != null
          ? this.modifyData.attachment_id
          : this.$ToolFn.utilFn.getUuid()
      // let param = 'attachmentId=' + this.attachmentId
      /* HttpModule.getFiles(param).then((res) => {
        if (res.rscode === '200') {
          // 获取附件信息
          this.fileData = res.data.fileList
        }
      }) */
    },
    // 保存新增的计划信息
    doInsert() {
      let selectData = this.$refs.addTableRef.getSelectionData()
      if (selectData.length > 0) {
        if (selectData.length === 1) {
          if (this.title === '删除违规数据') {
            let param = {
              regulationClass: selectData[0].regulationClass,
              firulecode: selectData[0].fiRuleCode
            }
            this.addLoading = true
            HttpModule.deleteData(param).then((res) => {
              this.addLoading = false
              if (res.code === '000000') {
                this.$message.success('删除成功')
                this.$parent.addDialogVisible = false
                this.$parent.queryTableDatas()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$confirm('确定要手动执行吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let id = selectData.map((item) => {
                return item.fiRuleCode
              })
              let param = {
                ruleCodes: id,
                menuName: this.$store.state.curNavModule.name
              }
              param.fullType = this.title === '增量查询' ? 'false' : 'true'
              this.addLoading = true
              HttpModule.warnLogAdd(param).then((res) => {
                this.addLoading = false
                if (res.code === '000000') {
                  this.$message.success('新增成功')
                  this.$parent.addDialogVisible = false
                  this.$parent.queryTableDatas()
                } else {
                  this.$message.error(res.message)
                }
              })
            })
          }
        } else {
          this.$message.warning('监控规则只能选择一条！')
        }
      } else {
        this.$message.warning('请选择监控规则！')
      }
    },
    goNext() {
      let selectData = this.$refs.addTableRef.getSelectionData()
      if (selectData.length > 0) {
        if (selectData.length === 1) {
          let id = selectData.map((item) => {
            return item.fiRuleCode
          })
          let param = {
            ruleCodes: id,
            menuName: this.$store.state.curNavModule.name
          }
          param.fullType = this.title === '增量查询' ? 'false' : 'true'
          this.addParam = param
        } else {
          this.$message.warning('监控规则只能选择一条！')
          return
        }
      } else {
        this.$message.warning('请选择监控规则！')
        return
      }
      this.mofShow = true
    }
  },
  watch: {
    queryConfig() {
      this.getSearchDataList()
    }
  },
  created() {
    /* if (this.userInfo.province === '610000000') {
      this.btnShow = false
    } */
    this.getDataSourceInfo()
    this.showInfo()
  },
  mounted() {
    HttpModule.monitorTheme().then((res) => {
      if (res.code === '000000') {
        let resData = res.data.map((item) => {
          return {
            value: item.code,
            label: item.ruleName
          }
        })
        this.queryConfig[0].itemRender.options = resData
      } else {
        this.$message.error(res.message)
      }
    })
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;

  .el-card {
    margin-top: 0;
  }
}

.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}

#bigbox {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}

.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
