// 工作流配置   Author: Titans@2396757591@qq.com-->

export default {
  toolbar: [
    {
      label: '撤销',
      command: 'undo',
      ico: 'iconfont icon-undo',
      n118n: 'tooltip.undo'
    },
    {
      label: '恢复',
      command: 'redo',
      ico: 'iconfont icon-redo',
      n118n: 'tooltip.redo'
    },
    {
      separator: true
    },
    {
      label: '缩小',
      command: 'zoomIn',
      ico: 'iconfont icon-zoom-in-o',
      n118n: 'tooltip.zoomIn'
    },
    {
      label: '放大',
      command: 'zoomOut',
      ico: 'iconfont icon-zoom-out-o',
      n118n: 'tooltip.zoomOut'
    },
    {
      label: '重置大小',
      command: 'resetZoom',
      ico: 'iconfont icon-actual-size-o',
      n118n: 'tooltip.resetZoom'
    },
    {
      label: '适应屏幕',
      command: 'autoFit',
      ico: 'iconfont  icon-fit',
      n118n: 'tooltip.autoFit'
    },
    {
      separator: true
    },
    {
      label: '移到上一层',
      command: 'toFront',
      ico: 'iconfont icon-to-front',
      n118n: 'tooltip.toFront'
    },
    {
      label: '移到下一层',
      command: 'toBack',
      ico: 'iconfont icon-to-back',
      n118n: 'tooltip.toBack'
    },
    {
      separator: true
    },
    {
      label: '复制',
      command: 'copy',
      ico: 'iconfont icon-copy-o',
      n118n: 'tooltip.copy'
    },
    {
      label: '粘贴',
      command: 'paste',
      ico: 'iconfont icon-paster-o',
      n118n: 'tooltip.paste'
    },
    {
      label: '删除',
      command: 'delete',
      ico: 'iconfont icon-delete-o',
      n118n: 'tooltip.delete'
    }

  ],
  nodes: [
    {
      label: '开始节点',
      code: 'start',
      open: false,
      children: [
        {
          clazz: 'start',
          code: 'start-node',
          label: '开始节点',
          isize: '50*50',
          i18n: 'startEvent',
          ico: require('../assets/flow/start.svg')
        },
        {
          clazz: 'timerStart',
          code: 'timer-start-node',
          label: '定时节点',
          isize: '50*50',
          i18n: 'timerEvent',
          ico: require('../assets/flow/timer-start.svg')
        },
        {
          clazz: 'messageStart',
          code: 'message-start-node',
          label: '消息节点',
          isize: '50*50',
          i18n: 'messageEvent',
          ico: require('../assets/flow/message-start.svg')
        },
        {
          clazz: 'signalStart',
          code: 'signal-start-node',
          label: '信号节点',
          isize: '50*50',
          i18n: 'signalEvent',
          ico: require('../assets/flow/signal-start.svg')
        }
      ]
    },
    {
      label: '活动节点',
      code: 'task',
      open: false,
      children: [
        {
          clazz: 'userTask',
          isize: '80*50',
          code: 'user-task-node',
          label: '审批节点',
          i18n: 'userTask',
          ico: require('../assets/flow/user-task.svg')
        },
        {

          clazz: 'scriptTask',
          isize: '80*50',
          code: 'script-task-node',
          label: '脚本节点',
          i18n: 'scriptTask',
          ico: require('../assets/flow/script-task.svg')
        },
        {
          clazz: 'javaTask',
          isize: '80*50',
          code: 'user-task-node',
          label: '审批节点',
          i18n: 'javaTask',
          ico: require('../assets/flow/java-task.svg')
        },
        {
          clazz: 'mailTask',
          isize: '80*50',
          code: 'mail-task-node',
          label: '邮件节点',
          i18n: 'mailTask',
          ico: require('../assets/flow/mail-task.svg')
        },
        {
          clazz: 'receiveTask',
          isize: '80*50',
          code: 'receive-task-node',
          label: '接收节点',
          i18n: 'receiveTask',
          ico: require('../assets/flow/receive-task.svg')
        }
      ]
    },
    {
      label: '网关节点',
      code: 'gateway',
      open: false,
      children: [
        {
          clazz: 'exclusiveGateway',
          isize: '50*50',
          code: 'exclusive-gateway-node',
          label: '排他网关',
          i18n: 'exclusiveGateway',
          ico: require('../assets/flow/exclusive-gateway.svg')
        },
        {
          clazz: 'parallelGateway',
          isize: '50*50',
          code: 'parallel-gateway-node',
          label: '并行网关',
          i18n: 'parallelGateway',
          ico: require('../assets/flow/parallel-gateway.svg')
        },
        {
          clazz: 'inclusiveGateway',
          isize: '50*50',
          code: 'parallelGateway',
          label: '包容网关',
          i18n: 'inclusiveGateway',
          ico: require('../assets/flow/inclusive-gateway.svg')
        }
      ]
    },
    {
      label: '捕获节点',
      code: 'catch',
      open: false,
      children: [
        {
          clazz: 'timerCatch',
          isize: '80*50',
          code: 'inclusive-gateway-node',
          label: '定时节点',
          i18n: 'timerEvent',
          ico: require('../assets/flow/timer-catch.svg')
        },
        {
          clazz: 'messageCatch',
          isize: '80*50',
          code: 'message-catch-node',
          label: '消息节点',
          i18n: 'messageEvent',
          ico: require('../assets/flow/message-catch.svg')
        },
        {
          clazz: 'signalCatch',
          isize: '80*50',
          code: 'signal-catch-node',
          label: '信号节点',
          i18n: 'signalEvent',
          ico: require('../assets/flow/signal-catch.svg')
        }
      ]
    },
    {
      label: '结束节点',
      code: 'end',
      open: false,
      children: [
        {
          clazz: 'end',
          isize: '50*50',
          code: 'end-node',
          label: '结束节点',
          i18n: 'endEvent',
          ico: require('../assets/flow/end.svg')
        }
      ]
    }
  ],
  nodesConfigMap: {
    wfdConfig: {
      itemConfig: [
        {
          title: '流程名',
          field: 'name',
          span: 24,
          align: 'left',
          filters: false,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'string',
              placeholder: '请输入流程名'
            }
          }
        },
        {
          title: '流程标识',
          field: 'id',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'string',
              placeholder: '流程标识'
            }
          }
        },
        {
          title: '流程描述',
          field: 'describtion',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            defaultValue: '',
            props: {
              type: 'text',
              autoisize: {
                minRows: 5,
                maxRows: 10
              },
              placeholder: '请输入流程描述'
            }
          }
        }
      ],
      data: {
        label: '', // 标题
        id: '', // 流程标识
        name: '', // 流程名,
        describtion: ''// 流程描述
      }
    },
    nodeConfig: {
      itemConfig: [
        {
          title: '节点标题',
          field: 'label',
          span: 24,
          align: 'left',
          filters: false,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              type: 'string',
              placeholder: '节点标题'
            }
          }
        },
        {
          title: '节点标识',
          field: 'id',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'string',
              disabled: true,
              placeholder: '节点标识'
            }
          }
        },
        {
          title: '节点是否激活',
          field: 'active',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeSwitch',
            options: [
              { value: true, label: '是' },
              { value: false, label: '否' }
            ],
            props: {
              type: 'string',
              disabled: true,
              placeholder: '节点是否激活'
            }
          }
        },
        {
          title: '是否隐藏图标',
          field: 'hideIcon',
          span: 24,
          itemRender: {
            name: '$vxeRadio',
            defaultValue: '1',
            options: [
              { value: true, label: '是' },
              { value: false, label: '否' }
            ],
            props: {
            }
          }
        },
        {
          title: '角色',
          field: 'role',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeTree',
            props: {
              queryparams: {

              },
              format: '{code}-{name}',
              config: {
                multiple: false,
                readonly: false,
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}', // {code}-{name}
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  successCode: '200', // 成功code
                  statusField: 'rscode',
                  method: 'postStringify', // 请求方式
                  url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              }
            }
          }
        },
        {
          title: '菜单名',
          field: 'menu',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeTree',
            props: {
              queryparams: {

              },
              format: '{code}-{name}',
              config: {
                multiple: false,
                readonly: false,
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}', // {code}-{name}
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  successCode: '200', // 成功code
                  statusField: 'rscode',
                  method: 'postStringify', // 请求方式
                  url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              }
            }
          }
        },
        {
          title: '节点描述',
          field: 'describtion',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            defaultValue: '',
            props: {
              type: 'text',
              autoisize: {
                minRows: 5,
                maxRows: 10
              },
              placeholder: '请输入节点描述'
            }
          }
        },
        {
          title: '脚本表达式',
          field: 'conditionExpression',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            defaultValue: '',
            props: {
              type: 'text',
              autoisize: {
                minRows: 5,
                maxRows: 10
              },
              placeholder: '请输入脚本表达式'
            }
          }
        }
      ],
      data: {
        label: '', // 节点标题
        id: '', // 标识
        active: false, // 节点是否激活
        role: '', // 角色
        menu: '', // 菜单
        iconVisible: '1', // 隐藏图标
        hideIcon: false,
        describtion: '',
        isSequential: '' // 是否会签
      }
    },
    edgeConfig: {
      itemConfig: [
        {
          title: '流程标题',
          field: 'label',
          span: 24,
          align: 'left',
          filters: false,
          itemRender: {
            name: '$vxeInput',
            defaultValue: '',
            props: {
              type: 'string',
              placeholder: '流程标题'
            }
          }
        },
        {
          title: '流程标识',
          field: 'id',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeInput',
            props: {
              type: 'string',
              disabled: true,
              placeholder: '流程标识'
            }
          }
        },
        {
          title: '角色',
          field: 'role',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeTree',
            props: {
              queryparams: {

              },
              format: '{code}-{name}',
              config: {
                multiple: false,
                readonly: false,
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}', // {code}-{name}
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  successCode: '200', // 成功code
                  statusField: 'rscode',
                  method: 'postStringify', // 请求方式
                  url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              }
            }
          }
        },
        {
          title: '菜单名',
          field: 'menu',
          span: 24,
          align: 'left',
          itemRender: {
            name: '$vxeTree',
            props: {
              queryparams: {

              },
              format: '{code}-{name}',
              config: {
                multiple: false,
                readonly: false,
                treeProps: {
                  // 树配置选项
                  labelFormat: '{code}-{name}', // {code}-{name}
                  nodeKey: 'id', // 树的主键
                  label: 'name', // 树的显示lalel字段
                  children: 'children' // 树的嵌套字段
                },
                axiosConfig: {
                  successCode: '200', // 成功code
                  statusField: 'rscode',
                  method: 'postStringify', // 请求方式
                  url: '' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
                }
              }
            }
          }
        },
        {
          title: '流程描述',
          field: 'describtion',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            defaultValue: '',
            props: {
              type: 'text',
              autoisize: {
                minRows: 5,
                maxRows: 10
              },
              placeholder: '请输入流程描述'
            }
          }
        },
        {
          title: '脚本表达式',
          field: 'conditionExpression',
          align: 'left',
          span: 24,
          tooltip: true,
          itemRender: {
            name: '$vxeEditDownTextarea',
            defaultValue: '',
            props: {
              type: 'text',
              autoisize: {
                minRows: 5,
                maxRows: 10
              },
              placeholder: '请输入脚本表达式'
            }
          }
        }
      ],
      data: {
        label: '', // 标题
        id: '', // 标识
        role: '', // 角色
        menu: '', // 菜单
        describtion: '', // 流程描述
        conditionExpression: '' // 脚本表达式
      }
    }
  }
}
