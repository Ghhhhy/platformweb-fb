// 25817_minus_sh
export default {
  '9161004': {
    tableCols: [],
    editTableCols: [
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        align: 'left',
        minWidth: 180,
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
        title: '预算单位',
        field: 'agency',
        align: 'left',
        minWidth: 180,
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
        title: '项目支出类别',
        field: 'payoutKind',
        align: 'left',
        minWidth: 180,
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
        title: '项目代码',
        field: 'proCode',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '项目名称',
        field: 'proName',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'left'
      },
      {
        title: '支出功能分类',
        field: 'expFunc',
        align: 'left',
        minWidth: 180,
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
        title: '部门预算经济分类',
        field: 'depBgtEco',
        align: 'left',
        minWidth: 180,
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
        title: '政府预算经济分类',
        field: 'govBgtEco',
        align: 'left',
        minWidth: 180,
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
        title: '资金来源',
        field: 'fundsource',
        align: 'left',
        minWidth: 180,
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
        title: '是否政府采购',
        field: 'isGov',
        align: 'left',
        minWidth: 150,
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        }
      },
      {
        title: '是否政府购买服务',
        field: 'isGovbuy',
        align: 'left',
        minWidth: 150,
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        }
      },
      {
        title: '是否新增资产配置',
        field: 'isAsset',
        align: 'left',
        minWidth: 150,
        cellRender: {
          name: '$vxeSelect',
          props: {
            disabled: true
          },
          options: [
            { value: 1, label: '是' },
            { value: 0, label: '否' }
          ]
        }
      },
      {
        title: '预算金额',
        field: 'applyAmt',
        minWidth: 150,
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            min: 0
          }
        }
      },
      {
        title: '本次追回金额',
        field: 'minusAmt',
        minWidth: 150,
        sortable: false,
        filters: false,
        editRender: {
          name: '$vxeMoney', props: { min: 0 }
        },
        align: 'right',
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
