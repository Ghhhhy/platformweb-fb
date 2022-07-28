import { Store } from '@/utils/store'
// 项目库管理 => 项目申报管理 => 人员及公用项目经费申报
// 人员及公用项目申报主表  表头配置  2020-7-21 09:36
// 负责人：黄丹
export let assertTableRule = {
  year: [{
    required: true,
    message: '请选择年度',
    trigger: 'change'
  }]
}
export let govBuyServerTableRule = {
  year: [{
    required: true,
    message: '请选择年度',
    trigger: 'change'
  }]
}
export let proconf = {
  disabledMoneyConversion: false, // --統一修改為可以切換的，20211008
  buttonUnHandle: {
    // table工具栏配置 未处理
    buttons: [
      { code: 'toolbar-create', name: '测算生成', status: 'primary' },
      { code: 'toolbar-project-create', name: '按项目测算' },
      { code: 'toolbar-insert', name: '新增' },
      { code: 'toolbar-refresh', name: '刷新' },
      { code: 'toolbar-update', name: '修改' },
      { code: 'toolbar-delete', name: '删除' },
      { code: 'toolbar-review', name: '提交' }
      // { code: 'toolbar-operation-log', name: '操作日志' }
    ]
  },

  // buttonHandled: {
  //   // table工具栏配置 已处理
  //   buttons: [
  //     { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
  //     { code: 'toolbar-undo', name: '撤销' },
  //     // { code: 'toolbar-check', name: '查看' },
  //     { code: 'toolbar-operation-log', name: '操作日志' }
  //   ]
  // },
  // buttonRefunded: {
  //   // table工具栏配置 已退回
  //   buttons: [
  //     { code: 'toolbar-update', name: '修改', status: 'primary' },
  //     { code: 'toolbar-refresh', name: '刷新' },
  //     { code: 'toolbar-review', name: '送审' },
  //     { code: 'toolbar-operation-log', name: '操作日志' }
  //   ]
  // },
  // buttonPreSaved: {
  //   // table工具栏配置 已储存
  //   buttons: [
  //     { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
  //     { code: 'toolbar-operation-log', name: '操作日志' }
  //   ]
  // },
  buttonSaved: {
    // table工具栏配置 已储存
    buttons: [
      { code: 'toolbar-refresh', name: '刷新', status: 'primary' },
      //  { code: 'toolbar-update', name: '修改' }
      { code: 'toolbar-recall', name: '撤销' }
    ]
  },
  buttonFileUpLoad: {
    buttons: [
      { code: 'toolbar-upload', name: '上传' },
      { code: 'toolbar-add-line', name: '新增行' },
      { code: 'toolbar-delete-line', name: '删除行' },
      { code: 'toolbar-download', name: '下载' }
    ]
  },
  isGovToolbarConfig: {
    // moneyConversion: false, // 是否有金额转换
    disabledMoneyConversion: false, // --統一修改為可以切換的，20211008
    buttons: [
      { code: 'toolbar-add-line', name: '新增行' },
      { code: 'toolbar-copy-line', name: '复制行' },
      { code: 'toolbar-delete-line', name: '删除行' }
    ]
  },
  modeToolbarConfig: {
    disabledMoneyConversion: false, // --統一修改為可以切換的，20211008
    buttons: [
      { code: 'toolbar-mode-create', name: '测算生成', status: 'primary' }
    ]
  },
  insertToolBarItem: [
    {
      label: '项目基本信息',
      code: 0
    },
    {
      label: '分年度支出计划',
      code: 1
    },

    {
      label: '项目附件信息',
      isHide: false,
      code: 2
    },
    {
      label: '政府采购项目',
      isHide: true,
      code: 3
    },
    {
      label: '政府购买服务项目',
      isHide: true,
      code: 4
    },
    {
      label: '测算明细',
      isHide: true,
      code: 5
    },
    {
      label: '资产配置',
      isHide: true,
      code: 6
    },
    {
      label: '项目绩效信息',
      isHide: true,
      code: 9
    }
  ],
  leftButtonConfig: [

    { label: '未提交', code: '1' },
    // { label: '已送审', code: '2' },
    // { label: '被退回', code: '4' },
    { label: '已提交', code: '99' }
    // { label: '曾经办', code: '0' }
  ],
  // 政府采购
  otherIsGovTableItemsConfig: [
    {
      field: 'year',
      title: '年度',
      width: 130,
      editRender: {
        name: '$select',
        options: [
        ]
      },
      align: 'right'
    },
    {
      title: '政府采购品目',
      field: 'pur_class_',
      width: 180,
      editRender: {
        name: '$treeinput',
        props: {
          isServer: true,
          elecode: 'PURITEM',
          queryparams: {
            eleCode: 'PURITEM',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
          }
        }
      },
      align: 'left'
    },
    {
      title: '规格型号',
      field: 'purorgform',
      width: 180,
      editRender: { name: '$input' },
      align: 'left'
    },
    {
      title: '计量单位',
      field: 'measmt_unit',
      width: 180,
      editRender: {
        name: '$select',
        options: [
          { value: '037', label: '眼' },
          { value: '038', label: '盏' },
          { value: '039', label: '张' },
          { value: '040', label: '支' },
          { value: '041', label: '只' },
          { value: '042', label: '株' },
          { value: '043', label: '组' },
          { value: '044', label: '座' },
          { value: '045', label: '座（幢）' },
          { value: '046', label: '座/立方米' },
          { value: '047', label: '座/米' },
          { value: '048', label: '座/平方米' },
          { value: '049', label: '座/延长米' },
          { value: '050', label: '端' },
          { value: '051', label: '层' },
          { value: '052', label: '间' },
          { value: '001', label: '辆' },
          { value: '002', label: '亩' },
          { value: '003', label: '台' },
          { value: '004', label: '件' },
          { value: '005', label: '个' },
          { value: '006', label: '平方米' },
          { value: '007', label: '公里' },
          { value: '008', label: '个/吨' },
          { value: '009', label: '本' },
          { value: '010', label: '根' },
          { value: '011', label: '副' },
          { value: '012', label: '架' },
          { value: '013', label: '顶' },
          { value: '014', label: '具' },
          { value: '015', label: '卷' },
          { value: '016', label: '孔/座' },
          { value: '017', label: '块/平方米' },
          { value: '018', label: '立方米' },
          { value: '019', label: '立方米/座' },
          { value: '020', label: '把' },
          { value: '021', label: '门' },
          { value: '022', label: '盘' },
          { value: '023', label: '吨/座' },
          { value: '024', label: '千伏安' },
          { value: '025', label: '扇' },
          { value: '026', label: '双' },
          { value: '027', label: '艘' },
          { value: '028', label: '艘/吨' },
          { value: '029', label: '部' },
          { value: '030', label: '台/蒸吨' },
          { value: '031', label: '套' },
          { value: '032', label: '条' },
          { value: '033', label: '条/公里' },
          { value: '034', label: '条/米' },
          { value: '035', label: '项' },
          { value: '036', label: '延长公里' },
          { value: '060', label: '元/人月' },
          { value: '061', label: '元/人年' },
          { value: '062', label: '元/人' },
          { value: '063', label: '元/辆年' },
          { value: '064', label: '元/平方米月' },
          { value: '065', label: '元/部' },
          { value: '066', label: '元/平方米年' }
        ]
      },
      align: 'left'
    },
    {
      title: '单价',
      field: 'price',
      width: 180,
      // editRender: { name: '$input', props: { type: 'float' } },
      editRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'

    },
    {
      title: '采购数量',
      field: 'pur_qua',
      width: 180,
      editRender: { name: '$input', props: { type: 'number', min: 1 } },
      align: 'right'
    },
    {
      title: '采购金额',
      field: 'pur_amt',
      width: 180,
      align: 'right',
      combinedType: ['average', 'total'],
      formula: '{pur_qua}*{price}',
      cellRender: { name: '$calculateRender' }
    }],
  // 政府采购表格校验
  govTableRule: {
    year: [{
      required: true,
      message: '请选择年度',
      trigger: 'change'
    }],
    pur_class_: [{
      required: true,
      message: '请选择政府采购项目',
      trigger: 'change'
    }],
    purorgform: [{
      required: true,
      message: '项目规格不能为空',
      trigger: 'change'
    }],
    measmt_unit: [{
      required: true,
      message: '计量单位不能为空',
      trigger: 'change'
    }],
    price: [{
      required: true,
      message: '单价不能为空',
      trigger: 'change'
    }],
    pur_qua: [{
      required: true,
      message: '采购数量不能为空',
      trigger: 'change'
    }],
    pur_amt: [{
      required: true,
      message: '采购金额不能为空',
      trigger: 'change'
    }]
  },
  // 是否资产配置
  otherIsAssetrTableItemsConfig: [
    {
      field: 'year',
      title: '年度',
      width: 130,
      editRender: {
        name: '$select',
        options: [

        ]
      },
      align: 'right'
    },
    {
      title: '资产分类',
      field: 'asset_class_',
      width: 180,
      editRender: {
        name: '$treeinput',
        props: {
          isServer: true,
          queryparams: {
            eleCode: 'ASSETTYPE',
            sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
          }
        }
      },
      align: 'left'
    },
    {
      title: '资产名称',
      field: 'asset_name',
      width: 180,
      editRender: {
        name: '$input',
        props: { type: 'text' }
      },
      align: 'left'
    },
    {
      title: '资产申请数量',
      field: 'asset_qua',
      width: 180,
      editRender: {
        name: '$input',
        props: { type: 'number' }
      },
      align: 'right'
    },
    {
      title: '单价',
      field: 'price',
      width: 180,
      // editRender: {
      //   name: '$input',
      //   props: { type: 'float' }
      // },
      editRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      title: '采购金额',
      field: 'sum_amt',
      width: 180,
      formula: '{price}*{asset_qua}',
      cellRender: {
        name: '$calculateRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      title: '用途',
      field: 'assetusage',
      width: 180,
      editRender: {
        name: '$input',
        props: {
          type: 'text'
        }
      },
      align: 'left'
    }],
  // 是否政府购买服务
  otherIsGovBuyServerTableItemsConfig: [
    {
      field: 'year',
      title: '年度',
      width: 130,
      editRender: {
        name: '$select',
        options: [

        ]
      },
      align: 'right'
    },
    {
      title: '是否包含政府采购预算',
      field: 'bgt_govpur_flag',
      width: 200,
      editRender: {
        name: '$select',
        options: [
          {
            value: 1,
            label: '是'
          },
          {
            value: 0,
            label: '否'
          }]
      },
      align: 'left'
    },
    {
      title: '政府购买服务内容',
      field: 'gov_buy_des',
      width: 240,
      editRender: {
        name: '$input'
      },
      align: 'left'
    },
    {
      title: '购买数量',
      field: 'buy_no',
      width: 180,
      editRender: {
        name: '$input',
        props: { type: 'number' }
      },
      align: 'right'
    },
    {
      title: '总金额',
      field: 'total_amt',
      width: 180,

      editRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      },
      align: 'right',

      combinedType: ['average', 'total']
    }],
  columns: [
    {
      title: '项目类别',
      sortable: true,
      field: 'pro_cat_name',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '存续状态',
      field: 'exist_statue_code',
      width: 150,
      align: 'left',
      formatter: (value, column) => {
        if (value.cellValue === '001') {
          return '一次性项目'
        }
        if (value.cellValue === '002') {
          return '经常性项目'
        }
        // if (value.cellValue === '003') {
        //   return '阶段性项目'
        // }
      },
      filterMultiple: false,
      filters: [
        { label: '一次性项目', value: '001' },
        { label: '经常性项目', value: '002' }
        // { label: '阶段性项目', value: '003' }
      ]
    },
    {
      title: '支出项目类别',
      field: 'payout_kind_name',
      width: 300,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'

        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '项目代码',
      field: 'pro_code',
      width: 200,
      align: 'right',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '项目名称',
      field: 'pro_name',
      width: 300,
      align: 'left',
      cellRender: {
        name: '$href',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '项目单位',
      field: 'use_agency_name',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '主管部门',
      field: 'dept_name',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '财政内部机构',
      field: 'mof_dep_name',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      field: 'fun_res_name',
      title: '职能职责',
      align: 'left',
      width: 200
    },
    {
      title: '项目起始年度',
      field: 'pro_start_year',
      align: 'right',
      width: 200
    },
    {
      title: '项目结束年度',
      field: 'end_year',
      align: 'right',
      width: 200
    },
    {
      title: '项目期限(年)',
      field: 'pro_term',
      align: 'right',
      width: 200
    },
    {
      title: '项目金额',
      field: 'pro_total_amt',
      width: 200,
      align: 'right',
      combinedType: ['average', 'total'],
      filterMultiple: false,
      filters: [
        { label: '项目金额大于100', value: 100 },
        { label: '项目金额大于500', value: 500 }
      ],
      editRender: {
        name: '$moneyRender'
      },
      // obj 中 value是选中选项的值 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return obj.row.pro_total_amt > obj.value
      }
    },
    {
      title: '申报单位联系人',
      field: 'apply_link_man',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '申报联系电话',
      field: 'apply_link_tel',
      width: 200,
      align: 'right',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    // {
    //   title: '设立依据',
    //   field: 'degisn_consideration',
    //   width: 200,
    //   align: 'left',
    //   filterRender: {
    //     name: 'input',
    //     props: {
    //       type: 'text'
    //     }
    //   },
    //   filters: [{ data: '' }],
    //   // obj 中 option 筛选器内容 row 被遍历的列
    //   filterMethod: obj => {
    //     // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
    //     return !(
    //       obj.row[obj.column.property].search(obj.option.data) === -1
    //     )
    //   }
    // },
    {
      field: 'distri_type_code',
      title: '分配方式',
      width: 200,
      align: 'left',
      editRender: {
        disabled: true,
        name: '$select',
        options: [
          {
            value: '1',
            label: '因素法'
          },
          {
            value: '2',
            label: '项目法'
          },
          {
            value: '3',
            label: '因素和项目法'
          }
        ],
        props: {
          disabled: true,
          placeholder: '请选择存续状态'
        }
      }
    },
    {
      title: '项目概述',
      field: 'pro_desc',
      width: 200,
      align: 'left',
      filterRender: {
        name: 'input',
        props: {
          type: 'text'
        }
      },
      filters: [{ data: '' }],
      // obj 中 option 筛选器内容 row 被遍历的列
      filterMethod: obj => {
        // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
        return !(
          obj.row[obj.column.property].search(obj.option.data) === -1
        )
      }
    },
    {
      title: '数据状态',
      field: 'pro_status',
      width: 200,
      align: 'left',
      editRender: {
        disabled: true,
        name: '$select',
        options: [
          {
            value: 1,
            label: '已储备'
          },
          {
            value: 0,
            label: '在途'
          }
        ]
      }
    }
  ],
  createDataColumns: [
    {
      title: '支出标准',
      sortable: true,
      field: 'exp_cri_name',
      width: 500,
      align: 'left'
    },
    {
      title: '支出档次',
      sortable: true,
      field: 'cri_level',
      width: 200,
      align: 'left'
    },
    {
      title: '计量单位',
      sortable: true,
      field: 'unit',
      width: 200,
      align: 'left'
    },
    {
      title: '单价',
      sortable: true,
      field: 'price',
      fieldType: 'money',
      align: 'right',
      width: 200,
      editRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      }
    },
    {
      title: '总计',
      sortable: true,
      field: 'est_amt',
      width: 200,
      combinedType: ['average', 'total'],
      formula: '{check_amt}+{scoi_invest_fund}',
      cellRender: {
        name: '$calculateRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      title: '财政拨款',
      sortable: true,
      field: 'check_amt',
      fieldType: 'money',
      width: 200,
      cellRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          disable: true,
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      title: '其中：社会投入金额',
      sortable: true,
      field: 'scoi_invest_fund',
      fieldType: 'money',
      width: 200,
      cellRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      title: '部门预算支出经济分类',
      sortable: true,
      field: 'dep_bgt_eco_type_name',
      width: 200,
      align: 'left'
    },
    {
      title: '计算方式',
      sortable: true,
      field: 'form',
      width: 200,
      align: 'left'
    },
    {
      title: '测算依据及说明',
      sortable: true,
      field: 'remark',
      width: 200,
      align: 'left'
    }
  ],
  insertFormItems: [
    {
      field: 'pro_cat_',
      title: '项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          isServer: true,
          isleaf: true,
          elecode: 'PROCAT',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'PROCAT',
            sxspecroleguid: '999004',
            queryConditions: 'and code in (\'1\',\'11\',\'12\',\'2\',\'21\')'
          }
        }
      }
    },
    {
      field: 'exist_statue_code',
      title: '存续状态',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        options: [
          {
            value: '001',
            label: '一次性项目'
          },
          {
            value: '002',
            label: '经常性项目'
          }
          // {
          //   value: '003',
          //   label: '阶段性项目'
          // }
        ],
        props: {
          placeholder: '请选择存续状态'
        }
      }
    },
    {
      field: 'payout_kind_',
      title: '支出项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          isServer: true,
          isleaf: true,
          elecode: 'vw_payoutkind',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'vw_payoutkind',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'pro_code',
      title: '项目代码',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_name',
      title: '项目名称',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'use_agency_name',
      title: '项目单位',
      span: 8,
      itemRender: {
        name: '$input',
        isServer: true,
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'dept_name',
      title: '主管部门',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'mof_dep_name',
      title: '财政内部机构',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_start_year',
      title: '项目起始年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'end_year',
      title: '项目结束年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'pro_term',
      title: '项目期限(年)',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'input',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'pro_total_amt',
      title: '项目金额',
      span: 8,
      formatter: 'formatMoney',
      combinedType: ['average', 'total'],
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'float',
          placeholder: '项目金额'
        }
      }
    },
    {
      field: 'apply_link_man',
      title: '申报单位联系人',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'apply_link_tel',
      title: '申报联系电话',
      span: 16,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'distri_type_code',
      title: '分配方式',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        props: {

          disabled: true,
          placeholder: '请选择分配方式'
        },
        options: [
          {
            value: '1',
            label: '因素法'
          },
          {
            value: '2',
            label: '项目法'
          },
          {
            value: '3',
            label: '因素和项目法'
          }
        ]
      }
    },
    {
      field: 'is_gov',
      title: '是否包含政府采购预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_govbuy',
      title: '是否包含政府购买服务预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_asset',
      title: '是否包含资产配置',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    // {
    //   field: 'degisn_consideration',
    //   title: '设立依据',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       type: 'text',
    //       placeholder: '请输入：政策依据，具体文件要求，会议要求，对应部门单位职能，工作方案并在项目附件中上传具体依据'
    //     }
    //   }
    // },
    {
      field: 'pro_desc',
      title: '项目概述',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入：项目目标，项目实施方式，项目资金来源及项目风险，项目实施情况等'
        }
      }
    },
    {
      field: 'money_measure',
      title: '经费测算',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          type: 'text',
          placeholder: '请输入经费具体测算方法，测算依据'
        }
      }
    }
    // {
    //   field: 'pro_plan',
    //   title: '项目实施方案',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       type: 'text',
    //       placeholder: '请输入：项目实施地点，项目实施时间，实施方式等'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_necessary',
    //   title: '项目必要性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_feasibility',
    //   title: '项目可行性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // }
  ],
  geninsertFormItems: [
    {
      field: 'pro_cat_',
      title: '项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'PROCAT',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'PROCAT',
            sxspecroleguid: '999004',
            queryConditions: 'and code in (\'1\',\'11\',\'12\',\'2\',\'21\')'
          }
        }
      }
    },
    {
      field: 'exist_statue_code',
      title: '存续状态',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        options: [
          {
            value: '001',
            label: '一次性项目'
          },
          {
            value: '002',
            label: '经常性项目'
          }
          // {
          //   value: '003',
          //   label: '阶段性项目'
          // }
        ],
        props: {
          disabled: true,
          placeholder: '请选择存续状态'
        }
      }
    },
    {
      field: 'payout_kind_',
      title: '支出项目类别',
      span: 8,
      itemRender: {
        name: '$formTreeInput',
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'vw_payoutkind',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'vw_payoutkind',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'pro_code',
      title: '项目代码',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_name',
      title: '项目名称',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'use_agency_name',
      title: '项目单位',
      span: 8,
      itemRender: {
        name: '$input',
        isServer: true,
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'dept_name',
      title: '主管部门',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'mof_dep_name',
      title: '财政内部机构',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_start_year',
      title: '项目起始年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          disabled: true,
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'end_year',
      title: '项目结束年度',
      span: 8,
      itemRender: {
        name: '$vxeFormInput',
        props: {
          disabled: true,
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'pro_term',
      title: '项目期限(年)',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'input',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'pro_total_amt',
      title: '项目金额',
      span: 8,
      formatter: 'formatMoney',
      combinedType: ['average', 'total'],
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'float',
          placeholder: '项目金额'
        }
      }
    },
    {
      field: 'apply_link_man',
      title: '申报单位联系人',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'apply_link_tel',
      title: '申报联系电话',
      span: 16,
      itemRender: {
        name: '$input',
        props: {
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'distri_type_code',
      title: '分配方式',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        props: {
          placeholder: '请选择分配方式',
          disabled: true
        },
        options: [
          {
            value: '1',
            label: '因素法'
          },
          {
            value: '2',
            label: '项目法'
          },
          {
            value: '3',
            label: '因素和项目法'
          }
        ]
      }
    },
    {
      field: 'is_gov',
      title: '是否包含政府采购预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_govbuy',
      title: '是否包含政府购买服务预算',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_asset',
      title: '是否包含资产配置',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    // {
    //   field: 'degisn_consideration',
    //   title: '设立依据',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    {
      field: 'pro_desc',
      title: '项目概述',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'money_measure',
      title: '经费测算',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入经费具体测算方法，测算依据'
        }
      }
    }
    // {
    //   field: 'pro_plan',
    //   title: '项目实施方案',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_necessary',
    //   title: '项目必要性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_feasibility',
    //   title: '项目可行性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // }
  ],
  checkFormItems: [
    {
      field: 'pro_cat_',
      title: '项目类别',
      span: 8,
      itemRender: {
        name: '$treeinput',
        isServer: true,
        elecode: 'PROCAT',
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'PROCAT',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'PROCAT',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'exist_statue_code',
      title: '存续状态',
      span: 8,
      itemRender: {
        name: '$select',
        props: {
          disabled: true,
          isleaf: true,
          type: 'select',
          options: [
            {
              value: '001',
              label: '一次性项目'
            },
            {
              value: '002',
              label: '经常性项目'
            }
            // {
            //   value: '003',
            //   label: '阶段性项目'
            // }
          ],
          placeholder: '请输入存续状态'
        }
      }
    },
    {
      field: 'payout_kind_',
      title: '支出项目类别',
      span: 8,
      itemRender: {
        name: '$treeinput',
        isServer: true,
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'vw_payoutkind',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'vw_payoutkind',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'pro_code',
      title: '项目代码',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    },
    {
      field: 'pro_name',
      title: '项目名称',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'use_agency_',
      title: '项目单位',
      span: 8,
      itemRender: {
        name: '$treeinput',
        isServer: true,
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'AGENCY',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'AGENCY',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'dept_',
      title: '主管部门',
      span: 8,
      itemRender: {
        name: '$treeinput',
        isServer: true,
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'dept',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'dept',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'mof_dep_',
      title: '财政内部机构',
      span: 8,
      itemRender: {
        name: '$treeinput',
        isServer: true,
        props: {
          disabled: true,
          isServer: true,
          isleaf: true,
          elecode: 'DEPARTMENT',
          serverUri: 'fiscal-config/queryTreeAssistData',
          queryparams: {
            useRight: false,
            batchno: 1,
            datatype: 1,
            eleCode: 'DEPARTMENT',
            sxspecroleguid: '999004'
          }
        }
      }
    },
    {
      field: 'pro_start_year',
      title: '项目起始年度',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'end_year',
      title: '项目结束年度',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'year',
          placeholder: '选择日期'
        }
      }
    },
    {
      field: 'pro_term',
      title: '项目期限(年)',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'input',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'pro_total_amt',
      title: '项目金额',
      span: 8,
      formatter: 'formatMoney',
      combinedType: ['average', 'total'],
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'float',
          placeholder: '项目金额'
        }
      }
    },
    {
      field: 'apply_link_man',
      title: '申报单位联系人',
      span: 8,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'apply_link_tel',
      title: '申报联系电话',
      span: 16,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'distri_type_code',
      title: '分配方式',
      span: 8,
      itemRender: {
        name: '$vxeFormSelect',
        props: {
          placeholder: '请选择分配方式',
          disabled: true
        },
        options: [
          {
            value: '1',
            label: '因素法'
          },
          {
            value: '2',
            label: '项目法'
          },
          {
            value: '3',
            label: '因素和项目法'
          }
        ]
      }
    },
    {
      field: 'is_gov',
      title: '是否包含政府采购预算',
      span: 8,
      itemRender: {
        name: '$radio',
        props: {
          disabled: true
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_govbuy',
      title: '是否包含政府购买服务预算',
      span: 8,
      itemRender: {
        name: '$radio',
        props: {
          disabled: true
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    {
      field: 'is_asset',
      title: '是否包含资产配置',
      span: 8,
      itemRender: {
        name: '$vxeFormRadio',
        props: {
          disabled: false
        },
        options: [
          {
            value: '1',
            label: '是'
          },
          {
            value: '0',
            label: '否'
          }]
      }
    },
    // {
    //   field: 'degisn_consideration',
    //   title: '设立依据',
    //   span: 24,
    //   itemRender: {
    //     name: '$input',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },

    {
      field: 'pro_desc',
      title: '项目概述',
      span: 24,
      itemRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text',
          placeholder: '请输入内容'
        }
      }
    },
    {
      field: 'money_measure',
      title: '经费测算',
      span: 24,
      itemRender: {
        name: '$textarea',
        props: {
          disabled: true,

          type: 'text',
          placeholder: '请输入经费具体测算方法，测算依据'
        }
      }
    }
    // {
    //   field: 'pro_plan',
    //   title: '项目实施方案',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,

    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_necessary',
    //   title: '项目必要性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // },
    // {
    //   field: 'pro_feasibility',
    //   title: '项目可行性',
    //   span: 24,
    //   itemRender: {
    //     name: '$textarea',
    //     props: {
    //       disabled: true,
    //       type: 'text',
    //       placeholder: '请输入内容'
    //     }
    //   }
    // }
  ],
  // 表格双向绑定
  insertFormData: {
    agency_id: '',
    agency_code: '',
    agency_name: '',
    pro_cat_: '', // 项目类别
    pro_cat_name: '', // 项目类别
    pro_cat_id: '', // 项目类别
    pro_cat_code: '', // 项目类别
    exist_statue_code: '', // 存续状态
    payout_kind_: '', // 支出项目类别
    payout_kind_name: '', // 支出项目类别
    payout_kind_id: '', // 支出项目类别
    payout_kind_code: '', // 支出项目类别
    pro_code: '', // 项目编码
    pro_name: '', // 项目名称
    use_agency_: '', // 项目单位
    use_agency_name: '', // 项目单位
    use_agency_id: '', // 预算单位
    use_agency_code: '', // 预算单位
    dept_: '', // 主管部门
    dept_name: '', // 主管部门
    dept_id: '', // 主管单位
    dept_code: '', // 主管单位
    mof_dep_: '', // 财政内部机构
    mof_dep_name: '', // 财政内部机构
    mof_dep_id: '', // 财政内部机构
    mof_dep_code: '', // 财政内部机构
    pro_start_year: null, // 项目起始年度
    end_year: null, // 项目结束年度
    pro_term: '', // 项目期限
    pro_total_amt: '', // 项目金额
    apply_link_man: '', // 申报单位联系人
    apply_link_tel: '', // 申报单位联系电话
    is_gov: '0',
    distri_type_code: '2',
    is_govbuy: '0',
    is_asset: '0',
    // degisn_consideration: '', // 设立依据
    pro_desc: '', // 项目概述
    money_measure: ''
    // pro_plan: '',
    // pro_necessary: '',
    // pro_feasibility: ''
  },
  // 表格校验
  formValidationConfig: {
    pro_cat_: [
      {
        required: true,
        type: 'string',
        message: '请先选择项目类别！',
        trigger: 'change'
      }
    ],
    exist_statue_code: [
      {
        required: true,
        type: 'string',
        message: '存续状态不能为空',
        trigger: 'change'
      }
    ],
    payout_kind_: [
      {
        required: true,
        type: 'string',
        message: '支出项目类别不能为空',
        trigger: 'change'
      }
    ],
    pro_name: [
      {
        required: true,
        type: 'string',
        message: '项目名称不能为空',
        trigger: 'change'
      },
      {
        validator: ({ itemValue, rule, rules, data, property }) => {
          return new Promise((resolve, reject) => {
            if (itemValue.replace(/[\u0391-\uFFE5]/g, 'aa').length > 60) {
              reject(new Error('最大汉字长度为60'))
            } else {
              resolve(true)
            }
          })
        },
        trigger: 'change'
      }
    ],
    use_agency_: [
      {
        required: true,
        type: 'string',
        message: '项目单位不能为空',
        trigger: 'change'
      }
    ],
    mof_dep_: [
      {
        required: true,
        type: 'string',
        message: '财政内部机构不能为空',
        trigger: 'change'
      }
    ],
    pro_start_year: [
      {
        required: true,
        type: 'string',
        message: '项目起始年度不能为空',
        trigger: 'change',
        validator: ({ itemValue, rule, rules, data, property }) => {
          // console.log([...arguments])
          return new Promise((resolve, reject) => {
            // debugger
            let userInfo = Store('userInfo')
            if (data.exist_statue_code === '003') {
              let year = itemValue.split('-')[0]
              if (parseInt(year) <= parseInt(userInfo.year)) {
                resolve(true)
              } else {
                reject(
                  new Error(
                    '项目起始年度应小于等于当前预算年度(' +
                             userInfo.year +
                             ')'
                  )
                )
              }
            } else {
              resolve(true)
            }
          })
        }
      }
    ],
    end_year: [
      {
        required: true,
        type: 'string',
        message: '项目结束年度不能为空',
        validator: ({ itemValue, rule, rules, data, property }) => {
          return new Promise((resolve, reject) => {
            if (data.exist_statue_code === '003') {
              if (itemValue > data.pro_start_year) {
                resolve(true)
              } else {
                reject(new Error('项目结束年度应在项目起始年度之后'))
              }
            } else {
              resolve(true)
            }
          })
        },
        trigger: 'change'
      }
    ],
    apply_link_man: [
      {
        required: true,
        type: 'string',
        min: 1,
        max: 60,
        message: '申报单位联系人不能为空,且最大长度为60汉字 ',
        // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
        trigger: 'change'
      }
    ],
    apply_link_tel: [
      {
        required: true,
        type: 'text',
        message: '申报单位联系电话不能为空',
        trigger: 'change'
      },
      {
        validator: ({
          itemValue,
          rule,
          rules,
          data,
          property,
          $form
        }) => {
          return new Promise((resolve, reject) => {
            if (
              $form.$ToolFn.validateFn.validate(
                'isTel',
                itemValue,
                '123',
                function(e) {
                  console.log(e)
                }
              ) === true
            ) {
              resolve(true)
            } else {
              reject(
                new Error('手机号码须11位 ，电话号码 - 不能放在首位')
              )
            }
          })
        },
        trigger: 'change'
      }
    ],
    degisn_consideration: [
      {
        // required: true,
        type: 'string',
        // message: '设立依据不能为空',
        trigger: 'change'
      },
      {
        max: 2000,
        message: '最大长度为2000汉字',
        trigger: 'change'
      }
    ],
    pro_desc: [
      {
        required: true,
        type: 'string',
        message: '项目概述长度不能为空且在300汉字以内',
        trigger: 'change',
        max: 300
      }
    ],
    money_measure: [
      {
        // required: true,
        type: 'string',
        message: '经费测算长度在2000汉字以内',
        // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
        trigger: 'change',
        min: 1,
        max: 2000
      }],
    pro_plan: [
      {
        // required: true,
        type: 'string',
        message: '项目实施方案长度在2000汉字以内',
        // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
        trigger: 'change',
        min: 1,
        max: 2000
      }],
    pro_necessary: [
      {
        // required: true,
        type: 'string',
        message: '项目必要性长度不在2000汉字以内',
        // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
        trigger: 'change',
        min: 1,
        max: 2000
      }],
    pro_feasibility: [
      {
        // required: true,
        type: 'string',
        message: '项目可行性长度在2000汉字以内',
        // pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/i,
        trigger: 'change',
        min: 1,
        max: 2000
      }]
  },
  // 项目测算挑选模板
  projectModeItems: [
    {
      title: '项目类别',
      field: 'pro_cat_name',
      span: 8,
      align: 'left',
      editRender: {
        name: 'text'
      }
    },
    {
      title: '模板名称',
      field: 'draft_template_name',
      span: 8,
      align: 'left',
      editRender: {
        name: 'text'
      }
    }

  ],
  // 资金计划项目
  moneyPlanFormItems: [
    {
      field: 'year',
      title: '年度',
      span: 8,
      editRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      },
      align: 'right'
    },
    {
      field: 'declaration_amt',
      title: '总计',
      span: 6,
      formula: '{support_amount}+{scoi_invest_fund}',
      combinedType: ['average', 'subTotal', 'total', 'totalAll'],
      cellRender: {
        name: '$calculateRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      field: 'support_amount',
      title: '财政拨款',
      span: 8,
      editRender: {
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      field: 'scoi_invest_fund',
      title: '其中：社会投入金额',
      span: 8,
      editRender: {
        name: '$moneyRender',
        props: {
          type: 'float',
          min: 0,
          disabled: false
        }
      },
      align: 'right'
    },
    {
      field: 'remark',
      title: '备注',
      width: 200,
      editRender: {
        name: '$input',
        props: {
          type: 'text',
          disabled: false,
          placeholder: '请输入备注'
        }
      },
      align: 'left'
    }
  ],
  // 查看资金计划项目
  checkMoneyPlanFormItems: [
    {
      field: 'year',
      title: '年度',
      span: 8,
      editRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      },
      align: 'right'
    },
    {
      field: 'declaration_amt',
      title: '总计',
      span: 8,
      formula: '{support_amount}+{scoi_invest_fund}',

      editRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'float'
        }
      },
      align: 'right'
    },
    {
      field: 'support_amount',
      title: '财政拨款',
      span: 8,
      editRender: {
        name: '$moneyRender',
        props: {
          type: 'float',
          // min: 0,
          disabled: true
        }
      },
      align: 'right'
    },
    {
      field: 'scoi_invest_fund',
      title: '其中：社会投入金额',
      span: 8,
      editRender: {
        name: '$moneyRender',
        props: {
          type: 'float',
          min: 0,
          disabled: true
        }
      },
      align: 'right'
    },
    {
      field: 'remark',
      title: '备注',
      width: 200,
      editRender: {
        name: '$input',
        props: {
          type: 'text',
          disabled: true,
          placeholder: '请输入备注'
        }
      },
      align: 'left'
    }
  ],
  // 附件项目
  fileFormItems: [
    {
      field: 'doctype',
      title: '附件类型',
      span: 8,
      cellRender: {
        name: '$select',
        props: {
          type: 'elect',
          disabled: false
        },
        options: [
          {
            value: '政策依据',
            label: '政策依据'
          },
          {
            value: '项目文本',
            label: '项目文本'
          },
          {
            value: '项目评审报告',
            label: '项目评审报告'
          },
          {
            value: '建设内容机关文件',
            label: '建设内容机关文件'
          },
          {
            value: '其他',
            label: '其他'
          }
        ]
      },
      align: 'left'
    },
    {
      field: 'filename',
      title: '附件名称',
      span: 8,
      cellRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      },
      align: 'left'
    }
  ],
  // 查看附件项目
  checkFileFormItems: [
    {
      field: 'doctype',
      title: '附件类型',
      span: 8,
      cellRender: {
        name: '$select',
        props: {
          disabled: true,
          type: 'select',
          options: [
            {
              value: '政策依据',
              label: '政策依据'
            },
            {
              value: '项目文本',
              label: '项目文本'
            },
            {
              value: '项目评审报告',
              label: '项目评审报告'
            },
            {
              value: '建设内容机关文件',
              label: '建设内容机关文件'
            },
            {
              value: '其他',
              label: '其他'
            }
          ]
        }
      }
    },
    {
      field: 'filename',
      title: '附件名称',
      span: 8,
      cellRender: {
        name: '$input',
        props: {
          disabled: true,
          type: 'text'
        }
      }
    }
  ]
}
