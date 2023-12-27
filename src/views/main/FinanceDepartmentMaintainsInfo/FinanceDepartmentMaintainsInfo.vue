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
      :show-footer="showModalFooter"
      :destroy-on-close="true"
      @close="closeModal"
    >
      <div style="overflow: auto">
        <el-tabs v-model="activeNameBtm" type="border-card">
          <el-tab-pane label="基本情况" name="1">
            <BsForm
              ref="addForm"
              :form-items-config="formItemsConfigBtm"
              :form-data-list="formDataListBtm"
              @itemChange="BtminsertItemChange"
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
            <BsForm
              ref="contactInformationForm"
              :form-items-config="contactInformationFormConfig"
              :form-data-list="contactInformationFormData"
            />
          </el-tab-pane>
          <el-tab-pane label="项目附件" name="6">
            <el-upload
              v-if="showModalFooter"
              ref="fileUpload"
              action="#"
              multiple
              :show-file-list="false"
              :data="uploadDFileParams"
              :on-remove="handleRemove"
              :http-request="handelUploadDebugfile"
            >
              <!-- <div class="fn-inline"> -->
              <div class="fn-inline" style="float:left; visibility: hidden">
                <div class="footer-btn" style="margin-left: 10px; padding-left: 10px;">
                  <el-row
                    style="display: inline-block;height: 42px;"
                  >
                    <el-col :span="16">
                      <span ref="uploadref" class="sp-my">上传附件</span>
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
              ref="fileDataRef"
              height="460"
              :table-columns-config="modalTblColumnsConfigSx"
              :table-data="tableDataSx"
              :pager-config="false"
              :footer-config="{ showFooter: false }"
              :toolbar-config="tableToolbarConfigAttach"
              @editClosed="editClosed"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer">
        <vxe-button @click="showModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSure">确认</vxe-button>
      </div>
    </vxe-modal>
    <vxe-modal
      v-if="showTypeModal"
      v-model="showTypeModal"
      :title="'请选择附件类型'"
      :destroy-on-close="true"
      width="300px"
      :height="'170px'"
      :show-footer="true"
      @close="showTypeModal = false"
    >
      <div style="overflow: hidden">
        <el-select v-model="filetype" style="width: 100%">
          <el-option
            v-for="item in fileTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div slot="footer">
        <vxe-button @click="showTypeModal = false">取消</vxe-button>
        <vxe-button status="primary" @click="handleSureType">保存</vxe-button>
      </div>
    </vxe-modal>
  </div>
</template>
<script>
import HttpModule from '@/api/frame/main/FinanceDepartmentMaintainsInfo/FinanceDepartmentMaintainsInfo.js'

export default {
  data() {
    return {
      menuId: '',
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
        showFooter: false
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
              // { value: '11', label: '资金支出佐证资料' },
              // { value: '12', label: '财务会计资料' },
              // { value: '13', label: '工程资料' },
              // { value: '14', label: '项目形象进度照片' },
              // { value: '15', label: '竣工验收资料' },
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
      showTypeModal: false,
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
        proGiBankl: '',
        proGiOth: ''
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
          itemRender: {
            name: '$input',
            props: {
              type: 'string',
              placeholder: '请输入项目单位',
              disabled: true
            }
          }
        },
        {
          field: 'mofDiv_',
          title: '财政区划',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: false,
              placeholder: '请选择财政区划',
              isServer: true,
              serverUri: '/dfr-monitor-service/dfr/common/elementtree',
              elecode: 'adm_div',
              queryparams: {
                elementCode: 'adm_div'
              }
            }
          }
        },
        {
          field: 'budgetLevel_',
          title: '预算级次',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: false,
              placeholder: '请选择预算级次',
              isServer: true,
              serverUri: '/dfr-monitor-service/dfr/common/elementtree',
              elecode: 'budget_level',
              queryparams: {
                elementCode: 'budget_level'
              }
            }
          }
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
          field: 'proDept_',
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
              serverUri: '/dfr-monitor-service/dfr/common/elementtree',
              elecode: 'dept',
              queryparams: {
                elementCode: 'dept'
              }
            }
          }
        },
        {
          field: 'fundInvestArea_',
          title: '项目所属投向领域',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$formTreeInput',
            required: true,
            props: {
              disabled: false,
              placeholder: '请输入项目所属投向领域',
              isServer: true,
              serverUri: '/dfr-monitor-service/dfr/common/elementtree',
              elecode: 'PROFUNDINVESTAREA',
              queryparams: {
                elementCode: 'PROFUNDINVESTAREA'
              }
            }
          }
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
        },
        {
          field: 'isEnd',
          title: '项目是否终结',
          span: 12,
          titleWidth: '240',
          itemRender: {
            name: '$vxeSelect',
            defaultValue: '前端',
            options: [
              { value: 1, label: '是' },
              { value: 2, label: '否' }
            ] }
        }
      ],
      formDataListBtm: {
        proAgencyCode: '',
        mofDiv_: '',
        mofDivName: '',
        budgetLevel_: '',
        budgetLevelName: '',
        speProName: '',
        speProCode: '',
        trackProName: '',
        trackProCode: '',
        proDept_: '',
        proDeptName: '',
        fundInvestArea_: '',
        fundInvestAreaName: '',
        proContent: '',
        proStaDate: '',
        proEndDate: '',
        isEnd: ''
      },
      showModal: false,
      showModalFooter: true,
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
      fileTypeOptions: [
        { value: '01', label: '项目审批（核准、备案）资料' },
        { value: '02', label: '项目用地审批、环评审批、施工许可资料' },
        { value: '03', label: '项目招投标和政府采购资料' },
        { value: '04', label: '项目主要合同资料' },
        { value: '05', label: '项目评审报告' },
        { value: '99', label: '其他' }
      ],
      filetype: '01',
      filetypeName: '项目审批（核准、备案）资料',
      tableToolbarConfigAttach: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        zoom: true, // 缩放
        custom: false, // 选配展示列
        buttons: [
          { code: 'delete-attachment', name: '删除', status: 'primary', callback: this.deleteAttachment },
          { code: 'upload-attachment', name: '上传附件', status: 'primary', callback: this.handleUpload }
        ]
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
          field: 'lv3PerfIndName',
          editRender: {
            name: '$input'
          }
        },
        {
          title: '指标值',
          field: 'kpiVal',
          editRender: {
            name: '$input'
          }
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
      menuName: '增发国债资金项目基本信息录入',
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
            /*  {
              code: 'pay-add',
              label: '新增',
              status: 'primary'
            }, */
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
      currentRow: {},
      proDetId: '',
      isView: false,
      treeProps: ['mofDiv_', 'budgetLevel_', 'proDept_', 'fundInvestArea_']
    }
  },
  created() {
    this.menuId = this.$store.state.curNavModule.guid
  },
  methods: {
    deleteAttachment() {
      let selections = this.$refs.fileDataRef.getSelectionData()
      if (selections.length === 0) {
        this.$message.warning('请选择要删除的附件')
        return
      }
      this.$refs.fileDataRef.$refs.xGrid.removeCheckboxRow()
    },
    closeModal() {
      this.showModal = false
    },
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
          let basicInfo = res['基本情况明细表']
          basicInfo.shift()
          let basicInfoRes = basicInfo.map(item => {
            return {
              mofDivName: item['财政区划'],
              proAgencyCode: item['项目单位代码'],
              proAgencyName: item['项目单位名称'],
              budgetLevelCode: item['预算级次代码'],
              budgetLevelName: item['预算级次名称'],
              speProCode: item['项目代码'],
              speProName: item['项目名称'],
              fundInvestAreaName: item['项目所属投向领域'],
              proContent: item['项目主要建设内容'],
              proStaDate: item['开工或预计开工时间'],
              proEndDate: item['预计完工时间'],
              ndrcProCode: item['发改委项目代码'],
              ndrcProName: item['发改委项目名称'],
              trackProName: item['增发国债资金中央转移支付项目名称'],
              trackProCode: item['增发国债资金中央转移支付项目代码'],
              proDeptCode: item['项目主管部门编码'],
              proDeptName: item['项目主管部门名称'],
              proGi: item['项目总投资'],
              proApproveNumber: item['项目审批（核准、备案）文号'],
              landApproveNumber: item['用地审批文号'],
              eiaApproveNumber: item['环评审批文号'],
              consApproveNumber: item['施工许可文号'],
              proAddress: item['项目地址'],
              estAgencyName: item['主要监理单位'],
              consAgencyName: item['主要施工单位'],
              agencyLeaderPerName: item['项目单位负责人'],
              agencyLeaderPerOtel: item['__EMPTY_8'],
              agencyLeaderPerMtel: item['__EMPTY_9'],
              fiLeader: item['财务负责人'],
              fiLeaderOtel: item['__EMPTY_10'],
              fiLeaderMtel: item['__EMPTY_11'],
              proLeader: item['项目负责人'],
              proLeaderOtel: item['__EMPTY_12'],
              proLeaderMtel: item['__EMPTY_13'],
              proLessor: item['工作联系人'],
              proLessorOtel: item['__EMPTY_14'],
              proLessorMtel: item['__EMPTY_15'],
              kpiTarget: item['总体绩效目标'],
              proGiAddnb: item['__EMPTY'],
              proGiCff: item['__EMPTY_1'],
              proGiCfo: item['__EMPTY_2'],
              proGiLff: item['__EMPTY_3'],
              proGiEf: item['__EMPTY_4'],
              proGiLb: item['__EMPTY_5'],
              proGiBankl: item['__EMPTY_6'],
              proGiOth: item['__EMPTY_7']
            }
          })
          console.log(basicInfoRes)
          let bgtInfo = res['国债资金项目绩效指标']
          let bgtRes = bgtInfo.map(item => {
            return {
              speProCode: item['项目代码'],
              speProName: item['项目名称'],
              lv1PerfIndCode: item['一级绩效指标代码'],
              lv1PerfIndName: item['一级绩效指标名称'],
              lv2PerfIndCode: item['二级绩效指标代码'],
              lv2PerfIndName: item['二级绩效指标名称'],
              lv3PerfIndCode: item['三级绩效指标代码'],
              lv3PerfIndName: item['三级绩效指标名称'],
              kpiContent: item['绩效指标说明'] ? item['绩效指标说明'] : '',
              kpiVal: item['指标值']
            }
          })
          console.log(bgtRes)
          self.$refs.tmp.showLoading = true
          let params = {
            projectInfo: basicInfoRes,
            perfIndica: bgtRes,
            appId: 'pm_project_info_detail',
            menuId: self.menuId,
            actionType: '1',
            actionName: '录入',
            advice: ''
          }
          HttpModule.importExcel(params).then((res) => {
            if (res && res.rscode === '200') {
              self.$message.success('导入成功')
              self.$refs.tmp.refresh()
            } else {
              self.$message.success('导入失败：')
            }
            console.log(res)
          }).finally(() => {
            self.$refs.tmp.showLoading = false
          })
        }
      })
    },
    onImportSuccess(data) {

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
    BtminsertItemChange({ $form, property, itemValue, data }, bsform) {
      if (this.treeProps.indexOf(property) > -1) {
        let p = property.substr(0, property.length - 1)
        this.formDataListBtm[p + 'Name'] = itemValue
      }
    },
    insertItemChange({ $form, property, itemValue, data }, bsform) {
      let sum = 0
      this.formDataListThird[property] = data[property]
      this.formItemsConfigThird.forEach(item => {
        if (item.field !== 'proGi') {
          console.log(data[item.field])
          sum += this.clearFormat(data[item.field])
        }
      })
      this.formDataListThird.proGi = sum
      this.formDataListThird = { ...this.formDataListThird }
      console.log(this.formDataListThird)
      console.log(data.sums)
    },
    fileUpload(params) {
      return this.$http.post('fileservice/v2/upload', params, null, 'multipart/form-data', 'openapi')
    },
    handleUpload() {
      this.showTypeModal = true
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
          data['fileName'] = e.file.name
          data['proAttchId'] = resultData
          data['filepath'] = e.file.webkitRelativePath
          data['province'] = this.$store.state.userInfo.province
          data['appid'] = 'pay_plan_voucher'
          data['creater'] = e.file.uid
          data['guid'] = this.$store.state.userInfo.guid
          data['billguid'] = this.$ToolFn.utilFn.getUuid()
          data['importuser'] = this.$store.state.userInfo.name
          data['createTime'] = new Date().toLocaleDateString()
          data.proAttchKindCode = this.filetype
          this.tableDataSx.push(data)
          console.log('---', this.tableDataSx)
          this.$message.success('上传成功')
        } else {
          if (res.result.includes('Size: 0')) {
            this.$message.error('上传失败,不能上传空文件')
          }
          this.$message.error('上传失败：' + res.result)
        }
      }).catch()
    },
    handleRemove() {

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
        const cellValue = row['lv1PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv1PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv1PerfIndCode'] === cellValue) {
            nextRow = visibleData[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
      if (columnIndex === 3) {
        const cellValue = row['lv2PerfIndCode']
        const prevRow = visibleData[rowIndex - 1]
        let nextRow = visibleData[rowIndex + 1]
        if (prevRow && prevRow['lv2PerfIndCode'] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow['lv2PerfIndCode'] === cellValue) {
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
    handleSureType() {
      let proAttchKindName = this.fileTypeOptions.find((item) => {
        return item.value === this.filetype
      }).label
      this.filetypeName = proAttchKindName
      this.$refs.uploadref.click()
      this.showTypeModal = false
    },
    handleSure() {
      let localThis = this
      console.log()
      localThis.$refs.tmp.showLoading = true
      let fileList = []
      let fileDataList = localThis.$refs.fileDataRef.getTableData().fullData
      if (fileDataList && fileDataList.length > 0) {
        fileDataList.forEach((item) => {
          fileList.push({
            fileName: item.fileName,
            kpiRemark: item.kpiRemark,
            proAttchKindCode: item.proAttchKindCode,
            proAttchKindName: item.proAttchKindCode__viewSort,
            proAttchId: item.proAttchId
          })
        })
      }
      let btmFormData = localThis.formDataListBtm
      for (let key in btmFormData) {
        if (this.treeProps.indexOf(key) > -1) {
          delete btmFormData[key]
          delete btmFormData[key + 'id']
          delete btmFormData[key + 'code']
          delete btmFormData[key + 'name']
        }
      }
      let params = {
        // projectInfo: localThis.$refs.addForm.getFormData(),
        projectInfo: localThis.formDataListBtm,
        perfIndica: localThis.$refs.bgtTblRef.getTableData().tableData,
        proGiSource: localThis.$refs.addFormthrid.getFormData(),
        // 项目总投资
        approvalDoc: localThis.$refs.addFormForth.getFormData(),
        // 联系方式
        depInfo: localThis.$refs.contactInformationForm.getFormData(),
        attchs: fileList
      }
      console.log(params)

      if (localThis.proDetId === '') {
        // 新增

      } else {
        // 修改
        params.proDetId = localThis.proDetId
        params.projectInfo.proDetId = localThis.proDetId
        HttpModule.editDataRecord(params).then((res) => {
          if (res.rscode === '200') {
            this.showModal = false
            localThis.$message.success('操作成功')
            localThis.$refs.tmp.refresh()
          } else {
            localThis.$message.warning('数据编辑保存询失败')
          }
          localThis.$refs.tmp.showLoading = false
        })
      }
    },
    onBtnClick(obj) {
      this.isView = false
      if (obj.code === 'pay-add') {
        this.showModal = true
        this.modalTitle = '新增'
        this.initFormItems(false)
      }
      if (obj.code === 'pay-import') {
        this.handleImport()
      }
      if (obj.code === 'pay-edit') {
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.initFormItems(false)
        this.editRecord()
      }
      if (obj.code === 'pay-discard') {
        this.discardRecord()
      }
      if (obj.code === 'pay-checkDetails') {
        this.isView = true
        if (this.$refs.tmp.getSelectionRcd().length !== 1) {
          this.$message.warning('请选择一条数据进行查看')
          return false
        }
        this.initFormItems(true)
        this.viewDetail()
      }
      if (obj.code === 'pay-audit') {
        this.auditRecord(2)
      }
      if (obj.code === 'pay-unAudit') {
        this.auditRecord(3)
      }
    },
    initFormItems(disabled) {
      this.setItemsDisable(this.formItemsConfigBtm, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfig, true, disabled)
      this.setItemsDisable(this.formItemsConfigThird, false, disabled)
      this.setItemsDisable(this.formItemsConfigForth, false, disabled)
      this.setItemsDisable(this.contactInformationFormConfig, false, disabled)
      this.setItemsDisable(this.modalTblColumnsConfigSx, true, disabled)
      this.tableToolbarConfigAttach.buttons.forEach(btn => {
        btn.disabled = disabled
      })
    },
    setItemsDisable(itemConfigs, isTable, disabled) {
      if (isTable) {
        itemConfigs.forEach(column => {
          if (disabled) {
            // 只读
            let render = column.editRender
            if (render) {
              column.render = render
              delete column.editRender
            }
          } else {
            let render = column.cellRender || column.render
            if (render) {
              column.editRender = render
              delete column.cellRender
              delete column.render
            }
          }
        })
      } else {
        itemConfigs.forEach(item => {
          if (item.field !== 'proAgencyName') {
            if (item.itemRender) {
              if (item.itemRender.props) {
                item.itemRender.props.disabled = disabled
              } else {
                item.itemRender.props = { disabled: disabled }
              }
            }
          }
        })
      }
    },
    // 修改
    editRecord() {
      let localThis = this
      localThis.$refs.tmp.showLoading = true
      let selection = localThis.$refs.tmp.getSelectionRcd()[0]
      localThis.proDetId = selection.proDetId
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
          localThis.showModalFooter = true
          this.showModal = true
          this.modalTitle = '编辑'
        } else {
          localThis.$message.warning('数据详细查询失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    discardRecord() {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal
        .confirm('请确认是否删除？')
        .then((type) => {
          if (type === 'confirm') {
            let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
              return item.proDetId
            })
            let params = {
              ids: ids,
              appId: 'pm_project_info_detail',
              menuId: localThis.menuId,
              actionType: 2,
              actionName: '作废'
            }
            HttpModule.discardRecords(params).then((res) => {
              if (res.rscode === '200') {
                localThis.$message.success('操作成功')
                localThis.$refs.tmp.refresh()
              } else {
                localThis.$message.warning('操作失败' + res.errorMessage)
              }
            })
          }
        })
    },
    auditRecord(type) {
      let localThis = this
      if (localThis.$refs.tmp.getSelectionRcd().length < 1) {
        localThis.$message.warning('请至少选择一条数据进行操作')
        return false
      }
      this.$XModal
        .confirm('请确认是否' + (type === 2 ? '送审?' : '撤销送审?'))
        .then((status) => {
          if (status === 'confirm') {
            let ids = localThis.$refs.tmp.getSelectionRcd().map((item) => {
              return item.proDetId
            })
            let params = {
              ids: ids,
              appId: 'pm_project_info_detail',
              menuId: localThis.menuId,
              actionType: type,
              actionName: type === 2 ? '送审' : '撤销送审'
            }
            localThis.$refs.tmp.showLoading = true
            HttpModule.auditDataRecords(params).then((res) => {
              if (res.rscode === '200') {
                localThis.$message.success('操作成功')
                localThis.$refs.tmp.refresh()
              } else {
                localThis.$message.warning('操作失败' + res.errorMessage)
              }
              localThis.$refs.tmp.showLoading = false
            })
          }
        })
    },
    // 修改附件
    editClosed(obj, grid) {
      this.tableDataSx = obj.visibleData
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
          localThis.showModalFooter = false
          localThis.showModal = true
          localThis.modalTitle = '查看详情'
        } else {
          localThis.$message.warning('查看详情失败')
        }
        localThis.$refs.tmp.showLoading = false
      })
    },
    initTreeInfo(formData, property, value) {
      let infos = value.split('##')
      formData[property] = value
      formData[property + 'id'] = infos[0]
      formData[property + 'code'] = infos[1]
      formData[property + 'name'] = infos[2]
    },
    initModalFormData(projectInfo) {
      let localThis = this
      // 基本情况
      localThis.formDataListBtm.proAgencyName = projectInfo.proAgencyName
      localThis.formDataListBtm.proAgencyCode = projectInfo.proAgencyCode
      // 财政区划
      let mofDiv = projectInfo.mofDivName
      this.initTreeInfo(localThis.formDataListBtm, 'mofDiv_', mofDiv)
      localThis.formDataListBtm.mofDivName = projectInfo.mofDivName
      // localThis.formDataListBtm.mofDivNameId = projectInfo.mofDivName
      // 预算级次
      localThis.formDataListBtm.budgetLevelName = projectInfo.budgetLevelName
      let budgetLevel = projectInfo.budgetLevelName
      this.initTreeInfo(localThis.formDataListBtm, 'budgetLevel_', budgetLevel)
      localThis.formDataListBtm.speProName = projectInfo.speProName
      localThis.formDataListBtm.speProCode = projectInfo.speProCode
      localThis.formDataListBtm.trackProName = projectInfo.trackProName
      localThis.formDataListBtm.trackProCode = projectInfo.trackProCode
      // 项目主管部门
      let proDeptName = projectInfo.proDeptName
      localThis.formDataListBtm.proDeptName = projectInfo.proDeptName
      this.initTreeInfo(localThis.formDataListBtm, 'proDept_', proDeptName)
      // 项目所属投向领域
      let fundInvestInfo = projectInfo.fundInvestAreaName
      localThis.formDataListBtm.fundInvestAreaName = projectInfo.fundInvestAreaName
      this.initTreeInfo(localThis.formDataListBtm, 'fundInvestArea_', fundInvestInfo)
      localThis.formDataListBtm.proContent = projectInfo.proContent
      localThis.formDataListBtm.proStaDate = projectInfo.proStaDate
      localThis.formDataListBtm.proEndDate = projectInfo.proEndDate
      localThis.formDataListBtm.isEnd = projectInfo.isEnd
      // 项目总投资
      localThis.formDataListThird.proGi = projectInfo.proGi
      localThis.formDataListThird.proGiAddnb = projectInfo.proGiAddnb
      localThis.formDataListThird.proGiCff = projectInfo.proGiCff
      localThis.formDataListThird.proGiCfo = projectInfo.proGiCfo
      localThis.formDataListThird.proGiLff = projectInfo.proGiLff
      localThis.formDataListThird.proGiEf = projectInfo.proGiEf
      localThis.formDataListThird.proGiLb = projectInfo.proGiLb
      localThis.formDataListThird.proGiBankl = projectInfo.proGiBankl
      localThis.formDataListThird.proGiOth = projectInfo.proGiOth
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
.app-main .boss-main .el-tab-pane{
  height: auto!important;
}
</style>
