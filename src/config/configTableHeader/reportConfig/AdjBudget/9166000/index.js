
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
