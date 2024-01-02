<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <FinanceDepartmentDetailInfoVue v-if="showDetailInfo" ref="financeDepartmentDetail" @refresh="refresh" @closeDetail="closeDetail" />
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoFirstAudit.js'
import FinanceDepartmentDetailInfoVue from './FinanceDepartmentAddDetailsInfo.vue'

export default {
  components: { FinanceDepartmentDetailInfoVue },
  data() {
    return {
      appId: this.$store.state.curNavModule.appid,
      menuId: '',
      isLastInst: '',
      importConlum: [
        {
          title: '一级绩效指标代码',
          field: 'lvl1code'
        },
        {
          title: '一级绩效指标名称',
          field: 'lvl1name'
        },
        {
          title: '二级绩效指标代码',
          field: 'lv1code'
        },
        {
          title: '二级绩效指标名称',
          field: 'lvl2name'
        },
        {
          title: '三级绩效指标代码',
          field: 'lvl3code'
        },
        {
          title: '三级绩效指标名称',
          field: 'lvl3name'
        },
        {
          title: '绩效指标说明',
          field: 'des'
        },
        {
          title: '指标值',
          field: 'value'
        },
        {
          title: '指标顺序码',
          field: 'sort'
        }
      ],
      showModal: false,
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
          code: '0',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目基本信息审核',
      tableUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/list',
      tableParams: {
        appId: 'pm_project_info_detail'
      },
      hideZero: true,
      tableCountUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/count',
      tableCountParams: {
        statusCodeArr: ['1', '2'],
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
              code: 'pay-audit',
              label: '审核'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销审核'
            },
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
    this.isLastInst = this.transJson(this.$store.state?.curNavModule?.param5 || '')?.isLastInst
    this.menuId = this.$store.state.curNavModule.guid
  },
  methods: {
    closeDetail() {
      this.showDetailInfo = false
    },
    refresh() {
      this.$refs.tmp.refresh()
    },
    onBtnClick(obj) {
      let selectionData = this.$refs.tmp.getSelectionRcd()
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
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal.confirm('请确认是否' + (type === 2 ? '送审?' : '撤销送审?')).then((status) => {
        if (status === 'confirm') {
          let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
            return item.proDetId
          })
          let params = {
            ids: ids,
            appId: 'pm_project_info_detail',
            menuId: localThis.menuId,
            isLastInst: localThis.isLastInst,
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
          }).finally(() => {
            localThis.$refs.tmp.showLoading = false
          })
        }
      })
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
