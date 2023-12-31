// 校验座机电话号码
const phoneValid = ({ itemValue: value, rule, rules }) => {
  const re = /^1\d{10}$/ // 手机号码
  const re1 = /^\d{3}-\d{8}$|\d{4}-\d{7}$/ // 座机号
  const re2 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/ // 固定号码
  if (!value) {
    return Promise.reject(new Error(rule.message))
  } else if (value && (!re1.test(value) && !re.test(value) && !re2.test(value))) {
    return Promise.reject(new Error('请填写正确的电话号码格式'))
  }
  return Promise.resolve()
}
export let config = () => {
  return {
    modalTblColumnsConfigSx: [
      {
        title: '附件名称',
        field: 'fileName'
      },
      {
        title: '上传时间',
        field: 'createTime',
        'cellRender': {
          'name': '$vxeTime',
          'props': {
            'format': 'YYYY/MM/DD'
          }
        }
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
      },
      {
        title: '操作',
        field: '$fileTableOperation',
        filter: false,
        visible: true,
        cellRender: {
          name: '$fileTableOperation'
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

      agencyLeaderPerOtel: [ { required: true, validator: phoneValid, message: '请输入项目单位负责人办公电话', trigger: 'change' } ],
      agencyLeaderPerMtel: [ { required: true, validator: phoneValid, message: '请输入项目单位负责人手机', trigger: 'change' } ],
      fiLeader: [ { required: true, message: '请输入财务负责人姓名', trigger: 'change' } ],
      fiLeaderOtel: [ { required: true, validator: phoneValid, message: '请输入财务负责人办公电话', trigger: 'change' } ],
      fiLeaderMtel: [ { required: true, validator: phoneValid, message: '请输入财务负责人手机', trigger: 'change' } ],
      proLeader: [ { required: true, message: '请输入项目负责人姓名', trigger: 'change' } ],
      proLeaderOtel: [ { required: true, validator: phoneValid, message: '请输入项目负责人办公电话', trigger: 'change' } ],
      proLeaderMtel: [ { required: true, validator: phoneValid, message: '请输入项目负责人手机', trigger: 'change' } ],
      proLessor: [ { required: true, message: '请输入工作联系人姓名', trigger: 'change' } ],
      proLessorOtel: [ { required: true, validator: phoneValid, message: '请输入工作联系人办公电话', trigger: 'change' } ],
      proLessorMtel: [ { required: true, validator: phoneValid, message: '请输入工作联系人手机', trigger: 'change' } ]
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
      sums: '0',
      proGi: '0',
      proGiAddnb: '0',
      proGiCff: '0',
      proGiCfo: '0',
      proGiLff: '0',
      proGiEf: '0',
      proGiLb: '0',
      proGiBankl: '0',
      proGiOth: '0'
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
        itemRender: { name: '$vxeMoney', props: { type: 'number', align: 'right', controls: false, required: true, placeholder: '自动生成', disabled: true } }
      },
      {
        field: 'proGiAddnb',
        title: '增发国债资金',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入增发国债资金' } }
      },
      {
        field: 'proGiCff',
        title: '中央预算内投资',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入中央预算内投资' } }
      },
      {
        field: 'proGiCfo',
        title: '其他中央财政性建设资金',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入其他中央财政性建设资金' } }
      },
      {
        field: 'proGiLff',
        title: '地方财政资金',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入地方财政资金' } }
      },
      {
        field: 'proGiEf',
        title: '企业自有资金',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入企业自有资金' } }
      },
      {
        field: 'proGiLb',
        title: '地方政府专项债券',
        span: 12,
        titleWidth: '240',
        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入地方政府专项债券' } }
      },
      {
        field: 'proGiBankl',
        title: '银行贷款',
        span: 12,
        titleWidth: '240',

        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入银行贷款' } }
      },
      {
        field: 'proGiOth',
        title: '其他资金',
        span: 12,
        titleWidth: '240',

        itemRender: { name: '$vxeMoney', props: { type: 'number', min: '0', align: 'right', controls: false, required: true, placeholder: '请输入其他资金' } }
      }
    ],
    formItemsConfigBtm:
      [
        {
          field: 'proAgencyName',
          title: '项目单位',
          span: 12,
          titleWidth: '255',
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
          field: 'mofDivName',
          title: '财政区划',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$input',
            props: {
              disabled: true,
              placeholder: '请选择财政区划'
            }
          }
        },
        {
          field: 'budgetLevelName',
          title: '预算级次',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$input',
            required: true,
            props: {
              disabled: true,
              placeholder: '请选择预算级次'
            }
          }
        },
        {
          field: 'speProName',
          title: '具体项目名称',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
        },
        {
          field: 'speProCode',
          title: '项目代码',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目代码', disabled: false } }
        },
        {
          field: 'proDept_',
          title: '项目主管部门',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeTree',
            props: {
              isleaf: true,
              elecode: 'dept',
              queryparams: {
                elementCode: 'dept'
              },
              config: {
                disabled: true,
                isleaf: true,
                showFilter: false,
                placeholder: '请选择项目主管部门',
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                },
                axiosConfig: {
                  method: 'post',
                  url: '/dfr-monitor-service/dfr/common/elementtree'
                }
              }
            }
          }
        },
        {
          field: 'bgtMofDep_',
          title: '资金管理处室',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeTree',
            props: {
              isleaf: true,
              elecode: 'bgt_mof_dep',
              queryparams: {
                elementCode: 'bgt_mof_dep'
              },
              config: {
                disabled: false,
                isleaf: true,
                showFilter: false,
                placeholder: '请选择资金管理处室',
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                },
                axiosConfig: {
                  method: 'post',
                  url: '/dfr-monitor-service/dfr/common/elementtree'
                }
              }
            }
          }
        }, {
          field: 'manageMofDep_',
          title: '业务管理处室',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeTree',
            props: {
              isleaf: true,
              elecode: 'manage_mof_dep',
              queryparams: {
                elementCode: 'manage_mof_dep'
              },
              config: {
                disabled: true,
                isleaf: true,
                showFilter: false,
                placeholder: '请选择业务管理处室',
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                },
                axiosConfig: {
                  method: 'post',
                  url: '/dfr-monitor-service/dfr/common/elementtree'
                }
              }
            }
          }
        },
        {
          field: 'ndrcProName',
          title: '发改委项目名称',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入发改委项目名称', disabled: false } }
        },
        {
          field: 'ndrcProCode',
          title: '发改委项目编码',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入发改委项目编码', disabled: false } }
        },
        {
          field: 'trackPro_',
          title: '增发国债资金中央转移支付项目名称',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeTree',
            required: true,
            options: [
              { code: '100001234512345123451', id: '01', name: '灾后恢复重建和提升防灾减灾能力补助资金', label: '100001234512345123451-灾后恢复重建和提升防灾减灾能力补助资金' },
              { code: '100001234512345123452', id: '02', name: '以海河、松花江流域等北方地区为重点的骨干防洪治理工程补助资金', label: '100001234512345123452-以海河、松花江流域等北方地区为重点的骨干防洪治理工程补助资金' },
              { code: '100001234512345123453', id: '03', name: '自然灾害应急能力提升工程补助资金', label: '100001234512345123453-自然灾害应急能力提升工程补助资金' },
              { code: '100001234512345123454', id: '04', name: '其他重点防洪工程补助资金', label: '100001234512345123454-其他重点防洪工程补助资金' },
              { code: '100001234512345123455', id: '05', name: '灌区建设改造和重点水土流失治理工程补助资金', label: '100001234512345123455-灌区建设改造和重点水土流失治理工程补助资金' },
              { code: '100001234512345123456', id: '06', name: '城市排水防涝能力提升工程补助资金', label: '100001234512345123456-城市排水防涝能力提升工程补助资金' },
              { code: '100001234512345123457', id: '07', name: '重点自然灾害综合防治体系建设工程补助资金', label: '100001234512345123457-重点自然灾害综合防治体系建设工程补助资金' },
              { code: '100001234512345123458', id: '08', name: '东北地区和京津冀受灾地区等高标准农田建设补助资金', label: '100001234512345123458-东北地区和京津冀受灾地区等高标准农田建设补助资金' }
            ],
            props: {
              placeholder: '请输入增发国债资金中央转移支付项目名称',
              config: {
                format: '{name}',
                disabled: false,
                treeProps: {
                  labelFormat: '{name}',
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                }
              }
            }
          }
        },
        {
          field: 'trackProCode',
          title: '增发国债资金中央转移支付项目代码',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目代码', disabled: true } }
        },
        {
          field: 'fundInvestArea_',
          title: '项目所属投向领域',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeTree',
            required: true,
            options: [],
            props: {
              placeholder: '请输入项目所属投向领域',
              config: {
                disabled: false,
                isleaf: true,
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                }
              }
            }
          }
        },
        {
          field: 'proStaDate',
          title: '开工或预计开工时间',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择开工或预计开工时间' } }
        },
        {
          field: 'proEndDate',
          title: '预计完工时间',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择预计完工时间' } }
        },
        {
          field: 'proRealStaDate',
          title: '实际开工时间',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择开工或预计开工时间' } }
        },
        {
          field: 'proRealEndDate',
          title: '实际竣工时间',
          span: 12,
          titleWidth: '255',
          itemRender: { name: '$input', props: { type: 'date', placeholder: '请选择预计完工时间' } }
        },
        {
          field: 'isUseMultiTrackPro',
          title: '是否使用多项中央转移支付资金',
          span: 12,
          titleWidth: '255',
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
          field: 'isEnd',
          title: '项目是否终结',
          span: 12,
          titleWidth: '255',
          itemRender: {
            name: '$vxeSelect',
            defaultValue: '前端',
            options: [
              { value: 1, label: '是' },
              { value: 2, label: '否' }
            ] }
        },
        {
          field: 'proContent',
          title: '项目主要建设内容',
          span: 24,
          titleWidth: '255',
          itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目主要建设内容', maxlength: 2000 } }
        },
        {
          field: 'proNotStaRea',
          title: '项目未开工原因',
          span: 24,
          titleWidth: '255',
          itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目未开工原因', maxlength: 2000 } }
        },
        {
          field: 'fundInvestAreaDesc',
          title: '项目所属投向领域说明',
          span: 24,
          titleWidth: '255',
          itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '当存在多个项目所属投向领域时，请填写多个项目所属投向领域的代码和名称，否则为空', maxlength: 2000 } }
        }
      ],
    formDataListBtmRequired: {
      proAgency_: [{ required: true, message: '请输入项目单位名称', trigger: 'change' }],
      mofDivCode: [{ required: true, message: '请输入区划编码', trigger: 'change' }],
      mofDivName: [{ required: true, message: '请输入区划名称', trigger: 'change' }],
      bugdetLevelCode: [{ required: true, message: '请输入预算级次编码', trigger: 'change' }],
      bugdetLevelName: [{ required: true, message: '请输入预算级次名称', trigger: 'change' }],
      speProCode: [ { required: true, message: '请输入项目代码', trigger: 'change' } ],
      speProName: [{ required: true, message: '请输入项目名称', trigger: 'change' }],
      proDeptCode: [{ required: true, message: '请输入项目主管部门代码', trigger: 'change' }],
      proDept_: [{ required: true, message: '请输入项目主管部门名称', trigger: 'change' }],
      bgtMofDep_: [{ required: true, message: '请输入资金管理处室', trigger: 'change' }],
      manageMofDep_: [{ required: true, message: '请输入业管理处室', trigger: 'change' }],
      fundInvestArea_: [ { required: true, message: '请输入项目所属投向领域代码', trigger: 'change' } ],
      fundInvestAreaName: [ { required: true, message: '请输入项目所属投向领域名称', trigger: 'change' } ],
      proContent: [ { required: true, message: '请输入项目主要建设内容', trigger: 'change' } ],
      ndrcProName: [ { required: true, message: '请输入发改委项目名称', trigger: 'change' } ],
      ndrcProCode: [ { required: true, message: '请输入发改委项目编码', trigger: 'change' } ],
      proStaDate: [
        {
          required: true,
          message: '请输入开工或预计开工时间',
          trigger: 'change',
          validator({ itemValue, rule, rules, data, property }) {
            return new Promise((resolve, reject) => {
              let d1 = new Date(data.proStaDate).getTime()
              let d2 = new Date(data.proEndDate).getTime()
              if (d1 <= d2) {
                resolve(true)
              } else {
                reject(new Error(
                  '开工或预计开工时间不得晚于预计完工时间'
                ))
              }
            })
          }
        }
      ],
      proEndDate: [{ required: true, message: '请输入预计完工时间', trigger: 'change' }],
      proRealStaDate: [
        {
          trigger: 'change',
          validator({ itemValue, rule, rules, data, property }) {
            return new Promise((resolve, reject) => {
              if (data.proRealEndDate && data.proRealStaDate) {
                let d1 = new Date(data.proRealStaDate).getTime()
                let d2 = new Date(data.proRealEndDate).getTime()
                if (d1 <= d2) {
                  resolve(true)
                } else {
                  reject(new Error(
                    '实际开工时间不得晚于实际竣工时间'
                  ))
                }
              } else {
                resolve(true)
              }
            })
          }
        }
      ],
      isUseMultiTrackPro: [ { required: true, message: '请输入是否使用多项中央转移支付资金', trigger: 'change' } ],
      isEnd: [{ required: true, message: '请输入项目是否终结', trigger: 'change' }],
      kpiTarget: [{ required: true, message: '请输入项目整体绩效目标', trigger: 'change' }]
      // trackPro_: [{ required: true, message: '增发国债资金中央转移支付项目名称', trigger: 'change' }],
      // trackProCode: [{ required: true, message: '增发国债资金中央转移支付项目代码', trigger: 'change' }]
    },
    formDataListBtm: {
      proDeptName: '',
      fundInvestAreaName: '',
      kpiTarget: '',
      isUseMultiTrackPro: '',
      proAgencyName: '',
      mofDivName: '',
      budgetLevelName: '',
      speProName: '',
      speProCode: '',
      proDept_: '',
      bgtMofDep_: '',
      bgtMofDepName: '',
      bgtMofDepCode: '',
      manageMofDep_: '',
      manageMofDepName: '',
      manageMofDepCode: '',
      ndrcProName: '',
      ndrcProCode: '',
      trackProName: '',
      trackProCode: '',
      proStaDate: '',
      proEndDate: '',
      proRealStaDate: '',
      proRealEndDate: '',
      fundInvestArea_: '',
      proContent: '',
      proNotStaRea: '',
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
      // {
      //   title: '三级指标编码',
      //   field: 'lv3PerfIndCode',
      //   editRender: {
      //     name: '$input'
      //   }
      // },
      {
        title: '评（扣）分标准',
        field: 'kpiEvalstd',
        editRender: {
          name: '$input'
        }
      },
      {
        title: '绩效指标说明',
        field: 'kpiContent',
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
    // 新增
    formItemsConfigBtmAdd: [
      {
        field: 'proAgency_',
        title: '项目单位',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            elecode: 'agency',
            queryparams: {
              elementCode: 'agency'
            },
            config: {
              isleaf: true,
              showFilter: false,
              disabled: false,
              placeholder: '请输入项目单位',
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              axiosConfig: {
                method: 'post',
                url: '/dfr-monitor-service/dfr/common/elementtree'
              }
            }
          }
        }
      },
      {
        field: 'mofDivName',
        title: '财政区划',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$input',
          required: true,
          props: {
            disabled: true,
            placeholder: '请选择财政区划'
          }
        }
      },
      {
        field: 'budgetLevelName',
        title: '预算级次',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$input',
          required: true,
          props: {
            disabled: true,
            placeholder: '请输入预算级次'
          }
        }
      },
      {
        field: 'speProName',
        title: '具体项目名称',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目名称', disabled: false } }
      },
      {
        field: 'speProCode',
        title: '具体项目代码',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入项目代码', disabled: false } }
      },
      {
        field: 'proDept_',
        title: '项目主管部门',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            elecode: 'dept',
            queryparams: {
              elementCode: 'dept'
            },
            config: {
              isleaf: true,
              disabled: false,
              showFilter: false,
              placeholder: '请选择项目主管部门',
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              axiosConfig: {
                method: 'post',
                url: '/dfr-monitor-service/dfr/common/elementtree'
              }
            }
          }
        }
      },
      {
        field: 'bgtMofDep_',
        title: '资金管理处室',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            elecode: 'bgt_mof_dep',
            queryparams: {
              elementCode: 'bgt_mof_dep'
            },
            config: {
              disabled: false,
              isleaf: true,
              showFilter: false,
              placeholder: '请选择资金管理处室',
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              axiosConfig: {
                method: 'post',
                url: '/dfr-monitor-service/dfr/common/elementtree'
              }
            }
          }
        }
      }, {
        field: 'manageMofDep_',
        title: '业务管理处室',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          props: {
            isleaf: true,
            elecode: 'manage_mof_dep',
            queryparams: {
              elementCode: 'manage_mof_dep'
            },
            config: {
              disabled: false,
              isleaf: true,
              showFilter: false,
              placeholder: '请选择业务管理处室',
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              },
              axiosConfig: {
                method: 'post',
                url: '/dfr-monitor-service/dfr/common/elementtree'
              }
            }
          }
        }
      },
      {
        field: 'ndrcProName',
        title: '发改委项目名称',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入发改委项目名称', disabled: false } }
      },
      {
        field: 'ndrcProCode',
        title: '发改委项目编码',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入发改委项目编码', disabled: false } }
      },
      {
        field: 'trackPro_',
        title: '增发国债资金中央转移支付项目名称',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          required: true,
          options: [
            { code: '100001234512345123451', id: '01', name: '灾后恢复重建和提升防灾减灾能力补助资金', label: '100001234512345123451-灾后恢复重建和提升防灾减灾能力补助资金' },
            { code: '100001234512345123452', id: '02', name: '以海河、松花江流域等北方地区为重点的骨干防洪治理工程补助资金', label: '100001234512345123452-以海河、松花江流域等北方地区为重点的骨干防洪治理工程补助资金' },
            { code: '100001234512345123453', id: '03', name: '自然灾害应急能力提升工程补助资金', label: '100001234512345123453-自然灾害应急能力提升工程补助资金' },
            { code: '100001234512345123454', id: '04', name: '其他重点防洪工程补助资金', label: '100001234512345123454-其他重点防洪工程补助资金' },
            { code: '100001234512345123455', id: '05', name: '灌区建设改造和重点水土流失治理工程补助资金', label: '100001234512345123455-灌区建设改造和重点水土流失治理工程补助资金' },
            { code: '100001234512345123456', id: '06', name: '城市排水防涝能力提升工程补助资金', label: '100001234512345123456-城市排水防涝能力提升工程补助资金' },
            { code: '100001234512345123457', id: '07', name: '重点自然灾害综合防治体系建设工程补助资金', label: '100001234512345123457-重点自然灾害综合防治体系建设工程补助资金' },
            { code: '100001234512345123458', id: '08', name: '东北地区和京津冀受灾地区等高标准农田建设补助资金', label: '100001234512345123458-东北地区和京津冀受灾地区等高标准农田建设补助资金' }
          ],
          props: {
            disabled: false,
            placeholder: '请输入增发国债资金中央转移支付项目名称',
            config: {
              format: '{name}',
              disabled: false,
              treeProps: {
                labelFormat: '{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              }
            }
          }
        }
      },
      {
        field: 'trackProCode',
        title: '增发国债资金中央转移支付项目代码',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请输入增发国债资金中央转移支付项目代码', disabled: true } }
      },
      {
        field: 'proStaDate',
        title: '开工或预计开工时间',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$vxeTime', props: { type: 'date', 'label-format': 'yyyy/MM/dd', placeholder: '请选择开工或预计开工时间' } }
      },
      {
        field: 'proEndDate',
        title: '预计完工时间',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$vxeTime', props: { type: 'date', 'label-format': 'yyyy/MM/dd', placeholder: '请选择预计完工时间' } }
      },
      {
        field: 'proRealStaDate',
        title: '实际开工时间',
        span: 12,
        titleWidth: '255',
        itemRender: { name: '$vxeTime', props: { type: 'date', 'label-format': 'yyyy/MM/dd', placeholder: '请选择开工或预计开工时间' } }
      },
      {
        field: 'proRealEndDate',
        title: '实际竣工时间',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTime',
          props: {
            type: 'date',
            'label-format': 'yyyy/MM/dd',
            placeholder: '请选择预计完工时间'
          }
        }
      },
      {
        field: 'fundInvestArea_',
        title: '项目所属投向领域',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeTree',
          required: true,
          props: {
            placeholder: '请输入项目所属投向领域',
            queryparams: {
              elementCode: 'PROFUNDINVESTAREA'
            },
            config: {
              disabled: false,
              isleaf: true,
              treeProps: {
                labelFormat: '{code}-{name}',
                nodeKey: 'id',
                label: 'label',
                children: 'children'
              }
              // axiosConfig: {
              //   method: 'post',
              //   url: '/dfr-monitor-service/dfr/common/elementtree'
              // }
            }
          }
        }
      },
      {
        field: 'isUseMultiTrackPro',
        title: '是否使用多项中央转移支付资金',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeSelect',
          defaultValue: '前端',
          options: [
            { value: 1, label: '是' },
            { value: 2, label: '否' }
          ] }
      },
      {
        field: 'isEnd',
        title: '项目是否终结',
        span: 12,
        titleWidth: '255',
        itemRender: {
          name: '$vxeSelect',
          defaultValue: '前端',
          options: [
            { value: 1, label: '是' },
            { value: 2, label: '否' }
          ] }
      },
      {
        field: 'proContent',
        title: '项目主要建设内容',
        span: 24,
        titleWidth: '255',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目主要建设内容', maxlength: 2000 } }
      },
      {
        field: 'proNotStaRea',
        title: '项目未开工原因',
        span: 24,
        titleWidth: '255',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '请输入项目未开工原因', maxlength: 2000 } }
      },
      {
        field: 'fundInvestAreaDesc',
        title: '项目所属投向领域说明',
        span: 24,
        titleWidth: '255',
        itemRender: { name: '$vxeEditDownTextarea', props: { type: 'string', placeholder: '当存在多个项目所属投向领域时，请填写多个项目所属投向领域的代码和名称，否则为空', maxlength: 2000 } }
      }

    ],
    formDataListBtmRequiredAdd: {
      proAgency_: [{ required: true, message: '请输入项目单位名称', trigger: 'change' }],
      mofDivCode: [{ required: true, message: '请输入区划编码', trigger: 'change' }],
      mofDivName: [{ required: true, message: '请输入区划名称', trigger: 'change' }],
      bugdetLevelCode: [{ required: true, message: '请输入预算级次编码', trigger: 'change' }],
      bugdetLevelName: [{ required: true, message: '请输入预算级次名称', trigger: 'change' }],
      speProCode: [ { required: true, message: '请输入项目代码', trigger: 'change' } ],
      speProName: [{ required: true, message: '请输入项目名称', trigger: 'change' }],
      proDeptCode: [{ required: true, message: '请输入项目主管部门代码', trigger: 'change' }],
      proDept_: [{ required: true, message: '请输入项目主管部门名称', trigger: 'change' }],
      bgtMofDep_: [{ required: true, message: '请输入资金管理处室', trigger: 'change' }],
      manageMofDep_: [{ required: true, message: '请输入业管理处室', trigger: 'change' }],
      fundInvestAreaCode: [ { required: true, message: '请输入项目所属投向领域代码', trigger: 'change' } ],
      fundInvestAreaName: [ { required: true, message: '请输入项目所属投向领域名称', trigger: 'change' } ],
      proContent: [ { required: true, message: '请输入项目主要建设内容', trigger: 'change' } ],
      ndrcProName: [ { required: true, message: '请输入发改委项目名称', trigger: 'change' } ],
      ndrcProCode: [ { required: true, message: '请输入发改委项目编码', trigger: 'change' } ],
      proStaDate: [{
        required: true,
        message: '请输入开工或预计开工时间',
        trigger: 'change'
      }
      ],
      proEndDate: [{
        required: true,
        message: '请输入预计完工时间',
        trigger: 'change',
        validator({ itemValue, rule, rules, data, property }) {
          return new Promise((resolve, reject) => {
            let d1 = new Date(data.proStaDate).getTime()
            let d2 = new Date(data.proEndDate).getTime()
            if (d1 <= d2) {
              resolve(true)
            } else {
              reject(new Error(
                '预计完工时间不得早于开工或预计开工时间'
              ))
            }
          })
        }
      }],
      proRealEndDate: [
        {
          trigger: 'change',
          validator({ itemValue, rule, rules, data, property }) {
            return new Promise((resolve, reject) => {
              if (data.proRealEndDate && data.proRealStaDate) {
                let d1 = new Date(data.proRealStaDate).getTime()
                let d2 = new Date(data.proRealEndDate).getTime()
                if (d1 <= d2) {
                  resolve(true)
                } else {
                  reject(new Error(
                    '实际竣工时间不得早于实际开工时间'
                  ))
                }
              } else {
                resolve(true)
              }
            })
          }
        }
      ],
      isUseMultiTrackPro: [ { required: true, message: '请输入是否使用多项中央转移支付资金', trigger: 'change' } ],
      isEnd: [{ required: true, message: '请输入项目是否终结', trigger: 'change' }],
      kpiTarget: [{ required: true, message: '请输入项目整体绩效目标', trigger: 'change' }],
      // trackPro_: [{ required: true, message: '增发国债资金中央转移支付项目名称', trigger: 'change' }],
      // trackProCode: [{ required: true, message: '增发国债资金中央转移支付项目代码', trigger: 'change' }],
      fundInvestArea_: [ { required: true, message: '请选择项目所属投向领域', trigger: 'change' } ]
    },
    formDataListBtmAdd: {
      proDeptName: '',
      fundInvestAreaName: '',
      kpiTarget: '',
      isUseMultiTrackPro: '',
      proAgencyName: '',
      mofDivName: '',
      budgetLevelName: '',
      budgetLevelCode: '',
      speProName: '',
      speProCode: '',
      proDept_: '',
      bgtMofDep_: '',
      bgtMofDepName: '',
      bgtMofDepCode: '',
      manageMofDep_: '',
      manageMofDepName: '',
      manageMofDepCode: '',
      ndrcProName: '',
      ndrcProCode: '',
      trackProName: '',
      trackProCode: '',
      proStaDate: '',
      proEndDate: '',
      proRealStaDate: '',
      proRealEndDate: '',
      fundInvestArea_: '',
      proContent: '',
      proNotStaRea: '',
      fundInvestAreaDesc: '',
      isEnd: ''
    },
    addBudgetFormConfig: [
      {
        field: 'lv1PerfIndName',
        title: '绩效指标选择',
        span: 12,
        titleWidth: '120',
        visible: false,
        itemRender: { name: '$input', props: { type: 'string', placeholder: '请选择绩效指标', disabled: true } }
      },
      {
        field: 'lv2PerfInd_',
        title: '二级指标名称',
        span: 12,
        titleWidth: '120',
        itemRender: {
          required: true,
          name: '$vxeTree',
          options: [],
          props: {
            config: {
              multiple: true,
              disabled: false,
              isleaf: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              }
            }
          }
        }
      }
    ],
    addBudgetFormData: {
      lv1PerfIndName: '',
      lv2PerfIndName: ''
    },
    addBudgetFormDataRequired: {
      lv1PerfIndName: [{ required: true, message: '请输入一级指标名称', trigger: 'change' }],
      lv2PerfIndName: [{ required: true, message: '请输入二级指标名称', trigger: 'change' }]
    },
    KPIFormConfig: [
      {
        field: 'kpiTarget',
        title: '项目总体绩效',
        span: 24,
        titleWidth: '160',
        itemRender: { name: '$textarea', props: { type: 'string', placeholder: '请输入项目总体绩效' } }
      }
    ],
    KPIFormData: {
      kpiTarget: ''
    },
    KPIFormDataRequired: {
      kpiTarget: [{ required: true, message: '请输入项目总体绩效', trigger: 'change' }]
    }
  }
}
