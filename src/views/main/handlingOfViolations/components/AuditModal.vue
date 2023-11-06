<template>
  <div>
    <vxe-modal
      v-model="visible"
      :destroy-on-close="true"
      :title="modalTitle"
      width="80%"
      height="80%"
      resize
      show-footer
    >
      <template #footer>
        <!--查看-->
        <div v-if="modalType === ModalTypeEnum.PREVIEW">
          <vxe-button size="small" @click="visible = false">取消</vxe-button>
          <vxe-button :loading="printLoading" type="primary" size="small" @click="printHandle">打印</vxe-button>
        </div>
        <!--处理-->
        <div v-if="modalType === ModalTypeEnum.AUDIT">
          <vxe-button
            size="small"
            @click="visible = false"
          >
            取消
          </vxe-button>
          <vxe-button
            v-if="!isUnitFeedbackPage"
            :disabled="auditButLoading"
            size="small"
            @click="submitFetch(ActionTypeEnum.ACTION_RETURN)"
          >
            退回
          </vxe-button>
          <vxe-button
            v-if="isAllowDisabled"
            :disabled="auditButLoading"
            size="small"
            @click="submitFetch(ActionTypeEnum.ACTION_DISABLED, 1)"
          >
            禁止
          </vxe-button>
          <vxe-button
            :disabled="auditButLoading"
            type="primary"
            size="small"
            @click="submitFetch(ActionTypeEnum.ACTION_AUDIT)"
          >
            <!-- 需求变动 蓝色警告也是 送审按钮 2023 06 14-->
            {{ btnTitle }}
          </vxe-button>
        </div>
      </template>
      <div class="modal-content" :style="{ height: `calc(100% - ${modalType === ModalTypeEnum.AUDIT ? 6 : 20}px)` }">
        <BsSplitPane
          :default-percent="20"
          split="vertical"
          :style="{
            height: `calc(100% - ${modalType !== ModalTypeEnum.PREVIEW ? 110 : 0}px)`,
          }"
        >
          <!--左侧处理单信息-->
          <template #paneL>
            <div class="left-items">
              <el-checkbox
                v-model="checkedAll"
                :indeterminate="isIndeterminate"
                class="dfr-custom-check-all"
                @change="handleCheckAllChange"
              >
                全部监控处理单（{{ cloneRecords.length }}）
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
          <!--右侧当前选中的处理单信息-->
          <template #paneR>
            <div class="right-info" style="height: 100%; overflow-y: auto">
              <!--规则信息-->
              <RuleInfo :rule-info="currentWarnDetail.ruleResVO">
                <template #header>
                  <bs-table-title title="违规单信息">
                    <div>
                      <!--2023-04-21提出暂时隐藏-->
                      <!--<vxe-button-->
                      <!--  v-if="isDivisionPage"-->
                      <!--  size="mini"-->
                      <!--  @click="changeDialogVisible(true)"-->
                      <!--&gt;-->
                      <!--  规则查看-->
                      <!--</vxe-button>-->
                      <vxe-button
                        size="mini"
                        @click="changeReceiptsModalVisible(true)"
                      >
                        业务单据查看
                      </vxe-button>
                    </div>
                  </bs-table-title>
                </template>
              </RuleInfo>
              <!--处理进度-->
              <AuditProgress
                v-if="currentWarnDetail.processResultList"
                :table-data="currentWarnDetail.processResultList"
              />
              <!--附件信息-->
              <AttachmentInfo
                v-if="true"
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
        <!--处理表单：非处理单查看 | 非蓝色预警 => 显示--> <!-- 需求变动 都需要显示input框 2023 06 14-->
        <AuditForm
          v-if="modalType !== ModalTypeEnum.PREVIEW "
          ref="auditFormRef"
        />
      </div>
      <!--业务单据查看弹窗-->
      <PreviewReceipts
        v-if="receiptsModalVisible"
        v-model="receiptsModalVisible"
        :current-node="currentNode"
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
    <!--规则查看-->
    <RulePreview
      v-if="dialogVisible"
      :title="dialogTitle"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref, unref } from '@vue/composition-api'
import RuleInfo from './RuleInfo'
import AuditProgress from './AuditProgress'
import AttachmentInfo from './AttachmentInfo'
import AuditForm from './AuditForm'
import PreviewReceipts from './PreviewReceipts'
import PrintHtmlNode from './PrintHtmlNode'
import RulePreview from '@/views/main/MointoringMatters/SystemLevelRules/children/addDialog.vue'

import useLoadingState from '@/hooks/useLoadingState'
import useAttachFiles from '../hooks/useAttachFiles'
import useIs from '../hooks/useIs'
import useInjectState from '../hooks/useInjectState'
import usePrint from '../hooks/usePrint'
import useWarnInfo from '../hooks/useWarnInfo'
import useRulePreviewModal from '../hooks/useRulePreviewModal'
import { useModal, useModalInner } from '@/hooks/useModal/index'
import store from '@/store'

import { Message, MessageBox } from 'element-ui'
import { ModalTypeEnum, RouterPathEnum, ActionTypeEnum } from '../model/enum'
import { checkRscode } from '@/utils/checkRscode'
import { bpmFlow } from '@/api/frame/main/handlingOfViolations/index.js'
import { pagePathMapNodeType, warnLevelOptions } from '../model/data'

// 自定义双向绑定
const model = {
  prop: 'value',
  event: 'changeValue'
}
export default defineComponent({
  components: {
    RuleInfo,
    AuditProgress,
    AttachmentInfo,
    AuditForm,
    PreviewReceipts,
    PrintHtmlNode,
    RulePreview
  },
  props: {
    // 弹窗显隐
    value: {
      type: Boolean,
      default: false
    },
    // 勾选行
    checkedRecords: {
      type: Array,
      default: () => ([])
    },
    menuName: {
      type: String,
      default: ''
    }
  },
  model,
  setup(props, { emit }) {
    const { menuName } = props
    const isNeedRefreshIndexList = ref(false)
    /**
     * 弹窗内部状态
     * */
    const { visible } = useModalInner(props, emit, {
      ...model,
      setCallback: val => {
        // 关闭弹窗 && 需要刷新父组件列表
        if (!val && unref(isNeedRefreshIndexList)) emit('success')
      }
    })

    /**
     * 处理单相关
     * */
    const {
      cloneRecords,
      currentNode,
      checkedItemsKey,
      checkedItemsObj,
      checkedAll,
      isIndeterminate,
      handleCheckAllChange,
      handleCheckedItemsKeyChange,
      nodeClick,
      currentWarnDetail,
      getDetailHandle
    } = useWarnInfo(props)

    /**
     * 依赖注入相关
     * */
    const {
      modalType,
      pagePath
    } = useInjectState()

    // 单据弹窗显隐
    const [receiptsModalVisible, changeReceiptsModalVisible] = useModal()

    /**
     * 规则详情弹窗模块
     * */
    const {
      dialogTitle,
      dialogVisible,
      changeDialogVisible,
      DetailData
    } = useRulePreviewModal(currentNode)

    /**
     * 判断相关
     * */
    const {
      isAllowDisabled,
      isUnitFeedbackPage,
      isBlueWarnLevel,
      isDivisionPage
    } = useIs(currentNode, pagePath, checkedItemsObj)

    // // 是否显示表单
    // const isShowFormComponent = computed(() => {
    //   if (unref(checkedItemsObj).length) {
    //     return unref(checkedItemsObj)
    //   }
    // })

    // 弹窗title
    const modalTitle = computed(() => {
      return unref(modalType) === ModalTypeEnum.AUDIT ? '监控处理' : '处理单查看'
    })

    // 确认、送审按钮文案
    const btnTitle = computed(() => {
      // 非单位反馈 && 非蓝色预警  || unref(isBlueWarnLevel)
      return unref(pagePath) !== RouterPathEnum().UNIT_FEEDBACK
        ? '确认'
        : '送审'
    })

    // 获取预警级别
    const getWarnLevelOption = (warnLevel) => {
      return warnLevelOptions.find(item => String(item.value) === String(warnLevel)) || {}
    }

    /**
     * 附件相关
     * */
    const {
      fileLoading,
      uploadAfter,
      deleteFileHandle,
      initWarningCodesAttachFiles,
      isUploadFiles
    } = useAttachFiles(currentNode, cloneRecords, checkedItemsObj)

    Promise.all([
      initWarningCodesAttachFiles(),
      getDetailHandle({
        warningCode: unref(currentNode).warningCode,
        id: unref(currentNode).id
      })
    ])

    /**
     * 打印相关
     * */
    const {
      printLoading,
      printHtmlNodeRef,
      printData,
      printHandle,
      openPrintCallback
    } = usePrint(checkedItemsKey, currentWarnDetail, cloneRecords)

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
     * 关闭弹窗 刷新父组件
     * */
    function closeModal() {
      isNeedRefreshIndexList.value = true
      visible.value = false
    }

    /**
     * 共用提交
     * @param actionType {string} 操作类型：送审、确认、退回、禁止
     * */
    async function submitFetch(actionType, forbidStatus) {
      try {
        setAuditButLoading(true)
        submitBeforeValidate()

        const auditFormData = auditFormRef.value?.formData
        const warningCodeAndFilesList = unref(checkedItemsObj)?.length ? unref(checkedItemsObj) : [unref(currentNode)]

        // 蓝色预警不校验表单
        if (warningCodeAndFilesList?.[0].warnLevel !== unref(isBlueWarnLevel)) {
          await auditFormRef.value?.validate?.()
        }

        const menuId = store.state.curNavModule?.guid || ''
        const params = {
          ...auditFormData,
          actionType,
          nodeType: pagePathMapNodeType[unref(pagePath)],
          warningCodeAndFilesList: warningCodeAndFilesList.map(item => {
            const { warningCode, warnLevel, attachFiles, id } = item
            return {
              warningCode,
              warnLevel,
              id,
              attachFiles: attachFiles.map(item => item.fileguid)
            }
          }),
          menuName: menuName,
          statusCode: warningCodeAndFilesList[0]?.statusCode,
          menuId
        }
        // 禁止额外参数标识
        if (forbidStatus) {
          params.forbidStatus = forbidStatus
          if (store.getters.isFuJian) {
            params.isStop = '1'
            params.actionType = '2'
          } else {
            params.isStop = '0'
          }
        }
        // 走请求逻辑
        checkRscode(await bpmFlow(params))
        Message.success('操作成功！')
        // closeModal()
        // 全部处理单都已处理 -> 直接关闭弹窗
        if (warningCodeAndFilesList.length === unref(cloneRecords)?.length) {
          closeModal()
          return
        }
        MessageBox.confirm('存在未处理的处理单，是否继续处理?', '操作成功', {
          confirmButtonText: '继续',
          cancelButtonText: '关闭',
          type: 'success'
        })
          .then(() => {
            warningCodeAndFilesList.forEach(item => {
              const index = cloneRecords.value.findIndex(record => item.warningCode === record.warningCode)
              index > -1 && cloneRecords.value.splice(index, 1)
            })
            if (!cloneRecords.value.find(item => item.warningCode === unref(currentNode).warningCode)) {
              currentNode.value = cloneRecords.value[0]
            }
            // 勾选置空
            checkedItemsKey.value = []
            // 处理意见置空
            auditFormRef.value?.reset()
            // 需要在后续关闭弹窗后执行刷新主列表操作
            isNeedRefreshIndexList.value = true
          })
          .catch(() => {
            closeModal()
          })
      } finally {
        setAuditButLoading(false)
      }
    }

    /**
     * 是否有不同预警级别
     */
    function hasDifferentWarnLevel() {
      const warnLevelList = (unref(checkedItemsObj)?.length ? unref(checkedItemsObj) : [unref(currentNode)])
        .map(item => item.warnLevel)

      const levelSet = new Set(warnLevelList)
      return levelSet.size > 1
    }

    return {
      ModalTypeEnum,
      RouterPathEnum,
      ActionTypeEnum,

      visible,
      modalTitle,
      modalType,
      pagePath,
      auditFormRef,

      cloneRecords,
      getWarnLevelOption,

      isAllowDisabled,
      isUnitFeedbackPage,
      isDivisionPage,

      printLoading,
      printData,
      printHtmlNodeRef,
      printHandle,
      openPrintCallback,

      auditButLoading,
      submitFetch,

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
      receiptsModalVisible,
      changeReceiptsModalVisible,

      changeDialogVisible,
      dialogVisible,
      DetailData,
      dialogTitle
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
  font-weight: bold;
  font-size: 18px;
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
