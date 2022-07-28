/*
 * @Author: ChenHuanJie
 * @Date: 2021-12-14 16:05:18
 * @LastEditors: ChenHuanJie
 * @LastEditTime: 2021-12-14 16:13:51
 * @FilePath: \caizheng-front\src\config\configTableHeader\reportConfig\Reply\917100\children\917101.js
 * @Description: 预算批复-》年初数下达 -》未下达 -》 主表表头配置
 * @Signature: ↓↓↓↓↓↓
 * ************咏代码*****************
 * ** 日出东隅照我床，悠悠青龙倚斜阳。**
 * ** 陋室区区徒四壁，代码行行正铿锵。**
 * ****************************************
 * ** 世人皆说程序员好，人高端，工资高。    **
 * ** 狗屁，常加班，起不早，挣得不够去烧烤。**  (中指大法好)
 * ** Bug、Code知多少，只是屏幕显人老。    **
 * ****************************************
 * ** 年少太轻狂，误入IT行。  **
 * ** 白发森森立，两眼直茫茫。**
 * ***************************
 */
export default {
  '917101': {
    tableCols: [
      {
        title: '财政内部机构',
        field: 'manageMofDep',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'MANAGE_MOF_DEP'
            }
          }
        }
      },
      {
        title: '预算单位',
        field: 'agency',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'AGENCY'
            }
          }
        }
      },
      {
        title: '项目支出类别',
        field: 'payoutKind',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'payoutKind'
            }
          }
        }
      },
      {
        title: '项目编码',
        field: 'proCode',
        sortable: true,
        filters: true,
        width: 200,
        align: 'center'
      },
      {
        title: '项目名称',
        field: 'proName',
        sortable: true,
        filters: true,
        width: 200,
        align: 'center'
      },
      {
        title: '功能分类',
        field: 'expFunc',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'expFunc'
            }
          }
        }
      },
      {
        title: '部门经济分类',
        field: 'depBgtEco',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'depBgtEco'
            }
          }
        }
      },
      {
        title: '政府经济分类',
        field: 'govBgtEco',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'govBgtEco'
            }
          }
        }
      },
      {
        title: '是否政府采购',
        field: 'isGov',
        sortable: true,
        filters: true,
        width: 100,
        align: 'center',
        formatter: (value, column) => {
          switch (value.row.isGov) {
            case '0':
              return '否'
            case '1':
              return '是'
            default:
              return value.row.isGov
          }
        }
      },
      {
        title: '是否政府购买服务',
        field: 'isGovBuy',
        width: 100,
        align: 'center',
        formatter: (value, column) => {
          switch (value.row.isGovBuy) {
            case '0':
              return '否'
            case '1':
              return '是'
            default:
              return value.row.isGovBuy
          }
        }
      },
      {
        title: '资金性质',
        field: 'fundType',
        sortable: true,
        filters: true,
        align: 'left',
        minWidth: 180,
        editRender: {
          name: '$vxeTree',
          props: {
            clearable: false,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: true,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: [
                'code',
                'name',
                'id'
              ]
            },
            queryparams: {
              queryConditions: '',
              eleCode: 'fundType'
            }
          }
        }
      },
      {
        title: '预算金额',
        field: 'replyAmt',
        sortable: true,
        filters: true,
        width: 200,
        align: 'center',
        formula: '{applyAmt}-0',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        }
      },
      {
        title: '已下达金额',
        field: 'hasReplyAmt',
        sortable: true,
        filters: true,
        width: 200,
        align: 'center',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        }
      },
      {
        title: '可下达金额',
        field: 'activeAmt',
        sortable: true,
        filters: true,
        width: 200,
        align: 'center',
        formula: '{replyAmt}-{hasReplyAmt}',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
          }
        }
      },
      {
        title: '本次下达金额',
        field: 'intpurAmt',
        sortable: true,
        filters: true,
        width: 200,
        align: 'right',
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal'],
        cellRender: {
          name: '$vxeMoney',
          props: {
            type: 'float'
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
