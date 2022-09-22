// 专项转移支付调剂-所有主界面表头
export default {
  '9165221': {
    tableCols: [
      {
        field: 'proName',
        title: '项目名称',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
        cellRender: {
          name: '$vxeInput'
        }
      },
      {
        field: 'govBgtEco',
        title: '政府支出经济分类',
        align: 'left',
        width: 200,
        sortable: false,
        filters: false,
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
        field: 'subMofDiv',
        title: '下级财政区划',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { type: 'float' } }
      },
      {
        title: '申请单号',
        field: 'adjBatchNo',
        width: 180,
        filters: false,
        align: 'center'
      },
      {
        field: 'proCat',
        title: '项目类别',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'bgtMofDep',
        title: '资金管理处室',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'speType',
        title: '专项资金目录',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'fundType',
        title: '资金性质',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'incomeSort',
        title: '下级转移性收入科目',
        align: 'left',
        width: 200,
        sortable: false,
        filters: false,
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
        field: 'expFunc',
        title: '支出功能分类',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'tpFunc',
        title: '转移支付功能分类',
        align: 'left',
        width: 200,
        sortable: false,
        filters: false,
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
        field: 'isDirectFinanc',
        title: '是否直达资金',
        align: 'left',
        width: 180,
        cellRender: {
          name: '$vxeSelect',
          options: [
            {
              value: '1',
              label: '是'
            },
            {
              value: '0',
              label: '否'
            }
          ]
        }
      },
      {
        field: 'isDir',
        title: '直达资金标识',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false,
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
        field: 'docNo',
        title: '指标文号',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false
      },
      {
        field: 'adjDocNo',
        title: '指标调整文号',
        align: 'left',
        width: 180,
        sortable: false,
        filters: false
      }
    ],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
