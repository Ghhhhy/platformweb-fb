/*eslint-disable*/
import store from '@/store/index'
import Vue from 'vue'
const h = new Vue().$createElement
export const mockQueryData = [
  {
    title: '日期',
    field: 'startDays',
    sortable: false,
    align: 'left',
    itemRender: {
      name: '$vxeTime',
      defaultValue: '',
      format: 'YYYY-MM-DD',
      props: {
        type: 'date', //
        placeholder: '请选择日期'
      }
    }
  },
  {
    title: '区划',
    field: 'agencyCode',
    align: 'left',
    name: '$vxeTree',
    itemRender: {
      name: '$vxeTree',
      options: [],
      defaultValue: '',
      props: {
        placeholder: '请选择区划',
        isServer: true,
        config: {
          treeProps: {
            nodeKey: 'guid',
            label: 'name',
            children: 'children'
          },
          placeholder: '请选择区划',
          multiple: true,
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
  },
  {
    title: '预警级别',
    field: 'warningLevel',
    align: 'center',
    itemRender: {
      name: '$vxeSelect',
      options:[],
      options: store.state.warnInfo.warnLevelOptions.map(item => {
        return {
          ...item,
          value: String(item.value)
        }
      }),
      defaultValue: '',
      props: {}
    },
    sortable: 'true',
    name: '$vxeSelect'
  }
]
export const mockQueryParams = {
  warningLevel: '',
  agencyCode: '',
  startDays: ''
}
export const mockTableColumns = [
  // {
  //   title: '区划',
  //   width: '180',
  //   field: 'mofDivName',
  //   align: 'left',
  //   type: 'treeNode',
  //   treeNode: true
  // },
  {
    title: '区划',
    align: 'left',
    treeNode: true,
    width: 260,
    field: 'mofDivName',
    filters: false,
    cellRender: {
      name: '$vxeIcon'
    }
  },
  {
    title: '预算数',
    field: 'sbZbjeBgz',
    width: 200,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    filters: false,
    cellRender: {
      name: '$vxeInput'
    },
    // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  },
  {
    title: '执行数',
    field: 'sbZxjeBgz',
    width: 200,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    filters: false,
    cellRender: {
      name: '$vxeInput'
    },
    // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  },
  {
    title: '考核进度',
    field: 'sbGzKhjd',
    width: 200,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    filters: false,
    cellRender: {
      name: '$vxeRatio'
    },
    slots: {
      default({ row }) {
        return [
          <div class="fsc" style="height:100%;">
            <el-progress style="width:100%;" percentage={row.sbGzKhjd}></el-progress>
          </div>
        ]
      }
    },
    // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  },
  {
    title: '序时进度',
    field: 'sbGzSxjd',
    width: 200,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    filters: false,
    formatter({ row }) {
      return row.warningLevel
    },
    cellRender: {
      name: '$vxeRatio'
    },
    // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  },
  {
    title: '预警级别',
    field: 'warningLevel',
    width: 200,
    align: 'center',
    filters: false,
    cellRender: {
      name: '$vxeInput'
    },
    formatter({ row }) {
      return row.warningLevel
    },
    slots: {
      default({ row }) {
        return [
          <div style={{width:'100%',height:'100%', 'background-color': row.color }}></div>
        ]
      }
    },
    exportFormatter: true,
    customerExportStyle: ({ row }) => {
      return {
        fill: {
          bgColor: 'ffffffff',
          fgColor: `ff${row.color?.replace('#', '')}`,
          patternType: 'solid'
        }
      }
    }
  }
]
