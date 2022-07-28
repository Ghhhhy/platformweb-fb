/**
 * @author: chen_huanjie
 * @date: 2021.9.16
 * @description: 项目嵌套进帆软报表的模板
 *              使用帆软报表需要更改iframe标签的src路径
 *              报表页面显示和脚本插入能够正常，需要报表解析服务器与本组件同域同源
 *              非同源情况下，需要跨域处理，目前这个问题未解决
 *              但测试时候，是在finereport设计器内置服务器下测得页面，能够更改原有报表样式
 * @version: 1.0.0
 **/
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTabPane>
        <BsTabPanel
          :show-zero="false"
          is-open
          :tab-status-btn-config="tabStatusBtnConfig"
          :is-hide-query="true"
          @tabClick="onTabPaneltabClick"
          @btnClick="onTabPanelBtnClick"
        />
      </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <div class="mmc-left-tree height-all">
          <div class="mmc-left-tree-title">
            <BsTreeSet
              :tree-config="treeConfig"
              @onAsideChange="leftVisible = false"
              @onChangeInput="changeInput"
            />
          </div>
          <div class="mmc-left-tree-body">
            <BsTree
              ref="testTree"
              open-loading
              :filter-text="letftTreeFilterText"
              :config="leftTreeConfig"
              :tree-data="treeData"
              :queryparams="treeQueryparams"
              @onNodeCheckClick="onNodeCheckClick"
              @onNodeClick="onNodeClick"
            />
          </div>
        </div>
      </template>
      <template v-slot:mainForm>
        <div class="finereport finereport__toolbar">
          <vxe-button type="text" class="finereport finereport__title" content="帆软报表" />
          <vxe-button status="primary" size="mini" icon="vxe-icon--refresh" content="刷新" @click="onRefreshClick" />
          <vxe-button status="primary" size="mini" icon="vxe-icon--download" content="导出" @dropdown-click="onExportClick">
            <template #dropdowns>
              <vxe-button type="text" status="success" icon="vxe-icon--menu" name="excel" content="导出为Excel" />
              <vxe-button type="text" status="danger" icon="vxe-icon--menu" name="pdf" content="导出为PDF" />
              <vxe-button type="text" status="primary" icon="vxe-icon--menu" name="word" content="导出为Word" />
              <vxe-button type="text" status="custom-rainbow" icon="vxe-icon--menu" name="png" content="导出为图片" />
            </template>
          </vxe-button>
        </div>
        <iframe
          id="reportFrame"
          height="100%"
          src="http://localhost:8075/webroot/decision/view/report?viewlet=demo%252Fanalytics%252F%25E6%25A8%25AA%25E5%2590%2591%25E6%2589%25A9%25E5%25B1%2595%25E5%2590%258E%25E6%259F%2590%25E5%2588%2597%25E6%2595%25B0%25E6%258D%25AE%25E5%258D%25A0%25E6%25AF%2594.cpt&op=write"
        ></iframe>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { myMethods } from '@/views/test/blankTemplate/js/methods.js'
import mix from '@/mixin/commonMixin.js'

export default {
  name: 'FineReportTemplate',
  components: {},
  mixins: [mix],
  props: {
    allPropData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      tabStatusBtnConfig: {},
      treeConfig: {},
      leftVisible: true,
      letftTreeFilterText: '',
      leftTreeConfig: {},
      treeData: [],
      treeQueryparams: {}
    }
  },
  computed: {},
  watch: {
    queryFormData: {
      handler(newval) {
        console.log(newval)
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.initCreated()
    this.initFineReport()
  },
  mounted() {
    this.initMounted()
  },
  methods: {
    ...myMethods,
    // 初始化帆软报表样式
    initFineReport() {
      const iframe = document.getElementById('reportFrame')
      // 获取iframe内的页面文档对象
      let report = {}
      try {
        report = iframe.contentWindow.document
      } catch {
        this.$XModal.message({ id: 'finereportError', status: 'error', message: '获取帆软报表失败: 极有可能是跨源问题', duration: 5000 })
        return
      }
      // 获取帆软内置的工具栏对象
      const toolbar = report.getElementsByClassName('x-toolbar')[0]
      toolbar.style.display = 'none' // 将默认工具栏隐藏掉

      // 获取报表容器对象
      const container = report.getElementsByClassName('reportPane')[0]
      container.style.top = '0px' // 去除默认的finereport内置工具栏后，需要将整个报表上移，填充工具栏空白处

      // 获取单元格对象
      const td = report.getElementsByTagName('td')
      for (let i = 0; i < td.length; i++) {
        td[i].style.background = 'none' // 去除每个单元格的默认背景
        td[i].style.color = 'black' // 统一字体颜色
      }

      // 获取表格的表头行头像
      const tr = report.getElementsByTagName('tr')
      tr[0].style.backgroundColor = 'rgb(227, 242, 254)' // 将表头背景色配成和外页面相同风格
      // 表格斑马纹
      for (let i = 2; i < tr.length; i = i + 2) {
        tr[i].style.backgroundColor = 'rgb(244, 246, 253)'
      }
    },
    // 刷新
    onRefreshClick() {

    },
    // 导出
    onExportClick({ name, $event }) {
      const iframe = document.getElementById('reportFrame')
      let report = {}
      try {
        report = iframe.contentWindow.contentPane
      } catch {
        this.$XModal.message({ id: 'finereportError', status: 'error', message: '获取帆软报表失败: 极有可能是跨源问题', duration: 5000 })
        return
      }
      switch (name) {
        case 'excel':
          // 导出为Excel（格式为原样输出），FineReport内置方法
          report.exportReportToExcel('simple')
          break
        case 'pdf':
          // 导出为PDF，FineReport内置方法
          report.exportReportToPDF()
          break
        case 'word':
          // 导出为Word，FineReport内置方法
          report.exportReportToWord()
          break
        case 'png':
          // 导出为图片，FineReport内置方法
          report.exportReportToImage()
          break
      }
    }
  }

}
</script>

<style lang="scss" scope>
  .vxe-button.type--text.theme--custom-rainbow {
    background: linear-gradient(to right, orange,yellow,violet);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    &:hover{
      opacity: 0.75;
    }
  }
  .finereport.finereport__toolbar {
    text-align: center;
  }
  .finereport.finereport__title {
    width: 200px;
    height: 50px;
    background-color: rgb(227, 242, 254);
  }
  #reportFrame {
    border: 1px #eee solid;
  }
</style>
