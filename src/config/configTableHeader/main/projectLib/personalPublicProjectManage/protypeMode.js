// 页面：项目库管理 => 人员公用项目管理 => 一键测算
// 项目类别对模板 表头配置  2020-7-13 16:37
// 负责人：黄丹
export const columns = [
  {
    title: '项目类别',
    field: 'pro_cat_name',
    width: '120'
  },
  {
    title: '项目名称',
    field: 'name',
    width: '120'
  },
  {
    title: '测算模板名称',
    field: 'draft_template_name',
    width: '120'
  }
]

export default {
  protypeMode: columns
}
