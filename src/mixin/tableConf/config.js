import configModule from '@/api/frame/common/tableconfig.js'

export default {
  methods: {
    /**
     * 加载配置
     * @param {type} table：table配置  from: from配置
     * @param {from} local：本地读取配置   api: 请求获取配置
     * @param {tableId} 配置表的Id
     */
    async loadBsConfig({ type = 'table', from = 'api', tableId }) {
      let configData = type === 'table' ? [] : {}

      if (from === 'local') {
        configData = await this.loadBsConfigFromLocation(type, tableId)
      }

      if (from === 'api') {
        configData = await this.loadBsConfigFromUrl(type, tableId)
      }

      return new Promise(function(resolve) {
        resolve(configData)
      })
    },

    // 读取本地文件获取配置
    loadBsConfigFromLocation(type, tableId) {
      let configData = {
        columns: [],
        data: type === 'table' ? [] : {}
      }

      return new Promise(function(resolve) {
        const locConfig = require(`@/views/config/${tableId}.js`)
        configData.columns = locConfig.default.columns || []
        configData.data = locConfig.default.data || (type === 'table' ? [] : {})
        resolve(configData)
      })
    },

    // 通过api请求获取配置
    loadBsConfigFromUrl(type, tableId) {
      let self = this
      let configData = {
        columns: [],
        data: type === 'table' ? [] : {}
      }
      return new Promise(function(resolve) {
        configModule.getConfig(tableId).then(res => {
          if (res.rscode === '100000') {
            configData = self.$ToolFn.utilFn.strToJson(res.data.configure || '{}')
            resolve(configData)
          } else {
            resolve(configData.data)
          }
        }).catch(error => {
          resolve(configData.data)
          console.log(error)
        })
      })
    }
  }
}
