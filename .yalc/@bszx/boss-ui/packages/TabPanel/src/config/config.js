const defaultTabStatusConfig = {
  changeBtns: true, // 切换状态按钮时，是否切换右侧按钮组
  buttons: [], // 左侧状态按钮组  数据形式类似：statusButtons
  curButton: {}, // 左侧当前按钮   数据形式类似：curStatusButton
  buttonsInfo: {}, // 状态按钮对应的右侧按钮组对象
  methods: {
    bsToolbarClickEvent: function(obj, $this) {
      // console.log('回调方式二', obj, $this.$options, $this.$data.curTabSelect.label)
    }
  }
}

const defaultServerConfig = {
  isServer: false, // 是否开启api接口请求 默认不开启
  ajaxType: 'get', // api 请求方式
  serverUri: '', // 微服务和api  比如：'plan-service/queryTreeAssistData'
  openQuerySeach: false, // 是否查询条件改变，就自动查询  默认不查询
  queryparams: {} // 查询条件
}

const defaultStatusButtonsKey = [
  'zhibiao',
  'dbsx',
  'ybsx',
  'danju',
  'whole',
  'notreviewed',
  'reviewed',
  'waitdistributed',
  'issued',
  'generate',
  'refunded'
]

const defaultStatusButtons = {
  'whole': {
    type: 'button',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '全部',
    code: 'whole'
  },
  'notreviewed': {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '未审核',
    code: 'notreviewed'
  },
  'reviewed': {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '已审核',
    code: 'reviewed'
  },
  'zhibiao': {
    type: 'button',
    iconName: 'base-zhibaio.png',
    iconNameActive: 'base-zhibaio-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '指标额度',
    code: 'zhibiao'
  },
  'dbsx': {
    type: 'select',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '代办事项',
    code: 'dbsx',
    curValue: '',
    options: []
  },
  'ybsx': {
    type: 'select',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '已办事项',
    code: 'ybsx',
    curValue: '',
    options: []
  },
  'danju': {
    type: 'button',
    iconName: 'base-all.png',
    iconNameActive: 'base-all-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '全部单据',
    code: 'danju'
  },
  'waitdistributed': {
    type: 'button',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '待分配',
    code: 'waitdistributed'
  },
  'issued': {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '已下达',
    code: 'issued'
  },
  'generate': {
    type: 'button',
    iconName: 'base-zhibaio.png',
    iconNameActive: 'base-zhibaio-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '待生成',
    code: 'generate'
  },
  'refunded': {
    type: 'button',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png',
    iconUrlActive: '',
    iconUrl: '',
    label: '已退回',
    code: 'refunded'
  }

}

export {
  defaultTabStatusConfig,
  defaultServerConfig,
  defaultStatusButtons,
  defaultStatusButtonsKey
}
