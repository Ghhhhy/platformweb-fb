<-- 报表任务录入弹窗-->
<template>
  <vxe-modal
    v-model="visible"
    v-loading="showLoading"
    :title="title"
    width="35%"
    height="52%"
    position="center"
    :show-footer="true"
    @close="closeAddDialog"
  >
    <div>
      <BsForm
        ref="addForm"
        :form-items-config="addFormItemsConfig"
        :form-data-list="formData"
        :form-validation-config="formValidationConfig"
        @itemChange="itemChange"
      />
    </div>
    <div slot="footer" class="vxeModalUnique" style="">
      <!-- <el-divider style="color:#E7EBF0" /> -->
      <el-row type="flex" justify="space-around" style="margin-top:0px;">
        <el-col :span="8" style="margin-top:10px;" />
        <el-col :span="4" />
        <el-col :span="12" style="margin-top:0px;float:right;">
          <div>
            <el-button @click="closeAddDialog">取消</el-button>
            <el-button type="primary" style="margin-right:0px;" @click="addOrUpdateTask">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </vxe-modal>
</template>

<script>

import moment from 'moment'
import resolveResult from '@/utils/result.js'
export default {
  name: 'AddDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visible: true,
      showLoading: false,
      formData: {
        taskId: '',
        taskCode: '',
        taskName: '',
        taskType: '',
        taskStartDate: '',
        taskEndDate: '',
        taskStatus: '1',
        fileId: '',
        reportType: '',
        type: ''
      },
      addFormItemsConfig: [
        {
          title: '项目编码',
          field: 'proCode',
          span: 24,
          align: 'left',
          titleWidth: 100,
          titleAlign: 'left',
          formula: '',
          name: '$vxeInput',
          itemRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '项目编码'
            }
          }
        },
        {
          title: '项目名称',
          field: 'proName',
          span: 24,
          align: 'left',
          titleWidth: 100,
          titleAlign: 'left',
          formula: '',
          name: '$vxeInput',
          itemRender: {
            name: '$vxeInput',
            options: [],
            props: {
              placeholder: '项目名称'
            }
          }
        },
        {
          title: '业务主管处室名称',
          field: 'manageMofDepName',
          titleWidth: 100,
          titleAlign: 'left',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: { placeholder: '业务主管处室名称' }
          }
        },
        {
          field: 'department',
          title: '监控业务分类',
          titleWidth: 100,
          titleAlign: 'left',
          span: 24,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '启用'
              },
              {
                value: '0',
                label: '停用'
              }
            ],
            props: { required: true }
          }
        },
        {
          field: 'department',
          title: '是否私有',
          titleWidth: 100,
          titleAlign: 'left',
          span: 24,
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                value: '1',
                label: '是'
              },
              {
                value: '0',
                label: '否'
              }
            ],
            props: { required: true }
          }
        },
        {
          title: '管理级次',
          field: 'regulationType',
          span: 24,
          titleWidth: 100,
          titleAlign: 'left',
          align: 'left',
          formula: '',
          name: '$vxeSelect',
          itemRender: {
            name: '$vxeSelect',
            options: [
              { value: '1', label: '系统级' },
              { value: '2', label: '财政级' },
              { value: '3', label: '部门级' }
            ],
            props: {
              placeholder: '管理级次'
            }
          }
        },
        {
          title: '显示顺序',
          field: 'orderNum',
          align: 'left',
          titleWidth: 100,
          titleAlign: 'left',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              placeholder: '请输入显示顺序',
              size: 'small',
              type: 'number',
              min: 0,
              max: 42
            }
          }
        },
        {
          field: '',
          title: '备注',
          span: 24,
          titleWidth: 100,
          titleAlign: 'left',
          itemRender: { name: '$vxeNewInput', props: { required: true, clearable: true, placeholder: '请输入备注' } }
        }
      ],
      formValidationConfig: {
        taskCode: [
          {
            required: true,
            message: '请输入任务编码',
            trigger: 'change'
          },
          {
            required: true,
            min: 0,
            max: 15,
            message: '任务编码最大不可超过15个字符',
            trigger: 'change'
          }
        ],
        reportDetailType: [
          {
            required: true,
            message: '请选择报表类型',
            trigger: 'change'
          }
        ],
        taskName: [
          {
            required: true,
            message: '请输入任务名称',
            trigger: 'change'
          },
          {
            required: true,
            min: 0,
            max: 20,
            message() {
              return '任务名称最大不可超过20个字符'
            },
            trigger: 'change'
          }
        ],
        taskType: [{
          required: true,
          message: '请选择任务类型',
          trigger: 'change'
        }]
      }
    }
  },
  mounted() {
  },
  methods: {
    ...resolveResult,
    reSetData() {
      this.formData = {
        proCode: '',
        orderNum: '',
        regulationType: '',
        department: '',
        manageMofDepName: ''
      }
    },
    closeAddDialog() {
      this.formData = {
        proCode: '',
        orderNum: '',
        regulationType: '',
        department: '',
        manageMofDepName: ''
      }
      this.visible = false
      this.$parent.dialogVisible = false
    },
    getDate(value, frm) {
      return moment(new Date(value)).format(frm)
    },
    addOrUpdateTask() {
      this.showLoading = true
      var _this = this
      this.$refs.addForm
        .validate()
        .then(res => {
        })
        .catch(err => {
          _this.showLoading = false
          console.log(err)
        })
    },
    transJson(str) {
      if (!str) return
      var params = str.split(',')
      var result = {}
      if (params && params.length > 0) {
        for (var i = 0; i < params.length; i++) {
          var map = params[i].split('=')
          result[map[0]] = map[1]
        }
      }
      return result
    },
    itemChange({ $form, property, itemValue, data }, bsform) {
      switch (property) {
        default :
          this.formData[property] = itemValue
          break
      }
    }
  },
  watch: {
    dialogVisible(val) {
      this.visible = val
    }
  }
}
</script>
<style lang="scss" scoped>

.body{
  margin-left: 14px;
  margin-right: 14px;
  // max-height: 650px;
  .vxe-input--inner{
    text-align: right;
  }
  .vxe-input{
  height: 40px;
  width: 100%;
  }
  // 头部 table 样式
  .header-table{
    margin-top: 16px;
  }
}
.bs-file__upload {
  display: inline-block;
}
span {
  padding-left: 10px;
  line-height: 30px;
  position: relative;
  display: flex;
  .content {
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .delete-img {
    display: none;
    position: absolute;
    right: 12px;
    color: #ccc;
    &:hover {
      color: #000;
    }
  }
  &:hover {
    background: #eee;
    .delete-img {
      display: block;
    }
  }
}
</style>
