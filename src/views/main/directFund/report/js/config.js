// import { extend } from '@/utils'

const CONFIG = {
  tableConf: {
    defaultConfig: {
      pagerConfig: {
        enabled: false,
        total: 0,
        currentPage: 1,
        pageSize: 10000
      },
      toolbarConfig: { // table工具栏配置
        batchModify: false,
        moneyConversion: true, // 是否有金额转换,
        disabledMoneyConversion: false,
        import: false,
        calculator: false,
        export: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        },
        yearlist: []
      },
      footerConfig: {
        showFooter: false,
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal']
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: false, // hasCheckbox
          seq: true, // 序号列
          cellClickCheck: true
        },
        formatters: {
        },
        renderers: {
        },
        methods: {
          // 用户自定义配置对应事件
          toolbarButtonClickEvent(obj, context, e) {
            switch (obj.code) {
              case '':
                break
              default:
            }
          },
          onOptionRowClick({ row, optionType }, context) {
            console.log(context.$parent.$parent.$parent)
            switch (optionType) {
              case '':
                break
              default:
            }
          }
        }
      },
      tableColumnsConfig: [],
      tableData: [],
      editRules: {},
      tableKeyboardConfig: {
        isArrow: true,
        isDel: false,
        isEnter: true,
        isTab: true,
        isEdit: true
      }
    }
  },
  status2button: {
    defaultConfig: {
      tabStatusBtnConfig: {
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '本级',
            code: 'benji',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png'
          },
          {
            type: 'button',
            label: '汇总',
            code: 'summary',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        curButton: {
          label: '本级',
          code: 'benji',
          type: 'button'
        },
        buttonsInfo: {
          'benji': [
            {
              label: '勾稽审核',
              code: 'toolbar-auit'
            },
            {
              label: '提交',
              code: 'commit'
            },
            {
              label: '撤销',
              code: 'toolbar-back'
            },
            {
              label: '导出',
              code: 'import'
            },
            {
              label: '刷新',
              code: 'refresh'
            }
          ],
          'summary': [
            {
              label: '接收',
              code: 'accept',
              status: 'primary'
            },
            {
              label: '退回',
              code: 'rocback'
            },
            {
              label: '提交',
              code: 'summary_commit'
            },
            {
              label: '撤销',
              code: 'toolbar-back'
            },
            {
              label: '导出',
              code: 'import'
            },
            {
              label: '刷新',
              code: 'refresh'
            }
          ]
        }
      },
      areaTablePanelConfig: { // 本级
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '本级',
            code: 'benji',
            iconName: 'base-daiban.png',
            iconNameActive: 'base-daiban-active.png'
          }
        ],
        curButton: {
          label: '本级',
          code: 'benji',
          type: 'button'
        },
        buttonsInfo: {
          'benji': [
            // {
            //   label: '勾稽审核',
            //   code: 'toolbar-auit'
            // },
            // {
            //   label: '提交',
            //   code: 'commit'
            // },
            // {
            //   label: '撤销',
            //   code: 'toolbar-back'
            // },
            {
              label: '送审',
              code: 'reportcommit2audit'
            },
            {
              label: '导出',
              code: 'import'
            },
            {
              label: '刷新',
              code: 'refresh'
            }
          ]
        }
      },
      sumTabStatusBtnConfig: { // 汇总
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '汇总',
            code: 'summary',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        curButton: {
          label: '汇总',
          code: 'summary',
          type: 'button'
        },
        buttonsInfo: {
          'summary': [
            // {
            //   label: '接收',
            //   code: 'accept',
            //   status: 'primary'
            // },
            // {
            //   label: '退回',
            //   code: 'rocback'
            // },
            // {
            //   label: '提交',
            //   code: 'summary_commit'
            // },
            // {
            //   label: '撤销',
            //   code: 'toolbar-back'
            // },
            {
              label: '送审',
              code: 'reportcommit2audit'
            },
            // {
            //   label: '任务送审',
            //   code: 'taskcommit2audit'
            // },
            {
              label: '导出',
              code: 'import'
            },
            {
              label: '刷新',
              code: 'refresh'
            }
          ]
        }
      },
      dataAcceptTabStatusBtnConfig: { // 数据接收
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '待接收',
            code: 'unAccept',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          },
          {
            type: 'button',
            label: '已接收',
            code: 'accepted',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        curButton: {
          label: '待接收',
          code: 'unAccept',
          type: 'button'
        },
        buttonsInfo: {
          'unAccept': [
            {
              label: '接收',
              code: 'accept',
              status: 'primary'
            },
            {
              label: '数据检验',
              code: 'acceptTest',
              status: 'primary'
            },
            {
              label: '退回',
              code: 'rocback'
            }
          ],
          'accepted': [
            {
              label: '重复接收',
              code: 'reAccept',
              status: 'primary'
            }
          ]
        }
      },
      auditTabStatusBtnConfig: { // 报表审核
        changeBtns: true,
        buttons: [
          {
            type: 'button',
            label: '待审核',
            code: 'unAudit',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          },
          {
            type: 'button',
            label: '已审核',
            code: 'audited',
            iconName: 'base-zhibaio.png',
            iconNameActive: 'base-zhibaio-active.png'
          }
        ],
        curButton: {
          label: '待审核',
          code: 'unAudit',
          type: 'button'
        },
        buttonsInfo: {
          'unAudit': [
            {
              label: '审核',
              code: 'reportAudit',
              status: 'primary'
            },
            // {
            //   label: '任务审核',
            //   code: 'taskAudit'
            // },
            {
              label: '退回',
              code: 'reportReturn'
            }
            // {
            //   label: '任务退回',
            //   code: 'taskReturn'
            // }
          ],
          'audited': [
            // {
            //   label: '撤销单表审核',
            //   code: 'reportRecall'
            // },
            // {
            //   label: '撤销任务审核',
            //   code: 'taskRecall'
            // },
            {
              label: '提交',
              code: 'commit'
            },
            {
              label: '撤销',
              code: 'toolbar-back'
            }
          ]
        }
      }
    }
  },
  leftTreeConf: {
    defaultConfig: {
      inputTableTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{text}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{text}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'text', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          dataField: 'data',
          rootName: '全部',
          successCode: '100000', // 成功code
          statusField: 'rscode',
          method: 'post', // 请求方式
          url: 'bisReport/report/getQueryTable' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      inputTableTreeQueryparams: {
        appguid: 'fiscal',
        batchno: 1,
        datatype: 8,
        // whereSql: 'and (code like \'999%\')',
        sxspecroleguid: '999004'
      },
      inputTableTreeFilterText: '',
      inputTableTreeData: [],
      mofDivTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 0, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
        levelno: -1, // 可选层级
        valueKeys: ['code', 'name', 'id'],
        format: '{code}-{name}',
        placeholder: '请选择',
        multipleValueType: 'String', // 多选值类型 String[逗号分割]，Array //废弃
        treeProps: {
          // 树配置选项
          labelFormat: '{code}-{name}', // {code}-{name}
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: 'pay-report-service/v1/payreportdata/remote/mofDivTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      mofDivTreeData: [],
      mofDivTreeFilterText: ''
    }
  },
  commonConf: {
    defaultConfig: {
    }
  }
}

export default function (configType, detailItem, configItem = 'defaultConfig') {
  if (configType) {
    if (!CONFIG[configType]) {
      return null
    }
    if (!CONFIG[configType][configItem]) {
      configItem = 'defaultConfig'
    }
    let result = CONFIG[configType][configItem]
    let deepCopyRes = JSON.parse(JSON.stringify(result))
    if (detailItem) {
      return deepCopyRes[detailItem]
    } else {
      return deepCopyRes
    }
  } else {
    return null
  }
}
