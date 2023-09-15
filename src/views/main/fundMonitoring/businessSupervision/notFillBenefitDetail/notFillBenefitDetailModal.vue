<template>
  <vxeModal
    v-model="detailVisible"
    v-bind="modalLayout"
    @close="dialogClose"
  >
    <BsTable
      v-bind="tableLayOut"
      :table-data="tableData"
      :table-columns-config="tableColumns"
      v-on="tableLisenter"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ modalLayout.title }}</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxeModal>
</template>
<script lang="jsx">
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import { modalTableColumns } from './notFillBenefitDetail'
import HttpModule from '@/api/frame/main/fundMonitoring/notFillBenefitDetail.js'
import store from '@/store/index'
export default defineComponent({
  setup(_this, { emit }, ctx) {
    let clickRowData = ref({})
    const detailVisible = ref(false)
    const modalLayout = reactive({
      title: '未填报惠企项目明细',
      width: '96%',
      height: '90%',
      showFooter: false,
      class: 'notOverFlowAuto'
    })
    const mainTableRef = ref(null)
    const tableColumns = reactive(modalTableColumns)
    const tableData = ref([])
    const tableLayOut = reactive({
      footerConfig: {
        showFooter: false
      },
      toolbarConfig: {
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
      pagerConfig: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
      defaultMoneyUnit: 10000
    })
    const tableLisenter = {
      onToolbarBtnClick: ({ context, table, code }) => {
        const codeMap = { // 对应code事件
          refresh: onSearch// 刷新
        }
        codeMap[code]()
      }
    }
    const dialogClose = () => {
      emit('closeModal')
    }
    const onSearch = () => {
      const params = {
        fiscalYear: store.state.userInfo.year,
        mofDivCode: clickRowData.value.code,
        isSubCode: clickRowData.value.isSubCode
      }
      HttpModule.getBenefitDeDetail(params).then(res => {
        if (res.code === '000000') {
          tableData.value = res.data
        }
      })
    }
    onMounted(() => {

    })
    return {
      detailVisible,
      mainTableRef,
      modalLayout,
      tableColumns,
      tableLayOut,
      tableData,
      dialogClose,
      onSearch,
      tableLisenter,
      clickRowData
    }
  }
})
</script>
<style lang="scss" scoped>
.notOverFlowAuto{
  /deep/ .vxe-modal--content{
    overflow: hidden !important;
  }
}
</style>
