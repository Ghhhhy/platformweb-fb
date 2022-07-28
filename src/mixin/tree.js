// import api from '@/api/components/tree/unitTree'
import { mapState, mapMutations } from 'vuex'
import TreeModule from '@/api/frame/common/tree/unitTree'
export default {
  data() {
    return {
      tree: [],
      treeLoading: false,
      treeLoaded: false
    }
  },
  computed: {
    ...mapState('basicInfo', ['unitTree'])
  },
  methods: {
    ...mapMutations('basicInfo', ['setUnitTree']),

    // 生成单位信息树数据
    getTree() {
      // 如果有单位树缓存，则取缓存数据，否则api请求取数据
      // this.tree = this.unitTree ? this.unitTree :
      this.tree = this.getUnitTreeData()
    },

    // 通过请求获取单位信息树数据
    getUnitTreeData() {
      this.treeLoading = true
      this.treeLoaded = false

      const params = {
        batchno: 2,
        datatype: 2,
        eleCode: 'vw_agency_gd_tree',
        sxspecroleguid: '21DE02718C104153BBC214146434A73B',
        useRight: true
      }
      TreeModule.getUnitTree(params).then(res => {
        // api.getTreeData().then(res => {
        // if (res.rscode === 10000) {
        //   const tData = {
        //     id: -1,
        //     label: '预算单位',
        //     name: '预算单位',
        //     children: res.data
        //   }
        //   this.dataToTree(tData)
        // }
        const tData = {
          id: -1,
          label: '预算单位',
          name: '预算单位',
          children: res
        }
        this.dataToTree(tData)
        this.treeLoading = false
        this.treeLoaded = true
      })
    },

    // 数据转树
    dataToTree(data) {
      let treeList = []
      this.parseData(data, treeList)
      this.tree = treeList
      this.setUnitTree(treeList) // 缓存单位树数据
    },

    // 解析内部数据
    parseData(data, parent) {
      const tree = Object.create(null)
      // console.log(data)
      tree.id = data.id
      tree.code = data.code
      tree.isleaf = data.isleaf
      tree.label = data.label
      tree.superguid = data.superguid
      tree.levelno = data.levelno
      tree.bizkey = data.bizkey
      if (data.children && data.children.length) {
        tree.children = []
        data.children.forEach(item => this.parseData(item, tree.children))
      }
      parent.push(tree)
    }
  },
  created() {
    this.getTree()
  }
}
