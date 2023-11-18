import Vue from 'vue'
import store from '@/store'
/* eslint-disable-next-line */
const h = new Vue().$createElement
export const tableColumns = (ctx) => [
  {
    title: '区划',
    width: 180,
    field: 'mofDivName',
    sortable: false,
    filters: false,
    align: 'center',
    tooltipFormat: '{mofDivCode}-{mofDivName}',
    formatter({ row }) {
      return row.mofDivCode && row.mofDivName ? `${row.mofDivCode}-${row.mofDivName}` : ''
      // return row.mofDivCode
    },
    exportFormatter: true
  },
  {
    title: '预算单位',
    width: 180,
    field: 'agencyName',
    sortable: false,
    filters: false,
    align: 'center',
    tooltipFormat: '{agencyCode}-{agencyName}',
    formatter({ row }) {
      return row.agencyCode && row.agencyName ? `${row.agencyCode}-${row.agencyName}` : ''
    },
    exportFormatter: true // 导出formatter展示的数据 @BsUI >= 2.1.2-beta.12

  },
  {
    title: '业务数据单号',
    width: 180,
    field: 'payAppNo',
    sortable: false,
    filters: false,
    align: 'center'
  },
  {
    title: '下发时间',
    width: 180,
    field: 'createTime',
    sortable: true,
    filters: false,
    align: 'center'
  },
  // {
  //   title: '监控类型',
  //   field: 'triggerClass',
  //   align: 'center',
  //   width: 180,
  //   cellRender: {
  //     name: '$vxeSelect',
  //     options: [
  //       {
  //         value: 1,
  //         label: '事中触发'
  //       },
  //       {
  //         value: 2,
  //         label: '定时触发'
  //       }
  //     ],
  //     defaultValue: '',
  //     props: {}
  //   },
  //   name: '$vxeSelect'
  // },
  {
    title: '监控规则',
    field: 'fiRuleName',
    sortable: false,
    filters: false,
    minWidth: 180,
    align: 'center',
    tooltipFormat: '{fiRuleCode}-{fiRuleName}',
    formatter({ row }) {
      return row.fiRuleCode && row.fiRuleName ? `${row.fiRuleCode}-${row.fiRuleName}` : ''
    },
    exportFormatter: true // 导出formatter展示的数据 @BsUI >= 2.1.2-beta.12
  },
  {
    title: '预警级别',
    field: 'warnLevel',
    'width': 180,
    align: 'center',
    filters: store.state.warnInfo.warnLevelOptions,
    filterRender: {
      name: '$vxeSelect'
    },
    cellRender: {
      name: '$warningLevelRender',
      props: {
        placeholder: '预警级别'
      }
    }
  },
  // {
  //   title: '处理方式',
  //   field: 'handleType',
  //   align: 'center',
  //   width: 180,
  //   cellRender: {
  //     name: '$vxeSelect',
  //     options: [
  //       {
  //         value: 1,
  //         label: '拦截'
  //       },
  //       {
  //         value: 2,
  //         label: '预警，需上传附件'
  //       },
  //       {
  //         value: 3,
  //         label: '预警，无需上传附件'
  //       },
  //       {
  //         value: 4,
  //         label: '提醒'
  //       },
  //       {
  //         value: 5,
  //         label: '记录'
  //       }
  //     ],
  //     defaultValue: '',
  //     props: {}
  //   },
  //   name: '$vxeSelect'
  // }
  {
    title: '支付金额',
    field: 'payAppAmt',
    sortable: false,
    filters: false,
    align: 'right',
    width: 160,
    combinedType: [
      'average',
      'subTotal',
      'total',
      'totalAll'
    ],
    cellRender: { name: '$vxeMoney' }
  },
  {
    title: '操作',
    field: 'opration',
    width: '230',
    slots: {
      default(row) {
        let vnode = (
          <div class="fcc">
            <el-button type="primary" size="mini" onClick={() => ctx.handleRowClick(row)}>查看详情</el-button>
            {/* <el-button type="primary" size="mini" onClick={() => this.showLogModel(row)}>查看日志</el-button> */}
          </div>
        )
        return [
          vnode
        ]
      }
    }
  }
]
export const queryColumns = [
  { // 各地省份树结构
    title: '区划',
    field: 'mofDivCode',
    align: 'left',
    name: '$vxeTree',
    itemRender: {
      name: '$vxeTree',
      options: [],
      defaultValue: '',
      props: {
        isServer: true,
        format: '{code}-{name}',
        config: {
          treeProps: {
            nodeKey: 'guid',
            label: 'name',
            children: 'children',
            labelFormat: '{code}-{name}'
          },
          placeholder: '请选择区划',
          multiple: false,
          isleaf: false,
          axiosConfig: {
            method: 'post',
            successCode: '100000',
            statusField: 'rscode',
            url: 'dfr-monitor-service/dfr/mofDivList/query'
          }
        },
        queryparams: {
          fiscalYear: '2023'
        }
      }
    }
  }
]
export const tabButtonColumns = [
  {
    type: 'button',
    label: '待接收',
    code: '1',
    iconName: 'base-daiban.png',
    iconNameActive: 'base-daiban-active.png'
  },
  {
    type: 'button',
    label: '已接收',
    code: '2',
    iconName: 'base-yiban.png',
    iconNameActive: 'base-yiban-active.png'
  }
]
