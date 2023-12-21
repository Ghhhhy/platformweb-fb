<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <vxe-modal
      v-if="addModalBtm"
      v-model="addModalBtm"
      title="新增"
      width="66%"
      :height="(activeNameBtm === '2' || activeNameBtm === '6') ? '79%' : '60%'"
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
          <el-tab-pane label="绩效目标" name="2">
            <BsTable
              ref="bgtTblRef"
              height="530"
              :table-columns-config="modalTblColumnsConfig"
              :span-method="objectSpanMethod"
              :table-data="tableData"
              :high-config="{ scrollY: { enabled: false } }"
              :pager-config="false"
              :footer-config="footerConfigs"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
          <el-tab-pane label="项目总投资" name="3">
            <BsForm
              ref="addFormthrid"
              :form-items-config="formItemsConfigThird"
              :form-data-list="formDataListThird"
              @itemChange="insertItemChange"
            />
          </el-tab-pane>
          <el-tab-pane label="项目批复信息" name="4">
            <BsForm
              ref="addFormForth"
              :form-items-config="formItemsConfigForth"
              :form-data-list="formDataListForth"
            />
          </el-tab-pane>
          <el-tab-pane label="相关部门联系方式" name="5">
            <BsTable
              height="350"
              :table-columns-config="modalTblColumnsConfigFv"
              :table-data="tableDataFv"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigInmodal"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="6">
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
      importConlum: [
        {
          title: '一级绩效指标代码',
          field: 'lvl1code'
        },
        {
          title: '一级绩效指标名称',
          field: 'lvl1name'
        },
        {
          title: '二级绩效指标代码',
          field: 'lv1code'
        },
        {
          title: '二级绩效指标名称',
          field: 'lvl2name'
        },
        {
          title: '三级绩效指标代码',
          field: 'lvl3code'
        },
        {
          title: '三级绩效指标名称',
          field: 'lvl3name'
        },
        {
          title: '绩效指标说明',
          field: 'des'
        },
        {
          title: '指标值',
          field: 'value'
        },
        {
          title: '指标顺序码',
          field: 'sort'
        }
      ],
      footerConfigs: {
        totalObj: {
          aviamt: 0
        },
        showFooter: true
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
          title: '项目地址',
          width: 200,
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '主要监理单位',
          width: 200,
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '主要施工单位',
          width: 200,
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          title: '项目单位负责人',
          children: [
            {
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '手机',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            }
          ]
        },
        {
          title: '财务负责人',
          children: [
            {
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '手机',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            }
          ]
        },
        {
          title: '项目负责人',
          children: [
            {
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '手机',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            }
          ]
        },
        {
          title: '工作联系人',
          children: [
            {
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              title: '手机',
              width: 200,
              editRender: {
                name: '$vxeInput'
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
          title: '项目总投资',
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
          field: 'id_card_no',
          title: '财政区划',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入财政区划', disabled: true } }
        },
        {
          field: 'card_no',
          title: '预算级次',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入预算级次', disabled: true } }
        },
        {
          field: 'card_no_a',
          title: '项目名称',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: true } }
        },
        {
          field: 'card_no_b',
          title: '项目代码',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目代码', disabled: true } }
        },
        {
          field: 'card_no_c',
          title: '增发国债资金中央转移支付项目名称',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目名称', disabled: true } }
        },
        {
          field: 'card_no_d',
          title: '增发国债资金中央转移支付项目代码',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目代码', disabled: true } }
        },
        {
          field: 'dept_',
          title: '项目主管部门',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: true,
              placeholder: '请选择项目主管部门',
              isServer: true,
              serverUri: 'pay-clear-service/v3/elementtree',
              elecode: 'dept',
              queryparams: {
                elementCode: 'dept'
              }
            }
          }
        },
        {
          field: 'card_no_e',
          title: '项目所属投向领域',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目所属投向领域' } }
        },
        {
          field: 'card_no_f',
          title: '项目主要建设内容',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目主要建设内容' } }
        },
        {
          field: 'card_no_g',
          title: '开工或预计开工时间',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择开工或预计开工时间' } }
        },
        {
          field: 'card_no_h',
          title: '预计完工时间',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择预计完工时间' } }
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
      menuName: '财政部门维护信息',
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
              code: 'pay-import',
              label: '导入',
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
    handleImport() {
      let self = this
      self.$refs.tmp.$refs.tableRef.triggerImportOption({
        downloadTemplateCallback() {
          const a = document.createElement('a')
          a.setAttribute('download', '')
          a.setAttribute('href', 'static/files/国债资金监控导入模板.xlsx')
          a.click()
        },
        importSuccessCallback(res) {
          self.$message.success('导入成功')
          let basicInfo = res['基本情况明细表']
          basicInfo.shift()
          let basicInfoRes = basicInfo.map(item => {
            return {
              mof_div_name: item['财政区划'],
              pro_agency_name: item['项目单位'],
              budget_level_name: item['预算级次'],
              spe_pro_code: item['项目代码'],
              spe_pro_name: item['项目名称'],
              fund_invest_area_name: item['项目所属投向领域'],
              pro_content: item['项目主要建设内容'],
              pro_sta_date: item['开工或预计开工时间'],
              pro_end_date: item['预计完工时间'],
              ndrc_pro_code: item['发改委项目代码'],
              ndrc_pro_name: item['发改委项目名称'],
              track_pro_name: item['增发国债资金中央转移支付项目名称'],
              track_pro_code: item['增发国债资金中央转移支付项目代码'],
              pro_dept_name: item['项目主管部门'],
              pro_gi: item['项目总投资'],
              pro_approve_number: item['项目审批（核准、备案）文号'],
              land_approve_number: item['用地审批文号'],
              eia_approve_number: item['环评审批文号'],
              cons_approve_number: item['施工许可文号'],
              pro_address: item['项目地址'],
              est_agency_name: item['主要监理单位'],
              cons_agency_name: item['主要施工单位'],
              agency_leader_per_name: item['项目单位负责人'],
              agency_leader_per_otel: item['__EMPTY_8'],
              agency_leader_per_mtel: item['__EMPTY_9'],
              fi_leader: item['财务负责人'],
              fi_leader_otel: item['__EMPTY_10'],
              fi_leader_mtel: item['__EMPTY_11'],
              pro_leader: item['项目负责人'],
              pro_leader_otel: item['__EMPTY_12'],
              pro_leader_mtel: item['__EMPTY_13'],
              pro_lessor: item['工作联系人'],
              pro_lessor_otel: item['__EMPTY_14'],
              pro_lessor_mtel: item['__EMPTY_15'],
              pro_perf_all: item['总体绩效目标'],
              pro_gi_addnb: item['__EMPTY'],
              pro_gi_cff: item['__EMPTY_1'],
              pro_gi_cfo: item['__EMPTY_2'],
              pro_gi_lff: item['__EMPTY_3'],
              pro_gi_ef: item['__EMPTY_4'],
              pro_gi_lb: item['__EMPTY_5'],
              pro_gi_bankl: item['__EMPTY_6'],
              pro_gi_oth: item['__EMPTY_7']
            }
          })
          console.log(basicInfoRes)
          let bgtInfo = res['国债资金项目绩效指标']
          let bgtRes = bgtInfo.map(item => {
            return {
              spe_pro_code: item['项目代码'],
              spe_pro_name: item['项目名称'],
              lv1_perf_ind_code: item['一级绩效指标代码'],
              lv1_perf_ind_name: item['一级绩效指标名称'],
              lv2_perf_ind_code: item['二级绩效指标代码'],
              lv2_perf_ind_name: item['二级绩效指标名称'],
              lv3_perf_ind_code: item['三级绩效指标代码'],
              lv3_perf_ind_name: item['三级绩效指标名称'],
              kpi_content: item['绩效指标说明'] ? item['绩效指标说明'] : '',
              kpi_val: item['指标值']
            }
          })
          console.log(bgtRes)
        }
      })
    },
    onImportSuccess(data) {
      // this.$message.success('导入成功')
      // this.tableData = data
    },
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
      data.sums = this.clearFormat(data.a1) + this.clearFormat(data.a2) + this.clearFormat(data.a3) + this.clearFormat(data.a4) + this.clearFormat(data.a5) + this.clearFormat(data.a6) + this.clearFormat(data.a7) + this.clearFormat(data.a8)
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
    objectSpanMethod({ row, column, rowIndex, columnIndex, visibleData }) {
      if (columnIndex === 2) {
        const cellValue = row['lvl1name']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lvl1name'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lvl1name'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
      if (columnIndex === 3) {
        const cellValue = row['lvl2name']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lvl2name'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lvl2name'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    objectSpanMethods({ row, column, rowIndex, columnIndex }) {
      const fields = ['lvl1name']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = this.tableData[rowIndex - 1]
        let nextRow = this.tableData[rowIndex + 1]
        if (prevRow && prevRow[column.field] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.field] === cellValue) {
            nextRow = this.tableData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    handleSure() {

    },
    onBtnClick(obj) {
      if (obj.code === 'pay-add') {
        this.addModalBtm = true
      }
      if (obj.code === 'pay-import') {
        this.handleImport()
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
