<template>
  <div :style="{ 'height': 60 + tableData.length * 32 + 'px' }">
    <BsTable
      ref="expandRefs"
      :footer-config="false"
      :table-columns-config="expandContentTableColumnsConfig"
      :table-data="tableData"
      :edit-config="{
        activeMethod(){
          return true
        },
      }"
      :toolbar-config="{
        reverseCheck: true,
      }"
      :pager-config="false"
      height="100%"
      @checkboxChange="(obj,e) => { expandContentTableCheckboxChange(obj,e) }"
      @checkboxAll="(obj,e) => { expandContentTableCheckboxAll(obj,e) }"
    />
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      expandContentTableColumnsConfig: [
        {
          field: 'time',
          title: 'Time'
        },
        {
          field: 'income',
          title: 'Income',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'tax',
          title: 'Tax',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'deduction',
          title: 'Deduction',
          formula: '{income}*0.07',
          cellRender: {
            name: '$vxeCalculate'
          }
        },
        {
          field: 'bonus',
          title: 'Bonus',
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          field: 'profit',
          title: 'Profit',
          combinedType: ['average', 'total'],
          formula: '{income}-{tax}-{Deduction}+{bonus}',
          cellRender: {
            name: '$vxeCalculate'
          }
        }
      ]
    }
  },
  methods: {
    expandContentTableCheckboxChange({ records, reserves, indeterminates, checked, $event }) {

    },
    expandContentTableCheckboxAll({ records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }) {

    }
  },
  mounted() {},
  watch: {
    tem: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
