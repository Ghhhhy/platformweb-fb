// import store from '@/store/index'
/* eslint-disable */
import moment from 'moment'
import Vue from 'vue'
const h = new Vue().$createElement
const timeSeqProcess = parseFloat(((moment().month()+1)/12).toFixed(3))*100 //moment获取的月份序号(0-11)
const warningCell = (process,row) => {
  let  newPre=process
  if(typeof process==='string')  newPre=Number(process.replace("%",''))
  if (timeSeqProcess <= newPre) {
    return {
      label: '正常进度',
      color: '#008000'
    }
  } else if ((timeSeqProcess - newPre) >= 0 && (timeSeqProcess - newPre) <= 8) {
    return {
      label: '进度滞后',
      color: '#FFFF00'
    }
  } else if ((timeSeqProcess - newPre) > 8) {
    return {
      label: '严重滞后',
      color: '#FF0000'
    }
  }
  return {
    label:'-',
    color:'#000000'
  }
}
export let proconf = {
  // BsToolBar 状态栏
  toolBarStatusButtons: [
    {
      type: 'button',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      iconUrl: '',
      label: '全部',
      code: '1',
      curValue: '1'
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      // { code: 'add', label: '新增', status: 'primary' },
      // { code: 'change', label: '修改' },
      // { code: 'del', label: '删除' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'change', label: '修改' },
      { code: 'del', label: '删除' }
    ]
  },
  // highQueryConfig: [
  //   {
  //     title: '数据源名称',
  //     field: 'dataSourceName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '数据源名称'
  //       }
  //     }
  //   },
  //   {
  //     title: '业务模块',
  //     field: 'businessModuleName',
  //     width: '8',
  //     align: 'left',
  //     formula: '',
  //     name: '$vxeInput',
  //     itemRender: {
  //       name: '$vxeInput',
  //       options: [],
  //       props: {
  //         placeholder: '业务模块'
  //       }
  //     }
  //   }
  // ],
  highQueryData: {
    dataSourceName: '',
    businessModuleName: ''
  },
  PoliciesTableColumns: [
    // {
    //   title: '区划编码',
    //   field: 'mofDivCode',
    //   sortable: false,
    //   align: 'left'
    // },
    {
      title: '区划名称',
      treeNode: true,
      align: 'left',
      width: 260,
      field: 'mofDivName',
      filters: false
    },
    {
      title: '合计',
      width: '150',
      align: 'center',
      children: [
        {
          title: '预算数',
          field: 'total_yss',
          width: 200,
          align: 'right',
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          filters: false,
          cellRender: {
            name: '$vxeMoney'
          },
          formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
        },
        {
          title: '支出数',
          field: 'total_zcs',
          width: 200,
          align: 'right',
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          filters: false,
          cellRender: {
            name: '$vxeMoney'
          },
          formula: '{sbZxjeBjbms}+{sbZxjeBgz}+{sbZxjeByz}'
        },
        {
          title: '执行进度',
          field: 'total_zxjd',
          width: 200,
          align: 'right',
          filters: false,
          cellRender: {
            name: '$vxeRatio'
          },
          formula: '({total_yss}-0==0)?0:(Math.round({total_zcs}/{total_yss}*100*10)/10)'
        }
      ]
    },
    {
      title: '（一）保基本民生',
      width: '150',
      align: 'center',
      children: [
        {
          title: '预算数',
          field: 'sbZbjeBjbms',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '支出数',
          field: 'sbZxjeBjbms',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '执行进度',
          field: 'bms_zxjd',
          width: 200,
          align: 'right',
          filters: false,
          cellRender: {
            name: '$vxeRatio'
          },
          formula: '({sbZbjeBjbms}-0==0)?0:(Math.round({sbZxjeBjbms}/{sbZbjeBjbms}*100*10)/10)'
        },
        {
          title: '预警',
          field: 'bms_yj',
          width: 200,
          align: 'center',
          filters: false,
          cellRender: {
            name: '$vxeInput'
          },
          formatter({ row }) {
            return warningCell(row.bms_zxjd).label
          },
          slots: {
            default({ row }) {
              return [
                <div style={{backgroundColor:warningCell(row.bms_zxjd).color}}>{warningCell(row.bms_zxjd).label}</div>
              ]
            }
          },
          exportFormatter: true,
          customerExportStyle:({row})=>{
            return {
              fill:{
                bgColor: 'ffffffff',
                fgColor: `ff${warningCell(row.bms_zxjd).color.replace('#','')}`,
                patternType: 'solid'
              }
            }
          },
        }
      ]
    },
    {
      title: '（二）保工资',
      width: '150',
      align: 'center',
      children: [
        {
          title: '预算数',
          field: 'sbZbjeBgz',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '支出数',
          field: 'sbZxjeBgz',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '执行进度',
          field: 'bgz_zxjd',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeRatio'
          },
          formula: '({sbZbjeBgz}-0==0)?0:(Math.round({sbZxjeBgz}/{sbZbjeBgz}*100*10)/10)'
        },
        {
          title: '预警',
          field: 'bgz_yj',
          width: 200,
          align: 'center',
          filters: false,
          cellRender: {
            name: '$vxeInput'
          },
          formatter({ row }) {
            return warningCell(row.bgz_zxjd).label
          },
          slots: {
            default({ row }) {
              return [
                <div style={{backgroundColor:warningCell(row.bgz_zxjd).color}}>{warningCell(row.bgz_zxjd).label}</div>
              ]
            }
          },
          exportFormatter: true,
          customerExportStyle:({row})=>{
            return {
              fill:{
                bgColor: 'ffffffff',
                fgColor: `ff${warningCell(row.bgz_zxjd).color.replace('#','')}`,
                patternType: 'solid'
              }
            }
          }
        }
      ]
    },
    {
      title: '（三）保运转',
      width: '150',
      align: 'center',
      children: [
        {
          title: '预算数',
          field: 'sbZbjeByz',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '支出数',
          field: 'sbZxjeByz',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeMoney'
          }
        },
        {
          title: '执行进度',
          field: 'byz_zxjd',
          width: 200,
          align: 'right',
          filters: false,
          combinedType: ['average', 'subTotal', 'total', 'totalAll'],
          cellRender: {
            name: '$vxeRatio'
          },
          formula: '({sbZbjeByz}-0==0)?0:(Math.round({sbZxjeByz}/{sbZbjeByz}*100*10)/10)'
        },
        {
          title: '预警',
          field: 'byz_yj',
          width: 200,
          align: 'center',
          filters: false,
          cellRender: {
            name: '$vxeInput'
          },
          formatter({ row }) {
            return warningCell(row.byz_zxjd).label
          },
          slots: {
            default({ row }) {
              return [
                <div style={{backgroundColor:warningCell(row.byz_zxjd).color}}>{warningCell(row.byz_zxjd).label}</div>
              ]
            }
          },
          exportFormatter: true,
          customerExportStyle:({row})=>{
            return {
              fill:{
                bgColor: 'ffffffff',//背景色
                fgColor: `ff${warningCell(row.byz_zxjd).color.replace('#','')}`,//前景色
                patternType: 'solid'//设置填充时的图案样式
              }
            }
          }
        }
      ]
    },
    {
      title: '备注',
      field: 'rmake',
      width: 150,
      sortable: false,
      align: 'left'
    }
    // ,{
    //   title: '数据源地址',
    //   field: 'adapterAddr',
    //   sortable: false,
    //   align: 'left'
    // }
  ],
  // table 操作按钮
  gloableOptionRow: {
    renderDefault(h, cellRender, params, context) {
      let self = context.$grid.$parent
      let { row, column } = params
      // const main = self.$parent.$parent.$parent.$parent
      // let status = main._data.toolBarStatusSelect.curValue
      return [
        <el-tooltip content="新增" placement="top" effect="light">
          <a class="gloable-option-row-add gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'add' })}>新增</a>
        </el-tooltip>,
        <el-tooltip content="附件" placement="top" effect="light">
          <a class="gloable-option-row-attachment gloable-option-row  fn-inline" onClick={() => self.onOptionRowClick({ row, column, optionType: 'attachment' })}>附件</a>,
        </el-tooltip>
      ]
    }
  }
}
