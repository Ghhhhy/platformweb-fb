// 获取左侧树
import { get } from '@/api/http'

export function getTreeData(params) {
  return get('large-monitor-platform/lmp/mofDivTree', params)
}
