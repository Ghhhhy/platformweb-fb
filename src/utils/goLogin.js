import Router from '@/router'

export default function goLogin() {
  console.log(window, '-------------')
  if (process.env.NODE_ENV === 'development') {
    Router.push({
      name: 'Login'
    })
  } else if (window.gloableToolFn.serverGatewayMap.gloableUrl.isLoginOutToPortal) {
    window.location.href = window.gloableToolFn.serverGatewayMap.gloableUrl.portalLoginUrl
  } else {
    Router.push({
      name: 'Login'
    })
  }
}
