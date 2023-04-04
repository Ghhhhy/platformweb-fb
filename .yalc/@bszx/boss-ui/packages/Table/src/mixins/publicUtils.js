/*
 * @Author: 轻语
 * @Date: 2021-11-08 14:26:16
 * @LastEditors: 轻语
 * @LastEditTime: 2021-11-23 16:11:09
 * @Description:
 */
export default {
  props: {
  },
  data() {
    return {
      filtertext: '', // 模糊过滤
      filtertextCp: '' // 模糊过滤渲染匹配数据
    }
  },
  methods: {
    getListData() {
      // 获取表单数据
      const { fullData } = this.$refs.xGrid.getTableData()
      const data = fullData || []
      return this.dealData(data)
    },
    dealData(data) {
      let newData = []
      data.forEach((item) => {
        const itemVal = Object.assign({}, item)
        Object.keys(itemVal).map((val) => {
          let value = String(itemVal[val]) || ''
          if (value.includes('initId')) {
            const prefix = val.substr(0, val.indexOf('id'))
            itemVal[val] = ''
            itemVal[prefix + 'code'] = ''
            itemVal[prefix + 'name'] = ''
          }
        })
        newData.push(itemVal)
      })
      return newData
    },
    regTreePrefix(item) {
      const reg = /\w*_$/g
      return reg.test(item)
    },
    // 遍历正则对象，给树统一自动添加正则
    addTreeReg(formValidationConfig) {
      const reg = /^(?!initId)/g
      Object.keys(formValidationConfig).forEach((item) => {
        if (this.regTreePrefix(item)) {
          formValidationConfig[item][0].pattern = reg
        }
      })

      return formValidationConfig
    },
    // 遍历，动态给树组件添加双向绑定的前缀
    addTreePrefixKey2(treeData) {
      const reg = /_id$/
      let treeArr = treeData || []
      treeArr.forEach((row) => {
        Object.keys(row).forEach((item) => {
          // 以_id结尾，并且其前缀在数据包中不存在时，动态给其绑定一个前缀
          if (reg.test(item)) {
            const prefix = item.substr(0, item.indexOf('id'))
            if (!row.hasOwnProperty(prefix)) {
              this.$set(row, prefix, '')
            }
          }
        })
      })
      return treeData
    },
    // 递归总计带children的合计总和
    loopAddSubTotal(total = 0, itemData = {}, property) {
      if (itemData.children && itemData.children.length) {
        itemData.children.forEach(it => {
          total = this.loopAddSubTotal(total, it, property)
        })
      }
      let itVal = ((typeof (itemData[property]) === 'number' || typeof (itemData[property]) === 'string') && itemData[property] !== '') ? parseFloat(itemData[property].toString().split(',').join('')) : 0
      total += Number(itVal)
      return total
    },
    delSearchfromMain() {
      // 父组件调用此方法清空查询数据
      this.formSearchData.filterValue = ''
    },
    getHighlightedFilterText(val) { // 渲染施加高亮
      if (this.filtertextCp) {
        let reg = new RegExp(this.filtertextCp, 'ig')
        return String(val).replace(reg, match => {
          if (match) {
            return `<span class="filter-lighting">${match}</span>`
          } else {
            return ''
          }
        })
      } else {
        return val
      }
    }
  },
  async $asyncGet(url, params, cb) { // 使用异步调用，返回结果后再执行
    await this.$http.get(url, params, origin)
  },
  async $asyncPost(url, params, cb) { // 使用异步调用，返回结果后再执行
    await this.$http.post(url, params, origin)
  },
  $post(url, params, origin) {
    let self = this
    return new Promise((resolve, reject) => {
      self.$http.post(url, {
        params: params
      })
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  $get(url, params, origin) {
    let self = this
    return new Promise((resolve, reject) => {
      self.$http.get(url, {
        params: params
      })
        .then(response => {
          if (response.code === 200) {
            resolve(response.data)
          } else {
            resolve([])
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
