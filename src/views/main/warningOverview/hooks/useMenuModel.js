import { readonly } from '@vue/composition-api'
import store from '@/store/index'
import { menuModelData } from '../modal/data'
export const useMenuModel = () => {
  const menus = readonly(menuModelData)

  /**
   * 菜单点击
   * @param {String} menuName
   */
  const menuClick = (menu) => {
    const { name, isOpen } = menu
    if (!isOpen) return
    const route = {
      url: `/subjectAnalysis?menuName=${name}`,
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
