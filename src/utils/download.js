import { httpGlobalGatewayAgent } from '@/api/http'
import store from '@/store/index'

export function openWindow(
  url,
  opt
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

/**
 * Download according to the background interface file stream
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export function downloadByData(data, filename, mime, bom) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', filename)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

/**
 * Download file according to file address
 * @param {*} sUrl
 */
export function downloadByUrl(url, fileName, target = '_blank') {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return false
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  openWindow(url, { target })
  return true
}

// 全局专门用于下载文件的iframe
let iframeNode = null
const iframeNodeId = 'BS_DOWNLOAD_IFRAME_NODE'
/**
 * iframe下载文件
 * @param url
 */
function downloadURLIframe(url) {
  if (!iframeNode) {
    iframeNode = document.createElement('iframe')
    iframeNode.id = iframeNodeId
    iframeNode.style.display = 'none'
    iframeNode.src = url
    document.body.appendChild(iframeNode)
  } else {
    const node = document.querySelector(`body > #${iframeNodeId}`)
    node.setAttribute('src', url)
  }
}

/**
 * 使用平台fileId下载文件
 * @param fileId
 */
export function downloadByFileId(fileId = '') {
  const { baseURL, url } = httpGlobalGatewayAgent('fileservice/v2/stream/download')
  const { tokenid, appguid } = store.getters.getLoginAuthentication
  const curDownloadUrl = `${baseURL}/${url}?tokenid=${tokenid}&appid=${appguid}&fileguid=${fileId}`
  downloadURLIframe(curDownloadUrl)
}
