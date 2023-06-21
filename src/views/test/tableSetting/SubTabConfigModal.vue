<template>
  <vxe-modal
    v-model="dialogVisible"
    show-zoom
    title="当前选中表表单配置"
    width="90%"
    height="90%"
    :position="{ top: '8%', left: '5%' }"
    resize
    remember
    class="conf-modal"
    transfer
  >
    <div class="height-all">
      <div class="main-modulebox-tabcon ofa pdl10 pdr10" style="height: 41%;margin-bottom:10px;">
        <BsTable
          v-if="ifRenderFormConfTable"
          ref="bsTableRef"
          :footer-config="{ showFooter: false }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig1"
          :table-data="formConfigData1"
          :edit-config="editConfig"
          :toolbar-config="toolbarConfig"
          :pager-config="false"
          @cellClick="onCellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left tl">
              <vxe-button size="medium" status="primary" content="录入配置项" @click="onEnterConfig" />
              <vxe-button size="medium" status="primary" content="新增行" @click="onAddRowClick1" />
              <vxe-button size="medium" status="primary" content="删除行" @click="onDeleteRowClick1" />
            </div>
          </template>
          <template v-slot:toolbar-custom-slot>
            <div class="toolbar-slot-custom-slot fn-inline mgr15">
              <vxe-button size="medium" status="primary" content="保存" @click="onSaveClick" />
            </div>
          </template>
        </BsTable>
      </div>
      <div class="main-modulebox-tabcon ofa pdl10 pdr10" style="height: 50%">
        <BsTable
          v-if="ifRenderFormConfTable"
          ref="bsTableRef2"
          :footer-config="{ showFooter: false }"
          :table-config="tableConfig"
          :table-columns-config="tableColumnsConfig2"
          :table-data="formConfigData2"
          :edit-config="editConfig"
          :toolbar-config="toolbarConfig"
          :pager-config="false"
          @cellClick="onCellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left tl">
              <vxe-button size="medium" status="primary" content="新增行" @click="onAddRowClick2" />
              <vxe-button size="medium" status="primary" content="删除行" @click="onDeleteRowClick2" />
            </div>
          </template>
        </BsTable>
      </div>
    </div>
    <EnterItemConfigModal :item-visible.sync="itemVisible" :config-params="configParams" @onItemClose="dialogClose" />
  </vxe-modal>
</template>
<script>
import getFormConfData from './formConf.js'
import EnterItemConfigModal from './EnterItemConfigModal'
export default {
  name: 'FormConfModal',
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
      ifRenderFormConfTable: true,
      toolbarConfig: {
        disabledMoneyConversion: false,
        ...getFormConfData('subTabConf', 'toolbarConfig')
      },
      tableConfig: getFormConfData('subTabConf', 'tableConfig'),
      tableColumnsConfig1: getFormConfData('subTabConf', 'buttonsItemsConfig'),
      tableColumnsConfig2: getFormConfData('subTabConf', 'buttonsInfoItemsConfig'),
      formConfigData1: getFormConfData('subTabConf', 'defaultItemsDatas'),
      formConfigData2: getFormConfData('subTabConf', 'defaultItemsDatas'),
      itemVisible: false,
      configParams: {},
      paramsCp: {}
    }
  },
  methods: {
    onEnterConfig() {
      let subTabConfig = this.beforeSave()
      // 将json转成对象
      let paramsCopy = this.deepCopy(this.paramsCp)
      paramsCopy.configure = this.jsonParse(
        paramsCopy.configure
      )
      paramsCopy.configure.subTabConfig = subTabConfig
      this.configParams = this.deepCopy(paramsCopy)
      this.itemVisible = true
    },
    onCellClick(obj, context, e) {
      let key = obj.column.property
      if (key === 'select_') {
        if (obj.row.title === '') {
          this.$message.warning('请先选择要素')
        } else {
          this.tableColumnsConfig[1].editRender.props.config.disabled = false
          this.tableColumnsConfig[1].editRender.props.queryparams.elementCode = obj.row.title
        }
      }
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
    transformItemsDataToNest(columns) {
      // columns转化为vxe-table columns数据结构
      let self = this
      columns.forEach((column, columnIndex) => {
        if (Array.isArray(column.children) && column.children.length) {
          column.children = self.transformConlumsDataToNest(column.children)
        } else {
          if (column['renderName']) {
            column['itemRender'] = {
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
    // options 处理成 1#内容+2#内容
    changeOptions(data) {
      data.forEach(item => {
        // 如果是options
        if (item.options) {
          let str = ''
          item.options.forEach(item2 => {
            str += item2['code'] + '#' + item2['label'] + '+'
          })
          item.options = str.substring(0, str.length - 1)
        }
      })
      return data
    },
    // 处理cpt，处理按钮组会调用
    changeCptList(data) {
      let keyArr = []
      // 获取数组的key值
      for (let key in data[0]) {
        keyArr.push(key)
      }
      let str = ''
      data.forEach(item => {
        // 如果没有options，直接处理
        str += item[keyArr[0]] + '#' + item[keyArr[1]] + '+'
      })
      str = str.substring(0, str.length - 1)
      return str
    },
    // 处理按钮组
    changeButtonsInfo(data) {
      let arr = []
      for (let key in data) {
        data[key].forEach(item => {
          let childItem = item
          // 给每一项加个父页签
          childItem.parentCode = key
          // 如果有cpt数组 单独处理
          if (item.params && item.params.cptList) {
            let cptArr = this.changeCptList(item.params.cptList)
            childItem.cptList = cptArr
          }
          arr.push(childItem)
        })
      }
      return arr
    },
    // 保存前，处理好subTabConfig 表格 -> js对象
    beforeSave() {
      let subTabConfig = {
        changeBtns: true,
        buttons: [],
        curButton: {},
        buttonsInfo: {},
        methods: {
          bsToolbarClickEvent: ''
        }
      }
      // 处理页签
      const { fullData: tabelData1 } = this.$refs.bsTableRef.getTableData()
      let buttonsData = this.deepCopy(tabelData1)
      buttonsData.forEach(item => {
        if (item.options) {
          item.options = item.options.split('+').map(item => {
            return { label: item.split('#')[1], code: item.split('#')[0] }
          })
        }
      })
      subTabConfig.buttons = this.clearDataRenderField(buttonsData)
      // 处理第一个选择页签
      if (subTabConfig.buttons[0].type && subTabConfig.buttons[0].type === 'select') {
        let curButton = this.deepCopy(subTabConfig.buttons[0])
        if (curButton.options) {
          curButton.curValue = curButton.options[0].code
        }
        delete curButton['options']
        delete curButton['_XID']
        subTabConfig.curButton = curButton
      } else {
        subTabConfig.curButton = subTabConfig.buttons[0]
      }
      // 处理按钮组
      const { fullData: tabelData2 } = this.$refs.bsTableRef2.getTableData()
      let buttonsInfoData = this.deepCopy(tabelData2)
      let buttonsInfo = {}
      buttonsInfoData.forEach(item => {
        if (item.cptList) {
          item.params.cptList = item.cptList.split('+').map(item => {
            return { cptName: item.split('#')[0], label: item.split('#')[1] }
          })
          delete item['cptList']
        }
        if (!buttonsInfo[item.parentCode]) {
          buttonsInfo[item.parentCode] = []
          buttonsInfo[item.parentCode].push(this.clearItem(item))
        } else {
          buttonsInfo[item.parentCode].push(this.clearItem(item))
        }
      })
      subTabConfig.buttonsInfo = buttonsInfo
      return subTabConfig
    },
    clearItem(data) {
      for (let key in data) {
        if (key.indexOf('__') >= 0) {
          delete data[key]
        }
        if (data['status'] === '') {
          delete data['status']
        }
      }
      delete data['parentCode']
      delete data['cptList']
      delete data['_XID']
      return data
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
    onAddRowClick1() {
      this.$refs.bsTableRef.insertRowData()
    },
    onDeleteRowClick1() {
      this.$refs.bsTableRef.deleteRowData()
    },
    onAddRowClick2() {
      this.$refs.bsTableRef2.insertRowData()
    },
    onDeleteRowClick2() {
      this.$refs.bsTableRef2.deleteRowData()
    },
    getSaveParams(obj) {
      return Object.assign({ ...this.paramsCp }, { itemsConfig: [], formConfig: [], globalConfig: {} }, obj)
    },
    saveTableConf(tableConfStr) {
      // 保存表格配置
      let self = this
      this.$http[self.params.optionType === 'add' ? 'post' : 'put']('mp-b-perm-service/v1/tableconf', this.getSaveParams({
        configure: tableConfStr
      }))
        .then((res) => {
          self.dialogVisible = false
          self.$emit('closeCallback')
          if (res.rscode === '100000') {
            this.$message({
              showClose: true,
              message: self.params.optionType === 'add' ? '数据新增成功' : '数据保存成功',
              type: 'success'
            })
          }
        })
        .catch((error) => {
          return error
        })
    },
    onSaveClick() {
      let subTabConfig = this.beforeSave()
      // 将json转成对象
      this.paramsCp.configure = this.jsonParse(
        this.paramsCp.configure
      )
      this.paramsCp.configure.subTabConfig = subTabConfig
      // 保存点击事件
      const { fullData } = this.$refs.bsTableRef.getTableData()
      if (fullData.length) {
        this.saveTableConf(
          this.jsonStringify(this.paramsCp.configure)
        )
      } else {
        this.$message({
          showClose: true,
          message: '没有数据可保存，请重新录入！',
          type: 'success'
        })
      }
    },
    addTableConf(tableConfStr) {
      // 保存表格配置
      let self = this
      this.$http
        .post('mp-b-perm-service/v1/tableconf', {
          configure: tableConfStr,
          // menuguid: self.params.menuguid,
          // type: self.params.type,
          // id: self.params.id
          type: 'tableConf',
          id: self.$ToolFn.utilFn.getUuid(),
          name: 'testData',
          menuguid: '123456'
        })
        .then((res) => {
          if (res.rscode === '100000') {
            this.$message({
              showClose: true,
              message: '数据保存成功',
              type: 'success'
            })
          }
        })
        .catch((error) => {
          return error
        })
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
          delete itemN['_XID']
          if (Array.isArray(itemN.children) && itemN.children.length) {
            itemN.children = self.clearDataRenderField(itemN.children)
          }
        })
        return itemN
      })
    },
    getPureConfigData(data) {
      delete data['itemsConfig']
      delete data['subTabConfig']
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
      this.formConfigData1 = this.changeOptions(this.params.subTabConfig.buttons)
      this.formConfigData2 = this.changeButtonsInfo(this.params.subTabConfig.buttonsInfo)
      this.paramsCp = this.getPureConfigData(this.deepCopy(this.params))
      this.ifRenderFormConfTable = false
      this.$nextTick(() => {
        this.ifRenderFormConfTable = true
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
        Object.assign(this.configParams, this.paramsCp)
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
