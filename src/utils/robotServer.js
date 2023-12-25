export const robotServe = async (self) => {
  const param = {
    'appid': 'yusuanyitihua',
    'secret': 'c19a66552b5163ea828e01e99e039bac'
  }
  const userInfo = self.$store.state.userInfo
  let res = await self.$http.get('gdzsApi/prod-api/api/kf/getToken', param)
  if (res.token) {
    let res1 = await self.$http.get('gdzsApi/prod-api/api/kf/getTokenInfo', { token: res.token })
    if (res1.status === 1) {
      if (self.sdkOption?.options) {
        self.sdkOption.destroy() // 销毁客服助手历史对象并执行清理释放资源
      }
      /* eslint-disable-next-line */
      const sdk = new LHXXSDK({
        iconUrl: `${window.location.origin}/pay/lhxx-js/gdzs1.png`,
        bottom: 10,
        right: 10,
        width: 100,
        height: 100,
        iframeTop: '50%',
        iframeLeft: '50%',
        iframeWidth: '60', // 或者固定宽度 如：500px
        iframeHeight: '50', // 或者固定高度 如：400px
        tokenCode: res.token,
        userType: userInfo.usertype, // 1为单位用户、2为财政用户、3为管理员、4为代理机构
        userName: userInfo.name, // 预算一体化登录用户
        phone: userInfo.phonenumber, // 用户手机号
        companyId: userInfo.orgguid, // 单位ID
        companyCode: userInfo.orgcode, // 单位编码
        companyName: userInfo.orgname, // 单位名称
        areaCode: userInfo.province, // 地区编码
        areaName: userInfo.admdivname, // 地区名称
        moduleCode: userInfo.app.code, // 预算一体化应用模块编码
        moduleName: userInfo.app.name, // 预算一体化应用模块名称
        sourceMenu: self.$store.state.curNavModule.name || `${userInfo.app.name}-首页` // 预算一体化应用模块对应功能菜单名称
      })
      self.sdkOption = sdk // 存储客服助手对象
      sdk.init()// 初始化工单助手
    }
  }
}
