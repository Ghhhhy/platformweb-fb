import personMsgEgis from './personManage/personMsgEgis'
import personMsgEgisBasic from './personManage/personMsgEgisBasic'
import personalMsgEgisExtend from './personManage/personalMsgEgisExtend'
import unitMsg from './unitInfoManage/unitMsg'

export default {
  ...personMsgEgis,
  ...personMsgEgisBasic,
  ...personalMsgEgisExtend,
  ...unitMsg
}
