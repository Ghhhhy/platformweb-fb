/*
 * @Author: 轻语
 * @Date: 2022-02-21 10:43:40
 * @LastEditors: 轻语
 * @LastEditTime: 2022-02-21 10:43:41
 * @Description:
 */
import FilePreview from './src/FilePreview.vue'

FilePreview.install = function(Vue) {
  Vue.component(FilePreview.name, FilePreview)
}

export default FilePreview
