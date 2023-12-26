<!--处理弹框-->
<template>
  <div v-loading="addLoading" class="payVoucherInput">
    <div v-for="(item,index) in formData" :key="item.titleName">
      <template v-if="item.type !== 'components'">
        <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">{{ item.titleName }}</div>
        <BsForm
          :ref="item.formRefKey || `createRef${index}`"
          class="createRef"
          :form-items-config="item.formItemList"
          :form-data-list="createDataList"
          :form-validation-config="validateData[item.formRefKey]"
          :is-editable="isCreate"
          title-align="top"
          @itemChange="itemChange"
        />
      </template>
      <BsUploadBak
        v-if="item.type === 'components'"
        ref="myUpload"
        :disabled="item.disabled"
        :allow-delete="!item.disabled"
        :allow-download="true"
        :allow-preview="true"
        :is-upload="!item.disabled"
        :attachment-id="createDataList[item.field]"
        :file-list="fileList3"
        :file-data-bak-del.sync="fileDataBakDel3"
        :file-data.sync="fileData3"
      />
    </div>
    <BsUpload
      ref="attachmentUpload"
      :downloadparams="downloadParams"
      uniqe-name="attachmentUpload"
    />
  </div>
</template>
<script>
import { post, get } from '@/api/http'
import VXETable from 'vxe-table'
import loadBsConfig from '@/views/main/dynamicTableSetting/config'
export default {
  name: 'HandleDialog',
  mixins: [loadBsConfig],
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  props: {
    showType: {
      type: String,
      default: 'submitWorkFlow',
      enmu: ['submitWorkFlow', 'detail', 'approve']
    },
    defaultFormData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    warningCode: {
      type: String,
      default: ''
    },
    row: { // 某些是从表单条过来的 可以传如一个row
      type: Object,
      default: () => {
        return {}
      }
    },
    column: { // 某些是从表单条过来的 可以传如一个column
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      configTypeId: {},
      tableLoading: false,
      tabCode: 'dcl-hsfk',
      formData: [],
      validateData: {},
      supplyDataList: {},
      createValidate: {},
      downloadParams: {
        fileguid: ''
      },
      createDataList: {},
      attachmentid: '',
      isCreate: true,
      showbox: false,
      fileList3: [],
      fileData3: [],
      fileDataBakDel3: [],
      addLoading: false,
      param5: {}
      // ----
    }
  },
  methods: {
    getAttachmentInfo(billguid) {
      if (!billguid) return []
      let params = {
        year: this.userInfo.year,
        province: this.mofDivCode || this.userInfo.province,
        billguid: billguid
      }
      return get(BSURL.api_fileservice_v2_files, params).then((res) => {
        let fileList = []
        if (res.data) {
          fileList = JSON.parse(res.data) || []
        }

        fileList.length && fileList.forEach(element => {
          let size = element.filesize / 1024
          element.filesize = size.toFixed(2) + 'KB'
        })
        return fileList
      })
    },
    setFormDisabled(formItemIndexList = []) {
      if (!formItemIndexList.length) return
      formItemIndexList.forEach((formItem, index) => {
        if (formItem.type === 'components') {
          formItem.disabled = true
          return
        }
        formItem.formItemList?.forEach(item => {
          if (item.itemRender?.props) {
            item.itemRender.props['disabled'] = true
          }
        })
      })
    },
    dialogClose() {
      this.dialogVisible = false
      this.$emit('close')
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('changeItemproperty', property)
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'violateType' :
          this.$refs.createRef?.$refs?.form?.clearValidate?.()
          this.createDataList.violateType = itemValue
          break
        case 'handleType' :
          this.createDataList.handleType = itemValue
          break
        case 'handleResult' :
          this.createDataList.handleResult = itemValue
          break
        default :
          break
      }
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
    getFlowParamVoList() {
      // 获取动态配置表单里面绑定得field 并且组装成[{key:表单每项得filed,value:表单filed绑定值}，，...]传给后端
      let flowParamVoList = []
      let formData = {}
      if (this.formData && this.formData.length) {
        this.formData.forEach((item, index) => {
          if (item.type !== 'components') { // 判断不是上传组件
            let formItemData = {}
            if (item.formRefKey) {
              formItemData = this.$refs[item.formRefKey][0].getFormData()
            } else {
              formItemData = this.$refs[`createRef${index}`][0].getFormData()
            }
            item.formItemList.forEach((ii, idx) => {
              let obj = {}
              obj.bizKey = ii.field
              obj.bizValue = formItemData[ii.field]
              if (item.needUpload) { // 获取需要上传的哪个表单的数据
                if (ii.field.indexOf('commentDept') > -1 && obj.bizValue) {
                  let obj2 = {
                    bizKey: 'commentName',
                    bizValue: ii.itemRender.options.find(item => { return item.value === obj.bizValue }).label
                  }
                  flowParamVoList.push(obj2)
                }
                flowParamVoList.push(obj)
              }
              formData[ii.field] = formItemData[ii.field]
            })
          } else {
            let obj = {}
            obj.bizKey = item.field
            obj.bizValue = this.createDataList[item.field] || this.createDataList.createdAttachmentid
            flowParamVoList.push(obj)
          }
        })
      }
      return { flowParamVoList, formData }
    },

    // 反馈
    async doFeedback() {
      if (Object.keys(this.validateData).length) {
        let formValidaPass = await Promise.all(
          Object.keys(this.validateData).map(key => {
            return new Promise(async(resolve, reject) => {
              let formInstance = this.$refs[key]
              if (!formInstance) {
                resolve(true)
                return
              }
              let valid = await formInstance[0].validate()
              if (valid === undefined) resolve(true)
            })
          })
        )
        if (!formValidaPass.every(one => { return one })) return
      }
      let { flowParamVoList, formData } = this.getFlowParamVoList()
      console.log(flowParamVoList, formData)
      formData.flowParamVoList = flowParamVoList
      this.tableLoading = true
      let params = {
        ...this.createDataList,
        ...formData,
        actionType: '2',
        warningCode: this.defaultFormData.warningCode,
        menuId: this.$store.state.curNavModule.guid,
        menuName: this.$store.state.curNavModule.name
      }
      return post(BSURL.lmp_workFlowWorkFlowUpdate, [params]).then(res => {
        this.tableLoading = false
        if (res.code === '000000') {
          this.$message.success('核实反馈成功')
        }
        return res
      })
    },
    initModal() {
      this.getTableConfByMenuguid(this.$store.state.curNavModule.guid).then(res => {
        res.forEach(item => {
          this.configTypeId[item.type] = item.id
        })
        this.loadConfig(this.configTypeId)
        // this.getValidateConfig(this.configTypeId)
      })
    },
    // 下载附件
    downloadAttachment(row) {
      console.log(row, '点击下载')
      if (!row.fileguid) return
      this.downloadParams.fileguid = row.fileguid
      this.$refs.attachmentUpload.downloadFileFile()
    },
    // 重新组装数据
    reassemblingParameters(pickFiledObject = {}) {
      const defaultReassemblingGroup = ['Code', 'Name']

      // 指定哪些key需要pick 默认取filed
      const filedList = this.incomeMsgConfig.map(item => item.field)
      // 以下特殊key对应取后面值的code+name形式
      const filedReassemblingGroup = {
        natureOfFunds: 'fundTypeCode',
        deptEconomyType: 'depBgtEcoCode',
        govEconomyType: 'govBgtEcoCode',
        settlementMethod: 'setModeCode',
        directFund: 'isDirCode',
        salaryMark: 'isSalCode',
        funcType: 'expFuncCode',
        businessOffice: 'manageMofDepCode',
        paymentMethod: 'payTypeCode',
        isThrExp: 'thrExpCode',
        payBusType: 'payBusTypeCode'
      }
      const newParameters = {}
      filedList.forEach(field => {
        let valueList = [pickFiledObject[field]]
        if (filedReassemblingGroup[field]) {
          valueList = defaultReassemblingGroup.map(replaceField => filedReassemblingGroup[field].replace('Code', replaceField)).map(newField => pickFiledObject[newField])
        }
        let newValueString = valueList.filter(Boolean).join('-') || ''// 去掉无用值 拼接
        newParameters[field] = newValueString
      })
      return newParameters
    },
    // 获取动态请求数据
    getDynamicParams(dynamicParams) {
      let _this = this
      console.groupCollapsed('动态表单可取的动态数据，点击展开')
      console.log('外层表格点击行数据 row:', this.row)
      console.log('外层表格点击列数据 column:', this.column)
      console.log('项目状态机数据 $store:', { ...this.$store.state, ...this.$store.getters })
      console.log('外层表格实例内置数据 ctx:', this.$parent)
      console.log('还可以取 window，localStroage...等')
      console.groupEnd()
      let storeCopy = {}
      try {
        storeCopy = JSON.parse(JSON.stringify({ ...this.$store.state, ...this.$store.getters }))
      } catch (error) {
        console.log(error)
      }
      let asyncQueue = Object.keys(dynamicParams || {})?.map(key => {
        let funcEnv = async () => {
          // eslint-disable-next-line
        let $store = storeCopy
          // eslint-disable-next-line
        let row = _this.row
          // eslint-disable-next-line
        let column = _this.column
          // eslint-disable-next-line
        let result = ''
          // eslint-disable-next-line
        let ctx=_this.$parent
          try {
            // eslint-disable-next-line
          result = eval(dynamicParams[key])
            result = JSON.parse(JSON.stringify(result))
            return { key, value: result }
          } catch (error) {
            console.error(`动态配置取值解析错误,错误key：${key}\n`, error)
            return { key, value: '' }
          }
        }
        return funcEnv()
      })
      return Promise.all(asyncQueue).then(res => {
        return res.reduce((pre, cur) => {
          pre[cur.key] = cur.value
          return pre
        }, {})
      })
    },
    async assemblingWorkFlowFormData(configQueryData) { // 组装工作流数据
      let createDataList = Object.assign({}, this.defaultFormData)
      let formDefaultValue = configQueryData.editConfig.defaultValue || {}
      let dynamicParams = configQueryData.editConfig.dynamicDefaultValue || {}
      if (this.showType !== 'detail') { // 重新组装默认值
        Object.keys(formDefaultValue).forEach(fieldKey => {
          if (createDataList[fieldKey]) {
            createDataList[fieldKey] = formDefaultValue[fieldKey]
          }
        })
        dynamicParams = await this.getDynamicParams(dynamicParams)
        createDataList = { ...createDataList, ...dynamicParams }
      }
      // 如果表单项配置了附件 则通过接口 拿到附件列表 并且重新给表单得配置项得itemRender挂载一个fileList
      for (let i = 0; i < this.formData.length; i++) {
        let eachForm = this.formData[i]
        if (eachForm.formItemList && eachForm.formItemList.length) {
          for (let j = 0; j < eachForm.formItemList.length; j++) {
            let formItem = eachForm.formItemList[j]
            if (formItem.itemRender.name === '$customerFileRender') { // 判断是渲染文件列表
              let fileList = await this.getAttachmentInfo(createDataList[formItem.field])
              this.$set(formItem.itemRender, 'fileList', fileList)
            }
            if (this.showType === 'detail') continue// 查看详情不需要从user拿
            if (formItem.itemRender.getServerTime) { // 如果配置了获取服务器时间 则取服务器时间
              createDataList[formItem.field] = createDataList.serverTime
            }
            if (formItem.itemRender.getUserName) { // 如果配置了获取服务器时间 则取服务器时间
              createDataList[formItem.field] = createDataList.userName
            }
          }
        } else if (eachForm.type === 'components') { // 如果表单配置了上传组件 则给表单数据配置一个上传组件得唯一ID 用于获取上传附件得id
          createDataList[eachForm.field] = createDataList[eachForm.field] || createDataList.createdAttachmentid
          if (createDataList[eachForm.field]) {
            this.fileData3 = await this.getAttachmentInfo(createDataList[eachForm.field])
            // console.log(createDataList[eachForm.field], this.fileData3)
          }
        }
      }
      this.$set(this, 'createDataList', createDataList)
    },
    async loadConfig(configTypeId) { // 请求工作流formitem配置项
      let { form } = configTypeId
      if (!form) return
      let params = {
        tableId: {
          id: form,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
          // userguid: ''
        }
      }
      let configQueryData = await this.loadBsConfig(params)
      if (this.showType === 'detail') {
        this.setFormDisabled(configQueryData.itemsConfig)
      }
      this.$set(this, 'formData', configQueryData.itemsConfig)// 设置表单项
      this.$set(this, 'validateData', configQueryData.editRules)// 设置校验数据
      await this.assemblingWorkFlowFormData(configQueryData)// 设置表单展示数据
      // 给vxetable配置渲染器  渲染文件列表
      let _this = this
      VXETable.renderer.add('$customerFileRender', {
        renderItemContent(h, renderOpts, { data, property }) {
          // console.log('customerFileRender', renderOpts, data, property)
          let fileList = renderOpts.fileList || []
          return fileList.map(item => {
            return <div>
              <a style="color: #1890ff; text-decoration: underline;" onClick={() => { _this.downloadAttachment(item) }}>{item.filename}</a>
            </div>
          })
        }
      })
      // 福建判断去除区划
      if (this.$store.getters.isFuJian) {
        this.formData[0].formItemList = this.formData[0].formItemList.filter(item => {
          return item.field !== 'mofDivName'
        })
      }
    }
  },
  watch: {
    defaultFormData: {
      handler() {
        this.initModal()
      },
      deep: true,
      immediate: true
    }
  },
  created() {

  },
  mounted() {
    console.log('当前传过来得formData', this.defaultFormData)
  },
  destoryed() {
    VXETable.renderer.delete('$customerFileRender')
  }
}
</script>
<style lang="scss" scoped>
 /deep/ .createRef{
  .vxe-form--item.vxe-col--24{
     .vxe-form--item-inner{
      align-items: flex-start !important;
    }
  }
  .vxe-textarea--inner[disabled]{
    background: var(--common-background) !important;
  }
}

</style>
