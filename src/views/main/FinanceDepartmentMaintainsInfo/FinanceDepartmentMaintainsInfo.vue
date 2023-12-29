<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <vxe-modal
      v-if="showModal"
      ref="modalForm"
      v-model="modalForm"
      :title="modalTitle"
      width="75%"
      :height="(activeNameBtm === '2' || activeNameBtm === '6') ? '79%' : '60%'"
      :show-footer="showModalFooter"
      :destroy-on-close="true"
      @close="closeModal"
    >
      <div style="overflow: auto">
        <el-tabs v-model="activeNameBtm" type="border-card">
          <el-tab-pane label="基本情况" name="1">
            <BsForm
              v-if="!isAdd"
              ref="addForm"
              :form-items-config="formItemsConfigBtm"
              :form-data-list="formDataListBtm"
              :form-validation-config="formDataListBtmRequired"
              @itemChange="BtminsertItemChange"
            />
            <BsForm
              v-if="isAdd"
              ref="addForm"
              :form-items-config="formItemsConfigBtmAdd"
              :form-data-list="formDataListBtmAdd"
              :form-validation-config="formDataListBtmRequiredAdd"
              @itemChange="BtminsertItemChange"
            />
          </el-tab-pane>
          <el-tab-pane label="项目总投资" name="3">
            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigThird"
              :form-data-list="formDataListThird"
              :form-validation-config="formDataListThirdRequired"
              @itemChange="insertItemChange"
            />
          </el-tab-pane>
          <el-tab-pane label="项目批复信息" name="4">
            <BsForm
              ref="addFormForth"
              :form-items-config="formItemsConfigForth"
              :form-data-list="formDataListForth"
              :form-validation-config="formDataListForthRequired"
            />
          </el-tab-pane>
          <el-tab-pane label="相关部门联系方式" name="5">
            <BsForm
              ref="contactInformationForm"
              :form-items-config="contactInformationFormConfig"
              :form-data-list="contactInformationFormData"
              :form-validation-config="contactInformationFormDataRequired"
            />
          </el-tab-pane>
          <el-tab-pane label="绩效目标" name="2">
            <BsForm
              ref="KPIForm"
              :form-items-config="KPIFormConfig"
              :form-data-list="KPIFormData"
              :form-validation-config="KPIFormDataRequired"
            />
            <BsTable
              ref="bgtTblRef"
              height="530"
              :table-columns-config="modalTblColumnsConfig"
              :span-method="objectSpanMethod"
              :table-data="tableData"
              :high-config="{ scrollY: { enabled: false } }"
              :pager-config="false"
              :footer-config="footerConfigs"
              :toolbar-config="tableToolbarConfigInmodal"
              @editClosed="budgetEditClose"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="6">
            <el-upload
              v-if="showModalFooter"
              ref="fileUpload"
              action="#"
              multiple
              :show-file-list="false"
              :data="uploadDFileParams"
              :on-remove="handleRemove"
              :http-request="handelUploadDebugfile"
            >
              <!-- <div class="fn-inline"> -->
              <div class="fn-inline" style="float:left;display:none;">
                <div class="footer-btn" style="margin-left: 10px; padding-left: 10px;">
                  <el-row style="display: inline-block;height: 42px;">
                    <el-col :span="16">
                      <span ref="uploadref" class="sp-my">上传附件</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div slot="tip" class="fn-inline upload-my-css" style="float:unset;">
                <div class="fn-inline" style="height:33px;float:left">
                  <span class="sp-my-two">支持png/jpg/pdf等，不超过20M</span>
                </div>
              </div>
            </el-upload>
            <BsTable
              ref="fileDataRef"
              height="460"
              :table-columns-config="modalTblColumnsConfigSx"
              :table-data="tableDataSx"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigAttach"
              @editClosed="editClosed"
            >
              <template v-slot:pagerLeftSlots>
                <div class="table-toolbar-left">
                  <div class="table-toolbar-left-title">
                    <span class="fn-inline"><span>支持png/jpg/pdf等，不超过20M</span></span>
                    <i class="fn-inline"></i>
                  </div>
                </div>
              </template>
            </BsTable>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <vxe-button @click="showModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSure">确认</vxe-button>
      </div>
    </vxe-modal>
    <vxe-modal
      v-if="showTypeModal"
      v-model="showTypeModal"
      :title="'请选择附件类型'"
      :destroy-on-close="true"
      width="300px"
      :height="'170px'"
      :show-footer="true"
      @close="showTypeModal = false"
    >
      <div style="overflow: hidden">
        <el-select v-model="filetype" style="width: 100%">
          <el-option v-for="item in fileTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div slot="footer">
        <vxe-button @click="showTypeModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSureType">确定</vxe-button>
      </div>
    </vxe-modal>
    <vxe-modal
      v-if="showAddLineModal"
      v-model="showAddLineModal"
      :title="'新增指标'"
      :destroy-on-close="true"
      width="66%"
      :height="'300px'"
      :show-footer="true"
      @close="showAddLineModal = false"
    >
      <div>
        <BsForm
          ref="addBudget"
          :form-items-config="addBudgetFormConfig"
          :form-data-list="addBudgetFormData"
          :form-validation-config="addBudgetFormDataRequired"
          @itemChange="addFormChange"
        />
      </div>
      <div slot="footer">
        <vxe-button @click="showAddLineModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="confirm">确定</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfo.js'
import { config } from './financeDepartmentMaintainsInfo'

export default {
  data() {
    return {
      menuId: '',
      modalTitle: '',
      modalForm: '',
      footerConfigs: {
        totalObj: {
          aviamt: 0
        },
        showFooter: false
      },
      activeNameBtm: '1',
      uploadDFileParams: [],
      attachmentId: '',
      fileDataBakDel: [],
      fileData: [],
      modalTblColumnsConfigSx: config().modalTblColumnsConfigSx,
      tableDataSx: [],
      showTypeModal: false,
      tableDataFv: [
        {
          name: 1
        }
      ],
      KPIFormConfig: config().KPIFormConfig,
      KPIFormData: config().KPIFormData,
      KPIFormDataRequired: config().KPIFormDataRequired,
      contactInformationFormDataRequired: config().contactInformationFormDataRequired,
      contactInformationFormConfig: config().contactInformationFormConfig,
      contactInformationFormData: config().contactInformationFormData,
      modalTblColumnsConfigFv: config().modalTblColumnsConfigFv,
      formDataListForthRequired: config().formDataListForthRequired,
      formItemsConfigForth: config().formItemsConfigForth,
      formDataListForth: config().formDataListForth,
      formDataListThird: config().formDataListThird,
      formDataListThirdRequired: config().formDataListThirdRequired,
      formItemsConfigThird: config().formItemsConfigThird,
      activeNameTop: '1',
      readonly: ['proAgencyName', 'mofDivName', 'budgetLevelName', 'speProCode', 'proDept_', 'proGi', 'trackProCode'],
      formItemsConfigBtm: config().formItemsConfigBtm,
      formDataListBtmRequired: config().formDataListBtmRequired,
      formDataListBtm: config().formDataListBtm,
      formItemsConfigBtmAdd: config().formItemsConfigBtmAdd,
      formDataListBtmRequiredAdd: config().formDataListBtmRequiredAdd,
      formDataListBtmAdd: config().formDataListBtmAdd,
      addBudgetFormConfig: config().addBudgetFormConfig,
      addBudgetFormData: config().addBudgetFormData,
      addBudgetFormDataRequired: config().addBudgetFormDataRequired,
      showModal: false,
      showModalFooter: true,
      tableToolbarConfigInmodal: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      fileTypeOptions: [
        { value: '01', label: '项目审批（核准、备案）资料' },
        { value: '02', label: '项目用地审批、环评审批、施工许可资料' },
        { value: '03', label: '项目招投标和政府采购资料' },
        { value: '04', label: '项目主要合同资料' },
        { value: '05', label: '项目评审报告' },
        { value: '99', label: '其他' }
      ],
      filetype: '01',
      filetypeName: '项目审批（核准、备案）资料',
      tableToolbarConfigAttach: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        buttons: [
          { code: 'upload-attachment', name: '上传附件', status: 'primary', callback: this.handleUpload },
          { code: 'delete-attachment', name: '删除', status: 'primary', callback: this.deleteAttachment }
        ]
      },
      tableData: [],
      modalTblColumnsConfig: config().modalTblColumnsConfig,
      addModal: false,
      hideTree: false,
      isCheckbox: false,
      tableColumnsIdConfig: [
        {
          code: '1',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '2',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '5',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '0',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目基本信息录入',
      tableUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/list',
      tableParams: {
        appId: 'pm_project_info_detail'
      },
      hideZero: true,
      tableCountUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/count',
      tableCountParams: {
        statusCodeArr: ['1', '2', '5'],
        appId: 'pm_project_info_detail'
      },
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrl: '',
            label: '待办事项',
            code: '1',
            curValue: '1'
          },
          {
            type: 'button',
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已办事项',
            code: '2',
            curValue: '2'
          }, {
            type: 'button',
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已作废',
            code: '5',
            curValue: '5'
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '待办事项',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
            {
              code: 'pay-import',
              label: '导入',
              status: 'primary'
            },
            {
              code: 'pay-add',
              label: '新增',
              status: 'primary'
            },
            {
              code: 'pay-edit',
              label: '修改'
            },
            {
              code: 'pay-discard',
              label: '作废'
            },
            {
              code: 'pay-audit',
              label: '送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '5': [
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ]
        }
      },
      currentRow: {},
      proDetId: '',
      isView: false,
      isAdd: false,
      treeProps: ['mofDiv_', 'budgetLevel_', 'proDept_', 'fundInvestArea_', 'proAgency_', 'trackPro_', 'fundInvestArea_'],
      showAddLineModal: false
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.getFundInvestArea()
    this.getBudgetElement()
    this.formDataListBtmAdd.mofDivName = this.$store.state.userInfo.province
    this.formDataListBtmAdd.budgetLevelCode = this.$store.state.userInfo.budgetlevelcode
    this.formDataListBtmAdd.budgetLevelName = this.$store.state.userInfo.budgetlevelname
    this.formDataListBtm.budgetLevelName = this.$store.state.userInfo.budgetlevelname
  },
  methods: {
    stringToDate(str) {
      return (str || '').substr(0, 4) + '-' + (str || '').substr(4, 2) + '-' + (str || '').substr(6)
    },
    deleteAttachment() {
      let selections = this.$refs.fileDataRef.getSelectionData()
      if (selections.length === 0) {
        this.$message.warning('请选择要删除的附件')
        return
      }
      this.$refs.fileDataRef.$refs.xGrid.removeCheckboxRow()
    },
    closeModal() {
      this.showModal = false
    },
    formatDate(numb) {
      if (!numb) {
        return ''
      }
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    },
    dataURLtoBlob(base64Str) {
      var bstr = atob(base64Str)
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // 下载的是excel格式的文件
      return new Blob([u8arr], { type: 'application/vnd.ms-excel' })
    },
    handleImport() {
      let self = this
      self.$refs.tmp.$refs.tableRef.triggerImportOption({
        downloadTemplateCallback() {
          // const a = document.createElement('a')
          // a.setAttribute('download', '')
          // a.setAttribute('href', 'static/files/国债资金监控导入模板.xlsx')
          // a.click()
          self.$http.get(BSURL.dfr_file_downLoadFile).then(res => {
            if (res.code === '000000') {
              const fileName = '增发国债资金项目基本信息导入.xlsx'
              let blob = self.dataURLtoBlob(res.data)
              let downloadUrl = window.URL.createObjectURL(blob)
              let anchor = document.createElement('a')
              anchor.href = downloadUrl
              anchor.download = fileName
              anchor.click()
            }
          })
        },
        importSuccessCallback(res) {
          let basicInfo = res['基本情况明细表']
          basicInfo.shift()
          let basicInfoRes = basicInfo.map(item => {
            let proAgency = (item['*项目单位'] || '').split('-')
            let fundInvestArea = (item['*项目所属投向领域'] || '').split('-')
            let trackProInfo = (item['增发国债资金中央转移支付项目'] || '').split('-')
            let proDept = (item['*项目主管部门'] || '').split('-')
            return {
              proAgencyCode: proAgency[0],
              proAgencyName: proAgency[1],
              speProCode: item['*具体项目代码'],
              speProName: item['*具体项目名称'],
              fundInvestAreaCode: fundInvestArea[0],
              fundInvestAreaName: fundInvestArea[1],
              fundInvestAreaDesc: item['项目所属投向领域说明'],
              proContent: item['*项目主要建设内容'],
              proStaDate: self.formatDate(item['*开工或预计开工时间']),
              proEndDate: self.formatDate(item['*预计完工时间']),
              proRealStaDate: self.formatDate(item['实际开工时间']),
              proRealEndDate: self.formatDate(item['实际竣工时间']),
              proNotStaRea: item['项目未开工原因'],
              ndrcProCode: item['发改委项目代码'],
              ndrcProName: item['发改委项目名称'],
              trackProCode: trackProInfo[0],
              trackProName: trackProInfo[1],
              isUseMultiTrackPro: item['*是否使用多项中央转移支付资金'] === '是' ? '1' : '2',
              proDeptCode: proDept[0],
              proDeptName: proDept[1],
              proGiAddnb: item['*项目总投资'],
              proGiCff: item['__EMPTY'],
              proGiCfo: item['__EMPTY_1'],
              proGiLff: item['__EMPTY_2'],
              proGiEf: item['__EMPTY_3'],
              proGiLb: item['__EMPTY_4'],
              proGiBankl: item['__EMPTY_5'],
              proGiOth: item['__EMPTY_6'],
              proApproveNumber: item['*项目审批（核准、备案）文号'],
              landApproveNumber: item['*用地审批文号'],
              eiaApproveNumber: item['*环评审批文号'],
              consApproveNumber: item['*施工许可文号'],
              proAddress: item['*项目地址'],
              estAgencyName: item['*主要监理单位'],
              consAgencyName: item['*主要施工单位'],
              agencyLeaderPerName: item['*项目单位负责人'],
              agencyLeaderPerOtel: item['__EMPTY_7'],
              agencyLeaderPerMtel: item['__EMPTY_8'],
              fiLeader: item['*财务负责人'],
              fiLeaderOtel: item['__EMPTY_9'],
              fiLeaderMtel: item['__EMPTY_10'],
              proLeader: item['*项目负责人'],
              proLeaderOtel: item['__EMPTY_11'],
              proLeaderMtel: item['__EMPTY_12'],
              proLessor: item['*工作联系人'],
              proLessorOtel: item['__EMPTY_13'],
              proLessorMtel: item['__EMPTY_14'],
              kpiTarget: item['*总体绩效目标'],
              isEnd: item['*项目是否终结'] === '是' ? '1' : '2',
              budgetLevelCode: self.$store.state.userInfo.budgetlevelcode,
              budgetLevelName: self.$store.state.userInfo.budgetlevelname
            }
          })
          console.log(basicInfoRes)
          let bgtInfo = res['国债资金项目绩效指标']
          let bgtRes = bgtInfo.map(item => {
            let lv2PerfInd = (item['*二级绩效指标'] || '').split('-')
            return {
              speProCode: item['*具体项目代码'],
              lv1PerfIndCode: item['一级绩效指标代码'],
              lv1PerfIndName: item['一级绩效指标名称'],
              lv2PerfIndCode: lv2PerfInd[0],
              lv2PerfIndName: lv2PerfInd[1],
              lv3PerfIndCode: item['*三级绩效指标代码'],
              lv3PerfIndName: item['*三级绩效指标名称'],
              kpiContent: item['绩效指标说明'] ? item['绩效指标说明'] : '',
              kpiVal: item['*指标值'],
              kpiEvalstd: item['评（扣）分标准'],
              kpiRemark: item['备注']
            }
          })
          console.log(bgtRes)
          self.$refs.tmp.showLoading = true
          let params = {
            projectInfo: basicInfoRes,
            perfIndica: bgtRes,
            appId: 'pm_project_info_detail',
            menuId: self.menuId,
            actionType: '1',
            actionName: '录入',
            advice: ''
          }
          HttpModule.importExcel(params).then((res) => {
            if (res && res.rscode === '200') {
              self.$message.success('导入成功')
              self.$refs.tmp.refresh()
            } else {
              if (res.message) {
                self.$message.error('导入失败:' + res.message)
              } else {
                self.$message.error('导入失败!')
              }
            }
            console.log(res)
          }).finally(() => {
            self.$refs.tmp.showLoading = false
          })
        }
      })
    },
    onImportSuccess(data) {

    },
    clearFormat(str) {
      str += ''
      str = str.replace(/,/g, '')
      let i = parseFloat(str)
      if (isNaN(i)) {
        i = 0
      }
      return i
    },
    BtminsertItemChange({ $form, property, itemValue, data }, bsform) {
      console.log(property, itemValue, data)
      if (this.treeProps.indexOf(property) > -1) {
        let p = property.substr(0, property.length - 1)
        this.formDataListBtm[p + 'Name'] = data[property + 'name']
        this.formDataListBtm[property + 'name'] = data[property + 'name']
        this.formDataListBtm[property] = itemValue
        this.formDataListBtm[property + 'code'] = data[property + 'code']
        this.formDataListBtm[property + 'id'] = data[property + 'id']
      }
      if (property === 'trackPro_') {
        this.formDataListBtmAdd.trackProCode = data.trackPro_code
        data.trackProCode = data.trackPro_code
        data.fundInvestArea_ = ''
        data.fundInvestArea_code = ''
        data.fundInvestArea_id = ''
        data.fundInvestArea_name = ''
        this.fundInvestArea(data.trackPro_id)
      }
    },
    // 获取指标级次
    getBudgetElement() {
      this.$http.post('http://223.223.190.114:12218/dfr/pmProjectInfoDetail/perfindtree').then((res) => {
        if (res.rscode === '200') {
          this.addBudgetFormConfig.forEach(item => {
            if (item.field === 'lv2PerfInd_') {
              item.itemRender.options = res.data
              this.toFlatTree(res.data)
            }
          })
        }
      })
    },
    getFundInvestArea() {
      this.$http.post('/dfr-monitor-service/dfr/common/elementtree', { elementCode: 'PROFUNDINVESTAREA' }).then((res) => {
        if (res.rscode === '200') {
          let configs = []
          if (this.isAdd) {
            configs = this.formItemsConfigBtmAdd
          } else {
            configs = this.formItemsConfigBtm
          }
          configs.forEach(item => {
            if (item.field === 'fundInvestArea_') {
              this.fundInvestAreaOptions = res.data
              item.itemRender.options = res.data
            }
          })
        }
      })
    },
    // 树扁平化Map
    toFlatTree(trees) {
      let self = this
      trees.forEach(tree => {
        if (tree.children) {
          self.getChildren(tree, tree.children)
        }
      })
    },
    getChildren(tree, children) {
      children.forEach(c => {
        c.p = {
          id: tree.id,
          code: tree.code,
          label: tree.label,
          name: tree.name
        }
      })
    },
    fundInvestArea(id) {
      let currentFundInvest = []
      for (let i = 0; i < this.fundInvestAreaOptions.length; i++) {
        if (this.fundInvestAreaOptions[i].code === id) {
          currentFundInvest = [this.fundInvestAreaOptions[i]]
          console.log(currentFundInvest)
          break
        }
      }
      let configs = []
      if (this.isAdd) {
        configs = this.formItemsConfigBtmAdd
      } else {
        configs = this.formItemsConfigBtm
      }
      configs.forEach(item => {
        if (item.field === 'fundInvestArea_') {
          item.itemRender.options = currentFundInvest
        }
      })
      if (this.isAdd) {
        this.formItemsConfigBtmAdd = [...configs]
      } else {
        this.formItemsConfigBtm = [...configs]
      }
    },
    // 新增绩效table编辑完
    budgetEditClose(obj, grid) {
      let row = obj.row
      let property = obj.column.property
      let rows = this.levelTableMap[row.lv1PerfIndCode][row.lv2PerfIndCode]
      rows.forEach(r => {
        if (r.rowId === row.rowId) {
          r[property] = row[property]
        }
      })
    },
    insertItemChange({ $form, property, itemValue, data }, bsform) {
      let sum = 0
      this.formDataListThird[property] = data[property]
      this.formItemsConfigThird.forEach(item => {
        if (item.field !== 'proGi') {
          console.log(data[item.field])
          sum += this.clearFormat(data[item.field])
        }
      })
      this.formDataListThird.proGi = sum
      this.formDataListThird = { ...this.formDataListThird }
      console.log(this.formDataListThird)
      console.log(data.sums)
    },
    fileUpload(params) {
      return this.$http.post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
    },
    handleUpload() {
      this.showTypeModal = true
    },
    handelUploadDebugfile(e) {
      const form = new FormData()
      const temp = []
      // 文件对象
      form.append('file', e.file)
      form.append('filename', e.file.name)
      form.append('appid', 'pay_plan_voucher')
      temp.push(e.file.name)
      form.append('doctype', '')
      form.append('year', this.$store.state.userInfo.year)
      form.append('province', this.$store.state.userInfo.province)
      form.append('userguid', this.$store.state.userInfo.guid)
      form.append('billguid', this.$ToolFn.utilFn.getUuid())
      this.addLoading = true
      this.fileUpload(form).then(res => {
        this.addLoading = false
        if (res.rscode === '100000') {
          let resultData = ''
          if (res.data || res.data != null) {
            resultData = res.data
          } else {
            resultData = res.result
          }
          let data = {}
          temp.push(resultData)
          data['year'] = this.$store.state.userInfo.year
          data['count'] = 0
          data['filesize'] = e.file.size
          data['fileName'] = e.file.name
          data['proAttchId'] = resultData
          data['filepath'] = e.file.webkitRelativePath
          data['province'] = this.$store.state.userInfo.province
          data['appid'] = 'pay_plan_voucher'
          data['creater'] = e.file.uid
          data['guid'] = this.$store.state.userInfo.guid
          data['billguid'] = this.$ToolFn.utilFn.getUuid()
          data['importuser'] = this.$store.state.userInfo.name
          data['createTime'] = new Date().toLocaleDateString()
          data.proAttchKindCode = this.filetype
          this.tableDataSx.push(data)
          console.log('---', this.tableDataSx)
          this.$message.success('上传成功')
        } else {
          if (res.result.includes('Size: 0')) {
            this.$message.error('上传失败,不能上传空文件')
          }
          this.$message.error('上传失败：' + res.result)
        }
      }).catch()
    },
    handleRemove() {

    },
    addLevelOneLeft() {
      this.tableData.push({
        level1: '',
        level2: '',
        level3: ''
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex, visibleData }) {
      if (columnIndex === 2) {
        const cellValue = row['lv1PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv1PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv1PerfIndCode'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
      if (columnIndex === 3) {
        const cellValue = row['lv2PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv2PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv2PerfIndCode'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    objectSpanMethods({ row, column, rowIndex, columnIndex }) {
      const fields = ['lvl1name']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = this.tableData[rowIndex - 1]
        let nextRow = this.tableData[rowIndex + 1]
        if (prevRow && prevRow[column.field] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.field] === cellValue) {
            nextRow = this.tableData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    handleSureType() {
      let proAttchKindName = this.fileTypeOptions.find((item) => {
        return item.value === this.filetype
      }).label
      this.filetypeName = proAttchKindName
      this.$refs.uploadref.click()
      this.showTypeModal = false
    },
    handleSure() {
      this.$refs.addForm.formOptionsFn().validate().then(() => {
        this.$refs.addFormthrid.formOptionsFn().validate().then(() => {
          this.$refs.addFormForth.formOptionsFn().validate().then(() => {
            this.$refs.KPIForm.formOptionsFn().validate().then(() => {
              this.$refs.contactInformationForm.formOptionsFn().validate().then(() => {
                let localThis = this
                console.log()
                localThis.$refs.tmp.showLoading = true
                let fileList = []
                let fileDataList = localThis.$refs.fileDataRef.getTableData().fullData
                if (fileDataList && fileDataList.length > 0) {
                  fileDataList.forEach((item) => {
                    fileList.push({
                      fileName: item.fileName,
                      kpiRemark: item.kpiRemark,
                      proAttchKindCode: item.proAttchKindCode,
                      proAttchKindName: item.proAttchKindCode__viewSort,
                      proAttchId: item.proAttchId
                    })
                  })
                }
                // 保存时去掉树id##code##name
                let btmFormData = localThis.$refs.addForm.getFormData()
                for (let key in btmFormData) {
                  if (this.treeProps.indexOf(key) > -1) {
                    let p = key.substr(0, key.length - 1)
                    let value = (btmFormData[key] || '').split('##')
                    if (value[0].indexOf('initId') > -1) {
                      btmFormData[p + 'Name'] = value[1] + '##' + value[2]
                    } else {
                      btmFormData[p + 'Name'] = btmFormData[key + 'name']
                    }
                    btmFormData[p + 'Code'] = btmFormData[key + 'code']
                    delete btmFormData[key]
                    delete btmFormData[key + 'id']
                    delete btmFormData[key + 'code']
                    delete btmFormData[key + 'name']
                  }
                  if (key === 'proAgencyName') {
                    btmFormData['proAgencyName'] = btmFormData['proAgencyName'].replace(btmFormData['proAgencyCode'] + '-', '')
                  }
                  if (key === 'proStaDate' || key === 'proEndDate' || key === 'proRealStaDate' || key === 'proRealEndDate') {
                    btmFormData[key] = btmFormData[key].replaceAll('-', '')
                  }
                } let kpiTarget = localThis.$refs.KPIForm.getFormData().kpiTarget
                let params = {
                  projectInfo: { ...btmFormData, kpiTarget: kpiTarget },
                  // projectInfo: localThis.formDataListBtm,
                  perfIndica: localThis.$refs.bgtTblRef.getTableData().tableData,
                  proGiSource: localThis.$refs.addFormthrid.getFormData(),
                  // 项目总投资
                  approvalDoc: localThis.$refs.addFormForth.getFormData(),
                  // 联系方式
                  depInfo: localThis.$refs.contactInformationForm.getFormData(),
                  attchs: fileList
                }
                console.log(params)
                if (localThis.proDetId === '') {
                  // 新增---待修改
                  params.proDetId = localThis.proDetId
                  params.projectInfo.proDetId = localThis.proDetId
                  params.appId = 'pm_project_info_detail'
                  params.menuId = this.menuId
                  params.actionType = 1
                  params.actionName = '录入'
                  params.advice = ''
                  HttpModule.insertDataRecord(params).then((res) => {
                    if (res.rscode === '200') {
                      this.showModal = false
                      localThis.$message.success('操作成功')
                      localThis.$refs.tmp.refresh()
                    } else {
                      if (res.message) {
                        localThis.$message.error('数据保存询失败:' + res.message)
                      } else {
                        localThis.$message.error('数据保存询失败')
                      }
                    }
                    localThis.$refs.tmp.showLoading = false
                  })
                } else {
                  // 修改
                  params.proDetId = localThis.proDetId
                  params.projectInfo.proDetId = localThis.proDetId
                  HttpModule.editDataRecord(params).then((res) => {
                    if (res.rscode === '200') {
                      this.showModal = false
                      localThis.$message.success('操作成功')
                      localThis.$refs.tmp.refresh()
                    } else {
                      if (res.message) {
                        localThis.$message.error('数据编辑保存询失败:' + res.message)
                      } else {
                        localThis.$message.error('数据编辑保存询失败')
                      }
                    }
                    localThis.$refs.tmp.showLoading = false
                  })
                }
              }).catch(() => {
                this.$message.error('表单信息未填写完整，请检查')
              })
            }).catch(() => {
              this.$message.error('表单信息未填写完整，请检查')
            })
          }).catch(() => {
            this.$message.error('表单信息未填写完整，请检查')
          })
        }).catch(() => {
          this.$message.error('表单信息未填写完整，请检查')
        })
      }).catch(() => {
        this.$message.error('表单信息未填写完整，请检查')
      })
    },
    // ID随机生成
    getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
      let s = []
      for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4'
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
      s[8] = s[13] = s[18] = s[23] = ''
      let uuid = s.join('')
      return uuid
    },
    // 根据二级指标获取一级指标并填充值
    addFormChange({ $form, property, itemValue, data, renderOpts, node, nodes, treeData }) {
      this.formDataListBtm['lv1PerfIndName'] = data[property + 'name']
      let levelTableMap = { ...(this.levelTableMap || {}) }
      nodes.forEach(level => {
        if (!levelTableMap[level.p.code]) {
          levelTableMap[level.p.code] = {}
        }
        if (!levelTableMap[level.p.code][level.code]) {
          levelTableMap[level.p.code][level.code] = []
        }
        levelTableMap[level.p.code][level.code].push({
          rowId: this.getUuid(),
          lv1PerfIndCode: level.p.code,
          lv1PerfIndName: level.p.name,
          lv2PerfIndCode: level.code,
          lv2PerfIndName: level.name,
          lv3PerfIndName: '',
          lv3PerfIndCode: '',
          kpiVal: ''
        })
      })
      this.levelTableMap = levelTableMap
      let firstLevel = this.getFirstLevel(nodes, treeData)
      let firstlevelStr = ''
      for (let key in firstLevel) {
        firstlevelStr += firstLevel[key].label + ','
      }
      this.addBudgetFormData.lv1PerfIndName = firstlevelStr.substr(0, firstlevelStr.length - 1)
      data.lv1PerfIndName = firstlevelStr.substr(0, firstlevelStr.length - 1)
    },
    getFirstLevel(nodes, treeData, pnodes = {}) {
      nodes.forEach(node => {
        pnodes[node.p.code] = node.p
      })
      return pnodes
    },
    addLine() {
      this.showAddLineModal = true
      this.addBudgetFormData.lv1PerfIndName = ''
    },
    clearFormDatas() {
      this.tableData = []
      this.tableDataSx = []
      this.clearData(this.formDataListBtmAdd)
      this.clearData(this.formDataListThird)
      this.clearData(this.formDataListForth)
      this.clearData(this.contactInformationFormData)
    },
    clearData(items) {
      for (let key in items) {
        if (key !== 'mofDivName' && key !== 'budgetLevelName' && key !== 'budgetLevelCode') {
          items[key] = ''
        }
      }
    },
    confirm() {
      let self = this
      let levelTableDatas = []
      Object.keys(self.levelTableMap).forEach(firstLevelKey => {
        let firstLevelObj = self.levelTableMap[firstLevelKey]
        Object.keys(firstLevelObj).forEach(secondLevelKey => {
          let levels = firstLevelObj[secondLevelKey]
          levels.forEach(level => {
            levelTableDatas.push({
              rowId: level.rowId,
              lv1PerfIndCode: level.lv1PerfIndCode,
              lv1PerfIndName: level.lv1PerfIndName,
              lv2PerfIndCode: level.lv2PerfIndCode,
              lv2PerfIndName: level.lv2PerfIndName,
              lv3PerfIndName: level.lv3PerfIndName,
              lv3PerfIndCode: level.lv3PerfIndCode,
              kpiVal: level.kpiVal
            })
          })
        })
      })
      self.$refs.addBudget.formOptionsFn().validate().then(() => {
        self.showAddLineModal = false
        self.$refs.bgtTblRef.$refs.xGrid.reloadData(levelTableDatas)
      })
    },
    deleteLine() {
      let checkItems = this.$refs.bgtTblRef.getSelectionData()
      if (checkItems.length === 0) {
        this.$message.warning('请选择删除数据')
        return
      }
      this.$refs.bgtTblRef.$refs.xGrid.removeCheckboxRow()
    },
    onBtnClick(obj) {
      this.isView = false
      this.isAdd = false
      delete this.tableToolbarConfigInmodal.buttons
      this.tableToolbarConfigInmodal.slots = {
        tools: 'toolbarTools',
        buttons: 'toolbarSlots'
      }
      if (obj.code === 'pay-add') {
        this.showModal = true
        this.isAdd = true
        this.modalTitle = '新增'
        this.clearFormDatas()
        this.formDataListBtmAdd.trackProCode = ''
        this.tableToolbarConfigInmodal.buttons = [
          { code: 'code-add', name: '新增', status: 'primary', callback: this.addLine },
          { code: 'code-delete', name: '删除', status: 'primary', callback: this.deleteLine }
        ]
        delete this.tableToolbarConfigInmodal.slots
      }
      this.tableToolbarConfigInmodal = { ...this.tableToolbarConfigInmodal }
      if (obj.code === 'pay-import') {
        this.handleImport()
      }
      if (obj.code === 'pay-edit') {
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.initFormItems(false)
        this.editRecord()
      }
      if (obj.code === 'pay-discard') {
        this.discardRecord()
      }
      if (obj.code === 'pay-checkDetails') {
        this.isView = true
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.initFormItems(true)
        this.viewDetail()
      }
      if (obj.code === 'pay-audit') {
        this.auditRecord(2)
      }
      if (obj.code === 'pay-unAudit') {
        this.auditRecord(3)
      }
    },
    initFormItems(disabled) {
      this.setItemsDisable(this.formItemsConfigBtm, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfig, true, disabled)
      this.setItemsDisable(this.formItemsConfigThird, false, disabled)
      this.setItemsDisable(this.formItemsConfigForth, false, disabled)
      this.setItemsDisable(this.contactInformationFormConfig, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfigSx, true, disabled)
      this.tableToolbarConfigAttach.buttons.forEach(btn => {
        btn.disabled = disabled
        btn.visible = !disabled
      })
    },
    setItemsDisable(itemConfigs, isTable, disabled) {
      if (isTable) {
        itemConfigs.forEach(column => {
          if (disabled) {
            // 只读
            let render = column.editRender
            if (render) {
              column.render = render
              delete column.editRender
            }
          } else {
            let render = column.cellRender || column.render
            if (render) {
              column.editRender = render
              delete column.cellRender
              delete column.render
            }
          }
        })
      } else {
        itemConfigs.forEach(item => {
          if (this.readonly.indexOf(item.field) === -1) {
            if (item.itemRender) {
              if (item.itemRender.props) {
                item.itemRender.props.disabled = disabled
              } else {
                item.itemRender.props = { disabled: disabled }
              }
            }
          } else {
            item.itemRender.props.disabled = true
          }
        })
      }
    },
    // 修改
    editRecord() {
      let localThis = this
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      localThis.proDetId = selection.proDetId
      let params = {
        proDetId: selection.proDetId
      }
      localThis.tableData = []
      HttpModule.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          let projectInfo = res.data.projectInfo
          let perfIndica = res.data.perfIndica
          let attchs = res.data.attchs
          localThis.tableDataSx = attchs
          localThis.tableData = perfIndica
          localThis.initModalFormData(projectInfo)
          localThis.showModalFooter = true
          this.showModal = true
          this.modalTitle = '编辑'
        } else {
          localThis.$message.warning('数据详细查询失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    discardRecord() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal
        .confirm('请确认是否作废？')
        .then((type) => {
          if (type === 'confirm') {
            let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
              return item.proDetId
            })
            let params = {
              ids: ids,
              appId: 'pm_project_info_detail',
              menuId: localThis.menuId,
              actionType: 2,
              actionName: '作废'
            }
            HttpModule.discardRecords(params).then((res) => {
              if (res.rscode === '200') {
                localThis.$message.success('操作成功')
                localThis.$refs.tmp.refresh()
              } else {
                localThis.$message.warning('操作失败' + res.errorMessage)
              }
            })
          }
        })
    },
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal
        .confirm('请确认是否' + (type === 2 ? '送审?' : '撤销送审?'))
        .then((status) => {
          if (status === 'confirm') {
            let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
              return item.proDetId
            })
            let params = {
              ids: ids,
              appId: 'pm_project_info_detail',
              menuId: localThis.menuId,
              actionType: type,
              actionName: type === 2 ? '送审' : '撤销送审'
            }
            localThis.$refs.tmp.showLoading = true
            HttpModule.auditDataRecords(params).then((res) => {
              if (res.rscode === '200') {
                localThis.$message.success('操作成功')
                localThis.$refs.tmp.refresh()
              } else {
                localThis.$message.warning('操作失败' + res.errorMessage)
              }
              localThis.$refs.tmp.showLoading = false
            })
          }
        })
    },
    // 修改附件
    editClosed(obj, grid) {
      this.tableDataSx = obj.visibleData
    },
    viewDetail() {
      let localThis = this
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      let params = {
        proDetId: selection.proDetId
      }
      localThis.tableData = []
      HttpModule.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          let projectInfo = res.data.projectInfo
          let perfIndica = res.data.perfIndica
          let attchs = res.data.attchs
          localThis.tableDataSx = attchs
          localThis.tableData = perfIndica
          localThis.initModalFormData(projectInfo)
          localThis.showModalFooter = false
          localThis.showModal = true
          localThis.modalTitle = '查看详情'
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    initTreeInfo(formData, property, value, projectInfo) {
      let infos = value.split('##')
      if (!(infos[1] || '').trim() || !(infos[2] || '').trim()) {
        let p = property.substr(0, property.length - 1)
        formData[property] = '##' + projectInfo[p + 'Code'] + infos[0]
        formData[property + 'code'] = (infos[1] || '').trim() || projectInfo[p + 'Code']
        formData[property + 'name'] = (infos[2] || '').trim() || infos[0]
      } else {
        formData[property] = value
        formData[property + 'id'] = infos[0]
        formData[property + 'code'] = (infos[1] || '').trim()
        formData[property + 'name'] = (infos[2] || '').trim()
      }
    },
    initModalFormData(projectInfo) {
      let localThis = this
      // 基本情况
      localThis.formDataListBtm.proAgencyName = projectInfo.proAgencyCode + '-' + projectInfo.proAgencyName
      localThis.formDataListBtm.proAgencyCode = projectInfo.proAgencyCode
      // 财政区划
      let mofDiv = projectInfo.mofDivName
      this.initTreeInfo(localThis.formDataListBtm, 'mofDiv_', mofDiv, projectInfo)
      localThis.formDataListBtm.mofDivName = projectInfo.mofDivName
      // localThis.formDataListBtm.mofDivNameId = projectInfo.mofDivName
      // 预算级次
      localThis.formDataListBtm.budgetLevelName = projectInfo.budgetLevelName
      let budgetLevel = projectInfo.budgetLevelName
      this.initTreeInfo(localThis.formDataListBtm, 'budgetLevel_', budgetLevel, projectInfo)
      localThis.formDataListBtm.speProName = projectInfo.speProName
      localThis.formDataListBtm.speProCode = projectInfo.speProCode
      localThis.formDataListBtm.trackProName = projectInfo.trackProName
      localThis.formDataListBtm.trackProCode = projectInfo.trackProCode
      // 项目主管部门
      let proDeptName = projectInfo.proDeptName
      localThis.formDataListBtm.proDeptName = projectInfo.proDeptName
      this.initTreeInfo(localThis.formDataListBtm, 'proDept_', proDeptName, projectInfo)
      // 项目所属投向领域
      let fundInvestInfo = projectInfo.fundInvestAreaName
      localThis.formDataListBtm.fundInvestAreaName = projectInfo.fundInvestAreaName
      this.initTreeInfo(localThis.formDataListBtm, 'fundInvestArea_', fundInvestInfo, projectInfo)
      localThis.formDataListBtm.proContent = projectInfo.proContent
      localThis.formDataListBtm.proStaDate = this.stringToDate(projectInfo.proStaDate)
      localThis.formDataListBtm.proEndDate = this.stringToDate(projectInfo.proEndDate)
      localThis.formDataListBtm.proRealStaDate = this.stringToDate(projectInfo.proRealStaDate)
      localThis.formDataListBtm.proRealEndDate = this.stringToDate(projectInfo.proRealEndDate)
      localThis.formDataListBtm.proNotStaRea = projectInfo.proNotStaRea
      localThis.formDataListBtm.kpiTarget = projectInfo.kpiTarget
      localThis.KPIFormData.kpiTarget = projectInfo.kpiTarget
      localThis.formDataListBtm.isUseMultiTrackPro = projectInfo.isUseMultiTrackPro
      localThis.formDataListBtm.fundInvestAreaDesc = projectInfo.fundInvestAreaDesc
      localThis.formDataListBtm.isEnd = projectInfo.isEnd
      // 项目总投资
      localThis.formDataListThird.proGi = projectInfo.proGi
      localThis.formDataListThird.proGiAddnb = projectInfo.proGiAddnb
      localThis.formDataListThird.proGiCff = projectInfo.proGiCff
      localThis.formDataListThird.proGiCfo = projectInfo.proGiCfo
      localThis.formDataListThird.proGiLff = projectInfo.proGiLff
      localThis.formDataListThird.proGiEf = projectInfo.proGiEf
      localThis.formDataListThird.proGiLb = projectInfo.proGiLb
      localThis.formDataListThird.proGiBankl = projectInfo.proGiBankl
      localThis.formDataListThird.proGiOth = projectInfo.proGiOth
      // 项目批复信息
      localThis.formDataListForth.proApproveNumber = projectInfo.proApproveNumber
      localThis.formDataListForth.landApproveNumber = projectInfo.landApproveNumber
      localThis.formDataListForth.eiaApproveNumber = projectInfo.eiaApproveNumber
      localThis.formDataListForth.consApproveNumber = projectInfo.consApproveNumber
      // 相关部门联系方式
      localThis.contactInformationFormData.proAddress = projectInfo.proAddress
      localThis.contactInformationFormData.estAgencyName = projectInfo.estAgencyName
      localThis.contactInformationFormData.consAgencyName = projectInfo.consAgencyName
      localThis.contactInformationFormData.agencyLeaderPerName = projectInfo.agencyLeaderPerName
      localThis.contactInformationFormData.agencyLeaderPerOtel = projectInfo.agencyLeaderPerOtel
      localThis.contactInformationFormData.agencyLeaderPerMtel = projectInfo.agencyLeaderPerMtel
      localThis.contactInformationFormData.fiLeader = projectInfo.fiLeader
      localThis.contactInformationFormData.fiLeaderOtel = projectInfo.fiLeaderOtel
      localThis.contactInformationFormData.fiLeaderMtel = projectInfo.fiLeaderMtel
      localThis.contactInformationFormData.proLeader = projectInfo.proLeader
      localThis.contactInformationFormData.proLeaderOtel = projectInfo.proLeaderOtel
      localThis.contactInformationFormData.proLeaderMtel = projectInfo.proLeaderMtel
      localThis.contactInformationFormData.proLessor = projectInfo.proLessor
      localThis.contactInformationFormData.proLessorOtel = projectInfo.proLessorOtel
      localThis.contactInformationFormData.proLessorMtel = projectInfo.proLessorMtel
    }
  }
}
</script>
<style scoped lang="scss">
.Titans-form ::v-deep .vxe-form .boss-tree__input .el-select {
  height: 34px;
}

.app-main .boss-main .el-tab-pane {
  height: auto !important;
}
/deep/.Titans-table .vxe-grid--toolbar-wrapper .vxe-button--wrapper{
  text-align: left!important;
}
</style>
