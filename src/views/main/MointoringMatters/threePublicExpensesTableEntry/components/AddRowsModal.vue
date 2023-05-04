<template>
  <vxe-modal
    v-model="visible"
    :destroy-on-close="true"
    title="新增行"
    :width="400"
    :height="200"
    resize
    show-footer
  >
    <template #footer>
      <vxe-button
        size="small"
        @click="visible = false"
      >
        取消
      </vxe-button>
      <vxe-button
        size="small"
        status="primary"
        @click="submit"
      >
        确认
      </vxe-button>
    </template>
    <div class="modal-content" style="height: calc(100% - 4px)">
      <vxe-form
        ref="formRef"
        :items="formSchemas"
        :data="formData"
        :rules="rules"
      />
    </div>
  </vxe-modal>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import useForm from '@/hooks/useForm'
import { useModalInner } from '@/hooks/useModal'
import { Message } from 'element-ui'

const option = {
  prop: 'value',
  event: 'change'
}
export default defineComponent({
  model: option,
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['addRows'],
  setup(props, { emit }) {
    const {
      visible
    } = useModalInner(props, emit, option)

    const formSchemasOrigin = [
      {
        field: 'count',
        title: '行数',
        required: true,
        itemRender: {
          name: '$input',
          defaultValue: 1,
          props: {
            placeholder: '请输入',
            clearable: true,
            min: 1,
            max: 20,
            type: 'integer'
          }
        }
      }
    ]

    const [
      {
        formData,
        rules,
        formSchemas,
        validate
      }
    ] = useForm(formSchemasOrigin, 'formRef')

    /**
     * 提交
     * @return {Promise<void>}
     */
    async function submit() {
      await validate()
      if (formData.count * 1 < 0) {
        Message.warning('请输入正整数')
        return
      }
      emit('addRows', formData.count)
    }
    return {
      visible,

      formData,
      rules,
      formSchemas,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
