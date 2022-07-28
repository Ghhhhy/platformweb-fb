// 专项转移支付调剂-主表
export default {
  '9165201': {
    tableCols: [
      {
        title: '项目名称',
        field: 'proName',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '政府支出经济分类',
        field: 'govBgtEco',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '申请单号',
        field: 'adjBatchNo',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '指标文号',
        field: 'docNo',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '指标调整文号',
        field: 'adjDocNo',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        title: '资金管理处室',
        field: 'bgtMofDep',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '专项资金目录',
        field: 'speType',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '下级财政区划',
        field: 'subMofDiv',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '资金来源',
        field: 'foundType',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '下级转移性收入科',
        field: 'incomeSort',
        width: 200,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '转移支付功能分类',
        field: 'tpFunc',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '是否直达资金',
        field: 'isDirectFinanc',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { label: '否', value: '0' },
            { label: '是', value: '1' }
          ]
        }
      },
      {
        title: '直达资金标识',
        field: 'isDir',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              isHump: true
            }
          }
        }
      },
      {
        title: '预算金额',
        field: 'applyUp',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float',
            min: 0
          }
        }
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
