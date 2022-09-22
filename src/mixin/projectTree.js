// import projectApi from '@/api/components/tree/unitProjectTree'
import { mapState, mapMutations } from 'vuex'
import TreeModule from '@/api/frame/common/tree/unitTree'
export default {
  data() {
    return {
      unitTree: [],
      treeLoading: false,
      treeLoaded: false
    }
  },
  computed: {
    ...mapState('basicInfo', ['unitProjectTree'])
  },
  methods: {
    ...mapMutations('basicInfo', ['setUnitProjectTree']),

    // 生成单位信息树数据
    getUnitTree() {
      // 如果有单位树缓存，则取缓存数据，否则api请求取数据
      // this.unitTree = this.unitProjectTree ? this.unitProjectTree : this.getUnitTreeData()
      this.unitTree = this.getUnitProjectTreeData()
    },

    // 通过请求获取单位信息树数据
    getUnitProjectTreeData() {
      console.log(22)
      this.treeLoading = true
      this.treeLoaded = false

      const params = {
        batchno: 2,
        datatype: 2,
        eleCode: 'PROCAT',
        sxspecroleguid: '21DE02718C104153BBC214146434A73B',
        useRight: true
      }
      TreeModule.getUnitTree(params).then(res => {
      // projectApi.getTreeData().then(res => {
      //   if (res.rscode === 10000) {
      //     const tData = {
      //       id: -1,
      //       label: '项目类别',
      //       name: '项目类别',
      //       children: res.data
      //     }
      //     this.datasToTree(tData)
      //   }
        const tData = {
          id: -1,
          label: '项目类别',
          name: '项目类别',
          children: res
        }
        this.datasToTree(tData)
        this.treeLoading = false
        this.treeLoaded = true
      })
    },

    // 数据转树
    datasToTree(data) {
      let treeList = []
      this.parseData(data, treeList)
      this.unitTree = treeList
      this.setUnitProjectTree(treeList) // 缓存单位树数据
    },

    // 解析内部数据
    parseData(data, parent) {
      const tree = Object.create(null)
      tree.id = data.id
      tree.label = data.label
      if (data.children && data.children.length) {
        tree.children = []
        data.children.forEach(item => this.parseData(item, tree.children))
      }
      parent.push(tree)
    }
  },
  created () {
    this.getUnitTree()
  }
}
