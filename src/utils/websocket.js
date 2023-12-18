import store from '@/store/index'
import { httpGlobalGatewayAgent } from '@/api/http'
const statusMap = {
  CONNECTING: 0, // 正在连接。
  OPEN: 1, // 连接成功，可以通信。
  CLOSING: 2, // 2，连接正在关闭。
  CLOSED: 3// 连接已经关闭，或者打开连接失败。
}
/* eslint-disable-next-line */
class WebSocketClass {
  constructor(config, methods = {}) {
    this.heartStatus = ''
    const defaultConfig = {
      protocol: 'ws:',
      URL: `dfr-monitor-service/dfr/websocket/${store.state.userInfo.guid}`,
      params: {},
      openHeartCheck: false, // 是否开启心跳检查
      autoConnect: true, // 自动连接
      duration: 400, // 心跳检测时间间隔ms 推荐400ms ~ 2000ms
      pingStr: 'ping', // 心跳检测sendStr
      pongStr: 'pong', // 心跳检测响应str
      ...config
    }
    this.methods = methods
    this.init(defaultConfig)
    if (this.defaultConfig.autoConnect) {
      this.connect()
    }
  }
  init(defaultConfig) {
    this.closeHeartCheck()
    let { baseURL, url } = httpGlobalGatewayAgent(defaultConfig.URL)
    const pattern = /^https?:/
    baseURL = baseURL.replace(pattern, defaultConfig.protocol)
    this.defaultConfig = {
      ...defaultConfig,
      URL: `${baseURL}/${url}`
    }
    this.successColorLog('ws初始化成功', this)
  }
  connect() { // 建立连接
    const { onopen, onmessage, onerror, onclose } = this.methods
    try {
      this.ws = new WebSocket(this.defaultConfig.URL)
      this.ws.onopen = async (e) => {
        this.successColorLog('ws连接成功')
        await onopen?.(this.defaultConfig, this, e)
        if (this.defaultConfig.openHeartCheck) {
          this.openHeartCheck()
        }
      }
      this.ws.onmessage = async(e) => {
        if (this.defaultConfig.openHeartCheck && e.data === this.defaultConfig.pongStr) {
          this.heartStatus = e.data
        }
        await onmessage?.(JSON.parse(e.data), this.defaultConfig, this, e)
      }
    } catch (e) {
      this.failColorLog('ws建立连接失败', e)
      this.reconect()
    }
    this.ws.onerror = async(e) => {
      await onerror?.(this, e)
      this.failColorLog('连接出现错误')
    }
    this.ws.onclose = async(e) => {
      await onclose?.(this, e)
      this.successColorLog('连接关闭')
      this.close()
    }
  }
  openHeartCheck() {
    window.pingInterval = setInterval(() => {
      if (this.ws.readyState === statusMap.OPEN) {
        this.ws.send(this.defaultConfig.pingStr) // 客户端发送消息
      }
    }, this.defaultConfig.duration)
    window.pongInterval = setInterval(() => {
      if (this.heartStatus === this.defaultConfig.pingStr) {
        this.failColorLog('心跳检测未反应，重连中..')
        this.closeHeartCheck()
        this.reconect()
      }
      this.heartStatus = 'ping'
    }, 5000)
  }
  closeHeartCheck() {
    clearInterval(window.pingInterval)
    clearInterval(window.pongInterval)
    window.pingInterval = undefined
    window.pongInterval = undefined
  }
  reconect() {
    setTimeout(() => {
      this.connect()
    }, 1000)
  }
  successColorLog(str) {
    console.log(`%c${str}`, 'background: green;color:white;padding:2px;border-radius:2px;')
  }
  failColorLog(str) {
    console.log(`%c${str}`, 'background: red;color:white;padding:2px;border-radius:2px;')
  }
  closeHandle() {
    // 因为webSocket并不稳定，规定只能手动关闭(调closeMyself方法)，否则就重连
    if (this.ws.readyState === 1) {
      this.close()
    } else {
      this.failColorLog('websocket关闭中,或者正在连接')
    }
  }
  close() {
    this.closeHeartCheck()
    this.ws.close()
  }
}
export default WebSocketClass
