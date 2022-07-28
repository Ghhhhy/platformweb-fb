// 配置合并更新方法   Author:Titans@2396757591@qq.com
export default {
  getbasicDataType(obj) {
    // 获取数据类型
    return Object.prototype.toString.call(obj).slice(8, -1)
  },
  deepAssignOne(dist, src, level = 0, maxLevel = 5) { // 深度合并一个
    let self = this
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        var value = src[key]
        if (this.getbasicDataType(value) === 'Object') {
          if (this.getbasicDataType(dist[key]) !== 'Object') {
            dist[key] = {}
          }
          if (level < maxLevel) {
            self.deepAssignOne(dist[key], value, level + 1, maxLevel)
          } else {
            dist[key] = src[key]
          }
        } else if (Array.isArray(value)) {
          dist[key] = []
          dist[key] = dist[key].concat(value)
        } else if (value !== undefined) {
          dist[key] = value
        }
      }
    }
  },
  deepAssign() { // // 深度合并多个
    let self = this
    let arg = [...arguments]
    var rst = arg[0]
    arg.slice(1).forEach((src) => {
      self.deepAssignOne(rst, src)
    })
    return rst
  }
}
