import XEUtils from 'xe-utils'
import { Message } from 'element-ui'

let fileForm
let fileInput

export function parseFile (file) {
  const name = file.name
  const tIndex = XEUtils.lastIndexOf(name, '.')
  const type = name.substring(tIndex + 1, name.length)
  const filename = name.substring(0, tIndex)
  return { filename, type }
}
/**
 * 读取本地文件
 * @param {*} options 参数
 */
export function readLocalFile(options) {
  const opts = Object.assign({}, options)
  if (!fileForm) {
    fileForm = document.createElement('form')
    fileInput = document.createElement('input')
    fileForm.className = 'vxe-table--file-form'
    fileInput.name = 'file'
    fileInput.type = 'file'
    fileForm.appendChild(fileInput)
    document.body.appendChild(fileForm)
  }
  return new Promise((resolve, reject) => {
    const types = opts.types || []
    const isAllType = !types.length || types.some((type) => type === '*')
    fileInput.multiple = !!opts.multiple
    fileInput.accept = isAllType ? '' : `.${types.join(', .')}`
    fileInput.onchange = (evnt) => {
      const { files } = evnt.target
      const file = files[0]
      let errType = ''
      // 校验类型
      if (!isAllType) {
        for (let fIndex = 0; fIndex < files.length; fIndex++) {
          const { type } = parseFile(files[fIndex])
          if (!XEUtils.includes(types, type)) {
            errType = type
            break
          }
        }
      }
      if (!errType) {
        resolve({ status: true, files, file })
      } else {
        if (opts.message !== false) {
          Message.error(`不支持的文件类型${errType}`)
        }
        const params = { status: false, files, file }
        reject(params)
      }
    }
    fileForm.reset()
    fileInput.click()
  })
}
