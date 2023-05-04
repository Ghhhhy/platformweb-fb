import { defaultConfig } from './config'
import { defaultCardData } from '../card/config/config'
import MenuModule from '@/api/frame/common/menu.js'
import { extend } from '../utils'

export default {
  data() {
    return {
      countGroup: {},
      count: 0,
      todoDatas: [],
      doneDatas: [],
      operationGuideDatas: [],
      cardGlobal: {
        card: {
          width: 456,
          height: 224
        }

      },
      cardList: [],
      cardMenu: [],
      cardBtns: {}
    }
  },
  methods: {
    generateCardMenu() {
      const sysMenu = this.$store.state.systemMenu || []
      let sysMenuCp = [...sysMenu]
      let cardMenuTemp = []
      sysMenuCp.map((item, index) => {
        let card = {
          type: item.guid, // 基础信息管理【card模块】
          bgName: this.getConfigValue(index, 'bgName'), // card背景图片名称
          bgUrl: '', // card背景图片地址
          methods: {
            bsCardClickEvent: this.bsCardClickEvent
          },
          title: {
            icon: this.getConfigValue(index, 'titleIcon'), // card标题按钮样式
            title: item.name // card标题
          },
          buttons: this.getConfigButton(index, 'buttons'),
          menu: item
        }

        let colors = this.getConfigObj(index, 'color')
        Object.assign(card, colors)

        cardMenuTemp.push(card)
      })

      this.cardMenu = cardMenuTemp
      // console.log('2', this.cardMenu)
    },
    /**
     * 处理数组数据
     * @param {*} data
     */
    getArrData(data) {
      data.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.getArrData(item.children)
        } else {
          if (item.isleaf === '1') {
            this.todoDatas.push(item)
          }
        }
      })
    },
    /**
     * 处理对象数据
     * @param {*} data
     */
    getObjData(data) {
      if (data.children && data.children.length > 0) {
        return this.getArrData(data.children)
      } else if (data.length || data.length > 0) {
        this.getArrData(data)
      } else {
        if (data.isleaf === '1') {
          this.todoDatas.push(data)
        }
      }
    },
    /**
     * 获取字待办子节点
     * @param {*} data
     * @param {*} index
     */
    getChildren(data, index) {
      this.todoDatas = []
      data.forEach(it => {
        if (index === it.guid) {
          this.getObjData(it)
        }
      })
    },

    /**
     * 处理已办数组
     * @param {*} data
     * @param {*} index
     */
    dealDoneDatasArr(data, index) {
      this.doneDatas = []
      data.forEach(it => {
        if (index === it.guid) {
          this.dealDoneDatasObj(it)
        }
      })
    },
    /**
     * 处理已办对象
     * @param {*} data
     */
    dealDoneDatasObj(data) {
      if (data.children && data.children.length > 0) {
        return this.dealDoneDatasArrReq(data.children)
      } else if (data.length || data.length > 0) {
        this.dealDoneDatasArrReq(data)
      } else {
        if (data.isleaf === '1') {
          this.doneDatas.push(data)
        }
      }
    },
    /**
     * 处理已办对象
     * @param {*} data
     */
    dealDoneDatasArrReq(data) {
      data.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.dealDoneDatasArrReq(item.children)
        } else {
          if (item.isleaf === '1') {
            this.doneDatas.push(item)
          }
        }
      })
    },
    /**
     * 获取计数器
     * @param {*} guid
     */
    getCountGroup(guid) {
      let self = this
      self.count = 0
      self.todoDatas.forEach(val => {
        self.count += val.num
      })
      self.countGroup[guid] = self.count
    },
    getOperationGuideByMenuguid(operationGuides, guid) {
      let self = this
      self.operationGuideDatas = []
      let billId = 'OperationGuide-' + guid
      operationGuides.forEach(item => {
        if (billId === item.billguid) {
          let val = item.rows
          // val['name'] = item.filename
          self.operationGuideDatas.push(...val)
        }
      })
    },
    async generateCardBtns(status, menu) {
      // 1.接口获取待办和已办数据
      let toDos = []
      let dones = []
      let operationGuides = []
      if (status === '0') {
        // toDos = await this.getToDoDatas(status, menu)
      } else if (status === '1') {
        dones = await this.getToDoDatas(status, menu)
      } else if (status === '2') {
        operationGuides = await this.getOperationGuideDatas(status, menu)
      }
      // 2. 遍历菜单生成cardBtns架子
      const sysMenu = this.$store.state.systemMenu || []
      let sysMenuCp = [...sysMenu]
      let cardBtnsTemp = {
        globalConfig: {
          methods: {
            bsCardPoperClickEvent: this.bsCardPoperClickEvent
          }
        }
      }
      let self = this
      sysMenuCp.map((item, index) => {
        self.getChildren(toDos, item.guid)
        self.dealDoneDatasArr(dones, item.guid)
        self.getOperationGuideByMenuguid(operationGuides, item.guid)
        let card = {
          funMenu: { // 功能菜单

          },
          agentItem: extend(true, [], self.todoDatas),
          doneItem: extend(true, [], self.doneDatas),
          // 操作指南
          oprateGuide: extend(true, [], self.operationGuideDatas)
        }
        this.getCountGroup(item.guid)
        cardBtnsTemp[item.guid] = extend(true, {}, card)
      })

      this.cardBtns = cardBtnsTemp

      let att = []
      att = Object.keys(this.countGroup)
      // 修改待办和已办的数量
      const cardList = this.cardMenu
      let cardMenuList = [...cardList]
      let _self = this
      let cardMenuTmp = []
      cardMenuList.forEach(cd => {
        cd.buttons.forEach((item, index) => {
          att.forEach(it => {
            if (item.num !== undefined && index === 2) {
              if (cd.type === it) {
                item.num = _self.countGroup[it]
                return false
              }
            }
          })
        })
        let tmp = extend(true, {}, cd)
        cardMenuTmp.push(tmp)
      })
      this.cardMenu = cardMenuTmp
      this.resize()
    },

    getConfigObj(index = 0, type) {
      const data = defaultConfig[type]
      // 如果配置项没有这样的key则返回空对象
      if (!data) {
        return {}
      }
      // 根据索引取默认数组的值，如果数组值取完，则循环取值
      let num = index % data.length
      return data[num]
    },
    getConfigValue(index = 0, type) {
      const data = defaultConfig[type]
      // 如果配置项没有这样的key则返回空对象
      if (!data) {
        return ''
      }

      // 根据索引取默认数组的值，如果数组值取完，则循环取值
      let num = index % data.length
      return data[num]
    },

    getConfigButton(index = 0, type) {
      const data = defaultConfig[type]
      // 如果配置项没有这样的key则返回空对象
      if (!data) {
        return []
      }

      // 根据索引取默认数组的值，如果数组值取完，则循环取值
      let num = index % data.length
      let value = data[num]
      if (value === 'all') {
        return defaultCardData.buttons
      } else {
        if (Array.isArray(value)) {
          return value
        } else {
          let arr = []
          let indexArr = value.split(',')
          indexArr.map((item) => {
            arr.push(defaultCardData.buttons[item])
          })

          return arr
        }
      }
    },
    getImageUrl() {
      this.cardMenu.forEach(item => {
        item.bgUrl = require('../img/' + item.bgName)
      })
    },
    getChildrenMenu(menu) {
      if (menu && menu.length > 0) {
        let result = []
        menu.forEach(item => {
          if (item.children && item.children.length > 0) {
            result = result.concat(this.getChildrenMenu(item.children))
          } else {
            result.push(item)
          }
        })
        return result
      } else {
        return []
      }
    },
    filterChildrenMenu(menu, nums) {
      if (menu && menu.length > 0) {
        let result = []
        menu.forEach(item => {
          if (item.children && item.children.length > 0) {
            let itChildren = this.filterChildrenMenu(item.children, nums)
            if (itChildren.length > 0) {
              item.children = itChildren
              result.push(item)
            }
          } else {
            if (nums[item.guid]) {
              item.num = nums[item.guid]
              result.push(item)
            }
          }
        })
        return result
      } else {
        return []
      }
    },
    /**
     * 获取待办数据
     */
    getToDoDatas(status = '0', menuId = '') {
      let todoDatas = []
      const sysMenu = this.$store.state.systemMenu || []
      let sysMenuCp = []
      sysMenu.forEach(menu => {
        if (menu.guid === menuId) {
          sysMenuCp = JSON.parse(JSON.stringify([menu]))
        }
      })
      let menuVOList = []
      let self = this
      sysMenuCp.forEach(menu => {
        if (menu.children && menu.children.length > 0) {
          menuVOList = menuVOList.concat(self.getChildrenMenu(menu.children))
        } else {
          menuVOList.push(menu)
        }
      })
      let postData = []
      menuVOList.forEach(item => {
        let vo = {
          menuguid: item.guid,
          roleguid: item.roleguid,
          param5: item.param5
        }
        postData.push(vo)
      })
      let params = {
        status: status,
        menuVOList: postData
      }
      return new Promise(function (resolve) {
        MenuModule.getToDoDatas(params).then(res => {
          if (res && res.code === '100000') {
            let data = res.data
            let numMap = {}
            data.forEach(item => {
              numMap[item.menuguid] = item.count
            })
            sysMenuCp.forEach(menu => {
              if (menu.children && menu.children.length > 0) {
                let itChildren = self.filterChildrenMenu(menu.children, numMap)
                if (itChildren.length > 0) {
                  menu.children = itChildren
                  todoDatas.push(menu)
                }
              } else {
                if (numMap[menu.guid]) {
                  menu.num = numMap[menu.guid]
                  todoDatas.push(menu)
                }
              }
            })
            resolve(todoDatas)
          } else {
            resolve(todoDatas)
          }
        }).catch(error => {
          console.log(error)
          resolve(todoDatas)
        })
      })
    },
    /**
     * 获取已办数据
     */
    getDoneDatas() {
      let doneDatas = []
      return new Promise(function (resolve) {
        MenuModule.getDoneDatas({}).then(res => {
          if (res && res.rscode === '100000') {
            doneDatas = res.data
            resolve(doneDatas)
          } else {
            resolve(doneDatas)
          }
        }).catch(error => {
          console.log(error)
          resolve(doneDatas)
        })
      })
    },
    /**
     * 获取操作导航数据
     */
    getOperationGuideDatas() {
      let operationGuideDatas = []
      let billId = 'OperationGuide-'
      let params = {
        billguid: billId
      }
      return new Promise(function (resolve) {
        MenuModule.getOperationGuideDatas(params).then(res => {
          if (res && res.code === '100000') {
            operationGuideDatas = res.data
            resolve(operationGuideDatas)
          } else {
            resolve(operationGuideDatas)
          }
        }).catch(error => {
          console.log(error)
          resolve(operationGuideDatas)
        })
      })
    }
  },
  mounted() {
  },
  watch: {
    cardList: {
      handler(newValue, oldValue) {
        this.cardMenu = newValue
      }
    }
  }
}
