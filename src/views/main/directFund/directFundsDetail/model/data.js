import store from '@/store'

// 直达资金标识options
const directFundOptions = [
  { label: '中央直达资金', value: '01' },
  { label: '中央参照直达资金', value: '02' }
]

export function getUnregisteredColumns() {
  const column = [
    {
      field: 'releaseTime',
      title: '下达日期'
    },
    {
      field: 'resMofDivName',
      title: '上级区划'
    },
    {
      field: 'supBgtDocNo',
      title: '上级文号'
    },
    {
      field: 'expFunc',
      title: '支出功能分科科目'
    },
    {
      field: 'supBgtDocNo',
      title: '上级指标标题'
    },
    {
      field: 'proName',
      title: '项目名称'
    },
    {
      field: 'amount',
      title: '未登记金额',
      sortable: false,
      filters: false,
      cellRender: {
        name: '$vxeMoney'
      }
    },
    {
      field: 'isDir',
      title: '直达资金标识',
      cellRender: {
        name: '$vxeSelect',
        options: directFundOptions
      }
    },
    {
      field: 'tpFuncName',
      title: '支出功能分类（转）'
    },
    {
      field: 'expFuncName',
      title: '支出功能分类'
    },
    {
      field: 'fundType',
      title: '资金性质'
    }
  ]
  column.forEach(item => {
    item.minWidth = 120
  })
  return column
}

export function getHaveRegisteredColumns() {
  const column = [
    {
      field: 'releaseTime',
      title: '下达日期'
    },
    {
      field: 'receiveTime',
      title: '登记日期'
    },
    {
      field: 'resMofDivName',
      title: '上级区划'
    },
    {
      field: 'supBgtDocNo',
      title: '上级文号'
    },
    {
      field: 'supBgtDocNo',
      title: '上级指标标题'
    },
    {
      field: 'proName',
      title: '项目名称'
    },
    {
      field: 'amount',
      title: '指标金额',
      align: 'right',
      sortable: false,
      filters: false,
      cellRender: {
        name: '$vxeMoney'
      }
    },
    {
      field: 'notSelfFinancialAmt',
      title: '分解下达金额',
      sortable: false,
      filters: false,
      cellRender: {
        name: '$vxeMoney'
      }
    },
    {
      field: 'isDir',
      title: '直达资金标识',
      cellRender: {
        name: '$vxeSelect',
        options: directFundOptions
      }
    },
    {
      field: 'tpFuncName',
      title: '支出功能分类（转）'
    },
    {
      field: 'expFuncName',
      title: '支出功能分类'
    },
    {
      field: 'fundType',
      title: '资金性质'
    }
  ]
  column.forEach(item => {
    item.minWidth = 140
  })
  return column
}

export function getFormSchemas() {
  const formSchemas = [
    {
      field: 'resProCodes',
      title: '项目名称',
      itemRender: {
        name: '$vxeTree',
        options: [],
        defaultValue: [],
        props: {
          config: {
            selectOnNodeClick: false,
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'code',
              label: 'label',
              children: 'children'
            },
            axiosConfig: {
              successCode: '000000', // 成功code
              statusField: 'code',
              method: 'post', // 请求方式
              url: 'dfr-monitor-service/dfr/mofDivList/queryPro'
            },
            placeholder: '项目名称',
            multiple: true,
            readonly: false,
            isleaf: false
          },
          queryparams: {
            fiscalYear: store.state.userInfo.year
          }
        }
      }
    },
    {
      field: 'resMofDivCode',
      title: '上级区划',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          selectOnNodeClick: false,
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'code',
              label: 'label',
              children: 'children'
            },
            axiosConfig: {
              successCode: '000000', // 成功code
              statusField: 'code',
              method: 'post', // 请求方式
              url: 'dfr-monitor-service/dfr/mofDivList/query'
            },
            placeholder: '上级区划',
            multiple: false,
            readonly: false,
            isleaf: false
          },
          queryparams: {
            fiscalYear: store.state.userInfo.year
          }
        }
      }
    },
    {
      field: 'minAmount',
      title: '最小金额',
      itemRender: {
        name: '$input',
        props: {
          type: 'number',
          placeholder: '最小金额'
        }
      }
    },
    {
      field: 'maxAmount',
      title: '最大金额',
      itemRender: {
        name: '$input',
        props: {
          type: 'number',
          placeholder: '最大金额'
        }
      }
    },
    {
      field: 'docNo',
      title: '指标文号',
      itemRender: {
        name: '$input',
        props: {
          placeholder: '指标文号'
        }
      }
    },
    {
      field: 'isDirCode',
      title: '直达资金标识',
      itemRender: {
        name: '$vxeSelect',
        options: directFundOptions,
        props: {
          placeholder: '直达资金标识',
          valueKey: 'code',
          optionProps: {
            label: 'name',
            value: 'code'
          }
        }
      }
    },
    {
      field: 'minReleaseTime',
      title: '下达起始',
      itemRender: {
        name: '$input',
        props: {
          type: 'datetime',
          placeholder: '下达起始'
        }
      }
    },
    {
      field: 'maxReleaseTime',
      title: '下达截至',
      itemRender: {
        name: '$input',
        props: {
          type: 'datetime',
          placeholder: '下达截至'
        }
      }
    },
    {
      field: 'minReceiveTime',
      title: '登记起始',
      itemRender: {
        name: '$input',
        props: {
          type: 'datetime',
          placeholder: '登记起始'
        }
      },
      isHaveRegistered: true
    },
    {
      field: 'maxReceiveTime',
      title: '登记截至',
      itemRender: {
        name: '$input',
        props: {
          type: 'datetime',
          placeholder: '登记截至'
        }
      },
      isHaveRegistered: true
    }
  ]
  return formSchemas
}
