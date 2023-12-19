<template>
  <div style="margin-top: 16px">
    <bs-table-title title="附件信息" style="margin-bottom: 10px" />
    <div
      v-if="isUnitFeedbackPage && modalType === ModalTypeEnum.AUDIT"
      v-loading="loading || deleteLoading"
      :element-loading-text="deleteLoading ? '附件数据删除中...' : '附件数据加载中...'"
      class="attachment-upload-wrapper"
    >
      <div class="upload-top">
        <span :class="['label', !!Number(required) ? 'required' : ''] ">附件</span>
        <el-button
          size="mini"
          @click="uploadBtnClick"
        >
          <i :class="loadingState ? 'el-icon-loading' : 'el-icon-upload'"></i>
          上传
        </el-button>
        <span class="upload-tip">支持png/jpg/pdf等，不超过10M</span>
      </div>
      <div class="file-list-container">
        <div
          v-for="(file, index) in fileList"
          :key="file.fileguid"
          class="file-item"
        >
          <div>
            <i class="el-icon-document el-icon--left"></i>
            <span>{{ file.filename }}</span>
          </div>
          <i class="el-icon-delete el-icon--right" @click="deleteFileHandle(file, index)"></i>
        </div>
      </div>
    </div>
    <div v-else>
      <BsTable
        ref="table"
        :loading="loading"
        :table-config="tableConfig"
        :table-columns-config="columns"
        :table-data="fileList"
        :toolbar-config="false"
        :pager-config="false"
        :max-height="260"
        size="medium"
      />
      <FilePreview
        v-if="filePreviewDialogVisible"
        :visible.sync="filePreviewDialogVisible"
        :file-guid="fileGuid"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, unref, ref } from '@vue/composition-api'
import { readLocalFile } from '@/utils/readLocalFile'
import useLoadingState from '@/hooks/useLoadingState'
import useTable from '@/hooks/useTable'
import { FileStatusEnum, ModalTypeEnum, RouterPathEnum } from '../model/enum'

import { Message } from 'element-ui'
import { fileColumns } from '../model/data'
// deleteFile
import { uploadFile } from '@/api/frame/common/file'
import { checkRscode } from '@/utils/checkRscode'
import { downloadByFileId } from '@/utils/download'
import FilePreview from './filePreview.vue'
// 附件最大值(1M)
const maxSize = 1024 * 1024 * 10
export default defineComponent({
  components: {
    FilePreview
  },
  props: {
    // 文件列表
    fileList: {
      type: Array,
      default: () => ([])
    },
    // 文件分组的的id
    billguid: {
      type: String,
      default: ''
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 是否必传
    required: {
      type: [String, Number, Boolean],
      default: 0
    }
  },
  setup(props, { emit }) {
    const modalType = inject('modalType')

    // 页面路由(也可root中获取route)
    const pagePath = inject('pagePath')

    // 是否是单位反馈页面
    const isUnitFeedbackPage = computed(() => {
      console.log('RouterPathEnum', RouterPathEnum())
      return unref(pagePath).indexOf('nitFeedback') !== -1
    })

    const [loadingState, setLoadingState] = useLoadingState()
    /**
     * 点击上传
     * @return {Promise<void>}
     */
    async function uploadBtnClick() {
      const { file: localFile } = await readLocalFile()
      const {
        size: filesize,
        name: filename
      } = localFile

      if (localFile.size > maxSize) {
        Message.warning('文件大小超过限制,请重新选择')
        return
      }
      try {
        setLoadingState(true)
        const { data: fileguid } = checkRscode(
          await uploadFile({
            file: localFile,
            filename,
            // 文件分组的id
            billguid: props.billguid
          })
        )
        Message.success('上传成功！')

        // 往违规单中存入文件信息
        emit('uploadAfter', {
          fileguid,
          filename,
          filesize,
          file: localFile,
          // 保留
          status: FileStatusEnum.RETAIN
        })
      } finally {
        setLoadingState(false)
      }
    }

    const [deleteLoading, setDeleteLoading] = useLoadingState()
    /**
     * 删除文件
     * */
    async function deleteFileHandle(file, index) {
      try {
        setDeleteLoading(true)
        // 暂时取消立即从平台删除操作：后续重新打开该处理单后根据后端返回的附件列表，在平台附件里面过滤，并删除后端没有存的文件
        // 避免平台附件删除后，用户取消送审、确认操作 导致数据不一致问题
        // checkRscode(await deleteFile(file.fileguid))
        Message.success('删除成功！')
        emit('deleteFile', {
          file,
          index
        })
      } finally {
        setDeleteLoading(false)
      }
    }

    /**
     * 下载附件
     * */
    function downloadHandle({ row }) {
      downloadByFileId(row.fileguid)
    }
    /**
     * 预览附件
     */
    let fileGuid = ref('')
    let filePreviewDialogVisible = ref(false)
    function previewHandle() {
      let selection = this.$refs.table.getSelectionData()
      if (selection.length === 1) {
        // this.downloadParams.fileguid = selection[0].fileguid
        // this.appId = data.appid
        fileGuid.value = selection[0].fileguid
        filePreviewDialogVisible.value = true
      } else {
        this.$message.error('请选择一条数据！')
      }
    }
    // 操作列
    const columnActions = [
      {
        label: '下载',
        // ri-download-cloud-fill
        class: 'cursor f-c-c',
        handle: downloadHandle
      },
      {
        label: '预览',
        // ri-download-cloud-fill
        class: 'cursor f-c-c',
        handle: previewHandle
      }
    ]
    /**
     * 表格
     * */
    const [
      {
        columns,
        tableConfig
      }
    ] = useTable({
      columnActions,
      columns: fileColumns
    })

    // 全局配置
    tableConfig.globalConfig = {
      checkType: false,
      seq: true,
      cellClickCheck: false
    }
    return {
      uploadBtnClick,
      loadingState,
      modalType,
      ModalTypeEnum,
      isUnitFeedbackPage,

      deleteLoading,
      deleteFileHandle,

      columns,
      tableConfig,

      fileGuid,
      filePreviewDialogVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.upload-top {
  display: flex;
  align-items: flex-start;
}
.upload-tip {
  margin-left: 12px;
  line-height: 28px;
  font-size: 12px;
  color: #999;
  box-sizing: border-box;
}
.label {
  width: 80px;
  text-align: right;
  padding-right: 16px;
  box-sizing: border-box;
}
.required {
  &::before {
    content: "*";
    color: #f56c6c;
    margin-right: 0.2em;
    font-family: Verdana,Arial,Tahoma;
    font-weight: 400;
  }
}
.file {
  padding: 8px;
  margin: 8px 0 8px 50px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
}

.file-list-container {
  padding-left: 80px;
  box-sizing: border-box;

  .file-item {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 10px;
    margin-top: 8px;
    box-sizing: border-box;
    background-color: rgba(#e7f1fe, 0.5);

    .el-icon-document,
    .el-icon-delete {
      line-height: 22px;
    }
    .el-icon-delete {
      padding: 0 16px;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
}
</style>
