import { clone, toTreeArray } from 'xe-utils'
import HttpModule from '@/api/frame/common/menu.js'

function generatorMenuTodoParam(menu, status) {
  const {
    guid: menuId,
    roleguid: roleId,
    name: menuName,
    url,
    code,
    params5
  } = menu
  return {
    status,
    menuId,
    menuName,
    roleId,
    url,
    code,
    params5
  }
}

export default {
  namespaced: true,
  state: {
    // 菜单映射待办信息
    menuMapTodoInfo: []
  },
  mutations: {
    // 设置 菜单映射待办信息
    setMenuMapTodoInfo (state, payload) {
      state.menuMapTodoInfo = payload || []
    }
  },
  getters: {
    // 根据菜单/卡片id 获取当前菜单/卡片的待办信息
    getMenuTodoInfo(state) {
      return (menuId) => state.menuMapTodoInfo.find(item => item.menuId === menuId) || {}
    }
  },
  actions: {
    // 获取 菜单映射待办信息
    async getMenuMapTodoInfo({ commit }, { menuList = [] }) {
      menuList = clone(menuList, true)
      const params = menuList.map(menu => {
        const param = generatorMenuTodoParam(menu)
        param.children = []
        if (menu?.children?.length) {
          param.children = toTreeArray(menu.children).map(child => {
            return generatorMenuTodoParam(child)
          })
        }
        return param
      })
      const { data } = await HttpModule.getMenuTodoInfo(params)

      commit('setMenuMapTodoInfo', data)
    }
  }
}
