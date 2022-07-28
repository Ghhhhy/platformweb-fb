export default {
  '9161006': {
    tableCols: [
      {
        title: '本级指标文号',
        field: 'corBgtDocNo',
        align: 'left',
        minWidth: 180
      },
      {
        title: '主管业务处室',
        field: 'manageMofDep',
        align: 'left',
        minWidth: 180,
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
        title: '资金主管处室',
        field: 'bgtMofDep',
        align: 'left',
        minWidth: 180,
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
        align: 'left',
        minWidth: 180,
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
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        minWidth: 180,
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
        align: 'left',
        minWidth: 180,
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
        title: '政府经济分类',
        field: 'govBgtEco',
        align: 'left',
        minWidth: 180,
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
        title: '项目名称',
        field: 'proName',
        align: 'left',
        minWidth: 180
      },
      {
        title: '本次追减金额',
        field: 'minusAmt',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      }
    ],
    editTableCols: [
      {
        title: '本级指标文号',
        field: 'corBgtDocNo',
        align: 'left',
        minWidth: 180
      },
      {
        title: '主管业务处室',
        field: 'manageMofDep',
        align: 'left',
        minWidth: 180,
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
        title: '资金主管处室',
        field: 'bgtMofDep',
        align: 'left',
        minWidth: 180,
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
        align: 'left',
        minWidth: 180,
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
        title: '指标来源类型',
        field: 'bgtSource',
        align: 'left',
        minWidth: 180,
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
        align: 'left',
        minWidth: 180,
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
        title: '政府经济分类',
        field: 'govBgtEco',
        align: 'left',
        minWidth: 180,
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
        title: '项目名称',
        field: 'proName',
        align: 'left',
        minWidth: 180
      },
      {
        title: '本次追减金额',
        field: 'minusAmt',
        minWidth: 180,
        sortable: false,
        filters: false,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } },
        combinedType: ['average', 'subTotal', 'total', 'totalAll']
      }
    ],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
}
