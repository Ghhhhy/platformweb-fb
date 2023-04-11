<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="华青数据导入"
    width="500"
    height="350"
    show-footer
  >
    <template #footer>
      <el-button size="small" @click="visiable = false">取消</el-button>
      <el-button :loading="submitLoading" size="small" type="primary" @click="confirm">保存</el-button>
    </template>
    <div class="modal-content" style="height: calc(100% - 8px)">
      <vxe-form
        ref="formRef"
        :items="formSchemas"
        :data="formData"
        :rules="rules"
        title-align="right"
        :title-width="70"
      >
        <vxe-form-item
          v-for="item in formSchemas"
          :key="item.field"
          v-bind="item"
        >
          <template v-if="item.field === 'file'" v-slot>
            <div style="display: flex; align-items: center">
              <p v-if="formData.file">{{ formData.file.name }}</p>
              <vxe-button
                type="primary"
                size="mini"
                style="margin-left: 8px;
                flex-shrink: 0"
                @click="choiceFile"
              >
                {{ formData.file ? '重新选择' : '选择文件' }}
              </vxe-button>
            </div>
          </template>
        </vxe-form-item>
      </vxe-form>
    </div>
  </vxe-modal>
</template>

<script>
import { computed, defineComponent, toRaw } from '@vue/composition-api'
import { readLocalFile } from '@/utils/readLocalFile'
import useForm from '@/hooks/useForm'
import useLoadingState from '@/hooks/useLoadingState'
import api from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'

import { checkRscode } from '@/utils/checkRscode'
import { Message } from 'element-ui'

const schemas = [
  {
    field: 'fileDate',
    title: '期间',
    span: 24,
    titleAlign: 'right',
    required: true,
    itemRender: {
      name: '$input',
      props: {
        placeholder: '请选择',
        type: 'month',
        valueFormat: 'yyyy-MM'
      }
    }
  },
  {
    field: 'file',
    title: '文件',
    span: 24,
    titleAlign: 'right',
    required: true,
    slots: {
      default: 'file-slot'
    }
  }
]

export default defineComponent({
  props: {
    visibleState: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'visibleState',
    event: 'changeVisible'
  },
  emits: ['success'],
  setup(props, { emit }) {
    // 弹窗显隐
    const visible = computed({
      get() {
        return props.visibleState
      },
      set(val) {
        emit('changeVisible', val)
      }
    })

    const [
      {
        formRef,
        formSchemas,
        formData,
        rules,
        validate
      }
    ] = useForm(schemas, 'formRef')

    const [submitLoading, setLoadingState] = useLoadingState()
    /**
     * 新增、编辑模板
     * @return {Promise<void>}
     */
    async function confirm() {
      const params = {
        ...toRaw(formData)
      }

      try {
        setLoadingState(true)
        await validate?.()
        const { data } = checkRscode(await api.importHuaqing(params))
        visible.value = false
        emit('success')
        Message.success(data || '导入成功！')
      } finally {
        setLoadingState(false)
      }
    }

    /**
     * 选择文件
     */
    async function choiceFile() {
      const { file } = await readLocalFile({
        types: ['xlsx', 'xls']
      })
      formData.file = file
    }

    return {
      visible,

      formRef,
      formSchemas,
      formData,
      rules,
      validate,

      choiceFile,

      confirm,
      submitLoading
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
