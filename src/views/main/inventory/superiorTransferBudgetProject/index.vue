<template>
  <div
    class="mainReport"
    style="display:flex;
    height: 100%;
    align-items:center;
    background: #fff;
    justify-content: space-between;"
  >
    <div class="leftReport">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="leftFormItem"
        :query-form-data="leftFormItemData"
        :form-gloabal-config="formGloabalConfig"
        @onSearchClick="leftSearch"
      />
      <BsTable
        ref="leftTableRef"
        :loading="leftShowLoading"
        :table-columns-config="leftTableColumnsConfig"
        :table-data="leftTableData"
        :edit-config="false"
        :toolbar-config="tableToolbarConfig"
        :pager-config="leftPagerConfig"
        :footer-config="{ showFooter: false }"
        @checkboxChange="leftCheckChange"
        @checkboxAll="leftCheckboxAllChange"
        @ajaxData="leftAjaxData"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div class="table-toolbar-left-title">
              <span class="fn-inline">本级预算项目库项目清单</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </div>
    <div class="el-transfer__buttons">
      <div class="fcc fd_c">
        <el-button
          :disabled="rightSelections.length < 1"
          type="button"
          class="el-button el-button--primary el-transfer__button"
          style="margin-bottom: 10px;"
          @click="delectRow"
        >
          <span><i class="el-icon-arrow-left"></i></span>
        </el-button>
        <el-button
          :disabled="leftSelections.length < 1"
          type="button"
          class="el-button el-button--primary el-transfer__button"
          @click="selectRow"
        >
          <span><i class="el-icon-arrow-right"></i></span>
        </el-button>
      </div>

    </div>
    <div class="rightReport">
      <BsQuery
        ref="queryFrom"
        :query-form-item-config="rightFormItem"
        :query-form-data="rightFormItemData"
        :form-gloabal-config="formGloabalConfig"
        @onSearchClick="rightSearch"
      >
        <!-- <template #action-button-before> -->
        <!-- <vxe-button status="primary" @click="doSave">保存</vxe-button> -->
        <!-- </template> -->
      </BsQuery>
      <BsTable
        ref="rightTableRef"
        :loading="rightShowLoading"
        :table-columns-config="rightTableColumnsConfig"
        :table-data="rightTableData"
        :edit-config="false"
        :toolbar-config="tableToolbarConfig"
        :pager-config="rightPagerConfig"
        :footer-config="{ showFooter: false }"
        @checkboxChange="rightCheckChange"
        @checkboxAll="rightCheckboxAllChange"
        @ajaxData="rightAjaxData"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div class="table-toolbar-left-title">
              <span class="fn-inline">重点监督项目清单</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </div>
  </div>
</template>

<script>
import resolveResult from '@/utils/result.js'
import api from '@/api/frame/main/inventory/index.js'
import {
  leftFormItemData,
  leftFormItem,
  leftTableColumnsConfig,
  rightFormItemData,
  rightFormItem,
  rightTableColumnsConfig
} from './config/config'
export default {
  name: 'DataSource',
  components: { },
  data() {
    return {
      leftParams: {
        currentPage: 1,
        pageSize: 20
      },
      leftFormItem: leftFormItem,
      leftFormItemData: leftFormItemData,
      leftShowLoading: false,
      leftPagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      leftTableColumnsConfig: leftTableColumnsConfig,
      leftTableData: [],
      leftSelections: [],
      rightPagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      rightParams: {
        currentPage: 1,
        pageSize: 20
      },
      rightTableColumnsConfig: rightTableColumnsConfig,
      rightFormItem: rightFormItem,
      rightFormItemData: rightFormItemData,
      rightTableData: [],
      rightSelections: [],
      rightShowLoading: false,
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        refresh: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      formGloabalConfig: {
        span: 4,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 0,
        titleColon: true,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      list: [] // 右侧表格展示数据
    }
  },
  methods: {
    ...resolveResult,
    // 表格初始加载
    leftAjaxData({ params, currentPage, pageSize }) {
      this.leftPagerConfig.currentPage = currentPage
      this.leftPagerConfig.pageSize = pageSize
      this.leftParams = Object.assign(this.leftParams, {
        params,
        currentPage,
        pageSize
      })
      this.initLeftTableData()
    },
    // 初始化查询表格数据+条件查询表格数据
    initLeftTableData() {
      this.leftShowLoading = true
      let datas = Object.assign({}, this.leftParams, this.leftFormItemData)
      var _this = this
      api.upPro(datas)
        .then(res => {
          if (res.code === '000000') {
            _this.leftTableData = res.data.dataList
            _this.leftPagerConfig.total = res.data.total
          } else {
            let message = res?.msg || ''
            _this.$message.error('查询失败!' + message)
          }
        })
        .finally(() => { this.leftShowLoading = false })
      // this.leftTableData = [
      //   {
      //     proName: '测试1'
      //   },
      //   {
      //     proName: '测试2'
      //   }
      // ]
    },
    leftSearch(obj) {
      this.leftFormItemData = obj
      this.leftParams.currentPage = 1
      this.leftPagerConfig.currentPage = 1
      this.initLeftTableData()
    },
    rightAjaxData({ params, currentPage, pageSize }) {
      this.rightPagerConfig.currentPage = currentPage
      this.rightPagerConfig.pageSize = pageSize
      this.rightParams = Object.assign(this.rightParams, {
        params
      })
      this.list = this.rightTableData.slice( // 纯前端分页
        (this.rightPagerConfig.currentPage - 1) * this.rightPagerConfig.pageSize,
        this.rightPagerConfig.currentPage * this.rightPagerConfig.pageSize
      )
    },
    // 初始化查询表格数据+条件查询表格数据
    initRightTableData() {
      this.rightShowLoading = true
      let datas = Object.assign({}, this.rightFormItemData, {
        bizType: '01',
        pubFlag: '1',
        isDeleted: 2 }) // 只需传入搜索条件

      var _this = this
      api.getQuery(datas)
        .then(res => {
          if (res.code === '000000') {
            _this.rightTableData = res.data.records // 接口直接获取所有数据，使用纯前端分页
            _this.rightPagerConfig.total = res.data.total
          } else {
            let message = res?.message || ''
            _this.$message.error('查询失败!' + message)
          }
        })
        .finally(() => { this.rightShowLoading = false })
      // this.rightTableData = [
      // ]
    },
    selectRow() {
      // 去重
      this.noRepetData = this.leftSelections
      // .filter(
      // (a) => this.rightTableData.every((b) => a.objName !== b.objName)
      // )
      if (this.noRepetData?.length !== this.leftSelections?.length) {
        this.$XModal.message({ status: 'warning', message: '已过滤重复选择项' })
      }
      // this.rightTableData = [
      //   ...this.noRepetData, // 左边选择框中数据添加到右边表格前端
      //   ...this.rightTableData
      // ]
      const data = this.noRepetData.map(item => {
        return {
          fiscalYear: item.fiscalYear, //      财年
          mofDivCode: item.mofDivCode, //      财年     财政区划编码
          objCode: item.objCode, //      财年监控对象编码
          objName: item.objName, //      财年监控对象名称
          bizType: '01' //      中央专项
          // proCatCode: item.proCatCode, //      财年项目类别代码
          // proCatName: item.proCatName, //      财年项目类别名称
          // bgtDeptName: item.bgtDeptName, //      财年资金主管部门名称
          // bgtDeptCode: item.bgtDeptCode, //      财年资金主管部门代码
          // ext1: item.fundTypeCode, //      财年资金性质代码
          // ext2: item.fundTypeName//      财年资金性质名称
        }
      })
      const params = {
        data,
        isDeleted: 2
      }
      api.doSave(params).then(res => {
        this.leftSelections = []
        this.$refs.leftTableRef.clearCheckboxRow()
        this.initRightTableData()
      })
    },
    delectRow() {
      this.rightTableData = this.rightTableData.filter(
        (a) => !this.rightSelections.some((b) => a.objName === b)// 唯一标识删除
      )
      let selection = this.$refs.rightTableRef.getCheckboxRecords()
      const data = selection.map(item => {
        return {
          objId: item.objId
        }
      })
      const params = {
        data,
        isDeleted: 1
      }
      api.doSave(params).then(res => {
        this.leftSelections = []
        this.$refs.leftTableRef.clearCheckboxRow()
        this.initRightTableData()
      })
      this.rightSelections = []
      this.$refs.rightTableRef.clearCheckboxRow()
    },
    rightSearch(obj) {
      this.rightFormItemData = obj
      this.initRightTableData()
    },
    doSave() {
      console.log('save')
    },
    leftCheckChange(obj, e) {
      let curretArr = []
      obj.selection?.map(v => {
        curretArr = [
          ...curretArr,
          {
            objName: v.proName,
            objCode: v.proCode,
            fiscalYear: v.fiscalYear, //      财年
            mofDivCode: v.mofDivCode //      财年     财政区划编码

            // ext2: v.fundTypeName,
            // proCatName: v.proCatName,
            // bgtDeptName: v.bgtDeptName
          }
        ]
      })
      this.leftSelections = curretArr
    },
    leftCheckboxAllChange(obj, e) {
      let curretArr = []
      obj.records?.map(v => {
        curretArr = [
          ...curretArr,
          {
            objName: v.proName,
            objCode: v.proCode,
            ext2: v.fundTypeName,
            proCatName: v.proCatName,
            bgtDeptName: v.bgtDeptName
          }
        ]
      })
      this.leftSelections = curretArr
    },
    rightCheckChange(obj, e) {
      let curretArr = []
      obj.selection?.map(v => {
        curretArr = [
          ...curretArr,
          v.objName
        ]
      })
      this.rightSelections = curretArr
    },
    rightCheckboxAllChange(obj, e) {
      let curretArr = []
      obj.records?.map(v => {
        curretArr = [
          ...curretArr,
          v.objName
        ]
      })
      this.rightSelections = curretArr
    }
  },
  async mounted() {
  },
  created() {
    this.initLeftTableData()
    this.initRightTableData()
  // },
  // watch: {
  //   rightTableData: { // 监听右边表格数据变化，重置页码及分页数据
  //     handler(newValue, oldValue) {
  //       this.rightPagerConfig = {
  //         total: newValue?.length, // 数据长度为总数量
  //         pageSize: 20,
  //         currentPage: 1
  //       }
  //       this.list = this.rightTableData.slice( // 纯前端分页
  //         (this.rightPagerConfig.currentPage - 1) * this.rightPagerConfig.pageSize,
  //         this.rightPagerConfig.currentPage * this.rightPagerConfig.pageSize
  //       )
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  }
}
</script>

<style lang="scss" scoped>

/deep/.leftReport {
  width: 50%;
  height: 100%;
  .T-search{
    background-color: #fff;
  }
}
/deep/.rightReport {
  width: 50%;
  height: 100%;
  .T-search{
    background-color: #fff;
  }
}
/deep/.Titans-table {
    height: calc(100% - 56px);
    background: #fff;
}
/deep/.el-transfer__buttons {
  padding: 0 10px;
  display: inline-block;
  vertical-align: middle;
}
/deep/.el-button {
  padding: 6px 17px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  background: #FFF;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  font-size: 14px;
  border-radius: 4px;
}
/deep/.el-button--primary.is-disabled {
  color: #fff !important;
  background-color: var(--primary-color-shadow) !important;
  border-color: var(--primary-color-shadow) !important;
  border: 1px solid #DCDFE6;
  cursor: not-allowed;
  background-image: none;
}
/deep/span {
  font-size: 14px;
  /deep/.el-icon-arrow-left:before {
    content: "\e6de";
  }
  /deep/.el-icon-arrow-right:before {
    content: "\e6e0";
  }
}
/deep/.basicsearch-form{
  .vxe-form--item-title {
    display: block;
    font-size: 14px;
  }
}
</style>
