<!--  表格信息配置   Author:Titans@2396757591@qq.com -->
<template>
  <BsMainFormListLayout :left-visible.sync="leftVisible">
    <template v-slot:topTap>
      <!-- <BsJsonEditor />  -->
    </template>
    <template v-slot:topTabPane> </template>
    <template v-slot:query>
      <div class="manage-form">
        <BsQuery
          ref="queryForm"
          :query-config="{
            searchBtnText: '',
            resetBtnText: '',
            moreBtnText: '更多',
          }"
          :query-form-item-config="formItemsConfig"
          :query-form-data="formDataList"
          @itemChange="itemChange"
          @onSearchClick="onSearchClick"
        >
          <template v-slot:formFootSlot>
            <div>
              <vxe-checkbox
                v-model="gloableConfig.autoBuiltTables"
                size="medium"
                content="是否自动建表和视图"
              />
              <vxe-checkbox
                v-model="gloableConfig.editble"
                size="medium"
                content="表格数据是否可编辑"
              />
              <vxe-checkbox
                v-model="gloableConfig.showCheckbox"
                size="medium"
                content="是否显示复选框"
              />
              <vxe-checkbox
                v-model="gloableConfig.canUse"
                size="medium"
                content="是否可用"
              />
              <vxe-checkbox
                v-model="gloableConfig.aSingleTable"
                size="medium"
                content="是否单行表"
              />
              <vxe-checkbox
                v-model="gloableConfig.batchModify"
                size="medium"
                content="是否批量修改"
              />
              <vxe-checkbox
                v-model="gloableConfig.rowConfig"
                size="medium"
                content="是否有行配置"
              />
              <vxe-checkbox
                v-model="gloableConfig.noRecordIsAllowedToReport"
                size="medium"
                content="无记录是否允许上报"
              />
              <vxe-checkbox
                v-model="gloableConfig.subtotalRows"
                size="medium"
                content="是否显示小计行"
              />
            </div>
          </template>
        </BsQuery>
      </div>
    </template>
    <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
    <template v-slot:mainTree>
      <div class="mmc-left-tree height-all">
        <div class="mmc-left-tree-title">
          <BsTreeSet
            :tree-config="treeConfig"
            @onAsideChange="leftVisible = false"
            @onChangeInput="changeInput"
            @onConfrimData="confrimData"
          />
        </div>
        <div class="mmc-left-tree-body">
          <BsBossTree
            ref="testTree"
            is-need-root
            open-loading
            :is-server="true"
            :datas="treeData"
            :server-uri="serverUri"
            :global-config="leftTreeConfig"
            :queryparams="queryparams"
          />
        </div>
      </div>

      <div class=""></div>
    </template>
    <template v-slot:mainForm>
      <BsTable
        ref="bsTableRef"
        :footer-config="{ showFooter: false }"
        :table-config="tableConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :expand-config="{
          showIcon: true,
          accordion: true,
          lazy: true,
          toggleMethod: toggleContentMethod,
          loadMethod: loadContentMethod,
          visibleMethod: visibleContentMethod,
        }"
        :edit-config="editConfig"
        :toolbar-config="toolbarConfig"
        :edit-rules="editRules"
        :pager-config="false"
        :default-money-unit="1"
        @ajaxData="ajaxData"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div
              v-if="leftVisible === false"
              class="table-toolbar-contro-leftvisible"
              @click="leftVisible = true"
            ></div>
            <!-- <div class="table-toolbar-left-title">
              <span class="fn-inline">计划申请单列表</span>
              <i class="fn-inline"></i>
            </div> -->
          </div>
          <div class="toolbar-slot-left">
            <vxe-button
              size="medium"
              status="primary"
              content="新增"
              @click="onAddTableClick"
            />
            <vxe-button
              size="medium"
              status="primary"
              content="编辑"
              @click="onEditTableClick"
            />
          </div>
        </template>
        <template v-slot:toolbar-custom-slot>
          <div class="toolbar-slot-custom-slot fn-inline">
            <vxe-button
              size="medium"
              status="success"
              content="保存"
              @click="onSaveTableClick"
            />
          </div>
        </template>
      </BsTable>
    </template>
  </BsMainFormListLayout>
</template>
<script>
import getFormConfData from './formConf.js'
import { proconf } from './config/AddUnitFundPlan.js'
export default {
  name: '',
  props: {
    allPropData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {},
  data() {
    return {
      curConfType: 'table',
      leftVisible: true,
      curSplitPaneLeftWidth: 20,
      isShowQueryConditions: false,
      isMoreSearch: false,
      serverUri: 'mp-b-perm-service/v1/tableconf/menuguid',
      treeQueryparams: {
        menuguid: 'test_123456',
        useRight: false,
        batchno: 2,
        datatype: 5,
        eleCode: 'DEPBGTECO',
        sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
      },
      treeleftTreeConfig: {
        inputVal: ''
      },
      treeConfig: {
        curRadio: 'zf',
        radioGroup: [
          {
            code: 'zf',
            label: '政府部门树'
          },
          {
            code: 'xuexiao',
            label: '学校树'
          },
          {
            code: 'jigou',
            label: '机构树'
          }
        ]
      },
      gloableConfig: {
        autoBuiltTables: false,
        editble: true,
        showCheckbox: true,
        canUse: true,
        aSingleTable: false,
        batchModify: false,
        rowConfig: false,
        noRecordIsAllowedToReport: true,
        subtotalRows: true
      },
      leftTreeConfig: {
        inputVal: ''
      },
      formGloabalConfig: {
        span: 4,
        align: 'left',
        size: 'medium',
        titleAlign: 'right',
        titleWidth: 0,
        titleColon: false,
        preventSubmit: false,
        loading: false,
        validConfig: {
          autoPos: true
        }
      },
      pagerConfig: {
        currentPage: 1,
        total: 100
      },
      currentPage: 1,
      toolbarConfig: {
        disabledMoneyConversion: true,
        ...getFormConfData('tableConf', 'toolbarConfig')
      },
      tableConfig: getFormConfData('tableConf', 'tableConfig'),
      tableColumnsConfig: getFormConfData('tableConf', 'tableColumnsConfig'),
      tableData: getFormConfData('tableConf', 'tableData'),
      editRules: getFormConfData('tableConf', 'editRules'),
      formItemsConfig: getFormConfData('formConf', 'formItemsConfig'),
      formDataList: getFormConfData('formConf', 'formDataList')
    }
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    },
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] =
            typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    changeInput(val) {
      this.treeleftTreeConfig.inputVal = val
    },
    confrimData(curTree) {
      this.confrimData.curRadio = curTree.code
      switch (curTree.code) {
        case 'zf':
          console.log('切换成政府树条件，加载政府树...')
          break
        case 'xuexiao':
          console.log('切换成学校树条件，加载学校树...')
          this.tabStatusNumConfig['ycl'] = 12
          break
        case 'jigou':
          console.log('切换成机构树条件，加载机构树...')
          break
      }
    },
    onSplitPaneResize(leftWidth) {
      if (leftWidth > 1) {
        this.curSplitPaneLeftWidth = leftWidth
        this.leftVisible = true
      } else {
        this.leftVisible = false
      }
    },
    onSearchClick(obj) {
      console.log(obj)
    },
    ajaxData({ currentPage, pageSize }) {
      this.pagerConfig.currentPage = currentPage
      this.queryParams = Object.assign(this.queryParams, {
        currentPage,
        pageSize
      })
      this.getTableDatas(currentPage, pageSize)
    },
    getTableDatas(currentPage, pageSize) {
      // 服务端查询数据
      this.showLoading = true
      let self = this
      this.$http.post('url', this.queryParams).then(res => {
        if (res.code === 200) {
          self.tableData = res.data.list
          self.pagerConfig = {
            total: res.data.total,
            currentPage: currentPage
          }
          this.showLoading = false
        }
      })
    },
    itemChange({ $form, property, itemValue, data }, bsform) {

    },
    toggleContentMethod({ expanded, column, columnIndex, row, rowIndex }) {
      this.$refs.bsTableRef.tableOptionFn().clearRowExpandLoaded(row)
      return true
    },
    loadContentMethod({ row, rowIndex, $rowIndex }) {
      console.log('1234')
      // let self = this
      return new Promise((resolve) => {
        setTimeout(() => {
          const childCols = [
            {
              field: 'time',
              title: 'Time'
            },
            {
              field: 'income',
              title: 'Income',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'tax',
              title: 'Tax',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'deduction',
              title: 'Deduction',
              formula: '{income}*0.07',
              cellRender: {
                name: '$calculateRender'
              }
            },
            {
              field: 'bonus',
              title: 'Bonus',
              cellRender: {
                name: '$moneyRender'
              }
            },
            {
              field: 'profit',
              title: 'Profit',
              combinedType: ['average', 'total'],
              formula: '{income}-{tax}-{Deduction}+{bonus}',
              cellRender: {
                name: '$calculateRender'
              }
            }
          ]
          const childData = [
            {
              time: '2020-01-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-02-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-03-20',
              income: 14000,
              tax: 200,
              bonus: 1000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-04-20',
              income: 14000,
              tax: 200,
              bonus: 6000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-05-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            },
            {
              time: '2020-06-20',
              income: 16000,
              tax: 210,
              bonus: 2000,
              profit: '',
              deduction: ''
            }
          ]
          row.childCols = childCols
          row.childData = childData
          resolve()
        }, 500)
      })
    },
    transformConlumsDataToNest(columns) {
      let self = this
      columns.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          column.children = self.transformConlumsDataToNest(column.children)
        } else {
          column[column.renderType] = {
            name: column.renderName, // 渲染器名,
            options: ((params) => {
              if (typeof params === 'object') {
                return self.deepCopy(params)
              } else if (typeof params === 'string') {
                return params ? params.split('+').map((item, index) => {
                  return { value: item.split('#')[0], label: item.split('#')[1] }
                }) : []
              } else {
                return params
              }
            })(column.options), // 下拉数据源
            defaultValue: column.defaultValue, // 默认值
            props: column.props// 额外参数
          }
          delete column._XID
          delete column.renderType
          delete column.renderName
          delete column.options
          delete column.props
          delete column.defaultValue
          delete self.deepCopy(column.props)
        }
      })
      return columns
    },
    transformConlumsDataToSingle(columns) {
      let self = this
      columns.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          column.children = self.transformConlumsDataToNest(column.children)
        } else {
          if (column.hasOwnProperty('editRender')) {
            column.renderType = 'editRender'
            column.renderName = column.editRender.name
            column = Object.assign(column, self.deepCopy(column.editRender))
            delete column.editRender
          } else if (column.hasOwnProperty('cellRender')) {
            column.renderType = 'cellRender'
            column.renderName = column.cellRender.name
            column = Object.assign(column, self.deepCopy(column.editRender))
          } else if (column.hasOwnProperty('itemRender')) {
            column.renderType = 'itemRender'
            column.renderName = column.itemRender.name
            column = Object.assign(column, self.deepCopy(column.editRender))
          }
        }
      })
      return columns
    },
    jsonStringify(columns) {
      // 对象转换成json字符串
      return JSON.stringify(columns, function(key, val) {
        if (typeof val === 'function') {
          return val + ''
        }
        return val
      })
    },
    jsonParse(str) {
      // json字符串转换成对象
      return JSON.parse(str, function(k, v) {
        if (v.indexOf && (v.indexOf('function') > -1 || v.indexOf('=>') > -1)) {
          // return eval('(function(){return ' + v + ' })()')
          // eslint-disable-next-line no-new-func
          let func = new Function('return ' + v)
          return func()
        }
        return v
      })
    },

    onAddTableClick() {
      this.getTableConfByMenuguid('test1234567890')
    },
    onEditTableClick() {

    },
    onSaveTableClick() {
      // const { fullData } = this.$refs.bsTableRef.getTableData()
      // let saveJson = this.transformConlumsDataToNest(this.deepCopy(fullData))
      // console.log(saveJson, this.jsonStringify(saveJson))
      this.saveTableConf(this.jsonStringify(proconf.addTableColumnsConfig))
    },
    saveTableConf(tableConfStr) {
      let self = this
      this.$http.post('mp-b-perm-service/v1/tableconf', {
        menuguid: 'test1234567890',
        type: 'tableConf',
        configure: tableConfStr,
        id: self.$ToolFn.utilFn.getUuid()
      }).then(res => {
        if (res.rscode === '100000') {
          this.$message({
            showClose: true,
            message: '数额保存成功',
            type: 'success'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getTableConfByMenuguid(menuguid) {
      let self = this
      this.$http.get('mp-b-perm-service/v1/tableconf/menuguid', {
        menuguid: menuguid
      }).then(res => {
        if (res.rscode === '100000') {
          self.tableData = self.transformConlumsDataToSingle(self.jsonParse(res.data[0].configure))
          self.treeData = res.data
          self.$message({
            showClose: true,
            message: '当前菜单数据查询成功',
            type: 'success'
          })
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getTableConfByMenuguid('test_123456')
  },
  watch: {
    queryFormData: {
      handler(newval) {
        console.log(newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
