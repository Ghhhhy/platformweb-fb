import { getAddFormSchemas } from '../model/data'
import { reactive, ref, unref } from '@vue/composition-api'

export const useAddModalForm = () => {
  // 表单实例
  const formRef = ref(null)
  // form模型
  const formSchemas = ref(getAddFormSchemas())
  // form双向绑定的数据
  const formData = reactive(
    unref(formSchemas)?.reduce((obj, schema) => {
      obj[schema?.field] = schema.itemRender?.defaultValue || ''
      return obj
    }, {})
  )

  const rules = unref(formSchemas)?.reduce((obj, schema) => {
    obj[schema?.field] = [{ required: true, message: '请完成必填项' }]
    return obj
  }, {})

  return {
    formSchemas,
    formData,
    rules,
    formRef
  }
}
