const { Object } = require('core-js')
export default {
  buildFormData(columns, formData) {
    let newFormData = {}
    columns.forEach((item, index) => {
      if (item.itemRender.name === '$treeinput') {
        newFormData[item.field + '_id'] = formData[item.field]['id']
        newFormData[item.field + '_code'] = formData[item.field]['code']
        newFormData[item.field + '_name'] = formData[item.field]['name']
      } else {
        newFormData[item.field] = formData[item.field]
      }
    })
    Object.assign(formData, newFormData)
    return formData
  },
  reverseFormData(columns, formData) {
    let newFormData = {}
    formData.forEach((item, index) => {
      if (item.itemRender.name === '$treeinput') {
        newFormData['id'] = formData[item.field + '_id']
        newFormData['code'] = formData[item.field + '_code']
        newFormData['name'] = formData[item.field + '_name']
        formData[item.field] = newFormData
      }
    })
    return formData
  }
}
