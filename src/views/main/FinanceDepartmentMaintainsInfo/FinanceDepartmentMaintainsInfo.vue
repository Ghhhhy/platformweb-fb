<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <FinanceDepartmentDetailInfoVue v-if="showDetailInfo" ref="financeDepartmentDetail" @refresh="refresh" @closeDetail="closeDetail" />
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfo.js'
import moment from 'moment'
import FinanceDepartmentDetailInfoVue from './FinanceDepartmentAddDetailsInfo.vue'
export default {
  name: 'FinanceDepartmentDetailInfo',
  components: { FinanceDepartmentDetailInfoVue },
  data() {
    return {
      appId: this.$store.state.curNavModule.appid,
      menuId: '',
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
      showDetailInfo: false
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
  },
  methods: {
    refresh() {
      this.$refs.tmp.refresh()
    },
    formatDate(numb) {
      if (!numb) return numb
      const startExcelDateSerialNumber = '1899-12-30'
      return moment(startExcelDateSerialNumber).add(numb, 'days').format('YYYYMMDD')
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
            let btnMofDepInfo = (item['*资金管理处室'] || '').split('-')
            return {
              proAgencyCode: proAgency[0],
              proAgencyName: proAgency[1],
              speProCode: item['*具体项目代码'],
              speProName: item['*具体项目名称'],
              bgtMofDepCode: btnMofDepInfo[0],
              bgtMofDepName: btnMofDepInfo[1],
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
    onBtnClick(obj) {
      let selectionData = this.$refs.tmp.getSelectionRcd()
      if (obj.code === 'pay-add') {
        this.showDetailInfo = true
        this.$nextTick(() => {
          this.$refs.financeDepartmentDetail.btnClick(obj, selectionData)
        })
      }
      if (obj.code === 'pay-import') {
        this.handleImport()
      }
      if (obj.code === 'pay-edit') {
        this.showDetailInfo = true
        this.$nextTick(() => {
          this.$refs.financeDepartmentDetail.btnClick(obj, selectionData)
        })
      }
      if (obj.code === 'pay-discard') {
        this.discardRecord()
      }
      if (obj.code === 'pay-checkDetails') {
        this.showDetailInfo = true
        this.$nextTick(() => {
          this.$refs.financeDepartmentDetail.btnClick(obj, selectionData)
        })
      }
      if (obj.code === 'pay-audit') {
        this.auditRecord(2)
      }
      if (obj.code === 'pay-unAudit') {
        this.auditRecord(3)
      }
    },
    closeDetail() {
      this.showDetailInfo = false
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
                localThis.$message.warning('操作失败' + res.message || '')
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
                localThis.$message.warning('操作失败' + res.message || '')
              }
              localThis.$refs.tmp.showLoading = false
            })
          }
        })
    }
  }
}
</script>
