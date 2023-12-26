<template>
  <div style="height: 100%">
    <BsTemplate ref="tmp" @btnclick="onBtnClick" />
    <vxe-modal
      v-if="showModal"
      ref="modalForm"
      v-model="modalForm"
      :title="modalTitle"
      width="66%"
      :height="(activeNameBtm === '2' || activeNameBtm === '6') ? '79%' : '60%'"
      :show-footer="false"
      :destroy-on-close="true"
      @close="closeModal"
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
            <BsForm
              ref="contactInformationForm"
              :form-items-config="contactInformationFormConfig"
              :form-data-list="contactInformationFormData"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="6">
            <BsTable
              ref="fileDataRef"
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
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfoFirstAudit.js'

export default {
  data() {
    return {
      menuId: '',
      isLastInst: '',
      modalTitle: '',
      modalForm: '',
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
          field: 'fileName'
        },
        {
          title: '上传时间',
          field: 'createTime'
        },
        {
          title: '附件分类',
          field: 'proAttchKindCode',
          editRender: {
            name: '$vxeSelect',
            options: [
              { value: '01', label: '项目审批（核准、备案）资料' },
              { value: '02', label: '项目用地审批、环评审批、施工许可资料' },
              { value: '03', label: '项目招投标和政府采购资料' },
              { value: '04', label: '项目主要合同资料' },
              { value: '05', label: '项目评审报告' },
              { value: '11', label: '资金支出佐证资料' },
              { value: '12', label: '财务会计资料' },
              { value: '13', label: '工程资料' },
              { value: '14', label: '项目形象进度照片' },
              { value: '15', label: '竣工验收资料' },
              { value: '99', label: '其他' }
            ],
            props: {
              placeholder: '请选择附件分类'
            }
          }
        },
        {
          title: '附件说明',
          field: 'kpiRemark',
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
      contactInformationFormConfig: [
        {
          field: 'proAddress',
          title: '项目地址',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目地址', disabled: false } }
        },
        {
          field: 'estAgencyName',
          title: '主要监理单位',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入主要监理单位', disabled: false } }
        },
        {
          field: 'consAgencyName',
          title: '主要施工单位',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入主要施工单位', disabled: false } }
        },
        {
          field: 'agencyLeaderPerName',
          title: '项目单位负责人姓名',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目单位负责人姓名', disabled: false } }
        },
        {
          field: 'agencyLeaderPerOtel',
          title: '项目单位负责人办公电话',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目单位负责人办公电话', disabled: false } }
        },
        {
          field: 'agencyLeaderPerMtel',
          title: '项目单位负责人手机',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目单位负责人手机', disabled: false } }
        },
        {
          field: 'fiLeader',
          title: '财务负责人姓名',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入财务负责人姓名', disabled: false } }
        },
        {
          field: 'fiLeaderOtel',
          title: '财务负责人办公电话',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入财务负责人办公电话', disabled: false } }
        },
        {
          field: 'fiLeaderMtel',
          title: '财务负责人手机',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入财务负责人手机', disabled: false } }
        },
        {
          field: 'proLeader',
          title: '项目负责人姓名',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目负责人姓名', disabled: false } }
        },
        {
          field: 'proLeaderOtel',
          title: '项目负责人办公电话',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目负责人办公电话', disabled: false } }
        },
        {
          field: 'proLeaderMtel',
          title: '项目负责人手机',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目负责人手机', disabled: false } }
        },
        {
          field: 'proLessor',
          title: '工作联系人姓名',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入工作联系人姓名', disabled: false } }
        },
        {
          field: 'proLessorOtel',
          title: '工作联系人办公电话',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入工作联系人办公电话', disabled: false } }
        },
        {
          field: 'proLessorMtel',
          title: '工作联系人手机',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入工作联系人手机', disabled: false } }
        }
      ],
      contactInformationFormData: {
        proAddress: '',
        estAgencyName: '',
        consAgencyName: '',
        agencyLeaderPerName: '',
        agencyLeaderPerOtel: '',
        agencyLeaderPerMtel: '',
        fiLeader: '',
        fiLeaderOtel: '',
        fiLeaderMtel: '',
        proLeader: '',
        proLeaderOtel: '',
        proLeaderMtel: '',
        proLessor: '',
        proLessorOtel: '',
        proLessorMtel: ''
      },
      modalTblColumnsConfigFv: [
        {
          title: '项目地址',
          width: 200,
          field: 'proAddress',
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          field: 'estAgencyName',
          title: '主要监理单位',
          width: 200,
          editRender: {
            name: '$vxeInput'
          }
        },
        {
          field: 'consAgencyName',
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
              field: 'agencyLeaderPerName',
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'agencyLeaderPerOtel',
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'agencyLeaderPerMtel',
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
              field: 'fiLeader',
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'fiLeaderOtel',
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'fiLeaderMtel',
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
              field: 'proLeader',
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'proLeaderOtel',
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'proLeaderMtel',
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
              field: 'proLessor',
              title: '姓名',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'proLessorOtel',
              title: '办公电话',
              width: 200,
              editRender: {
                name: '$vxeInput'
              }
            },
            {
              field: 'proLessorMtel',
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
          field: 'proApproveNumber',
          title: '项目审批（核准、备案）文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目审批（核准、备案）文号' } }
        },
        {
          field: 'landApproveNumber',
          title: '用地审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入用地审批文号' } }
        },
        {
          field: 'eiaApproveNumber',
          title: '环评审批文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入环评审批文号' } }
        },
        {
          field: 'consApproveNumber',
          title: '施工许可文号',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入施工许可文号' } }
        }
      ],
      formDataListForth: {
        proApproveNumber: '',
        landApproveNumber: '',
        eiaApproveNumber: '',
        consApproveNumber: ''
      },
      formDataListThird: {
        sums: '',
        proGi: '',
        proGiAddnb: '',
        proGiCff: '',
        proGiCfo: '',
        proGiLff: '',
        proGiEf: '',
        proGiLb: '',
        proGiBankl: ''
      },
      formItemsConfigThird: [
        {
          field: 'proGi',
          title: '项目总投资',
          span: 24,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '自动生成', disabled: true } }
        },
        {
          field: 'proGiAddnb',
          title: '增发国债资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入增发国债资金' } }
        },
        {
          field: 'proGiCff',
          title: '中央预算内投资',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入中央预算内投资' } }
        },
        {
          field: 'proGiCfo',
          title: '其他中央财政性建设资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他中央财政性建设资金' } }
        },
        {
          field: 'proGiLff',
          title: '地方财政资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方财政资金' } }
        },
        {
          field: 'proGiEf',
          title: '企业自有资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入企业自有资金' } }
        },
        {
          field: 'proGiLb',
          title: '地方政府专项债券',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入地方政府专项债券' } }
        },
        {
          field: 'proGiBankl',
          title: '银行贷款',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入银行贷款' } }
        },
        {
          field: 'proGiOth',
          title: '其他资金',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$vxeMoney', props: { type: 'string', required: true, placeholder: '请输入其他资金' } }
        }
      ],
      activeNameTop: '1',
      formItemsConfigBtm: [
        {
          field: 'proAgencyName',
          title: '项目单位',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目单位', disabled: true } }
        },
        {
          field: 'mofDivName',
          title: '财政区划',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入财政区划', disabled: false } }
        },
        {
          field: 'budgetLevelName',
          title: '预算级次',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入预算级次', disabled: false } }
        },
        {
          field: 'speProName',
          title: '项目名称',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'speProCode',
          title: '项目代码',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目代码', disabled: false } }
        },
        {
          field: 'trackProName',
          title: '增发国债资金中央转移支付项目名称',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目名称', disabled: false } }
        },
        {
          field: 'trackProCode',
          title: '增发国债资金中央转移支付项目代码',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目代码', disabled: false } }
        },
        {
          field: 'proDeptName',
          title: '项目主管部门',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: false,
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
          field: 'fundInvestAreaName',
          title: '项目所属投向领域',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目所属投向领域' } }
        },
        {
          field: 'proContent',
          title: '项目主要建设内容',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目主要建设内容' } }
        },
        {
          field: 'proStaDate',
          title: '开工或预计开工时间',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择开工或预计开工时间' } }
        },
        {
          field: 'proEndDate',
          title: '预计完工时间',
          span: 12,
          titleWidth: '240',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择预计完工时间' } }
        }
      ],
      formDataListBtm: {
        proAgencyCode: '',
        mofDivName: '',
        budgetLevelName: '',
        speProName: '',
        speProCode: '',
        trackProName: '',
        trackProCode: '',
        proDeptName: '',
        fundInvestAreaName: '',
        proContent: '',
        proStaDate: '',
        proEndDate: ''
      },
      showModal: false,
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
          field: 'lv1PerfIndName'
        },
        {
          title: '二级指标',
          field: 'lv2PerfIndName'
        },
        {
          title: '三级指标',
          field: 'lv3PerfIndName'
        },
        {
          title: '指标值',
          field: 'kpiVal'
        }
      ],
      addModal: false,
      hideTree: true,
      tableColumnsIdConfig: [
        {
          code: '1',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '2',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        },
        {
          code: '0',
          tid: '436FEE6C7CB5474C822D91546240423D',
          qid: '315DDFED8D444D678B5C65E6DB5087E3'
        }
      ],
      menuName: '增发国债资金项目基本信息审核',
      tableUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/list',
      tableParams: {
        appId: 'pm_project_info_detail'
      },
      hideZero: true,
      tableCountUrl: '/dfr-monitor-service/dfr/pmProjectInfoDetail/count',
      tableCountParams: {
        statusCodeArr: ['1', '2'],
        appId: 'pm_project_info_detail'
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
              code: 'pay-audit',
              label: '审核'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ],
          '2': [
            {
              code: 'pay-unAudit',
              label: '撤销审核'
            },
            {
              code: 'pay-checkDetails',
              label: '查看详情'
            }
          ]
        }
      },
      currentRow: {},
      proDetId: ''
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
    this.isLastInst = this.$store.state.curNavModule.param5.isLastInst
  },
  methods: {
    closeModal() {
      this.showModal = false
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
    fileUpload(params) {
      return this.$http.post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
    },
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
    onBtnClick(obj) {
      if (obj.code === 'pay-checkDetails') {
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.viewDetail()
      }
      if (obj.code === 'pay-audit') {
        this.auditRecord(2)
      }
      if (obj.code === 'pay-unAudit') {
        this.auditRecord(3)
      }
    },
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
        return item.proDetId
      })
      let params = {
        ids: ids,
        appId: 'pm_project_info_detail',
        menuId: localThis.menuId,
        isLastInst: localThis.isLastInst,
        actionType: type,
        actionName: type === 2 ? '送审' : '撤销送审'
      }
      HttpModule.auditDataRecords(params).then((res) => {
        if (res.rscode === '200') {
          localThis.$message.success('操作成功')
          localThis.$refs.tmp.refresh()
        } else {
          localThis.$message.warning('操作失败' + res.errorMessage)
        }
      })
    },
    viewDetail() {
      let localThis = this
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      let params = {
        proDetId: selection.proDetId
      }
      localThis.tableData = []
      HttpModule.detailDataRecord(params).then((res) => {
        if (res.rscode === '200') {
          let projectInfo = res.data.projectInfo
          let perfIndica = res.data.perfIndica
          let attchs = res.data.attchs
          localThis.tableDataSx = attchs
          localThis.tableData = perfIndica
          localThis.initModalFormData(projectInfo)
          localThis.showModal = true
          localThis.modalTitle = '查看详情'
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    initModalFormData(projectInfo) {
      let localThis = this
      // 基本情况
      localThis.formDataListBtm.proAgencyName = projectInfo.proAgencyName
      localThis.formDataListBtm.proAgencyCode = projectInfo.proAgencyCode
      localThis.formDataListBtm.mofDivName = projectInfo.mofDivName
      localThis.formDataListBtm.budgetLevelName = projectInfo.budgetLevelName
      localThis.formDataListBtm.speProName = projectInfo.speProName
      localThis.formDataListBtm.speProCode = projectInfo.speProCode
      localThis.formDataListBtm.trackProName = projectInfo.trackProName
      localThis.formDataListBtm.trackProCode = projectInfo.trackProCode
      localThis.formDataListBtm.proDeptName = projectInfo.proDeptName
      localThis.formDataListBtm.fundInvestAreaName = projectInfo.fundInvestAreaName
      localThis.formDataListBtm.proContent = projectInfo.proContent
      localThis.formDataListBtm.proStaDate = projectInfo.proStaDate
      localThis.formDataListBtm.proEndDate = projectInfo.proEndDate
      // 项目总投资
      localThis.formDataListThird.proGi = projectInfo.proGi
      localThis.formDataListThird.proGiAddnb = projectInfo.proGiAddnb
      localThis.formDataListThird.proGiCff = projectInfo.proGiCff
      localThis.formDataListThird.proGiCfo = projectInfo.proGiCfo
      localThis.formDataListThird.proGiLff = projectInfo.proGiLff
      localThis.formDataListThird.proGiEf = projectInfo.proGiEf
      localThis.formDataListThird.proGiLb = projectInfo.proGiLb
      localThis.formDataListThird.proGiBankl = projectInfo.proGiBankl
      // 项目批复信息
      localThis.formDataListForth.proApproveNumber = projectInfo.proApproveNumber
      localThis.formDataListForth.landApproveNumber = projectInfo.landApproveNumber
      localThis.formDataListForth.eiaApproveNumber = projectInfo.eiaApproveNumber
      localThis.formDataListForth.consApproveNumber = projectInfo.consApproveNumber
      // 相关部门联系方式
      localThis.contactInformationFormData.proAddress = projectInfo.proAddress
      localThis.contactInformationFormData.estAgencyName = projectInfo.estAgencyName
      localThis.contactInformationFormData.consAgencyName = projectInfo.consAgencyName
      localThis.contactInformationFormData.agencyLeaderPerName = projectInfo.agencyLeaderPerName
      localThis.contactInformationFormData.agencyLeaderPerOtel = projectInfo.agencyLeaderPerOtel
      localThis.contactInformationFormData.agencyLeaderPerMtel = projectInfo.agencyLeaderPerMtel
      localThis.contactInformationFormData.fiLeader = projectInfo.fiLeader
      localThis.contactInformationFormData.fiLeaderOtel = projectInfo.fiLeaderOtel
      localThis.contactInformationFormData.fiLeaderMtel = projectInfo.fiLeaderMtel
      localThis.contactInformationFormData.proLeader = projectInfo.proLeader
      localThis.contactInformationFormData.proLeaderOtel = projectInfo.proLeaderOtel
      localThis.contactInformationFormData.proLeaderMtel = projectInfo.proLeaderMtel
      localThis.contactInformationFormData.proLessor = projectInfo.proLessor
      localThis.contactInformationFormData.proLessorOtel = projectInfo.proLessorOtel
      localThis.contactInformationFormData.proLessorMtel = projectInfo.proLessorMtel
    }
  }
}
</script>
<style scoped lang="scss">
.Titans-form ::v-deep .vxe-form .boss-tree__input .el-select {
  height: 34px;
}
</style>
