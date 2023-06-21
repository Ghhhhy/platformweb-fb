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
      // console.log(window.localStorage.getItem(JSON.stringify(tableId)))
      if (window.localStorage.getItem(JSON.stringify(tableId))) {
        console.log('-------------------')
        configData = await this.loadBsConfigFromUrl(type, tableId)
        // console.log(configData)
        tableId.userguid = this.userInfo.guid
        // let localConfig = JSON.parse(window.localStorage.getItem(JSON.stringify(tableId)))
        // let bool = true
        // let num = 0
        // if (localConfig.length !== configData.itemsConfig.length) {
        //   bool = false
        // }
        // configData.itemsConfig.forEach(item => {
        //   localConfig.forEach(it => {
        //     debugger
        //     if (JSON.stringify(it) === JSON.stringify(item)) {
        //       num++
        //     }
        //   })
        // })
        // console.log(bool)
        // console.log(num)
        // if (!bool) {
        //   configData.itemsConfig = JSON.parse(window.localStorage.getItem(JSON.stringify(tableId)))
        // }
        // if (num === configData.itemsConfig.length) {
        //   configData.itemsConfig = JSON.parse(window.localStorage.getItem(JSON.stringify(tableId)))
        // }
      } else {
        configData = await this.loadBsConfigFromUrl(type, tableId)
      }
      // if (from === 'local') {
      //   configData = await this.loadBsConfigFromLocation(type, tableId)
      // }

      // if (from === 'api') {
      //   configData = await this.loadBsConfigFromUrl(type, tableId)
      // }

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
      tableId.userguid = ''
      let self = this
      let configData = {
        columns: [],
        data: type === 'table' ? [] : {}
      }
      return new Promise(function(resolve) {
        configModule.getConfig(tableId).then(res => {
          console.log(777, res)
          if (res.rscode === '100000') {
            configData = self.$ToolFn.utilFn.strToJson(res.data[0].configure || '{}')
            console.log('configData', configData)
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
    // async loadConfig(id) {
    //   let params = {
    //     tableId: {
    //       id: '',
    //       fiscalyear: this.$store.state.userInfo.year,
    //       mof_div_code: this.$store.state.userInfo.province,
    //       menuguid: this.$store.state.curNavModule.guid,
    //       userguid: ''
    //     }
    //   }
    //   // 高级查询(指标额度)
    //   if (id === this.advancedQueryId1) {
    //     params.tableId.id = id
    //     let configQueryData = await this.loadBsConfig(params)
    //     this.highQueryConfig = configQueryData.itemsConfig
    //     this.highQueryConfig1 = configQueryData.itemsConfig
    //   }
    //   // 高级查询
    //   if (id === this.advancedQueryId) {
    //     params.tableId.id = id
    //     let configQueryData = await this.loadBsConfig(params)
    //     this.highQueryConfig2 = configQueryData.itemsConfig
    //   }

    //   // 指标额度
    //   if (id === this.quotaId) {
    //     params.tableId.id = id
    //     params.tableId.userguid = this.userInfo.guid
    //     let configData = await this.loadBsConfig(params)
    //     this.configData1 = configData
    //     this.tableColumnsConfig = this.configData1.itemsConfig
    //     this.tableColumnsConfig1 = this.configData1.itemsConfig
    //   }
    //   // 未送审、已送审
    //   if (id === this.planId) {
    //     params.tableId.id = id
    //     params.tableId.userguid = this.userInfo.guid
    //     let configData = await this.loadBsConfig(params)
    //     this.configData2 = configData
    //     this.tableColumnsConfig2 = this.configData2.itemsConfig
    //   }
    //   // 全部单据
    //   if (id === this.documentsId) {
    //     params.tableId.id = id
    //     params.tableId.userguid = this.userInfo.guid
    //     let configData = await this.loadBsConfig(params)
    //     this.configData3 = configData
    //     this.tableColumnsConfig3 = this.configData3.itemsConfig
    //   }
    //   // 曾经办
    //   if (id === this.doneId) {
    //     params.tableId.id = id
    //     params.tableId.userguid = this.userInfo.guid
    //     let configData = await this.loadBsConfig(params)
    //     this.configData4 = configData
    //     this.tableColumnsConfig4 = this.configData4.itemsConfig
    //   }
    //   // 待办表头
    //   if (id === this.plannoId) {
    //     params.tableId.id = id
    //     params.tableId.userguid = this.userInfo.guid
    //     let configData = await this.loadBsConfig(params)
    //     this.configData5 = configData
    //     this.tableColumnsConfig5 = this.configData5.itemsConfig
    //   }
    // }
  }
}
