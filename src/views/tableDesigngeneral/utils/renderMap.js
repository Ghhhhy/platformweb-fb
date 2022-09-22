//       dicId: '字典列名称',
//       field: '字典列名称',
//       columnName: '字典列数据库名称',
//       formulaShow: '公式展示用',
//       title: '字典列标题',
//       visible: '是否隐藏',
//       field: '字典列名称',
//       titleTip: '提示标题',
//       parentId: '父级ID',
//       remark: '备注',
//       orderNum: '顺序',
//       type: '列类型',
//       clengh: '列长度',
//       editable: '是否可编辑',
//       disabled: '是否可用',
//       align: '列对齐方式',
//       sortable: '是否可排序',
//       filter: '是否可以过滤',
//       fixed:'是否固定',

//       required: '是否必填',
//       options: '列数据源',
//       width: '宽度',
//       placeholder: '编辑提示',
//       defaultValue: '默认值',
//       formula: '列公式',
//       calcpri: '列公式',
//       isExportCol: '是否导出列',
//       attrs: '列属性'
import tool from './tool'
const itemRenderMap = {
  gloable(obj, type, editable) {
    return Object.assign(
      { // table和Form都有的
        renderMapId: obj.renderMapId,
        title: obj.title || '',
        field: tool.smallHump(obj.columnName || '') || obj.field,
        align: obj.align || 'left',
        configSource: obj,
        children: obj.children
      },
      type === 'table' ? { // table专有
        width: obj.width <= 100 ? (() => {
          let strByte = tool.getStrByte(obj.title)
          let width = parseInt(obj.width)
          if (parseInt(obj.width) < strByte * 14 + 30) {
            width = strByte * 14 + 30
          }
          return width
        })() : obj.width,
        filter: obj.filter || false,
        sortable: obj.sortable || false
      } : { // form专有
        span: obj.span || 8
      }
      // { // 渲染器哦配置
      //   [type === 'table' ? ((obj.editable||editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
      //     name: '$vxeSelect',
      //     defaultValue: obj.defaultValue || '',
      //     options: [],
      //     props: {

      //     }
      //   }
      // }
    )
  },
  $vxeTree(obj, type, editable) { // 下拉树
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeTree',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            queryparams: {
            },
            config: {
              format: '{code}-{name}',
              multiple: false,
              readonly: false,
              placeholder: obj.placeholder || '请录入' + obj.title,
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
                url: 'fb-govbudget-service/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              }
            }
          }
        }
      })
  },
  $vxeSelect(obj, type, editable) { // 下拉选择
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeSelect',
          options: ((opts) => {
            if (typeof (opts) === 'string') {
              return opts.split('+').map((opt, index) => {
                return { value: opt.split('#')[0], label: opt.split('#')[1] }
              })
            } else if (tool.getbasicDataType(opts) === 'Array') {
              return opts
            } else if (tool.getbasicDataType(opts) === 'Object') {
              return opts
            } else {
              try {
                return JSON.parse(opts)
              } catch (e) {
                return opts
              }
            }
          })(obj.options),
          props: {
            disabled: obj.disabled || false,
            placeholder: obj.placeholder || '请选择' + obj.title
          }
        }
      })
  },
  $vxeMoney(obj, type, editable) { // 金额
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeMoney',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            disabled: obj.disabled || false,
            placeholder: obj.placeholder || '请录入' + obj.title
          }
        }
      })
  },
  $vxeEditDownTextarea(obj, type, editable) { // 段落文本录入
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeEditDownTextarea',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            disabled: obj.disabled || false,
            placeholder: obj.placeholder || '请输入' + obj.title
          }
        }
      })
  },
  $vxeDays(obj, type, editable) { // 天数录入
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeDays',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            placeholder: obj.placeholder || '请录入' + obj.title
          }
        }
      })
  },
  $vxeTime(obj, type, editable) { // 时间录入
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeTime',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            placeholder: obj.placeholder || '请录入' + obj.title
          }
        }
      })
  },
  $vxeCheckbox(obj, type, editable) { // 复选框
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeCheckbox',
          defaultValue: obj.defaultValue || '',
          options: ((opts) => {
            if (typeof (opts) === 'string') {
              return opts.split('+').map((opt, index) => {
                return { value: opt.split('#')[0], label: opt.split('#')[1] }
              })
            } else if (tool.getbasicDataType(opts) === 'Array') {
              return opts
            } else if (tool.getbasicDataType(opts) === 'Object') {
              return opts
            } else {
              try {
                return JSON.parse(opts)
              } catch (e) {
                return opts
              }
            }
          })(obj.options),
          props: {

          }
        }
      })
  },
  $vxeRadio(obj, type, editable) { // 单选框
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeRadio',
          defaultValue: obj.defaultValue || '',
          options: ((opts) => {
            if (typeof (opts) === 'string') {
              return opts.split('+').map((opt, index) => {
                return { value: opt.split('#')[0], label: opt.split('#')[1] }
              })
            } else if (tool.getbasicDataType(opts) === 'Array') {
              return opts
            } else if (tool.getbasicDataType(opts) === 'Object') {
              return opts
            } else {
              try {
                return JSON.parse(opts)
              } catch (e) {
                return opts
              }
            }
          })(obj.options),
          props: {

          }
        }
      })
  },
  $vxeSwitch(obj, type, editable) { // 开关
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeSwitch',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {

          }
        }
      })
  },
  $vxeProgress(obj, type, editable) { // 开关
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeProgress',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {

          }
        }
      })
  },
  $vxeInput(obj, type, editable) { // 录入框
    return Object.assign(
      this.gloable(obj, type, editable),
      { // 渲染器哦配置
        [type === 'table' ? ((obj.editable || editable) ? 'editRender' : 'cellRender') : 'itemRender']: {
          name: '$vxeInput',
          defaultValue: obj.defaultValue || '',
          options: [],
          props: {
            placeholder: obj.placeholder || '请录入' + obj.title
          }
        }
      })
  }
}

export default {
  gloableRenderMap(item, type, editable) {
    return itemRenderMap.gloable(item, type, editable)
  },
  itemRendermap(item, type, editable) {
    if (itemRenderMap[item.type]) {
      return itemRenderMap[item.type](item, type, editable)
    } else {
      return itemRenderMap.$vxeInput(item, type, editable)
    }
  },
  listToTreeByNestCodeLength(data, nestCodeKey) { // 平行数据 根据nestCodeKey 长度 生成嵌套数据
    let map = {} // 构建map
    data.forEach(function (item) {
      map[item[nestCodeKey]] = item
      item.children = []
    })
    let treeData = []
    data.forEach(item => {
      let pnestCodeKey = item[nestCodeKey]
      pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
      let mapItem = map[item[pnestCodeKey]]
      while (!mapItem && pnestCodeKey !== '') {
        pnestCodeKey = pnestCodeKey.slice(0, pnestCodeKey.length - 1)
        mapItem = map[pnestCodeKey]
      }
      if (mapItem) {
        (mapItem.children || (mapItem.children = [])).push(item)
      } else {
        treeData.push(item)
      }
    })
    return treeData
  },
  getRenderTheadData(data, editable, type = 'table', level = 1) { // 生成渲染数据
    let self = this
    data.forEach((item, index) => {
      if (Array.isArray(item.children) && item.children.length) {
        data[index] = self.gloableRenderMap(item, type, editable)
        self.getRenderTheadData(data[index].children, editable, type, level + 1)
      } else {
        data[index] = self.itemRendermap(item, type, editable)
      }
    })
    return data
  }
}
