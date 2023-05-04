<template>
  <div id="dfr-print-page">
    <template v-for="(item, index) in list">
      <div :key="index" class="print-page-item">
        <!--规则信息-->
        <RuleInfo :rule-info="item.ruleResVO">
          <template #header>
            <bs-table-title title="违规单信息" />
          </template>
        </RuleInfo>
        <!--处理进度-->
        <AuditProgress
          :is-pint="true"
          :table-data="item.processResultList"
        />
      </div>
    </template>
    <button ref="printBtnRef" v-print="printOptions" style="display: none;"></button>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import RuleInfo from './RuleInfo'
import AuditProgress from './AuditProgress'

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    RuleInfo,
    AuditProgress
  },
  emit: ['open'],
  setup(_, { emit }) {
    const printOptions = ref({
      id: 'dfr-print-page',
      popTitle: '违规处理单', // 打印配置页上方的标题
      preview: false, // 是否启动预览模式，默认是false
      openCallback: () => {
        emit('open')
      }
    })

    // 打印按钮Ref
    const printBtnRef = ref(null)

    /**
     * 打印触发器
     */
    function printTrigger() {
      console.log(printBtnRef.value)
      printBtnRef.value?.click?.()
    }
    // onUpdated(() => {
    //   console.log('onUpdated')
    // })
    return {
      printOptions,
      printBtnRef,
      printTrigger
    }
  }
})
</script>

<style lang="scss">
@media print {
  @page {
    size: auto;
    margin: 3mm 10mm;
    -webkit-print-color-adjust: exact;
  }

  html {
    height: auto;
    background-color: #ffffff;
    -webkit-print-color-adjust: exact;
  }

  body {
    background-color: #ffffff;
    -webkit-print-color-adjust: exact;
  }

  .print-page-item {
    padding-top: 20mm;
    box-sizing: border-box;
    page-break-after: always;
    &:first-child {
      //padding-top: 0;
    }
  }

  #dfr-print-page {
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    background-color: #ffffff;
  }
}
</style>
