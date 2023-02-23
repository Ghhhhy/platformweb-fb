<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="处理单查看"
    width="80%"
    height="80%"
    resize
    show-footer
  >
    <template #footer>
      <vxe-button size="small" @click="visible = false">返回</vxe-button>
      <vxe-button size="small" @click="$emit('closeAll')">关闭</vxe-button>
      <vxe-button :loading="printLoading" type="primary" size="small" @click="printHandle">打印</vxe-button>
    </template>
    <div class="modal-content" style="height: calc(100% - 4px)">
      <!--规则信息-->
      <RuleInfo :rule-info="currentWarnDetail.ruleResVO">
        <template #header>
          <bs-table-title title="规则信息">
            <div class="f-c-c">
              <span v-if="currentWarnDetail.ruleResVO" style="font-size: 16px; margin-right: 14px;">处理单编号：{{ currentWarnDetail.ruleResVO.warningCode }}</span>
              <vxe-button size="mini" @click="changeReceiptsModalVisible(true)">业务单据查看</vxe-button>
            </div>
          </bs-table-title>
        </template>
      </RuleInfo>
      <!--处理进度-->
      <AuditProgress
        v-if="currentWarnDetail.processResultList && currentWarnDetail.processResultList.length"
        :table-data="currentWarnDetail.processResultList"
      />
      <!--附件信息-->
      <AttachmentInfo
        v-if="!isBlueWarnLevel && currentNode"
        :loading="fileLoading"
        :required="currentNode.uploadFile"
        :file-list="currentNode.attachFiles"
        :billguid="currentNode.warningCode"
      />
    </div>
    <!--业务单据查看弹窗-->
    <PreviewReceipts
      v-if="receiptsModalVisible"
      v-model="receiptsModalVisible"
      :current-node="currentNode"
      v-on="$listeners"
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
import { defineComponent, unref } from '@vue/composition-api'
import RuleInfo from '@/views/main/handlingOfViolations/components/RuleInfo'
import AuditProgress from '@/views/main/handlingOfViolations/components/AuditProgress'
import AttachmentInfo from '@/views/main/handlingOfViolations/components/AttachmentInfo'
import PreviewReceipts from '@/views/main/handlingOfViolations/components/PreviewReceipts'
import PrintHtmlNode from '@/views/main/handlingOfViolations/components/PrintHtmlNode'

import { useModal, useModalInner } from '@/hooks/useModal/index'

import { ModalTypeEnum, RouterPathEnum } from '@/views/main/handlingOfViolations/model/enum.js'

import useWarnInfo from '@/views/main/handlingOfViolations/hooks/useWarnInfo'
import useAttachFiles from '@/views/main/handlingOfViolations/hooks/useAttachFiles'
import useIs from '@/views/main/handlingOfViolations/hooks/useIs'
import usePrint from '@/views/main/handlingOfViolations/hooks/usePrint'

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
    PreviewReceipts,
    PrintHtmlNode
  },
  props: {
    // 弹窗显隐
    [model.prop]: {
      type: Boolean,
      default: false
    },
    // 勾选行
    checkedRecords: {
      type: Array,
      default: () => ([])
    }
  },
  model,
  setup(props, { emit }) {
    /**
     * 弹窗内部状态
     * */
    const { visible } = useModalInner(props, emit, model)

    // 单据弹窗显隐
    const [receiptsModalVisible, changeReceiptsModalVisible] = useModal()

    /**
     * 处理单相关
     * */
    const {
      cloneRecords,
      currentNode,
      checkedItemsKey,
      currentWarnDetail,
      getDetailHandle
    } = useWarnInfo(props)

    /**
     * 附件相关
     * */
    const {
      fileLoading,
      initWarningCodesAttachFiles
    } = useAttachFiles(currentNode, cloneRecords, currentNode, false)

    Promise.all([
      initWarningCodesAttachFiles(),
      getDetailHandle(unref(currentNode).warningCode)
    ])

    /**
     * 判断相关
     * */
    const {
      isBlueWarnLevel
    } = useIs(currentNode)

    /**
     * 打印相关
     * */
    const {
      printLoading,
      printHtmlNodeRef,
      printData,
      printHandle,
      openPrintCallback
    } = usePrint(checkedItemsKey, currentWarnDetail, [])

    return {
      ModalTypeEnum,
      RouterPathEnum,

      visible,
      cloneRecords,
      isBlueWarnLevel,

      printLoading,
      printData,
      printHtmlNodeRef,
      printHandle,
      openPrintCallback,

      fileLoading,

      currentWarnDetail,
      currentNode,
      checkedItemsKey,
      receiptsModalVisible,
      changeReceiptsModalVisible
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
