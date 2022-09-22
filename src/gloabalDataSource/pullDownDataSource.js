export const pullConf = {
  // 基础信息管理 => 单位信息管理
  // 部门标识
  capital_type_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'AGENCY',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 财政内部机构
  mof_dep_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'DEPARTMENT',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 单位类型
  agency_type_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'AGENCYTYPE',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 单位行政级别
  agency_adm_level_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'AGENCYADMLEVEL',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 经费供给方式
  fund_guar_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'FUNDSUP',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 单位经费保障方式
  supdep_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'FUNDMODE',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 执行会计制度类型
  executive_acc_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'EXECUTIVEACC',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 国民经济行业分类
  ind_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'IND',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 支出功能分类
  exp_func_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'EXPFUNC',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 单位所在地区划
  location_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'AdmDiv',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 基础信息管理 => 人员信息管理
  // 单位代码
  agency_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'AGENCY',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 工资级别
  sala_gr_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'SALA_GR',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 岗位工资级别
  pos_sala_gr_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'POS_SALA_GR',
      sxspecroleguid: '3250FC3332E1421DA1B0388AA0D34BDC'
    }
  },
  // 基础信息管理 => 支出标准管理
  // 支出标准类别
  vw_bas_exp_cri_type: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'vw_bas_exp_cri_type',
      sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
    }
  },
  // 支出经济分类
  dep_bgt_eco_type_: {
    Origin: 'http://10.100.3.129:8166',
    url: '/queryTreeAssistData',
    methods: 'post',
    requestparams: {
      eleCode: 'DEPBGTECO',
      sxspecroleguid: '637B6D5A823F459AB313CBF94C87765B'
    }
  }
}

export const basicConf = {
  // 基础信息管理 => 单位信息管理
  // 是否编制部门预算
  is_pre_dep_bgt: {
    options: [
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      },
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      }
    ]
  },
  // 是否编制部门决算
  is_pre_depar_fin_accounts: {
    options: [
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      },
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      }
    ]
  },
  // 是否编制政府部门财务报告
  is_pre_fin_rep_gov_dep: {
    options: [
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      },
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      }
    ]
  },
  // 是否编制行政事业单位国有资产报告
  is_pre_sta_own_asse_rep: {
    options: [
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      },
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      }
    ]
  },
  // 基础信息管理 => 人员信息管理
  // 证件类型
  iden_type_code: {
    options: [
      {
        code: 1,
        value: 1,
        name: '身份证',
        label: '身份证'
      },
      {
        code: 2,
        value: 2,
        name: '护照',
        label: '护照'
      }
    ]
  },
  // 性别
  sex_code: {
    options: [
      {
        code: 1,
        value: 1,
        name: '男',
        label: '男'
      },
      {
        code: 2,
        value: 2,
        name: '女',
        label: '女'
      }
    ]
  },
  // 民族
  nat_code: {
    options: [
      {
        code: '001',
        value: '001',
        name: '汉族',
        label: '汉族'
      },
      {
        code: '002',
        value: '002',
        name: '蒙族',
        label: '蒙族'
      },
      {
        code: '003',
        value: '003',
        name: '回族',
        label: '回族'
      },
      {
        code: '004',
        value: '004',
        name: '藏族',
        label: '藏族'
      },
      {
        code: '005',
        value: '005',
        name: '维吾尔族',
        label: '维吾尔族'
      },
      {
        code: '006',
        value: '006',
        name: '苗族',
        label: '苗族'
      },
      {
        code: '007',
        value: '007',
        name: '彝族',
        label: '彝族'
      },
      {
        code: '008',
        value: '008',
        name: '壮族',
        label: '壮族'
      },
      {
        code: '009',
        value: '009',
        name: '布依族',
        label: '布依族'
      },
      {
        code: '010',
        value: '010',
        name: '朝鲜族',
        label: '朝鲜族'
      },
      {
        code: '011',
        value: '011',
        name: '满族',
        label: '满族'
      },
      {
        code: '012',
        value: '012',
        name: '侗族',
        label: '侗族'
      },
      {
        code: '013',
        value: '013',
        name: '瑶族',
        label: '瑶族'
      },
      {
        code: '014',
        value: '014',
        name: '白族',
        label: '白族'
      },
      {
        code: '015',
        value: '015',
        name: '土家族',
        label: '土家族'
      },
      {
        code: '016',
        value: '016',
        name: '哈尼族',
        label: '哈尼族'
      },
      {
        code: '017',
        value: '017',
        name: '哈萨克族',
        label: '哈萨克族'
      },
      {
        code: '018',
        value: '018',
        name: '傣族',
        label: '傣族'
      },
      {
        code: '019',
        value: '019',
        name: '黎族',
        label: '黎族'
      },
      {
        code: '020',
        value: '020',
        name: '傈僳族',
        label: '傈僳族'
      },
      {
        code: '021',
        value: '021',
        name: '佤族',
        label: '佤族'
      },
      {
        code: '022',
        value: '022',
        name: '畲族',
        label: '畲族'
      },
      {
        code: '023',
        value: '03',
        name: '高山族',
        label: '高山族'
      },
      {
        code: '024',
        value: '024',
        name: '拉祜族',
        label: '拉祜族'
      },
      {
        code: '025',
        value: '025',
        name: '水族',
        label: '水族'
      },
      {
        code: '026',
        value: '026',
        name: '东乡族',
        label: '东乡族'
      },
      {
        code: '027',
        value: '027',
        name: '纳西族',
        label: '纳西族'
      },
      {
        code: '028',
        value: '028',
        name: '景颇族',
        label: '景颇族'
      },
      {
        code: '029',
        value: '029',
        name: '柯尔克孜族',
        label: '柯尔克孜族'
      },
      {
        code: '030',
        value: '030',
        name: '土族',
        label: '土族'
      },
      {
        code: '031',
        value: '031',
        name: '达斡尔族',
        label: '达斡尔族'
      },
      {
        code: '032',
        value: '032',
        name: '仫佬族',
        label: '仫佬族'
      },
      {
        code: '033',
        value: '033',
        name: '羌族',
        label: '羌族'
      },
      {
        code: '034',
        value: '034',
        name: '布朗族',
        label: '布朗族'
      },
      {
        code: '035',
        value: '035',
        name: '撒拉族',
        label: '撒拉族'
      },
      {
        code: '036',
        value: '036',
        name: '毛南族',
        label: '毛南族'
      },
      {
        code: '037',
        value: '037',
        name: '仡佬族',
        label: '仡佬族'
      },
      {
        code: '038',
        value: '038',
        name: '锡伯族',
        label: '锡伯族'
      },
      {
        code: '039',
        value: '039',
        name: '阿昌族',
        label: '阿昌族'
      },
      {
        code: '040',
        value: '040',
        name: '普米族',
        label: '普米族'
      },
      {
        code: '041',
        value: '041',
        name: '塔吉克族',
        label: '塔吉克族'
      },
      {
        code: '042',
        value: '042',
        name: '怒族',
        label: '怒族'
      },
      {
        code: '043',
        value: '043',
        name: '乌兹别克族',
        label: '乌兹别克族'
      },
      {
        code: '044',
        value: '044',
        name: '俄罗斯族',
        label: '俄罗斯族'
      },
      {
        code: '045',
        value: '045',
        name: '鄂温克族',
        label: '鄂温克族'
      },
      {
        code: '046',
        value: '046',
        name: '崩龙族',
        label: '崩龙族'
      },
      {
        code: '047',
        value: '047',
        name: '保安族',
        label: '保安族'
      },
      {
        code: '048',
        value: '048',
        name: '裕固族',
        label: '裕固族'
      },
      {
        code: '049',
        value: '049',
        name: '京族',
        label: '京族'
      },
      {
        code: '050',
        value: '050',
        name: '塔塔尔族',
        label: '塔塔尔族'
      },
      {
        code: '051',
        value: '051',
        name: '独龙族',
        label: '独龙族'
      },
      {
        code: '052',
        value: '052',
        name: '鄂伦春族',
        label: '鄂伦春族'
      },
      {
        code: '053',
        value: '053',
        name: '赫哲族',
        label: '赫哲族'
      },
      {
        code: '054',
        value: '054',
        name: '门巴族',
        label: '门巴族'
      },
      {
        code: '055',
        value: '055',
        name: '珞巴族',
        label: '珞巴族'
      },
      {
        code: '056',
        value: '056',
        name: '基诺族',
        label: '基诺族'
      }
    ]
  },
  // 学历
  sch_rec_code: {
    options: [
      {
        code: '001',
        value: '001',
        name: '小学',
        label: '小学'
      },
      {
        code: '002',
        value: '002',
        name: '初中',
        label: '初中'
      },
      {
        code: '003',
        value: '003',
        name: '高中',
        label: '高中'
      },
      {
        code: '004',
        value: '004',
        name: '中专',
        label: '中专'
      },
      {
        code: '005',
        value: '005',
        name: '大专',
        label: '大专'
      },
      {
        code: '006',
        value: '006',
        name: '本科',
        label: '本科'
      },
      {
        code: '007',
        value: '007',
        name: '硕士',
        label: '硕士'
      },
      {
        code: '008',
        value: '008',
        name: '博士',
        label: '博士'
      },
      {
        code: '009',
        value: '009',
        name: '博士后',
        label: '博士后'
      }
    ]
  },
  // 人员状态
  per_sta_code: {
    options: [
      {
        code: 1,
        value: 1,
        name: '离休',
        label: '离休'
      },
      {
        code: 2,
        value: 2,
        name: '退休',
        label: '退休'
      },
      {
        code: 3,
        value: 3,
        name: '在职',
        label: '在职'
      },
      {
        code: 4,
        value: 4,
        name: '退休',
        label: '退休'
      },
      {
        code: 5,
        value: 5,
        name: '临雇',
        label: '临雇'
      },
      {
        code: 9,
        value: 9,
        name: '其他',
        label: '其他'
      }
    ]
  },
  // 职务
  pos_code: {
    options: [
      {
        code: '001',
        value: '001',
        name: '科员（行政）',
        label: '科员（行政）'
      },
      {
        code: '002',
        value: '002',
        name: '正科级（行政）',
        label: '正科级（行政）'
      },
      {
        code: '003',
        value: '003',
        name: '副科级（行政）',
        label: '副科级（行政）'
      },
      {
        code: '004',
        value: '004',
        name: '正处级（行政）',
        label: '正处级（行政）'
      },
      {
        code: '005',
        value: '005',
        name: '副处级（行政）',
        label: '副处级（行政）'
      },
      {
        code: '006',
        value: '006',
        name: '正厅级（行政）',
        label: '正厅级（行政）'
      },
      {
        code: '007',
        value: '007',
        name: '副厅级（行政）',
        label: '副厅级（行政）'
      },
      {
        code: '008',
        value: '008',
        name: '初级（事业）',
        label: '初级（事业）'
      },
      {
        code: '009',
        value: '009',
        name: '中级（事业）',
        label: '中级（事业）'
      },
      {
        code: '010',
        value: '010',
        name: '正高级（事业）',
        label: '正高级（事业）'
      },
      {
        code: '011',
        value: '011',
        name: '副高级（事业）',
        label: '副高级（事业）'
      },
      {
        code: '012',
        value: '012',
        name: '科员（参公）',
        label: '科员（参公）'
      },
      {
        code: '013',
        value: '013',
        name: '正科级（参公）',
        label: '正科级（参公）'
      },
      {
        code: '014',
        value: '014',
        name: '副科级（参公）',
        label: '副科级（参公）'
      },
      {
        code: '015',
        value: '015',
        name: '正处级（参公）',
        label: '正处级（参公）'
      },
      {
        code: '016',
        value: '016',
        name: '副处级（参公）',
        label: '副处级（参公）'
      },
      {
        code: '017',
        value: '017',
        name: '正厅级（参公）',
        label: '正厅级（参公）'
      },
      {
        code: '018',
        value: '018',
        name: '副厅级（参公）',
        label: '副厅级（参公）'
      },
      {
        code: '019',
        value: '019',
        name: '正处（事业）',
        label: '正处（事业）'
      },
      {
        code: '020',
        value: '020',
        name: '副处（事业）',
        label: '副处（事业）'
      },
      {
        code: '021',
        value: '021',
        name: '正科（事业）',
        label: '正科（事业）'
      },
      {
        code: '022',
        value: '022',
        name: '副科（事业）',
        label: '副科（事业）'
      },
      {
        code: '023',
        value: '03',
        name: '科员（事业）',
        label: '科员（事业）'
      }
    ]
  },
  // 职级
  gr_code: {
    options: [
      {
        code: '01',
        value: '01',
        name: '一级巡视员',
        label: '一级巡视员'
      },
      {
        code: '02',
        value: '02',
        name: '二级巡视员',
        label: '二级巡视员'
      },
      {
        code: '03',
        value: '03',
        name: '一级调研员',
        label: '一级调研员'
      },
      {
        code: '04',
        value: '04',
        name: '二级调研员',
        label: '二级调研员'
      },
      {
        code: '05',
        value: '05',
        name: '三级调研员',
        label: '三级调研员'
      },
      {
        code: '06',
        value: '06',
        name: '四级调研员',
        label: '四级调研员'
      },
      {
        code: '07',
        value: '07',
        name: '一级主任科员',
        label: '一级主任科员'
      },
      {
        code: '08',
        value: '08',
        name: '二级主任科员',
        label: '二级主任科员'
      },
      {
        code: '09',
        value: '09',
        name: '三级主任科员',
        label: '三级主任科员'
      },
      {
        code: '10',
        value: '10',
        name: '四级主任科员',
        label: '四级主任科员'
      },
      {
        code: '11',
        value: '11',
        name: '一级科员',
        label: '一级科员'
      },
      {
        code: '12',
        value: '12',
        name: '二级科员',
        label: '二级科员'
      }
    ]
  },
  // 人员身份
  per_ide_code: {
    options: [
      {
        code: '001',
        value: '001',
        name: '公务员',
        label: '公务员'
      },
      {
        code: '002',
        value: '002',
        name: '参（依）照公务员管理人员',
        label: '参（依）照公务员管理人员'
      },
      {
        code: '003',
        value: '003',
        name: '事业管理人员',
        label: '事业管理人员'
      },
      {
        code: '004',
        value: '004',
        name: '事业专业技术人员',
        label: '事业专业技术人员'
      },
      {
        code: '005',
        value: '005',
        name: '技术人员',
        label: '技术人员'
      },
      {
        code: '006',
        value: '006',
        name: '行政工人',
        label: '行政工人'
      },
      {
        code: '007',
        value: '007',
        name: '事业工人',
        label: '事业工人'
      }
    ]
  },
  // 在职人员来源代码
  per_sou_code: {
    options: [
      {
        code: 1,
        value: 1,
        name: '校招',
        label: '校招'
      },
      {
        code: 2,
        value: 2,
        name: '社招',
        label: '社招'
      }
    ]
  },
  // 是否在编
  is_auth: {
    options: [
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      },
      {
        code: 2,
        value: 2,
        name: '否',
        label: '否'
      }
    ]
  },
  // 国籍
  nation: {
    options: [
      {
        code: '01',
        value: '01',
        name: '中国',
        label: '中国'
      },
      {
        code: '02',
        value: '02',
        name: '俄罗斯',
        label: '俄罗斯'
      },
      {
        code: '03',
        value: '03',
        name: '英国',
        label: '英国'
      },
      {
        code: '04',
        value: '04',
        name: '美国',
        label: '美国'
      },
      {
        code: '05',
        value: '05',
        name: '德国',
        label: '德国'
      },
      {
        code: '06',
        value: '06',
        name: '法国',
        label: '法国'
      }
    ]
  },
  // 是否工资统发
  is_uni_sala: {
    options: [
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      },
      {
        code: 2,
        value: 2,
        name: '否',
        label: '否'
      }
    ]
  },
  // 是否特殊岗位
  is_spec_pos: {
    options: [
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      },
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      }
    ]
  },
  // 人员经费保障方式
  fund_mode: {
    options: [
      {
        code: 1,
        value: 1,
        name: '财政全额保障',
        label: '财政全额保障'
      },
      {
        code: 2,
        value: 2,
        name: '财政差额补助',
        label: '财政差额补助'
      },
      {
        code: 3,
        value: 3,
        name: '财政专户资金、单位资金保障',
        label: '财政专户资金、单位资金保障'
      }
    ]
  },
  // 基础信息管理 => 支出标准管理
  // 标准分类
  exp_cri_class: {
    options: [
      {
        code: 1,
        value: 1,
        name: '法定标准',
        label: '法定标准'
      },
      {
        code: 2,
        value: 2,
        name: '固定标准',
        label: '固定标准'
      }
    ]
  },
  // 计算方式
  form: {
    options: [
      {
        code: 1,
        value: 1,
        name: '定额',
        label: '定额'
      },
      {
        code: 2,
        value: 2,
        name: '比例',
        label: '比例'
      },
      {
        code: 3,
        value: 3,
        name: '限额',
        label: '限额'
      }
    ]
  },
  // 是否启用 单选按钮
  is_enabled: {
    options: [
      {
        code: 0,
        value: 0,
        name: '否',
        label: '否'
      },
      {
        code: 1,
        value: 1,
        name: '是',
        label: '是'
      }
    ]
  }
}
