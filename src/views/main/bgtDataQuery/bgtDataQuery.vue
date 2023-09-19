<!-- 预算执行报表-指标数据查询 -->
<template>
  <div v-loading="isLoadingShow" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template #topTap></template>
      <template #topTabPane>
        <BsTabPanel
          show-zero
          is-open
          :tab-status-btn-config="tabStatusBtnConfig"
          :tab-status-num-config="tabStatusNumConfig"
          @onQueryConditionsClick="onQueryConditionsClick"
        />
      </template>
      <template #query>
        <div v-if="isShowQueryConditions" ref="BsQueryRef" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryFormItemConfig"
            :query-form-data="queryFormData"
            @onSearchClick="handleSearch"
          />
        </div>
      </template>
      <template #mainTree>
        <BsTreeSet
          v-model="leftTreeVisible"
          :tree-config="treeConfig"
          class="content"
          @onChangeInput="treeOnChangeInput"
          @onAsideChange="treeOnAsideChange"
          @onConfrimData="treeOnConfirmData"
        />
        <BsBossTree
          ref="leftTree"
          :key="treeKey"
          open-loading
          :defaultexpandedkeys="['0']"
          :is-server="false"
          :ajax-type="'get'"
          :server-uri="'pay-clear-service/v3/lefttree'"
          :datas="treeData"
          :queryparams="treeQueryparams"
          :global-config="treeGlobalConfig"
          :clickmethod="treeClickMethod"
        />
      </template>
      <template #mainForm>
        <!-- :row-config="{ keyField: 'id' }" -->
        <!-- :pager-config="tablePagerConfig" -->
        <BsTable
          ref="mainTableRef"
          v-loading="tableLoading"
          :high-config="scrollY"
          :row-id="'id'"
          :footer-config="tableFooterConfig"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          :table-config="tableConfig"
          :pager-config="false"
          :toolbar-config="tableToolbarConfig"
          :tree-config="treeTableConfig"
          :cell-style="cellStyle"
          @onToolbarBtnClick="onToolbarBtnClick"
          @cellClick="cellClick"
        >
          <template slot="toolbarSlots">
            <div class="table-toolbar-left">
              <!-- <div
                v-if="leftTreeVisible === false"
                class="table-toolbar-contro-leftvisible"
                @click="leftTreeVisible = true"
              ></div> -->
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <vxe-modal
      v-model="settingModal"
      :title="'设置条件'"
      width="1000px"
      height="621px"
      :show-footer="true"
      transfer
      @close="cancelDialogClose"
    >
      <div style="overflow: hidden">
        <div class="tag-button-form">
          <el-row type="flex" :gutter="10">
            <el-col :span="1.5" style="padding: 6px 0 0 5px">
              <b>选择模板</b>
            </el-col>
            <el-col :span="3.5" style="margin-left: 10px">
              <vxe-select v-model="treeTemplateSel" placeholder="请选择模板" :options="temOption" clearable @change="dropdownmethod" />
            </el-col>
            <el-col :span="12" style="padding-top: 3px">
              <vxe-button
                style="margin-left: 12px"
                size="mini"
                status="primary"
                @click="templateManage"
              >
                模板管理
              </vxe-button>
              <vxe-button
                size="mini"
                status="primary"
                @click="reset"
              >
                恢复默认
              </vxe-button>
              <el-popover
                v-model="tempSaveShow"
                placement="bottom"
                width="400"
                trigger="manual"
              >
                <div v-if="tempSaveShow">
                  <vxe-form v-if="isNew">
                    <vxe-form-item title="模板名称：" field="name">
                      <template v-slot>
                        <vxe-input
                          v-model="modalName"
                          style="width: 100%"
                          placeholder="请输入模板名称"
                          clearable
                        />
                      </template>
                    </vxe-form-item>
                    <vxe-form-item style="float: right">
                      <template v-slot>
                        <vxe-button status="primary" size="mini" :loading="btnLoading" @click="handleSave('save')">确定</vxe-button>
                        <vxe-button size="mini" @click="handleCloseTemplate">取消</vxe-button>
                      </template>
                    </vxe-form-item>
                  </vxe-form>
                  <vxe-form v-else>
                    <vxe-form-item>
                      <template v-slot>
                        <i class="el-icon-warning" style="color:red"></i>
                        <span>是否覆盖当前模板[{{ modalName }}]？</span>
                      </template>
                    </vxe-form-item>
                    <vxe-form-item style="float: right">
                      <template v-slot>
                        <vxe-button size="mini" :loading="btnLoading" @click="handleTrue">是</vxe-button>
                        <vxe-button status="primary" size="mini" @click="handleFalse">否</vxe-button>
                      </template>
                    </vxe-form-item>
                  </vxe-form>
                </div>
                <vxe-button
                  slot="reference"
                  style="margin-left: 12px"
                  size="mini"
                  status="primary"
                  @click="saveTemplate"
                >
                  条件保存为模板
                </vxe-button>
              </el-popover>
              <vxe-checkbox v-model="isShowDetails" style="margin-left: 10px;" content="只展示明细" />
              <!-- <vxe-button
                style="margin-left: 12px"
                round
                size="mini"
                status="my-blue"
                icon="el-icon-s-check"
                @click="templateAuthorize"
              >
                模板授权
              </vxe-button> -->
            </el-col>
          </el-row>
        </div>
        <div style="height: 461px;margin-top: 10px">
          <BsTable
            ref="settingTableRef"
            v-loading="settingTableLoading"
            class="settingtable"
            height="99%"
            :table-config="settingTableConfig"
            :table-global-config="settingTableGlobalConfig"
            :footer-config="{ showFooter: false }"
            :table-columns-config="settingTableColumnsConfig"
            :table-data="settingTableData"
            :toolbar-config="false"
            :pager-config="false"
          />
        </div>
      </div>
      <template slot="footer">
        <vxe-button size="medium" @click="cancelDialogClose">取消</vxe-button>
        <vxe-button
          size="medium"
          status="primary"
          @click="handleSureSetting"
        >确定</vxe-button>
      </template>
    </vxe-modal>
    <vxe-modal
      v-model="amtDetailModal"
      v-loading="amtDetailTableLoading"
      :title="'金额明细'"
      width="80%"
      height="60%"
      :show-footer="false"
      transfer
      @close="cancelDialogClose"
    >
      <div style="height: 99%">
        <BsTable
          ref="amtDetailTableRef"
          height="99%"
          :table-config="amtDetailTableConfig"
          :footer-config="amtDetailTableFooterConfig"
          :table-columns-config="amtDetailTableColumnsConfig"
          :table-data="amtDetailTableData"
          :toolbar-config="false"
          :pager-config="amtDetailTablePagerConfig"
          @ajaxData="amtDetailAjaxData"
        />
      </div>
    </vxe-modal>
    <vxe-modal
      v-model="templateModal"
      :title="'模板列表'"
      width="40%"
      height="70%"
      :show-footer="false"
      transfer
      @close="cancelDialogCloseTemplate"
    >
      <div class="buttons">
        <el-button type="primary" @click="handleTemplateUse">模板调用</el-button>
        <el-button @click="setDefalutTemplate">设为默认</el-button>
        <el-button @click="deleteTemplate">删除</el-button>
        <el-button @click="cancelDialogCloseTemplate">取消</el-button>
      </div>
      <div style="height: 85%">
        <BsTable
          ref="templateTableRef"
          v-loading="templateTableLoading"
          :table-config="templateTableConfig"
          :footer-config="false"
          :table-columns-config="templateTableColumnsConfig"
          :table-data="templateTableData"
          :toolbar-config="false"
          :pager-config="false"
        />
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HTTPModule from '@/api/frame/main/baseConfigManage/customQueryService.js'
import { proconf } from './js/bgtDataQuery.js'
// import loadBsConfig from '@/views/main/dynamicTableSetting/config'
export default {
  // mixins: [loadBsConfig],
  data() {
    return {
      queryConfigId: '1B7EAFCAC74B49938E59A647BB96A6A5',
      isShowDetails: false,
      scrollY: {
        scrollY: {
          mode: 'wheel',
          gt: 25
        }
      },
      isLoadingShow: false,
      leftTreeVisible: false,
      tabStatusBtnConfig: {
        changeBtns: true, // tab页右边的按钮是否会根据页签的不同而改变
        buttons: proconf.tabStatusBtnConfigButtons,
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconUrl: '',
          label: '',
          code: '0',
          curValue: '0'
        },
        buttonsInfo: proconf.tabStatusBtnConfigButtonsInfo,
        methods: {
          bsToolbarClickEvent: this.onStatusTabClick
        }
      },
      tabStatusNumConfig: { '-1': 0, 0: 0, 1: 0, 2: 0 },
      isShowQueryConditions: true,
      queryFormItemConfig: [],
      queryFormData: {},
      // queryFormData: proconf.queryFormData,
      treeConfig: {
        // 左侧树类型
        // curRadio: 'AGENCY',
        curRadio: '',
        radioGroup: [
          /* {
            code: 'AGENCY',
            label: '预算单位AT PAGE'
          },
          {
            code: 'EXP_FUNC',
            label: '功能分类AT PAGE'
          },
          {
            code: 'dep_bgt_eco',
            label: '预算支出分类科目AT PAGE'
          } */
        ]
      },
      treeData: [],
      treeQueryparams: { elementCode: 'AGENCY' },
      treeGlobalConfig: {
        treeInputVal: ''
      },
      tableLoading: false,
      tableFooterConfig: {
        totalObj: {
          amount: 0,
          pay_amt: 0,
          clear_amt: 0,
          plan_amt: 0
        },
        combinedType: ['switchTotal'],
        showFooter: true
      },
      amtDetailTableFooterConfig: {
        combinedType: ['switchTotal'],
        showFooter: true
      },
      tableColumnsConfig: [],
      // tableColumnsConfig: proconf.tableColumnsConfig,
      tableData: [],
      tableConfig: {
        globalConfig: {
          checkType: false, // checkbox
          seq: true // 序号列
        },
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: proconf.gloableOptionRow,
          $editRadio: proconf.editRadio,
          $editLevel: proconf.editLevel,
          $editCodeCheckbox: proconf.editCodeCheckbox,
          $editCheckbox: proconf.editCheckbox,
          $order: proconf.order
        }
        /* methods: {
          onOptionRowClick: this.onOptionRowClick
        } */
      },
      tablePagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 100000000
      },
      amtDetailTablePagerConfig: {
        total: 0,
        pageSize: 20,
        currentPage: 1
      },
      tableToolbarConfig: {
        // table工具栏配置
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: true, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      treeTableConfig: {
        expandAll: false,
        dblExpandAll: true,
        dblExpand: true,
        accordion: false
      },
      amtDetailQueryParams: {
        ids: [],
        pageNum: 1,
        pageSize: 20
      },
      amtDetailType: '1',
      amountQueryId: '6ACA4D6BC4264EDC8523044897FAFF31',
      payAmtQueryId: '686A3B189F5A49028DC9ADF91CC2CC94',
      planAmtQueryId: '742827FA532A4FEBA351A118D8DFAA82',
      clearAmtQueryId: '851AED1ED08F47F49040A50BDD7E5934',
      menuName: '指标数据查询',
      tableTreeConfig: {
        transform: true,
        expandRowKeys: [24300]
      },
      settingModal: false,
      amtDetailModal: false,
      amtDetailTableLoading: false,
      amtDetailTableColumnsConfig: [],
      amtDetailTableColumnsConfigAmount: [],
      amtDetailTableColumnsConfigPay: [],
      amtDetailTableColumnsConfigPlan: [],
      amtDetailTableColumnsConfigClear: [],
      amtDetailTableData: [],
      toolBarStatusSelect: {},
      settingTableData: [],
      settingTableLoading: false,
      settingTableColumnsConfig: proconf.settingTableColumnsConfig,
      isColumnVisible: 1,
      settingTableConfig: {
        globalConfig: {
          sortable: false,
          rowDrop: true,
          checkType: 'checkbox'
        }
      },
      settingTableGlobalConfig: {
        rowDrop: true, // 行拖拽
        dragColumnsConfig: {
          cacheStatus: false, // 是否开启缓存
          openDrag: true // 是否开启拖拽排序
        }
      },
      amtDetailTableConfig: {
        globalConfig: {
          checkType: 'checkbox'
        }
      },
      isNew: true,
      btnLoading: false,
      modalName: '',
      tempSaveShow: false,
      treeTemplate: null,
      treeTemplateSel: null,
      temOption: [],
      temQueryparams: {
        menuId: 'Home'
      },
      templateModal: false,
      templateTableLoading: false,
      templateTableConfig: {
        globalConfig: {
          checkType: 'checkbox'
        }
      },
      templateTableColumnsConfig: proconf.templateTableColumnsConfig,
      templateTableData: [],
      temActionParams: {
        menuId: 'Home',
        templateName: ''
      },
      colFieldList: [],
      currentParams: {},
      treeKey: 1,
      currentTreeCode: 'agency'
    }
  },
  methods: {
    cellClick(obj, context, e) {
      let key = obj.column.property
      switch (key) {
        case 'amount':
          this.amtDetailTableColumnsConfig = this.amtDetailTableColumnsConfigAmount
          this.amtDetailType = '1'
          this.getAmtDetailData(obj.row)
          break
        case 'pay_amt':
          this.amtDetailTableColumnsConfig = this.amtDetailTableColumnsConfigPay
          this.amtDetailType = '2'
          this.getAmtDetailData(obj.row)
          break
        case 'plan_amt':
          this.amtDetailTableColumnsConfig = this.amtDetailTableColumnsConfigPlan
          this.amtDetailType = '4'
          this.getAmtDetailData(obj.row)
          break
        case 'clear_amt':
          this.amtDetailTableColumnsConfig = this.amtDetailTableColumnsConfigClear
          this.amtDetailType = '3'
          this.getAmtDetailData(obj.row)
          break
      }
    },
    getAmtDetailData(row) {
      // 组装请求参数
      var bgtIds = this.findBgtIds(row)
      this.amtDetailQueryParams.ids = bgtIds
      this.queryAmtDetailData()
      this.amtDetailModal = true
    },
    findBgtIds(row) {
      var newArr = []
      if (row.children && row.children.length) {
        row.children.forEach(item => {
          newArr.push(...this.findBgtIds(item))
        })
      } else {
        if (row.bgtIds) {
          newArr.push(...row.bgtIds)
        }
      }
      return newArr
    },
    queryAmtDetailData() {
      this.amtDetailTableLoading = true
      this.amtDetailTableData = []
      let method = ''
      if (this.amtDetailType === '1') {
        method = 'grobBgtAmtDetail'
      } else if (this.amtDetailType === '2') {
        method = 'grobPayAmtDetail'
      } else if (this.amtDetailType === '3') {
        method = 'grobClearAmtDetail'
      } else if (this.amtDetailType === '4') {
        method = 'grobPlanAmtDetail'
      }
      HTTPModule[method](this.amtDetailQueryParams).then(res => {
        this.amtDetailTableLoading = false
        if (res && res.rscode === '200') {
          let resData = res.data.rows
          resData.forEach(item => {
            for (let i in item) {
              item[i.toLowerCase()] = item[i]
            }
          })
          this.amtDetailTableData = resData
          this.amtDetailTablePagerConfig.total = res.data.total
        }
      })
    },
    amtDetailAjaxData({ params, currentPage, pageSize }) {
      this.amtDetailQueryParams = Object.assign(this.amtDetailQueryParams, {
        pageNum: currentPage,
        pageSize: pageSize
      })
      this.queryAmtDetailData()
    },
    async loadConfig(id) {
      let params = {
        tableId: {
          id: '',
          fiscalyear: this.$store.state.userInfo.year,
          mof_div_code: this.$store.state.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid,
          userguid: this.$store.state.userInfo.guid
        }
      }
      if (id === this.amountQueryId) {
        params.tableId.id = id
        let configData = await this.loadBsConfig(params)
        this.amtDetailTableColumnsConfigAmount = configData.itemsConfig
      }
      if (id === this.payAmtQueryId) {
        params.tableId.id = id
        let configData = await this.loadBsConfig(params)
        this.amtDetailTableColumnsConfigPay = configData.itemsConfig
      }
      if (id === this.planAmtQueryId) {
        params.tableId.id = id
        let configData = await this.loadBsConfig(params)
        this.amtDetailTableColumnsConfigPlan = configData.itemsConfig
      }
      if (id === this.clearAmtQueryId) {
        params.tableId.id = id
        let configData = await this.loadBsConfig(params)
        this.amtDetailTableColumnsConfigClear = configData.itemsConfig
      }
      if (id === this.queryConfigId) {
        params.tableId.id = id
        let configQueryData = await this.loadBsConfig(params)
        this.queryFormItemConfig = configQueryData.itemsConfig
      }
    },
    getFormTable() {
      this.loadConfig(this.queryConfigId)
      this.loadConfig(this.amountQueryId)
      this.loadConfig(this.payAmtQueryId)
      this.loadConfig(this.planAmtQueryId)
      this.loadConfig(this.clearAmtQueryId)
    },
    templateManage() {
      let self = this
      self.templateTableLoading = true
      HTTPModule.getGrabTemplateList(this.temQueryparams).then(res => {
        self.templateTableLoading = false
        if (res && res.rscode === '200') {
          self.templateTableData = res.data
        } else {
          self.$message.error(res.result)
        }
      }).catch(() => {
        self.templateTableLoading = false
      })
      this.templateModal = true
    },
    handleTemplateUse() {
      let selection = this.$refs.templateTableRef.$refs.xGrid.getSelectRecords()
      if (selection.length !== 1) {
        this.$message.warning('请选择有且仅有一个模版!')
        return
      }
      this.treeTemplate = selection[0]
      this.setTemplateData()
      this.cancelDialogCloseTemplate()
    },
    setDefalutTemplate() {
      let selection = this.$refs.templateTableRef.$refs.xGrid.getSelectRecords()
      if (selection.length !== 1) {
        this.$message.warning('请选择有且仅有一个模版!')
        return
      }
      this.temActionParams.menuId = this.$store.state.curNavModule.guid || 'Home'
      this.temActionParams.templateName = selection[0].template_name
      this.templateTableLoading = true
      HTTPModule.setDefaultGrabTemplate(this.temActionParams).then(res => {
        this.templateTableLoading = false
        if (res && res.rscode === '200') {
          this.$message.success('设置成功！')
          this.cancelDialogCloseTemplate()
        } else {
          this.$message.error('设置失败！' + res.result)
        }
      }).catch(() => {
      })
    },
    deleteTemplate() {
      let selection = this.$refs.templateTableRef.getSelectRecords()
      if (selection.length !== 1) {
        this.$message.warning('请选择有且仅有一个模版!')
        return
      }
      this.temActionParams.menuId = this.$store.state.curNavModule.guid || 'Home'
      this.temActionParams.templateName = selection[0].template_name
      this.templateTableLoading = true
      HTTPModule.removeGrabTemplate(this.temActionParams).then(res => {
        this.templateTableLoading = false
        if (res && res.rscode === '200') {
          this.$message.success('删除成功！')
          this.getTemplateData()
          this.cancelDialogCloseTemplate()
        } else {
          this.$message.error('删除失败！' + res.result)
        }
      }).catch(() => {
      })
    },
    saveTemplate() {
      this.isNew = this.treeTemplate === null || !this.treeTemplate.template_name
      this.tempSaveShow = true
    },
    handleTrue() {
      this.handleSave('modify')
    },
    handleFalse() {
      this.isNew = true
      this.modalName = ''
    },
    handleSave(eventType) {
      let self = this
      if (self.modalName === '') {
        self.warning('请填写模板名称！')
        return
      }
      if (self.modalName.length > 20) {
        self.warning('模板名称请小于20字！')
        return
      }
      let saveParam = {
        type: eventType,
        menuId: self.$store.state.curNavModule.guid,
        templateName: self.modalName,
        condition: [],
        fields: [],
        sumAmt: [
          {
            field: 'amount',
            type: '1',
            title: '指标金额',
            sortValue: null,
            checked: false
          },
          {
            field: 'pay_amt',
            type: '2',
            title: '已支付金额',
            sortValue: null,
            checked: false
          },
          {
            field: 'clear_amt',
            type: '3',
            title: '已清算金额',
            sortValue: null,
            checked: false
          },
          {
            field: 'plan_amt',
            type: '4',
            title: '计划金额',
            sortValue: null,
            checked: false
          }
        ]
      }
      let fields = self.$refs.settingTableRef.$refs.xGrid.getTableData().fullData
      this.$refs.settingTableRef.$refs.xGrid.getSelectRecords().forEach(item => {
        fields.forEach(items => {
          if (item.code === items.code) {
            items.checked = true
          }
        })
      })
      saveParam.fields = fields
      saveParam.condition = fields.map(item => {
        return {
          name: item.name,
          title: item.title,
          checked: item.checked
        }
      })
      self.btnLoading = true
      HTTPModule.saveGrabTemplate(saveParam).then((res) => {
        self.btnLoading = false
        if (res && res.rscode === '200') {
          self.$message.success('保存成功')
          this.handleCloseTemplate()
          this.getTemplateData()
        } else {
          self.$message.error('保存失败：' + res.result)
          self.btnLoading = false
        }
      }).catch(() => {
        self.$message.error('保存失败')
        self.btnLoading = false
      })
    },
    handleCloseTemplate() {
      this.modalName = ''
      this.tempSaveShow = false
    },
    reset() {
      this.settingTableData = this.colFieldList.map((item) => {
        return {
          name: item.name.toLowerCase(),
          code: item.name.toLowerCase(),
          title: item.title,
          type: item.type === null ? '0' : item.type + '',
          level: item.level + '',
          totalLevel: item.level + '',
          checked: item.checked,
          showCode: item.showCode
        }
      })
      setTimeout(() => {
        this.$refs.settingTableRef.$refs.xGrid.setCheckboxRow(this.settingTableData.filter(item => item.checked), true)
      }, 100)
      this.treeTemplate = null
      this.treeTemplateSel = null
      this.modalName = ''
    },
    dropdownmethod(data) {
      this.treeTemplate = data.value
      this.modalName = this.treeTemplate.template_name
      this.setTemplateData()
    },
    setTemplateData() {
      if (this.treeTemplate.fields !== null && this.treeTemplate.fields !== '') {
        let fields = JSON.parse(this.treeTemplate.fields)
        this.settingTableData = fields.map((item) => {
          if (item.level > 3) {
            item.level = 6
          }
          return {
            name: item.name,
            code: item.name,
            title: item.title,
            type: item.type === null ? '0' : item.type + '',
            level: item.level + '',
            totalLevel: this.colFieldList.find(object => object.name === item.name).totalLevel,
            checked: item.checked,
            showCode: item.showCode
          }
        })
        setTimeout(() => {
          this.$refs.settingTableRef.$refs.xGrid.setCheckboxRow(this.settingTableData.filter(item => item.checked), true)
        }, 100)
      }
    },
    getTemplateData() {
      let self = this
      HTTPModule.getGrabTemplateList(this.temQueryparams).then(res => {
        if (res.data instanceof Array) {
          if (res.data.length > 0) {
            self.temOption = res.data.map(item => {
              return {
                label: item.template_name,
                value: item
              }
            })
          }
          if (res.data.length === 0) {
            self.temOption = []
          }
        }
      })
    },
    cellStyle ({ level }) {
      if (level === 0) {
        return {
          background: '#cbe2fe !important',
          border: '1px solid #e8eaec !important'
        }
      } else {
        return {
          background: '#e3f2fe !important',
          border: '1px solid #e8eaec !important'
        }
      }
    },
    findObjByKeyValue(arr) {
      function recursive(data) {
        data.every((item) => {
          if (item.bgtIds !== undefined) {
            findObj = item.bgtIds
            return false
          }
          if (item.children && item.children.length) {
            recursive(item.children)
          }
          return true
        })
      }
      let findObj = null
      recursive(arr)
      return findObj
    },
    getTableData(params) {
      this.isLoadingShow = true
      this.currentParams = params || {}
      params.type = this.isShowDetails ? '1' : '0'
      HTTPModule.dataQueryPageInfo(params)
        .then((res) => {
          if (res.rscode === '200') {
            this.isLoadingShow = false
            this.tableData = res.data
            this.tablePagerConfig.total = res.data.length
            if (res.data.length > 0) {
              this.tableFooterConfig.totalObj.amount = res.data.reduce((amount, item) => amount + Number(item.amount), 0)
              this.tableFooterConfig.totalObj.pay_amt = res.data.reduce((payAmtSum, item) => payAmtSum + Number(item.pay_amt), 0)
              this.tableFooterConfig.totalObj.plan_amt = res.data.reduce((planAmtSum, item) => planAmtSum + Number(item.plan_amt), 0)
              this.tableFooterConfig.totalObj.clear_amt = res.data.reduce((clearAmtSum, item) => clearAmtSum + Number(item.clear_amt), 0)
            }
          } else {
            this.isLoadingShow = false
            this.$message.error(res.result)
          }
        })
        .catch(() => {
          this.isLoadingShow = false
        })
    },
    getSearchDataListFn(searchFormConfig) {
      let searchDataObj = {}
      if (Array.isArray(searchFormConfig) && searchFormConfig.length) {
        searchFormConfig.forEach(item => {
          if (item.itemRender?.name === '$formTreeInput' || item.itemRender?.name === '$vxeTree') {
            if (item.field) {
              searchDataObj[item.field + 'code'] = []
            }
          } else {
            if (item.field) {
              searchDataObj[item.field] = []
            }
          }
        })
      }
      return searchDataObj
    },
    handleSureSetting() {
      let currentTbl = this.$refs.settingTableRef.$refs.xGrid.getTableData().fullData
      let selectionData = this.$refs.settingTableRef.$refs.xGrid.getSelectRecords()
      let fields = []
      let canUse = []
      selectionData.forEach((item) => {
        fields.push({
          name: item.name,
          type: item.type,
          level: item.level,
          showCode: item.showCode
        })
      })
      currentTbl.forEach((item) => {
        if (item.type !== '0' && item.checked) {
          canUse.push({
            name: item.title,
            code: item.code
          })
        }
      })
      this.queryFormData = this.getSearchDataListFn(this.queryFormItemConfig)
      this.tableColumnsConfig = []
      this.tableData = []
      if (fields.length > 0) {
        let params = {
          tableName: this.transJson(this.$store.state.curNavModule.param5).tableName || 'vw_data_query_bgt',
          condition: {},
          fields,
          sumAmt: ['amount', 'pay_amt', 'plan_amt', 'clear_amt']
        }
        this.getTableData(params)
        let mainTblColumns = []
        selectionData.forEach((item, index) => {
          if (index === 0) {
            mainTblColumns.push({
              title: item.title,
              isDataQuery: true,
              field: item.code,
              width: 'fix',
              align: 'left',
              type: 'treeNode',
              treeNode: true
            })
          } else {
            mainTblColumns.push({
              title: item.title,
              isDataQuery: true,
              field: item.code,
              width: 'fix',
              align: 'left'
            })
          }
        })
        mainTblColumns.push({
          title: '指标金额',
          field: 'amount',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '计划金额',
          field: 'plan_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '支付金额',
          field: 'pay_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '清算金额',
          field: 'clear_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        this.tableColumnsConfig = mainTblColumns
      }
      this.cancelDialogClose()
      if (this.tableColumnsConfig.length > 0) {
        this.$message({
          type: 'success',
          message: '设置成功，请稍候！',
          duration: 3000
        })
      } else {
        this.$message({
          type: 'success',
          message: '设置成功！'
        })
        this.tablePagerConfig.total = 0
      }
      let bgtDataQuery = {
        tableData: this.settingTableData
      }
      window.localStorage.removeItem('bgtDataQuery')
      window.localStorage.setItem('bgtDataQuery', JSON.stringify(bgtDataQuery))
    },
    cancelDialogClose() {
      this.settingModal = false
      this.amtDetailModal = false
      this.treeTemplateSel = null
      this.treeTemplate = null
      this.temOption = []
      this.modalName = ''
      this.btnLoading = false
    },
    cancelDialogCloseTemplate() {
      this.templateModal = false
    },
    // 初始化高级查询参数condition
    getConditionList() {
      let condition = {}
      this.queryFormItemConfig?.forEach(item => {
        if (item.itemRender.name === '$formTreeInput' || item.itemRender.name === '$vxeTree') {
          if (item.field) {
            if (item.field === 'cor_bgt_doc_no_') {
              condition[item.field + 'name'] = []
            } else {
              condition[item.field + 'code'] = []
            }
          }
        } else {
          if (item.field) {
            condition[item.field] = []
          }
        }
      })
      return condition
    },
    trasToTree(arr) {
      // TODO 树状表格处理数据的方法
      let result = []
      let map = {}
      for (let i in arr) {
        if (arr[i].children) {
          map[arr[i].id] = arr[i]
        } else {
          map[arr[i].id] = Object.assign(arr[i], { children: [] })
          map[arr[i].id].plan_amt = 0
          map[arr[i].id].pay_app_amt = 0
        }
      }
      for (let i in arr) {
        if (map[arr[i].pid]) {
          map[arr[i].pid].children.push(arr[i])
          map[arr[i].pid].plan_amt = map[arr[i].pid].plan_amt + arr[i].plan_amt
          map[arr[i].pid].pay_app_amt =
            map[arr[i].pid].pay_app_amt + arr[i].pay_app_amt
        } else {
          result.push(arr[i])
        }
      }
      return result
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        case 'refresh':
          if (this.tableColumnsConfig.length > 0) {
            this.getTableData(this.currentParams)
          } else {
            this.isLoadingShow = true
            setTimeout(() => {
              this.isLoadingShow = false
            }, 500)
          }
          break
      }
    },
    onOptionRowClick({ params, optionType }) {
      switch (optionType) {
        case 'top':
          this.handleToTop(params.rowIndex)
          break
        case 'bottom':
          this.handleToBottom(params.rowIndex)
          break
        default:
          break
      }
    },
    handleToTop(index) {
      if (index !== 0) {
        let tableData = this.$refs.settingTableRef.$refs.xGrid.getTableData().fullData
        let temp = tableData[index - 1]
        tableData[index - 1] = tableData[index]
        tableData[index] = temp
        this.settingTableData = tableData
        this.$message.success('上移成功')
      }
    },
    handleToBottom(index) {
      let tableData = this.$refs.settingTableRef.$refs.xGrid.getTableData().fullData
      if (index !== tableData.length - 1) {
        let temp = tableData[index + 1]
        tableData[index + 1] = tableData[index]
        tableData[index] = temp
        this.settingTableData = tableData
        this.$message.success('下移成功')
      }
    },
    treeClickMethod(obj) {
      if (this.tableColumnsConfig.length > 0) {
        if (!obj.children.length && this.currentParams.condition !== undefined) {
          let code = this.currentTreeCode + '_code'
          let params = this.currentParams
          params.condition[code] = [obj.code]
          this.getTableData(params)
        } else {
          if (obj.label === '全部') {
            let code = this.currentTreeCode + '_code'
            let params = this.currentParams
            if (params.condition[code] !== undefined) delete params.condition[code]
            this.getTableData(params)
          }
        }
      }
    },
    treeOnConfirmData(curTree) {
      this.treeQueryparams.elementCode = curTree.code
      this.$refs.leftTree.refreshTree()
    },
    treeOnAsideChange() {
      this.leftTreeVisible = false
    },
    treeOnChangeInput(val) {
      this.treeGlobalConfig.treeInputVal = val
      this.$refs.leftTree.filterText = val
    },
    onQueryConditionsClick(isOpen) {
      this.isShowQueryConditions = isOpen
    },
    handleSearch(val) {
      // debugger
      let condition = this.getConditionList()
      for (let key in condition) {
        if (
          (val[key] !== undefined) &
          (val[key] !== null)
        ) {
          if (Array.isArray(val[key])) {
            condition[key] = val[key]
          } else if (typeof (val[key]) === 'string') {
            if (val[key].trim() !== '') {
              val[key].split(',').forEach(item => {
                condition[key].push(item)
              })
            }
          }
        }
      }
      this.queryFormItemConfig?.forEach(item => {
        if (item.islike === true && val[item.field]) {
          condition[item.field] = {}
          condition[item.field][item.liketype] = val[item.field]
        }
      })
      Object.assign(this.currentParams.condition || {}, condition)
      this.getTableData(this.currentParams)
      this.$message.success('查询成功！')
    },
    handleSettingModal() {
      this.temQueryparams = {
        menuId: this.$store.state.curNavModule.guid || 'Home'
      }
      this.getTemplateData()
      this.initSettingTableData()
      this.settingModal = true
    },
    operationToolbarButtonClickEvent(obj, context, e) {
      switch (obj.code) {
        case 'operation-setting':
          // 设置
          this.handleSettingModal()
          break
        case 'operation-expand-tree':
          // 树全部展开
          this.handleExpandTree()
          break
        case 'operation-close-tree':
          // 树全部合并
          this.handleCloseTree()
          break
      }
    },
    handleExpandTree() {
      this.$refs.mainTableRef.$refs.xGrid.setAllTreeExpand(true)
    },
    handleCloseTree() {
      this.$refs.mainTableRef.$refs.xGrid.clearTreeExpand()
    },
    onStatusTabClick(obj) {
      if (!obj.type) {
        this.operationToolbarButtonClickEvent(obj)
      }
    },
    getInitTemplate() {
      HTTPModule.initTemplate().then(res => {
        if (res && res.rscode === '200') {
          if (res.data && res.data.fields) {
            this.colFieldList = res.data.fields
          } else {
            this.colFieldList = JSON.parse(JSON.stringify(proconf.colFieldList))
          }
        } else {
          this.colFieldList = JSON.parse(JSON.stringify(proconf.colFieldList))
        }
      }).catch(() => {
        this.colFieldList = JSON.parse(JSON.stringify(proconf.colFieldList))
      })
    },
    initSettingTableData() {
      this.settingTableData = this.colFieldList.map((item) => {
        if (item.level > 3) {
          item.level = 6
        }
        return {
          name: item.name.toLowerCase(),
          code: item.name.toLowerCase(),
          title: item.title,
          type: item.type === null ? '0' : item.type + '',
          level: item.level + '',
          totalLevel: item.level + '',
          checked: item.checked,
          showCode: item.showCode
        }
      })
      setTimeout(() => {
        this.$refs.settingTableRef.$refs.xGrid.setCheckboxRow(this.settingTableData.filter(item => item.checked), true)
      }, 100)
      this.colFieldList.forEach(col => {
        col.totalLevel = col.level + ''
      })
    }
  },
  activated() {
    if (JSON.stringify(this.currentParams) !== '{}') {
      this.tableData = []
      this.getTableData(this.currentParams)
    }
  },
  created() {
  },
  mounted() {
    this.getInitTemplate()
    if (window.localStorage.getItem('bgtDataQuery') !== null) {
      let bgtDataQuery = JSON.parse(window.localStorage.getItem('bgtDataQuery'))
      this.settingTableData = bgtDataQuery.tableData
      let currentTbl = this.$refs.settingTableRef.$refs.xGrid.getTableData().fullData
      let fields = []
      let canUse = []
      currentTbl.forEach((item) => {
        if (item.type !== '0') {
          fields.push({
            name: item.name,
            type: item.type,
            showCode: item.showCode,
            level: item.level
          })
        }
      })
      currentTbl.forEach((item) => {
        if (item.type !== '0' && item.checked) {
          canUse.push({
            name: item.title,
            code: item.code
          })
        }
      })
      let formDataBak = {}
      canUse.forEach((item) => {
        let code = item.code
        formDataBak[code] = ''
      })
      this.queryFormData = formDataBak
      this.tableColumnsConfig = []
      this.tableData = []
      if (fields.length > 0) {
        let params = {
          tableName: 'vw_data_query_bgt',
          condition: {},
          fields,
          sumAmt: ['amount', 'pay_amt', 'plan_amt', 'clear_amt']
        }
        this.getTableData(params)
        let mainTblColumns = []
        currentTbl.forEach((item, index) => {
          if (item.type !== '0') {
            if (index === 0) {
              mainTblColumns.push({
                title: item.title,
                isDataQuery: true,
                field: item.code,
                width: 'fix',
                align: 'left',
                type: 'treeNode',
                treeNode: true
              })
            } else {
              mainTblColumns.push({
                title: item.title,
                isDataQuery: true,
                field: item.code,
                width: 'fix',
                align: 'left'
              })
            }
          }
        })
        mainTblColumns.push({
          title: '指标金额',
          field: 'amount',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '支付金额',
          field: 'pay_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '计划金额',
          field: 'plan_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        mainTblColumns.push({
          title: '清算金额',
          field: 'clear_amt',
          width: 'fix',
          align: 'right',
          combinedType: 'average,subTotal,total,totalAll',
          cellRender: {
            name: '$vxeMoney',
            options: [],
            defaultValue: '',
            props: {}
          }
        })
        this.tableColumnsConfig = mainTblColumns
      } else {
        setTimeout(() => {
          this.settingModal = true
        }, 1000)
      }
    }
    this.getFormTable()
  }

}
</script>
<style lang="scss" scoped>
.Titans-table ::v-deep .vxe-table{
  .vxe-tree--btn-wrapper {
    top: 44%;
    left: 5px;
  }
  .drag-btn{
    margin-left: 9px;
  }
}
.Titans-table.settingtable ::v-deep .vxe-table{
  .vxe-table--header-wrapper table thead tr th:nth-child(2) .vxe-cell .vxe-cell--sort{
    display: none;
  }
}
.T-mainFormListLayout-modulebox ::v-deep .mmc-formlist .mmc-right {
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 0 0 0 0;
}
.buttons{
  margin: 10px 0 10px 0;
  height: 10%;
}
</style>
