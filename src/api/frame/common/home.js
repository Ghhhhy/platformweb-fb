// 主页 @author黄丹

import { post, get, put } from '@/api/http'
export default {
  // 即时通讯
  // 消息保存
  doMessageSave(params) {
    return post('mp-b-message-service/v1/msg', params)
  },
  // 更新数据库未读条数
  doUpdateNum(params) {
    return put('mp-b-message-service/v1/msg', params)
  },
  // 根据发送人guid查询右侧列表
  doQueryRightMsg(params) {
    return get('mp-b-message-service/v1/rightmsg', params)
  },
  // 获取所有未读消息总数
  doGetUnreadNum(params) {
    return get('mp-b-message-service/v1/unreadnum', params)
  },
  // 左侧聊过天的用户列表，按照区划层级显示
  doGetLeftMsg(params) {
    return get('mp-b-message-service/v2/leftmsg', params)
  },
  // 左侧聊过天的用户列表，搜索功能，搜索结果按照区划层级显示
  doQueryChattedSearch(params) {
    return get('mp-b-message-service/v2/search', params)
  },
  // 左侧聊过天的用户搜索功能，搜索结果按照区划层级显示
  doGetUser(params) {
    return get('mp-b-message-service/v2/users', params)
  },
  // 智能推荐
  // 接收前端采集的用户行为数据
  doSaveBehavior(params) {
    return post('mp-d-aggregation-service/v1/collector/behavior', params)
  },
  // 智能推荐
  doReaommend(params) {
    return get('mp-d-ir-service/v1/operation/user', params)
  },
  // 问题上报
  doErrorFeedback(params) {
    return post('mp-t-log-service/v1/statistics', params)
  }
}
