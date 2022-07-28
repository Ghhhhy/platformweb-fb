// 页面：项目库管理 => 项目基础信息管理 => 项目标签维护
// 项目标签主视图 表头配置  2020-7-13 15:51
// 负责人：黄丹
// import formatter from "@/components/Table/util/formatter"

export const columns = [
  // {
  //   title: '热点分类类型',
  //   field: 'hotspot_classification_type'
  // },
  {
    title: '热点分类代码', // 项目标签代码
    field: 'tag_code'
  //  width: 400
  },
  {
    title: '热点分类名称',
    field: 'tag_name'
    // width: 400
  },

  {
    title: '是否启用',
    field: 'is_enable',
    // width: 200,
    formatter: (value, column) => {
      return value.cellValue === '1' ? '是' : '否'
    }
  }
]

export default {
  projectTagMaintain: columns
}
