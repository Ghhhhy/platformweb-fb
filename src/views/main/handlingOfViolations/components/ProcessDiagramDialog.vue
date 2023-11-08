<template>
  <vxe-modal
    v-model="showProcessDiagramDialog"
    width="80%"
    height="82%"
    :title="title"
    @close="cancelDialogClose"
  >
    <div style="height:100%">
      <iframe
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="auto"
        :src="url"
      ></iframe>
    </div>
  </vxe-modal>
</template>
<script>
import { post } from '@/api/http'
export default {
  name: 'AddDialog',
  components: { },
  props: {
    showProcessDiagramDialog: {
      type: Boolean,
      default: false
    },
    processDefinitionId: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    dataInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      trackUrl: '/process-diagram?processInstanceId=',
      trackTitle: '流程运行轨迹图',
      commentUrl: '/process-diagram?processInstanceId=',
      commentTitle: '流程流转意见',
      defineUrl: '/process-diagram?processDefinitionId=',
      definetTitle: '流程定义图',
      procInstId: 'c927453f1b0e11ee8151fa163eb17d1a',
      processDefKey: 'lmp_warnprocess_sh',
      url: '',
      title: ''
    }
  },

  methods: {
    cancelDialogClose() {
      this.showProcessDiagramDialog = false
      this.$parent.showProcessDiagramDialog = false
    },
    getProcInstId() {
      let userInfo = this.$store.state.userInfo
      const param = {
        bizKey: this.dataInfo.id,
        processDefKey: this.processDefKey,
        province: userInfo.province,
        year: userInfo.year
      }
      post('large-monitor-platform/lmp/warnProcess/taskinfos', param).then(res => {
        if (res.rscode === '100000') {
          const procInstId = res.data[0].procInstId
          this.procInstId = procInstId
          this.setUrl()
        } else {
          this.$message.error('查询流程信息失败:' + res.result)
        }
      })
    },
    setUrl() {
      let processDiagramUrl = ''
      if (process.env.NODE_ENV === 'development') {
        processDiagramUrl = window.gloableToolFn.serverGatewayMap.development['process-diagram-service']
      } else {
        processDiagramUrl = window.gloableToolFn.serverGatewayMap.production['process-diagram-service']
      }
      if (this.type === 'track') {
        this.title = this.trackTitle
        this.url = processDiagramUrl + this.trackUrl + this.procInstId
      } else if (this.type === 'comment') {
        this.title = this.commentTitle
        this.url = processDiagramUrl + this.commentUrl + this.procInstId + '&comment=1'
      } else if (this.type === 'define') {
        this.title = this.definetTitle
        this.url = processDiagramUrl + this.defineUrl + this.processDefinitionId
      }
    }
  },
  created() {
    this.getProcInstId()
  }
}
</script>
