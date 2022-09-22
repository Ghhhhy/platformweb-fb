export default {
  data() {
    return {
      param5: {}
    }
  },
  computed: {
    curNavModule() {
      // 获取当前菜单信息
      return this.$store.state.curNavModule
    },
    userInfo() {
      // 获取用户信息
      return this.$store.state.userInfo
    }
  },
  methods: {
    initParams5() {
      // 初始化param5
      let param5Str = this.curNavModule.param5
      if (param5Str && param5Str !== '') {
        let param5Strs = param5Str.split(',')
        param5Strs.forEach(s => {
          let ss = s.split('=')
          let key = ss[0]
          let value = ss[1]
          this.param5[key] = value
        })
      }
    }
  },
  created() {
    this.initParams5()
  }
}
