/*eslint-disable*/
import store from '@/store/index'
import Vue from 'vue'
const h = new Vue().$createElement
const dict=[
  { label:"绿色",value:"1",},
  { label:"黄色",value:"2",},
  { label:"红色第一档",value:"3",},
  { label:"红色第二档",value:"4",},
  { label:"红色第三档",value:"5",},
]
export const mockQueryData = [
  {
    title: '区划',
    field: 'mofDivCodes',
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
            labelFormat:"{code}-{name}"
          },
          placeholder: '请选择财政区划',
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
    field: 'warnLevel',
    align: 'center',
    width: 180,
    itemRender: {
      name: '$vxeSelect',
      // options: [
      //   { label:'红灯（禁止）' , value: '1'},
      //   { label:'黄灯（冻结）' , value: '2'},
      //   { label:'黄色警铃（警示）' , value: '3'}
      // ],
      options:store.state.warnInfo.warnLevelOptions.slice(0,3).map(item=>{
        return {
          label: item.warnName + `(${item.warnTips})`,
          value: String(item.value)
        }
      }),
      defaultValue: '',
      props: { disabled: false, placeholder: '预警级别' }
    },
    name: '$vxeSelect'
  },
  {
    title: '停留时间',
    field: 'stopTime',
    align: 'center',
    width: 180,
    itemRender: {
      name: '$vxeInput',
      defaultValue: '',
      props: { disabled: false, placeholder: '停留时间大于等于（天）' }
    },
    name: '$vxeInput'
  },
]
export const mockTableColumns = [
  {
    title: '财政区划',
    align: 'mofDivName',
    treeNode: true,
    width: 260,
    field: 'name',
    filters: false,
    formatter({ row }) {
      if(row.mofDivCode&&row.mofDivName){
        return `${row.mofDivCode}-${row.mofDivName}`
      }
      return row.mofDivName
    },
  },
  {
    title: '预警级别', 
    width: 180,
    field: 'warnLevel',
    sortable: false,
    align: 'center',
    filters: false,
    // cellRender: {
    //   name: '$warningLevelRender'
    // }
  },
  {
    title: '监控规则',
    align: 'center',
    treeNode: true,
    width: 260,
    field: 'fiRuleName',
    filters: false,
    formatter({ row }) {
      if(row.fiRuleCode&&row.fiRuleName){
        return `${row.fiRuleCode}-${row.fiRuleName}`
      }
      return row.fiRuleName
    },
  },
  {
    title: '当前节点',
    align: 'center',
    treeNode: true,
    width: 260,
    field: 'affirmDeptName',
    filters: false,
  },
  {
    title: '当前节点处理人',
    align: 'center',
    treeNode: true,
    width: 260,
    field: 'userName',
    filters: false,
    slots: {
      default({row}) {
        return [
          <div>
            <span style={{marginRight: '5px'}}>{ row.userName }</span>
            {row.userName ? <el-button style={{padding: '5px 12px'}} size="small" type="info" icon="el-icon-more"></el-button> : ''}
          </div>
        ]
      }
    },
  },
  {
    title: '流程到达时间',
    align: 'center',
    treeNode: true,
    width: 260,
    field: 'affirmTime',
    filters: false,
  },
  {
    title: '当前节点停留时间（天）',
    align: 'center',
    treeNode: true,
    width: 260,
    field: 'stopTime',
    filters: false,
  },
  // {
  //   title: '序时进度',
  //   field: 'sbGzXsjd',
  //   width: 200,
  //   align: 'right',
  //   combinedType: ['average', 'subTotal', 'total', 'totalAll'],
  //   filters: false,
  //   // formatter({ row }) {
  //   //   return row.sbGzXsjd
  //   // },
  //   // cellRender: {
  //   //   name: '$vxeRatio'
  //   // },
  //   // tooltipFormat: ({ row, column }) => {
  //   //   const {sbZbjeBgz,sbZxjeBgz}=row
  //   //   let sbZxjd='0.0'
  //   //   if(Number(sbZbjeBgz)){
  //   //     sbZxjd=Number((parseFloat(sbZxjeBgz/sbZbjeBgz)*100).toFixed(1))
  //   //   }
  //   //   return `执行进度：${sbZxjd}%`
  //   // },
  //   slots: {
  //   },
  //   // formula: '{sbZbjeBjbms}+{sbZbjeBgz}+{sbZbjeByz}'
  // }
]