import { extend } from '@/utils'
const CONFIG = {
  tableConf: {
    defaultConfig: {}
  },
  formConf: {
    defaultConfig: {}
  },
  leftTreeConf: {
    defaultConfig: {
      letftTreeFilterText: '',
      leftTreeConfig: {
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
          labelFormat: '{code}-{name}',
          nodeKey: 'id', // 树的主键
          label: 'name', // 树的显示lalel字段
          children: 'children' // 树的嵌套字段
        },
        axiosConfig: {
          rootName: '全部',
          successCode: '100000', // 成功code
          statusField: 'code',
          method: 'get', // 请求方式
          url: 'bisConfig/config/basDicInfo/getDicInfoTree' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
        },
        multiple: false, // 是否多选,
        isLazeLoad: false, // 是否调用接口远程懒加载数据
        readonly: true,
        clearable: true
      },
      treeQueryparams: {
        isFolder: '0'
      },
      defaultExpandedKeys: ['root', 'dicType', 'dicType1', 'dicType2', 'dicType3', 'dicType4'],
      currentNodeKey: 'root',
      treeData: []
    }
  }
}

export default function (configType, configItem, detailItem) {
  if (configType && configItem) {
    if (!CONFIG[configType]) {
      return null
    }
    if (!CONFIG[configType][configItem]) {
      configItem = 'defaultConfig'
    }
    let result = extend(true, CONFIG[configType]['defaultConfig'])
    result = extend(true, result, CONFIG[configType][configItem])
    if (detailItem) {
      return result[detailItem]
    } else {
      return result
    }
  } else {
    return null
  }
}
