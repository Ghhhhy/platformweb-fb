export default {
  resolveResult(cb, res) {
    if (res) {
      if (res.code === '100000') {
        cb(res.data)
      } else {
        if (res.errorInfor && res.errorInfor.response && res.errorInfor.response.data) {
          this.$XModal.message({ status: 'error', message: `错误：[${res.errorInfor.response.data.msg}]` })
        }
        if (res.msg) {
          this.$XModal.message({ status: 'error', message: `错误：[${res.msg}]` })
        }
      }
    } else {
      this.$XModal.message({ status: 'error', message: '服务错误，请查看日志' })
      console.log(res)
    }
  },
  handleHttpMethod(promise, needLoading = false, message) {
    let loading = {
      close: () => { }
    }
    if (needLoading) {
      loading = this.$loading({
        lock: true,
        text: message || '正在请求中',
        spinner: 'ri-loader-4-line roll',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    }
    return new Promise((resolve, reject) => {
      promise.then(res => {
        if (res) {
          if (res.code === '100000') {
            resolve({ data: res.data })
          } else {
            console.log(res.errorInfor)
            if (res.code === 0) {
              this.$XModal.message({ status: 'error', message: res.errorInfor.response.data.msg })
            } else if (res.msg) {
              this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
            } else if (res.message) {
              this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.message}]` })
            } else {
              this.$XModal.message({ status: 'error', message: '未知错误' })
            }
          }
        } else {
          this.$XModal.message({ status: 'error', message: '内部服务错误，请查看日志' })
          console.log(res)
        }
        loading.close()
        resolve(false)
      }).catch(err => {
        loading.close()
        this.$XModal.message({ status: 'error', message: '网络连接失败，请查看日志' })
        console.log(err)
        resolve(false)
      })
    })
  }
}
