import { readonly } from '@vue/composition-api'
import store from '@/store/index'
import { menuModelData, SxMenuModelData } from '../modal/data'
export const useMenuModel = () => {
  const menus = store.getters.isSx ? readonly(SxMenuModelData) : readonly(menuModelData)

  /**
   * 菜单点击
   * @param {String} menuName
   */
  const menuClick = (menus) => {
    const { code, name, isOpen } = menus
    if (!isOpen) return
    const route = {
      url: `/subjectAnalysis?menuName=${name}&menuCode=${code}`,
      code: '892',
      name: `${name}主题分析`,
      query: { name }
    }
    store.commit('setCurMenuObj', route)
  }

  return {
    menus,
    menuClick
  }
}
