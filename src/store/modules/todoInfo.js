import { clone, toTreeArray } from 'xe-utils'
import HttpModule from '@/api/frame/common/menu.js'
import transJson from '@/utils/transformMenuQuery'
import { checkRscode } from '../../utils/checkRscode'

/**
 * 根据平台菜单信息生成待办请求所需字段
 * @param menu
 * @return {{param5, code, roleId, menuId, menuName, url}}
 */
function generatorMenuTodoParam(menu) {
  const {
    guid: menuId,
    roleguid: roleId,
    name: menuName,
    url,
    code,
    param5
  } = menu
  return {
    menuId,
    menuName,
    roleId,
    url,
    code,
    param5
  }
}

export default {
  namespaced: true,
  state: {
    // 菜单映射待办信息
    menuMapTodoInfo: []
  },
  mutations: {
    /**
     * 设置 菜单映射待办信息
     * @param state
     * @param payload
     */
    setMenuMapTodoInfo (state, payload) {
      state.menuMapTodoInfo = payload || []
    }
  },
  getters: {
    /**
     * 根据菜单/卡片id 获取当前菜单/卡片的待办信息
     * @param state
     * @return {function(*)}
     */
    getMenuTodoInfo(state) {
      return (menuId) => state.menuMapTodoInfo?.find(item => item.id === menuId) || {}
    }
  },
  actions: {
    /**
     * 获取 菜单映射待办信息
     * @param commit
     * @param menuList
     * @return {Promise<void>}
     */
    async getMenuMapTodoInfo({ commit }, menuList = []) {
      menuList = clone(menuList, true)
      const menusFlat = menuList?.map(menu => {
        // 提取平台菜单字段 => 生成接口所需字段
        const pickMenu = generatorMenuTodoParam(menu)

        pickMenu.children = []
        if (menu?.children?.length) {
          // 将卡片的后代菜单扁平化，并根据菜单参数param5.isTodo过滤后代菜单
          pickMenu.children = toTreeArray(menu.children || [])
            .filter(item => transJson(item.param5)?.isTodo)
            .map(child => {
              return generatorMenuTodoParam(child)
            })
        }
        return pickMenu
      })

      // 过滤需要统计待办的菜单卡片
      const params = menusFlat.filter(item => item.children?.length)
      // 存在需要统计的待办卡片 => 发送请求
      if (params.length) {
        const { data } = checkRscode(await HttpModule.getMenuTodoInfo(params))
        commit('setMenuMapTodoInfo', data)
      }
    }
  }
}
