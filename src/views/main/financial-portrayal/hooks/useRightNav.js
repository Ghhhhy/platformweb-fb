import { onMounted, ref, onBeforeUnmount } from '@vue/composition-api'
import { throttle } from '@/utils/throttle'
export const useRightNav = () => {
  // 存储导航节点
  const nodeMap = ref([])
  // 当前选中一级导航
  const activeNav = ref(0)
  // 当前选中一级下面的二级导航
  const activeNavChid = ref(-1)
  // 滚动容器
  let pageScrollContainer = null
  // 头部高度
  const headerHeight = 100
  // 搜索栏的高度
  const searchHeight = 118
  // 滚动定时器
  let scrollTimer = null
  // 可视区高度
  // const clientHeight = document.documentElement.clientHeight
  /**
   * 跟新导航节点信息
  */
  const updateNavList = () => {
    const parentNodes = document.querySelectorAll('.financial-content-container > .nav')
    const childNodes = document.querySelectorAll('.nav-child')
    nodeMap.value = [...parentNodes].map(item => {
      const navItem = {
        node: item,
        children: []
      }
      if (item.dataset.title === '财政运行情况') {
        navItem.children = [...childNodes]
      }
      return navItem
    })
  }
  const throttleUpdateNavList = throttle(updateNavList, 500)
  /**
   * 右侧导航点击回调
   * @params parentIndex：父节点index childIndex：父节点下的子节点index
  */
  const navClick = ({ parentIndex, childIndex }) => {
    clearTimeout(scrollTimer)
    // 导航点击先停止监听容器滚动，避免滚动过程中与滚动回调逻辑冲突
    removeEventListener()
    const currentParent = nodeMap.value[parentIndex]
    const parentNode = currentParent.node
    const childNode = currentParent.children[childIndex]
    const scrollTop = childNode ? childNode.offsetTop : parentNode.offsetTop
    // 由于顶部搜索定位，滚动后需要适当偏移；因此换为scroll滚动
    pageScrollContainer.scroll({ top: scrollTop - searchHeight, behavior: 'smooth' })
    // childNode ? childNode.scrollIntoView({ behavior: 'smooth' }) : parentNode.scrollIntoView({ behavior: 'smooth' })
    activeNav.value = parentIndex
    activeNavChid.value = childIndex
    // 继续监听容器滚动（这里设置延迟是为了粗略估量滚动结束）
    scrollTimer = setTimeout(() => {
      addEventListener()
    }, 800)
  }
  /**
   * 滚动监听回调
  */
  const pageScrollHandle = () => {
    const scrollTop = pageScrollContainer.scrollTop
    nodeMap.value.forEach((item, index) => {
      if (scrollTop > item.node.offsetTop - headerHeight - searchHeight) {
        activeNav.value = index
      }
      if (index === 1) {
        nodeMap.value[index].children.forEach((it, i) => {
          if (scrollTop > it.offsetTop - headerHeight - searchHeight) {
            activeNavChid.value = i
          }
        })
      }
    })
  }
  const throttlePageScrollHandle = throttle(pageScrollHandle, 500)
  const removeEventListener = () => {
    pageScrollContainer.removeEventListener('scroll', throttlePageScrollHandle)
  }
  const addEventListener = () => {
    pageScrollContainer.addEventListener('scroll', throttlePageScrollHandle)
  }
  const onResize = () => {
    window.addEventListener('resize', throttleUpdateNavList)
  }
  const removeOnResize = () => {
    window.removeEventListener('resize', throttleUpdateNavList)
  }
  onMounted(() => {
    // 滚动容器
    pageScrollContainer = document.querySelector('.main-modulebox-contain')
    updateNavList()
    addEventListener()
    onResize()
  })
  onBeforeUnmount(() => {
    removeEventListener()
    removeOnResize()
  })
  return {
    nodeMap,
    activeNav,
    activeNavChid,
    navClick
  }
}
