<template>
  <el-dialog
    v-loading="showLoading"
    :visible.sync="bossImportVisible"
    title="导入"
    :show-close="true"
    class="dialog absolute z-index-1"
    width="60%"
    center
    @close="close"
  >
    <el-card v-if="!isTempSave" class="box-card">
      <div v-if="downloadShow">
        <div style="margin: 10px auto;">
          <span>请使用最新的导入模板，若是第一次，请在下方下载。</span>
        </div>
        <div style="margin: 10px auto;">
          <el-button class="downNewModBtn" @click="downloadNewFile">下载模板</el-button>
        </div>
        <span>模板生成时间：{{ filetime }}</span>
      </div>
      <div style="margin: 10px auto;">
        <el-upload
          ref="fileupload"
          drag
          action="#"
          :multiple="multiple"
          :limit="limit"
          :show-file-list="showFileList"
          :list-type="listType"
          :file-list="fileList"
          :auto-upload="autoUpload"
          style="width: 100%;"
          :accept="accept"
          :before-upload="beforeUploadEvent"
          :on-change="fileChangeEvent"
          :on-remove="fileRemoveEvent"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text" style="width: 100%;"><b>将文件拖到此处导入，或<em>点击导入文件</em></b></div>
        </el-upload>
      </div>
      <div style="margin: 10px auto;">
      </div>
      <div style="margin: 10px auto;">
        <el-button class="importBtn" @click="uploadFiles">导入</el-button>
      </div>
      <div v-if="importing" style="margin: 10px auto;">
        <el-progress :percentage="percentage" :stroke-width="18" :text-inside="true" />
      </div>
    </el-card>
    <el-card v-if="isTempSave" class="box-card">
      <div>
        <div v-if="downloadShow" style="float:left;margin-bottom:10px;margin-left:10px">
          <span>模板生成时间：{{ filetime }}</span>
          <el-button size="small" type="primary" @click="downloadNewFile">下载模板</el-button>
        </div>
        <el-upload
          ref="fileupload"
          action="#"
          multiple
          :limit="3"
          :auto-upload="autoUpload"
          style="float: right;margin-bottom:10px"
          :accept="accept"
          :before-upload="beforeUploadEvent"
          :on-change="fileChangeEvent"
          :on-remove="fileRemoveEvent"
        >
          <el-button size="small" type="primary">点击导入</el-button>
        </el-upload>
      </div>
      <div class="table_class" style="margin-left: 10px;margin-right: 10px;margin-top: 10px">
        <BsTable
          ref="mainTable"
          :table-config="tableConfig"
          :table-columns-config="tableColumns"
          :table-data="tableDatas"
          :toolbar-config="false"
          :has-toolbar="false"
          :pager-config="false"
          :table-form-config="false"
          :footer-config="{ showFooter: false }"
        />
      </div>
      <div style="margin: 10px auto;float:right">
        <el-button @click="saveTableDatas">保存</el-button>
      </div>
    </el-card>
  </el-dialog>
</template>

<script>
import XLSX from 'xlsx'
import BudgetCommonRespons from '@/api/frame/main/budgetManager/BudgetCommon'
export default {
  name: 'BudgetFileImport',
  props: {
    visible: {
      type: Boolean
    },
    downloadShow: { // 是否显示下载模板按钮
      type: Boolean,
      default: true
    },
    autoUpload: { // 是否自动上传
      type: Boolean,
      default: false
    },
    showFileList: { // 是否展示文件列表
      type: Boolean,
      default: true
    },
    multiple: { // 是否支持多选文件
      type: Boolean,
      default: false
    },
    limit: { // 上传文件数量
      type: Number,
      default: 1
    },
    templateCode: { // 模板templateCode
      type: String,
      default: ''
    },
    importDatas: { // 表格数据
      type: Function,
      default: function(datas) {
        this.tableDatas = datas
      }
    },
    listType: {
      type: String,
      default: 'text'
    },
    accept: { // 接受上传的文件类型（thumbnail-mode 模式下此参数无效）
      type: String,
      default: '.xlsx,.xls'
    },
    servername: { // 服务名 可自定义
      type: String,
      default: 'be-budget-config'
    },
    serverUri: { // 获取数据访问uri，可自定义
      type: String,
      default: 'queryBossFiscalTableConfig'
    },
    fileInfos: { // 模板信息
      type: Object,
      default: () => ({
        /*
        * {sheets:[{name:'',columns:[],data:[]}]}
        * name非必填-sheet名称
        * columns必填-表头
        * data非必填-表数据
        * */
      })
    },
    isTempSave: { // 是否支持暂存，默认不支持
      type: Boolean,
      default: false
    },
    isserver: { // 是否时服务端获取参数
      type: Boolean,
      default: false
    },
    queryMethod: { // 查询模板信息函数
      type: Function,
      default: function (_this, params) {
        let reportConfig
        // 模板信息
        let result = { columns: [] }
        if (this.reportguid) {
          // reportConfig = asynserver(this.servername, this.serverUri, { 'reportguid': this.reportguid })
        } else {
          this.$message({
            showClose: true,
            message: '请传入reportguid',
            type: 'error'
          })
          return
        }
        let columns = reportConfig.columns
        for (let i = 0; i < columns.length; i++) {
          let column = {
            field: columns[i].field,
            title: columns[i].title,
            type: columns[i].type,
            notnull: columns[i].notnull,
            clength: columns[i].clength,
            elecode: columns[i].elecode
          }
          result.columns.push(column)
        }
        /* var result = {//模板信息
            columns:[]
        }; */
        return result
      }
    },
    queryParams: { // 查询模板信息参数函数
      type: Function,
      default: function (params) {
        return params
      }
    },
    saveData: { // 上传函数
      type: Function,
      /**
       * 上传函数
       * @param datas 需要保存的数据
       */
      default: function (datas) {
        if (!datas) {
          this.$message.warning('传入的参数为空')
        }
        // 组建数据
        for (var j = 0; j < datas.length; j++) {
          datas[j].voucher_code = '141001' // 待分指标录入单
          datas[j].origin_model_code = '1' // 导入指标
        }
        const param = {
          appid: 'budget-total',
          menuguid: this.$store.state.curNavModule.guid,
          actionType: 1,
          glType: 1,
          actionName: '导入',
          action: 1,
          status: 1,
          data: datas
        }
        BudgetCommonRespons.saveImportDatas(param)
          .then((res) => {
            this.showLoading = false
            if (res && res.success) {
              this.$message.success('导入成功')
              this.afterUpload()
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch((err) => {
            console.log(err)
            this.showLoading = false
            this.$message.error('请求失败')
          })
      }
    },
    handleData: { // 校验及数据处理函数
      type: Function,
      default: function (columns, datas) {
        let requestParams = []
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].type !== 'treeinput') {
            continue
          }
          let requestParam = {}
          requestParam.formatter = columns[i].formatter
          requestParam.elecode = columns[i].elecode
          requestParam.field = columns[i].field
          requestParam.isleaf = columns[i].isleaf
          requestParam.title = columns[i].title
          let eledatas = []
          var value = ''
          if (columns[i].default_value) { // 有默认值的时候
            value = columns[i].default_value
            eledatas.push(value)
          } else {
            for (let j = 0; j < datas.length; j++) {
              value = datas[j][columns[i].field]
              if (!value) {
                continue
              }
              // if (columns[i].formatter === 'code-name') {
              //   value = value.split('-')[0]
              // }
              if (eledatas.indexOf(value) < 0) {
                eledatas.push(value)
              }
            }
          }
          requestParam.datas = eledatas
          requestParams.push(requestParam)
        }
        this.showLoading = true
        BudgetCommonRespons.handleImportDatas({ 'datas': requestParams })
          .then((res) => {
            if (res && !res.msg) {
              for (let m = 0; m < columns.length; m++) {
                if (columns[m].type !== 'treeinput') {
                  continue
                }
                let eleValues = res[columns[m].field]
                if (!eleValues) {
                  continue
                }
                var value = ''
                for (let n = 0; n < datas.length; n++) {
                  if (columns[m].default_value) { // 有默认值的时候
                    value = columns[m].default_value
                  } else {
                    value = datas[n][columns[m].field]
                    if (!value) {
                      continue
                    }
                    // if (columns[m].formatter === 'code-name') {
                    //   value = value.split('-')[0]
                    // }
                  }
                  Object.assign(datas[n], eleValues[value])
                }
              }
              if (this.isTempSave) {
                this.showLoading = false
                this.tableDatas = datas
              } else {
                this.saveData(datas)
              }
              // this.showLoading = false
            } else {
              this.$message.error(res.msg)
              this.showLoading = false
            }
          }).catch((err) => {
            console.log(err)
            this.showLoading = false
          })
      }
    },
    afterUpload: {
      type: Function,
      default: function (params) {
        return params
      }
    }
  },
  data() {
    return {
      failData: {}, // 错误的数据
      canDownload: false, // 是否有需要下载的错误文档
      bossImportVisible: this.visible, // 弹窗显示标志
      fileList: [], // 文件集合
      fileflag: false, // 文件标志
      total: 0, // 处理数据条数
      success: 0, // 处理数据成功条数
      fail: 0, // 处理数据失败条数
      failreason: '', // 上传失败信息
      cacheDatas: {},
      excelColH: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ', 'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT', 'BU', 'BV', 'BW', 'BX', 'BY', 'BZ', 'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ', 'CK', 'CL', 'CM', 'CN', 'CO', 'CP', 'CQ', 'CR', 'CS', 'CT', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ'],
      defaultCacheFormatter: {}, // 格式化缓存
      filetime: '', // 模板生成时间
      importing: false, // 导入中
      percentage: 0, // 导入进度
      showLoading: false,
      tableColumns: [],
      tableDatas: [],
      toolbarConfig: {
        refresh: true,
        calculator: false,
        zoom: false,
        export: false,
        moneyConversion: false
      }
    }
  },
  methods: {
    async initData() {
      this.fileInfos.sheets = []
      await BudgetCommonRespons.getFileImportConfig({ 'templateCode': this.templateCode })
        .then((res) => {
          this.showLoading = false
          if (res && res.success) {
            this.fileInfos.templateCode = this.templateCode
            this.fileInfos.fileid = res.fileid
            this.fileInfos.fileName = res.fileName
            this.fileInfos.downfileguid = res.fileguid
            this.filetime = res.filetime
            let reports = res.reportList
            for (var i = 0; i < reports.length; i++) {
              this.fileInfos.sheets.push({ name: reports[i].reportname, columns: reports[i].columns })
            }
            // 默认的列配置
            if (reports[0].defaultCols) {
              this.fileInfos.defaultCols = reports[0].defaultCols
            }
            if (this.isTempSave) { // 需要展示导入的数据。初始化表结构
              // 初始化表格
              this.tableColumns = []
              this.tableDatas = []
              this.tableColumns = this.buildTableCols(reports[0].columns)
            }
            this.$emit('callBackImportConfig', reports[0]['columns'])
          } else {
            this.$message.error(res.msg)
            this.close()
          }
        })
    },
    /**
     * 下载错误文档
     */
    downLoadExcel() {
      var names = []
      var sheetObj = {}
      for (var i = 0; i < this.failData.length; i++) {
        var idx = i + 1
        var name = 'sheet' + idx
        let sheet = XLSX.utils.json_to_sheet(this.failData[i])
        names.push(name)
        sheetObj[name] = sheet
      }
      // let blob = sheet2blob(sheet);
      /* let blob = sheets2blob(sheetObj, names)
      openDownloadDialog(blob, '导入错误.xlsx') */
    },
    openImportDialog(templateCode) {
      // 清空数据
      this.fail = 0
      this.success = 0
      this.total = 0
      this.canDownload = false
      this.cacheDatas = {}
      if (templateCode) {
        this.fileInfos.templateCode = templateCode
      }
      this.showLoading = true
      this.initData()
    },
    // 下载模板
    downloadNewFile() {
      const params = {
        appid: this.$store.state.curNavModule.appid,
        fileguid: this.fileInfos.downfileguid
      }
      this.$http['get']('fileservice/v2/find/fileExists', params).then(res => {
        if (res.rscode === '100000') {
          const urlObj = this.$http.httpGlobalGatewayAgent('fileservice/v2/stream/download')
          const downLoadUrl = `${urlObj.baseURL}/${urlObj.url}?appid=${params.appid}&fileguid=${params.fileguid}`
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
    fileuploadProgress(event, file, fileList) { // 文件上传时的钩子

    },
    beforeUploadEvent(file) {
      this.setColumnsCache()
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('导入文件大小不能超过 10MB!')
        return false
      }
      if (file.name.endsWith('.json')) {
        this.parseJsonFile(file)
        return false
      }
      this.readWorkbookFromLocalFile(file, this.readWorkbook)
      return false // 阻止文件提交
    },
    parseJsonFile(file, callback) { // 解析json文件
      let reader = new FileReader()
      reader.readAsText(file, 'GBK')
      let self = this
      reader.onload = (e) => {
        let cols = self.fileInfos.sheets[0].columns
        let str = e.target.result.replace(/\\/g, '').replace(/[\r\n\t]/g, '')
        let jsonData = JSON.parse(str)
        let datas = []
        if (jsonData.MsgNo && jsonData.MsgNo === '001') { // 预算编制信息报文
          for (let i = 0; i < jsonData.MsgData.length; i++) {
            let obj = {}
            obj.agency = jsonData.MsgData[i].AGENCYID
            obj.pro_id = jsonData.MsgData[i].PROJECTID
            obj.pro_code = jsonData.MsgData[i].PROJCODE
            obj.pro_name = jsonData.MsgData[i].PROJNAME
            obj.bgt_mof_dep = jsonData.MsgData[i].GKCS
            obj.manage_mof_dep = jsonData.MsgData[i].GKCS
            obj.exp_func = jsonData.MsgData[i].EXPFUNCID
            obj.gov_bgt_eco = jsonData.MsgData[i].GOVEXPECOID
            obj.dep_bgt_eco = jsonData.MsgData[i].EXPECOID
            obj.fund_type = jsonData.MsgData[i].SOURCEID
            obj.amount = jsonData.MsgData[i].MONEY
            obj.is_gov_pur = jsonData.MsgData[i].ISGROVPROC
            obj.budget_level = jsonData.MsgData[i].YSJC
            obj.cor_bgt_doc_no = jsonData.MsgData[i].DOCNO
            obj.hold1_name = jsonData.MsgData[i].BKQJSX
            datas.push(obj)
          }
        }
        // 处理数据的时候需要加上默认的配置列信息
        if (this.fileInfos.defaultCols) {
          for (let i = 0; i < this.fileInfos.defaultCols.length; i++) {
            cols.push(this.fileInfos.defaultCols[i])
          }
        }
        self.handleData(cols, datas)
      }
    },
    // 读取本地excel文件
    readWorkbookFromLocalFile(file, callback) {
      var reader = new FileReader()
      reader.onload = function(e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'binary' })
        if (callback) {
          callback(file, workbook)
        }
      }
      reader.readAsBinaryString(file)
    },
    // 读取 excel文件
    readWorkbook(file, workbook) {
      var jsonData = []
      var columns = []
      var sheetNames = workbook.SheetNames // 工作表名称集合
      // 去掉隐藏下拉要素页签要素，最后一个不读
      var slength = this.fileInfos.sheets.length
      for (var v = 0; v < slength; v++) {
        var name = sheetNames[v]
        if (!name) {
          this.$message.error('页签与模板不匹配！')
          return
        }
        var index = v
        var worksheet = workbook.Sheets[name] // 只能通过工作表名称来获取指定工作表

        var endIndex = Object.keys(this.fileInfos.sheet[index].colinfos).length
        if (!this.validModelColumns(endIndex, worksheet, name, index)) {
          this.$refs.fileupload.abort(file)
          return
        }
        var rowArray = worksheet['!ref'].replace(/[A-Z]/g, '').split(':')
        var startrowindex = parseInt(rowArray[0])
        var endrowindex = parseInt(rowArray[1])
        var endrow = startrowindex === endrowindex ? (endrowindex + 1) : endrowindex
        // var endIndex = this.excelColH.indexOf(endCol);
        var datas = []
        var columnArr = []
        var idx = 0
        for (var i = this.fileInfos.sheet[index].lines + 1; i < endrow + 1; i++) {
          var data = {}
          for (var j = 0; j < endIndex; j++) {
            var key = this.getColumnIndex(j + 1)
            var column = this.fileInfos.sheet[index].colinfos[key]
            var key1 = key + i
            var col = worksheet[key1]
            data[column.field] = (col && col.w) ? col.w.trim() : ''
            if (column.type === 'money' && data[column.field]) { // 金额列需要去除千分位
              data[column.field] = data[column.field].replace(/,/g, '')
            }
            if (idx === 0) {
              columnArr.push(column)
            }
          }
          idx++
          if (Object.keys(data).length !== 0) {
            datas.push(data)// 行数据
          }
        }
        for (let i = 0; i < datas.length; i++) {
          if (this.valueIsEmpty(datas[i])) {
            // delete datas[i]
            datas.splice(i)
          }
        }
        jsonData.push(datas)// sheet数据
        columns.push(columnArr)
      }
      // 处理数据的时候需要加上默认的配置列信息
      if (this.fileInfos.defaultCols) {
        for (let i = 0; i < this.fileInfos.defaultCols.length; i++) {
          columns[0].push(this.fileInfos.defaultCols[i])
        }
      }
      this.handleData(columns[0], jsonData[0])
      /* if (validateResult.rscode === 'false') {
        this.$message({ message: '校验失败：' + validateResult.result, type: 'error' })
        return
      } */
      this.total += jsonData[0].length
      /* if (validateResult.failData.length > 0) {
        this.$message.warning('导入失败')
        // 拿到失败数据
        this.failData = validateResult.failData
        // 展示下载链接
        this.canDownload = true

        this.fail += validateResult.failData.length
        return
      } else {
        this.failData = []
        this.canDownload = false
      } */

      // this.saveData(this.importDatas)
      /* if (!result.result) {
        this.$refs.fileupload.abort(file)
      }
      this.success = result.success
      this.fail = result.fail */
    },
    valueIsEmpty(datas) {
      let isEmpty = true
      Object.keys(datas).forEach((key) => {
        if (datas[key] !== null && datas[key] !== '') {
          isEmpty = false
        }
      })
      return isEmpty
    },
    validModelColumns(endIndex, worksheet, sheetName, idx) {
      // var endIndex = this.excelColH.indexOf(endExcelCol);
      for (var i = 0; i < endIndex; i++) {
        // var key = this.excelColH[i];
        var key = this.getColumnIndex(i + 1)
        var flag = false
        var titleNames = ''
        if (!this.fileInfos.sheet[idx]) {
          this.$message.error('EXCEL文件中【' + sheetName + '】页，页签与模板不匹配！')
          return false
        }
        for (var j = 1; j < this.fileInfos.sheet[idx].lines + 1; j++) {
          var key1 = key + j
          var col = worksheet[key1]
          if (col) {
            var column = this.fileInfos.sheet[idx].colinfos[key]
            var ctitle = col.w
            titleNames = ctitle
            ctitle = ctitle.replace('*', '')
            if (column.title === ctitle) {
              flag = true
              break
            }
          }
        }
        if (!flag) {
          this.$message.error('EXCEL文件中【' + sheetName + '】页，表头【' + titleNames + '】与模板不匹配！')
          return false
        }
      }
      return true
    },
    setColumnsCache() {
      this.queryModelInfos()
      var line = 0
      this.fileInfos.sheet = {}// 存储校验表头
      if (!this.fileInfos.sheets) {
        console.error('请向fileInfos中传参sheets')
        this.fileInfos.sheets = []// 外部传入表头
        return
      }
      for (var i = 0; i < this.fileInfos.sheets.length; i++) {
        this.fileInfos.idxinfos = []
        this.fileInfos.sheet[i] = { lines: 0, colinfos: {} }
        this.cacheColumns(line, this.fileInfos.sheets[i].columns, i)
      }
    },
    cacheColumns(line, columns, idx) {
      var line1 = line + 1
      for (var i = 0; i < columns.length; i++) {
        if (this.fileInfos.sheet[idx].lines < line1) {
          this.fileInfos.sheet[idx].lines += 1
        }
        var column = columns[i]
        if (column.children && column.children.length) {
          this.cacheColumns(line1, column.children, idx)
        } else {
          this.fileInfos.idxinfos.push(1)
          this.fileInfos.sheet[idx].colinfos[this.getColumnIndex(this.fileInfos.idxinfos.length)] = column
        }
      }
    },
    getColumnIndex(index) { // 相当于10进制转26进制
      var idx = ''
      while (index > 0) {
        var n = index % 26
        if (n === 0) {
          n = 26
        }
        idx = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(n - 1) + idx
        index = (index - n) / 26
      }
      return idx
    },
    uploadFiles() {
      this.total = 0
      this.fail = 0
      this.canDownload = false
      if (this.fileList.length > 0) {
        this.$refs.fileupload.submit()
      } else {
        this.$message.error('请选择文件！')
      }
    },
    fileChangeEvent(file, fileList) { // 增加文件
      this.fileList = fileList
      if (this.isTempSave) { // 需要展示导入的数据。初始化表结构
        // 初始化表格
        this.tableDatas = []
        this.$refs.fileupload.submit()
      }
    },
    fileRemoveEvent(file, fileList) { // 删除文件
      this.fileList = fileList
    },
    queryModelInfos() {
      if (this.isserver) {
        var params = {}
        var result = this.queryMethod(this, this.queryParams(params))
        Object.assign(this.fileInfos, result)
      }
    },
    close() {
      this.$emit('onClose')
      this.bossImportVisible = false
      this.$emit('update:visible', this.isVisible)
    },
    buildTableCols(cols) {
      if (!cols) {
        return cols
      }
      let result = []
      for (let i = 0; i < cols.length; i++) {
        cols[i].isedit = true // 先写死没一列都是可以编辑的
        /* if (cols[i].field === 'pro_name') { // 项目代码先跳过
          continue
        } */
        var col = {}
        col.field = cols[i].field
        col.title = cols[i].title
        switch (cols[i].type) {
          case 'text': // 文本
            col.align = cols[i].align || 'left'
            col.width = cols[i].width || '200'
            if (cols[i].isedit || cols[i].isedit === 'true') { // 可编辑列
              col.editRender = { name: '$input', props: { type: 'text' } }
            } else {
              col.itemRender = { name: '$input', props: { type: 'text' } }
            }
            break
          case 'money': // 金额
            col.align = cols[i].align || 'right'
            col.width = cols[i].width || '150'
            col.formatter = 'formatMoney'
            if (cols[i].isedit || cols[i].isedit === 'true') { // 可编辑列
              col.editRender = { name: '$moneyRender', props: { type: 'float' } }
            } else {
              col.itemRender = { name: '$moneyRender', props: { type: 'float' } }
            }
            break
          case 'number': // 数字
            col.align = cols[i].align || 'left'
            col.width = cols[i].width || '150'
            if (cols[i].isedit || cols[i].isedit === 'true') { // 可编辑列
              col.editRender = { name: '$input', props: { type: 'number' } }
            } else {
              col.itemRender = { name: '$input', props: { type: 'number' } }
            }
            break
          case 'treeinput': // 树
            col.align = cols[i].align || 'left'
            col.width = cols[i].width || '200'
            col.field = cols[i].field + '_'
            if (cols[i].isedit || cols[i].isedit === 'true') { // 可编辑列
              col.editRender = {
                name: '$treeinput',
                props: {
                  type: 'text',
                  isServer: true,
                  elecode: cols[i].elecode,
                  serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
                  queryparams: {
                    eleCode: cols[i].elecode
                  }
                }
              }
            } else {
              col.itemRender = { name: '$input', props: { type: 'text' } }
              if (cols[i].formatter === 'code-name') {
                col.formatter = (value, column) => {
                  if (value && value['row'] && value['row'][cols[i].field + '_id']) {
                    return value['row'][cols[i].field + '_code'] + ' - ' + value['row'][cols[i].field + '_name']
                  }
                  return ''
                }
              }
            }
            break
          case 'select': // 下拉框
            col.align = cols[i].align || 'left'
            col.width = cols[i].width || '200'
            col.filterMultiple = true
            let options = [
              { label: '是', value: '1' },
              { label: '否', value: '2' }
            ]
            if (cols[i].refmode) { // 格式 1#否+2#是
              let item = cols[i].refmode.split('//+')
              if (!item) {
                return
              }
              for (let j = 0; j < item.length; j++) {
                let tmpObj = {}
                let itemInfo = item[j].split('#')
                if (itemInfo && itemInfo.length === 2) {
                  tmpObj.value = itemInfo[0]
                  tmpObj.label = itemInfo[1]
                  options.push(tmpObj)
                }
              }
            }
            if (cols[i].isedit || cols[i].isedit === 'true') { // 可编辑列
              col.editRender = { name: '$select', props: { disabled: false, placeholder: '请选择' }, options: options }
            } else {
              col.editRender = { name: '$select', props: { disabled: true } }
            }
            break
          default:
            break
        }
        result.push(col)
      }
      return result
    },
    saveTableDatas() {
      let tableDatas = this.$refs.mainTable.getTableData().fullData
      if (tableDatas && tableDatas.length > 0) {
        this.showLoading = true
        this.saveData(tableDatas)
      } else {
        this.$message.warning('表格数据为空！')
      }
    }
  },
  created() {
  },
  mounted() {
    // 清空数据
    this.fail = 0
    this.success = 0
    this.total = 0
    this.canDownload = false
    this.cacheDatas = {}
  },
  watch: {
    visible (newVal) {
      this.bossImportVisible = newVal
      if (newVal) {
        this.openImportDialog()
      } else {
        this.showLoading = false
      }
    },
    templateCode(newVal) {
      this.templateCode = newVal
    }
  }
}
</script>
<style lang='scss'>
  .table_class{
    height: calc(60vh - 94px);
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 50px;
  }
</style>
