<template>
  <div>
    <slot name="header"></slot>
    <div v-if="ruleInfo" class="rule-info-content">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info-item">
            <span class="label">预警级别</span>
            <span class="content content-warning-level" style="display: flex; align-items: center">
              <i :class="['warning-icon',...warnLevelOption.iconClass]" :style="{ ...warnLevelOption.iconStyle }"></i>
              {{ warnLevelOption.label }}
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <span class="label">预警日期</span>
            <span class="content">
              {{ ruleInfo.createTime }}
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <span class="label">预警名称</span>
            <span class="content">
              {{ ruleInfo.ruleName }}
            </span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="info-item">
            <span class="label">预算单位</span>
            <span class="content">
              {{ ruleInfo.agencyName }}
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <span class="label">预警类别</span>
            <span class="content">
              {{ warnTypeOption.label }}
            </span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="info-item">
            <span class="label">金额</span>
            <span class="content">
              {{ formatterThousands(ruleInfo.amount) }}
            </span>
          </div>
        </el-col>
      </el-row>
      <el-row v-if="isDivision" :gutter="20">
        <el-col :span="24">
          <div class="info-item info-item-single-row">
            <span class="label">规则详情</span>
            <span class="content">
              {{ ruleInfo.fiRuleDesc }}
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, inject, unref } from '@vue/composition-api'
import { formatterThousands } from '@/utils/thousands'
import { warnLevelOptions, warnTypeOptions } from '../model/data'
import { RouterPathEnum } from '../model/enum'

export default defineComponent({
  props: {
    ruleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // 预警级别
    const warnLevelOption = computed(() => {
      return warnLevelOptions.find(item => String(item.value) === String(props.ruleInfo?.warnLevel)) || {}
    })

    // 预警类别
    const warnTypeOption = computed(() => {
      return warnTypeOptions.find(item => String(item.value) === String(props.ruleInfo?.warnType)) || {}
    })

    const pagePath = inject('pagePath')

    // 是否处室
    const isDivision = computed(() => {
      return [RouterPathEnum.DIVISION_AUDIT, RouterPathEnum.divisionReAudit].includes(unref(pagePath))
    })
    return {
      formatterThousands,
      warnTypeOption,
      warnLevelOption,
      isDivision
    }
  }
})
</script>

<style lang="scss" scoped>
.rule-info-content {
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 8px 16px 0;
  margin-top: 10px;

  .info-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    border-radius: 4px;
    font-size: 14px;
    color: #666;

    .label {
      padding: 0 10px;
      box-sizing: border-box;
    }

    .content {
      padding: 6px 10px;
      margin-top: 4px;
      min-height: 33px;
      color: #333;
      background-color: #f0f0f0;
      box-sizing: border-box;
    }

    .content-warning-level {
      position: relative;
      padding-left: 34px;
    }

    .warning-icon {
      position: absolute;
      left: 10px;
      font-size: 18px;
      margin-right: 8px;
    }
  }
}
</style>
