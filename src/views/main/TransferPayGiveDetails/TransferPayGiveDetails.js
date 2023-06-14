/*
 * @Description:
 * @Author: chenxuanke
 * @Date: 2022-11-22 10:08:48
 * @LastEditors: chenxuanke
 * @LastEditTime: 2023-06-14 10:26:14
 */
export let proconf = {
  // 页签
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-zhibaio.png',
      iconNameActive: 'base-zhibaio-active.png',
      iconUrl: '',
      label: '全部 ',
      code: '1',
      curValue: '1'
    }
  ],
  // 页签右侧按钮切换
  statusRightToolBarButton: {
  },
  queryConfig: [
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      span: '4',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '请输入指标文号'
        }
      }
    },
    {
      title: '指标文标题',
      field: 'bgtDocTitle',
      span: '4',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '指标文标题'
        }
      }
    }, {
      title: '单位名称',
      field: 'agencyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '单位名称'
        }
      }
    },
    {
      title: '处室名称',
      field: 'manageMofDepName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '处室名称'
        }
      }
    },
    {
      title: '项目编码',
      field: 'proCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '项目编码'
        }
      }
    },
    {
      title: '是否已上传附件',
      field: 'HasAttach',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: 1, label: '已上传' },
          { value: 2, label: '未上传' }
        ],
        props: {
          placeholder: '是否已上传附件'
        }
      }
    }
  ],
  tableConfig: [
    {
      title: '财政区划代码',
      field: 'mofDivCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '财政区划名称',
      field: 'mofDivName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '预算单位编码',
      field: 'agencyCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '预算单位名称',
      field: 'agencyName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '主管部门名称',
      field: 'deptName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '主管部门编码',
      field: 'deptCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '业务主管处室名称',
      field: 'manageMofDepName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '指标名称',
      field: 'proName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '项目名称',
      field: 'proName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '资金性质',
      field: 'fundTypeName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '支出功能分类科目编码',
      field: 'expFuncCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '支出功能分类科目名称',
      field: 'expFuncName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '政府支出经济分类科目编码',
      field: 'govBgtEcoCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '政府支出经济分类科目名称',
      field: 'govBgtEcoName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '部门支出经济分类科目编码',
      field: 'depBgtEcoCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '部门支出经济分类科目名称',
      field: 'depBgtEcoName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    // {
    //   title: '附件id',
    //   field: 'attachId',
    //   sortable: false,
    //   width: 200,
    //   align: 'center'
    // },
    // {
    //   title: '附件名称',
    //   field: 'attachName',
    //   sortable: false,
    //   width: 200,
    //   align: 'center'
    // },
    {
      title: '指标下达金额',
      field: 'amount',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '接收财政区划代码',
      field: 'recDivCode',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '指标下达金额',
      field: 'amount',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '接收方财政区划名称',
      field: 'recDivName',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '指标文号',
      field: 'corBgtDocNo',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '指标文标题',
      field: 'bgtDocTitle',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '发文时间',
      field: 'docDate',
      sortable: false,
      width: 200,
      align: 'center'
    },
    {
      title: '是否有附件',
      field: 'attachName',
      className: 'attachName',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 200,
      cellRender: {
        name: '$attachName'
      }
    },
    {
      title: '操作',
      field: 'gloableOptionRow',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      width: 200,
      cellRender: {
        name: '$gloableOptionRow'
      }
    }
  ],
  // table 操作按钮
  attachName: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      let newIndex = this.tableData.findIndex((item, index) => {
        return item === row
      })
      let rowindex = newIndex
      return [
        <a onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachName', rowindex })}>{this.tableData[rowindex].hasAttach === '1' ? '是' : '否'}</a>
      ]
    }
  },
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      let newIndex = this.tableData.findIndex((item, index) => {
        return item === row
      })
      let rowindex = newIndex
      return [
        <el-tooltip content="上传" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment', rowindex })}>上传</a>,
        </el-tooltip>
      ]
    }
  }
}
