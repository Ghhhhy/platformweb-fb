
/* eslint-disable no-useless-constructor */
/*
 * describe:  基于xlsx的导入表体实现，支持解析嵌套表头
 * @Date:   2021-08-17
 * Author: Titans@2396757591@qq.com
 * @Last Modified time: 2021-08-17
 */
// import { columns, datas } from './testData.js'
import XlsxTool from 'xlsx'
class Import {
  constructor(gloabelConfig = {}) {
    let self = this
    this.XlsxTool = XlsxTool
    this.importGlobleConf = {
      onlyParsingFirstSheet: true,
      maxSize: 1024 * 1024 * 10,
      acceptType: 'xlsx',
      theadRowIndexStart: 1,
      theadRowIndexEnd: 1,
      filename: '',
      fieldName: 'field',
      columnConfig: []
    }
    this.inputTag = document.createElement('input')
    this.inputTag.setAttribute('type', 'file')
    this.inputTag.setAttribute('accept', '.xlsx,.xls')
    this.inputTag.setAttribute('multiple', false)
    this.inputTag.addEventListener('change', function (e) {
      const files = e.target.files
      self.readWorkbookFromLocalFile(files)
    })
    this.importHistory = [] // 导入历史记录
  }
  importExcel({ config }, cb) { // 触发导入Excel动作
    this.configSource = config
    this.curImportGlobleConf = Object.assign({}, this.importGlobleConf, config)
    this.importcallback = cb
    this.selectFile(cb)
  }
  selectFile() { // 触发选取文件操作
    this.workbook = {}
    this.inputTag.value = null
    this.inputTag.click()
  }
  getUuid(hexDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') { // 获取mapid
    let s = []
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = ''
    let uuid = s.join('')
    return uuid
  }
  smallHump(str) {
    // 连字符转成小驼峰
    return str.split('_').map((item, index) => {
      return index === 0 ? item.toLowerCase() : item.toLowerCase().replace(/^[a-z]{1,1}/, ($1, $2, $3) => {
        return $1.toUpperCase()
      })
    }).join('')
  }
  columnLabelToIndex(label) { // 获取列字母索引转化为数字索引
    if (!/[A-Z]+/.test(label.toLocaleUpperCase())) {
      throw new Error('Invalid parameter,Expect a String<Alphabetic>!')
    }
    let index = 0
    let chars = label.toLocaleUpperCase().split('')
    for (let i = 0; i < chars.length; i++) {
      index += (chars[i].charCodeAt() - 'A'.charCodeAt() + 1) * Math.pow(26, chars.length - i - 1)
    }
    return index - 1
  }
  getExcelColumnLabel(num) { // 获取索引获取列字母
    // 方法一 高效
    if (!/[0-9]+/.test(num)) {
      throw new Error('Invalid parameter,Expect a Number!')
    }
    let ordA = 'A'.charCodeAt(0)
    let ordZ = 'Z'.charCodeAt(0)
    let len = ordZ - ordA + 1
    let result = ''
    while (num >= 0) {
      result = String.fromCharCode(num % len + ordA) + result
      num = Math.floor(num / len) - 1
    }
    return result
    // 方法二 低效
    /*
        let temp = ''
        let i = Math.floor(Math.log(25.0 * (num) / 26.0 + 1) / Math.log(26)) + 1
        if (i > 1) {
          let sub = num - 26 * (Math.pow(26, i - 1) - 1) / 25
          for (let j = i; j > 0; j--) {
            temp = temp + String.fromCharCode(sub / Math.pow(26, j - 1) + 65)
            sub = sub % Math.pow(26, j - 1)
          }
        } else {
          temp = temp + String.fromCharCode(num + 65)
        }
        return temp
    */
  }
  transByteToSize(value) { // 换算文件大小
    if (value == null || value === '') {
      return '0 Bytes'
    }
    let unitArr = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let index = 0
    let srcsize = parseFloat(value)
    index = Math.floor(Math.log(srcsize) / Math.log(1024))
    let size = srcsize / Math.pow(1024, index)
    //  保留的小数位数
    size = size.toFixed(2)
    return size + unitArr[index]
  }
  listToTreeByNestCodeLength(data, nestCodeKey) { // 根据nestCodeKey 长度 生成嵌套数据
    let map = {} // 构建map
    data.forEach(function (item) {
      map[item[nestCodeKey]] = item
      item.children = []
    })
    let treeData = []
    data.forEach(item => {
      let pnestCodeKey = String(item[nestCodeKey])
      pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
      let mapItem = map[item[pnestCodeKey]]
      while (!mapItem && pnestCodeKey !== '') {
        pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
        mapItem = map[pnestCodeKey]
      }
      if (mapItem) {
        item['item__pcode'] = String(mapItem[nestCodeKey])
        item['item__pNestCode'] = String(mapItem['item__pNestCode'] ? mapItem['item__pNestCode'] + '_' + item[nestCodeKey] : item[nestCodeKey])
        item['item__level'] = item['item__pNestCode'].split('-').length;
        (mapItem.children || (mapItem.children = [])).push(item)
      } else {
        treeData.push(item)
      }
    })
    return treeData
  }
  getSheetEffectiveCellInfo(refArea) { // 获取有效区域单元格信息 // 'A1:H1415'
    let refAreaArr = refArea.toLocaleUpperCase().split(':')
    let sheetEffectiveCellInfo = {
      startColLabel: refAreaArr[0].replace(/[0-9]/ig, ''),
      endColLabel: refAreaArr[1].replace(/[0-9]/ig, ''),
      startRowIndex: refAreaArr[0].replace(/[A-Z]/ig, ''),
      endRowIndex: refAreaArr[1].replace(/[A-Z]/ig, ''),
      colAreaLabel: []
    }
    sheetEffectiveCellInfo.startColIndex = this.columnLabelToIndex(sheetEffectiveCellInfo.startColLabel)
    sheetEffectiveCellInfo.endColIndex = this.columnLabelToIndex(sheetEffectiveCellInfo.endColLabel)
    for (let i = sheetEffectiveCellInfo.startColIndex; i <= sheetEffectiveCellInfo.endColIndex; i++) {
      sheetEffectiveCellInfo.colAreaLabel.push(this.getExcelColumnLabel(i))
    }
    return sheetEffectiveCellInfo
  }
  getMergesInfo(merges) { // 生成单元格合并映射
    let self = this
    let mergesMap = {
      mergesCell: {},
      mergesToCell: {}
    }
    merges && merges.forEach((item, index) => {
      let refcellTo = self.getExcelColumnLabel(item.s.c) + (+item.s.r + 1)
      mergesMap.mergesCell[refcellTo] = {
        refcell: refcellTo,
        startColLabel: self.getExcelColumnLabel(item.s.c),
        endColLabel: self.getExcelColumnLabel(item.e.c),
        startColIndex: item.s.c,
        endColIndex: item.e.c,
        startRowIndex: +item.s.r + 1,
        endRowIndex: +item.s.r + 1
      }
      for (let r = item.s.r; r <= item.e.r; r++) {
        for (let c = item.s.c; c <= item.e.c; c++) {
          let refcell = self.getExcelColumnLabel(c) + (+r + 1)
          mergesMap.mergesToCell[refcell] = refcellTo
        }
      }
    })
    return mergesMap
  }
  generateTheadArr(sheetDataSource) { // 根据已有数据和单元格合并映射 生成完整表头Array
    let { theadRowIndexStart, theadRowIndexEnd, theadDefaultData = {} } = this.curImportGlobleConf
    theadRowIndexEnd = theadRowIndexEnd > theadRowIndexStart ? +theadRowIndexEnd + 1 : +theadRowIndexStart + 1
    let { colAreaLabel } = this.curSheetEffectiveCellInfo
    let { mergesToCell } = this.getMergesInfo(sheetDataSource['!merges'])
    let headMap = {}
    let headAarryAll = []
    for (let i = theadRowIndexStart; i < theadRowIndexEnd; i++) {
      let headAarry = []
      for (let collabel of colAreaLabel) {
        if (sheetDataSource[collabel + i]) {
          let cellitem = {
            // rowIndex: i,
            ...theadDefaultData,
            collabel: collabel,
            //  mergesInfo: mergesCell[collabel + i],
            title: sheetDataSource[collabel + i].v
          }
          headAarry.push(cellitem)
          headMap[collabel + i] = cellitem
        } else {
          let cellitem = mergesToCell[collabel + i]
          headAarry.push(cellitem)
          headMap[collabel + i] = cellitem
        }
      }
      headAarryAll.push(headAarry)
    }
    return { headAarryAll, headMap }
  }
  generateThead(sheetDataSource) { // 根据表头完整数据和单元格合并映射生成嵌套表头
    let { headAarryAll, headMap } = this.generateTheadArr(sheetDataSource)
    let { theadRowIndexStart } = this.curImportGlobleConf
    let theadArrReault = []
    headAarryAll.forEach((item, index) => {
      item.forEach((col, colIndex) => {
        if (index === 0) {
          if (typeof col === 'object') {
            theadArrReault.push(col)
          }
        } else {
          if (typeof col === 'object') {
            let pCellRef = headMap[col.collabel + (+index + theadRowIndexStart - 1)]
            if (typeof pCellRef === 'object') {
              (pCellRef.children || (pCellRef.children = [])).push(col) // 这里判断mapItem中是否存在child
            } else {
              while (typeof pCellRef !== 'object') {
                pCellRef = headMap[pCellRef]
              }
              (pCellRef.children || (pCellRef.children = [])).push(col) // 这里判断mapItem中是否存在child
            }
          }
        }
      })
    })
    return theadArrReault
  }
  generateTheadTreeTolist(data, level = 1, pid = '', alltille, list = []) { // 嵌套head转换成平行数据并生成id和pid
    let self = this
    data.forEach((item, index) => {
      item.renderMapId = self.getUuid()
      item.orderPNum = pid
      item.orderNum = pid + String(index).padStart(4, '0')
      item.columnLevel = level
      item.alltille = alltille ? alltille + '-' + item.title : item.title
      list.push(item)
      if (Array.isArray(item.children) && item.children.length) {
        self.generateTheadTreeTolist(item.children, level + 1, item.orderNum, item.alltille, list)
      }
    })
    return list
  }
  generateTheadLowestLevel(data, map = { lowestLevelArr: [], LowestLevelMap: {} }) { // 根据嵌套表头生成数据低级映射，用来处理解析表体
    let self = this
    data.forEach((item, index) => {
      let titleArr = item.title.split('::')
      if ((Array.isArray(item.children) && !item.children.length) || !Array.isArray(item.children)) {
        let curLowerstLevel = Object.assign(item, {
          title: titleArr[0].replace('(元)', ''),
          isparentrow: false,
          field: self.getField(self.smallHump(titleArr[1] || ('f' + (map.lowestLevelArr.length + '').padStart(3, '0')).toLocaleLowerCase()), titleArr[0]),
          columnName: titleArr[1] || ('f' + (map.lowestLevelArr.length + '').padStart(3, '0')).toLocaleLowerCase(),
          columntype: 1,
          type: titleArr[2] || '$vxeInput' // 新全局下拉树: $vxeTree，文本数字输入: $vxeInput，下拉选择: $vxeSelect，计算渲染器: $vxeCalculate，金额输入: $vxeMoney，下拉文本框: $vxeEditDownTextarea，天数: $vxeDays，时间日期: $vxeTime，单选: $vxeRadio，多选: $vxeCheckbox，间隔时间或数值选择输入渲染器: $vxeIntervar，开关: $vxeSwitch，进度条: vxeProgress。其中，条件渲染器，进度条
        })
        map.lowestLevelArr.push(curLowerstLevel)
        map.LowestLevelMap[curLowerstLevel.collabel] = curLowerstLevel
      } else {
        Object.assign(item, {
          title: titleArr[0].replace('(元)', ''),
          field: self.getField(self.smallHump(titleArr[1] || '')),
          columnName: titleArr[1] || '',
          isparentrow: true,
          columntype: 1,
          type: '' // 新全局下拉树: $vxeTree，文本数字输入: $vxeInput，下拉选择: $vxeSelect，计算渲染器: $vxeCalculate，金额输入: $vxeMoney，下拉文本框: $vxeEditDownTextarea，天数: $vxeDays，时间日期: $vxeTime，单选: $vxeRadio，多选: $vxeCheckbox，间隔时间或数值选择输入渲染器: $vxeIntervar，开关: $vxeSwitch，进度条: vxeProgress。其中，条件渲染器，进度条
        })
        self.generateTheadLowestLevel(item.children, map)
      }
    })
    return map
  }
  getField(field, title) {
    let { tableColumnsTitleFieldMap } = this.columnsConfigMap
    if (tableColumnsTitleFieldMap[String(title).replace(/\(元\)|\(万元\)|undefined/ig, '')]) {
      return tableColumnsTitleFieldMap[String(title).replace(/\(元\)|\(万元\)|undefined/ig, '')]
    } else {
      return field
    }
  }
  generateTheadAndTbody(sheetDataSource) { // 生成表头(嵌套表头和单表头)和表体
    let { theadRowIndexEnd, theadRowIndexStart, columns } = this.curImportGlobleConf
    this.curSheetEffectiveCellInfo = this.getSheetEffectiveCellInfo(sheetDataSource['!ref'])
    this.columnsConfigMap = this.generateColumnsAllMap(Array.isArray(columns) ? columns : [])
    let theadResult = this.generateThead(sheetDataSource)
    let { lowestLevelArr } = this.generateTheadLowestLevel(theadResult)
    let { endRowIndex } = this.curSheetEffectiveCellInfo
    let tbodyResult = []
    if (+endRowIndex > +theadRowIndexEnd) {
      for (let rowIndex = +theadRowIndexEnd + 1; rowIndex <= endRowIndex; rowIndex++) {
        let row = {}
        lowestLevelArr.forEach((column, columnIndex) => {
          row[column[this.curImportGlobleConf.fieldName || 'field']] = sheetDataSource[column.collabel + rowIndex] ? String(sheetDataSource[column.collabel + rowIndex].v).replace(/null|NaN|undefined|,/ig, '') : ''
        })
        tbodyResult.push(row)
      }
    }
    let parseExceldata = {
      theadLevel: theadRowIndexEnd - theadRowIndexStart + 1,
      tbody: tbodyResult,
      tbodyNest: this.listToTreeByNestCodeLength(tbodyResult, lowestLevelArr[0].field),
      theadNest: theadResult,
      theadList: this.generateTheadTreeTolist(theadResult),
      theadSing: lowestLevelArr,
      sheetEffectiveCellInfo: this.curSheetEffectiveCellInfo,
      sheetDataSource: sheetDataSource
    }
    let sourceData = {

    }
    if (Array.isArray(columns) && columns.length) {
      let columnsMap = this.columnsConfigMap
      sourceData.tbodySource = this.transTbodyToSource(
        {
          tbody: parseExceldata.tbody,
          viewToSourceMap: columnsMap.viewToSourceMap,
          columnsConfigList: columnsMap.columnsList,
          rowsObjTemp: columnsMap.rowsObjTemp,
          columnsConfigTitleFielMap: columnsMap.tableColumnsTitleFieldMap
        }
      )
    }
    return Object.assign(parseExceldata, sourceData)
  }
  transTbodyToSource({ tbody, columnsConfigList, viewToSourceMap, rowsObjTemp }) {
    let self = this
    return tbody.map((row, rowIndex) => {
      let newRow = {}
      columnsConfigList.map((column, columnIndex) => {
        self.reverseParseViewDataTosource({ row, column, viewToSourceMap }, newRow)
        // newRow[column.field] = row[dataTitleFieldMapMap[column.title]]
      })
      return newRow
    })
  }
  reverseParseViewDataTosource({ row, column, viewToSourceMap }, newRow) {
    // 处理单个 导入数据
    //  needMap: true,
    //  name: itemRender.name,
    //  options: Array.isArray(itemRender.options) ? itemRender.options : [],
    //  multiple: true,
    //  formula: conlum.formula
    let value = row[column.field]
    if (viewToSourceMap && viewToSourceMap.needMap) {
      let transValue = ''
      let viewValue = typeof (value) === 'string' ? value : ''
      if (viewToSourceMap.multiple) {
        if (viewValue.length) {
          let viewToSourceValueArr = []
          viewToSourceMap.options.forEach((item, index) => {
            if (viewValue.indexOf(item.label) >= 0) {
              viewToSourceValueArr.push(item.value)
            }
          })
          transValue = viewToSourceValueArr.join(',')
        } else {
          transValue = ''
        }
      } else {
        viewToSourceMap.options.forEach((item, index) => {
          if (viewValue.indexOf(item.label) >= 0) {
            transValue = item.value
          }
        })
      }
      newRow[column.field] = transValue
    } else {
      newRow[column.field] = value + ''.replace(/null|NaN|undefined|,/ig, '')
    }
  }
  generateColumnsAllMap(columns, obj = { // 生成导入view映射数据
    tableColumnsFieldMap: {},
    tableColumnsTitleFieldMap: {},
    viewToSourceMap: {},
    columnsList: [],
    colFormulaConfig: {},
    rowsObjTemp: {},
    tableColumnsTitleMap: {}
  }) {
    let self = this
    columns.forEach((conlum, index) => {
      if (Array.isArray(conlum.children) && conlum.children.length) {
        self.generateColumnsAllMap(conlum.children, obj)
      } else {
        obj.columnsList.push(conlum)
        if (conlum.formula) {
          obj.colFormulaConfig[conlum.field] = conlum.formula
          obj.tableColumnsTitleMap[conlum.title] = conlum
        }
        if (conlum.field) {
          obj.rowsObjTemp[conlum.field] = ''
          let map = {
            needMap: true,
            options: [],
            multiple: false,
            formula: conlum.formula
          }
          obj.tableColumnsFieldMap[conlum.field] = conlum
          obj.tableColumnsTitleFieldMap[conlum.title] = conlum.field
          let itemRender = conlum.cellRender || conlum.editRender || conlum.contentRender
          if (itemRender) {
            switch (itemRender.name) {
              case '$vxeSelect':
                if (itemRender.props && itemRender.props.multiple) {
                  map = Object.assign({}, map, {
                    needMap: true,
                    name: itemRender.name,
                    options: Array.isArray(itemRender.options) ? itemRender.options : [],
                    multiple: true
                  })
                } else {
                  map = Object.assign({}, map, {
                    needMap: true,
                    name: itemRender.name,
                    options: Array.isArray(itemRender.options) ? itemRender.options : [],
                    multiple: false
                  })
                }
                break
              case '$vxeRadio':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
              case '$vxeCheckbox':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: true
                })
                break
              case '$vxeSwitch':
                map = Object.assign({}, map, {
                  needMap: true,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
              default:
                map = Object.assign({}, map, {
                  needMap: false,
                  name: itemRender.name,
                  options: Array.isArray(itemRender.options) ? itemRender.options : [],
                  multiple: false
                })
                break
            }
          } else {
            map = Object.assign({}, map, {
              needMap: false
            })
          }
          obj.viewToSourceMap[conlum.field] = map
        }
      }
    })
    return obj
  }
  readWorkbookFromLocalFile(files) { // 读取导入的excel文件数据
    let self = this
    if (!files.length) {
      return
    }
    let { name, size, type } = files[0]
    let { onlyParsingFirstSheet } = this.curImportGlobleConf
    let reader = new FileReader()
    reader.onload = function (e) {
      let data = e.target.result
      let workbook = self.XlsxTool.read(data, { type: 'binary' })
      self.workbook = workbook
      let excelDataMap = {}
      let excelDataArray = []
      let firstSheetData = []
      for (let i = 0; i < (onlyParsingFirstSheet ? 1 : workbook.SheetNames.length); i++) {
        // 如果多个shheet,这地方可以设置一个弹框去填写表头单元格信息 或者 可以 表格第一行恒定配置表头说明来解析说明获取解析的一些必须数据
        let sheetData = self.generateTheadAndTbody(workbook.Sheets[workbook.SheetNames[i]])
        let curSheetData = {
          sheetName: workbook.SheetNames[i],
          data: sheetData
        }
        excelDataMap[workbook.SheetNames[i]] = curSheetData
        excelDataArray[i] = curSheetData
        if (i === 0) {
          firstSheetData = sheetData
        }
      }
      // filename  name.replace(/.xlsx$|.xls$/,'')
      let curImportData = { importUtil: self, curImportConfig: self.curImportGlobleConf, filename: name, name: name.replace(/.xlsx$|.xls$/, ''), type: type, size: self.transByteToSize(size), import: workbook, excelDataMap, firstSheetData, excelDataArray }
      self.importcallback(curImportData)
      self.importHistory.push(curImportData)
      self.importHistory = self.importHistory.reverse().slice(0, 20).reverse()
    }
    reader.readAsBinaryString(files[0])
  }
}

export default new Import()
