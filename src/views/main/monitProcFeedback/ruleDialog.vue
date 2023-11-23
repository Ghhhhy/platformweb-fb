<template>
  <vxe-modal
    v-model="dialogVisibleShow"
    :title="title"
    width="80%"
    height="50%"
    :show-footer="false"
    @close="dialogClose"
  >
    <BsTable
      :footer-config="tableFooterConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      height="200px"
      :table-config="tableConfig"
      :pager-config="false"
      :toolbar-config="false"
    />
    <FilePreview
      v-if="filePreviewDialogVisible"
      :visible.sync="filePreviewDialogVisible"
      :file-guid="fileGuid"
    />
  </vxe-modal>
</template>
<script>
import { getDetail } from '@/api/frame/main/Monitoring/Policies.js'
import { getFiles } from '@/api/frame/common/file.js'
import FilePreview from '@/views/main/MointoringMatters/common/filePreview.vue'
export default {
  name: 'RuleDialog',
  components: { FilePreview },
  props: {
    code: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      filePreviewDialogVisible: false,
      fileGuid: '',
      tableData: [],
      title: '政策法规',
      dialogVisibleShow: true,
      tableConfig: {
        renderers: {
          // 编辑 附件 操作日志
          $gloableOptionRow: {
            renderDefault(h, cellRender, params, context) {
              let self = context.$grid.$parent
              console.log(self.fileGuid)
              let { row, column } = params
              return [
                <el-tooltip content="附件" placement="top" effect="light">
                  <a
                    class="gloable-option-row-attachment gloable-option-row  fn-inline"
                    onClick={() =>
                      self.onOptionRowClick({
                        row,
                        column,
                        optionType: 'attachment'
                      })
                    }
                  >
                    附件
                  </a>
                  ,
                </el-tooltip>
              ]
            }
          }
        },
        methods: {
          onOptionRowClick: this.onOptionRowClick
        }
      },
      tableColumnsConfig: [
        {
          title: '政策法规名称',
          field: 'regulationsName',
          sortable: false,
          align: 'center'
        },
        {
          title: '政策法规描述',
          field: 'description',
          sortable: false,
          align: 'center'
        },
        {
          title: '操作',
          field: 'gloableOptionRow',
          className: 'gloableOptionRow',
          align: 'center',
          fixed: 'right',
          sortable: false,
          filters: false,
          width: 100,
          cellRender: {
            name: '$gloableOptionRow'
          }
        }
      ],
      tableFooterConfig: {
        showFooter: false
      }
    }
  },
  mounted() {
    let self = this
    getDetail({
      regulationsCode: this.code
    }).then((res) => {
      this.tableData = [res.data]
    })
    this.getFile().then((res) => {
      self.fileGuid = JSON.parse(res.data)[0].fileguid
    })
  },
  methods: {
    preview(fileguid) {
      if (!this.fileGuid) return
      this.filePreviewDialogVisible = true
    },
    getFile() {
      return getFiles(this.code) // 879858831008317440
    },
    dialogClose() {
      this.dialogVisibleShow = false
      this.$parent.ruleDialogShow = false
    },
    onOptionRowClick({ row, optionType }, context) {
      switch (optionType) {
        case 'attachment':
          this.preview()
          break
        default:
      }
    }
  }
}
</script>
