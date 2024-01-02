<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <FinanceDepartmentDetailInfoVue v-if="showDetailInfo" ref="financeDepartmentDetail" @refresh="refresh" @closeDetail="closeDetail" />
  </div>
</template>
<script>
import FinanceDepartmentDetailInfoVue from './FinanceDepartmentAddDetailsInfo.vue'

export default {
  components: {
    FinanceDepartmentDetailInfoVue
  },
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
      menuName: '增发国债资金项目基本信息列表',
      tableUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/listAll',
      tableParams: {
        appId: 'pm_project_info_detail'
      },
      hideZero: true,
      tableCountUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/countAll',
      tableCountParams: {
        statusCodeArr: ['1'],
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
            label: '全部数据',
            code: '1',
            curValue: '1'
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '全部数据',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
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
    this.isLastInst = this.$store.state.curNavModule.param5.isLastInst
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
