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
      curValue: ''
    }
  ],
  // BsToolBar 右侧按钮
  statusRightToolBarButton: {
    '1': [
      { code: 'add', label: '新增', status: 'primary' },
      { code: 'modify', label: '修改' },
      { code: 'ruleDetail', label: '规则明细' }
    ]
  },
  highQueryConfig: [
    {
      title: '规则编码',
      field: 'fiRuleCode',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '请输入规则编码'
        }
      }
    },
    {
      title: '规则描述',
      field: 'ruleDes',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '请输入规则描述'
        }
      }
    },
    {
      title: '创建人',
      field: 'createPersonName',
      width: '8',
      align: 'left',
      formula: '',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '请输入创建人'
        }
      }
    }
  ],
  tableColumnsConfig: [
    // {
    //   title: '规则编码',
    //   field: 'fiRuleCode',
    //   align: 'center'
    // },
    // {
    //   title: '规则描述',
    //   field: 'ruleDes',
    //   align: 'center'
    // },
    // {
    //   title: '备注',
    //   field: 'remark',
    //   align: 'center'
    // },
    // {
    //   title: '创建人',
    //   field: 'createPersonName',
    //   align: 'center'
    // },
    // {
    //   title: '创建时间',
    //   field: 'createTime',
    //   align: 'center'
    // },
    // {
    //   title: '最后更新时间',
    //   field: 'updateTime',
    //   align: 'center'
    // },
    // {
    //   title: '启用',
    //   field: 'isEnabled',
    //   align: 'center',
    //   slots: {
    //     default({ row }) {
    //       return [
    //         // <div class="fsc" style="height:100%;">
    //         //   <CustomerElProgress style="width:100%;" progressScaleList={[{ progressScale: sbZxjd, color: '#01a883' }]} percentage={row.sbGzKhjd}></CustomerElProgress>
    //         // </div>
    //         <div>
    //           <el-switch v-model={row.isEnabled} />
    //         </div>
    //       ]
    //     }
    //   }
    // }
  ]
}
