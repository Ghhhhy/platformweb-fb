/*
 * @Author: 轻语
 * @Date: 2021-11-03 09:58:15
 * @LastEditors: Comer
 * @LastEditTime: 2023-03-15 11:31:34
 * @Description: 工具栏配置
 */

export default {
  props: {
    toolbarConfig: { // 工具栏配置
      type: [Object, Boolean],
      default () {
        return {}
      }
    },
    defaultMoneyUnit: {
      type: Number,
      default: 1
    },
    isRound: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    defaultMoneyUnit: {
      handler(newvalue, oldValue) {
        this.moneyUnit = this.defaultMoneyUnit
      },
      immediate: true
    },
    toolbarConfig: { // 工具栏配置监听
      handler() {
        this.initToolbar()
      },
      deep: true
      // immediate: true
    },
    moneyUnit: { // 金额单位变换
      handler(newValue, oldValue) {
        this.setMoneyUnit(newValue, oldValue)
      }
      // immediate: true
    },
    isRound: {
      handler(val) {
        this.isRoundIn = val
      },
      immediate: true
    }
  },
  data() {
    return {
      caliberDeclareVisible: false, // 报表口径说明弹窗显隐状态
      expandAllState: false, // 树表格 -> 是否展开全部按钮状态
      toolbarConfigInCopy: {
        yearList: []
      },
      curSelectMoneyUnitOption: { // 当前选择金额单位配置
        value: 1,
        label: '元', // 元
        inputDigits: 2, // 录入最大允许位数
        viewDigits: 2 // 显示位数
      },
      moneyUnit: 1,
      isRoundIn: false,
      toolbarConfigIn: { // table工具栏配置
      },
      toolbarConfigInCp: {
        reverseCheck: false,
        moneyInputSwich: true, // 是否开启money单位切换输入
        batchModify: false, // 批量修改
        copyColumn: { // 复制某列数据到另一列
          enabled: false,
          checkbox: false
        },
        yearList: [],
        disabledMoneyConversion: false,
        moneyConversion: true, // 是否有金额转换
        search: false, // 是否有search 可选值：true(本地过滤)||false(关闭本地过滤)||'remoteSearch'(远程过滤)
        advancedSearch: false, // 是否有高级search
        calculator: false,
        refresh: true,
        import: false, // 导入
        export: true, // 导出
        exportCustom: false, // 如果导出需要自主控制，则自定义控制
        print: false, // 打印
        zoom: true, // 缩放
        custom: true, // 选配展示列
        moneyUnitOptions: [ // 金额单位配置
          {
            value: 1,
            label: '元', // 元
            inputDigits: 2, // 录入最大允许位数
            viewDigits: 2 // 显示位数
          },
          {
            value: 10000,
            label: '万元', // 万元
            inputDigits: 4, // 录入最大允许位数
            viewDigits: 4 // 显示位数
          }
        ],
        slots: {
          tools: 'toolbarTools'
          // buttons: 'toolbarSlots'
        }
      }
    }
  },
  methods: {
    initToolbar(toolbarConfig) { // 初始化工具栏
      let curToolbarConfig = toolbarConfig || this.toolbarConfig
      if (this.getBasicDataType(curToolbarConfig) === 'Boolean') {
        this.toolbarConfigIn = undefined
        this.toolbarConfigInCopy = this.toolbarConfigInCp || {}
      } else {
        if (curToolbarConfig.visible === false) {
          this.toolbarConfigIn = undefined
          this.toolbarConfigInCopy = this.toolbarConfigInCp
        } else {
          this.toolbarConfigIn = Object.assign({}, this.toolbarConfigInCp, curToolbarConfig)
          this.toolbarConfigInCopy = this.toolbarConfigIn
        }
        if (this.toolbarConfigInCopy.yearList.length) {
          this.formSearchData.year = this.toolbarConfigInCopy.yearList[0]
        }
      }
      this.setMoneyUnit(this.moneyUnit)
    },
    setMoneyUnit(Unitlevel, oldUnitlevel) {
      // 设置金额单位
      let xGrid = this.$refs.xGrid
      if (!xGrid) {
        return
      }
      xGrid.$forceUpdate()
      this.$refs.xGrid.updateBodyTopRows && this.$refs.xGrid.updateBodyTopRows()
      xGrid.updateFooter().then(() => { }).catch(() => { })
      this.$emit('switchMoneyUnit', Unitlevel, this)
    },
    // setMoneyUnit(newVal) { // 设置金额单位
    //   this.toolbarConfigInCopy.moneyUnitOptions.forEach((item, index) => {
    //     if (item.value === newVal) {
    //       this.curSelectMoneyUnitOption = item
    //     }
    //   })
    //   let xGrid = this.$refs.xGrid
    //   if (!xGrid) {
    //     return
    //   }
    //   xGrid.updateData()
    //   xGrid.updateFooter().then(() => { }).catch(() => { })
    // },
    toolbarButtonClickEvent(obj, e) { // toolbar事件代理
      // 工具栏左侧按钮点击事件
      let self = this
      self.$emit('onToolbarBtnClick', obj, this)
      let methods = this.tableConfigCp.methods
      if (typeof (obj.button.callback) === 'function') {
        obj.button.callback(obj, self, e)
      } else {
        typeof (methods.toolbarButtonClickEvent) === 'function' && methods.toolbarButtonClickEvent(obj, self, e)
      }
    },
    onToolbarOperateClick(code) {
      let self = this
      switch (code) {
        case 'reverseCheck':
          this.triggerReverseCheck().then((res) => {
            this.$emit('triggerReverseCheck', { records: res }, this)
            this.$emit('ProxyEvent', 'triggerReverseCheck', { records: res }, this)
          }).catch(e => {
            console.log(e)
            throw (e)
          })
          break
        case 'refresh':
          this.$emit('onToolbarBtnClick', { context: this, xGrid: this.$refs.xGrid, code: 'refresh' })
          break
        case 'calculator':
          this.$XModal.message({ status: 'info', message: '此功能正在开发中' })
          break
        case 'zoom':
          this.$refs.xGrid.zoom().then(() => { }).catch(() => { })
          if (this.$lodash.keys(this.$store.state || {}).includes('tableFullScreenHideHeader')) {
            if (this.$refs.xGrid.isMaximized()) {
              this.$store.commit('setTableFullScreenHideHeader', true)
            } else {
              this.$store.commit('setTableFullScreenHideHeader', false)
            }
          }
          break
        case 'export':
          if (this.toolbarConfigIn && this.toolbarConfigIn.exportCustom) {
            this.$emit('onToolbarBtnClick', { context: this, xGrid: this.$refs.xGrid, code: 'export' })
          } else {
            this.triggerExportOption()
          }
          break
        case 'custom':
          break
        case 'import':
          this.triggerImportOption(
            {
              downloadTemplateCallback(Cb) {
                self.downLoadImportTemplate()
              },
              importSuccessCallback(res, files) {
                self.$emit('importSuccessCallback', res, files)
              }
            }
          )
          break
        case 'fixed':
          self.$emit('fixedTableChange')
          break
        case 'expandAll':
          setTimeout(() => {
            const handle = this.expandAllState
              ? () => this.$refs.xGrid?.clearTreeExpand?.()
              : () => this.$refs.xGrid?.setAllTreeExpand?.(true)
            handle()
              .finally(() => {
                this.expandAllState = !this.expandAllState
              })
          })
          break
      }
    },
    formSearchSubmit({ data, $event }) {
      let newTableData = []
      let search = this.formSearchData.filterValue
      if (search !== '') {
        this.tableDataIn.forEach(dataNews => {
          let newColumnsList = this.tableColumnsFieldArr
          // console.log(newColumnsList)
          for (let i = 0; i < Object.keys(dataNews).length; i++) {
            if (newColumnsList.includes(Object.keys(dataNews)[i]) && String(dataNews[Object.keys(dataNews)[i]]).indexOf(search) > -1) {
              newTableData.push(dataNews)
              break
            }
          }
        })
        this.reloadTableRenderData(newTableData)
      } else {
        this.reloadTableRenderData(this.tableDataIn)
      }
    },
    // 反选
    triggerReverseCheck() {
      let self = this
      let xGrid = self.$refs.xGrid
      return new Promise((resolve, reject) => {
        let selection = xGrid.getCheckboxRecords()
        let { tableData } = xGrid.getTableData()
        xGrid.setCheckboxRow(tableData, true).then(() => {
          xGrid.setCheckboxRow(selection, false).then(() => {
            self.selection = xGrid.getCheckboxRecords()
            resolve(self.selection)
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  mounted() {
    this.initToolbar()
  }
}
