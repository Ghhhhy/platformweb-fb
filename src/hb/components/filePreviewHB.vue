<template>
  <vxe-modal
    id="filePreview"
    ref="filePreviewRef"
    v-model="dialogVisible"
    width="90%"
    height="90%"
    :resize="resize"
    :dblclick-zoom="resize"
    storage
    transfer
    esc-closable
    :loading="loading"
    @zoom="zoomCallback"
  >
    <template v-slot:title>
      <span>{{ topTitle }}</span>
    </template>
    <template v-slot>
      <div style="text-align: center;">
        <div v-if="fileShow">
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
          <!-- 音乐 -->
          <Aplayer
            v-if="fileType === 'music'"
            :music="musicOptions"
          />
          <!-- word -->
          <div v-if="fileType === 'pdf'" class="dialog-body-content-base-style">
            <iframe
              frameborder="0"
              :src="url"
              width="100%"
              :style="style"
            >
            </iframe>
          </div>
          <div v-if="fileType === ''" style="text-align:left">
            <span style="color: red; font-weight: 700">
              <i class="vxe-icon--warning"></i>
              {{ file.suffix }}格式的文件不支持预览，请下载之后查看
            </span>
            <span>
              <el-divider content-position="left">支持如下附件类型进行预览</el-divider>
            </span>
            <div style="padding-left: 30px">
              <span>txt</span>
              <el-divider direction="vertical" />
              <span>sql</span>
              <el-divider direction="vertical" />
              <span>java</span>
              <el-divider direction="vertical" />
              <span>js</span>
              <el-divider direction="vertical" />
              <span>html</span>
              <el-divider direction="vertical" />
              <span>xml</span>
              <el-divider direction="vertical" />
              <span>css</span>
              <el-divider direction="vertical" />
              <span>yml</span>
              <br>

              <span>png</span>
              <el-divider direction="vertical" />
              <span>jpg</span>
              <el-divider direction="vertical" />
              <span>jpeg</span>
              <el-divider direction="vertical" />
              <span>bmp</span>
              <el-divider direction="vertical" />
              <span>gif</span>
              <br>

              <span>doc</span>
              <el-divider direction="vertical" />
              <span>docx</span>
              <el-divider direction="vertical" />
              <span>xlsx</span>
              <el-divider direction="vertical" />
              <span>xls</span>
              <el-divider direction="vertical" />
              <span>ppt</span>
              <el-divider direction="vertical" />
              <span>pptx</span>
              <el-divider direction="vertical" />
              <span>pdf</span>
              <br>

              <span>mp4</span>
              <el-divider direction="vertical" />
              <span>m2v</span>
              <el-divider direction="vertical" />
              <span>mkv</span>
              <br>

              <span>mp3</span>
            </div>
          </div>
        </div>
        <div v-if="errorShow">
          <span style="color: red">
            <i class="vxe-icon--warning"></i>
            附件加载失败
          </span>
        </div>
      </div>
    </template>
  </vxe-modal>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: 'FilePreviewHB',
  components: { Aplayer },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false
      }
    },
    fileGuid: {
      type: String,
      default() {
        return ''
      }
    },
    appId: {
      type: String,
      default() {
        return 'pay_voucher'
      }
    },
    topTitle: {
      type: String,
      default() {
        return '查看'
      }
    }
  },
  data() {
    return {
      resize: false,
      loading: false,
      style: {
        height: 'calc(100vh - 1px)'
      },
      errorShow: false,
      fileShow: false,
      title: '附件预览',
      // 文本类型文件后缀
      textType: ['txt', 'sql', 'java', 'js', 'html', 'xml', 'css', 'yml'],
      // 图片类型文件后缀
      imgType: ['png', 'jpg', 'jpeg', 'bmp', 'gif'],
      // office文件类型后缀
      officeType: ['doc', 'docx', 'xlsx', 'xls', 'ppt', 'pptx'],
      // pdf文件后缀
      pdfType: ['pdf'],
      // 视频类型文件后缀
      videoType: ['mp4', 'm2v', 'mkv'],
      // 音乐类型文件后缀
      musicType: ['mp3'],
      // 压缩包相关
      compressType: ['zip', 'tar'],
      // 不支持的文件类型
      notSupportType: [],
      dialogVisible: this.visible,
      url: '',
      fileType: '',
      file: {},
      musicOptions: {
        title: 'Preparation',
        // author: '',
        url: 'http://devtest.qiniudn.com/Preparation.mp3',
        // pic: 'http://devtest.qiniudn.com/Preparation.jpg',
        lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
      },
      // 播放器配置
      positivePlayerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:13', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '',
          src: '' // 视频url地址
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
      this.toPdf()
    },
    // resize回调函数，计算高度
    zoomCallback(type, $event) {
      let curModalHeight = this.$refs.filePreviewRef.getBox().style.height
      let curModalHeightNumber = curModalHeight.substring(0, curModalHeight.length - 2)
      // todo 这里要减去的应该是导航栏敢赌，现在先写死
      curModalHeightNumber = curModalHeightNumber - 65
      this.style = {
        height: curModalHeightNumber + 'px'
      }
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
      if (!this.$store.getters.isSx) {
        window.open(`${process.env.BASE_URL}fileView.html?fileguid=` + this.fileGuid + '&appid=' + this.appId)
        return
      }
      this.loading = true
      let filePreviewService = ''
      if (process.env.NODE_ENV === 'development') {
        filePreviewService = window.gloableToolFn.serverGatewayMap.development.filePreviewService
      } else if (process.env.NODE_ENV === 'production') {
        filePreviewService = window.gloableToolFn.serverGatewayMap.production.filePreviewService
      }
      const urlObj = filePreviewService + '/v1/file_preview'
      this.$http.get(urlObj, { appId: this.appId, fileId: this.fileGuid }).then(res => {
        if (res.code === 200) {
          this.file = res.data
          this.buildFileType()
          this.fileShow = true
          this.errorShow = false
          this.loading = false
        } else {
          this.$message({ type: 'warning', message: res.msg })
          this.fileShow = false
          this.errorShow = true
          this.loading = false
          this.resize = false
        }
      }).catch(error => {
        console.log(error)
        this.$message({ type: 'error', message: error })
        this.fileShow = false
        this.errorShow = true
        this.loading = false
        this.resize = false
      })
    },
    buildFileType() {
      // let fileSuffix = this.file.suffix
      let filename = this.file.filename
      this.title = filename
      let sufix = filename.substr(filename.lastIndexOf('.') + 1, filename.length) || ''
      let fileSuffix = sufix
      this.file.suffix = sufix
      let path = this.file.filepath
      let filePath = path.split('.')[0] + '.' + sufix
      let newUrl = window.gloableToolFn.serverGatewayMap.development.filePreviewService + '/' + filePath
      this.url = newUrl
      console.log(newUrl)
      this.positivePlayerOptions.sources[0].src = this.url
      if (this.inArray(fileSuffix, this.imgType)) {
        this.fileType = 'img'
      } else if (this.inArray(fileSuffix, ['pdf'])) {
        this.fileType = 'pdf'
      } else if (this.inArray(fileSuffix, this.videoType)) {
        this.fileType = 'video'
      } else if (this.inArray(fileSuffix, this.musicType)) {
        this.fileType = 'music'
        this.style = { height: '70px' }
        this.musicOptions.url = this.url
        this.musicOptions.title = this.title
      } else {
        this.fileType = ''
      }
    }
  },
  mounted() {
    this.mountedInit()
  },
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:visible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss">
</style>
