// import { extend } from '@/utils'
const CONFIG = {
  tableConf: {
    defaultConfig: {
      toolbarConfig: { // table工具栏配置
        batchModify: false,
        moneyConversion: true, // 是否有金额转换,
        import: false,
        calculator: false,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          checkType: 'checkbox', // hasCheckbox
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
            }
          }
        }
      },
      footerConfig: {
        showFooter: true,
        combinedType: ['subTotal', 'total', 'totalAll', 'switchTotal']
      },
      tableColumnsConfig: [
      ],
      tableData: [],
      editRules: {
      }
    }
  },
  formConf: {
    defaultConfig: {
    }
  },
  leftTreeConf: {
    defaultConfig: {
      leftTreeConfig: {
        showFilter: false, // 是否显示过滤
        isInitLoadData: false,
        scrollLoad: false, // 是否开启滚动加载
        isleaf: 1, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
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
          successCode: '200', // 成功code
          statusField: 'rscode',
          method: 'postStringify', // 请求方式
          url: 'fb-govbudget-service/queryTreeAssistData?160464552085' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: true, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeQueryparams: {
        tokenid: 'b75ee9e2f1583f15b5259979c098549f',
        appguid: 'zfys',
        parameters: { 'eleCode': 'AGENCY', 'batchno': 2, 'sxspecroleguid': '7F6D5DF72BAA4D1A9A2D73B836D5309C', 'appguid': 'zfys' }
      }
    }
  },
  commonConf: {
    defaultConfig: {
      statusButtons: [
        {
          type: 'button',
          label: '未提交',
          curValue: 'wtj',
          code: 'weitijiao',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png'
        },
        {
          type: 'button',
          label: '已提交',
          curValue: 'ytj',
          code: 'yitijiao',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png'
        },
        {
          type: 'button',
          label: '被退回',
          curValue: 'bth',
          code: 'beituihui',
          iconName: 'base-all.png',
          iconNameActive: 'base-all-active.png'
        }
      ],
      curStatusButton: {
        type: 'button',
        curValue: 'wtj',
        label: '未提交',
        code: 'weitijiao'
      },
      buttonsInfos: {
        'weitijiao': [
          {
            label: '新增还房贷首付可减少到了房间',
            code: 'add',
            status: 'primary'
          }
        ],
        'yitijiao': [
          {
            label: '新增',
            code: 'edit'
          }
        ],
        'beituihui': [
          {
            label: '删除',
            code: 'delete'
          }
        ]
      },
      treeConfig: {
      }
    }
  }
}

export default function (configType, detailItem, configItem = 'defaultConfig') {
  if (configType && configItem) {
    if (!CONFIG[configType]) {
      return null
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
