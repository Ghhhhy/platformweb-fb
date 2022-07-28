// import api from '@/api/components/tree/unitTree'
import { mapState, mapMutations } from 'vuex'
import TreeModule from '@/api/frame/common/tree/unitTree'
export default {
  data() {
    return {
      treeData: [],
      treeLoading: false
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
      this.treeData = this.getUnitTreeData()
    },

    // 通过请求获取单位信息树数据
    getUnitTreeData() {
      this.treeLoading = true
      const params = {
        batchno: 2,
        datatype: 2,
        eleCode: 'agency',
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
        this.treeData = res
        this.treeLoading = false
      })
    }

  },
  created() {
    this.getTree()
  }
}
