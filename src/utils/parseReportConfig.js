// 前端解析报表数据
// 将后端传回来的{dicInfo:..., dicCols:..., tableAttrs:...}
// 转换成{ type:..., ..., tableCols:..., editTableCols:..., ... } 格式
export default function(data) {
  const newReport = {
    // tableName: '',
    // viewName: '',
    // globalConfig: {},
    type: '',
    dicId: '',
    dicName: '',
    dicCode: '',
    tableCols: [],
    editTableCols: [],
    formItems: [],
    validateRules: {},
    extendAttrs: {},
    formData: {}
  }
  // newReport.tableName = null
  // newReport.viewName = null
  // newReport.globalConfig = null
  newReport.type = data.dicInfo.dicType
  newReport.dicId = data.dicInfo.guid
  newReport.dicName = data.dicInfo.dicName
  newReport.dicCode = data.dicInfo.dicCode
  // 解析报表列配置
  if (data.dicCols && data.dicCols.constructor === Array) {
    data.dicCols.forEach(item => {
      // 解析下拉树和下拉选择选项数据（0=选项一#1=选项二），空、开头和末尾为'='都不解析
      let options = item.options
      if (options && options.indexOf('=') > 0 && options.slice(-1) !== '=') {
        options = options.split('#')
        options.forEach((option, index) => {
          option = option.split('=')
          options[index] = { label: option[0], value: option[1] }
        })
      }
      // 解析表格单独行的高级属性
      const extendProps = {}
      if (item.attrs && item.attrs.constructor === Array) {
        item.attrs.forEach(attr => {
          extendProps[attr.attrKey] = attr.attrValue
        })
      }
      // 拼接组装tableCols 表格列配置数据
      newReport.tableCols.push({
        align: item.align,
        field: item.field,
        title: item.title,
        required: !!item.required,
        sortable: !!item.sortable,
        visible: !!item.visible,
        width: item.width,
        formula: item.formula,
        extendProps: extendProps,
        cellRender: {
          defaultValue: item.defaultValue,
          name: item.type,
          options: options,
          props: {
            clearable: false,
            placeholder: item.placeholder,
            disabled: !!item.disabled,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: false,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              placeholder: item.placeholder,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: ['code', 'name', 'id']
            },
            queryparams: {
              queryConditions: '',
              eleCode: item.options
            }
          }
        }
      })
      // 拼接组装editTableCols 可编辑列配置数据
      newReport.editTableCols.push({
        align: item.align,
        field: item.field,
        title: item.title,
        required: !!item.required,
        sortable: !!item.sortable,
        visible: !!item.visible,
        width: item.width,
        formula: item.formula,
        extendProps: extendProps,
        editRender: {
          defaultValue: item.defaultValue,
          name: item.type,
          options: options,
          props: {
            clearable: false,
            placeholder: item.placeholder,
            disabled: !!item.disabled,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: false,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              placeholder: item.placeholder,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: ['code', 'name', 'id']
            },
            queryparams: {
              queryConditions: '',
              eleCode: item.options
            }
          }
        }
      })
      // 拼接组装formItems 表单项配置数据
      newReport.formItems.push({
        align: item.align,
        field: item.field,
        title: item.title,
        required: !!item.required,
        sortable: !!item.sortable,
        visible: !!item.visible,
        width: item.width,
        span: item.width,
        formula: item.formula,
        extendProps: extendProps,
        itemRender: {
          defaultValue: item.defaultValue,
          name: item.type,
          options: options,
          props: {
            clearable: false,
            placeholder: item.placeholder,
            disabled: !!item.disabled,
            config: {
              axiosConfig: {
                method: 'post',
                statusField: 'code',
                successCode: '100000',
                url: 'bisConfig/config/common/queryTreeAssistData'
              },
              disabled: false,
              format: '{code}-{name}',
              isHump: true,
              isLazeLoad: false,
              isleaf: 1,
              levelno: -1,
              multiple: false,
              placeholder: item.placeholder,
              treeProps: {
                children: 'children',
                label: 'name',
                labelFormat: '{code}-{name}',
                nodeKey: 'id'
              },
              valueKeys: ['code', 'name', 'id']
            },
            queryparams: {
              queryConditions: '',
              eleCode: item.options
            }
          }
        }
      })
      // 拼接组装validateRules 校验配置数据
      newReport.validateRules[item.field] = [
        {
          require: !!item.required,
          trigger: 'change',
          message: item.placeholder
        },
        {
          max: item.clengh, // 我能看出这是length的意思，但后端传回来字段就是这样，不关前端的事，不要cue前端
          trigger: 'change',
          message: `${item.title}最大长度：${item.clengh}`
        }
      ]
      // 拼接组装formData 表单默认数据
      newReport.formData[item.field] = item.defaultValue
    })
  }
  // 解析并拼接报表的高级属性
  if (data.tableAttrs && data.tableAttrs.constructor === Array) {
    data.tableAttrs.forEach(item => {
      newReport.extendAttrs[item.attrKey] = item.attrValue
    })
  }

  return newReport
}
