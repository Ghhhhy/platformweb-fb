<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoSecondAudit.js'
export default {
  data() {
    return {
      attachmentId: '',
      hideTree: true,
      tableColumnsIdConfig: [
        {
          code: '1',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '2',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '3',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目基本信息终审',
      tableUrl: '',
      tableParams: {},
      hideZero: true,
      tableCountUrl: '',
      tableCountParams: {},
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'select',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrl: '',
            label: '待办事项',
            code: '1',
            curValue: '1',
            options: [
              {
                label: '未审核',
                code: '1'
              }
              // {
              //   label: '被退回',
              //   code: '4'
              // },
              // {
              //   label: '全部',
              //   code: '1,4'
              // }]
            ]
          },
          {
            type: 'select',
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已办事项',
            code: '2',
            curValue: '2',
            options: [
              {
                label: '已审核',
                code: '2'
              }
              // {
              //   label: '已退回',
              //   code: '3'
              // },
              // {
              //   label: '全部',
              //   code: '2,3'
              // }]
            ]
          },
          {
            type: 'button',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            iconUrl: '',
            label: '曾经办',
            code: '3',
            curValue: '3'
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '待办事项',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
            {
              code: 'pay-audit',
              label: '审核',
              status: 'primary'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '3': [
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ]
        }
      },
      currentRow: {}
    }
  },
  methods: {
    onBtnClick(obj) {
      if (obj.code === 'pay-audit') {
        this.$message.info('审核')
        this.auditRecord()
      }
      if (obj.code === 'pay-unAudit') {
        this.$message.info('撤销')
        this.revokeRecord()
      }
      if (obj.code === 'pay-checkDetails') {
        this.$message.info('查看详情')
        this.viewRecordDetail()
      }
    },
    // 审核
    auditRecord() {
      if (this.$refs.tmp.tableRef.getSelectionData().length < 1) {
        this.$message.warning('请至少选择一条数据进行审核')
        return false
      }
      HttpModule.auditDataRecords()
    },
    // 撤销
    revokeRecord() {
      if (this.$refs.tmp.tableRef.getSelectionData().length < 1) {
        this.$message.warning('请至少选择一条数据进行撤回')
        return false
      }
      HttpModule.revokeDataRecords()
    },
    // 查看详情
    viewRecordDetail() {
      if (this.$refs.tmp.tableRef.getSelectionData().length === 1) {
        this.$message.warning('请选择一条数据进行查看')
        return false
      }
      HttpModule.viewDataRecord()
    }
  }
}
</script>
<style scoped lang="scss">
.Titans-form ::v-deep .vxe-form .boss-tree__input .el-select {
  height: 34px;
}
</style>
