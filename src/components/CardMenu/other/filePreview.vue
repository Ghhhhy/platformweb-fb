<template>
  <el-dialog :close-on-click-modal="false" :title="file.name + file.suffix" :visible.sync="dialogVisible" @closed="onCloseClick">
    <div slot="title">
      <span style="font-size:18px">{{ file.name + file.suffix }}</span>
      <el-divider />
    </div>
    <div>
      <!-- 图片 -->
      <el-image
        v-if="fileType === 'img'"
        :src="url"
        fit="contain"
      />
      <!-- 视频 -->
      <video-player
        v-if="fileType === 'video'"
        class="video-player vjs-custom-skin"
        :playsinline="true"
        :options="positivePlayerOptions"
      />
      <!-- word -->
      <div v-if="fileType === 'word'" class="dialog-body-content-base-style">
        <iframe
          frameborder="0"
          :src="url"
          width="100%"
          height="500px"
        >
        </iframe>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { backHost } from '../../../static/config.js'
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
export default {
  name: 'FilePreview',
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    file: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 不支持的文件类型
      noSupportSuffixs: [],
      // 图片
      imgSuffixs: ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
      // 视频
      videoSuffixs: ['mp4', 'm2v', 'mkv'],
      // word相关
      wordSuffixs: ['docx', 'doc', 'xlsx', 'sql', 'txt'],
      // 压缩吧相关
      zipSuffixs: ['zip', 'tar'],
      dialogVisible: this.visible,
      url: backHost + '/api/storage/' + this.file.path,
      fileType: '',
      // 播放器配置
      positivePlayerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '',
          src: backHost + '/api/storage/' + this.file.path // 视频url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        },
        common: 'positivePlayer'
      }
    }
  },
  methods: {
    mountedInit() {
      // this.viewZip()
    },
    onCloseClick() {
      this.$emit('update:visible', false)
    },
    inArray(type, types) {
      let flag = false
      for (let i = 0; i < types.length; i++) {
        if (type === types[i]) {
          flag = true
          break
        }
      }
      return flag
    },
    // 将word等文件转成pdf进行预览
    toPdf() {
      window.open('/fileView.html?fileguid=' + this.fileGuid + '&appid=' + this.appId)
      // let self = this
      // self.url = ''
      // self.$axios('get', '/api/storage/nologin/toPdfFile', { serviceId: 'duke-storage', fileId: self.file.id }).then(data => {
      //   self.url = backHost + '/api/storage/' + data.data
      // })
    },
    viewZip() {
      JSZipUtils.getBinaryContent(backHost + '/api/storage/nologin/duke-storage/2020/10/21/test.zip', function(err, data) {
        if (err) {
          throw err // or handle err
        }

        JSZip.loadAsync(data).then(function () {
          // ...
        })
      })
    }
  },
  mounted() {
    this.mountedInit()
  },
  watch: {
    file: {
      handler(newval) {
        let fileSuffix = this.file.suffix
        if (this.inArray(fileSuffix, this.noSupportSuffixs)) {
          this.fileType = 'noSupport'
          return
        }
        if (this.inArray(fileSuffix, this.imgSuffixs)) {
          this.fileType = 'img'
          return
        }
        if (this.inArray(fileSuffix, this.videoSuffixs)) {
          this.fileType = 'video'
          return
        }
        if (this.inArray(fileSuffix, this.wordSuffixs)) {
          this.fileType = 'word'
          this.toPdf()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.el-dialog__body{
    padding: 0 20px
}
.el-dialog__header{
    padding: 20px 20px 0px
}
</style>
