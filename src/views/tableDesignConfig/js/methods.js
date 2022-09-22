import config from './config.js'
import { get } from '@/api/http'
/**
 * 初始化方法
 */
const initMethods = {
  initCreated() {
    this.initConfig()
  },
  initMounted() {
  },
  initConfig() {
    this.letftTreeFilterText = config('leftTreeConf', 'defaultConfig', 'letftTreeFilterText')
    this.leftTreeConfig = config('leftTreeConf', 'defaultConfig', 'leftTreeConfig')
    this.treeQueryparams = config('leftTreeConf', 'defaultConfig', 'treeQueryparams')
    this.defaultExpandedKeys = config('leftTreeConf', 'defaultConfig', 'defaultExpandedKeys')
    this.currentNodeKey = config('leftTreeConf', 'defaultConfig', 'currentNodeKey')
    this.treeData = config('leftTreeConf', 'defaultConfig', 'treeData')
  }
}

/**
 * 界面交互逻辑方法
 */
const interfaceMethods = {
  onTabPaneltabClick(obj) { },
  onTabPanelBtnClick(obj) { },
  changeInput(val) {
    this.letftTreeFilterText = val
  },
  onNodeCheckClick({ node, nodes, treeData }, UnitTree, tree) { },
  onNodeClick({ node, treeData }, UnitTree, tree) {
    if (this.$refs.tableDesign && this.$refs.tableDesign.modifyStatus !== '') {
      this.$XModal.message({ status: 'info', message: '锁定中，请先退出编辑模式' })
      return
    }
    if (node.id && node.id !== 'root' && !node.id.startsWith('dicType')) {
      this.currentNodeKey = node.id
      this.currentNodeCode = node.code
      this.getMainFormData(node.id, node.isleaf)
    } else if (node.id) {
      let data = {
        basicInfo: {
          guid: node.id,
          isfolder: 1
        },
        columns: []
      }
      if (node.id.startsWith('dicType')) {
        data.basicInfo.dicType = node.code
      }
      this.$refs.tableDesign.setData(data, '1')
    }
  },
  onTableDesignBtnClick(boo) {
    this.leftVisible = !boo
  },
  refresh({ dicInfoId = null, isleaf = '0', isAfterDel = false, needRefreshTree = false }) {
    let self = this
    if (!isAfterDel && dicInfoId !== null && !['dicType', 'root'].includes(dicInfoId) && !dicInfoId.startsWith('dicType')) {
      self.getMainFormData(dicInfoId, isleaf)
    } else {
      self.$refs.tableDesign.setData({
        basicInfo: {},
        columns: []
      }, isleaf)
    }
    if (isAfterDel || needRefreshTree) {
      this.$refs.bsTree.initTreeData(true)
      setTimeout(() => {
        if (dicInfoId) {
          let tree = self.$refs.bsTree.treeOptionFn()
          tree.setCurrentKey(dicInfoId)
          tree.defaultExpandedKeys = [dicInfoId]
        }
      }, 200)
    }
  }
}

/**
 * 数据方法（AJAX）
 */
const dataMethods = {
  getBasicDetailByDicInfoId(dicInfoId) {
    let param = {
      dicInfoId: dicInfoId
    }
    return get('bisConfig/config/basDicInfo/getBasicDetailsByDicInfoId', param)
  },
  getMainFormData(dicInfoId, isleaf) {
    let self = this
    this.tableDesignLoading = true
    this.handleHttpMethod(this.getBasicDetailByDicInfoId(dicInfoId)).then(res => {
      if (res) {
        // TODO:先这样处理
        // res.data.basicInfo.parentid = res.data.basicInfo.parentId
        self.$refs.tableDesign.setData(res.data, isleaf)
        this.tableDesignLoading = false
      }
    })
  }
}

/**
 * 校验方法（表单、表格）
 */
const validateMethods = {}

export const myMethods = {
  ...initMethods,
  ...interfaceMethods,
  ...dataMethods,
  ...validateMethods
}
