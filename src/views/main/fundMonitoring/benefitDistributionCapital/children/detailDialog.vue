<!--
 * @Author: hupengcheng 1286335855@qq.com
 * @Date: 2023-10-20 16:59:41
 * @LastEditors: hupengcheng 1286335855@qq.com
 * @LastEditTime: 2023-10-22 13:43:22
 * @FilePath: \platformweb-fb\src\views\main\fundMonitoring\benefitDistributionRegion\children\detailDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <vxe-modal
      v-model="detailVisible"
      v-loading="tableLoading"
      @close="dialogClose"
    >
      <BsTable
        ref="mainTableRef"
        :toolbar-config="toolbarConfig"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :pager-config="pagerConfig"
        :footer-config="footerConfig"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div class="table-toolbar-left-title">
              <span class="fn-inline">{{ menuName }}</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailVisible: true,
      tableLoading: false,
      // title: '惠企利民发放情况统计 (按地区)',
      // table表格
      tableConfig: {
        globalConfig: {
          // 全局默认渲染列配置
          // 全局配置
          checkType: false,
          seq: true
        }
      },
      toolbarConfig: {
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: true, // 打印
        refresh: true, // 刷新
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      menuName: '惠民支付明细数据',
      tableColumnsConfig: [
        {
          title: '区划',
          field: 'mofDivCode',
          align: 'center',
          width: '180'
        },
        {
          title: '支付凭证号',
          field: 'payCertNo',
          align: 'center',
          width: '180'
        },
        {
          title: '金额（元）',
          field: 'money',
          align: 'center',
          width: '180'
        },
        {
          title: '收款账户名称',
          field: 'payeeAcctName',
          align: 'center',
          width: '180'
        },
        {
          title: '收款方账户',
          field: 'payeeAcctNo',
          align: 'center',
          width: '180'
        },
        {
          title: '收款开户银行',
          field: 'payeeAcctBank',
          align: 'center',
          width: '180'
        },
        {
          title: '街道(乡镇)名称',
          field: 'townName',
          align: 'center',
          width: '180'
        }
      ]
    }
  },
  created() {
    console.log(123)
  },
  methods: {
    dialogClose() {
      this.detailVisible = false
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
::v-deep .vxe-modal--box {
  width: 80%;
}
::v-deep .vxe-modal--title {
  display: none;
}
</style>
