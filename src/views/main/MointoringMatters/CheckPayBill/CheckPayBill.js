export let proconf = {
  highQueryConfig: [
    {
      title: '类别',
      field: 'typeName',
      'width': 180,
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '预决算报告', label: '预决算报告' },
          { value: '审计报告', label: '审计报告' },
          { value: '财政监督报告', label: '财政监督报告' }
        ],
        props: {
          placeholder: '请选择'
        }
      }
    },
    {
      title: '开始时间',
      field: 'beginYear',
      'width': 180,
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '开始时间',
          type: 'time',
          clearable: true
          // valueFormat: 'yyyy-mm'
        }
      }
    },
    {
      title: '终止时间',
      field: 'endYear',
      'width': 180,
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '终止时间',
          type: 'time',
          clearable: true
          // valueFormat: 'yyyy-mm-ss'
        }
      }
    },
    {
      title: '资金名称',
      field: 'moneyName',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '资金名称'
        }
      }
    },
    {
      title: '指标公文号',
      field: 'documentNumber',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeInput',
      itemRender: {
        name: '$vxeInput',
        options: [],
        props: {
          placeholder: '指标公文号'
        }
      }
    }
  ],
  tableColumnsConfig: [
    {
      title: '资金名称',
      field: 'name',
      align: 'center'
    },
    {
      title: '上级区划',
      field: 'superDivision',
      align: 'center'
    },
    {
      title: '接受区划',
      field: 'acceptDivision',
      align: 'center'
    },
    {
      title: '转移支付下发指标金额',
      field: 'transferPayment',
      align: 'center'
    },
    {
      title: '公文指标文号',
      field: 'documentNumber',
      align: 'center'
    },
    {
      title: '公文指标金额',
      field: 'documentMoney',
      align: 'center'
    },
    {
      title: '对账结果',
      field: 'result',
      align: 'center'
    },
    {
      title: '比对时间',
      field: 'time',
      align: 'center'
    },
    {
      title: '操作',
      className: 'gloableOptionRow',
      align: 'center',
      fixed: 'right',
      sortable: false,
      filters: false,
      cellRender: {
        // name: '$vxeTableHref',
        name: '$vxeTableOptionRow',
        props: {
          statusField: 'acceptDivision',
          options: {
            // 暂时这样写
            22: [
              {
                label: '查看明细',
                code: 'detail',
                class: 'detail',
                btnStatus: '',
                type: 'text' // text||button
              }
            ],
            default: [
              {
                label: '查看明细',
                code: 'detail',
                class: 'detail',
                btnStatus: '',
                type: 'text' // text||button
              }
            ]
          }
        }
      }
    }
  ]
}
