<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <vxe-modal
      v-if="addModalBtm"
      v-model="addModalBtm"
      title="新增"
      width="66%"
      :height="(activeNameBtm === '6' || activeNameBtm === '7') ? '79%' : '60%'"
      :show-footer="true"
    >
      <div style="height: 100%; overflow: hidden">
        <el-tabs v-model="activeNameBtm" type="border-card">
          <el-tab-pane label="基本情况" name="1">
            <BsForm
              ref="addForm"
              :form-items-config="formItemsConfigBtm"
              :form-data-list="formDataListBtm"
            />
          </el-tab-pane>
          <el-tab-pane label="累计可用资金" name="2">
            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigThird"
              :form-data-list="formDataListThird"
              @itemChange="insertItemChange"
            />
          </el-tab-pane>
          <el-tab-pane label="累计最终支付资金" name="3">
            <BsTable
              height="340"
              :table-columns-config="modalTblColumnsConfigFv"
              :table-data="tableDataFv"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
          <el-tab-pane label="累计最终支付资金投资完成额" name="4">
            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigFive"
              :form-data-list="formDataListFive"
            />
          </el-tab-pane>
          <el-tab-pane label="形象进度" name="5">
            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigSx"
              :form-data-list="formDataListSx"
            />
          </el-tab-pane>
          <el-tab-pane label="绩效目标完成情况" name="6">
            <BsTable
              height="530"
              :table-columns-config="modalTblColumnsConfig"
              :span-method="objectSpanMethod"
              :table-data="tableData"
              :high-config="{ scrollY: { enabled: false } }"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="7">
            <el-upload
              ref="fileUpload"
              action="#"
              multiple
              :show-file-list="false"
              :data="uploadDFileParams"
              :on-remove="handleRemove"
              :http-request="handelUploadDebugfile"
            >
              <!-- <div class="fn-inline"> -->
              <div class="fn-inline" style="float:left">
                <div class="footer-btn" style="margin-left: 10px; padding-left: 10px;">
                  <el-row
                    style="display: inline-block;height: 42px;"
                  >
                    <el-col :span="16">
                      <span class="sp-my">上传附件</span>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div slot="tip" class="fn-inline upload-my-css">
                <div class="fn-inline" style="height:33px;float:left">
                  <span class="sp-my-two">支持png/jpg/pdf等，不超过20M</span>
                </div>
              </div>
            </el-upload>
            <BsTable
              height="460"
              :table-columns-config="modalTblColumnsConfigSx"
              :table-data="tableDataSx"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <vxe-button @click="addModalBtm = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSure">确认</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItemsConfigSx: [
        {
          title: '形象进度',
          field: 'sum',
          span: 24,
          titleWidth: '240',
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '进度1',
                value: '1'
              },
              {
                label: '进度2',
                value: '2'
              }
            ]
          }
        },
        {
          title: '形象进度说明',
          field: 'sum',
          span: 24,
          titleWidth: '240',
          itemRender: { name: '$input', props: { placeholder: '请输入形象进度说明' } }
        }
      ],
      formDataListSx: {},
      formItemsConfigFive: [
        {
          title: '累计最终支付资金投资完成额',
          field: 'sum',
          span: 24,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { placeholder: '请输入累计最终支付资金投资完成额' } }
        }
      ],
      formDataListFive: {
        sum: ''
      },
      activeNameBtm: '1',
      uploadDFileParams: [],
      attachmentId: '',
      fileDataBakDel: [],
      fileData: [],
      modalTblColumnsConfigSx: [
        {
          title: '附件名称',
          field: 'filename'
        },
        {
          title: '上传时间',
          field: 'time'
        },
        {
          title: '附件分类',
          field: 'type',
          editRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '分类1'
              },
              {
                label: '分类2'
              }
            ]
          }
        },
        {
          title: '附件说明',
          field: 'des',
          editRender: {
            name: '$vxeInput'
          }
        }
      ],
      tableDataSx: [],
      tableDataFv: [
        {
          name: 1
        }
      ],
      modalTblColumnsConfigFv: [
        {
          title: '增发国债资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '中央预算内投资',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '其他中央财政性建设资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '地方财政资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '企业自有资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '地方政府专项债券',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '银行贷款',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        },
        {
          title: '其他资金',
          children: [
            {
              title: '建筑安装工程投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '设备投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '待摊投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            },
            {
              title: '其他投资支出',
              width: 200,
              editRender: {
                name: '$vxeMoney'
              }
            }
          ]
        }
      ],
      formItemsConfigForth: [
        {
          field: 'b1',
          title: '项目审批（核准、备案）文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目审批（核准、备案）文号' } }
        },
        {
          field: 'b2',
          title: '用地审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入用地审批文号' } }
        },
        {
          field: 'b3',
          title: '环评审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入环评审批文号' } }
        },
        {
          field: 'b4',
          title: '施工许可文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入施工许可文号' } }
        }
      ],
      formDataListForth: {},
      formDataListThird: {
        sums: '',
        a1: '',
        a2: ''
      },
      formItemsConfigThird: [
        {
          field: 'sums',
          title: '合计',
          span: 24,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '自动生成', disabled: true } }
        },
        {
          field: 'a1',
          title: '增发国债资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入增发国债资金' } }
        },
        {
          field: 'a2',
          title: '中央预算内投资',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入中央预算内投资' } }
        },
        {
          field: 'a3',
          title: '其他中央财政性建设资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他中央财政性建设资金' } }
        },
        {
          field: 'a4',
          title: '地方财政资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方财政资金' } }
        },
        {
          field: 'a5',
          title: '企业自有资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入企业自有资金' } }
        },
        {
          field: 'a6',
          title: '地方政府专项债券',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方政府专项债券' } }
        },
        {
          field: 'a7',
          title: '银行贷款',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入银行贷款' } }
        },
        {
          field: 'a8',
          title: '其他资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他资金' } }
        }
      ],
      activeNameTop: '1',
      formItemsConfigBtm: [
        {
          field: 'agency_',
          title: '项目单位',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: true,
              placeholder: '请选择项目单位',
              isServer: true,
              serverUri: 'pay-clear-service/v3/elementtree',
              elecode: 'AGENCY',
              queryparams: {
                elementCode: 'AGENCY',
                menuguid: 'B198CFFC387EA6D1E1307A101AA5A8F1',
                relationCondition: ''
              }
            }
          }
        },
        {
          field: 'card_no_a',
          title: '项目名称',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: true } }
        },
        {
          field: 'month',
          title: '月报周期',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$vxeSelect',
            options: [
              {
                label: '1月',
                value: '1'
              },
              {
                label: '2月',
                value: '2'
              }
            ]
          }
        }
      ],
      formDataListBtm: {
        agency_: '',
        id_card_no: '',
        card_no: '',
        card_no_a: '',
        card_no_b: '',
        card_no_c: '',
        card_no_d: '',
        dept_: ''
      },
      addModalBtm: false,
      tableToolbarConfigInmodal: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableData: [],
      modalTblColumnsConfig: [
        {
          title: '一级指标',
          field: 'lvl1name'
        },
        {
          title: '二级指标',
          field: 'lvl2name'
        },
        {
          title: '三级指标',
          field: 'lvl3name'
        },
        {
          title: '指标值',
          field: 'value'
        },
        {
          title: '指标完成情况',
          field: 'amt',
          editRender: {
            name: '$vxeMoney'
          }
        }
      ],
      addModal: false,
      hideTree: true,
      tableColumnsIdConfig: [
        {
          code: '1',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '2',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '3',
          tid: '950D6C7306584E548C173C80F808396A',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目月度信息表',
      tableUrl: '',
      tableParams: {

      },
      hideZero: true,
      tableCountUrl: '',
      tableCountParams: {

      },
      toolBarStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png',
            iconUrl: '',
            label: '待办事项',
            code: '1',
            curValue: '1'
          },
          {
            type: 'button',
            iconName: 'base-yiban.png',
            iconNameActive: 'base-yiban-active.png',
            iconUrl: '',
            label: '已办事项',
            code: '2',
            curValue: '2'
          },
          {
            type: 'button',
            iconName: 'base-all.png',
            iconNameActive: 'base-all-active.png',
            iconUrl: '',
            label: '曾经办',
            code: '3',
            curValue: '3'
          }
        ],
        curButton: {
          type: 'button',
          iconName: 'base-daiban.png',
          iconNameActive: 'base-daiban-active.png',
          iconUrl: '',
          label: '待办事项',
          code: '1',
          curValue: '1'
        },
        buttonsInfo: {
          '1': [
            {
              code: 'pay-add',
              label: '新增',
              status: 'primary'
            },
            {
              code: 'pay-edit',
              label: '修改'
            },
            {
              code: 'pay-discard',
              label: '作废'
            },
            {
              code: 'pay-audit',
              label: '送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销送审'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ]
        }
      },
      currentRow: {}
    }
  },
  methods: {
    clearFormat(str) {
      str += ''
      str = str.replace(/,/g, '')
      let i = parseFloat(str)
      if (isNaN(i)) {
        i = 0
      }
      return i
    },
    insertItemChange({ $form, property, itemValue, data }, bsform) {
      if (property === 'a1') {
        let sums = this.clearFormat(data.sums)
        data.sums = sums + this.clearFormat(data.a1)
      }
      if (property === 'a2') {
        let sums = this.clearFormat(data.sums)
        data.sums = sums + this.clearFormat(data.a2)
      }
    },
    fileUpload(params) {
      return this.$http.post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
    },
    handelUploadDebugfile(e) {
      const form = new FormData()
      const temp = []
      // 文件对象
      form.append('file', e.file)
      form.append('filename', e.file.name)
      form.append('appid', 'pay_plan_voucher')
      temp.push(e.file.name)
      form.append('doctype', '')
      form.append('year', this.$store.state.userInfo.year)
      form.append('province', this.$store.state.userInfo.province)
      form.append('userguid', this.$store.state.userInfo.guid)
      form.append('billguid', this.$ToolFn.utilFn.getUuid())
      this.addLoading = true
      this.fileUpload(form).then(res => {
        this.addLoading = false
        if (res.rscode === '100000') {
          let resultData = ''
          if (res.data || res.data != null) {
            resultData = res.data
          } else {
            resultData = res.result
          }
          let data = {}
          temp.push(resultData)
          data['year'] = this.$store.state.userInfo.year
          data['count'] = 0
          data['filesize'] = e.file.size
          data['filename'] = e.file.name
          data['fileguid'] = resultData
          data['filepath'] = e.file.webkitRelativePath
          data['province'] = this.$store.state.userInfo.province
          data['appid'] = 'pay_plan_voucher'
          data['creater'] = e.file.uid
          data['guid'] = this.$store.state.userInfo.guid
          data['billguid'] = this.$ToolFn.utilFn.getUuid()
          data['importuser'] = this.$store.state.userInfo.name
          data['time'] = new Date().toLocaleDateString()
          data['type'] = ''
          this.tableDataSx.push(data)
          this.$message.success('上传成功')
        } else {
          if (res.result.includes('Size: 0')) {
            this.$message.error('上传失败,不能上传空文件')
          }
          this.$message.error('上传失败：' + res.result)
        }
      }).catch()
    },
    handleRemove() {},
    addLevelOneLeft() {
      this.tableData.push({
        level1: '',
        level2: '',
        level3: ''
      })
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(row, column)
      if (columnIndex === 2) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 3) {

      }
    },
    handleSure() {

    },
    onBtnClick(obj) {
      if (obj.code === 'pay-add') {
        this.addModalBtm = true
      }
    }
  }
}
</script>
<style scoped lang="scss">
.Titans-form ::v-deep .vxe-form .boss-tree__input .el-select {
  height: 34px;
}
</style>
