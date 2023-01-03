import { unref } from '@vue/composition-api'
import { checkRscode } from '@/utils/checkRscode'
import useLoadingState from '@/hooks/useLoadingState'
import { getFiles, deleteFile } from '@/api/frame/common/file'
import { FileStatusEnum } from '../model/enum'
import { Message } from 'element-ui'

/**
 * 附件相关hook
 * @param currentNode
 * @param cloneRecords
 * @return {{initWarningCodesAttachFiles: ((function(): Promise<void>)|*), uploadAfter: uploadAfter, deleteFileHandle: deleteFileHandle, fileLoading: *}}
 */
export default function useAttachFiles(currentNode, cloneRecords, checkedItemsObj, isAutoDelete = true) {
  /**
   * 上传到平台附件成功回调
   */
  function uploadAfter(fileInfo) {
    if (!Reflect.has(unref(currentNode), 'attachFiles')) {
      currentNode.value.attachFiles = [fileInfo]
      return
    }
    currentNode.value.attachFiles.unshift(fileInfo)
  }

  /**
   * 删除本地处理单临时文件
   */
  function deleteFileHandle({ file }) {
    const index = currentNode.value.attachFiles.findIndex(item => item.fileguid === file.fileguid)
    currentNode.value.attachFiles.splice(index, 1)
  }

  const [fileLoading, setFileLoading] = useLoadingState()
  /**
   * 根据处理单code从平台获取附件信息列表
   * */
  async function setWarningCodeFilesByPlatform(targetWarningNode, initNeedDeleteFileIds = []) {
    try {
      const { data } = checkRscode(
        await getFiles(targetWarningNode.warningCode)
      )
      const remoteFiles = data ? JSON.parse(data) : []

      if (isAutoDelete) {
        // 时候自动删除多余文件
        const needDeleteFiles = remoteFiles
          .filter(item => !targetWarningNode.attachFiles.includes(item.fileguid))
          .map(item => item.fileguid)
        initNeedDeleteFileIds.push(...needDeleteFiles)
      }

      // 以后端库里的files列表为参考 过滤远程文件 并添加保留状态
      targetWarningNode.attachFiles = targetWarningNode.attachFiles.map(fileguid => {
        const remoteItem = remoteFiles.find(remote => remote.fileguid === fileguid)
        return {
          ...remoteItem,
          status: FileStatusEnum.RETAIN
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * 初始化所有处理单附件列表
   */
  async function initWarningCodesAttachFiles() {
    // 需要删除的多余文件id列表
    const initNeedDeleteFileIds = []
    try {
      setFileLoading(true)
      const promiseList = []
      unref(cloneRecords).forEach(warningNode => {
        if (warningNode.attachFiles?.length) {
          promiseList.push(setWarningCodeFilesByPlatform(warningNode, initNeedDeleteFileIds))
        } else {
          warningNode.attachFiles = []
        }
      })
      if (isAutoDelete && initNeedDeleteFileIds?.length) {
        deleteFile(initNeedDeleteFileIds.join(','))
      }

      await Promise.all(promiseList)
      currentNode.value = unref(cloneRecords)[0]
    } finally {
      setFileLoading(false)
    }
  }

  /**
   * 附件校验
   * @description 是否需要上传附件  且已经上传了附件
   * */
  function isUploadFiles() {
    const list = unref(checkedItemsObj)?.length ? unref(checkedItemsObj) : [unref(currentNode)]
    for (let i = 0; i < list?.length; i++) {
      const record = list[i]
      if (!!Number(record?.uploadFile) && !record.attachFiles?.length) {
        Message.warning(`请上传处理单编号为【${record.warningCode}】的附件后再操作！`)
        // 将选中的处理单改为校验不通过的处理单，方便用户直接上传
        const item = unref(cloneRecords).find(item => item.warningCode === record.warningCode)
        item !== unref(currentNode) && (currentNode.value = item)
        return false
      }
    }
    return true
  }

  return {
    fileLoading,
    uploadAfter,
    deleteFileHandle,
    initWarningCodesAttachFiles,
    isUploadFiles
  }
}
