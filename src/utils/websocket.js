import store from '@/store/index'
class WebSocketClass {
  constructor(socketProxyUrl = '/dfr/websocket/', params = store.state.userInfo.guid, callback) {
    this.socketProxyUrl = `${socketProxyUrl}/${params}`
    this.params = params
    this.callback = callback
    this.connect()
  }
  connect() { // 建立连接
    try {
      this.ws = new WebSocket(this.socketProxyUrl)
      this.ws.onopen = e => {
        this.status = 'open'
        // this.heartCheck()
        this.ws.onmessage = this.callback
      }
    } catch (e) {
      console.log('建立连接失败重新请求', e)
      this.connect()
    }
    this.ws.onerror = (e) => {
      console.log('连接出现错误', e)
    }
    this.ws.onclose = (e) => {
      console.log('连接关闭', e)
      this.close()
    }
  }
  changePingPong(val) {
    this.pingPong = val
  }
  closeHandle() {
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.status !== 'close') {
      this.close() // 重连
    } else {
      console.log('websocket手动关闭,或者正在连接')
    }
  }
  close() {
    clearInterval(this.pingInterval)
    clearInterval(this.pongInterval)
    this.status = 'close'
    this.ws.close()
  }
}
export default WebSocketClass
