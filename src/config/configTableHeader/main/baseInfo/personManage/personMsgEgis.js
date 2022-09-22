// 人员信息审核（主管部门） 表头配置   comer    2020-7-10 11:00
export const columns = [
  {
    title: '姓名',
    field: 'per_name',
    width: 200,
    filters: [
      {
        label: '张三',
        value: '张三',
        checked: true,
        filterMultiple: true,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '证件类型',
    field: 'iden_type_code',
    width: 200,
    filters: [
      {
        label: '身份证',
        value: '身份证',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '驾驶证',
        value: '驾驶证',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '证件号码',
    field: 'iden_no',
    width: 200,
    filters: [
      {
        label: '1',
        value: '1',
        checked: true,
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '2',
        value: '2',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '性别',
    field: 'sex_code',
    width: 200,
    filters: [
      {
        label: '男',
        value: '0',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '女',
        value: '1',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '民族',
    field: 'nat_code',
    width: 200,
    filters: [
      {
        label: '汉族',
        value: '汉族',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '少数民族',
        value: '少数民族',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '学历',
    field: 'sch_rec_code',
    width: 200,
    filters: [
      {
        label: '大专',
        value: '大专',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '本科',
        value: '本科',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '研究生',
        value: '研究生',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '人员状态',
    field: 'per_sta_code',
    width: 200,
    filters: [
      {
        label: '在职',
        value: '0',
        checked: true,
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '离职',
        value: '1',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '职务',
    field: 'pos_code',
    width: 200,
    filters: [
      {
        label: '工程师',
        value: '工程师',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '医生',
        value: '医生',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '职级',
    field: 'gr_code',
    width: 200,
    filters: [
      {
        label: 'A级',
        value: 'A级',
        checked: true,
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]

  },
  {
    title: '人员身份',
    field: 'per_ide_code',
    width: 200,
    filters: [
      {
        label: '公民',
        value: '公民',
        checked: true,
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '单位代码',
    field: 'agency_code',
    width: 200,
    filters: [
      {
        label: '11111',
        value: '22222',
        checked: true,
        filterMultiple: true,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '在职人员来源代码',
    field: 'per_sou_code',
    width: 200,
    filters: [
      {
        label: '服务台',
        value: '服务台',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '是否在编',
    field: 'is_auth',
    width: 200,
    filters: [
      {
        label: '是',
        value: '是',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '否',
        value: '否',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '国籍（地区）',
    field: 'nation',
    width: 200,
    filters: [
      {
        label: '中国',
        value: '中国',
        checked: true,
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '其他国家',
        value: '其他国家',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '参加工作时间',
    field: 'work_init_date',
    width: 200,
    filters: [
      {
        label: '11111',
        value: '22222',
        checked: true,
        filterMultiple: true,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '入职时间',
    field: 'enter_agency_date',
    width: 200,
    filters: [
      {
        label: '2020-1-1',
        value: '2020-1-1',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '工龄',
    field: 'serv_len',
    width: 200,
    filters: [
      {
        label: '1年',
        value: '1年',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '5年',
        value: '5年',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '是否工资统发',
    field: 'is_uni_sala',
    width: 200,
    filters: [
      {
        label: '是',
        value: '是',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '否',
        value: '否',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '技术等级',
    field: 'tec_worker_gr_code',
    width: 200,
    filters: [
      {
        label: '高',
        value: '高',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      },
      {
        label: '低',
        value: '低',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '启用日期',
    field: 'start_date',
    width: 200,
    filters: [
      {
        label: '2020-1-1',
        value: '2020-1-1',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  },
  {
    title: '停用日期',
    field: 'end_date',
    width: 200,
    filters: [
      {
        label: '2020-1-1',
        value: '2020-1-1',
        filterMultiple: false,
        filterMethod: ({ value, row, column }) => { }
      }
    ]
  }
]

export default {
  personMsgEgis: columns
}
