<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      show-zoom
      title="当前选中表表格配置"
      width="90%"
      height="90%"
      :position="{ top: '8%', left: '5%' }"
      resize
      remember
      transfer
      class="conf-modal"
    >
      <div class="height-all">
        <!-- <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button status="primary" @click="onSaveClick">保 存</vxe-button>
          <vxe-button
            code="reset"
            @click="dialogVisible = false"
          >取 消</vxe-button>
        </div>
      </div> -->
        <div class="main-modulebox-tabcon ofa pdl10 pdr10" style="height: calc(100% - 15px)">
          <BsTable
            v-if="ifRenderTableConfTable"
            ref="bsTableRef"
            :footer-config="{ showFooter: false }"
            :table-config="tableConfig"
            :table-columns-config="tableColumnsConfig"
            :table-data="tableData"
            :edit-config="editConfig"
            :toolbar-config="toolbarConfig"
            :pager-config="false"
          >
            <template v-slot:toolbarSlots>
              <div class="table-toolbar-left tl">
                <vxe-button size="medium" status="primary" content="录入配置项" @click="onEnterConfig" />
                <vxe-button size="medium" status="primary" content="新增行" @click="onAddRowClick" />
                <vxe-button size="medium" status="primary" content="删除行" @click="onDeleteRowClick" />
              </div>
            </template>
            <template v-slot:toolbar-custom-slot>
              <div class="toolbar-slot-custom-slot fn-inline mgr15">
                <vxe-button size="medium" status="primary" content="保存" @click="onSaveClick" />
              </div>
            </template>
          </BsTable>
        </div>
      </div>
      <EnterItemConfigModal :item-visible.sync="itemVisible" :config-params="configParams" @onItemClose="dialogClose" />
    </vxe-modal>
  </div>
</template>
<script>
import getFormConfData from './formConf.js'
import EnterItemConfigModal from './EnterItemConfigModal'
// import { proconf } from './config/AddUnitFundPlan.js'
export default {
  name: 'TableConfModal',
  components: { EnterItemConfigModal },
  props: {
    dialogVisible: {
      type: Boolean,
      default () {
        return false
      }
    },
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      ifRenderTableConfTable: true,
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('tableConf', 'toolbarConfig')
      },
      tableConfig: getFormConfData('tableConf', 'tableConfig'),
      tableColumnsConfig: getFormConfData('tableConf', 'tableColumnsConfig'),
      tableData: getFormConfData('tableConf', 'tableData'),
      itemVisible: false,
      configParams: {},
      paramsCp: {}

    }
  },
  methods: {
    onEnterConfig() {
      let paramsCopy = this.deepCopy(this.paramsCp)
      paramsCopy.configure = this.jsonParse(
        paramsCopy.configure
      )
      this.configParams = this.deepCopy(paramsCopy)
      this.itemVisible = true
    },
    dialogClose() {
      this.itemVisible = false
      this.dialogVisible = false
      this.$emit('closeCallback')
    },
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
    transformConlumsDataToNest(columns) {
      // columns转化为vxe-table columns数据结构
      let self = this
      columns.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          column.children = self.transformConlumsDataToNest(column.children)
        } else {
          if (column['renderType'] && column.renderName) {
            column[column.renderType] = {
              name: column.renderName, // 渲染器名,
              options: ((arg) => {
                if (typeof arg === 'object') {
                  return self.deepCopy(arg)
                } else if (typeof arg === 'string') {
                  return arg ? arg.split('+').map((item, index) => {
                    return { value: item.split('#')[0], label: item.split('#')[1] }
                  }) : []
                } else {
                  return arg
                }
              })(column.options), // 下拉数据源
              defaultValue: column.defaultValue, // 默认值
              props: column.props // 额外参数
            }
          } else {
            delete column['itemRender']
          }
          delete column.insertMark
          delete column.date
          delete column.isNew
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
    jsonStringify(columns) {
      // 对象转换成json字符串
      return JSON.stringify(columns, function(key, val) {
        if (typeof val === 'function') {
          return val + ''
        }
        return val
      })
    },
    onAddRowClick() {
      this.$refs.bsTableRef.insertRowData()
    },
    onDeleteRowClick() {
      this.$refs.bsTableRef.deleteRowData()
    },
    saveTableConf(tableConfStr) {
      // 保存表格配置
      let self = this

      this.$http[self.params.optionType === 'add' ? 'post' : 'put']('mp-b-perm-service/v1/tableconf', this.getSaveParams({
        configure: tableConfStr
        // type: 'tableConf'
        // id: self.$ToolFn.utilFn.getUuid(),
        // name: 'testData',
        // menuguid: '123456'
      }))
        .then((res) => {
          if (res.rscode === '100000') {
            self.dialogVisible = false
            self.$emit('closeCallback')
            self.$message({
              showClose: true,
              message: self.params.optionType === 'add' ? '数据新增成功' : '数据保存成功',
              type: 'success'
            })
          }
        })
        .catch((error) => {
          console.log('error', error)
        })
    },
    getSaveParams(obj) {
      return Object.assign({ ...this.paramsCp }, { itemsConfig: [], formConfig: [], globalConfig: {} }, obj)
    },
    onSaveClick() {
      // 保存点击事件
      const { fullData } = this.$refs.bsTableRef.getTableData()
      if (fullData.length) {
        let saveJson = this.transformConlumsDataToNest(this.deepCopy(this.clearDataRenderField(fullData)))
        this.saveTableConf(
          this.jsonStringify({
            itemsConfig: saveJson,
            globalConfig: this.params.globalConfig,
            pageConfig: {}, // 分页配置
            editConfig: {}, // 编辑配置
            editRules: {}, // 校验规则
            footerConfig: {}, // 表尾配置
            dataConfig: {
              dataSouceType: 'query'
            }
          })
        )
      } else {
        this.$message({
          showClose: true,
          message: '没有数据可保存，请重新录入！',
          type: 'success'
        })
      }
    },
    autoAddMissingTtributes(config, data) {
      // 自动补齐所有缺失属性
      data.forEach((item, index) => {
        config.forEach((column, columnIndex) => {
          if (column.field) {
            item[column.field] = item[column.field] === undefined || item[column.field] === null ? '' : item[column.field]
            if (column.field.indexOf('props') >= 0) {
              item[column.field] = item[column.field] || {}
            }
          }
        })
      })
      return data
    },
    clearDataRenderField(data) {
      // 删除viewSort字段
      let self = this
      return data.map((item, index) => {
        let itemN = Object.assign({}, item)
        Object.keys(itemN).forEach((key, ki) => {
          if (key.indexOf('__') >= 0) {
            delete itemN[key]
          }
          delete itemN['insertMark']
          delete itemN['date']
          delete itemN['isNew']
          if (Array.isArray(itemN.children) && itemN.children.length) {
            itemN.children = self.clearDataRenderField(itemN.children)
          }
        })
        return itemN
      })
    },
    getPureConfigData(data) {
      delete data['itemsConfig']
      delete data['globalConfig']
      delete data['pageConfig']
      delete data['editConfig']
      delete data['editRules']
      delete data['footerConfig']
      delete data['dataConfig']
      delete data['itemsConfigNest']
      delete data['_XID']
      Object.keys(data).forEach((key) => {
        if (key.indexOf('__') >= 0) {
          delete data[key]
        }
      })
      return data
    },
    init() {
      this.tableData = this.autoAddMissingTtributes(this.tableColumnsConfig, this.clearDataRenderField(this.params.itemsConfig))
      this.paramsCp = this.getPureConfigData(this.deepCopy(this.params))
      this.ifRenderTableConfTable = false
      this.$nextTick(() => {
        this.ifRenderTableConfTable = true
      })
    }
  },
  mounted() {},
  watch: {
    dialogVisible: {
      handler(newval) {
        if (newval) {
          this.init()
        }
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    },
    params: {
      handler(newval) {
        this.paramsCp = this.getPureConfigData(this.params)
        if (newval.type === 'radioConf') {
          this.tableColumnsConfig = getFormConfData('radioConf', 'radioColumnsConfig')
        } else {
          this.tableColumnsConfig = getFormConfData('tableConf', 'tableColumnsConfig')
        }
      }
    }
  }
}
</script>

<style lang='scss'>
  .conf-modal {
    .vxe-modal--content {
      height: 100%;
    }
  }
</style>
