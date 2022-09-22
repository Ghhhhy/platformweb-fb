<template>
  <div class="vxe-excel-module">
    <div class="option-line-group">
      <div class="fn-inline option-line-group-btn">
        <vxe-input placeholder="请输入名称" clearable />
        <vxe-button status="primary">确 定</vxe-button>
        <vxe-button code="reset">取 消</vxe-button>
      </div>
    </div>
    <div style="height:600px">
      <BsPdfPreview :no-turn-page="false" :pdf-data="pdfData" />
    </div>

    <!-- <vxe-excel
      ref="xExcel"
      :columns="columns"
      :data="tableData"
    />-->
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    let columns = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N'
    ]
    return {
      pdfData: {
        title: 'JavaScript语法一览表.pdf',
        src: require('./JavaScript语法一览表.pdf')
      },
      columns: [
        {
          type: 'index',
          width: 50,
          align: 'center',
          headerAlign: 'center'
        }
      ].concat(
        columns.map((name) => {
          return {
            field: name,
            title: name,
            minWidth: 76,
            headerAlign: 'center',
            editRender: {
              name: 'cell'
            }
          }
        })
      ),
      tableData: Array.from(new Array(20)).map((num, index) => {
        let item = {}
        columns.forEach((name) => {
          item[name] = ''
        })
        return item
      })
    }
  },
  methods: {},
  mounted() {},
  watch: {
    columns: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.vxe-excel-module {
  .option-line-group {
    line-height: 36px;
    .vxe-input {
      width: 200px;
    }
    .vxe-button {
      width: 150px;
    }
  }
}
</style>
