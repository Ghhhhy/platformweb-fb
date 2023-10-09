/*eslint-disable*/
import store from '@/store/index'
import Vue from 'vue'
const h = new Vue().$createElement
import CustomerElProgress from './component/progress.vue'
Vue.component('CustomerElProgress',CustomerElProgress)
const dict=[
  { label:"绿色",value:"1",},
  { label:"黄色",value:"2",},
  { label:"红色第一档",value:"3",},
  { label:"红色第二档",value:"4",},
  { label:"红色第三档",value:"5",},
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
        placeholder: '请选择截止日期',
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
  },
  {
    title: '预警级别',
    field: 'warningLevels',
    align: 'center',
    itemRender: {
      name: '$vxeTree',
      options:[
        { name:"绿色",code:"1",},
        { name:"黄色",code:"2",},
        { name:"红色",code:"red",children:[
            { name:"红色一档",code:"3",},
            { name:"红色二档",code:"4",},
            { name:"红色三档",code:"5",},
          ]
        },
      ],
      defaultValue: '',
      format: '{name}',
      props: {
        format: '{name}',
        config: {
          treeProps: {
            nodeKey: 'code',
            label: 'name',
            labelFormat:"{name}",
            children: 'children',
          },
          placeholder: '请选择预警级别',
          multiple: true,
          isleaf: true,
        },
      }
    }
  }
]
export const mockQueryParams = {
  warningLevels: '',
  agencyCode: '',
  startDays: null
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
    formatter({ row }) {
      return row.sbGzKhjd
    },
    slots: {
      default({ row }) {
        return [
          <div class="fsc" style="height:100%;">
            <el-progress style="width:100%;" progressScale={row.sbZxjeBgz} percentage={row.sbGzKhjd}></el-progress>
          </div>
        ]
      }
    },
    // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  },
  {
    title: '序时进度',
    field: 'sbGzXsjd',
    width: 200,
    align: 'right',
    combinedType: ['average', 'subTotal', 'total', 'totalAll'],
    filters: false,
    formatter({ row }) {
      return row.sbGzXsjd
    },
    cellRender: {
      name: '$vxeRatio'
    },
    slots: {
      default({ row }) {
        return [
          <div class="fsc" style="height:100%;">
            <CustomerElProgress style="width:100%;"  progressScale={row.sbGzKhjd} percentage={row.sbGzXsjd}></CustomerElProgress>
          </div>
        ]
      }
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
      return row.warningLevelStr||''
    },
    slots: {
      default({ row }) {
        const style={width:'100%',height:'100%' }
        if(row.rgbColor){
          style['background-color']=`#${row.rgbColor.replace('#', '')}`
        }
        return [
          <div style={style}>{row.warningLevelStr||''}</div>
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
