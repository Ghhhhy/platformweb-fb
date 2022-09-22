const defaultTabStatusConfig = {
  showArrow: true, // 状态按钮超出，是否显示左右箭头
  limit: 6, // 状态按钮，默认显示6个  仅支持：2，3，4，5，6 其余均会置成6
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

const buttonsNum = {
  2: 'toolbar-2__nums',
  3: 'toolbar-3__nums',
  4: 'toolbar-4__nums',
  5: 'toolbar-5__nums',
  6: 'toolbar-6__nums'
}

export {
  defaultTabStatusConfig,
  defaultServerConfig,
  buttonsNum
}
