<!--处理弹框-->
<template>
  <div>
    <vxe-modal
      v-model="dialogVisible"
      :title="title"
      width="96%"
      height="90%"
      :show-footer="true"
      @close="dialogClose"
    >
      <div v-loading="addLoading" class="payVoucherInput">
        <div v-for="(item) in formData" :key="item.titleName">
          <template v-if="item.type !== 'components'">
            <div style="color:#40aaff;margin-bottom:5px;font-size:16px;font-weight:bold">{{ item.titleName }}</div>
            <BsForm
              ref="createRef"
              class="createRef"
              :form-items-config="item.formItemList"
              :form-data-list="createDataList"
              :form-validation-config="createValidate"
              :is-editable="isCreate"
              title-align="top"
              @itemChange="itemChange"
            />
          </template>
          <BsUploadBak
            v-if="item.type === 'components'"
            ref="myUpload"
            :disabled="false"
            :allow-delete="false"
            :allow-download="true"
            :allow-preview="true"
            :is-upload="true"
            :attachment-id="createDataList[item.field]"
            :file-list="fileList3"
            :file-data-bak-del.sync="fileDataBakDel3"
            :file-data.sync="fileData3"
          />
        </div>

      </div>
      <div slot="footer" style="height: 80px;margin:0 15px">
        <div v-if="showbox" id="bigbox"></div>
        <el-divider style="color:#E7EBF0" />
        <div type="flex" justify="space-around">
          <div>
            <vxe-button status="primary" @click="doFeedback">确定</vxe-button>
            <vxe-button @click="dialogClose">取消</vxe-button>
          </div>
        </div>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import { proconf } from './createProcessing.js'
import HttpModule from '@/api/frame/main/fundMonitoring/createProcessing.js'
// import { checkPhone } from '@/utils/index.js'
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

  },
  data() {
    return {
      tabCode: 'dcl-hsfk',
      showFormType: {
        show1: true,
        show2: true,
        show3: false,
        show4: false,
        show5: false
      },
      formData: [],
      title: '监控处理单',
      dialogVisible: false,
      createValidate: {

        phone1: [
          { validator: proconf.mobilePhoneValid, trigger: 'change' }
        ]
      },
      createDataList: {},
      attachmentid: '',
      isCreate: true,
      showbox: false,
      fileList3: [{}],
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
      return HttpModule.getFile(params).then((res) => {
        let fileList = JSON.parse(res.data) || []
        fileList.length && fileList.forEach(element => {
          let size = element.filesize / 1024
          element.filesize = size.toFixed(2) + 'KB'
        })
        return fileList
      })
    },
    setOtherFormItem() {
      this.showFormType = {
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false
      }
    },
    setFormDisabled(formItemIndexList = []) {
      if (!formItemIndexList.length) return
      formItemIndexList.forEach((formItem) => {
        this[`createConfig${formItem}`].forEach(item => {
          item.itemRender.props['disabled'] = true
        })
      })
    },
    /**
     *
     * @param {Array[string]} formItemIndexList 在data定义的表单字段list
     * @param {Array[string]} filedList 需要禁用的字段,传filed的值
     */
    setFormItemDisabled(formItemIndexList, filedList) { //
      if (!formItemIndexList.length) return
      formItemIndexList.forEach((formItem) => {
        this[`createConfig${formItem}`].forEach(item => {
          if (filedList.includes(item.field)) {
            item.itemRender.props['disabled'] = true
          } else {
            item.itemRender.props['disabled'] = false
          }
        })
      })
    },
    dialogClose() {
      this.dialogVisible = false
      this.$emit('close')
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      console.log('fuck')
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
            item.formItemList.forEach((ii, idx) => {
              let obj = {}
              obj.key = ii.field
              obj.value = this.$refs.createRef[index].getFormData()[ii.field]
              if (item.needUpload) { // 获取需要上传的哪个表单的数据
                flowParamVoList.push(obj)
              }
              formData[ii.field] = this.$refs.createRef[index].getFormData()[ii.field]
            })
          } else {
            let obj = {}
            obj.key = item.field
            obj.value = this.createDataList.createdAttachmentid
            flowParamVoList.push(obj)
          }
        })
      }
      return { flowParamVoList, formData }
    },

    // 反馈
    async doFeedback() {
      // let valid = await this.$refs.createRef.forEach.validate()
      // if (valid !== undefined) return undefined
      // console.log(777, formData, flowParamVoList)
      let { flowParamVoList, formData } = this.getFlowParamVoList()
      console.log(flowParamVoList, formData)
      formData.flowParamVoList = flowParamVoList
      let params = {
        ...this.createDataList,
        ...formData,
        actionType: '2',
        menuId: this.$store.state.curNavModule.guid
      }
      HttpModule.workFlowUpdate([params]).then(res => {
        if (res.code === '000000') {
          this.$message('核实反馈成功')
          this.dialogClose()
          this.$parent.queryTableDatas()
        }
      })
    },
    initModal() {
      console.log('查看数据', Object.assign({}, this.createDataList))
      this.getTableConfByMenuguid(this.$store.state.curNavModule.guid).then(res => {
        res.forEach(item => {
          if (item.type === 'form') {
            this.loadConfig(item.id)// 加载表格
          }
        })
      })
    },
    async loadConfig(id) { // 请求工作流formitem配置项
      let params = {
        tableId: {
          id: id,
          fiscalyear: this.userInfo.year,
          mof_div_code: this.userInfo.province,
          menuguid: this.$store.state.curNavModule.guid
          // userguid: ''
        }
      }
      let configQueryData = await this.loadBsConfig(params)
      this.$set(this, 'formData', configQueryData.itemsConfig)
      let createDataList = Object.assign({}, this.createDataList)
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
            if (formItem.itemRender.getServerTime) { // 如果配置了获取服务器时间 则取服务器时间
              createDataList[formItem.field] = createDataList.serverTime
            }
            if (formItem.itemRender.getUserName) { // 如果配置了获取服务器时间 则取服务器时间
              createDataList[formItem.field] = createDataList.userName
            }
          }
        } else if (eachForm.type === 'components') { // 如果表单配置了上传组件 则给表单数据配置一个上传组件得唯一ID 用于获取上传附件得id
          createDataList[eachForm.field] = createDataList.createdAttachmentid
        }
      }
      this.$set(this, 'createDataList', createDataList)
      // 给vxetable配置渲染器  渲染文件列表
      VXETable.renderer.add('$customerFileRender', {
        renderItemContent(h, renderOpts, { data, property }) {
          console.log('customerFileRender', renderOpts, data, property)
          let fileList = renderOpts.fileList || []
          return fileList.map(item => {
            return <div>
              <a style="color: #1890ff; text-decoration: underline;">{item.filename}</a>
            </div>
          })
        }
      })
    }
  },
  watch: {
  },
  created() {

  },
  mounted() {
    console.log('当前传过来得formData', this.createDataList)
    console.log('当前传过来得表单配置项', this.formData)
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
