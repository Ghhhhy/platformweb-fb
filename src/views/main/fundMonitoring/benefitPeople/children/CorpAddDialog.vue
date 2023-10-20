<template>
  <vxe-modal
    v-model="dialogVisible"
    class="ledger"
    :title="title"
    width="60%"
    height="50%"
    position="top"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" style="padding-bottom: 10px;">
      <BsTable
        ref="mainTableRef"
        :footer-config="tableFooterConfig"
        :table-columns-config="tableColumnsConfig"
        :table-data="tableData"
        :table-config="tableConfig"
        :pager-config="mainPagerConfig"
        :edit-config="{
          activeMethod() {
            return true
          },
        }"
        :toolbar-config="tableToolbarConfig"
        @onToolbarBtnClick="onToolbarBtnClick"
      >
        <template v-slot:toolbarSlots>
          <div class="table-toolbar-left">
            <div class="table-toolbar-left-title">
              <span class="fn-inline">{{ menuName }}</span>
              <i class="fn-inline"></i>
            </div>
          </div>
        </template>
      </BsTable>
    </div>
    <div slot="footer" class="vxeModalUnique">
      <el-button size="mini" type="primary" style="margin-right:0px;" @click="addCorpInfo">开始导入</el-button>
      <el-button size="mini" @click="dialogClose">取消</el-button>
    </div>
  </vxe-modal>
</template>

<script>
// import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeople.js'
import { proconf } from '../../benefitEnterprisesAndPeopleImport/BenefitEnterprisesAndPeopleImport'
import HttpModule from '@/api/frame/main/fundMonitoring/benefitPeople.js'
import { checkRscode } from '@/utils/checkRscode'

export default {
  name: 'CorpAddDialog',
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    selectData: {
      type: Array,
      default () {
        return []
      }
    },
    fileConfigcorp: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data() {
    return {
      tableFooterConfig: {
        showFooter: false
      },
      fileConfig: {
        fileName: '',
        file: null,
        maxSize: 1024 * 1024 * 10
      }, // 导入文件配置
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $payVoucherInputGloableOptionRow: proconf.gloableOptionRow
        }
      },
      menuName: '',
      mainPagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 20
      },
      tableToolbarConfig: {
        // table工具栏配置
        refresh: false,
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableData: [],
      dialogVisible: true,
      addLoading: true,
      formValidationConfig: {
        mofDivCode: [
          { required: true, message: '企业性质不能为空', trigger: 'blur' }
        ]
      },
      tableColumnsConfig: [
        {
          title: '企业社会统一信用代码',
          field: 'unifsocCredCode',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '企业名称',
          field: 'corpName',
          itemRender: { name: '$vxeNewInput', props: { type: 'string', disabled: false, maxlength: 38, showWordLimit: true } },
          span: 12
        },
        {
          title: '企业性质',
          field: 'corpType',
          align: 'center',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '0', label: '国企' },
              { value: '1', label: '民营' },
              { value: '2', label: '外企' },
              { value: '3', label: '其他' }
            ],
            defaultValue: '',
            props: {}
          },
          name: '$vxeSelect',
          span: 12
        }
      ]
    }
  },
  created() {
    this.tableData = [ ...this.selectData ]
  },
  methods: {
    dialogClose() {
      this.$parent.addCorpDialogVisible = false
    },
    // 深拷贝通用方法
    deepCopy(obj) {
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
    addCorpInfo() {
      console.log(this.$refs.mainTableRef.getTableData())
      // todo 调用批量保成功后在调用 - 批量导入接口
      let { tableData } = this.$refs.mainTableRef.getTableData()
      this.tableData = this.deepCopy(tableData)
      HttpModule.batchSaveCorpData(this.tableData).then(async res => {
        if (res.code === '000000') {
          checkRscode(
            await HttpModule.importPersonAndCompany(this.fileConfigcorp)
          )
          // 关闭弹窗
          this.$parent.addCorpDialogVisible = false
          this.$parent.importModalVisible = false
          this.$message.success('导入成功')
        } else {
          this.$parent.addCorpDialogVisible = false
          this.$message.error(res.message)
        }
      })
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    }
  }

}
</script>

<style scoped>

</style>
