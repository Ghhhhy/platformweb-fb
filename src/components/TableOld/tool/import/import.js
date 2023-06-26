/* eslint-disable no-useless-constructor */
/*
 * describe:  基于vxe-table vxe-grid数据格式的导出工具类函数 基础版
 * @Date:   2020-09-02
 * Author: Titans@2396757591@qq.com
 * @Last Modified time: 2020-09-3
 */
// import { columns, datas } from './testData.js'
import xlsx from '../export/util/xlsx'
import XlsxTool from 'xlsx'
export class Import {
  constructor(gloabelConfig = {}) {
    this.xlsx = xlsx
    this.XlsxTool = XlsxTool
    this.inputTag = document.createElement('input')
    this.inputTag.setAttribute('type', 'file')
    this.inputTag.setAttribute('accept', '.xlsx')
    this.inputTag.setAttribute('multiple', false)
    this.inputTag.addEventListener('change', function (e) {
      const files = e.target.files
      this.readWorkbookFromLocalFile(files)
    })
    this.importHistory = [] // 导出历史记录
  }
  selectFile() {
    this.inputTag.click()
  }
  readWorkbookFromLocalFile(files, callback) {
    // 读取本地excel文件
    let self = this
    let reader = new FileReader()
    reader.onload = function(e) {
      let data = e.target.result
      let workbook = self.XlsxTool.read(data, { type: 'binary' })
      if (callback) callback(workbook)
    }
    reader.readAsBinaryString(files)
  }

  readWorkbookFromRemoteFile(url, callback) {
    // 从网络上读取某个excel文件，url必须同域，否则报错
    let self = this
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onload = function(e) {
      if (xhr.status === 200) {
        var data = new Uint8Array(xhr.response)
        var workbook = self.xlsx.read(data, { type: 'array' })
        if (callback) callback(workbook)
      }
    }
    xhr.send()
  }
  outputWorkbook(workbook) {
    // 读取 excel文件
    var sheetNames = workbook.SheetNames // 工作表名称集合
    sheetNames.forEach(name => {
      var worksheet = workbook.Sheets[name] // 只能通过工作表名称来获取指定工作表
      for (var key in worksheet) {
        // v是读取单元格的原始值
        console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v)
      }
    })
  }
  readWorkbook(workbook) {
    var sheetNames = workbook.SheetNames // 工作表名称集合
    var worksheet = workbook.Sheets[sheetNames[0]] // 这里我们只读取第一张sheet
    var csv = this.xlsx.utils.sheet_to_csv(worksheet)
    console.log(csv)
  }
  csv2sheet(csv) {
    // csv转sheet对象
    var sheet = {} // 将要生成的sheet
    csv = csv.split('\n')
    csv.forEach(function(row, i) {
      row = row.split(',')
      if (i === 0) sheet['!ref'] = 'A1:' + String.fromCharCode(65 + row.length - 1) + (csv.length - 1)
      row.forEach(function(col, j) {
        sheet[String.fromCharCode(65 + j) + (i + 1)] = { v: col }
      })
    })
    return sheet
  }
}

// 2.2 .1.Workbook Object
// workbook里面有什么东西呢， 我们打印出来看一下：
// 可以看到， SheetNames里面保存了所有的sheet名字， 然后Sheets则保存了每个sheet的具体内容（ 我们称之为Sheet Object）。 每一个sheet是通过类似A1这样的键值保存每个单元格的内容， 我们称之为单元格对象（ Cell Object）：

// 2.2 .2.Sheet Object
// 每一个Sheet Object表示一张表格， 只要不是!开头的都表示普通cell， 否则， 表示一些特殊含义， 具体如下：

// sheet['!ref']： 表示所有单元格的范围， 例如从A1到F8则记录为A1: F8；
// sheet[!merges]： 存放一些单元格合并信息， 是一个数组， 每个数组由包含s和e构成的对象组成， s表示开始， e表示结束， r表示行， c表示列；
// 等等；
// 2.2 .3.单元格对象
// 每一个单元格是一个对象（ Cell Object）， 主要有t、 v、 r、 h、 w等字段（ 详见这里）：
// t： 表示内容类型， s表示string类型， n表示number类型， b表示boolean类型， d表示date类型， 等等
// v： 表示原始值；
// f： 表示公式， 如B2 + B3；
// h： HTML内容
// w： 格式化后的内容
// r： 富文本内容rich text
// 等等
// 2.2 .4.读取workbook
// 根据!ref确定excel的范围， 再根据!merges确定单元格合并（ 如果有）， 最后输出整个table， 比较麻烦， 幸运的是， 插件自身已经写好工具类XLSX.utils给我们直接使用， 无需我们自己遍历， 工具类输出主要包括如下：

// 常用的主要是：

// XLSX.utils.sheet_to_csv： 生成CSV格式
// XLSX.utils.sheet_to_txt： 生成纯文本格式
// XLSX.utils.sheet_to_html： 生成HTML格式
// XLSX.utils.sheet_to_json： 输出JSON格式
// 常用的主要是sheet_to_csv或者sheet_to_html， 转csv的话会忽略格式、 单元格合并等信息， 所以复杂表格可能不适用。 转html的话会保留单元格合并， 但是生成的是 < html > < /html>代码，而不是<table></table > ，需要对表格进行一些定制时不太方便， 所以具体还是要视情况来采用合适的工具类。2.2.4. 读取workbook
// 普通方法：
// // 读取 excel文件
// function outputWorkbook(workbook) {
//  var sheetNames = workbook.SheetNames; // 工作表名称集合
//  sheetNames.forEach(name => {
//    var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
//    for(var key in worksheet) {
//     // v是读取单元格的原始值
//     console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
//    }
//  });
// }
// aoa_to_sheet: 这个工具类最强大也最实用了， 将一个二维数组转成sheet， 会自动处理number、 string、 boolean、 date等类型数据；
// table_to_sheet: 将一个table dom直接转成sheet， 会自动识别colspan和rowspan并将其转成对应的单元格合并；
// json_to_sheet: 将一个由对象组成的数组转成sheet；
