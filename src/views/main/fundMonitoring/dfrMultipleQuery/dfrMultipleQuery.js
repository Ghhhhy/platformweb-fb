import store from '@/store/index'
import { padStart } from 'xe-utils/methods'

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
      // { code: 'detail', label: '查看详情', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      visible: !store.getters.isFuJian,
      formula: '',
      itemRender: {
        name: '$vxeInput',
        // options: [
        //   // { value: '2020', label: '2020年' },
        //   // { value: '2021', label: '2021年' },
        //   { value: '2022', label: '2022年' },
        //   { value: '2023', label: '2023年' }
        // ],
        props: {
          type: 'year',
          valueFormat: 'yyyy',
          placeholder: '业务年度'
        }
      }
    },
    {
      title: '专项资金',
      field: 'proCodes',
      width: '8',
      align: 'left',
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        props: {
          config: {
            valueKeys: ['code', 'name', 'id'],
            format: '{name}',
            treeProps: {
              labelFormat: '{code}-{name}', // {code}-{name}
              nodeKey: 'id',
              label: 'label',
              children: 'children'
            },
            placeholder: '专项资金',
            multiple: true,
            readonly: false,
            isleaf: true
          }
        }
      }
    },
    {
      title: '支出功能分类',
      field: 'expFuncCode',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeInput',
        props: {
          placeholder: '支出功能分类'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: '',
    proCodes: '',
    expFuncCode: ''
  },
  // 处室
  statusButtons: [
    {
      code: '1',
      label: '处室指标综合查看文号汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '处室指标综合查看汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    }
  ],
  curStatusButton: {
    label: '处室指标综合查看文号汇总',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  // 市县
  statusButtons2: [
    {
      code: '1',
      label: '市县补助指标文号汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '市县补助指标汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    }
  ],
  curStatusButton2: {
    label: '市县补助指标文号汇总',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  // 单位
  statusButtons1: [
    {
      code: '1',
      label: '单位指标综合查看文号汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '1'
    },
    {
      code: '2',
      label: '单位指标综合查看汇总',
      iconName: 'base-all.png',
      iconNameActive: 'base-all-active.png',
      type: 'button',
      curValue: '2'
    }
    // {
    //   code: '3',
    //   label: '专户资金细化汇总',
    //   iconName: 'base-all.png',
    //   iconNameActive: 'base-all-active.png',
    //   type: 'button',
    //   curValue: '3'
    // }
  ],
  curStatusButton1: {
    label: '单位指标综合查看文号汇总',
    code: '1',
    type: 'button',
    curValue: '1'
  },
  // 处室
  PoliciesTableColumns: [
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '指标登记金额',
    //   width: 180,
    //   field: 'djAmount',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '上级指标导入金额',
    //   width: 180,
    //   field: 'sjzbdrje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标整合金额',
    //   width: 180,
    //   field: 'zbzhje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调增金额',
    //   width: 180,
    //   field: 'zbtzje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调减金额',
    //   width: 180,
    //   field: 'zbtjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标追减金额',
    //   width: 180,
    //   field: 'zbzjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标实际金额',
    //   width: 180,
    //   field: 'zbsjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   formula: '{djAmount}',
    //   cellRender: { name: '$vxeMoney' }
    // },
    {
      title: '本级分配',
      width: 180,
      field: 'bjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      // formula: '{bjAmount}+{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      width: 180,
      field: 'xjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '本级实际支出',
      width: 180,
      field: 'bjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    }

  ],
  PoliciesTableColumns1: [
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '单位',
      width: 180,
      field: 'agencyName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'projectName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标总额',
      width: 180,
      field: 'amount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '实际支出金额',
      width: 180,
      field: 'zcAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },

    // {
    //   title: '已安排金额',
    //   width: 180,
    //   field: 'yapje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '正在办理金额',
    //   width: 180,
    //   field: 'zzblje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '债卷标识',
    //   width: 180,
    //   field: 'zjbs',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算来源',
      width: 180,
      field: 'bgtTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质唯一标识',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金安排初始年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级文号',
      width: 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '上级专项',
    //   width: 180,
    //   field: 'exTrackProName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '需要跟踪的专项资金',
    //   width: 180,
    //   field: 'xygzdzxzj',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '接受区划名称',
      width: 180,
      field: 'recDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支付方式',
      width: 180,
      field: 'payTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出经济分类科目',
      width: 180,
      field: 'depBgtEcoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '政府预算支出经济分类',
      width: 180,
      field: 'govBgtEcoName',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  PoliciesTableColumns2: [
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '指标登记金额',
    //   width: 180,
    //   field: 'djAmount',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '上级指标导入金额',
    //   width: 180,
    //   field: 'sjzbdrje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标整合金额',
    //   width: 180,
    //   field: 'zbzhje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调增金额',
    //   width: 180,
    //   field: 'zbtzje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调减金额',
    //   width: 180,
    //   field: 'zbtjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标追减金额',
    //   width: 180,
    //   field: 'zbzjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标实际金额',
    //   width: 180,
    //   field: 'zbsjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   formula: '{djAmount}',
    //   cellRender: { name: '$vxeMoney' }
    // },
    {
      title: '本级分配',
      width: 180,
      field: 'bjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      // formula: '{bjAmount}+{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '分配下级',
      width: 180,
      field: 'xjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '本级实际支出',
      width: 180,
      field: 'bjAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  // 单位
  AgencyPoliciesTableColumns: [
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '单位(乡镇)',
    //   width: 180,
    //   field: 'agencyName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '指标登记金额',
    //   width: 180,
    //   field: 'djAmount',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调增金额',
    //   width: 180,
    //   field: 'zbtzje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调减金额',
    //   width: 180,
    //   field: 'zbtjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标追减金额',
    //   width: 180,
    //   field: 'zbzjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    {
      title: '指标实际金额',
      width: 180,
      field: 'zbsjje',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{djAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付金额',
      width: 180,
      field: 'zcAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  AgencyPoliciesTableColumns1: [
    // {
    //   title: '单位(乡镇)',
    //   width: 180,
    //   field: 'agencyName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '项目名称',
      width: 180,
      field: 'projectName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标登记总额',
      width: 180,
      field: 'djAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付金额',
      width: 180,
      field: 'zcAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '债卷标识',
    //   width: 180,
    //   field: 'zjbs',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算来源',
      width: 180,
      field: 'bgtTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金安排初始年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级文号',
      width: 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级专项',
      width: 180,
      field: 'exTrackProName',
      // formula: '{proName}',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '需要跟踪的专项资金',
    //   width: 180,
    //   field: 'xygzdzxzj',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '支付方式',
    //   width: 180,
    //   field: 'payTypeName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '转移支付功能分类',
      width: 180,
      field: 'xjzcgnflkm',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '政府预算支出经济分类',
      width: 180,
      field: 'govBgtEcoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '部门预算支出经济分类',
      width: 180,
      field: 'depBgtEcoName',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  AgencyPoliciesTableColumns2: [
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '单位(乡镇)',
    //   width: 180,
    //   field: 'agencyName',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '指标登记金额',
    //   width: 180,
    //   field: 'djAmount',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调增金额',
    //   width: 180,
    //   field: 'zbtzje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标调减金额',
    //   width: 180,
    //   field: 'zbtjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    // {
    //   title: '指标追减金额',
    //   width: 180,
    //   field: 'zbzjje',
    //   sortable: false,
    //   filters: false,
    //   align: 'center',
    //   cellRender: { name: '$vxeMoney' }
    // },
    {
      title: '指标实际金额',
      width: 180,
      field: 'zbsjje',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{djAmount}',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '支付金额',
      width: 180,
      field: 'zcAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    {
      title: '指标余额',
      width: 180,
      field: 'zbye',
      sortable: false,
      filters: false,
      align: 'center',
      formula: '{bjAmount}-{zbsjfpje}-{xjAmount}',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  MofDivPoliciesTableColumns: [
    {
      title: '下级地区',
      width: 180,
      field: 'recDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标登记总额',
      width: 180,
      field: 'djAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    }
  ],
  MofDivPoliciesTableColumns1: [
    {
      title: '下级地区',
      width: 180,
      field: 'recDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标文号',
      width: 180,
      field: 'corBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标登记总额',
      width: 180,
      field: 'djAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    },
    // {
    //   title: '债卷标识',
    //   width: 180,
    //   field: 'zjbs',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '预算来源',
      width: 180,
      field: 'bgtTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金性质',
      width: 180,
      field: 'fundTypeName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '资金安排初始年度',
      width: 180,
      field: 'fiscalYear',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '上级文号',
      width: 180,
      field: 'supBgtDocNoName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    // {
    //   title: '上级专项',
    //   width: 180,
    //   field: 'exTrackProName',
    //   // formula: '{proName}',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    // {
    //   title: '需要跟踪的专项资金',
    //   width: 180,
    //   field: 'xygzdzxzj',
    //   sortable: false,
    //   filters: false,
    //   align: 'center'
    // },
    {
      title: '转移支付功能分类',
      width: 180,
      field: 'xjzcgnflkm',
      sortable: false,
      filters: false,
      align: 'center'
    }
  ],
  MofDivPoliciesTableColumns2: [
    {
      title: '下级地区',
      width: 180,
      field: 'recDivName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '财政内设机构',
      width: 180,
      field: 'bgtMofDepName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '专项资金',
      width: 180,
      field: 'trackProName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '支出功能分类科目',
      width: 180,
      field: 'expFuncName',
      sortable: false,
      filters: false,
      align: 'center'
    },
    {
      title: '指标登记总额',
      width: 180,
      field: 'djAmount',
      sortable: false,
      filters: false,
      align: 'center',
      cellRender: { name: '$vxeMoney' }
    }
  ]
}

/**
 * 将时间戳转dateString
 * @param timestamp
 * @returns {string}
 */
export function getDateString(timestamp) {
  const curDate = new Date(timestamp)
  const year = curDate.getFullYear()
  const month = padStart((curDate.getMonth() + 1).toString(), 2, '0')
  const day = padStart(curDate.getDate().toString(), 2, '0')
  const hh = padStart(curDate.getHours().toString(), 2, '0')
  const mm = padStart(curDate.getMinutes().toString(), 2, '0')
  const ss = padStart(curDate.getSeconds().toString(), 2, '0')
  return `${year}-${month}-${day} ${hh}:${mm}:${ss}`
}
