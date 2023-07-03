<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div>
          <template v-if="showFormType.show">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">疑似违规信息</div>
            <BsForm
              ref="createRef"
              class="createRef"
              :form-items-config="createConfig"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              title-align="top"
              @itemChange="itemChange"
            />
          </template>
          <template v-if="showFormType.show2">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">核实反馈信息</div>
            <BsForm
              ref="createRef2"
              class="createRef"
              :form-items-config="createConfig2"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              @itemChange="itemChange"
            />
            <!-- <div>
              <el-row>
                <el-col class="vxe-form--item-title-label" style="width:180px;text-align: right;">
                  附件：
                </el-col>
                <el-col span="16">
                  <a style="color: #1890ff; text-decoration: underline;">12313213213.jgp</a>
                </el-col>
              </el-row>
            </div> -->
          </template>
          <template v-if="showFormType.show3">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">核实认定信息</div>
            <BsForm
              ref="createRef3"
              class="createRef"
              :form-items-config="createConfig3"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              title-align="top"
              @itemChange="itemChange"
            />

          </template>
          <template v-if="showFormType.show4">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">整改反馈意见</div>
            <BsForm
              ref="createRef4"
              class="createRef"
              :form-items-config="createConfig4"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              @itemChange="itemChange"
            />
          </template>
        </div>
        <BsUploadBak
          ref="myUpload"
          :disabled="false"
          :allow-delete="false"
          :allow-download="true"
          :allow-preview="true"
          :is-upload="true"
          :attachment-id="attachmentid3"
          :file-list="fileList3"
          :file-data-bak-del.sync="fileDataBakDel3"
          :file-data.sync="fileData3"
        />
      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button status="primary" @click="doIssue">下发</vxe-button>
            <vxe-button status="primary" @click="doFeedback">确定</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import { proconf } from './createProcessing.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
// import { checkPhone } from '@/utils/index.js'
import VXETable from 'vxe-table'
export default {
  name: 'HandleDialog',
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  props: {

  },
  data() {
    return {
      tabCode: 'dcl-hsfk',
      showFormType: {
        show: true,
        show2: false,
        show3: false,
        show4: false
      },
      title: '监控处理单',
      dialogVisible: false,
      createConfig: proconf.createConfig,
      createConfig2: proconf.createConfig2,
      createConfig3: proconf.createConfig3,
      createConfig4: proconf.createConfig4,
      createValidate: {
        violateType: [
          { required: true, message: '请选择违规类型', trigger: 'change' }
        ]
      },
      createDataList: proconf.createDataList,
      attachmentid3: '',
      isCreate: true,
      showbox: false,
      fileList3: [{}],
      fileData3: [],
      fileDataBakDel3: [],
      addLoading: false,
      param5: {}
      // ----
    }
  },
  methods: {
    getAttachmentInfo(billguid) {
      let params = {
        year: this.userInfo.year,
        province: this.mofDivCode || this.userInfo.province,
        billguid: billguid
      }
      return HttpModule.getFile(params).then((res) => {
        let fileList = JSON.parse(res.data) || []
        fileList.length && fileList.forEach(element => {
          let size = element.filesize / 1024
          element.filesize = size.toFixed(2) + 'KB'
        })
        return fileList
      })
    },
    setOtherFormItem() {
      this.showFormType = {
        show: false,
        show2: false,
        show3: false,
        show4: false
      }
    },
    setFormDisabled(formItemIndexList = []) {
      if (!formItemIndexList.length) return
      formItemIndexList.forEach((formItem) => {
        this[`createConfig${formItem}`].forEach(item => {
          item.itemRender.props['disabled'] = true
        })
      })
    },
    /**
     *
     * @param {Array[string]} formItemIndexList 在data定义的表单字段list
     * @param {Array[string]} filedList 需要禁用的字段,传filed的值
     */
    setFormItemDisabled(formItemIndexList, filedList) { //
      if (!formItemIndexList.length) return
      formItemIndexList.forEach((formItem) => {
        this[`createConfig${formItem}`].forEach(item => {
          if (filedList.includes(item.field)) {
            item.itemRender.props['disabled'] = true
          } else {
            item.itemRender.props['disabled'] = false
          }
        })
      })
    },
    dialogClose() {
      this.dialogVisible = false
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'violateType' :
          this.$refs.createRef?.$refs?.form?.clearValidate?.()
          this.createDataList.violateType = itemValue
          break
        case 'handleType' :
          this.createDataList.handleType = itemValue
          break
        case 'handleResult' :
          this.createDataList.handleResult = itemValue
          break
        default :
          break
      }
    },
    getdata() {
      console.log('status1', this.status)
      let param = {
        page: this.mainPagerConfig.currentPage, // unitStatus页码
        pageSize: this.mainPagerConfig.pageSize, // 每页条数
        agencyName: this.agencyName,
        agencyCodeList: this.agencyCodeList,
        issueTime: this.issueTime,
        fiRuleName: this.fiRuleName,
        violateType: this.violateType,
        mofDivCode: this.mofDivCode || '',
        isUnit: this.param5.retroact,
        status: this.status,
        roleId: this.roleId,
        mofDivCodeList: this.codeList,
        dealNo: this.dealNo,
        isNormalDone: this.isNormalDone,
        isProcessed: this.isProcessed,
        isAgencyDone: this.isAgencyDone,
        regulationClassName: this.regulationClassName,
        warnTime: this.warnTime,
        triggerClass: this.triggerClass,
        warningLevel: this.warningLevel,
        businessModelCode: this.bussnessId || undefined,
        trackProName: this.trackProName || ''
      }
      if (this.$store.state.curNavModule.f_FullName.substring(0, 4) === '直达资金') {
        param.regulationClass = '0201'
      }

      const regulationClass = this.transJson(this.$store.state.curNavModule.param5)?.regulationClass
      if (regulationClass) {
        param.regulationClass = regulationClass
      }

      this.tableLoading = true
      HttpModule.getDetail(param).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.tableData = res.data.results
          this.mainPagerConfig.total = res.data.totalCount
          if (this.status === 1) {
            this.tabStatusNumConfig['dcl'] = res.data.totalCount
          } else if (this.status === 2) {
            this.tabStatusNumConfig['rdzc'] = res.data.totalCount
          } else if (this.status === 3) {
            this.tabStatusNumConfig['yxf'] = res.data.totalCount
            this.tabStatusNumConfig['dhs'] = res.data.totalCount
          } else if (this.status === 4) {
            this.tabStatusNumConfig['hsww'] = res.data.totalCount
          } else if (this.status === 5) {
            this.tabStatusNumConfig['yzg'] = res.data.totalCount
          } else if (this.status === 6) {
            this.tabStatusNumConfig['hsww'] = res.data.totalCount
          } else if (this.status === 7) {
            this.tabStatusNumConfig['yzg'] = res.data.totalCount
          } else if (this.status === 8) {
            this.tabStatusNumConfig['bth'] = res.data.totalCount
            this.tabStatusNumConfig['yth'] = res.data.totalCount
          }
          if (this.isAgencyDone) {
            this.tabStatusNumConfig['dsh'] = res.data.totalCount
            this.tabStatusNumConfig['dcszg'] = res.data.totalCount
          }
          if (this.isNormalDone) {
            this.tabStatusNumConfig['rdzc'] = res.data.totalCount
          }
          if (this.isProcessed) {
            this.tabStatusNumConfig['csysh'] = res.data.totalCount
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 反馈
    doFeedback() {
      let params = {
        ...this.createDataList,
        ...this.$refs.createRef.getFormData(),
        ...this.$refs.createRef2.getFormData(),
        actionType: '2',
        warningCode: '835757045368983626',
        status: '3',
        commentDept: '3',
        menuId: '1B9130A2049A40288465B5E9179B91FC' || this.$store.state.curNavModule.guid
        // ...this.$refs.createRef3.getFormData(),
        // ...this.$refs.createRef4.getFormData()
      }
      HttpModule.workFlowUpdate([params]).then(res => {
        console.log(777, res)
      })
      // if (this.phone2 && !checkPhone(this.phone2)) {
      //   this.$message.warning('请输入正确的电话号码')
      //   return
      // }
      // let param = {}
      // HttpModule.handleFeedback(param).then(res => {
      //   this.addLoading = false
      //   if (res.code === '000000') {
      //     this.$message.success('操作成功')
      //     this.$parent.dialogVisible = false
      //     this.$parent.getdata()
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    doIssue() {
      let param = {
        ...this.createDataList,
        ...this.$refs.createRef.getFormData(),
        handleType: '1',
        fiRuleCode: '0102011618',
        warnid: '835816506683002909',
        warningCode: '835816506683002908'
      }
      let params = {
        menuId: '1B9130A2049A40288465B5E9179B91FC' || this.$store.state.curNavModule.guid, // 先写死
        businessModuleCode: '7',
        dataList: [param]
      }
      this.addLoading = true
      HttpModule.handleAdd(params).then(res => {
        if (res.code === '000000') {
          this.addLoading = false
          if (res.code === '000000') {
            this.$message.success('生成并下发成功')
            this.$parent.dialogVisible = false
            this.$parent.search()
          } else {
            this.$message.error(res.message)
          }
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  watch: {
    tabCode(n) {
      if (n === 'dcl-hsfk') {
        this.setOtherFormItem()
        this.showFormType.show = true
        this.showFormType.show2 = true
      } else if (n === 'dzg-zgfk') {
        this.showFormType.show = true
        this.showFormType.show2 = true
        this.showFormType.show3 = true
        this.showFormType.show4 = true
        this.setFormDisabled([2, 3])
        this.setFormItemDisabled([4], ['chuliren', 'zhenggaishijian'])
        // this.getAttachmentInfo()
      } else if (n === 'ydsj-fqhs') {
        this.setOtherFormItem()
        this.showFormType.show = true
        this.setFormDisabled([''])
        this.setFormItemDisabled([''], ['fiRuleName', 'mofDivName', 'issueTime'])
      }
    }
  },
  created() {
    // let _this = this
    // let fileList=await this.getAttachmentInfo(this.createDataList.b)
    let fileList = this.getAttachmentInfo()
    // let fileList2=await this.getAttachmentInfo()
    VXETable.renderer.add('$customerFileRender', {
      async renderItemContent(h, { props = {} }, { data, property }) {
        console.log('customerFileRender', fileList)
        return fileList.map(item => {
          return <div>
            <a style="color: #1890ff; text-decoration: underline;">{item.filename}</a>
          </div>
        })
      }
    })
  },
  destoryed() {
    VXETable.renderer.delete('$customerFileRender')
  }
}
</script>
<style lang="scss" scoped>
 /deep/ .createRef{
  .vxe-form--item.vxe-col--24{
     .vxe-form--item-inner{
      align-items: flex-start !important;
    }
  }
  .vxe-textarea--inner[disabled]{
    background: var(--common-background) !important;
  }
}

</style>
