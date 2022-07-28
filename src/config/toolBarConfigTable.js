// 表格上toolbar按钮配置 @ 张颖捷

// 默认工具栏
export const defaultToolbarConfig = {
  moneyConversion: true,
  search: true,
  advancedSearch: true,
  buttons: [
    { code: 'toolbar-refresh', name: '刷新' }
  ]
}

// 单位信息维护
export const unitInfoMaintainToolbarConfig = {
  未处理: {
    refresh: false,
    import: false,
    custom: true,
    moneyConversion: true,
    search: true,
    advancedSearch: true,
    // table工具栏配置
    buttons: [

      { code: 'toolbar-insert', name: '新增', status: 'primary' },
      {
        code: 'toolbar-edit',
        name: '修改'
      },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-refresh', name: '刷新' },
      {
        code: 'toolbar-audit',
        name: '送审'
      }

      // {
      //   name: '更多',
      //   disabled: false,
      //   dropdowns: [{
      //     code: 'toolbar-audit',
      //     name: '送审'
      //   },
      //   {
      //     code: 'toolbar-edit',
      //     name: '修改'
      //   },
      //   {
      //     code: 'toolbar-import',
      //     name: '导入数据'
      //   }]
      // }
    ]
  },
  已处理: {
    // table工具栏配置
    moneyConversion: true,
    search: true,
    advancedSearch: true,
    buttons: [
      { code: 'toolbar-withdraw', name: '撤回', status: 'primary' },
      { code: 'toolbar-log', name: '查看操作日志' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  },
  被退回: {
    // table工具栏配置
    moneyConversion: true,
    search: true,
    advancedSearch: true,
    buttons: [
      { code: 'toolbar-audit', name: '送审', status: 'primary' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  }
}

// 单位信息审核
export const unitInfoAuditToolbarConfig = {
  未处理: {
    // table工具栏配置
    moneyConversion: true,
    buttons: [
      { code: 'toolbar-pass', name: '通过', status: 'primary' },
      { code: 'toolbar-reject', name: '退回' },
      { code: 'toolbar-log', name: '查看操作日志' },
      { code: 'toolbar-refresh', name: '刷新' }

    ]
  },
  已处理: {
    // table工具栏配置
    moneyConversion: true,
    buttons: [
      { code: 'toolbar-log', name: '查看操作日志', status: 'primary' },
      { code: 'toolbar-withdraw', name: '撤回' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  },
  被退回: {
    // table工具栏配置
    moneyConversion: true,
    buttons: [
      { code: 'toolbar-pass', name: '通过', status: 'primary' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  }
}

// 单位信息审核(预算处)
export const unitInfoAuditBudgetToolbarConfig = {
  '未处理': {
    // table工具栏配置
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-pass', name: '通过', status: 'primary' },
      { code: 'toolbar-refresh', name: '刷新' },
      {
        name: '更多',
        disabled: false,
        dropdowns: [
          { code: 'toolbar-reject', name: '退回' },
          { code: 'toolbar-log', name: '查看操作日志' }
        ]
      }
    ]
  },
  '已处理': {
    // table工具栏配置
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-log', name: '查看操作日志', status: 'primary' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  },
  '被退回': {
    // table工具栏配置
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-pass', name: '通过', status: 'primary' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  }
}

// 职能职责维护
export const dutyMaintainToolbarConfig = {
  default: {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '新增', status: 'primary' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  }
}

// 项目标签维护
export const projectTagsToolbarConfig = {
  default: {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      { code: 'toolbar-insert', name: '新增', callback: function () { console.log('进入自定义方法') } },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-view', name: '查看详情' }
    ]
  }
}

// 专项资金目录授权
export const catalogAuthorizeToolbarConfig = {
  default: {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-authorize', name: '授权', status: 'primary' }
    ]
  }
}

// 任务模板维护
export const taskTemplateMaintainToolbarConfig = {
  default: {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-authorize', name: '授权', status: 'primary' }
    ]
  }
}

// 项目测算模板维护
export const projectCalculateToolbarConfig = {
  default: {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '新增', status: 'primary' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-delete', name: '删除' }
    ]
  }
}

// 支出标准审核（非人员公用标准）
export const PayStandardCheckToolBarConfig = {
  moneyConversion: false,
  '待处理': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-pass', name: '通过', status: 'primary' },
      { code: 'toolbar-reject', name: '退回' },
      { code: 'toolbar-refresh1', name: '刷新' }
    ]
  },
  '已处理': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh2', name: '刷新' }
    ]
  }
}
// 支出标准维护（人员公用标准）
export const PayMaintainToolBarConfig = {
  default: {
    refresh: false,
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '新增', status: 'primary' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-standard', name: '标准适用范围' },
      { code: 'toolbar-unit', name: '单位对标准' },
      { code: 'toolbar-refresh', name: '刷新' }
    ]
  }
}
// 支出标准维护（非人员公用标准）
export const PayExamineToolBarConfig = {
  '待处理': {
    // table工具栏配置
    moneyConversion: false,
    buttons: [
      { code: 'toolbar-insert', name: '新增', status: 'primary' },
      { code: 'toolbar-edit', name: '修改' },
      { code: 'toolbar-pass', name: '送审' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-refresh1', name: '刷新' }
    ]
  },
  '已处理': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh2', name: '刷新', status: 'primary' },
      { code: 'toolbar-withdraw', name: '撤回' }
    ]
  }
}
// 人员信息维护
export const MsgDirectorToolBarConfig = {
  '已储备': {
    // table工具栏配置
    buttons: [
      // { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      // {
      //   name: '新增',
      //   disabled: false,
      //   code: 'toolbar-insert',
      //   status: 'primary'
      //   // dropdowns: [
      //   //   {
      //   //     code: 'xinzenglingu',
      //   //     name: '新增临雇',
      //   //     type: 'text',
      //   //     disabled: false
      //   //   },
      //   //   {
      //   //     code: 'xinzengzaizhi',
      //   //     name: '新增在职',
      //   //     type: 'text',
      //   //     disabled: true
      //   //   },
      //   //   {
      //   //     code: 'xinzenglixiu',
      //   //     name: '新增离休',
      //   //     type: 'text',
      //   //     disabled: false
      //   //   }]
      // },
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-sync', name: '同步' }
      // { code: 'toolbar-delete', name: '删除' }
      // { code: 'toolbar-log', name: '删除' },
      // { code: 'toolbar-refresh', name: '送审' }
    ]
  },
  'wcl': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' }
    ]
  },
  '被退回': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      { code: 'toolbar-refresh', name: '送审' }
    ]
  },
  '已储备（未使用的）': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      { code: 'toolbar-refresh', name: '退休' },
      { code: 'toolbar-refresh', name: '批量调整' },
      { code: 'toolbar-refresh', name: '注销' },
      { code: 'toolbar-refresh', name: '导出' },
      {
        name: '更多',
        disabled: false,
        dropdowns: [
          {
            code: 'xinzenglingu',
            name: '打印',
            type: 'text',
            disabled: false
          },
          {
            code: 'other2',
            name: '调入',
            type: 'text',
            disabled: true
          },
          {
            code: 'other3',
            name: '调出',
            type: 'text',
            disabled: false
          }]
      }
    ]
  }
}
export const MsgDirectorToolBarConfigx = {
  '已储备': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      { code: 'toolbar-refresh', name: '退休' },
      { code: 'toolbar-refresh', name: '批量调整' },
      { code: 'toolbar-refresh', name: '注销' },
      { code: 'toolbar-refresh', name: '导出' },
      {
        name: '更多',
        disabled: false,
        dropdowns: [
          {
            code: 'other1',
            name: '打印',
            type: 'text',
            disabled: false
          },
          {
            code: 'other2',
            name: '调入',
            type: 'text',
            disabled: true
          },
          {
            code: 'other3',
            name: '调出',
            type: 'text',
            disabled: false
          }]
      }
    ]
  }
}
// 人员信息审核（主管部门）
export const PersonInfoCheckSuperToolBar = {
  '未处理': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '刷新', status: 'primary' },
      { code: 'toolbar-delete', name: '通过' },
      { code: 'toolbar-import', name: '退回' }
    ]
  },
  '已处理': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '刷新', status: 'primary' },
      { code: 'toolbar-import', name: '撤回' }
    ]
  },
  '被退回': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '刷新', status: 'primary' },
      { code: 'toolbar-delete', name: '通过' },
      { code: 'toolbar-import', name: '退回' }
    ]
  },
  '曾经办': {
    // table工具栏配置
    buttons: [
      { code: 'toolbar-insert', name: '刷新', status: 'primary' }
    ]
  }
}
// 人员及公用项目查看
export const PersonPublicProjectReviewToolBarConfig = {
  'detail': {
    // table工具栏配置
    moneyConversion: true,
    search: false,
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      // { code: 'toolbar-detail', name: '查看详情' },
      { code: 'toolbar-cal', name: '重新测算' }
      // { code: 'toolbar-standard', name: '确认' }
    ]
  },
  'attachment': {
    buttons: [
      { code: 'toolbar-upload', name: '上传', status: 'primary' },
      { code: 'toolbar-add', name: '新增行', status: 'primary' },
      { code: 'toolbar-copy', name: '复制行' },
      { code: 'toolbar-delete', name: '删除行' }
    ]
  }
}
export const tableConfig = {
  globalConfig: {
    // 全局配置
    checkType: 'checkbox', // hasCheckbox
    seq: true, // 序号列
    hasOptionRow: false // 操作列
  },
  formatters: {},
  filters: {},
  cellRenderConfig: {
  },
  sorts: {
  },
  renderers: {
    personality: {
      renderDefault(h, cellRender, { row, column }, context) {
        let sex = ['女', '男']
        let age = ['优秀青年', '杰出中年', '颐养天年']
        let result = age[Math.floor(row.age / 25)] + sex[row.sex]
        return [<span class="text" > {result} </span>]
      }
    }
  },
  methods: {
    // 用户自定义配置对应事件
    toolbarButtonClickEvent(obj, context, e) {
      context.$parent.onToolBarBtnClick(obj, context, e)
    },
    onOptionRowClick({ row, optionType }) {
      console.log(this)
      switch (optionType) {
        case 'delete':
          console.log('delete', row)
          break
        case 'edit':
          console.log('edit', row)
          break
        case 'report':
          console.log('report', row)
          break
        case 'detail':
          console.log('detail', row)
          break
        default:
      }
    }
  },
  axiosDatas: { // 全局请求数据方法，必须为一个异步

  }
}
