/* eslint-disable */
//table配置
export const mockTableSetting={
  "id": "0BA63D4F28FD447A8C9299E395F3D830",//自动生成得
  "menuguid": "23058AE8D57145AABF0982AE0A4B4A1E",//自动生成得
  "updatetime": "2023-07-11 14:42:25",//自动生成得
  "type": "table",//1.必传  用于区分配置类别 <列表配置>table <搜索栏配置>queryForm <页签配置>tabPanel <弹窗表单配置>form
  "configure": {//核心配置项
    "itemsConfig": [//大部分参考BSUI得talbeColumns配置 field 必须唯一
      {
        "title": "区划",
        "width": "180",
        "field": "mofDivName",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "cellRender": {
          "name": "$vxeInput",
          "options": [],
          "defaultValue": "",
          "props": {
            "format": "{mofDivCode}-{mofDivName}"
          }
        },
        "name": "$vxeInput",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "预算单位",
        "width": "180",
        "field": "agencyName",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "cellRender": {
          "name": "$vxeInput",
          "options": [],
          "defaultValue": "",
          "props": {
            "format": "{agencyCode}-{agencyName}"
          }
        },
        "name": "$vxeInput",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "业务数据单号",
        "width": "180",
        "field": "dealNo",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "主题",
        "width": "180",
        "field": "regulationClassName",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "违规时间",
        "width": "180",
        "field": "warnTime",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "监控类型",
        "field": "triggerClass",
        "align": "center",
        "width": "180",
        "cellRender": {
          "name": "$vxeSelect",
          "options": [
            {
              "value": "1",
              "label": "事中触发"
            },
            {
              "value": "2",
              "label": "定时触发"
            }
          ],
          "defaultValue": "",
          "props": {}
        },
        "name": "$vxeSelect",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "sortable": "",
        "filters": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "监控规则",
        "width": "180",
        "field": "fiRuleName",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "预警级别",
        "field": "warnLevel",
        "fixed": "",
        "width": "100",
        "align": "center",
        "cellRender": {
          "name": "$customerWarnLevel",//当前页面自定义得预警级别渲染器
          "options": [],
          "defaultValue": "",
          "props": {}
        },
        "name": "$customerWarnLevel",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "sortable": "",
        "filters": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "处理方式",
        "field": "handleType",
        "align": "center",
        "width": "180",
        "cellRender": {
          "name": "$vxeSelect",
          "options": [
            {
              "value": "1",
              "label": "拦截"
            },
            {
              "value": "2",
              "label": "预警，需上传附件"
            },
            {
              "value": "3",
              "label": "预警，无需上传附件"
            },
            {
              "value": "4",
              "label": "提醒"
            },
            {
              "value": "5",
              "label": "记录"
            }
          ],
          "defaultValue": "",
          "props": {}
        },
        "name": "$vxeSelect",
        "fixed": "",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "sortable": "",
        "filters": "",
        "associatedQuery": "",
        "className": ""
      },
      {
        "title": "操作",
        "field": "opration",
        "sortable": "false",
        "filters": "false",
        "align": "center",
        "fixed": "right",
        "width": "230",
        "cellRender": {
          "name": "$customerRender",//当前页面自定义的列表操作按钮
          "options": [],
          "defaultValue": "",
          "props": {}
        },
        "name": "$customerRender",
        "formula": "",
        "constraint": "",
        "combinedType": "",
        "associatedQuery": "",
        "className": ""
      }
    ],
    "globalConfig": {},//暂时没作用
    "pageConfig": {},//暂时没作用
    "editConfig": {},//暂时没作用
    "editRules": {},//暂时没作用
    "footerConfig": {},//暂时没作用
    "dataConfig": {
      "dataSouceType": "query",//暂时没作用
      "menuname": "部门核实"//菜单名字 type为table的时必填  用于工作流日志回显等
    }
  },
  "tablename": "表格配置",//动态表单配里面 当前配置项的中文名字
  "menuname": "部门核实",//自动生成的 不用管
  "mof_div_code": "150000000",//自动生成的 不用管
  "fiscalyear": "2023",//自动生成的 不用管
  "userguid": null//自动生成的 不用管
}
//搜索条件配置
export const mockQueryFormSetting={
  "id": "23275C68409E436F85300EF5BE488880",
  "menuguid": "23058AE8D57145AABF0982AE0A4B4A1E",
  "updatetime": "2023-07-18 11:01:32",
  "type": "queryForm",
  "configure": {
    "globalConfig": {},
    "itemsConfig": [
      {
        "title": "财政区划",
        "field": "mofDivCodes",//建议为 mofDivCodes 或者mofDivCodeList 否则需要改代码
        "width": "8",
        "align": "left",
        "name": "$vxeTree",
        "itemRender": {
          "name": "$vxeTree",
          "options": [],
          "props": {
            "config": {
              "valueKeys": [
                "code",
                "name",
                "id",
                "codeFragment"
              ],
              "format": "{name}",
              "treeProps": {
                "labelFormat": "{code}-{name}",
                "nodeKey": "id",
                "label": "label",
                "children": "children"
              },
              "treeData": [],
              "placeholder": "财政区划",
              "multiple": true,
              "readonly": false,
              "isleaf": true
            }
          }
        }
      }
    ],
    "pageConfig": {},
    "editConfig": {},
    "editRules": {},
    "footerConfig": {},
    "dataConfig": {
      "dataSouceType": "query"
    },
    "subTabConfig": [],
    "defaultConfig": []
  },
  "tablename": "查询条件配置",
  "menuname": "部门核实",
  "mof_div_code": "150000000",
  "fiscalyear": "2023",
  "userguid": null
}
//页签配置
export const mockTabPlanelSetting={
  "id": "EE1E28CF552941B7854F9CE31A24D01C",
  "menuguid": "23058AE8D57145AABF0982AE0A4B4A1E",
  "updatetime": "2023-08-01 22:26:12",
  "type": "tabPanel",
  "configure": {
    "globalConfig": {},
    "itemsConfig": [//参考BSUI  code需要根据后端所需code配置
      {
        "buttons": [
          {
            "type": "button",
            "label": "待核实",
            "code": "1-4",//根据后端所需的code 自己来配置
            "curValue": "1",
            "iconUrl": "",
            "iconName": "base-all.png",
            "iconNameActive": "base-all-active.png"
          },
          {
            "type": "button",
            "label": "已核实",
            "code": "2",
            "iconName": "base-all.png",
            "iconNameActive": "base-all-active.png"
          },
          {
            "type": "button",
            "label": "曾经办",
            "code": "0",
            "iconName": "base-all.png",
            "iconNameActive": "base-all-active.png"
          }
        ],
        "curButton": {
          "code": "1-4"
        },
        "buttonsInfo": {
          "2": [
            {
              "label": "撤销",
              "code": "dcl-cx",//撤销产品为dlc-cs 如果需要其他的改动 需要修改前端代码
              "status": "primary"
            }
          ],
          "1-4": [
            {
              "label": "核实",
              "code": "dcl-hsfk",//核实为dcl-hsfk 如果需要其他的改动 需要修改前端代码
              "status": "primary"
            }
          ]
        }
      }
    ],
    "pageConfig": {},
    "editConfig": {},
    "editRules": {},
    "footerConfig": {},
    "dataConfig": {
      "dataSouceType": "query"
    },
    "subTabConfig": [],
    "defaultConfig": []
  },
  "tablename": "页签配置",
  "menuname": "部门核实",
  "mof_div_code": "150000000",
  "fiscalyear": "2023",
  "userguid": null
}
export const mockFormModalSetting={
  "id": "8DB94E385AFC40938E25B5B4E2AB514F",
  "menuguid": "23058AE8D57145AABF0982AE0A4B4A1E",
  "updatetime": "2023-08-12 23:12:08",
  "type": "form",
  "configure": {
    "globalConfig": {},
    "itemsConfig": [//该list每一个item代表每一个form实例
      {
        "titleName": "疑似违规信息",//表格右上角的title
        "formItemList": [//表单核心配置 大部分配置 参考BSUI
          {
            "field": "fiRuleName",
            "title": "监控规则",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "placeholder": "监控规则",
                "disabled": true
              }
            }
          },
          {
            "title": "区划",
            "field": "mofDivName",
            "span": 8,
            "titleWidth": "180",
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "disabled": true,
                "placeholder": "区划"
              }
            }
          },
          {
            "title": "下发日期",
            "field": "issueTime",
            "span": 8,
            "titleWidth": "180",
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "disabled": true,
                "placeholder": "生成日期"
              }
            }
          },
          {
            "title": "疑点情况描述",
            "field": "doubtViolateExplain",
            "span": 24,
            "titleWidth": "180",
            "itemRender": {
              "name": "$textarea",
              "props": {
                "disabled": true,
                "resize": "vertical",
                "placeholder": "请输入疑点情况描述"
              }
            }
          }
        ]
      },
      {
        "titleName": "单位提交材料说明",
        "formItemList": [
          {
            "field": "commentDept",
            "title": "整改处理方式",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeSelect",
              "props": {
                "disabled": true
              },
              "options": [
                {
                  "value": "1",
                  "label": "通过"
                },
                {
                  "value": "2",
                  "label": "退回"
                },
                {
                  "value": "3",
                  "label": "违规"
                },
                {
                  "value": "4",
                  "label": "认定正常"
                }
              ]
            }
          },
          {
            "field": "handler1",
            "title": "核实人员",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "placeholder": "核实人员",
                "disabled": true
              }
            }
          },
          {
            "field": "phone1",
            "title": "联系电话",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "placeholder": "联系电话",
                "disabled": true
              }
            }
          },
          {
            "title": "反馈日期",
            "field": "updateTime1",
            "span": 8,
            "titleWidth": "180",
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "disabled": true,
                "placeholder": "生成日期"
              }
            }
          },
          {
            "title": "核实情况描述",
            "field": "information1",
            "span": 24,
            "titleWidth": "180",
            "itemRender": {
              "name": "$textarea",
              "props": {
                "disabled": true,
                "resize": "vertical",
                "rows": 4,
                "placeholder": "请输入核实情况描述"
              }
            }
          },
          {
            "title": "附件",
            "field": "attachmentid1",
            "visible": true,
            "span": 24,
            "titleWidth": "180",
            "itemRender": {
              "name": "$customerFileRender",//该组件自定义的渲染器  用于渲染上一个节点所传的附件
              "props": {
                "disabled": false
              }
            }
          }
        ]
      },
      {
        "titleName": "部门核实",
        "needUpload": true,//标识该表单实例是否需要上传 不写的话 只能用作于回显
        "formRefKey": "needValidate",//表单实例绑定的ref 不写默认为createRef 如果有自定义验证 这个必填
        "formItemList": [
          {
            "field": "commentDept2",
            "title": "核实意见",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeSelect",
              "props": {
                "disabled": false
              },
              "options": [
                {
                  "value": "1",
                  "label": "通过"
                },
                {
                  "value": "2",
                  "label": "退回"
                },
                {
                  "value": "3",
                  "label": "违规"
                },
                {
                  "value": "4",
                  "label": "认定正常"
                }
              ]
            }
          },
          {
            "field": "handler2",
            "title": "核实人员",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "getUserName": true,//取当前用户名称
              "name": "$vxeInput",
              "props": {
                "placeholder": "核实人员",
                "disabled": true
              }
            }
          },
          {
            "field": "phone2",
            "title": "联系电话",
            "titleWidth": "180",
            "span": 8,
            "itemRender": {
              "name": "$vxeInput",
              "props": {
                "placeholder": "联系电话",
                "disabled": false
              }
            }
          },
          {
            "title": "反馈日期",
            "field": "updateTime2",
            "span": 8,
            "titleWidth": "180",
            "itemRender": {
              "getServerTime": true,//是否取服务器时间 服务器时间来自外层talbe预定义的
              "name": "$vxeInput",
              "props": {
                "disabled": true,
                "placeholder": "生成日期"
              }
            }
          },
          {
            "title": "核实情况描述",
            "field": "information2",
            "span": 24,
            "titleWidth": "180",
            "itemRender": {
              "name": "$textarea",
              "props": {
                "disabled": false,
                "resize": "vertical",
                "rows": 4,
                "placeholder": "请输入核实情况描述"
              }
            }
          }
        ]
      },
      {
        "type": "components",//上传组件
        "field": "attachmentid2"//上传组件的UUID key
      }
    ],
    "pageConfig": {},
    "editConfig": {
      "defaultValue": {//表单某项formItem的默认值
        "commentDept2": "1"
      }
    },
    "editRules": {
      "needValidate": {//key为需要验证的表单实例ref
        "commentDept2": [//参考validate.js 目前无法做校验联动
          {
            "type": "string",
            "message": "请选择单位提交说明",
            "required": true
          }
        ]
      }
    },
    "footerConfig": {},
    "dataConfig": {
      "dataSouceType": "query"
    },
    "subTabConfig": [],
    "defaultConfig": []
  },
  "tablename": "弹窗form配置",
  "menuname": "部门核实",
  "mof_div_code": "150000000",
  "fiscalyear": "2023",
  "userguid": null
}
