import store from '@/store'
export const proconf = {
  // 生成时部分字段可编辑
  createConfig1: [
    {
      field: 'fiRuleName',
      title: '监控规则',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控规则', disabled: true }
      }
    },
    {
      title: '区划',
      field: 'mofDivName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '下发日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    },
    {
      title: '核实机构',
      field: 'checkUnit',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: 'XXXXX单位'
          },
          {
            value: '2',
            label: 'XXXXX部门'
          }
        ],
        props: { disabled: true, placeholder: '请选择核实机构' }
      },
      name: '$vxeSelect'
    },
    {
      title: '疑点情况描述',
      field: 'doubtViolateExplain',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: true, resize: 'vertical', placeholder: '请输入疑点情况描述' } }
    },
    {
      title: '核实建议描述',
      field: 'checkSuggest',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: true, placeholder: '请输入核实建议描述' }
      }
    }
    // {
    //   title: '附件',
    //   field: 'attachmentid1',
    //   visible: true,
    //   span: 24,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$customerFileRender',
    //     props: { disabled: false }
    //   }
    // }
  ],
  createConfig2: [
    {
      field: 'commentDept',
      title: '整改处理方式',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: false },
        options: [
          {
            value: '1',
            label: '1-通过'
          },
          {
            value: '2',
            label: '2-退回'
          },
          {
            value: '3',
            label: '3-违规'
          },
          {
            value: '4',
            label: '4-认定正常'
          }
        ]
      }
    },
    {
      field: 'handler1',
      title: '核实人员',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '核实人员', disabled: false }
      }
    },
    {
      field: 'phone1',
      title: '联系电话',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '联系电话', disabled: false }
      }
    },
    {
      title: '反馈日期',
      field: 'updateTime1',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    },
    {
      title: '核实情况描述',
      field: 'information1',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: false, resize: 'vertical', rows: 4, placeholder: '请输入核实情况描述' }
      }
    }
    // {
    //   title: '附件',
    //   field: 'attachmentid1',
    //   visible: true,
    //   span: 24,
    //   titleWidth: '180',
    //   itemRender: {
    //     name: '$customerFileRender',
    //     props: { disabled: false }
    //   }
    // }
  ],
  createConfig3: [
    {
      field: 'HSRDJG',
      title: '核实认定结果',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '认定违规'
          },
          {
            value: 2,
            label: '认定正常'
          }
        ],
        props: { disabled: false, placeholder: '请选择核实认定结果' }
      }
    },
    {
      field: 'rendingzhuangtai',
      title: '认定状态',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '1-放行'
          },
          {
            value: 2,
            label: '2-改正'
          }
        ],
        props: { disabled: false, placeholder: '请选择核实认定结果' }
      }
    },
    {
      title: '认定日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '请输入认定日期' }
      }
    },
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: 180,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true },
        options: [
          {
            value: '1',
            label: '预算下达不及时'
          },
          {
            value: '2',
            label: '违规使用资金'
          }
        ]
      }
    },
    {
      field: 'violateType',
      title: '下发整改机构',
      titleWidth: 180,
      disabled: true,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true },
        options: [
          {
            value: '指标使用不当',
            label: 'XXXXX单位'
          },
          {
            value: '支出进度太慢',
            label: 'XXXXX部门'
          }
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '整改期限',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '整改期限', disabled: false }
      }
    },
    {
      title: '核实处理意见',
      field: 'issueTime',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: false, resize: 'vertical', rows: 4, placeholder: '请输入核实情况描述' }
      }
    },
    {
      title: '附件',
      field: 'attachmentid2',
      visible: true,
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$customerFileRender',
        props: { disabled: false, placeholder: '请输入核实情况描述' }
      }
    }
  ],
  createConfig4: [
    {
      field: 'fiRuleName',
      title: '整改处理方式',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        props: { disabled: true },
        options: [
          {
            value: '1',
            label: '1-退回'
          },
          {
            value: '2',
            label: '2-补办相关手续'
          },
          {
            value: '3',
            label: '3-调整会计科目'
          },
          {
            value: '4',
            label: '4-备案说明'
          },
          {
            value: '5',
            label: '5-通报'
          },
          {
            value: '6',
            label: '移交相关部门处理'
          }
        ]
      }
    },
    {
      field: 'fiRuleName',
      title: '资金退回状态',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        props: { disabled: true },
        options: [
          {
            value: '1',
            label: '1-应退'
          },
          {
            value: '2',
            label: '2-已退'
          },
          {
            value: '3',
            label: '3-无需退回'
          }
        ]
      }
    },
    {
      title: '资金退回金额',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金退回金额' }
      }
    },
    {
      title: '处理人',
      field: 'chuliren',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金退回金额' }
      }
    },
    {
      title: '处理人电话',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金退回金额' }
      }
    },
    {
      title: '整改时间',
      field: 'zhenggaishijian',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金退回金额' }
      }
    },
    {
      title: '整改情况描述',
      field: 'issueTime',
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$textarea',
        props: { disabled: false, resize: 'vertical', rows: 4, placeholder: '请输入核实情况描述' }
      }
    },
    {
      title: '附件',
      field: 'attachmentid3',
      visible: true,
      span: 24,
      titleWidth: '180',
      itemRender: {
        name: '$customerFileRender',
        props: { disabled: false }
      }
    }
  ],
  createConfig5: [
    {
      field: 'zgztqr',
      title: '整改状态确认',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        props: { disabled: true },
        options: [
          {
            value: '1',
            label: '1-已整改'
          },
          {
            value: '2',
            label: '2-未整改'
          },
          {
            value: '3',
            label: '3-退回'
          }
        ]
      }
    },
    {
      field: 'zgjg',
      title: '整改结果',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        props: { disabled: true },
        options: [
          {
            value: '1',
            label: '1-收回预算'
          },
          {
            value: '2',
            label: '2-退回国库'
          },
          {
            value: '3',
            label: '3-调整账'
          },
          {
            value: '4',
            label: '4-备案说明'
          },
          {
            value: '5',
            label: '5-其他'
          }
        ]
      }
    },
    {
      title: '整改认定说明',
      field: 'ZHRDSM',
      span: 8,
      visible: false,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '整改认定说明' }
      }
    },
    {
      title: '退回原因说明',
      field: 'THYYSM',
      span: 8,
      visible: false,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: false, placeholder: '退回原因说明' }
      }
    }

  ],
  createDataList: {
    issueTime: '',
    mofDivCode: '',
    handleType: '',
    handleResult: '',
    warnLevel: '',
    violateType: '',
    fiRuleName: '',
    HSJG: 1
  },
  createTableColumns: [ // 归档查询
    {
      title: '年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '监控处理单号',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '生成日期',
      width: 180,
      field: 'issueTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      field: 'violateType',
      title: '违规类型',
      width: 180,
      disabled: true,
      itemRender: {
        name: '$vxeSelect',
        disabled: true,
        options: [
          {
            value: '指标使用不当',
            label: '指标使用不当'
          },
          {
            value: '支出进度太慢',
            label: '支出进度太慢'
          },
          {
            value: '资金使用方向错误',
            label: '资金使用方向错误'
          },
          {
            value: '资金超支',
            label: '资金超支'
          }
        ]
      }
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '单位整改意见',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室整改意见',
      width: 180,
      field: 'information3',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '状态',
      width: 180,
      field: 'status',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '已下发'
          },
          {
            value: 2,
            label: '已下发单位'
          },
          {
            value: 3,
            label: '单位反馈待审核'
          },
          {
            value: 4,
            label: '已整改'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
      // 0 未下发；1 已下发；2已整改；3已归档
    }
  ],
  workFlowColumnsData: [
    {
      title: '区划',
      width: 180,
      field: 'mofDivName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{mofDivCode}-{mofDivName}'
        }
      },
      props: {
        format: '{mofDivCode}-{mofDivName}'
      }
    },
    {
      title: '预算单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: {
        name: '$vxeInput',
        options: [],
        defaultValue: '',
        props: {
          format: '{agencyCode}-{agencyName}'
        }
      },
      props: {
        format: '{agencyCode}-{agencyName}'
      }
    },
    {
      title: '监控单号',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付申请编号',
      width: 180,
      field: 'payAppNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规时间',
      width: 180,
      field: 'warnTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '事中触发'
          },
          {
            value: 2,
            label: '定时触发'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '监控规则',
      width: 180,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: store.state.warnInfo.warnControlTypeOptions,
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '支付金额',
      field: 'paymentAmount',
      sortable: false,
      filters: false,
      align: 'right',
      width: 180,
      combinedType: [
        'average',
        'subTotal',
        'total',
        'totalAll'
      ],
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '操作',
      field: 'opration',
      sortable: false,
      filters: false,
      align: 'center',
      fixed: 'right',
      width: 230,
      cellRender: { name: '$customerRender' }
    }
  ],
  // 校验座机电话号码
  officePhoneValid ({ itemValue: value }) {
    let reg = /^((0\d{2,3}-\d{7,8}|(0\d{2,3}-\d{7,8}-\d{3,5}))|[0-9]{8})$/ // 座机
    let myreg = /^1[3-9]\d{9}$/ // 手机号
    if (!value) {
      return Promise.reject(new Error('请填写办公电话'))
    } else if (value && !(reg.test(value) || myreg.test(value))) {
      return Promise.reject(new Error('请填写正确的办公电话'))
    }
    return Promise.resolve()
  }
}
