<!--政策法规管理新增页面弹框-->
<template>
  <vxe-modal
    v-model="dialogVisible"
    :title="title"
    width="80%"
    :show-footer="true"
    @close="dialogClose"
  >
    <vxe-form
      ref="ruleForm"
      :data="createDataList"
      span="24"
      title-width="120"
      :rules="createValidate"
      title-align="right"
      class="demo-ruleForm"
    >
      <vxe-form-item v-for="(item,index) in createConfig" :key="index" :title="item.title" :field="item.field">
        <vxe-input :value="createDataList[item.field]" @change="(e) => createDataList[item.field] = e.value" />
      </vxe-form-item>
    </vxe-form>
    <div slot="footer" style="width:100%;height: 80px;margin:0 15px">
      <div type="flex" justify="end">
        <div style="width:100%">
          <vxe-button id="savebutton" style="float:right;margin-right:20px" status="primary" @click="save">保存</vxe-button>
          <vxe-button style="float:right;margin-right:20px" @click="dialogClose">取消</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
import { proconf, mobilePhoneValid, officePhoneValid, emailValid } from './columns.js'
import httpModules from '@/api/frame/main/Monitoring/Policies.js'
export default {
  components: {},
  computed: {
  },
  props: {
  },
  data() {
    return {
      createConfig: proconf.createConfig,
      title: '设置规则联系人',
      dialogVisible: false,
      createDataList: {
        id: '',
        regulationCode: '',
        mofDivCode: '',
        agencyCode: null,
        contactPerson: '',
        officePhone: '',
        mobilePhone: '',
        email: '',
        weChat: '',
        qqNumber: '',
        otherWay: '',
        otherInfo: '',
        fiscalYear: ''
      },
      createValidate: {
        contactPerson: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ],
        officePhone: [
          { required: true, validator: officePhoneValid, trigger: 'change' }
        ],
        mobilePhone: [
          { validator: mobilePhoneValid, trigger: 'change' }
        ],
        email: [
          { validator: emailValid, trigger: 'change' }
        ]
      },
      isCreate: true
    }
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false
    },
    async save() {
      try {
        let valid = await this.$refs.ruleForm.validate()
        if (valid !== undefined) return undefined
        let params = this.createDataList
        httpModules.saveForm(params).then(res => {
          console.log(77, res)
          if (res && res.code === '000000') {
            this.dialogVisible = false
            this.$message.success('成功')
            this.$parent.queryTableDatas()
          }
        })
      } catch (error) {

      }
    }
  },
  watch: {
    dialogVisible() {
      this.$refs.ruleForm.clearValidate()
    }
  },
  created() {

  }
}
</script>
<style lang="scss"></style>
