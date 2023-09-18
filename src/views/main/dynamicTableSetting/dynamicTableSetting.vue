<!--  表格信息配置   Author:Titans@2396757591@qq.com -->
<template>
  <div class="height-all">
    <BsMainFormListLayout :left-visible.sync="leftVisible">
      <template v-slot:topTap>
        <!-- <JsonEditor />  -->
      </template>
      <template v-slot:topTabPane> </template>
      <template v-slot:query> </template>
      <!-- leftVisible不为undefined为渲染mainTree和mainForm插槽 ，否则渲染mainCon插槽-->
      <template v-slot:mainTree>
        <div class="height-all left-tree-pane">
          <div class="mmc-left-tree-title">
            <BsTreeSet

              @onAsideChange="leftVisible = false"
              @onChangeInput="changeInput"
              @onConfrimData="confrimData"
            />
            <!-- <div class="mmc-title">
              <span class="fn-inline">菜单树</span>
            </div> -->
          </div>
          <div class="mmc-left-tree-body" style="height: calc(100% - 48px)">
            <BsBossTree
              ref="testTree"
              is-need-root
              :tree-props="{
                label: 'name',
                children: 'children',
              }"
              open-loading
              :is-server="false"
              :datas="leftTreeData"
              :server-uri="serverUri"
              :global-config="leftTreeConfig"
              :queryparams="treeQueryparams"
              :clickmethod="onLeftTreeNodeClick"
            />
          </div>
        </div>
      </template>
      <template v-slot:mainForm>
        <BsTable
          ref="bsTableRef"
          :footer-config="{ showFooter: false }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="curTableConfDatasMapArr"
          :toolbar-config="toolbarConfig"
          :pager-config="false"
          :edit-config="{}"
          @ajaxData="ajaxData"
          @editClosed="editClosed"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div
                v-if="leftVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftVisible = true"
              ></div>
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{
                  (curLeftTreeClickNode.name ? curLeftTreeClickNode.name : '') + '菜单表配置'
                }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
          <template v-slot:toolbar-custom-slot>
            <div class="toolbar-slot-custom-slot fn-inline">
              <!-- <vxe-button
                size="medium"
                status="primary"
                content="编辑表单项配置"
                @click="onEditFormClick"
              />
              <vxe-button
                size="medium"
                status="primary"
                content="编辑表格列配置"
                @click="onEditTableClick"
              /> -->
              <vxe-button
                size="medium"
                status="primary"
                content="新增"
                @click="onAddClick"
              />
              <vxe-button
                size="medium"
                status="primary"
                content="删除"
                @click="onDeleteClick"
              />
              <vxe-button
                size="medium"
                status="primary"
                content="编辑"
                @click="onEditClick"
              />
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <div>
      <TableConfModal
        v-if="tableConfModalVisible"
        :dialog-visible.sync="tableConfModalVisible"
        :params="tableConfModalParams"
        @closeCallback="refreshTable"
      />
      <FormConfModal
        v-if="formConfModalVisible"
        :dialog-visible.sync="formConfModalVisible"
        :params="tableConfModalParams"
        @closeCallback="refreshTable"
      />
      <EnteringDefault
        v-if="enteringDefaultVisible"
        :dialog-visible.sync="enteringDefaultVisible"
        :params="tableConfModalParams"
        @closeCallback="refreshTable"
      />
      <SubTabConfigModal
        v-if="SubTabConfigVisible"
        :dialog-visible.sync="SubTabConfigVisible"
        :params="tableConfModalParams"
        @closeCallback="refreshTable"
      />
    </div>
  </div>
</template>
<script>
import TableConfModal from './tableConfModal.vue'
import FormConfModal from './FormConfModal.vue'
import EnteringDefault from './enteringDefault.vue'
import getFormConfData from './formConf.js'
import SubTabConfigModal from './SubTabConfigModal.vue'
export default {
  name: '',
  components: {
    TableConfModal,
    FormConfModal,
    EnteringDefault,
    SubTabConfigModal
  },
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
      menuguids: [],
      curConfType: 'table',
      leftVisible: true,
      leftTreeData: [],
      curSplitPaneLeftWidth: 20,
      isShowQueryConditions: false,
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
      leftTreeConfig: {
        inputVal: ''
      },
      pagerConfig: {
        currentPage: 1,
        total: 100
      },
      curTableConfDatas: [],
      currentPage: 1,
      curTableConfDatasMapArr: [
        // {
        //   tableName: '1',
        //   businessTableName: '1',
        //   tableNote: '1',
        //   measuringUnit: 1,
        //   viewOrder: '001',
        //   editableBatch: '001',
        //   tableType: '001',
        //   note: '1',
        //   autoBuiltTables: false,
        //   editble: true,
        //   showCheckbox: true,
        //   canUse: true,
        //   aSingleTable: false,
        //   batchModify: false,
        //   rowConfig: false,
        //   noRecordIsAllowedToReport: true,
        //   subtotalRows: true
        // }
      ],
      curTableConfDatasMap: {},
      globleConfigCp: {
        tableName: '',
        businessTableName: '',
        tableNote: '',
        measuringUnit: '',
        viewOrder: '',
        editableBatch: '',
        tableType: '',
        note: '',
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
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('tableInforConf', 'toolbarConfig')
      },
      tableConfig: getFormConfData('tableInforConf', 'tableConfig'),
      tableColumnsConfig: getFormConfData(
        'tableInforConf',
        'tableColumnsConfig'
      ),
      tableConfModalVisible: false,
      formConfModalVisible: false,
      enteringDefaultVisible: false,
      curLeftTreeClickNode: {},
      enteringDefaultFlag: false,
      SubTabConfigVisible: false
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
    jsonStringify(columns) {
      // 对象转换成json字符串
      return JSON.stringify(columns, function (key, val) {
        if (typeof val === 'function') {
          return val + ''
        }
        return val
      })
    },
    jsonParse(str) {
      // json字符串转换成对象
      return JSON.parse(str, function (k, v) {
        try {
          if (
            v.indexOf &&
            (v.indexOf('function') > -1 || v.indexOf('=>') > -1)
          ) {
            // return eval('(function(){return ' + v + ' })()')
            // eslint-disable-next-line no-new-func
            let func = new Function('return ' + v)
            return func()
          }
          return v
        } catch (e) {
          return v
        }
      })
    },
    changeInput(val) {
      this.$refs.testTree.filterText = val
    },
    confrimData(curTree) {
      this.confrimData.curRadio = curTree.code
      switch (curTree.code) {
        case 'zf':
          break
        case 'xuexiao':
          this.tabStatusNumConfig['ycl'] = 12
          break
        case 'jigou':
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
      this.$http.post('url', this.queryParams).then((res) => {
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
    transformConlumsDataToNest(columns) {
      // columns转化为vxe-table columns数据结构
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
                return params
                  ? params.split('+').map((item, index) => {
                    return {
                      value: item.split('#')[0],
                      label: item.split('#')[1]
                    }
                  })
                  : []
              } else {
                return params
              }
            })(column.options), // 下拉数据源
            defaultValue: column.defaultValue, // 默认值
            props: column.props // 额外参数
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
      // vxe-table columns数据结构转化为单层columns
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
            column = Object.assign(column, self.deepCopy(column.cellRender))
          } else if (column.hasOwnProperty('itemRender')) {
            column.renderType = 'itemRender'
            column.renderName = column.itemRender.name
            column = Object.assign(column, self.deepCopy(column.itemRender))
          } else {
          }
          if (['$select', '$vxeSelect', '$vxeFormSelect', '$vxeSwitch', '$vxeRadio', '$vxeSwitch', '$vxeCheckbox'].indexOf(column.renderName) >= 0) {
            column.options = column.options
              .map((item, index) => {
                return item.value + '#' + item.label
              })
              .join('+')
          }
        }
      })
      return columns
    },
    transformItemsDataToSingle(items) {
      // vxe-table items数据结构转化为单层items
      let self = this
      items.forEach((item, itemIndex) => {
        if (Array.isArray(item.children) && item.children.length) {
          item.children = self.transformConlumsDataToNest(item.children)
        } else {
          if (item.hasOwnProperty('itemRender')) {
            item.renderType = 'itemRender'
            item.renderName = item.itemRender.name
            item = Object.assign(item, self.deepCopy(item.itemRender))
            delete item.itemRender
          }
          if (['$select', '$vxeSelect', '$vxeFormRadio', '$vxeFormSelect', '$vxeSwitch', '$vxeRadio', '$vxeSwitch', '$vxeCheckbox', '$vxeFormCheckbox'].indexOf(item.renderName) >= 0) {
            item.options = Array.isArray(item.options) ? item.options
              .map((item, index) => {
                return item.value + '#' + item.label
              })
              .join('+') : item.options
          }
        }
      })
      return items
    },
    getTableConfByMenuguid(menuguid) {
      // 根据菜单menuguid获取其下所有表配置
      let self = this
      return new Promise((resolve, reject) => {
        self.$http
          .get('mp-b-perm-service/v1/tableconf/menuguid', {
            menuguid: menuguid,
            mof_div_code: self.userInfo.province, // 区划
            fiscalyear: self.userInfo.year // 年份
          })
          .then((res) => {
            if (res.rscode === '100000') {
              resolve(res.data)
              // resolve(self.generateCurTableConfDataMap(res.data))
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    generateCurTableConfDataMap(curMenuConfs) {
      // 生成当前menu下表格数据映射
      let self = this
      let resultObj = {}
      let curTableConfDatasMap = {}
      let curTableConfDatasMapArr = []
      resultObj.curTableConfDatas = curMenuConfs
      curMenuConfs.forEach((item, index) => {
        let { itemsConfig, globalConfig, formConfig } = self.jsonParse(
          item.configure
        )
        globalConfig = globalConfig || {}
        itemsConfig = itemsConfig || []
        formConfig = formConfig || []
        let globalConfigCp = Object.assign(
          {
            tablename: '',
            businessTableName: '',
            tableNote: '',
            measuringUnit: '',
            viewOrder: '',
            editableBatch: '',
            tableType: '',
            note: '',
            autoBuiltTables: '',
            editble: '',
            showCheckbox: '',
            canUse: '',
            aSingleTable: '',
            batchModify: '',
            rowConfig: '',
            noRecordIsAllowedToReport: '',
            subtotalRows: ''
          },
          globalConfig,
          {
            // tablename: item.tablename,
            type: item.type,
            updatetime: item.updatetime,
            menuname: this.curLeftTreeClickNode.name,
            id: item.id,
            menuguid: item.menuguid
          }
        )
        curTableConfDatasMapArr.push(globalConfigCp)
        curTableConfDatasMap[item.id] = {
          itemsConfig: self.transformConlumsDataToSingle(itemsConfig),
          formConfig: self.transformItemsDataToSingle(formConfig),
          id: item.id,
          globalConfig: globalConfigCp,
          menuguid: item.menuguid,
          type: item.type
        }
      })
      resultObj.curTableConfDatasMapArr = curTableConfDatasMapArr
      resultObj.curTableConfDatasMap = curTableConfDatasMap
      return resultObj
    },
    setLeftMenuTree() {
      // 加载左侧树
      this.leftTreeData = [].concat(this.$store.state.systemMenu)
    },
    onLeftTreeNodeClick(node, leftTree) {
      // 左侧树点击事件
      if (!(Array.isArray(node.children) && node.children.length)) {
        let self = this
        this.curLeftTreeClickNode = node
        this.getTableConfByMenuguid(node.guid).then((res) => {
          self.$message({
            showClose: true,
            message: `当前菜单数据查询成功,共计(${res.length}条)`,
            type: 'success'
          })
          self.curTableConfDatasMapArr = res
        })
      }
    },
    refreshTable() {
      // 刷新表格
      let self = this
      this.getTableConfByMenuguid(this.curLeftTreeClickNode.guid).then(
        (res) => {
          self.$message({
            showClose: true,
            message: '当前菜单数据已刷新',
            type: 'success'
          })
          self.curTableConfDatasMapArr = res
          self.$refs.bsTableRef
            .tableOptionFn()
            .reloadData(self.curTableConfDatasMapArr).then(() => {}).catch(() => {
            })
        }
      )
    },
    onEditTableClick() {
      // 编辑点击事件
      let selection = this.$refs.bsTableRef.selection
      if (selection.length === 1) {
        let { itemsConfig, globalConfig, formConfig } = this.jsonParse(
          selection[0].configure
        )
        globalConfig = globalConfig || {}
        itemsConfig = itemsConfig || []
        formConfig = formConfig || []
        this.tableConfModalParams = Object.assign(selection[0], {
          globalConfig: globalConfig,
          itemsConfig: this.transformConlumsDataToSingle(itemsConfig),
          formConfig: this.transformItemsDataToSingle(formConfig)
        })
        this.tableConfModalVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条数据进行编辑',
          type: 'info'
        })
      }
    },
    onEditFormClick() {
      // 编辑点击事件
      let selection = this.$refs.bsTableRef.selection
      if (selection.length === 1) {
        let { itemsConfig, globalConfig, formConfig } = this.jsonParse(
          selection[0].configure
        )
        globalConfig = globalConfig || {}
        itemsConfig = itemsConfig || []
        formConfig = formConfig || []
        this.tableConfModalParams = Object.assign(selection[0], {
          globalConfig: globalConfig,
          itemsConfig: this.transformConlumsDataToSingle(itemsConfig),
          formConfig: this.transformItemsDataToSingle(formConfig)
        })
        this.formConfModalVisible = true
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条数据进行编辑',
          type: 'info'
        })
      }
    },
    onEditClick() {
      let selection = this.$refs.bsTableRef.selection
      if (selection.length === 1) {
        let { itemsConfig, globalConfig, subTabConfig, defaultConfig } = this.jsonParse(
          selection[0].configure
        )
        globalConfig = globalConfig || {}
        itemsConfig = itemsConfig || []
        subTabConfig = subTabConfig || {
          buttons: [],
          buttonsInfo: {}
        }
        defaultConfig = defaultConfig || []
        if (selection[0].type === 'form' || selection[0].type === 'formConf' || selection[0].type === 'detail' || selection[0].type === 'detailConf') {
          this.tableConfModalParams = Object.assign(selection[0], {
            globalConfig: globalConfig,
            itemsConfigNest: this.deepCopy(itemsConfig),
            itemsConfig: this.transformItemsDataToSingle(itemsConfig)
          })
          this.formConfModalVisible = true
        } else if (selection[0].type === 'tabPaneConf') {
          this.tableConfModalParams = Object.assign(selection[0], {
            globalConfig: globalConfig,
            itemsConfigNest: this.deepCopy(subTabConfig),
            subTabConfig: subTabConfig
          })
          this.SubTabConfigVisible = true
        } else if (selection[0].type === 'enteringDefault') {
          this.tableConfModalParams = Object.assign(selection[0], {
            globalConfig: globalConfig,
            itemsConfigNest: this.deepCopy(defaultConfig),
            itemsConfig: this.transformConlumsDataToSingle(defaultConfig)
          })
          this.enteringDefaultVisible = true
        } else {
          this.tableConfModalParams = Object.assign(selection[0], {
            globalConfig: globalConfig,
            itemsConfigNest: this.deepCopy(itemsConfig),
            itemsConfig: this.transformConlumsDataToSingle(itemsConfig)
          })
          this.tableConfModalVisible = true
        }
      } else {
        this.$message({
          showClose: true,
          message: '请选择一条数据进行编辑',
          type: 'info'
        })
      }
    },
    onAddClick() {
      let self = this
      this.$refs.bsTableRef.insertRowData({
        data: {
          menuguid: self.curLeftTreeClickNode.guid,
          type: 'table',
          optionType: 'add',
          id: self.$ToolFn.utilFn.getUuid(),
          menuname: self.curLeftTreeClickNode.name,
          mof_div_code: self.userInfo.province,
          tablename: '',
          fiscalyear: self.userInfo.year,
          configure: self.jsonStringify({
            globalConfig: {}, // 全局配置
            itemsConfig: [], // 项配置
            pageConfig: {}, // 分页配置
            editConfig: {}, // 编辑配置
            editRules: {}, // 校验规则
            footerConfig: {}, // 表尾配置
            dataConfig: {
              dataSouceType: 'query'
            },
            subTabConfig: [],
            defaultConfig: [] // 录入默认值
          })
        // menuguid: '123456'
        }
      })
    },
    onDeleteClick() {
      let self = this
      let ids = this.$refs.bsTableRef.selection.map((item, index) => {
        return item.id
      })
      let menuguid = this.$refs.bsTableRef.selection[0].menuguid
      this.menuguids[0] = menuguid
      if (ids.length) {
        self.$confirm('确定删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http
            .del('mp-b-perm-service/v1/tableconf', {
              mof_div_code: self.userInfo.province, // 区划
              fiscalyear: self.userInfo.year, // 年份s
              ids: ids,
              menuguids: this.menuguids
            })
            .then((res) => {
              if (res.rscode === '100000') {
                self.$message({
                  showClose: true,
                  message: `选中的${ids.length}条数据已删除`,
                  type: 'success'
                })
                self.refreshTable()
                // resolve(self.generateCurTableConfDataMap(res.data))
              }
            })
            .catch((error) => {
              console.log('error', error)
            })
        }).catch(e => {
          self.$message.success('取消删除成功')
        })
      }
    },
    onTableCellClick({
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      triggerRadio,
      triggerCheckbox,
      triggerTreeNode,
      triggerExpandNode,
      $event
    }) {
      // this.tableConfModalParams = this.curTableConfDatasMap[row.id]
      // this.TableConfModalVisible = true
    },
    // 区划默认值
    getProvince() {
      let obj = {
        value: this.userInfo.province,
        label: this.userInfo.admdivname
      }
      let flag = false
      this.tableColumnsConfig[0].editRender.options.forEach(item => {
        if (item.value === this.userInfo.province) {
          flag = true
        }
      })
      if (!flag) {
        this.tableColumnsConfig[0].editRender.options.push(obj)
      }
      this.tableColumnsConfig[0].editRender.defaultValue = this.userInfo.province
    },
    // 编辑的时候录入默认值有个默认id
    editClosed({ row, column }) {
      // enteringDefaultFlag标识，当改过为录入默认值后，再更改才影响id变化
      if (row.type === 'enteringDefault') {
        row.id = 'D9A0B58E5C2242F3860E6D8151C211B2'
        row.id__viewSort = 'D9A0B58E5C2242F3860E6D8151C211B2'
        this.enteringDefaultFlag = true
      } else if (row.type !== 'enteringDefault' && this.enteringDefaultFlag === true) {
        row.id = this.$ToolFn.utilFn.getUuid()
        row.id__viewSort = row.id
        this.enteringDefaultFlag = false
      }
    }
  },
  mounted() {
    this.setLeftMenuTree()
    if (this.$gloableToolFn?.currentProvince === this.$gloableToolFn?.FuJian) {
      this.getProvince()
    }
  },
  watch: {
    tableConfModalVisible: {
      handler(newval) {
        // if (!newval) {
        //   this.refreshTable()
        // }
      },
      // deep: true,
      immediate: true
    },
    formConfModalVisible: {
      handler(newval) {
        // if (!newval) {
        //   this.refreshTable()
        // }
      },
      // deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.left-tree-pane {
  .mmc-title {
    height: 47px;
    padding: 7px 15px;
    line-height: 31px;
    color: #464c5b;
    font-size: 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #dce3f3;
    background-color: #e3f2fe;
  }
}
</style>
