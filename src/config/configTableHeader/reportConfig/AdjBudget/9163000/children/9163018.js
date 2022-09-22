// refineGovPurTable 细化政府采购
export default {
  '9163018': {
    tableCols: [
      {
        title: '政府采购品目',
        field: 'purClass',
        width: 180,
        align: 'left',
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            disabled: false,
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            elecode: 'PURITEM',
            queryparams: {
              eleCode: 'PURITEM',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '政府采购方式',
        field: 'purmet',
        width: 180,
        filters: false,
        align: 'left',
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            queryparams: {
              eleCode: 'PURMET',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '采购组织形式',
        field: 'purorgform',
        width: 180,
        align: 'left',
        filters: false,
        cellRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            queryparams: {
              eleCode: 'PURORGFORM',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      // {
      //   title: '规格型号',
      //   field: 'purorgform',
      //   width: 180,
      //   align: 'left',
      //   cellRender: { name: '$vxeInput' }
      // },
      {
        title: '计量单位',
        field: 'measmtUnit',
        width: 180,
        align: 'left',
        cellRender: {
          name: '$vxeSelect',
          options: [
            { value: '001', label: '辆' },
            { value: '002', label: '亩' },
            { value: '003', label: '台' },
            { value: '004', label: '件' },
            { value: '005', label: '个' },
            { value: '006', label: '平方米' },
            { value: '007', label: '公里' },
            { value: '008', label: '个/吨' },
            { value: '009', label: '本' },
            { value: '010', label: '根' },
            { value: '011', label: '副' },
            { value: '012', label: '架' },
            { value: '013', label: '顶' },
            { value: '014', label: '具' },
            { value: '015', label: '卷' },
            { value: '016', label: '孔/座' },
            { value: '017', label: '块/平方米' },
            { value: '018', label: '立方米' },
            { value: '019', label: '立方米/座' },
            { value: '020', label: '把' },
            { value: '021', label: '门' },
            { value: '022', label: '盘' },
            { value: '023', label: '吨/座' },
            { value: '024', label: '千伏安' },
            { value: '025', label: '扇' },
            { value: '026', label: '双' },
            { value: '027', label: '艘' },
            { value: '028', label: '艘/吨' },
            { value: '029', label: '部' },
            { value: '030', label: '台/蒸吨' },
            { value: '031', label: '套' },
            { value: '032', label: '条' },
            { value: '033', label: '条/公里' },
            { value: '034', label: '条/米' },
            { value: '035', label: '项' },
            { value: '036', label: '延长公里' },
            { value: '037', label: '眼' },
            { value: '038', label: '盏' },
            { value: '039', label: '张' },
            { value: '040', label: '支' },
            { value: '041', label: '只' },
            { value: '042', label: '株' },
            { value: '043', label: '组' },
            { value: '044', label: '座' },
            { value: '045', label: '座（幢）' },
            { value: '046', label: '座/立方米' },
            { value: '047', label: '座/米' },
            { value: '048', label: '座/平方米' },
            { value: '049', label: '座/延长米' },
            { value: '050', label: '端' },
            { value: '051', label: '层' },
            { value: '052', label: '间' },
            { value: '053', label: '批' },
            { value: '060', label: '元/人月' },
            { value: '061', label: '元/人年' },
            { value: '062', label: '元/人' },
            { value: '063', label: '元/辆年' },
            { value: '064', label: '元/平方米月' },
            { value: '065', label: '元/部' },
            { value: '066', label: '元/平方米年' }
          ]
        }
      },
      {
        title: '单价',
        field: 'price',
        width: 180,
        align: 'right',
        cellRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '采购数量',
        field: 'purQua',
        align: 'right',
        width: 180,
        cellRender: { name: '$vxeInput', props: { type: 'integer', min: 0 } }
      },
      {
        title: '采购金额',
        field: 'purAmt',
        width: 180,
        align: 'right',
        combinedType: ['average', 'total'],
        formula: '{pur_qua}*{price}',
        cellRender: { name: '$vxeCalculate' }
      }
    ],
    editTableCols: [
      {
        title: '政府采购品目',
        field: 'purClass',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            disabled: false,
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            elecode: 'PURITEM',
            queryparams: {
              eleCode: 'PURITEM'
            }
          }
        }
      },
      {
        title: '政府采购方式',
        field: 'purmet',
        width: 180,
        filters: false,
        align: 'left',
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            queryparams: {
              eleCode: 'PURMET',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      {
        title: '采购组织形式',
        field: 'purorgform',
        width: 180,
        align: 'left',
        filters: false,
        editRender: {
          name: '$vxeTree',
          props: {
            config: {
              multiple: false,
              isHump: true,
              treeProps: {
                // 树配置选项
                labelFormat: '{code}-{name}', // {code}-{name}
                nodeKey: 'id', // 树的主键
                label: 'name', // 树的显示lalel字段
                children: 'children' // 树的嵌套字段
              },
              axiosConfig: {
                successCode: '100000', // 成功code
                statusField: 'code',
                method: 'post', // 请求方式
                url: 'bisConfig/config/common/queryTreeAssistData' // 'queryTreeAssistData', // 是否调用接口直接获取数据，当此项有值时将会自动家数据
              },
              isleaf: true
            },
            queryparams: {
              eleCode: 'PURORGFORM',
              sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
            }
          }
        }
      },
      // {
      //   title: '规格型号',
      //   field: 'purorgform',
      //   width: 180,
      //   align: 'left',
      //   editRender: { name: '$vxeInput' }
      // },
      {
        title: '计量单位',
        field: 'measmtUnit',
        width: 180,
        align: 'left',
        editRender: {
          name: '$vxeSelect',
          options: [
            { value: '001', label: '辆' },
            { value: '002', label: '亩' },
            { value: '003', label: '台' },
            { value: '004', label: '件' },
            { value: '005', label: '个' },
            { value: '006', label: '平方米' },
            { value: '007', label: '公里' },
            { value: '008', label: '个/吨' },
            { value: '009', label: '本' },
            { value: '010', label: '根' },
            { value: '011', label: '副' },
            { value: '012', label: '架' },
            { value: '013', label: '顶' },
            { value: '014', label: '具' },
            { value: '015', label: '卷' },
            { value: '016', label: '孔/座' },
            { value: '017', label: '块/平方米' },
            { value: '018', label: '立方米' },
            { value: '019', label: '立方米/座' },
            { value: '020', label: '把' },
            { value: '021', label: '门' },
            { value: '022', label: '盘' },
            { value: '023', label: '吨/座' },
            { value: '024', label: '千伏安' },
            { value: '025', label: '扇' },
            { value: '026', label: '双' },
            { value: '027', label: '艘' },
            { value: '028', label: '艘/吨' },
            { value: '029', label: '部' },
            { value: '030', label: '台/蒸吨' },
            { value: '031', label: '套' },
            { value: '032', label: '条' },
            { value: '033', label: '条/公里' },
            { value: '034', label: '条/米' },
            { value: '035', label: '项' },
            { value: '036', label: '延长公里' },
            { value: '037', label: '眼' },
            { value: '038', label: '盏' },
            { value: '039', label: '张' },
            { value: '040', label: '支' },
            { value: '041', label: '只' },
            { value: '042', label: '株' },
            { value: '043', label: '组' },
            { value: '044', label: '座' },
            { value: '045', label: '座（幢）' },
            { value: '046', label: '座/立方米' },
            { value: '047', label: '座/米' },
            { value: '048', label: '座/平方米' },
            { value: '049', label: '座/延长米' },
            { value: '050', label: '端' },
            { value: '051', label: '层' },
            { value: '052', label: '间' },
            { value: '053', label: '批' },
            { value: '060', label: '元/人月' },
            { value: '061', label: '元/人年' },
            { value: '062', label: '元/人' },
            { value: '063', label: '元/辆年' },
            { value: '064', label: '元/平方米月' },
            { value: '065', label: '元/部' },
            { value: '066', label: '元/平方米年' }
          ]
        }
      },
      {
        title: '单价',
        field: 'price',
        width: 180,
        align: 'right',
        editRender: { name: '$vxeMoney', props: { min: 0 } }
      },
      {
        title: '采购数量',
        field: 'purQua',
        align: 'right',
        width: 180,
        editRender: { name: '$vxeInput', props: { type: 'integer', min: 0 } }
      },
      {
        title: '采购金额',
        field: 'purAmt',
        width: 180,
        align: 'right',
        combinedType: ['average', 'total'],
        formula: '{pur_qua}*{price}',
        cellRender: { name: '$vxeCalculate' }
      }
    ],
    formItems: [],
    validateRules: {
      purClass: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入政府采购品目' }],
      purmet: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入政府采购方式' }],
      purorgform: [{ required: true, type: 'treeinput', trigger: 'change', message: '请输入采购组织形式' }],
      // purorgform: [{ required: true, type: 'string', trigger: 'change', message: '请输入规格型号' }],
      measmtUnit: [{ required: true, type: 'select', trigger: 'change', message: '请输入计量单位' }],
      price: [
        {
          required: true,
          message: '请输入单价',
          trigger: 'change',
          validator(data) {
            return new Promise((resolve, reject) => {
              let value = data.cellValue
              if (value < 0.01) {
                reject(new Error('请输入单价'))
              } else {
                resolve(true)
              }
            })
          }
        }],
      purQua: [{ required: true, type: 'integer', trigger: 'change', message: '请输入采购数量' }]
    },
    extendAttrs: {},
    formData: {}
  }
}
