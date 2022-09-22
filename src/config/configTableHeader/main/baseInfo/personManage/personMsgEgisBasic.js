// 页面：基础信息管理 => 人员信息管理 => 人员信息维护
// 人员基本信息表 表头配置 张颖捷 2020-7-13 10:54
export const columns = [
  {
    title: '单位代码',
    field: 'agency_',
    align: 'left',
    width: 200,
    editRender: {
      name: '$treeText',
      props: {
        // noCode: true
      }
    },
    filterRender: {
      name: 'input',
      props: {
        type: 'text',
        placeholder: '请输入关键字'
      }
    },
    filters: [{ data: '' }],
    // obj 中 option 筛选器内容 row 被遍历的列
    filterMethod: obj => {
      // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
      let str = obj.row[obj.column.property + 'code'] + '-' + obj.row[obj.column.property + 'name']
      return !(
        str.search(obj.option.data) === -1
      )
    }
  },
  {
    title: '姓名',
    field: 'per_name',
    width: 130,
    align: 'left',
    editRender: {
      name: '$href'
    },
    filters: [{ data: '' }],
    filterRender: { name: 'FilterInput' }
    // editRender: {
    //   name: '$input'
    // }
    // filterRender: {
    //   name: 'input',
    //   props: {
    //     type: 'text',
    //     placeholder: '请输入关键字'
    //   }
    // },
    // filters: [{ data: '' }],
    // // obj 中 option 筛选器内容 row 被遍历的列
    // filterMethod: obj => {
    //   // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
    //   return !(
    //     obj.row[obj.column.property].search(obj.option.data) === -1
    //   )
    // }
    // filters: [{ data: '' }],
    // filterRender: { name: 'FilterInput' },
    // editRender: {
    //   name: 'input',
    //   defaultValue: '默认的名字',
    //   props: {
    //     type: 'string',
    //     redonly: true,
    //     placeholder: '请输入姓名'
    //   }
    // }
  },
  {
    title: '证件类型',
    field: 'iden_type_code',
    width: 130,
    align: 'left',
    // editRender: {
    //   name: '$select',
    //   options: [
    //     {
    //       value: '1',
    //       label: '身份证'
    //     },
    //     {
    //       value: '2',
    //       label: '护照'
    //     }
    //   ]
    // }
    editRender: {
      name: '$select',
      defaultValue: '009',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('1#身份证+02#学生证+03#工作证+04#士兵证+05#军官证+06#户口本+07#护照'),
      props: {
        placeholder: '请选择证件类型'
      }
    }
  },
  {
    title: '证件号码',
    field: 'iden_no',
    align: 'left',
    width: 200
  },
  {
    title: '性别',
    field: 'sex_code',
    align: 'left',
    width: 100,
    editRender: {
      name: '$select',
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ]
    }
  },
  {
    title: '民族',
    field: 'nat_code',
    width: 130,
    align: 'left',
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#汉族+02#蒙古族+03#回族+04#藏族+05#维吾尔族+06#苗族+07#彝族+08#壮族+09#布依族+10#朝鲜族+11#满族+12#侗族+13#瑶族+14#白族+15#土家族+16#哈尼族+17#哈萨克族+18#傣族+19#黎族+20#傈僳族+21#佤族+22#畲族+23#高山族+24#拉祜族+25#水族+26#东乡族+27#纳西族+28#景颇族+29#柯尔克孜族+30#土族+31#达斡尔族+32#仫佬族+33#羌族+34#布朗族+35#撒拉族+36#毛南族+37#仡佬族+38#锡伯族+39#阿昌族+40#普米族+41#塔吉克族+42#怒族+43#乌孜别克族+44#俄罗斯族+45#鄂温克族+46#德昂族+47#保安族+48#裕固族+49#京族+50#塔塔尔族+51#独龙族+52#鄂伦春族+53#赫哲族+54#门巴族+55#珞巴族+56#基诺族'),
      props: {
        placeholder: '请选择民族'
      }
    }
  },
  {
    title: '学历',
    field: 'sch_rec_code',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      defaultValue: '009',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('10#研究生+12#博士后+13#博士+14#硕士+20#大学本科+21#大学毕业+28#相当大学毕业+29#大学肄业+30#大学专科和专科学校+31#专科毕业+38#相当专科毕业+39#专科肄业+40#中等专业学校和中等技术学校+41#中专毕业+42#中技毕业+48#相当中专或中技毕业+49#中专或中技肄业+50#技工学校+51#技校毕业+59#技校肄业+60#高中+61#高中毕业+62#职高毕业+63#农业高中毕业+68#相当高中毕业+69#高中肄业+70#初中+71#初中毕业+72#职业初中毕业+73#农业初中毕业+78#相当初中毕业+79#初中肄业+80#小学+81#小学毕业+88#相当小学毕业+89#小学肄业+90#文盲或半文盲'),
      props: {
        placeholder: '请选择学历'
      }
    }
  },
  {
    title: '人员状态',
    field: 'per_sta_code',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('1#离休+2#退休+3#在职+4#退职+5#其他'),
      props: {
        placeholder: '请选择人员状态'
      }
    }
  },
  // {
  //   title: '职务',
  //   field: 'pos_code',
  //   width: 200,
  // formatter: (value, column) => {
  //   switch (value.cellValue) {
  //     case '001':
  //       return '科员（行政）'
  //     case '002':
  //       return '正科级（行政）'
  //     case '003':
  //       return '副科级（行政）'
  //     case '004':
  //       return '正处级（行政）'
  //     case '005':
  //       return '副处级（行政）'
  //     case '006':
  //       return '正厅级（行政）'
  //     case '007':
  //       return '副厅级（行政）'
  //     case '008':
  //       return '初级（事业）'
  //     case '009':
  //       return '中级（事业）'
  //   }
  // }
  // },
  {
    title: '职级',
    field: 'gr_code',
    align: 'left',
    width: 200,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#一级高级法官、检察官+02#二级高级法官、检察官+03#三级高级法官、检察官+04#四级高级法官、检察官+05#一级法官、检察官+06#二级法官、检察官+07#三级法官、检察官+08#四级法官、检察官+09#五级法官、检察官+01#高级法官、检察官助理+02#一级法官、检察官助理+03#二级法官、检察官助理+04#三级法官、检察官助理+05#四级法官、检察官助理+06#五级法官、检察官助理+07#六级法官、检察官助理+01#警务技术一级总监+02#警务技术二级总监+03#警务技术一级主任+04#警务技术二级主任+05#警务技术三级主任+06#警务技术四级主任+07#警务技术一级主管+08#警务技术二级主管+09#警务技术三级主管+10#警务技术四级主管+11#警务技术技术员+01#一级警长+02#二级警长+03#三级警长+04#四级警长+05#一级警员+06#二级警员+07#三级警员+01#督办+02#一级高级主办+03#二级高级主办+04#三级高级主办+05#四级高级主办+06#一级主办+07#二级主办+08#三级主办+09#四级主办+10#一级行政执法员+11#二级行政执法员+01#一级警务专员+02#二级警务专员+03#一级高级警长+04#二级高级警长+05#三级高级警长+06#四级高级警长+07#一级警长+08#二级警长+09#三级警长+10#四级警长+11#一级警员+12#二级警员+01#一级巡视员+02#二级巡视员+03#一级调研员+04#二级调研员+05#三级调研员+06#四级调研员+07#一级主任科员+08#二级主任科员+09#三级主任科员+10#四级主任科员+11#一级科员+12#二级科员+01#一级总监+02#二级总监+03#一级高级主管+04#二级高级主管+05#三级高级主管+06#四级高级主管+07#一级主管+08#二级主管+09#三级主管+10#四级主管+11#专业技术员'),
      props: {
        placeholder: '请选择职级'
      }
    }
  },
  {
    title: '人员身份',
    field: 'per_ide_code',
    align: 'left',
    width: 150,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('1#公务员+11#综合管理类+12#专业技术类+13#行政执法类+3#事业管理人员+4#事业专业技术人员+5#机关技术工人+6#机关普通工人+7#事业工人+9#其他人员+91#编外长聘人员+92#遗属+14#执法勤务警员+15#警务技术警员+16#警员职务+41#义务专业技术人员+17#员额内法官、检察官+18#司法辅助人员+2#参照公务员法管理人员'),
      props: {
        placeholder: '请选择人员身份'
      }
    }
  },
  // {
  //   title: '单位代码',
  //   field: 'agency_',
  //   align: 'left',
  //   width: 200,
  //   editRender: {
  //     name: '$treeText',
  //     props: {
  //       // noCode: true
  //     }
  //   },
  //   filterRender: {
  //     name: 'input',
  //     props: {
  //       type: 'text',
  //       placeholder: '请输入关键字'
  //     }
  //   },
  //   filters: [{ data: '' }],
  //   // obj 中 option 筛选器内容 row 被遍历的列
  //   filterMethod: obj => {
  //     // 当被遍历的列（row）的属性（payout_kind_name = obj.column.property） 与筛选器（option）的数据相同时 返回true 返回true的数据会被显示在列表
  //     let str = obj.row[obj.column.property + 'code'] + '-' + obj.row[obj.column.property + 'name']
  //     return !(
  //       str.search(obj.option.data) === -1
  //     )
  //   }
  // },
  {
    title: '在职人员来源代码',
    field: 'per_sou_code',
    align: 'left',
    width: 200,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#招考录用+02#人员调配+03#过渡为国家公务员+04#民师转正+05#部队干部转业+06#大中专毕业分配+07#复退军人安置+08#其他'),
      props: {
        placeholder: '请选择在职人员来源代码'
      }
    }
  },
  {
    title: '是否在编',
    field: 'is_auth',
    align: 'left',
    width: 140,
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
    }
  },
  {
    title: '国籍（地区）',
    field: 'nation',
    align: 'left',
    width: 150,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('001#中国+004#阿富汗+005#阿尔巴尼亚+006#南极洲+007#安道尔+008#美属萨摩亚+009#安哥拉+010#安提瓜+011#阿根廷+012#澳大利亚+013#奥地利+014#巴哈马+015#巴林+016#孟加拉+017#巴巴多斯+018#比利时+019#百慕大+020#不丹+021#玻利维亚+022#博茨瓦纳'),
      props: {
        placeholder: '请选择国籍地区'
      }
    }
  },
  {
    title: '参加工作时间',
    field: 'work_init_date',
    align: 'left',
    width: 160
  },
  {
    title: '入职时间',
    field: 'enter_agency_date',
    align: 'left',
    width: 130
  },
  {
    title: '工龄',
    field: 'serv_len',
    align: 'left',
    width: 130
  },
  {
    title: '是否工资统发',
    field: 'is_uni_sala',
    align: 'left',
    width: 150,
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
    }
  },
  {
    title: '是否领导',
    field: 'is_leader',
    align: 'left',
    width: 140,
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
    }
  },
  {
    title: '技术等级',
    field: 'tec_worker_gr_code',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#高级技师+02#技师+03#高级工+04#中级工+05#初级工+06#学徒人员+07#普通工人'),
      props: {
        placeholder: '请选择技术等级'
      }
    }
  },
  {
    title: '启用日期',
    field: 'start_date',
    align: 'left',
    width: 130
  },
  {
    title: '停用日期',
    field: 'end_date',
    align: 'left',
    width: 130
  },
  // {
  //   title: '所属单位',
  //   field: 'work_company',
  //   align: 'left',
  //   width: 130
  // },
  // {
  //   title: '工资关系所在单位',
  //   field: 'sala_agency_',
  //   align: 'left',
  //   width: 200,
  //   editRender: {
  //     name: '$treeText',
  //     props: {
  //       noCode: true
  //     }
  //   }
  // },
  {
    title: '内设机构',
    field: 'mof_dep_code',
    align: 'left',
    width: 160
  },
  {
    title: '人员排序',
    field: 'pers_sort',
    align: 'left',
    width: 130
  },
  {
    title: '档案出生日期',
    field: 'file_date_birth',
    align: 'left',
    width: 130
  },
  // {
  //   title: '档次',
  //   field: 'grade',
  //   align: 'left',
  //   width: 130,
  //   editRender: {
  //     name: '$select',
  //     options: ((str) => {
  //       return str.split('+').map((item, index) => {
  //         return { value: item.split('#')[0], label: item.split('#')[1] }
  //       })
  //     })('01#1档+02#2档+03#3档+04#4档+05#5档+06#6档+07#7档+08#8档+09#9档+10#10档+11#11档+12#12档+13#13档+14#14档+15#15档+16#16档+17#17档+18#18档+19#19档'),
  //     props: {
  //       placeholder: '请选择档次'
  //     }
  //   }
  // },
  {
    title: '津补贴卡号',
    field: 'subs_card_no',
    align: 'left',
    width: 170
  },
  {
    title: '津补贴职务',
    field: 'subs_position',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#一级高级法官、检察官+02#二级高级法官、检察官+03#三级高级法官、检察官+04#四级高级法官、检察官+05#一级法官、检察官+06#二级法官、检察官+07#三级法官、检察官+08#四级法官、检察官+09#五级法官、检察官+01#高级法官、检察官助理+02#一级法官、检察官助理+03#二级法官、检察官助理+04#三级法官、检察官助理+05#四级法官、检察官助理+06#五级法官、检察官助理+07#六级法官、检察官助理+01#警务技术一级总监+02#警务技术二级总监+03#警务技术一级主任+04#警务技术二级主任+05#警务技术三级主任+06#警务技术四级主任+07#警务技术一级主管+08#警务技术二级主管+09#警务技术三级主管+10#警务技术四级主管+11#警务技术技术员+01#一级警长+02#二级警长+03#三级警长+04#四级警长+05#一级警员+06#二级警员+07#三级警员+01#国家级正职+02#国家级副职+03#省部级正职+04#省部级副职+05#厅局级正职+06#厅局级副职+07#县处级正职+08#县处级副职+09#乡科级正职+10#乡科级副职+11#科员级+12#办事员级+13#未定职公务员+01#督办+02#一级高级主办+03#二级高级主办+04#三级高级主办+05#四级高级主办+06#一级主办+07#二级主办+08#三级主办+09#四级主办+10#一级行政执法员+11#二级行政执法员+01#一级警务专员+02#二级警务专员+03#一级高级警长+04#二级高级警长+05#三级高级警长+06#四级高级警长+07#一级警长+08#二级警长+09#三级警长+10#四级警长+11#一级警员+12#二级警员+01#一级巡视员+02#二级巡视员+03#一级调研员+04#二级调研员+05#三级调研员+06#四级调研员+07#一级主任科员+08#二级主任科员+09#三级主任科员+10#四级主任科员+11#一级科员+12#二级科员+01#一级总监+02#二级总监+03#一级高级主管+04#二级高级主管+05#三级高级主管+06#四级高级主管+07#一级主管+08#二级主管+09#三级主管+10#四级主管+11#专业技术员'),
      props: {
        placeholder: '请选择津补贴职务'
      }
    }
  },
  {
    title: '工资类型',
    field: 'wage_struct',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('xz#行政+sy#事业+gq#工勤+lx#离休+tx#退休+qt#其它'),
      props: {
        placeholder: '请选择工资类型'
      }
    }
  },
  {
    title: '预算科目',
    field: 'budget_account',
    align: 'left',
    width: 130
  },
  {
    title: '人员标识(正常、特殊等)',
    field: 'pers_ident',
    align: 'left',
    width: 240,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('1#正常+2#特殊+3#超档'),
      props: {
        placeholder: '请选择人员标识'
      }
    }
  },
  {
    title: '人员类型',
    field: 'per_type',
    align: 'left',
    width: 130,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('ZT07#注销其它++ZT06#注销辞职+ZT08#注销死亡+ZT05#注销调出+ZT04#本地调出+ZT03#新增+ZT02#调入+ZT01#正常'),
      props: {
        placeholder: '请选择人员类型'
      }
    }
  },
  {
    title: '绩效工资卡号',
    field: 'perf_pay_card_no',
    align: 'left',
    width: 170
  },
  {
    title: '绩效工资岗位',
    field: 'perf_sal_position',
    align: 'left',
    width: 150,
    editRender: {
      name: '$select',
      options: ((str) => {
        return str.split('+').map((item, index) => {
          return { value: item.split('#')[0], label: item.split('#')[1] }
        })
      })('01#1档+02#2档+03#3档+04#4档+05#5档+06#6档+07#7档+08#8档+09#9档+10#10档+11#11档+12#12档+13#13档+14#14档+15#15档+16#16档+17#17档+18#18档+19#19档+01#一级管理（正省）+02#二级管理（副省）+03#三级管理（正厅）+04#四级管理（副厅）+05#五级管理（正处）+06#六级管理（副处）+07#七级管理（正科）+08#八级管理（副科）+09#九级管理（科员）+10#十级管理（办事员）+01#技术工一级（高级技师）+02#技术工二级（技师）+03#技术工三级（高级工）+04#技术工四级（中级工）+05#技术工五级（初级工）+06#普通工+01#一级专技（正高）+02#二级专技（正高）+03#三级专技（正高）+04#四级专技（正高）+05#五级专技（副高）+06#六级专技（副高）+07#七级专技（副高）+08#八级专技（中级）+09#九级专技（中级）+10#十级专技（中级）+11#十一级专技（助级）+12#十二级专技（助级）+13#十三级专技（员级）'),
      props: {
        placeholder: '请选择绩效工资岗位'
      }
    }
  },
  {
    title: '手机号',
    field: 'phone',
    align: 'left',
    width: 130
  },
  {
    title: '工资月份',
    field: 'sala_month',
    align: 'left',
    width: 130
  }
]

export default {
  personMsgEgisBasic: columns
}
