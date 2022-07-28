export default {
  namespaced: true,
  state: {
    unitTree: null,
    unitProjectTree: null,
    bossTree: null
  },
  getters: {
    cacheTree: (state, getters) => (params) => {
      const newKey = JSON.stringify(params)
      return state.bossTree ? (state.bossTree[newKey] || null) : null
    }
  },
  mutations: {
    setUnitTree (state, treeData) {
      state.unitTree = treeData
    },

    clearUnitTree (state, treeData) {
      state.unitTree = null
    },

    setUnitProjectTree (state, treeData) {
      state.unitProjectTree = treeData
    },

    clearUnitProjectTree (state, treeData) {
      state.unitProjectTree = null
    },

    setBossTree(state, { params, treeData }) {
      // 判空
      if (!state.bossTree) {
        state.bossTree = Object.create(null)
      }

      // 判断长度
      const keys = Object.keys(state.bossTree)
      if (keys.length > 15) {
        delete state.bossTree[keys[0]]
      }

      const newKey = JSON.stringify(params)
      state.bossTree[newKey] = treeData
    },

    clearBossTree(state, treeData) {
      state.bossTree = null
    }
  },
  actions: {

  }
}
