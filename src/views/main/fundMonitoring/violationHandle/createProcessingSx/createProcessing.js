import store from '@/store/index'
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '问询单编码'
        }
      }
    },
    {
      field: 'agencyName',
      title: '预算单位',
      width: '180',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '违规类型'
        }
      }
    },
    {
      title: '主题',
      width: 180,
      field: 'regulationClassName',
      formula: '',
      align: 'left',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '主题'
        }
      }
    },
    {
      title: '违规时间范围-开始',
      field: 'warnStartTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '违规时间-开始'
        }
      }
    },
    {
      title: '违规时间范围-结束',
      field: 'warnTime',
      width: 200,
      align: 'center',
      filters: false,
      itemRender: {
        name: '$vxeTime',
        props: {
          format: 'YYYY-MM-DD', // "当前日期为：YYYY-MM-DD，星期W，为第Q季度，时间为：hh:mm:ss:c"
          type: 'date',
          placeholder: '违规时间-结束'
        }
      }
    },
    {
      title: '监控类型',
      field: 'triggerClass',
      formula: '',
      align: 'left',
      width: 180,
      itemRender: {
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
        props: {
          placeholder: '监控类型'
        },
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    // {
    //   title: '预警级别',
    //   field: 'warningLevel',
    //   width: 180,
    //   align: 'center',
    //   cellRender: {
    //     'name': '$vxeSelect',
    //     options: store.state.warnInfo.warnLevelOptions.map(item => {
    //       return {
    //         ...item,
    //         value: String(item.value)
    //       }
    //     }),
    //     'defaultValue': '',
    //     'props': {}
    //   },
    //   sortable: 'true',
    //   name: '$vxeSelect'
    // },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  highQueryData: {
    violateType: '',
    dealNo: '',
    regulationClassName: '',
    warnTime: '',
    agencyName: '',
    triggerClass: '',
    warningLevel: '',
    fiRuleName: ''
  },
  createHighQueryConfig: [
    {
      field: 'agencyName',
      title: '预算单位',
      width: '180',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '预算单位'
        }
      }
    },
    {
      title: '监控规则',
      field: 'fiRuleName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '监控规则'
        }
      }
    }
  ],
  createHighQueryData: {
    fiRuleName: ''
  },
  warnQueryConfig: [
    {
      title: '管理级次',
      field: 'regulationType',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '1', label: '系统级' },
          { value: '2', label: '财政级' },
          { value: '3', label: '部门级' }
        ],
        props: {
          placeholder: '管理级次'
        }
      }
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'width': 180,
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      title: '规则名称',
      field: 'firulename',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则名称'
        }
      }
    }
  ],
  warnQueryData: {
    regulationType: '',
    warningLevel: '',
    firulename: ''
  },
  // 新增弹窗高级查询
  sethighQueryConfig: [
    // {
    //   title: '规则模板编码',
    //   field: 'declareCode',
    //   width: '8',
    //   align: 'left',
    //   formula: '',
    //   name: '$vxeInput',
    //   itemRender: {
    //     name: '$vxeInput',
    //     options: [],
    //     props: {
    //       placeholder: '规则模板编码'
    //     }
    //   }
    // },
    {
      title: '规则模板名称',
      field: 'ruleTemplateName',
      width: 180,
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '规则模板名称'
        }
      }
    }
  ],
  sethighQueryData: {
    declareCode: '',
    ruleTemplateName: ''
  },
  policiesTableColumns: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  policiesTableColumns1: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  policiesTableColumns2: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  policiesTableColumns3: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  policiesTableColumns4: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  policiesTableColumnsbtu: [
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规类型',
      width: 180,
      field: 'violateType',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '疑似违规说明',
      width: 180,
      field: 'doubtViolateExplain',
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室意见',
      field: 'departmentStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '2',
            label: '认定正常'
          },
          {
            value: '3',
            label: '需要核实（下发单位）'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '处室联系方式',
      width: 180,
      field: 'phone2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室下发人',
      width: 180,
      field: 'handler2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '处室指导意见',
      width: 180,
      field: 'information2',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见',
      field: 'agencyStatus',
      align: 'center',
      width: 180,
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: '1',
            label: '已整改'
          },
          {
            value: '2',
            label: '核实无误'
          }
        ],
        defaultValue: '',
        props: {}
      },
      name: '$vxeSelect'
    },
    {
      title: '预算单位联系方式',
      width: 180,
      field: 'phone1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位处理人',
      width: 180,
      field: 'handler1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位核实意见说明',
      width: 180,
      field: 'information1',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '主管处室退回原因',
      width: 180,
      field: 'returnReason',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  logoTableColumns: [
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
      title: '监控规则',
      width: 265,
      field: 'fiRuleName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '违规详情',
      field: 'gloableOptionRow',
      align: 'center',
      sortable: false,
      filters: false,
      width: 180,
      cellRender: {
        name: '$CreateProcessingGloableOptionRow'
      }
    }
  ],
  warnTableColumns: [
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
      title: '预警级别',
      'width': 180,
      field: 'warnlevel',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '管理级次',
      'width': 180,
      field: 'regulationtype',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位编码',
      'width': 180,
      field: 'agencycode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算单位名称',
      'width': 180,
      field: 'agencyname',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '规则编码',
      'width': 180,
      field: 'firulecode',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '规则名称',
      'width': 180,
      field: 'firulename',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '处理情况',
      'field': 'status',
      'align': 'center',
      'width': 180,
      'cellRender': {
        'name': '$vxeSelect',
        options: [
          {
            'value': '1',
            'label': '待处理'
          },
          {
            'value': '2',
            'label': '已处理'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'name': '$vxeSelect'
    },
    {
      title: '支付申请编码',
      'width': 180,
      field: 'fivouno',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      'title': '支付申请金额',
      'field': 'paymentamount',
      'width': '200',
      'align': 'right',
      'filters': '[object Object]',
      'filterRender': {
        'name': 'FilterNumberCompare'
      },
      'combinedType': 'average,subTotal,total,totalAll',
      'cellRender': {
        'name': '$moneyRender',
        'options': [],
        'defaultValue': '',
        'props': {}
      },
      'name': '$moneyRender',
      'fixed': '',
      'formula': '',
      'constraint': '',
      'sortable': 'true',
      'associatedQuery': '',
      'className': '',
      'combinedType_select_sort': '平均值,选中合计,当前页合计,所有合计'
    },
    {
      title: '资金用途',
      'width': 180,
      field: 'useoffunds',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '监控拦截时间',
      'width': 180,
      field: 'createTime',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '违规处理时间',
      'width': 180,
      field: 'handleTime',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  createBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待下发-待下发',
        code: 'unIssue',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已下发-已下发',
        code: 'issued',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待下发',
      code: 'unIssue',
      type: 'button'
    },
    buttonsInfo: {
      'unIssue': [
        {
          label: '生成',
          code: 'create',
          status: 'primary'
        }
      ],
      'issued': [
      ]
    }
  },
  retroactBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待核实-待核实',
        code: 'dhs',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已核实-待处室审核',
        code: 'dcszg',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      },
      {
        type: 'button',
        label: '处室已审核-审核通过',
        code: 'csysh',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      },
      {
        type: 'button',
        label: '处室已审核-被退回',
        code: 'bth',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      }
    ],
    curButton: {
      label: '待核实-待核实',
      code: 'dhs',
      type: 'button'
    },
    buttonsInfo: {
      'dhs': [
        {
          label: '整改核实',
          code: 'feedback',
          status: 'primary'
        }
      ],
      'bth': [
        {
          label: '整改核实',
          code: 'bth',
          status: 'primary'
        }
      ]
    }
  },
  retroactMofBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待处理',
        code: 'dcl',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已下发',
        code: 'yxf',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '待审核',
        code: 'dsh',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      },
      {
        type: 'button',
        label: '已退回',
        code: 'yth',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      },
      {
        type: 'button',
        label: '认定正常',
        code: 'rdzc',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      },
      {
        type: 'button',
        label: '已整改',
        code: 'yzg',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待处理',
      code: 'dcl',
      type: 'button'
    },
    buttonsInfo: {
      'dcl': [
        {
          label: '整改反馈',
          code: 'dcl',
          status: 'primary'
        }
      ],
      'dsh': [
        {
          label: '联查业务数据',
          code: 'queryBusinessData',
          status: 'primary'
        },
        {
          label: '审核',
          code: 'process',
          status: 'primary'
        }
      ],
      'rectified': [
      ]
    }
  },
  archiveBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '待归档-待归档',
        code: 'archive',
        iconName: 'base-daiban.png',
        iconNameActive: 'base-daiban-active.png'
      },
      {
        type: 'button',
        label: '已归档-已归档',
        code: 'archived',
        iconName: 'base-yiban.png',
        iconNameActive: 'base-yiban-active.png'
      }
      // {
      //   type: 'button',
      //   label: '预警明细列表',
      //   code: 'warnList',
      //   iconName: 'base-daiban.png',
      //   iconNameActive: 'base-daiban-active.png'
      // }
    ],
    curButton: {
      label: '待归档-待归档',
      code: 'archive',
      type: 'button'
    },
    buttonsInfo: {
      'archive': [
        {
          label: '归档',
          code: 'archiving',
          status: 'primary'
        }
      ],
      'archived': [
        {
          label: '打印',
          code: 'print',
          status: 'primary'
        }
      ]
    }
  },
  searchBtnConfig: {
    changeBtns: true,
    buttons: [
      {
        type: 'button',
        label: '查询',
        code: 'search',
        iconName: 'base-all.png',
        iconNameActive: 'base-all-active.png'
      }
    ],
    curButton: {
      type: 'button',
      label: '查询',
      code: 'search',
      iconName: 'base-daiban.png',
      iconNameActive: 'base-daiban-active.png'
    },
    buttonsInfo: {
      'search': [
        {
          label: '整改详情',
          code: 'checkDetail',
          status: 'primary'
        },
        {
          label: '校验',
          code: 'check',
          status: 'primary'
        }
      ]
    }
  },
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      return [
        <el-tooltip content="" placement="" effect="light">
          <span style="color: #4293F4; text-decoration: underline" onClick={() => self.onOptionRowClick({ row, column })}>查看</span>
        </el-tooltip>
      ]
    }
  },
  // 处理
  handletableColumnsConfig: [
    {
      title: '规则名称',
      field: 'regulationName',
      sortable: false,
      align: 'left',
      cellRender: {
        name: '$vxeTableHref'
      }
    },
    {
      'title': '预警级别',
      'field': 'warningLevel',
      'width': 180,
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        options: store.state.warnInfo.warnLevelOptions.map(item => {
          return {
            ...item,
            value: String(item.value)
          }
        }),
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    },
    {
      'title': '处理方式',
      'field': 'handleType',
      'align': 'center',
      'cellRender': {
        'name': '$vxeSelect',
        'options': [
          {
            'value': '1',
            'label': '预警，无需上传附件'
          },
          {
            'value': '2',
            'label': '预警，需上传附件'
          },
          {
            'value': '5',
            'label': '记录'
          }
        ],
        'defaultValue': '',
        'props': {}
      },
      'sortable': 'true',
      'name': '$vxeSelect'
    }
  ],
  incomeMsgConfig: [
    {
      field: 'warningCode',
      title: '监控数据编码',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '监控数据编码', disabled: true }
      }
    },
    {
      field: 'pay_app_no',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
      }
    },
    {
      field: 'cor_bgt_doc_no_name',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'pay_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'pay_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'pay_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payee_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payee_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payee_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'pay_app_amt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'use_des',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isUnionFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'isThrExp',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'directFund',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '监控时间',
      field: 'fiDate',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { type: 'datetime', disabled: true, placeholder: '监控时间' }
      }
    },
    {
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    }
  ],
  incomeMsgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: '',
    payBusType: '',
    todoName: '',
    voidOrNot: ''
  },
  businessMsgConfig: [
    {
      field: 'pay_app_no',
      title: '支付申请编号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '支付申请编号', disabled: true }
      }
    },
    {
      title: '预算单位名称',
      span: 8,
      titleWidth: '180',
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center',
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '预算单位名称', disabled: true }
      }
    },
    {
      field: 'cor_bgt_doc_no_name',
      title: '指标文号',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { placeholder: '指标文号', disabled: true }
      }
    },
    {
      title: '预算项目',
      field: 'proName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '预算项目' } }
    },
    {
      title: '收支类别',
      field: 'proCatName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收支类别' }
      }
    },
    {
      title: '付款人',
      field: 'pay_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人' }
      }
    },
    {
      title: '付款人账号',
      field: 'pay_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款人账号' }
      }
    },
    {
      title: '付款银行',
      field: 'pay_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '付款银行' }
      }
    },
    {
      title: '收款人',
      field: 'payee_acct_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人' }
      }
    },
    {
      title: '收款人账号',
      field: 'payee_acct_no',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款人账号' }
      }
    },
    {
      title: '收款银行',
      field: 'payee_acct_bank_name',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '收款银行' }
      }
    },
    {
      field: 'pay_app_amt',
      title: '支付金额',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付金额' }
      }
    },
    {
      title: '资金用途',
      field: 'use_des',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金用途' }
      }
    },
    {
      title: '政府经济分类',
      field: 'govEconomyType',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '政府经济分类' }
      }
    },
    {
      title: '部门经济分类',
      field: 'deptEconomyType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '部门经济分类' }
      }
    },
    {
      title: '资金性质',
      field: 'natureOfFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '资金性质' }
      }
    },
    {
      title: '功能分类',
      field: 'funcType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '功能分类' }
      }
    },
    {
      title: '支付方式',
      field: 'paymentMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '支付方式' }
      }
    },
    {
      title: '结算方式',
      field: 'settlementMethod',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '结算方式' }
      }
    },
    {
      title: '业务处室',
      field: 'businessOffice',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务处室' }
      }
    },
    {
      title: '工资标识',
      field: 'salaryMark',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '工资标识' }
      }
    },
    {
      title: '是否工会经费',
      field: 'isUnionFunds',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否工会经费' }
      }
    },
    {
      title: '三公经费',
      field: 'isThrExp',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '三公经费' }
      }
    },
    {
      title: '直达资金标识',
      field: 'directFund',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '直达资金标识' }
      }
    },
    {
      title: '业务类型',
      field: 'payBusType',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '业务类型' }
      }
    },
    {
      title: '当前岗',
      field: 'todoName',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '当前岗' }
      }
    },
    {
      title: '是否作废',
      field: 'voidOrNot',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '是否作废' }
      }
    }
  ],
  businessMsgData: {
    warningCode: '',
    payApplyNumber: '',
    agencyName: '',
    targetDocNum: '',
    projectName: '',
    projectTypeName: '',
    payer: '',
    payAccount: '',
    payBankName: '',
    payee: '',
    receiveAccount: '',
    receiveBankName: '',
    paymentAmount: '',
    useOfFunds: '',
    govEconomyType: '',
    deptEconomyType: '',
    natureOfFunds: '',
    funcType: '',
    paymentMethod: '',
    settlementMethod: '',
    businessOffice: '',
    salaryMark: '',
    isUnionFunds: '',
    isThrExp: '',
    directFund: '',
    createTime: '',
    fiDate: '',
    payBusType: '',
    todoName: '',
    voidOrNot: ''
  },
  // 生成时部分字段可编辑
  createConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { placeholder: '违规类型' },
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
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '5',
            label: '蓝色预警'
          },
          {
            value: '4',
            label: '灰色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: '5',
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '处理结果',
      field: 'handleResult',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 0,
            label: '未处理'
          },
          {
            value: 1,
            label: '通过'
          },
          {
            value: 2,
            label: '不通过'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理结果' }
      },
      name: '$vxeSelect'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
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
    fiRuleName: ''
  },
  createTableColumns: [ // 归档查询
    {
      title: '问询单编码',
      width: 180,
      field: 'dealNo',
      sortable: false,
      filters: false,
      align: 'center'
    },
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
      'title': '预警级别',
      'field': 'warnLevel',
      'fixed': '',
      'width': '100',
      'type': 'html',
      'align': 'center',
      'formula': '',
      'constraint': '',
      'combinedType': '',
      'sortable': '1',
      'associatedQuery': {
        'queryMethods': '',
        'queryUrl': '',
        'params': {}
      },
      'dragSort': null,
      'className': '',
      'combinedType_select_sort': '',
      'filters': ''
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      cellRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
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
  // 整改查看时不可编辑
  checkConfig: [
    {
      field: 'violateType',
      title: '违规类型',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '违规类型' },
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
      title: '预警级别',
      field: 'warnLevel',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        props: { disabled: true, placeholder: '预警级别' },
        options: [
          {
            value: '1',
            label: '黄色预警'
          },
          {
            value: '2',
            label: '橙色预警'
          },
          {
            value: '3',
            label: '红色预警'
          },
          {
            value: '4',
            label: '灰色预警'
          },
          {
            value: '5',
            label: '蓝色预警'
          }
        ],
        defaultValue: ''
      },
      name: '$vxeSelect'
    },
    {
      title: '处理方式',
      field: 'handleType',
      align: 'center',
      titleWidth: '180',
      span: 8,
      itemRender: {
        name: '$vxeSelect',
        options: [
          {
            value: 1,
            label: '预警，无需上传附件'
          },
          {
            value: 2,
            label: '预警，需上传附件'
          },
          {
            value: 3,
            label: '拦截'
          },
          {
            value: 4,
            label: '禁止'
          },
          {
            value: 5,
            label: '记录'
          }
        ],
        defaultValue: '',
        props: { disabled: true, placeholder: '处理方式' }
      },
      name: '$vxeSelect'
    },
    {
      title: '区划',
      field: 'mofDivCode',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '区划' } }
    },
    {
      title: '生成日期',
      field: 'issueTime',
      span: 8,
      titleWidth: '180',
      itemRender: {
        name: '$vxeInput',
        props: { disabled: true, placeholder: '生成日期' }
      }
    }
  ]
}
