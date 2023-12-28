<template>
  <vxe-modal
    v-model="dialogVisible"
    title="新增"
    width="55%"
    :position="{ top: '17%', left: '23%' }"
    resize
    remember
    transfer
    :show-close="true"
    @close="close"
  >
    <div class="height-all pdl10 pdr10" style="overflow: auto">
      <div class="main-modulebox-tabcon ofa">
        <div>
          <!-- <BsTitle type="left">新增预审信息</BsTitle> -->
          <div>
            <BsForm
              v-if="showForm"
              ref="addForm"
              :default-money-unit="1"
              :form-config="formConfig"
              :is-editable="true"
              :form-items-config="formItemsConfig"
              :form-data-list.sync="formDataList"
              :form-validation-config="formValidationConfig"
              @itemChange="itemChange"
            />
          </div>
        </div>
        <div class="option-line-group" style="margin-top: 20px;">
          <div class="fn-inline option-line-group-btn pdl0 pdr0">
            <div class="fn-inline">
              <vxe-button status="primary" @click="onSureClick">确 定</vxe-button>
              <vxe-button code="reset" @click="cancel">取 消</vxe-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>

<script>
import { proconf } from './addDiaLog.js'
import HttpModule from '@/api/frame/main/baseConfigManage/ProjectConf.js'
export default {
  name: 'AddDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      formConfig: {}, // 表单配置默认为空
      formItemsConfig: proconf.formItemsConfig, // 表单的每项设置
      formDataList: {},
      formValidationConfig: proconf.formValidationConfig,
      saveData: {},
      showForm: true
    }
  },
  methods: {
    // 1,2,3,4分别为表单配置的字段下标 直接使用
    itemChange({ $form, property, itemValue, data }, bsform) {
      let self = this
      switch (property) {
        case 'threeSafe' :
          if (data.threeSafe_id) {
            this.formItemsConfig[1].itemRender.props.disabled = false
          } else {
            this.operateConfig([1, 2, 3, 4], true)
          }
          break
        case 'payment':
          this.operateConfig([2, 3, 4], true)
          if (data.payment__multiple.length > 0) {
            data.payment__multiple.forEach(item => {
              let eleCode = item === '0' ? 'EXPFUNC' : item === '1' ? 'GOVBGTECO' : 'DEPBGTECO'
              let configIndex = item === '0' ? 2 : item === '1' ? 3 : 4
              self.formItemsConfig[configIndex].itemRender.props.config.disabled = false
              self.getRegulation(eleCode, configIndex)
            })
          }
          break
      }
    },
    operateConfig(arr, isLock) {
      let self = this
      arr.forEach(item => {
        if (isLock) {
          if (item === 1) {
            self.formDataList = {}
            self.showForm = false
            this.$nextTick(() => {
              self.showForm = true
            })
          }
        }
        this.formItemsConfig[item].itemRender.props.disabled = isLock
        if (this.formItemsConfig[item].itemRender.props.config) {
          this.formItemsConfig[item].itemRender.props.config.disabled = isLock
        }
      })
    },
    getRegulation(eleCode, configIndex) {
      let queryparams = {
        tokenid: this.$store.getters.getLoginAuthentication.tokenid,
        appguid: 'apaas',
        year: this.$store.state.userInfo.year,
        mofDivCode: this.$store.state.userInfo.province,
        parameters: {}
      }
      HttpModule.getTreeWhereNew(eleCode, queryparams).then(res => {
        if (res.rscode === '100000') {
          let treeResdata = this.getRegulationChildrenData(res.data)
          this.formItemsConfig[configIndex].itemRender.options = treeResdata
        }
      })
    },
    getRegulationChildrenData(datas) {
      let that = this
      datas.forEach(item => {
        item.label = item.code + '-' + item.name
        item.parentid = item.superguid
        if (item.children && item.children.length > 0) {
          that.getRegulationChildrenData(item.children)
          item.leaf = false
        } else {
          item.leaf = true
        }
      })
      return datas
    },
    // 保存数据
    onSureClick() {
      let dataList = []
      let formData = this.$refs.addForm.getFormData()
      let isSuccess = true
      formData.payment__multiple.forEach(item => {
        if (!isSuccess) { return }
        if (item === '0') {
          if (!formData.exp_func_id) {
            this.$message.warning('请选择功能分类!')
            isSuccess = false
          } else {
            formData.exp_func_id__multiple.forEach((expFuncItem, index) => {
              let param = {
                proId: expFuncItem,
                proCode: formData.exp_func_code__multiple[index],
                proName: formData.exp_func_name__multiple[index],
                type: 1,
                threeSafeId: formData.threeSafe_id,
                threeSafeCode: formData.threeSafe_code,
                threeSafeName: formData.threeSafe_name
              }
              dataList.push(param)
            })
          }
        }
        if (item === '1') {
          if (!formData.gov_bgt_eco_id) {
            this.$message.warning('请选择政府经济科目!')
            isSuccess = false
          } else {
            formData.gov_bgt_eco_id__multiple.forEach((govItem, index) => {
              let param = {
                proId: govItem,
                proCode: formData.gov_bgt_eco_code__multiple[index],
                proName: formData.gov_bgt_eco_name__multiple[index],
                type: 2,
                threeSafeId: formData.threeSafe_id,
                threeSafeCode: formData.threeSafe_code,
                threeSafeName: formData.threeSafe_name
              }
              dataList.push(param)
            })
          }
        }
        if (item === '2') {
          if (!formData.dep_bgt_eco_id) {
            this.$message.warning('请选择部门经济科目!')
            isSuccess = false
          } else {
            formData.dep_bgt_eco_id__multiple.forEach((depItem, index) => {
              let param = {
                proId: depItem,
                proCode: formData.dep_bgt_eco_code__multiple[index],
                proName: formData.dep_bgt_eco_name__multiple[index],
                type: 3,
                threeSafeId: formData.threeSafe_id,
                threeSafeCode: formData.threeSafe_code,
                threeSafeName: formData.threeSafe_name
              }
              dataList.push(param)
            })
          }
        }
      })
      if (!isSuccess) { return }
      this.addLoading = true
      HttpModule.add(dataList).then(res => {
        this.addLoading = false
        if (res.code === '000000') {
          this.operateConfig([1, 2, 3, 4], true)
          this.$message.success(res.message)
          this.$parent.dialogVisibleSx = false
          this.$parent.queryTableDatas()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 取消按钮
    cancel() {
      this.$emit('update:dialogVisible', false)
    },
    // 关闭弹框按钮
    close() {
      this.$emit('update:dialogVisible', false)
    }
  },
  created() {
    // this.formDataList = Object.assign({}, this.formData)
    // 如果热点名称为空位新增状态 获取热点编码
  },
  mounted() {
    this.operateConfig([1, 2, 3, 4], true)
  }
}
</script>

<style scoped>
.switchBox{
  position: absolute;
  top: 163px;
  left: 156px;
}
@media screen and (max-width: 1300px) {
  .switchBox{
    position: absolute;
    top: 31vh;
    left: 156px;
  }
}

@media screen and (width: 793px) {
  .switchBox{
    position: absolute;
    top: 60vh;
    left: 156px;
  }
}

@media screen and (width: 790px) {
  .switchBox{
    position: absolute;
    top: 60vh;
    left: 156px;
  }
}
</style>
