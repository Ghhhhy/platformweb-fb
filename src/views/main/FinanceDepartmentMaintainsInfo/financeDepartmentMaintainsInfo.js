export let config = () => {
  return {
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
    contactInformationFormDataRequired: {
      proAddress: [ { required: true, message: '请输入项目地址', trigger: 'change' } ],
      estAgencyName: [ { required: true, message: '请输入主要监理单位', trigger: 'change' } ],
      consAgencyName: [ { required: true, message: '请输入主要施工单位', trigger: 'change' } ],
      agencyLeaderPerName: [{ required: true, message: '请输入项目单位负责人姓名', trigger: 'change' }],

      agencyLeaderPerOtel: [ { required: true, message: '请输入项目单位负责人办公电话', trigger: 'change' } ],
      agencyLeaderPerMtel: [ { required: true, message: '请输入项目单位负责人手机', trigger: 'change' } ],
      fiLeader: [ { required: true, message: '请输入财务负责人姓名', trigger: 'change' } ],
      fiLeaderOtel: [ { required: true, message: '请输入财务负责人办公电话', trigger: 'change' } ],
      fiLeaderMtel: [ { required: true, message: '请输入财务负责人手机', trigger: 'change' } ],
      proLeader: [ { required: true, message: '请输入项目负责人姓名', trigger: 'change' } ],
      proLeaderOtel: [ { required: true, message: '请输入项目负责人办公电话', trigger: 'change' } ],
      proLeaderMtel: [ { required: true, message: '请输入项目负责人手机', trigger: 'change' } ],
      proLessor: [ { required: true, message: '请输入工作联系人姓名', trigger: 'change' } ],
      proLessorOtel: [ { required: true, message: '请输入工作联系人办公电话', trigger: 'change' } ],
      proLessorMtel: [ { required: true, message: '请输入工作联系人手机', trigger: 'change' } ]
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
    formDataListForthRequired: {
      proApproveNumber: [ { required: true, message: '请输入项目审批（核准、备案）文号', trigger: 'change' } ],
      landApproveNumber: [ { required: true, message: '请输入用地审批文号', trigger: 'change' } ],
      eiaApproveNumber: [ { required: true, message: '请输入环评审批文号', trigger: 'change' } ],
      consApproveNumber: [ { required: true, message: '请输入施工许可文号', trigger: 'change' } ]
    },
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
    formDataListThirdRequired: {
      proGiAddnb: [ { required: true, message: '请输入增发国债资金', trigger: 'change' } ],
      proGiCff: [ { required: true, message: '请输入中央预算内投资', trigger: 'change' } ],
      proGiCfo: [ { required: true, message: '请输入其他中央财政性建设资金', trigger: 'change' } ],
      proGiLff: [ { required: true, message: '请输入地方财政资金', trigger: 'change' } ],
      proGiEf: [ { required: true, message: '请输入企业自有资金', trigger: 'change' } ],
      proGiLb: [ { required: true, message: '请输入地方政府专项债券', trigger: 'change' } ],
      proGiBankl: [ { required: true, message: '请输入银行贷款', trigger: 'change' } ],
      proGiOth: [ { required: true, message: '请输入其他资金', trigger: 'change' } ]
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
            isleaf: true,
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
        field: 'proRealStaDate',
        title: '实际开工时间',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择开工或预计开工时间' } }
      },
      {
        field: 'proRealEndDate',
        title: '实际竣工时间',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择预计完工时间' } }
      },
      {
        field: 'kpiTarget',
        title: '项目整体绩效目标',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目整体绩效目标' } }
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
      },
      {
        field: 'isUseMultiTrackPro',
        title: '是否使用多项中央转移支付资金',
        span: 12,
        titleWidth: '240',
        itemRender: {
          name: '$vxeSelect',
          defaultValue: '前端',
          options: [
            { value: 1, label: '是' },
            { value: 2, label: '否' }
          ]
        }
      },
      {
        field: 'fundInvestAreaDesc',
        title: '项目所属投向领域说明',
        span: 24,
        titleWidth: '240',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目所属投向领域说明' } }
      },
      {
        field: 'proContent',
        title: '项目主要建设内容',
        span: 24,
        titleWidth: '240',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目主要建设内容' } }
      },
      {
        field: 'proNotStaRea',
        title: '项目未开工原因',
        span: 24,
        titleWidth: '240',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目未开工原因' } }
      }
    ],
    formDataListBtmRequired: {
      proAgencyCode: [ { required: true, message: '请输入项目单位编码', trigger: 'change' } ],
      proAgencyName: [{ required: true, message: '请输入项目单位名称', trigger: 'change' }],
      mofDivCode: [{ required: true, message: '请输入区划编码', trigger: 'change' }],
      mofDivName: [{ required: true, message: '请输入区划名称', trigger: 'change' }],
      bugdetLevelCode: [{ required: true, message: '请输入预算级次编码', trigger: 'change' }],
      bugdetLevelName: [{ required: true, message: '请输入预算级次名称', trigger: 'change' }],
      speProCode: [ { required: true, message: '请输入项目代码', trigger: 'change' } ],
      speProName: [{ required: true, message: '请输入项目名称', trigger: 'change' }],
      proDeptCode: [{ required: true, message: '请输入项目主管部门代码', trigger: 'change' }],
      proDeptName: [{ required: true, message: '请输入项目主管部门名称', trigger: 'change' }],
      fundInvestAreaCode: [ { required: true, message: '请输入项目所属投向领域代码', trigger: 'change' } ],
      fundInvestAreaName: [ { required: true, message: '请输入项目所属投向领域名称', trigger: 'change' } ],
      proContent: [ { required: true, message: '请输入项目主要建设内容', trigger: 'change' } ],
      proStaDate: [ { required: true, message: '请输入开工或预计开工时间', trigger: 'change' } ],
      proEndDate: [ { required: true, message: '请输入预计完工时间', trigger: 'change' } ],
      isUseMultiTrackPro: [ { required: true, message: '请输入是否使用多项中央转移支付资金', trigger: 'change' } ],
      isEnd: [{ required: true, message: '请输入项目是否终结', trigger: 'change' }],
      kpiTarget: [{ required: true, message: '请输入项目整体绩效目标', trigger: 'change' }]
    },
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
      proRealStaDate: '',
      proRealEndDate: '',
      proNotStaRea: '',
      kpiTarget: '',
      isUseMultiTrackPro: '',
      fundInvestAreaDesc: '',
      isEnd: ''
    },
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
    ]
  }
}
