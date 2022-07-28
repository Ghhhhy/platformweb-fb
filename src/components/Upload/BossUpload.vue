<!--文件上传组件-->
<template>
  <div v-show="isShow" class="bs-file__upload">
    <el-upload
      ref="uploadFile"
      :show-file-list="false"
      :multiple="multiple"
      :limit="limit"
      :accept="accept"
      action=""
      :data="uploadparams"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="onProgress"
      :before-upload="onbeforeUpload"
      :on-exceed="onExceed"
      style="display: inline-block;"
    >
      <el-button size="small" type="primary" :class="className">上传</el-button>
    </el-upload>

  </div>
</template>

<script>
import { defaultServerUri } from './config'
import comUi from '@/components/index.js'
// import Base64 from '@/utils/base64'
import Store from '@/utils/store'
const USER_INFO = 'userInfo'
export default {
  name: 'BossUpload',
  props: {
    isShow: {
      type: Boolean
    },
    limit: {
      type: Number,
      default: 1
    },
    size: {
      // 输入框尺寸 medium/small/mini
      type: String,
      default: ''
    },
    editActived: {
      type: Boolean
    },
    openLoading: {
      type: Boolean,
      default() {
        return true
      }
    },
    uniqeName: {
      type: String,
      default: 'bs-upload__input'
    },
    queryparams: {
      // 查询参数
      type: Object,
      default() {
        return {}
      }
    },
    deleteparams: {
      // 删除参数
      type: Object,
      default() {
        return {}
      }
    },
    downloadparams: {
      // 下载参数
      type: Object,
      default() {
        return {}
      }
    },
    minServer: {
      // 获取数据访问uri，可自定义
      type: Object,
      default() {
        return defaultServerUri
      }
    },
    afterUpload: {
      // 上传后回调
      type: Function,
      default: function(datas) {}
    },
    afterDelete: {
      // 删除后回调
      type: Function,
      default: function(datas) {}
    },
    queryConfig: {
      type: Object,
      default() {
        return {}
      }
    },
    accept: {
      type: String,
      default: 'image/*,.doc,.docx,.xls,.xlsx,.txt,.pdf,.jpg,.jpeg,.png,.txt,.7z,.zip,.rar'
      // 上传文件格式不正确，正确格式为doc，docx ，xls，xlsx ，txt ，pdf，jpg，jpeg，png
    }

  },
  data() {
    return {
      serverUri: {},
      className: this.uniqeName,
      uploadparams: this.queryparams,
      delparams: this.deleteparams,
      downparams: this.downloadparams,
      userInfo: Store(USER_INFO),
      queryConfigFn: this.queryConfig

    }
  },
  computed: {
    multiple() {
      return this.limit > 1
    },
    appid() {
      if (this.$store.state.curNavModule.appid === undefined ||
        this.$store.state.curNavModule.appid === '' ||
        this.$store.state.curNavModule.appid === null) {
        return 'pay'
      } else {
        return this.$store.state.curNavModule.appid
      }
    }
  },
  components: {

  },

  methods: {
    upload() {
      const mm = document.getElementsByClassName(`${this.className}`)[0].parentNode.children[1]
      mm.click()
    },
    // 获取参数
    getParams(file) {
      let param = new FormData() // 创建form对象
      param.append('file', file)
      param.append('filename', file.name)
      param.append('appid', this.appid)
      param.append('billguid', this.uploadparams.billguid || '')
      param.append('doctype', this.uploadparams.doctype || '')
      param.append('year', this.userInfo.year)
      param.append('province', this.userInfo.province)
      param.append('userguid', this.userInfo.guid)
      let queryConfigFnKeys = Object.keys(this.queryConfigFn)
      if (queryConfigFnKeys.length) {
        queryConfigFnKeys.forEach((key) => {
          param.append(key, this.queryConfigFn[key])
        })
      }
      // param.append('oldnode', this.uploadparams.oldnode || '')
      // param.append('status', this.uploadparams.status || '')
      // param.append('tablename', this.uploadparams.tablename || '')
      // param.append('currnode', this.uploadparams.currnode || '')
      // param.append('guid', this.uploadparams.guid || '')
      // param.append('guids', this.uploadparams.guids || '')
      // param.append('datatype', this.uploadparams.datatype || '')
      // param.append('batchno', this.uploadparams.batchno || '')
      // param.append('reportguid', this.uploadparams.reportguid || '')
      // param.append('fields', this.uploadparams.fields || '')
      // param.append('complex', this.uploadparams.complex || '')
      return param
    },

    onbeforeUpload(file) {
      //  校验处理
      if (!this.checkAccept(file)) {
        return
      }
      //  校验处理
      this.openLoading && comUi.utilsLib.LoadingMark.showLoadingMark('', '上传中......')
      const params = this.getParams(file)
      this.$http[this.serverUri.upload.ajaxType](this.serverUri.upload.serverUri, params, null, 'multipart/form-data', 'openapi').then(res => {
        if (res.rscode === '100000') {
          this.$message({ showClose: true, message: '上传成功!', type: 'success' })
          this.afterUpload(file, res.data)
        } else {
          this.$message({ showClose: true, message: '上传失败!', type: 'error' })
        }
        this.openLoading && comUi.utilsLib.LoadingMark.removeLoadingMark()
      }).catch(err => {
        console.log(err)
        this.openLoading && comUi.utilsLib.LoadingMark.removeLoadingMark()
      })
    },

    checkAccept(file) {
      var fileSuffix = file.name.substring(file.name.lastIndexOf('.'))
      if (this.accept === '*/*') {
        return true
      }

      let acceptArr = this.accept.split(',')
      let aceepts = acceptArr.map((item, i) => { return item.toLowerCase() })
      if (!aceepts.includes(fileSuffix.toLowerCase())) {
        this.$message({
          message: `上传文件只能是${this.accept}格式!`,
          type: 'warning'
        })
        return false
      } else {
        return true
      }
    },

    // 上传文件
    uploadFiles(files) {
      console.log(33, files)
    },

    // 删除单个或多个文件
    deleteFile() {
      const params = {
        appid: this.appid,
        ...this.deleteparams
      }

      this.$http[this.serverUri.delete.ajaxType](this.serverUri.delete.serverUri, params, '', '', 'params').then(res => {
        if (res.rscode === '100000') {
          this.$message({ showClose: true, message: '删除成功!', type: 'success' })
          this.afterDelete()
        } else {
          this.$message({ showClose: true, message: '删除失败!', type: 'error' })
        }
      }).catch(err => {
        console.log(err)
      })

      // this.$confirm('确认要删除吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$http[this.serverUri.delete.ajaxType](this.serverUri.delete.serverUri, params, '', '', 'params').then(res => {
      //     if (res.rscode === '100000') {
      //       this.$message({ showClose: true, message: '删除成功!', type: 'success' })
      //       this.afterDelete()
      //     } else {
      //       this.$message({ showClose: true, message: '删除失败!', type: 'error' })
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // }).catch(() => {

      // })
    },

    downloadFileFile() {
      const params = {
        appid: this.appid,
        ...this.downparams
      }
      this.$http[this.serverUri.fileExist.ajaxType](this.serverUri.fileExist.serverUri, params).then(res => {
        if (res.rscode === '100000') {
          // console.log(555, this.$http.httpGlobalGatewayAgent(this.serverUri.download.serverUri))
          // const urlObj = this.$gloableToolFn.getFileUrl() + '/v2/stream/download'
          const urlObj = 'http://10.77.18.172:32306/v2/stream/download'
          const downLoadUrl = `${urlObj}?appid=${this.appid}&fileguid=${this.downparams.fileguid}`

          // 通过JS打开新窗口会被拦截，换一种实现方式: 先打开页面, 后更改页面地址
          let tempwindow = window.open('_blank')
          tempwindow.location = downLoadUrl
          // window.open(downLoadUrl)
        } else {
          this.$message({ showClose: true, message: '文件不存在!', type: 'error' })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    downloadFile() {
      const params = {
        appid: this.appid,
        ...this.downparams
      }
      this.$http[this.serverUri.fileExist.ajaxType](this.serverUri.fileExist.serverUri, params).then(res => {
        if (res.rscode === '100000') {
          // console.log(555, this.$http.httpGlobalGatewayAgent(this.serverUri.download.serverUri))
          const urlObj = this.$http.httpGlobalGatewayAgent(this.serverUri.download.serverUri)
          const downLoadUrl = `${urlObj.baseURL}/${urlObj.url}?appid=${this.appid}&fileguid=${this.downparams.fileguid}`

          // 通过JS打开新窗口会被拦截，换一种实现方式: 先打开页面, 后更改页面地址
          let tempwindow = window.open('_blank')
          tempwindow.location = downLoadUrl
          // window.open(downLoadUrl)
        } else {
          this.$message({ showClose: true, message: '文件不存在!', type: 'error' })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 下载问题
    downloadFileBak() {
      const params = {
        appid: this.appid,
        ...this.downparams
      }
      this.$http[this.serverUri.download.ajaxType](this.serverUri.download.serverUri, params).then(res => {
        const code = res.headers.rscode
        const filename = res.headers.filename
        if (Number(code) === 100000) {
          const fileName = decodeURI(filename)
          const fileContent = res.data

          let blob = new Blob([fileContent], { type: 'application/octet-stream' })

          // const blob = new Blob([fileContent])
          if ('download' in document.createElement('a')) { // 非IE下载
            const a = document.createElement('a')
            a.download = fileName
            a.style.display = 'none'
            let url = URL.createObjectURL(blob)
            a.href = url
            document.body.appendChild(a)
            a.click()
            URL.revokeObjectURL(url) // 释放URL 对象
            document.body.removeChild(a)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        } else {
          this.$message({ showClose: true, message: '下载异常!', type: 'error' })
        }
      }).catch(err => {
        this.$message({ showClose: true, message: '下载异常!', type: 'error' })
        console.log(err)
      })
    },

    // 获取文件列表
    getFileList() {
      return new Promise((resolve, reject) => {
        this.$http['get']('fileservice/v2/files', this.queryparams).then(res => {
          if (res.rscode === '100000') {
            resolve(res.data || res.result)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 服务参数合并
    mixinsServerUri() {
      this.serverUri = Object.assign({}, defaultServerUri, this.minServer)
    },

    // 上传成功钩子
    uploadSuccess(res, file, fileList) {
      console.log('success', res, file, fileList)
    },

    // 上传失败钩子
    uploadError(err, file, fileList) {
      console.log('error', err, file, fileList)
    },

    // 上传进度钩子
    onProgress(e, file, fileList) {
      console.log('progress', e, file, fileList)
    },

    // 选则文件超出最大限制个数
    onExceed(files, fileList) {
      this.$message({ showClose: true, message: `选择的文件超过最大设置数${this.limit}了!`, type: 'error' })
    }
  },
  mounted() {
    this.mixinsServerUri()
  },
  watch: {
    className(val) {
      this.className = val
    },
    minServer: {
      handler(newValue, oldValue) {
        this.mixinsServerUri()
      },
      deep: true,
      immediate: true
    },
    queryparams: {
      handler(newValue, oldValue) {
        this.uploadparams = this.queryparams
      },
      deep: true,
      immediate: true
    },
    deleteparams: {
      handler(newValue, oldValue) {
        this.delparams = this.deleteparams
      },
      deep: true,
      immediate: true
    },
    downloadparams: {
      handler(newValue, oldValue) {
        this.downparams = this.downloadparams
      },
      deep: true,
      immediate: true
    },
    queryConfig: {
      handler(newValue, oldValue) {
        this.queryConfigFn = newValue
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
