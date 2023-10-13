<!--处理弹框-->
<template>
  <div v-loading="tableLoading">
    <vxe-modal
      v-model="dialogVisible"
      title="转移支付资金上下级对账信息"
      @close="dialogClose"
    >
      <BsForm
        ref="refForm"
        :form-items-config="formItemsConfig"
        :form-data-list="formData"
      />
      <div>比对状态: {{ formData.compareStatus === '1' ? '比对一致' : '比对不一致' }}</div>
      <el-divider />
      <div style="width: 100%;display: flex;justify-content: center;">
        <vxe-button @click="onSureClick">确定</vxe-button>
        <vxe-button status="primary" @click="onSureClick">取消</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import VXETable from 'vxe-table'
import loadBsConfig from '@/views/main/dynamicTableSetting/config'
export default {
  name: 'HandleDialog',
  mixins: [loadBsConfig],
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: true,
      formData: {
        ...this.data,
        fundType: this.data.fundTypeCode + '-' + this.data.fundTypeName,
        expFunc: this.data.expFuncCode + '-' + this.data.expFuncName,
        tpFunc: this.data.tpFuncCode + '-' + this.data.tpFuncName,
        govBgtEco: this.data.govBgtEcoCode + '-' + this.data.govBgtEcoName,
        distriType: this.data.distriTypeCode + '-' + this.data.distriTypeName
      } || {},
      // formData: {
      //   supBgtDocNo: '财政部关于下达2023年',
      //   corBgtDocNo: '100111',
      //   amount: '90.000.000.00',
      //   docDate: '2023-06-09',
      //   bgtDec: '财政部关于下达2023年中央专项彩票公益金支持欠发达革命老区乡村振兴项目资金预算的通知',
      //   proCode: '10000017Z175070060003',
      //   proName: '中央专项彩票公益金支持欠发达革命老区乡村振兴项目资金',
      //   fundTypeName: '政府性基金预算资金', 11
      //   expFuncName: '2296011-用于巩固脱贫攻坚成果衔接乡村振兴的彩票公益金支出', 111
      //   tpFuncName: '2300409-农林水', 111
      //   govBgtEco: '51301-上下级政府间转移性支出', 111
      //   distriTypeName: '因素法', 111
      //   isTrack: '是'
      // },
      formItemsConfig: [
        {
          field: 'bgtDocTitle',
          title: '指标标题',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入指标标题'
            }
          }
        },
        {
          field: 'corBgtDocNoName',
          title: '指标文号',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '抢输入指标文号'
            }
          }
        },
        {
          field: 'amount',
          title: '指标金额',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '抢输入指标金额'
            }
          }
        },
        {
          field: 'docDate',
          title: '发文时间',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入发文时间'
            }
          }
        },
        {
          field: 'bgtDec',
          title: '指标说明',
          span: 24,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入指标说明'
            }
          }
        },
        {
          field: 'proCode',
          title: '项目编码',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入项目编码'
            }
          }
        },
        {
          field: 'proName',
          title: '项目名称',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入项目名称'
            }
          }
        },
        {
          field: 'fundType',
          title: '资金性质',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入资金性质'
            }
          }
        },
        {
          field: 'expFunc',
          title: '支出功能分类科目',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入支出功能分类科目'
            }
          }
        },
        {
          field: 'tpFunc',
          title: '转移支付功能分类科目',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入转移支付功能分类科目'
            }
          }
        },
        {
          field: 'govBgtEco',
          title: '政府支出经济分类',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入政府支出经济分类'
            }
          }
        },
        {
          field: 'distriType',
          title: '分配方式',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: '请输入分配方式'
            }
          }
        },
        {
          field: 'isTrack',
          title: '是否追踪',
          span: 12,
          itemRender: {
            name: '$vxeInput',
            props: {
              readonly: true,
              disabled: true,
              type: 'text',
              placeholder: ''
            }
          }
        }
      ]
    }
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false
      this.$emit('close', this.dialogClose)
    },
    onSureClick() {
      this.dialogClose()
    }
  },
  watch: {},
  created() {},
  mounted() {
  },
  destoryed() {
    VXETable.renderer.delete('$customerFileRender')
  }
}
</script>
<style scoped>
::v-deep .vxe-modal--box {
  width: 800px;
  height: 500px;
}
::v-deep .vxe-form--item-inner {
  flex-direction: column;
  align-items: flex-start;
}
::v-deep .vxe-form--item-title {
  width: auto !important ;
}
::v-deep .vxe-form--item-content {
  width: 300px !important;
}
::v-deep .vxe-form .vxe-form--item-inner>.align--left {
  width: 100% !important;
}
</style>
