<!--
 * @Description:
 * @Author: chenxuanke
 * @Date: 2022-11-21 19:25:54
 * @LastEditors: chenxuanke
 * @LastEditTime: 2023-06-15 10:35:17
-->
<template>
  <div v-loading="showLoading" style="height:100%" class="unit-dis">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <!-- 页签及切换按钮 -->
      <template v-slot:topTabPane>
        <BsTabPanel
          ref="tabPanel"
          :show-num="false"
          :tab-status-btn-config="toolBarStatusBtnConfig"
          :is-open="isShowQueryConditions"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <!-- 高级查询 -->
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="advSearchFormConfig"
            :query-form-data="advSearchDataList"
            @onSearchClick="search"
            @onSearchResetClick="reset"
            @itemChange="itemChanges($event)"
          />
        </div>
      </template>
      <!-- 右侧表格展示 -->
      <template v-slot:mainForm>
        <BsTable
          ref="mainTableRef"
          :keyboard-config="{ isDel: false }"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="mainPagerConfig"
          :toolbar-config="tableToolbarConfig"
          @ajaxData="ajaxTableData"
          @onToolbarBtnClick="onToolbarBtnClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ '转移支付指标下达明细' }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <!-- 附件弹框 -->
    <BsAttachment v-if="showAttachmentDialog" refs="attachmentboss" :user-info="userInfo" :billguid="attachmentId" />
    <GlAttachment
      v-if="showGlAttachmentDialog"
      :user-info="userInfo"
      :billguid="attachmentId"
      @close="closeAttachment"
    />
    <vxe-modal
      v-model="importModalVisible"
      width="800"
      title="上传"
      @close="importModalVisible = false"
    >
      <div v-loading="showLoading" class="import-download-template-up">
        <div class="idtu-import">
          <BsUploadBak ref="myUpload" :attachment-id="attachmentId" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" />
        </div>
        <div v-if="fileName" class="idtu-importFile-tip">{{ fileName }}</div>
        <div class="idtu-import-btn">
          <vxe-button
            class="download-button-btn"
            type="primary"
            content="确定"
            @click="onImportClick"
          />
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import { proconf } from './TransferPayGiveDetails.js'
import HttpModule from '@/api/frame/main/Monitoring/Policies.js'
import GlAttachment from '../MointoringMatters/common/GlAttachment'
export default {
  components: {
    GlAttachment
  },
  data() {
    return {
      diBillId: '',
      attachmentId: '',
      fileList: [],
      fileDataBakDel: [],
      fileData: [],
      condition: {},
      userInfo: {}, // 用户信息
      fileName: '',
      importData: [], // 上传的文件内容信息
      showLoading: false, // 加载动画
      isShowQueryConditions: true, // 高级搜索展示隐藏
      showAttachmentDialog: false,
      billguid: '',
      importModalVisible: false, // 上传数据弹框开关
      showGlAttachmentDialog: false,
      advSearchFormConfig: proconf.queryConfig, // 高级搜索—配置包
      advSearchDataList: {}, // 高级搜索—数据包
      leftTreeVisible: false, // 左侧树默认显示/隐藏
      treeServerUri: 'pay-clear-service/v2/lefttree', // 左侧数据请求接口
      treeData: [],
      treeGlobalConfig: { // 左侧数 过虑input框内容
        inputVal: ''
      },
      treeQueryparams: { elementCode: 'AGENCY' }, // 左侧树 传参
      treeTypeConfig: { // 树配置
        curRadio: 'AGENCY',
        radioGroup: [
          {
            code: 'AGENCY',
            label: '预算单位'
          }
        ]
      },
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableData: [], // 表格-数据包
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: proconf.gloableOptionRow,
          $attachName: proconf.attachName

        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableColumnsConfig: proconf.tableConfig, // 表格-配置包
      // 头部工具栏 BsTabPanel config
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: proconf.toolBarStatusButtons,
        curButton: {
          type: 'button', // or
          iconName: 'base-zhibaio.png', // type: 'select',
          iconUrl: '',
          label: '未送审', // label: '代办事项',
          code: '1', // code: '14',
          curValue: '1' // curValue: '1'
        },
        buttonsInfo: proconf.statusRightToolBarButton,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      // table工具栏配置
      tableToolbarConfig: {
        disabledMoneyConversion: true,
        moneyConversion: true, // 是否有金额转换
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
      }
    }
  },
  methods: {
    // 控制高级查询是否显示
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    // table 右侧操作按钮
    onOptionRowClick({ row, optionType, rowindex }) {
      // console.log(context.$parent.$parent.$parent)
      switch (optionType) {
        // 附件
        case 'attachment':
          this.attachmentId = ''
          this.attachmentId = this.tableData[rowindex].bgtId
          this.showAttachment(row)
          break
        case 'attachName':
          this.attachmentId = ''
          this.attachmentId = this.tableData[rowindex].bgtId
          this.attachName()
          break
        default:
      }
    },
    // 查看
    attachName(row) {
      // if (row.regulationsCode === null || row.regulationsCode === '') {
      //   this.$message.warning('该数据无附件')
      //   return
      // }
      // this.billguid = row.regulationsCode
      // this.billguid = ''
      this.showGlAttachmentDialog = true
    },
    closeAttachment() {
      this.showGlAttachmentDialog = false
    },
    // 文件上传
    showAttachment() {
      console.log('文件上传')
      this.importModalVisible = true
    },
    onImportFileClick() {
      // 导入文件
      const self = this
      let inputTag = document.createElement('input')
      inputTag.setAttribute('type', 'file')
      // inputTag.setAttribute('accept', '.txt')
      inputTag.setAttribute('multiple', false)
      inputTag.click()
      inputTag.addEventListener('change', function (e) {
        const files = e.target.files
        // console.log(files)
        if (files.length > 1) {
          self.$message.warning('请上传一个文件')
          return
        }
        // let name = files[0].name.split('.')[1]
        // if (name !== 'txt') {
        //   self.$message.warning('请上传txt格式的文件')
        //   return
        // }
        let txtData = ''
        let reader = new FileReader()
        reader.readAsText(files[0])
        reader.onload = event => {
          let data = event.target.result
          txtData = data
        }
        reader.onloadend = () => {
          self.fileName = files[0].name
          self.$message.success('上传成功')
          let noEmpty = txtData.replace(/\r\n/img, '@')
          let resData = noEmpty.split(',')
          let dataKey = resData.slice(0, 11)
          let lastKey = dataKey[dataKey.length - 1].split('@')[0]
          dataKey[dataKey.length - 1] = lastKey
          let valueArr = resData.slice(10, resData.length)
          let str = []
          for (let i = 0; i < valueArr.length - 1; i++) {
            valueArr[i] = valueArr[i].split('@')
            str.push(valueArr[i])
          }
          str = str.flat(Infinity)
          str.shift()
          let counts = str.length / 11
          let sliceArr = []
          let left = 10
          let right = 21
          for (let i = 0; i < counts; i++) {
            sliceArr.push({
              left,
              right
            })
            left += 10
            right += 10
          }
          let resDataArr = []
          sliceArr.forEach(item => {
            resDataArr.push(
              resData.slice(item.left, item.right)
            )
          })
          resDataArr.forEach(item => {
            item.forEach((child, index) => {
              if (index === 0) {
                let newVal = child.split('@')[1]
                item.splice(0, 1, newVal)
              }
              if (index === item.length - 1) {
                let newVal = child.split('@')[0]
                item.splice(item.length - 1, 1, newVal)
              }
            })
          })
          console.log(resDataArr, '1')
          let resArrFinally = []
          resDataArr.forEach(item => {
            let obj = {}
            dataKey.forEach((keys, index) => {
              obj[keys] = item[index]
            })
            resArrFinally.push(obj)
          })
          console.log(resArrFinally, '2', resDataArr)
          self.importData = resArrFinally
          console.log(resArrFinally) // 数据已经处理好了。调个接口就行
        }
      })
    },
    onImportClick() {
      let data = {
        pageNum: 1,
        pageSize: 20,
        billguid: 'shfsdq' + this.attachmentId // 上海 非试点区
      }
      console.log('请求成功', this.diBillId, 'diBillId')
      this.showLoading = true
      HttpModule.reportImport(data).then(res => {
        this.showLoading = false
        if (res.code === '000000') {
          this.$message.success('请求成功！')
          this.getTableData()
          this.importModalVisible = false
        } else {
          this.$message.error('导入失败：' + res.result)
        }
      }).catch(rej => {
        this.showLoading = false
        console.log(rej)
      })
    },
    // 页签切换事件||右侧按钮点击事件触发
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
        return
      }
      // 页签切换
      switch (obj.code) {
        case '1':
          break
        case '2':
          break
        default:
          break
      }
    },
    // 右侧按钮事件触发
    operationToolbarButtonClickEvent(obj) {
      switch (obj.code) {
        case 'toolbar-upLoad':// 挂接指标
          this.upLoad()
          break
      }
    },
    upLoad() {
      if (this.$refs.mainTableRef.getSelectionData().length !== 1) {
        this.$message.warning('请选择一条数据进行附件的上传!')
        return
      }
      this.attachmentId = ''
      this.attachmentId = this.$refs.mainTableRef.getSelectionData()[0].bgtId
      this.showAttachment()
    },
    // 搜索
    search() {
      this.getTableData()
    },
    // 重置
    reset() {
      this.condition = {}
      this.advSearchDataList = {}
      this.getTableData()
    },
    // 高级搜索-失焦
    itemChanges(e) {
      this.condition = e.data
    },
    ajaxTableData({ params, currentPage, pageSize }) {
      this.mainPagerConfig.currentPage = currentPage
      this.mainPagerConfig.pageSize = pageSize
      this.getTableData()
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.reset()
          break
      }
    },
    getTableData() {
      for (let x in this.condition) {
        if (x.indexOf('__') !== -1) {
          delete this.condition[x]
        }
      }
      let data = {
        page: this.mainPagerConfig.currentPage, // 页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        ...this.condition
      }
      this.showLoading = true
      HttpModule.getTableDate(data).then(res => {
        this.showLoading = false
        if (res.rscode === '100000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
        } else {
          this.$message.error(res.message)
        }
      }).catch(rej => {
        console.log(rej)
      })
    },
    // 左侧树 过虑
    changeInput(val) {
      this.treeGlobalConfig.inputVal = val
    },
    // 隐藏左侧数
    asideChange() {
      this.leftTreeVisible = false
    },
    afterloadmethod(data) {
      if (data.length === 1 && data[0].children.length === 1 && !data[0].children[0].children) {
        this.leftTreeVisible = false
      } else {
        this.leftTreeVisible = true
      }
    },
    showInfo() {
      this.rectifyDetail = this.selectData.rectifyDetail
      this.warnType = this.selectData.warnType
      this.returnAmt = this.selectData.returnAmt
      this.transferAmt = this.selectData.transferAmt
      this.otherAmt = this.selectData.otherAmt
      this.dfrFileCode = this.selectData.dfrFileCode
      this.diBillId = this.selectData.diBillId
      if (this.title === '整改处理单') {
        this.attachmentId = this.$ToolFn.utilFn.getUuid()
      } else {
        this.attachmentId = this.selectData.dfrFileCode
      }
      if (this.attachmentId != null) {
        const param = {
          billguid: this.attachmentId,
          year: this.$store.state.userInfo.year,
          province: this.$store.state.userInfo.province
        }
        HttpModule.getFile(param).then(res => {
          if (res.rscode === '100000') {
            // 获取附件信息
            this.fileData = JSON.parse(res.data)
          } else {
            this.$message.error(res.result)
          }
        })
      }
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo
    this.getTableData()
    this.showInfo()
  }
}
</script>
<style lang='sass' scoped>

</style>
