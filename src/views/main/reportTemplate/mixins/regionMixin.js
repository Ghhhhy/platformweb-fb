import store from '@/store/index'
export default {
  methods: {
    itemChange({ property, itemValue, data }) {
      if (property === 'fiscalYear' && itemValue && !store.getters.isSx) {
        const formSchema = this.queryConfig.find(item => item.field === 'proCodes')
        if (!formSchema) return

        const field = formSchema.field
        this.searchDataList[field] = ''
        const valueKeys = formSchema.itemRender?.props?.config?.valueKeys

        valueKeys?.forEach(key => {
          this.searchDataList[`${field}__viewSort`] && (this.searchDataList[`${field}__viewSort`] = '')
          this.searchDataList[`${field}_${key}`] && (this.searchDataList[`${field}_${key}`] = '')
          this.searchDataList[`${field}_${key}__multiple`] && (this.searchDataList[`${field}_${key}__multiple`] = [])
        })
        this.searchDataList.fiscalYear = data[property]

        // 看了封装的query组件，没有深度监听，所以这里需要修改引用地址才能更新数据
        this.searchDataList = {
          ...this.searchDataList
        }

        this.getPro(data[property])
      }
    }
  }
}
