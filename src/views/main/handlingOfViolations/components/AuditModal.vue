<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    :title="modalTitle"
    width="80%"
    height="80%"
    show-footer
  >
    <template #footer>
      <!--查看-->
      <div v-if="modalType === ModalTypeEnum.PREVIEW">
        <el-button size="small" @click="visible = false">取消</el-button>
        <el-button :loading="printLoading" type="primary" size="small" @click="printHandle">打印</el-button>
      </div>
      <!--审核 | 确认-->
      <div v-if="modalType === ModalTypeEnum.AUDIT">
        <vxe-button size="small" @click="visible = false">取消</vxe-button>
        <vxe-button v-if="!isUnitFeedbackPage" :disabled="auditButLoading" size="small" @click="returnHandle">
          退回
        </vxe-button>
        <vxe-button v-if="isDivisionReAudit" :disabled="auditButLoading" size="small" @click="disableHandle">
          禁止
        </vxe-button>
        <vxe-button :disabled="auditButLoading" type="primary" size="small" @click="auditHandle">
          {{ btnTitle }}
        </vxe-button>
      </div>
    </template>
    <div class="modal-content" style="height: calc(100% - 4px)">
      <BsSplitPane
        :default-percent="20"
        split="vertical"
        :style="{
          height: `calc(100% - ${modalType !== ModalTypeEnum.PREVIEW && !isBlueWarnLevel ? 110 : 0}px)`,
        }"
      >
        <template #paneL>
          <div class="left-items">
            <el-checkbox
              v-model="checkedAll"
              :indeterminate="isIndeterminate"
              class="dfr-custom-check-all"
              @change="handleCheckAllChange"
            >
              全部处理单编号（{{ cloneRecords.length }}）
            </el-checkbox>
            <div class="items-detail">
              <el-checkbox-group
                v-model="checkedItemsKey"
                @change="handleCheckedItemsKeyChange"
              >
                <div
                  v-for="item in cloneRecords"
                  :key="item.warningCode"
                  :class="['dfr-custom-checkbox', (currentNode && item.warningCode === currentNode.warningCode) && 'is-active']"
                  data-valid="true"
                  @click="nodeClick(item, $event)"
                >
                  <el-checkbox
                    :label="item.warningCode"
                  />
                  <span
                    data-valid="true"
                    class="dfr-custom-checkbox-label"
                  >
                    <i :class="['warning-icon',...getWarnLevelOption(item.warnLevel).iconClass]" :style="{ ...getWarnLevelOption(item.warnLevel).iconStyle }"></i>
                    {{ item.warningCode }}
                  </span>
                </div>
              </el-checkbox-group>
            </div>
          </div>
        </template>
        <template #paneR>
          <div class="right-info" style="height: 100%; overflow-y: auto">
            <!--规则信息-->
            <RuleInfo :rule-info="currentWarnDetail.ruleResVO">
              <template #header>
                <bs-table-title title="规则信息">
                  <vxe-button size="mini" @click="receiptsModalVisible = true">业务单据查看</vxe-button>
                </bs-table-title>
              </template>
            </RuleInfo>
            <!--处理进度-->
            <AuditProgress
              :table-data="currentWarnDetail.processResultList"
            />
            <!--附件信息-->
            <AttachmentInfo
              v-if="!isBlueWarnLevel"
              :loading="fileLoading"
              :required="currentNode.uploadFile"
              :file-list="currentNode.attachFiles"
              :billguid="currentNode.warningCode"
              @uploadAfter="uploadAfter"
              @deleteFile="deleteFileHandle"
            />
          </div>
        </template>
      </BsSplitPane>
      <!--处理表单：非处理单查看 | 非蓝色预警 => 显示-->
      <AuditForm
        v-if="modalType !== ModalTypeEnum.PREVIEW && !isBlueWarnLevel"
        ref="auditFormRef"
      />
    </div>
    <!--业务单据查看弹窗-->
    <PreviewReceipts
      v-if="receiptsModalVisible"
      v-model="receiptsModalVisible"
    />
    <!--打印组件-->
    <div class="dfr-print-page-wrapper">
      <PrintHtmlNode
        ref="printHtmlNodeRef"
        :list="printData"
        @open="openPrintCallback"
      />
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent, computed, ref, inject, unref, provide } from '@vue/composition-api'
import RuleInfo from './RuleInfo'
import AuditProgress from './AuditProgress'
import AttachmentInfo from './AttachmentInfo'
import AuditForm from './AuditForm'
import PreviewReceipts from './PreviewReceipts'
import PrintHtmlNode from './PrintHtmlNode'

import useLoadingState from '@/hooks/useLoadingState'

import { Message } from 'element-ui'
import { ModalTypeEnum, RouterPathEnum, WarnLevelEnum, TabEnum, FileStatusEnum } from '../model/enum'
import { getFiles, deleteFile } from '@/api/frame/common/file'
import { checkRscode } from '@/utils/checkRscode'
import { getDetail, bpmFlow, getMulitDetail } from '@/api/frame/main/handlingOfViolations/index.js'
import { pagePathMapNodeType, warnLevelOptions } from '../model/data'
import { clone } from 'xe-utils'

export default defineComponent({
  components: {
    RuleInfo,
    AuditProgress,
    AttachmentInfo,
    AuditForm,
    PreviewReceipts,
    PrintHtmlNode
  },
  props: {
    // 显隐
    value: {
      type: Boolean,
      default: false
    },
    // 勾选行
    checkedRecords: {
      type: Array,
      default: () => ([])
    }
  },
  model: {
    prop: 'value',
    event: 'changeVisible'
  },
  setup(props, { emit }) {
    // 显隐内部状态
    const visible = computed({
      get() {
        return props.value
      },
      set(val) {
        emit('changeVisible', val)
      }
    })

    // 深拷贝一份数据方便自身组件改变数据
    const cloneRecords = ref(clone(props.checkedRecords, true))

    // 弹窗操作类型(查看 | 审核)
    const modalType = inject('modalType')

    // 页面路由(也可root中获取route)
    const pagePath = inject('pagePath')

    // 弹窗title
    const modalTitle = computed(() => {
      return unref(modalType) === ModalTypeEnum.AUDIT ? '监控处理' : '处理单查看'
    })

    // 单据弹窗显隐
    const receiptsModalVisible = ref(false)

    // 是否是处室复审页面（终审）
    const isDivisionReAudit = computed(() => {
      return unref(pagePath) === RouterPathEnum.DIVISION_REAUDIT
    })

    // 是否是单位反馈页面
    const isUnitFeedbackPage = computed(() => {
      return unref(pagePath) === RouterPathEnum.UNIT_FEEDBACK
    })

    // 当前左侧选择的单据列表
    const checkedItemsKey = ref([])
    // 当前左侧勾选的单据key列表所所对应的单据对象列表
    const checkedItemsObj = computed(() => {
      return checkedItemsKey.value.map(warningCode => {
        return cloneRecords.value.find(item => item.warningCode === warningCode)
      })
    })

    // // 是否显示表单
    // const isShowFormComponent = computed(() => {
    //   if (unref(checkedItemsObj).length) {
    //     return unref(checkedItemsObj)
    //   }
    // })

    // 全选checkbox选中状态
    const checkedAll = ref(false)
    // 全选按钮-样式控制
    const isIndeterminate = ref(false)
    // 当前选中节点
    const currentNode = ref({ ...unref(cloneRecords)[0] })
    provide('currentNode', currentNode)

    // 当前接口请求的预警单信息
    const currentWarnDetail = ref({
      processResultList: [],
      ruleResVO: {}
    })

    // 获取预警级别
    const getWarnLevelOption = (warnLevel) => {
      return warnLevelOptions.find(item => String(item.value) === String(warnLevel)) || {}
    }

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
    async function setWarningCodeFilesByPlatform(targetWarningNode) {
      try {
        const { data } = checkRscode(
          await getFiles(targetWarningNode.warningCode)
        )
        const remoteFiles = data ? JSON.parse(data) : []

        // 删除多余文件
        const needDeleteFiles = remoteFiles
          .filter(item => !targetWarningNode.attachFiles.includes(item.fileguid))
          .map(item => item.fileguid)
        needDeleteFiles?.length && deleteFile(needDeleteFiles.join(','))

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
      try {
        setFileLoading(true)
        const promiseList = []
        unref(cloneRecords).forEach(warningNode => {
          if (warningNode.attachFiles?.length) {
            promiseList.push(setWarningCodeFilesByPlatform(warningNode))
          } else {
            warningNode.attachFiles = []
          }
        })
        await Promise.all(promiseList)
        currentNode.value = unref(cloneRecords)[0]
      } finally {
        setFileLoading(false)
      }
    }

    /**
     * 查询处理单详情
     * */
    async function getDetailHandle(warningCode) {
      const { data } = checkRscode(await getDetail(warningCode))
      currentWarnDetail.value = data
    }
    Promise.all([
      initWarningCodesAttachFiles(),
      getDetailHandle(unref(currentNode).warningCode)
    ])

    // 是否蓝色预警
    const isBlueWarnLevel = computed(() => {
      return unref(currentNode)?.warnLevel === WarnLevelEnum.BLUE
    })

    // 确认、送审按钮文案
    const btnTitle = computed(() => {
      // 非单位反馈 && 非蓝色预警
      return unref(pagePath) !== RouterPathEnum.UNIT_FEEDBACK || unref(isBlueWarnLevel)
        ? '确认'
        : '送审'
    })

    /**
     * 单据全选/反选
     * */
    function handleCheckAllChange(val) {
      checkedItemsKey.value = val ? unref(cloneRecords).map(item => item.warningCode) : []
      isIndeterminate.value = false
    }

    /**
     * 选择单个item
     * */
    function handleCheckedItemsKeyChange(checkList) {
      const checkedCount = checkList.length
      checkedAll.value = checkedCount === unref(cloneRecords)?.length
      isIndeterminate.value = checkedCount > 0 && checkedCount < unref(cloneRecords)?.length
    }

    /**
     * 指标数节点点击
     */
    function nodeClick(item, event) {
      if (event.target?.dataset?.valid) {
        currentNode.value = item
        getDetailHandle(item.warningCode)
      }
    }

    // 需要打印的数据
    const printData = ref([])
    // 打印组件ref
    const printHtmlNodeRef = ref(null)
    const [printLoading, setPrintLoading] = useLoadingState()
    /**
     * 打印
     */
    async function printHandle() {
      setPrintLoading(true)
      try {
        if (!unref(checkedItemsKey).length) {
          printData.value = [unref(currentWarnDetail)]
        } else {
          const { data } = checkRscode(await getMulitDetail(unref(checkedItemsKey)))
          printData.value = data
        }
        setTimeout(() => {
          printHtmlNodeRef.value?.printTrigger?.()
        }, unref(printData)?.length * 300)
      } catch (e) {
        setPrintLoading(false)
      }
    }
    /**
     * 打印调用open回调
     * */
    function openPrintCallback() {
      setPrintLoading(false)
    }

    // 处理意见、说明组件ref实例
    const auditFormRef = ref(null)
    const [ auditButLoading, setAuditButLoading ] = useLoadingState()

    /**
     * 提交前校验
     */
    function submitBeforeValidate() {
      // 预警级别一致性校验
      if (hasDifferentWarnLevel()) {
        const msg = '预警级别不一致，不可批量操作'
        Message.warning(msg)
        throw new Error(msg)
      }

      // 附件校验：只有单位反馈 && 后端该处理单需要传附件
      if (unref(isUnitFeedbackPage) && !isUploadFiles()) {
        throw new Error('附件必传')
      }
    }

    /**
     * 共用提交
     * @param actionType {string} 操作类型：送审、确认、退回、禁止
     * */
    async function submitFetch(nodeStatus) {
      try {
        setAuditButLoading(true)
        submitBeforeValidate()

        const auditFormData = auditFormRef.value?.formData
        const warningCodeAndFilesList = unref(checkedItemsObj)?.length ? unref(checkedItemsObj) : [unref(currentNode)]

        // 蓝色预警不校验表单
        if (warningCodeAndFilesList?.[0].warnLevel !== unref(isBlueWarnLevel)) {
          await auditFormRef.value?.validate?.()
        }

        const params = {
          ...auditFormData,
          nodeStatus,
          nodeType: pagePathMapNodeType[unref(pagePath)],
          warningCodeAndFilesList: warningCodeAndFilesList.map(item => {
            return {
              warningCode: item.warningCode,
              warnLevel: item.warnLevel,
              attachFiles: item.attachFiles.map(item => item.fileguid)
            }
          })
        }
        // 走请求逻辑
        checkRscode(await bpmFlow(params))
        visible.value = false
        Message.success('操作成功！')
        emit('success')
      } finally {
        setAuditButLoading(false)
      }
    }

    /**
     * 送审 | 确认
     */
    async function auditHandle() {
      await submitFetch(TabEnum.SENDED)
    }

    /**
     * 退回
     * */
    async function returnHandle() {
      await submitFetch(TabEnum.RETURN)
    }

    /**
     * 禁止
     * */
    async function disableHandle() {
      await submitFetch(TabEnum.DISABLED)
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

    /**
     * 是否有不同预警级别
     */
    function hasDifferentWarnLevel() {
      const levelSet = new Set()
      unref(checkedItemsKey).forEach(warningCode => {
        const warnLevel = unref(cloneRecords).find(item => item.warningCode === warningCode)?.warnLevel
        warnLevel && levelSet.add(warnLevel)
      })
      // 暂时取消蓝色预警和其他预警级别不能批量操作 => 改为：不能含两种预警级别
      // return levelSet.has(WarningLevelEnum.BLUE) && levelSet.size > 1
      return levelSet.size > 1
    }

    return {
      visible,
      modalTitle,
      modalType,
      ModalTypeEnum,
      pagePath,
      RouterPathEnum,
      auditFormRef,

      cloneRecords,
      getWarnLevelOption,

      isDivisionReAudit,
      isUnitFeedbackPage,

      printLoading,
      printData,
      printHtmlNodeRef,
      printHandle,
      openPrintCallback,

      auditHandle,
      auditButLoading,
      returnHandle,
      disableHandle,

      fileLoading,
      uploadAfter,
      deleteFileHandle,

      btnTitle,
      isBlueWarnLevel,

      currentWarnDetail,

      nodeClick,
      currentNode,
      checkedItemsKey,
      isIndeterminate,
      checkedAll,
      handleCheckAllChange,
      handleCheckedItemsKeyChange,
      receiptsModalVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.left-items {
  height: 100%;
  padding: 4px 8px;
  box-sizing: border-box;
  background-color: #fff;

  .items-detail {
    height: calc(100% - 20px);
    box-sizing: border-box;
    overflow: auto;
  }
}

.right-info {
  padding: 0 8px 16px;
  box-sizing: border-box;
}

.dfr-custom-check-all {
  padding: 0 0 2px 4px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.dfr-custom-checkbox {
  display: flex;
  align-items: flex-start;
  padding: 2px 4px;
  cursor: pointer;
  &.is-active {
    background-color: var(--hightlight-color);
  }
  /deep/.el-checkbox__label {
    display: none;
  }
  /deep/.dfr-custom-checkbox-label {
    margin-left: 10px;
    font-size: 16px;
    white-space: nowrap;
  }
}
.dfr-print-page-wrapper {
  position: fixed;
  top: 0;
  // 将dom移出到可视范围外
  left: -100%;
  //left: 0;
  width: 100%;
  height: auto;
  z-index: 10;
  background-color: #fff;
}
</style>
