
class downloadFile {
  constructor() {
    this.downloadTag = document.createElement('a')
  }
  download(objectUrl, fileName = 'download') {
    this.downloadTag.setAttribute('href', objectUrl)
    this.downloadTag.setAttribute('download', fileName)
    this.downloadTag.click()
  }
}
export default downloadFile
