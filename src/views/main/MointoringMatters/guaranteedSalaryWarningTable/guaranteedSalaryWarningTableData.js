/*eslint-disable*/
import store from '@/store/index'
import Vue from 'vue'
const h = new Vue().$createElement
const dict=[
  { label:"绿色",value:"1",},
  { label:"黄色",value:"2",},
  { label:"红色一档",value:"3",},
  { label:"红色二档",value:"4",},
  { label:"红色三档",value:"5",},
]
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
        placeholder: '请选择截至日期',
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
        format: '{code}-{name}',
        config: {
          treeProps: {
            nodeKey: 'guid',
            label: 'name',
            children: 'children',
            labelFormat:"{code}-{name}"
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
      options:dict,
      // options: store.state.warnInfo.warnLevelOptions.map(item => {
      //   return {
      //     ...item,
      //     value: String(item.value)
      //   }
      // }),
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
  {
    title: '区划',
    align: 'left',
    treeNode: true,
    width: 260,
    field: 'name',
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
      name: '$vxeMoney'
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
      name: '$vxeMoney'
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
      return row.sbGzSxjd
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
      return dict.find(item=>{return item.value==row.warningLevel})?.label||''
    },
    slots: {
      default({ row }) {
        const style={width:'100%',height:'100%' }
        if(row.rgbColor){
          style['background-color']=`#${row.rgbColor.replace('#', '')}`
        }
        return [
          <div style={style}>{dict.find(item=>{return item.value==row.warningLevel})?.label||''}</div>
        ]
      }
    },
    exportFormatter: true,
    customerExportStyle: ({ row }) => {
      const fill={
          bgColor: 'ffffffff',
          fgColor:'ffffffff',
          patternType: 'solid'
      }
      if(row.rgbColor){
        fill['fgColor']=`ff${row.rgbColor.replace('#', '')}`
      }
      return {fill}
    }
  }
]
