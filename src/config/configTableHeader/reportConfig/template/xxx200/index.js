// 批量导入xxx100的所有子文件报表
const allConfig = {}
function importAll(r) {
  r.keys().forEach(
    key => Object.assign(allConfig, r(key).default)
  )
}
importAll(require.context('./children', false, /.js$/))

export default {
  ...allConfig
}
