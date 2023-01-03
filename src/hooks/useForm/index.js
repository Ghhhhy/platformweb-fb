import { reactive, toRaw, ref, unref, computed, nextTick, readonly, getCurrentInstance } from '@vue/composition-api'
import { clone, isPlainObject } from 'xe-utils'
import { merge } from './utils'

function useForm(
  initialFormSchemas, // schemas配置
  refKey = 'formRef' // 表单ref（直接使用vxe-form组件时没有提供register事件，无法获取表单实例；转而使用getCurrentInstance.refs[refKey]）
) {
  // 当前使用该hook的组件实例
  const { proxy } = getCurrentInstance()

  // 表单实例
  const formRef = ref(null)

  // form模型
  const formSchemas = ref(initialFormSchemas || [])

  // form双向绑定的数据
  const formData = reactive(
    unref(formSchemas)?.reduce((obj, schema) => {
      // 可能为默认值0、false等情况，因此仅过滤undefined就行
      obj[schema?.field] = schema.itemRender?.defaultValue !== undefined
        ? schema.itemRender?.defaultValue
        : ''
      return obj
    }, {})
  )

  // 根据formSchemas配置rule
  const rules = computed(() => {
    return unref(formSchemas)?.reduce((obj, schema) => {
      const itemRule = []
      if (schema.required) {
        itemRule.push({ required: true, message: '请完成必填项' })
      }
      if (schema.rules) {
        itemRule.push(...schema.rules)
      }
      obj[schema?.field] = itemRule
      return obj
    }, {})
  })

  // 主要提供给搜索表格使用
  const submitFormData = reactive(clone(toRaw(formData), true))

  /**
   * 注册
   * @param instance
   */
  function register(instance) {
    if (unref(formRef) === instance) return
    formRef.value = instance
  }

  /**
   * 获取点击提交后的表单值（主要提供给搜索表格使用）
   * @returns {DeepReadonly<UnwrapNestedRefs<{} extends Ref<infer V> ? UnwrapRefSimple<V> : UnwrapRefSimple<{}>>>}
   */
  function getSubmitFormData() {
    return readonly(submitFormData)
  }

  /**
   * 设置值（主要提供给搜索表格使用）
   * @param data
   */
  function setSubmitFormData(data) {
    Object.assign(submitFormData, data)
  }

  /**
   * 获取表单值
   * @returns {UnwrapRef<{}>}
   */
  function getFormData() {
    return formData
  }

  /**
   * 设置值
   * @param obj
   */
  function setFormData(obj) {
    Object.assign(formData, obj)
  }

  /**
   * 获取表实例
   * @returns {unknown}
   */
  async function getForm() {
    const form = unref(formRef) || proxy?.$refs?.[refKey]

    if (!form) {
      console.log('The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!')
      return
    }
    await nextTick()
    return form
  }

  /**
   * 设置formSchemas
   * @param schemas
   */
  function updateFormSchemas(schemas) {
    if (!schemas || typeof schemas !== 'object') return
    if (isPlainObject(schemas)) {
      schemas = [schemas]
    }
    schemas?.forEach(curSchema => {
      let preSchema = formSchemas.value?.find(item => item.field === curSchema.field)
      preSchema && merge(preSchema, curSchema)
    })
    // console.log(formSchemas.value)
    // fixbug：vxe-form没有深度监听,需要此处深拷贝改变引用地址
    formSchemas.value = clone(formSchemas.value, true)
  }

  /**
   * 获取formSchemas
   * @returns {Array<UnwrapRefSimple<*>>}
   */
  function getFormSchemas() {
    return unref(formSchemas)
  }

  /**
   * 校验表单
   * @returns {Promise<void>}
   */
  async function validate(callback) {
    const instance = await getForm()
    return instance.validate?.(callback && callback)
  }

  /**
   * 清空校验
   * @field {Array, String}
   * @returns {Promise<void>}
   */
  async function clearValidate(field) {
    if (isPlainObject(field)) return

    const instance = await getForm()
    // 没有参或者隐式转为false的情况清空整个校验
    if (!field) {
      instance.clearValidate?.()
    }

    const asyncAll = []
    if (Array.isArray(field)) {
      asyncAll.push(...field.map(item => instance.clearValidate?.(item)))
    } else {
      asyncAll.push(instance.clearValidate?.(field))
    }
    Promise.all(asyncAll)
  }

  async function reset() {
    const instance = await getForm()
    instance?.reset?.()
  }

  return [
    {
      formData,
      rules,
      formSchemas,

      getForm,

      getFormData,
      setFormData,

      getFormSchemas,
      updateFormSchemas,

      getSubmitFormData,
      setSubmitFormData,

      validate,
      clearValidate,
      reset
    },
    register
  ]
}

export default useForm
