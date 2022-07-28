<--人员信息维护 czb -->
<template>
  <div class="main-modulebox">
    <!-- <BsTab :tab-list="tabList" tab-class="main-modulebox-tab" :default-select="defaultSelect" @onTabClick="onTabClick" /> -->
    <div class="main-modulebox-con main-modulebox-tabcon" style="height:100%;">
      <div class="fmc-main">
        <div class="fmc-left-con fn-inline height-all" :class="leftVisible ? 'fmc-left-visible' : 'fmc-left-hidden'">
          <aside class="fmc-left fn-inline">
            <div class="height-half">
              <div class="fmc-title">
                <span class="fn-inline">菜单列表</span>
              </div>
              <div class="fmc-left-tree">
                <BsUnitTree
                  ref="agencytree"
                  v-loading="treeLoading"
                  :tree-data-list="treeDatas"
                  :config="{ url: '', rootName: '全部' }"
                  @onNodeClick="onNodeClick"
                  @onTreeLoaded="onTreeLoaded"
                />
              </div>
            </div>
            <div class="height-half">
              <div class="fmc-title">
                <span class="fn-inline">操作类型</span>
              </div>
              <div class="fmc-left-tree">
                <BsUnitTree
                  :tree-data-list="operationTypeDatas"
                  @onNodeClick="onInputTableTreeClick"
                />
              </div>
            </div>
          </aside>
          <div class="fmc-left-visible-control fn-inline" style="height:100%">
            <div class="fn-inline height-all w1"></div>
            <div class="fn-inline fmcl-visible-control" @click="leftVisible = !leftVisible">
              <div class="fmcl-control-bg pointer">
                <i class="fmcl-control-ico fn-inline">
                </i>
              </div>
            </div>
          </div>
        </div>
        <main class="fmc-right fn-inline" :style="leftVisible ? 'width:calc(100% - 320px)' : 'width:calc(100% - 20px)'">
          <BsTable
            v-loading="showLoading"
            element-loading-text="拼命加载中..."
            :table-form-config="false"
            :table-config="tableConfig"
            :table-columns-config="tableColumnsConfig"
            :toolbar-config="toolbarConfig"
            :pager-config="pagerConfig"
            :table-data="tableDatas"
            :edit-config="false"
            @ajaxData="ajaxTableData"
          />
        </main>
      </div>
      <!-- <AttachmentUpload v-if="attachmentUploadVisble" :visible.sync="attachmentUploadVisble" :bill-id="billId" :limit="1" /> -->
      <OperationGuideDialog v-if="attachmentUploadVisble" :visible.sync="attachmentUploadVisble" :query-param="queryParam" :limit="1" />
    </div>
    <el-dialog
      title="编辑摘要"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="60%"
    >
      <div style="margin-top: 10px">
        <el-row :gutter="24" style="margin-bottom: 15px">
          <el-col :span="24">
            <vxe-textarea
              v-model="article"
              placeholder="请输入首页摘要"
              resize="none"
              :autosize="{ minRows: 10, maxRows: 10 }"
              maxlength="1000"
              show-word-count
            />
          </el-col>
        </el-row>
      </div>
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <el-button size="small" type="primary" :loading="bacLoading" @click="doConfirm">确  认</el-button>
          <el-button size="small" @click="visible = false">取  消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import getColumns from '@/views/main/ysbzgl/config/tableColumns.js'
// import AttachmentUpload from '@/views/main/ysbzgl/transferPayment/common/components/AttachmentUpload.vue'
import OperationGuideDialog from '@/views/main/home/OperationGuideDialog.vue'

import tree from '@/mixin/tree.js'
export default {
  name: 'OperationGuide',
  components: {
    OperationGuideDialog
  },
  mixins: [tree],
  props: '',
  data() {
    return {
      menuInfo: {},
      treeDatas: [],
      leftVisible: true,
      tableDatas: [],
      visible: false,
      article: '',
      operationTypeDatas: [
        {
          id: 'text',
          label: '《规范》要求'
        },
        {
          id: 'list',
          label: '帮助手册'
        },
        {
          id: 'file',
          label: '学习课件'
        }

      ],
      operationType: {},
      showLoading: false,
      tableColumnsConfig: getColumns('operationGuideFile'),
      toolbarConfig: {
        moneyConversion: false,
        buttons: [
          { code: 'toolbar-upload', name: '附件上传', status: 'primary', callback: this.doUpload },
          { code: 'toolbar-delete', name: '删除', callback: this.doDelete },
          { code: 'toolbar-refresh', name: '刷新', status: '', callback: this.doRefresh }
        ]
      },
      pagerConfig: {
        total: Number
      },
      attachmentUploadVisble: false,
      queryParam: {}
    }
  },
  methods: {
    onCloseClick() {
      this.$emit('update:visible', false)
    },
    onNodeClick({ data, node, tree }) {
      if (data) {
        this.menuInfo = data
        this.getTableDatas()
      }
    },
    onTreeLoaded({ data, curSelectData, tree }) {
    },
    onInputTableTreeClick({ data, node, tree }) {
      if (this.menuInfo.guid === '' || this.menuInfo.guid === undefined) {
        this.$XModal.message({ message: '请先选菜单数据！', status: 'warning' })
        return
      }
      if (data.id && data.id === 'text') {
        this.tableColumnsConfig = getColumns('operationGuideText')
        this.toolbarConfig.buttons = [
          { code: 'toolbar-add', name: '编辑摘要', status: 'primary', callback: this.doAdd },
          { code: 'toolbar-delete', name: '删除', callback: this.doDelete },
          { code: 'toolbar-refresh', name: '刷新', status: '', callback: this.doRefresh }
        ]
      } else {
        this.tableColumnsConfig = getColumns('operationGuideFile')
        this.toolbarConfig.buttons = [
          { code: 'toolbar-upload', name: '附件上传', status: 'primary', callback: this.doUpload },
          { code: 'toolbar-delete', name: '删除', callback: this.doDelete },
          { code: 'toolbar-refresh', name: '刷新', status: '', callback: this.doRefresh }
        ]
      }
      this.operationType = data
      this.getTableDatas()
    },
    getBillId() {
      let billguid = 'OperationGuide-'
      let data = this.menuInfo
      if (JSON.stringify(data) === '{}') {
        this.$XModal.message({ message: '请选择左侧树数据！', status: 'warning' })
        return false
      }
      billguid += data.guid
      return billguid
    },
    // 附件上传
    doUpload(obj, self) {
      if (!this.getBillId()) {
        return
      }
      this.billId = this.getBillId()
      this.queryParam = {
        billId: this.billId,
        doctype: this.operationType.id,
        title: this.operationType.label
      }
      this.attachmentUploadVisble = true
    },
    doAdd() {
      if (JSON.stringify(this.menuInfo) === '{}') {
        this.$XModal.message({ message: '请先选菜单数据！', status: 'warning' })
        return
      }
      if (JSON.stringify(this.operationType) === '{}') {
        this.$XModal.message({ message: '请选择操作类型！', status: 'warning' })
        return
      }
      if (this.tableDatas.length !== 0) {
        this.article = this.tableDatas[0].article
      } else {
        this.article = ''
      }
      this.visible = true
    },
    doConfirm() {
      if (!this.getBillId()) {
        return
      }
      let params = {
        billguid: this.getBillId(),
        doctype: this.operationType.id,
        title: this.operationType.label,
        article: this.article
      }
      this.$http['post']('mp-b-todo-service/todo/opguide', params).then(res => {
        if (res.rscode === '100000') {
          this.$message.success('保存摘要成功')
          this.onCloseClick()
          this.doRefresh()
        } else {
          this.$message.error('保存摘要失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求数据失败')
        this.loadingPage.close()
      })
    },
    doRefresh(obj, self) {
      this.getTableDatas()
    },
    getTableDatas() {
      this.tableDatas = []
      this.billId = 'OperationGuide-'
      this.loadingPage = this.$loading({
        lock: true,
        text: '正在查询中...请您稍候',
        spinner: 'ri-loader-4-line roll',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.billId += this.menuInfo.guid === undefined ? '' : this.menuInfo.guid
      let params = {
        billguid: this.billId,
        doctype: this.operationType.id,
        appid: this.menuInfo.appid
      }
      this.$http['get']('mp-b-todo-service/todo/opguide', params).then(res => {
        if (res.rscode === '100000') {
          res.data.forEach(item => {
            item['filetype'] = this.matchType(item.filename)
          })
          this.tableDatas = res.data
          this.loadingPage.close()
        } else {
          this.$message.error(res.result)
          this.loadingPage.close()
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('请求数据失败')
        this.loadingPage.close()
      })
    },
    // 树加载
    loadTreeData() {
      let self = this
      self.treeDatas = []
      const sysMenu = self.$store.state.systemMenu || []
      let sysMenuCp = [...sysMenu]
      sysMenuCp.forEach(item => {
        let tmpMenu = item
        tmpMenu['label'] = item.code + '-' + item.name
        this.$delete(tmpMenu, 'children')
        self.treeDatas.push(tmpMenu)
      })
      console.log('菜单信息', self.treeDatas)
    },
    // 根据文件名后缀区分 文件类型
    /*
     * @param: fileName - 文件名称
     * @param: 数据返回 1) 无后缀匹配 - false
     * @param: 数据返回 2) 匹配图片 - image
     * @param: 数据返回 3) 匹配 txt - txt
     * @param: 数据返回 4) 匹配 excel - excel
     * @param: 数据返回 5) 匹配 word - word
     * @param: 数据返回 6) 匹配 pdf - pdf
     * @param: 数据返回 7) 匹配 ppt - ppt
     * @param: 数据返回 8) 匹配 视频 - video
     * @param: 数据返回 9) 匹配 音频 - radio
     * @param: 数据返回 10) 其他匹配项 - other
     */
    matchType(fileName) {
      // 后缀获取
      var suffix = ''
      // 获取类型结果
      var result = ''
      try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
      } catch (err) {
        suffix = ''
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false
        return result
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'image'
        return result
      };
      // 匹配txt
      var txtlist = ['txt']
      result = txtlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'txt'
        return result
      };
      // 匹配 excel
      var excelist = ['xls', 'xlsx']
      result = excelist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'excel'
        return result
      };
      // 匹配 word
      var wordlist = ['doc', 'docx']
      result = wordlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'word'
        return result
      };
      // 匹配 pdf
      var pdflist = ['pdf']
      result = pdflist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'pdf'
        return result
      };
      // 匹配 ppt
      var pptlist = ['ppt']
      result = pptlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'ppt'
        return result
      };
      // 匹配 视频
      var videolist = ['mp4', 'm2v', 'mkv']
      result = videolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'video'
        return result
      };
      // 匹配 音频
      var radiolist = ['mp3', 'wav', 'wmv']
      result = radiolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'radio'
        return result
      }
      // 其他 文件类型
      result = 'other'
      return result
    }
  },
  created() {
  },
  mounted() {
    this.loadTreeData()
    this.getTableDatas()
  },
  watch: {
    attachmentUploadVisble: {
      handler(newValue, oldValue) {
        if (!newValue) {
          this.doRefresh()
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.basic-info {
  min-height: 84vh;
}
</style>
