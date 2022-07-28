// import store from '@/store/index'
const proconf = {
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
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  statusRightToolBarButtonByBusDept: {
    '1': [
      { code: 'export', label: '导出', status: 'primary' }
    ]
  },
  highQueryConfig: [
    {
      title: '业务年度',
      field: 'fiscalYear',
      width: '8',
      align: 'left',
      formula: '',
      name: '$vxeSelect',
      itemRender: {
        name: '$vxeSelect',
        options: [
          { value: '2020', label: '2020年' },
          { value: '2021', label: '2021年' },
          { value: '2022', label: '2022年' }
        ],
        props: {
          placeholder: '业务年度'
        }
      }
    }
  ],
  highQueryData: {
    fiscalYear: ''
  },
  basicInfo: {
    type: 'form',
    tableConfig: {
      globalConfig: {
        // 全局配置
        seq: true // 序号列
      }
    },
    tableColumnsConfig: [
      {
        title: '地区名称',
        type: 'agencyName',
        align: 'left',
        treeNode: true,
        width: 260,
        field: 'agencyName',
        cellRender: { name: '$vxeIcon' }
      },
      {
        title: '惠企',
        width: 200,
        align: 'center',
        children: [
          {
            title: '惠及企业数',
            field: 'beNumber',
            width: 200
          },
          {
            title: '惠及企业次数',
            field: 'beFrequency',
            width: 200
          },
          {
            title: '惠及企业补助金额',
            field: 'beAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      },
      {
        title: '利民',
        width: 200,
        align: 'center',
        children: [
          {
            title: '惠及人员数',
            field: 'bpNumber',
            width: 200
          },
          {
            title: '惠及人次',
            field: 'bpFrequency',
            width: 200
          },
          {
            title: '惠及人员补助金额',
            field: 'bpAmount',
            width: 200,
            align: 'right',
            cellRender: { name: '$vxeMoney' }
          }
        ]
      }
    ],
    // tableData: []
    // tableData: [
    //   {
    //     agencyName: '省本级',
    //     recDivCode: '610000000',
    //     beNumber: 846,
    //     beFrequency: 9461,
    //     beAmount: 96461694,
    //     bpNumber: 464,
    //     bpFrequency: 4616,
    //     bpAmount: 94615
    //   },
    //   {
    //     agencyName: '西安市本级',
    //     recDivCode: '610100000',
    //     beNumber: 846,
    //     beFrequency: 9461,
    //     beAmount: 96461694,
    //     bpNumber: 464,
    //     bpFrequency: 4616,
    //     bpAmount: 94615
    //   },
    //   {
    //     agencyName: '新城区',
    //     recDivCode: '610102000',
    //     beNumber: 846,
    //     beFrequency: 9461,
    //     beAmount: 96461694,
    //     bpNumber: 464,
    //     bpFrequency: 4616,
    //     bpAmount: 94615
    //   },
    //   {
    //     agencyName: '碑林区',
    //     recDivCode: '610103000',
    //     beNumber: 846,
    //     beFrequency: 9461,
    //     beAmount: 96461694,
    //     bpNumber: 464,
    //     bpFrequency: 4616,
    //     bpAmount: 94615
    //   },
    //   {
    //     agencyName: '莲湖区',
    //     recDivCode: '610104000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '灞桥区',
    //     recDivCode: '610111000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '未央区',
    //     recDivCode: '610112000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '雁塔区',
    //     recDivCode: '610113000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '阎良区',
    //     recDivCode: '610114000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '临潼区',
    //     recDivCode: '610115000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '长安区',
    //     recDivCode: '610116000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '高陵区',
    //     recDivCode: '610117000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '鄠邑区',
    //     recDivCode: '610118000',
    //     beNumber: 846,
    //     beFrequency: 9461,
    //     beAmount: 96461694,
    //     bpNumber: 464,
    //     bpFrequency: 4616,
    //     bpAmount: 94615
    //   },
    //   {
    //     agencyName: '蓝田县',
    //     recDivCode: '610122000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '周至县',
    //     recDivCode: '610124000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市高新区',
    //     recDivCode: '610131000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市经济开发区',
    //     recDivCode: '610132000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市曲江新区',
    //     recDivCode: '610133000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市浐灞生态区',
    //     recDivCode: '610136000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市国际港务区',
    //     recDivCode: '610139000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市航天基地',
    //     recDivCode: '610140000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西安市航空基地',
    //     recDivCode: '610141000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '西咸新区',
    //     recDivCode: '610150000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '铜川市本级',
    //     recDivCode: '610200000',
    //     beNumber: 45,
    //     beFrequency: 54,
    //     beAmount: 44,
    //     bpNumber: 4654,
    //     bpFrequency: 54,
    //     bpAmount: 454646
    //   },
    //   {
    //     agencyName: '王益区',
    //     recDivCode: '610202000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '印台区',
    //     recDivCode: '610203000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '耀州区',
    //     recDivCode: '610204000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '宜君县',
    //     recDivCode: '610222000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '铜川市新区',
    //     recDivCode: '610223000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '宝鸡市本级',
    //     recDivCode: '610300000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 454,
    //     bpFrequency: 6464,
    //     bpAmount: 464645664
    //   },
    //   {
    //     agencyName: '渭滨区',
    //     recDivCode: '610302000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '金台区',
    //     recDivCode: '610303000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '陈仓区',
    //     recDivCode: '610304000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0
    //   },
    //   {
    //     agencyName: '凤翔县',
    //     recDivCode: '610322000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 79171700,
    //     xpayAppAmt: 28207500,
    //     jamount: 152549000,
    //     jAmount: 152549000
    //   },
    //   {
    //     agencyName: '岐山县',
    //     recDivCode: '610323000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 72402600,
    //     xpayAppAmt: 45093370,
    //     jamount: 172800900,
    //     jAmount: 172800900
    //   },
    //   {
    //     agencyName: '扶风县',
    //     recDivCode: '610324000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 242046400,
    //     xpayAppAmt: 153546692.5,
    //     jamount: 417477200,
    //     jAmount: 417477200
    //   },
    //   {
    //     agencyName: '眉县',
    //     recDivCode: '610326000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 27659251,
    //     xpayAppAmt: 27413408,
    //     jamount: 162571200,
    //     jAmount: 162571200
    //   },
    //   {
    //     agencyName: '陇县',
    //     recDivCode: '610327000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 92796200,
    //     xpayAppAmt: 36996794.2,
    //     jamount: 283622400,
    //     jAmount: 283622400
    //   },
    //   {
    //     agencyName: '千阳县',
    //     recDivCode: '610328000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 75481700,
    //     jAmount: 75481700
    //   },
    //   {
    //     agencyName: '麟游县',
    //     recDivCode: '610329000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 49607000,
    //     jAmount: 49607000
    //   },
    //   {
    //     agencyName: '凤县',
    //     recDivCode: '610330000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 52089300,
    //     jAmount: 52089300
    //   },
    //   {
    //     agencyName: '太白县',
    //     recDivCode: '610331000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 22795400,
    //     xpayAppAmt: 14983916.68,
    //     jamount: 129456600,
    //     jAmount: 129456600
    //   },
    //   {
    //     agencyName: '宝鸡市高新区',
    //     recDivCode: '610332000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 27591500,
    //     xpayAppAmt: 19858566.17,
    //     jamount: 38217500,
    //     jAmount: 38217500
    //   },
    //   {
    //     agencyName: '咸阳市本级',
    //     recDivCode: '610400000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 454,
    //     bpFrequency: 6464,
    //     bpAmount: 464645664
    //   },
    //   {
    //     agencyName: '秦都区',
    //     recDivCode: '610402000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 7730907.12,
    //     xpayAppAmt: 89064,
    //     jamount: 183710900,
    //     jAmount: 183710900
    //   },
    //   {
    //     agencyName: '渭城区',
    //     recDivCode: '610404000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 45945990.6,
    //     xpayAppAmt: 12602261.81,
    //     jamount: 88279000,
    //     jAmount: 88279000
    //   },
    //   {
    //     agencyName: '三原县',
    //     recDivCode: '610422000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 152031100,
    //     xpayAppAmt: 129480628.9,
    //     jamount: 315870700,
    //     jAmount: 315870700
    //   },
    //   {
    //     agencyName: '泾阳县',
    //     recDivCode: '610423000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 171481047,
    //     xpayAppAmt: 127993412.03,
    //     jamount: 237233600,
    //     jAmount: 237233600
    //   },
    //   {
    //     agencyName: '乾县',
    //     recDivCode: '610424000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 49610000,
    //     xpayAppAmt: 26015529.68,
    //     jamount: 322307700,
    //     jAmount: 322307700
    //   },
    //   {
    //     agencyName: '礼泉县',
    //     recDivCode: '610425000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 189790000,
    //     xpayAppAmt: 152916011.78,
    //     jamount: 275663900,
    //     jAmount: 275663900
    //   },
    //   {
    //     agencyName: '永寿县',
    //     recDivCode: '610426000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 58241610,
    //     xpayAppAmt: 39623517.07,
    //     jamount: 264847100,
    //     jAmount: 264847100
    //   },
    //   {
    //     agencyName: '长武县',
    //     recDivCode: '610428000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 69038600,
    //     xpayAppAmt: 50741504.94,
    //     jamount: 160049700,
    //     jAmount: 160049700
    //   },
    //   {
    //     agencyName: '旬邑县',
    //     recDivCode: '610429000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 177208100,
    //     xpayAppAmt: 131838500,
    //     jamount: 232705200,
    //     jAmount: 232705200
    //   },
    //   {
    //     agencyName: '淳化县',
    //     recDivCode: '610430000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 137944280,
    //     xpayAppAmt: 76937700.73,
    //     jamount: 340077900,
    //     jAmount: 340077900
    //   },
    //   {
    //     agencyName: '武功县',
    //     recDivCode: '610431000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 143548000,
    //     xpayAppAmt: 112549992.85,
    //     jamount: 500681900,
    //     jAmount: 500681900
    //   },
    //   {
    //     agencyName: '兴平市',
    //     recDivCode: '610481000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 314570700,
    //     jAmount: 314570700
    //   },
    //   {
    //     agencyName: '彬州市',
    //     recDivCode: '610482000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 258880900,
    //     jAmount: 258880900
    //   },
    //   {
    //     agencyName: '渭南市本级',
    //     recDivCode: '610500000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 454,
    //     bpFrequency: 6464,
    //     bpAmount: 464645664
    //   },
    //   {
    //     agencyName: '临渭区',
    //     recDivCode: '610502000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 210780000,
    //     xpayAppAmt: 112900000,
    //     jamount: 507340900,
    //     jAmount: 507340900
    //   },
    //   {
    //     agencyName: '610502',
    //     recDivCode: '610502000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 8039500,
    //     jAmount: 8039500
    //   },
    //   {
    //     agencyName: '华州区',
    //     recDivCode: '610503000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 240714600,
    //     jAmount: 240714600
    //   },
    //   {
    //     agencyName: '610503',
    //     recDivCode: '610503000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 3143400,
    //     jAmount: 3143400
    //   },
    //   {
    //     agencyName: '潼关县',
    //     recDivCode: '610522000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 36447400,
    //     xpayAppAmt: 3193219.21,
    //     jamount: 114220200,
    //     jAmount: 114220200
    //   },
    //   {
    //     agencyName: '610522',
    //     recDivCode: '610522000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 1337000,
    //     xpayAppAmt: 1337000,
    //     jamount: 1337000,
    //     jAmount: 1337000
    //   },
    //   {
    //     agencyName: '大荔县',
    //     recDivCode: '610523000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 94003286.76,
    //     xpayAppAmt: 81252073.86,
    //     jamount: 987493700,
    //     jAmount: 987493700
    //   },
    //   {
    //     agencyName: '610523',
    //     recDivCode: '610523000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 8007200,
    //     jAmount: 8007200
    //   },
    //   {
    //     agencyName: '合阳县',
    //     recDivCode: '610524000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 141748738.2,
    //     xpayAppAmt: 22656381.34,
    //     jamount: 321679600,
    //     jAmount: 321679600
    //   },
    //   {
    //     agencyName: '610524',
    //     recDivCode: '610524000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 4709700,
    //     jAmount: 4709700
    //   },
    //   {
    //     agencyName: '澄城县',
    //     recDivCode: '610525000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 147089693.78,
    //     xpayAppAmt: 31449702.09,
    //     jamount: 333252800,
    //     jAmount: 333252800
    //   },
    //   {
    //     agencyName: '610525',
    //     recDivCode: '610525000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 3647800,
    //     jAmount: 3647800
    //   },
    //   {
    //     agencyName: '蒲城县',
    //     recDivCode: '610526000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 89262006,
    //     xpayAppAmt: 49212391,
    //     jamount: 641589700,
    //     jAmount: 641589700
    //   },
    //   {
    //     agencyName: '610526',
    //     recDivCode: '610526000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 8275100,
    //     jAmount: 8275100
    //   },
    //   {
    //     agencyName: '610527',
    //     recDivCode: '610527000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 1453500,
    //     xpayAppAmt: 1441625,
    //     jamount: 3329300,
    //     jAmount: 3329300
    //   },
    //   {
    //     agencyName: '白水县',
    //     recDivCode: '610527000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 38898410,
    //     xpayAppAmt: 27376967.03,
    //     jamount: 261102800,
    //     jAmount: 261102800
    //   },
    //   {
    //     agencyName: '610528',
    //     recDivCode: '610528000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 8893000,
    //     jAmount: 8893000
    //   },
    //   {
    //     agencyName: '富平县',
    //     recDivCode: '610528000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 932835200,
    //     jAmount: 932835200
    //   },
    //   {
    //     agencyName: '韩城市',
    //     recDivCode: '610581000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 107489408.21,
    //     xpayAppAmt: 93130051.65,
    //     jamount: 656113200,
    //     jAmount: 656113200
    //   },
    //   {
    //     agencyName: '610582',
    //     recDivCode: '610582000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 2280700,
    //     jAmount: 2280700
    //   },
    //   {
    //     agencyName: '华阴市',
    //     recDivCode: '610582000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 30726805,
    //     xpayAppAmt: 26308855.8,
    //     jamount: 200967400,
    //     jAmount: 200967400
    //   },
    //   {
    //     agencyName: '610583',
    //     recDivCode: '610583000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 614700,
    //     jAmount: 614700
    //   },
    //   {
    //     agencyName: '渭南市高新区',
    //     recDivCode: '610583000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 36534200,
    //     jAmount: 36534200
    //   },
    //   {
    //     agencyName: '渭南市经济技术开发区',
    //     recDivCode: '610584000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 2280000,
    //     xpayAppAmt: 2280000,
    //     jamount: 83275900,
    //     jAmount: 83275900
    //   },
    //   {
    //     agencyName: '610584',
    //     recDivCode: '610584000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 989800,
    //     jAmount: 989800
    //   },
    //   {
    //     agencyName: '延安市本级',
    //     recDivCode: '610600000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 454,
    //     bpFrequency: 6464,
    //     bpAmount: 464645664
    //   },
    //   {
    //     agencyName: '宝塔区',
    //     recDivCode: '610602000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 178173000,
    //     xpayAppAmt: 154170280.68,
    //     jamount: 502790600,
    //     jAmount: 502790600
    //   },
    //   {
    //     agencyName: '安塞区',
    //     recDivCode: '610603000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 313509300,
    //     jAmount: 313509300
    //   },
    //   {
    //     agencyName: '延长县',
    //     recDivCode: '610621000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 238848800,
    //     jAmount: 238848800
    //   },
    //   {
    //     agencyName: '延川县',
    //     recDivCode: '610622000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 48010300,
    //     xpayAppAmt: 23254365.62,
    //     jamount: 524591600,
    //     jAmount: 524591600
    //   },
    //   {
    //     agencyName: '志丹县',
    //     recDivCode: '610625000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 230017800,
    //     jAmount: 230017800
    //   },
    //   {
    //     agencyName: '吴起县',
    //     recDivCode: '610626000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 314675400,
    //     jAmount: 314675400
    //   },
    //   {
    //     agencyName: '甘泉县',
    //     recDivCode: '610627000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 32977300,
    //     xpayAppAmt: 8414205.39,
    //     jamount: 190720200,
    //     jAmount: 190720200
    //   },
    //   {
    //     agencyName: '富县',
    //     recDivCode: '610628000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 244337600,
    //     jAmount: 244337600
    //   },
    //   {
    //     agencyName: '洛川县',
    //     recDivCode: '610629000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 38102560,
    //     xpayAppAmt: 13955348.2,
    //     jamount: 249685700,
    //     jAmount: 249685700
    //   },
    //   {
    //     agencyName: '宜川县',
    //     recDivCode: '610630000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 178344400,
    //     jAmount: 178344400
    //   },
    //   {
    //     agencyName: '黄龙县',
    //     recDivCode: '610631000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 46865968,
    //     xpayAppAmt: 9532412.97,
    //     jamount: 185855600,
    //     jAmount: 185855600
    //   },
    //   {
    //     agencyName: '黄陵县',
    //     recDivCode: '610632000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 51131367,
    //     xpayAppAmt: 37314865.95,
    //     jamount: 183338200,
    //     jAmount: 183338200
    //   },
    //   {
    //     agencyName: '子长市',
    //     recDivCode: '610681000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 142575515,
    //     xpayAppAmt: 127642716.6,
    //     jamount: 352776400,
    //     jAmount: 352776400
    //   },
    //   {
    //     agencyName: '汉中市本级',
    //     recDivCode: '610700000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 454,
    //     bpFrequency: 6464,
    //     bpAmount: 464645664
    //   },
    //   {
    //     agencyName: '汉台区',
    //     recDivCode: '610702000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 259400120,
    //     xpayAppAmt: 200452091.28,
    //     jamount: 354012800,
    //     jAmount: 354012800
    //   },
    //   {
    //     agencyName: '南郑区',
    //     recDivCode: '610703000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 327436748,
    //     xpayAppAmt: 223696720.83,
    //     jamount: 456422300,
    //     jAmount: 456422300
    //   },
    //   {
    //     agencyName: '城固县',
    //     recDivCode: '610722000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 298007460,
    //     xpayAppAmt: 195027836.87,
    //     jamount: 400637100,
    //     jAmount: 400637100
    //   },
    //   {
    //     agencyName: '洋县',
    //     recDivCode: '610723000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 227154394,
    //     xpayAppAmt: 83820634.93,
    //     jamount: 337374200,
    //     jAmount: 337374200
    //   },
    //   {
    //     agencyName: '西乡县',
    //     recDivCode: '610724000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 246233995,
    //     xpayAppAmt: 169325463.66,
    //     jamount: 328888000,
    //     jAmount: 328888000
    //   },
    //   {
    //     agencyName: '勉县',
    //     recDivCode: '610725000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 271878800,
    //     xpayAppAmt: 195849144.11,
    //     jamount: 332418800,
    //     jAmount: 332418800
    //   },
    //   {
    //     agencyName: '宁强县',
    //     recDivCode: '610726000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 260036400,
    //     xpayAppAmt: 134252994.4,
    //     jamount: 270486400,
    //     jAmount: 270486400
    //   },
    //   {
    //     agencyName: '略阳县',
    //     recDivCode: '610727000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 99945597.97,
    //     xpayAppAmt: 78589778.37,
    //     jamount: 162917500,
    //     jAmount: 162917500
    //   },
    //   {
    //     agencyName: '镇巴县',
    //     recDivCode: '610728000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 223134550,
    //     xpayAppAmt: 124912450.37,
    //     jamount: 449373600,
    //     jAmount: 449373600
    //   },
    //   {
    //     agencyName: '留坝县',
    //     recDivCode: '610729000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 1558702,
    //     xpayAppAmt: 338467.77,
    //     jamount: 125635800,
    //     jAmount: 125635800
    //   },
    //   {
    //     agencyName: '佛坪县',
    //     recDivCode: '610730000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 25402800,
    //     xpayAppAmt: 8017875.84,
    //     jamount: 82188900,
    //     jAmount: 82188900
    //   },
    //   {
    //     agencyName: '榆林市本级',
    //     recDivCode: '610800000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 1416130100,
    //     bpFrequency: 3040894200,
    //     bpAmount: 1386923474.73,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: 0,
    //     jamount: 6906959300,
    //     jAmount: 6906959300
    //   },
    //   {
    //     agencyName: '榆阳区',
    //     recDivCode: '610802000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 4000000,
    //     xpayAppAmt: 4000000,
    //     jamount: 494769500,
    //     jAmount: 494769500
    //   },
    //   {
    //     agencyName: '横山区',
    //     recDivCode: '610803000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 125890000,
    //     xpayAppAmt: 92966287.29,
    //     jamount: 226284100,
    //     jAmount: 226284100
    //   },
    //   {
    //     agencyName: '府谷县',
    //     recDivCode: '610822000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 214855000,
    //     jAmount: 214855000
    //   },
    //   {
    //     agencyName: '靖边县',
    //     recDivCode: '610824000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 98290000,
    //     xpayAppAmt: 78758845.5,
    //     jamount: 298977960,
    //     jAmount: 298977960
    //   },
    //   {
    //     agencyName: '定边县',
    //     recDivCode: '610825000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 43793750,
    //     xpayAppAmt: 9806881.89,
    //     jamount: 821150560,
    //     jAmount: 821150560
    //   },
    //   {
    //     agencyName: '绥德县',
    //     recDivCode: '610826000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 252763300,
    //     jAmount: 252763300
    //   },
    //   {
    //     agencyName: '米脂县',
    //     recDivCode: '610827000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 15700000,
    //     xpayAppAmt: 1917019.47,
    //     jamount: 162277700,
    //     jAmount: 162277700
    //   },
    //   {
    //     agencyName: '佳县',
    //     recDivCode: '610828000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 412213660,
    //     jAmount: 412213660
    //   },
    //   {
    //     agencyName: '吴堡县',
    //     recDivCode: '610829000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 32220000,
    //     xpayAppAmt: 30471028.87,
    //     jamount: 70472100,
    //     jAmount: 70472100
    //   },
    //   {
    //     agencyName: '清涧县',
    //     recDivCode: '610830000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 124761152.94,
    //     xpayAppAmt: 99139818.94,
    //     jamount: 270820660,
    //     jAmount: 270820660
    //   },
    //   {
    //     agencyName: '子洲县',
    //     recDivCode: '610831000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 192634060,
    //     jAmount: 192634060
    //   },
    //   {
    //     agencyName: '榆横工业区',
    //     recDivCode: '610832000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 39310000,
    //     jAmount: 39310000
    //   },
    //   {
    //     agencyName: '榆神工业区',
    //     recDivCode: '610833000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 413990000,
    //     jAmount: 413990000
    //   },
    //   {
    //     agencyName: '神木市',
    //     recDivCode: '610881000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: null,
    //     jamount: 520875300,
    //     jAmount: 520875300
    //   },
    //   {
    //     agencyName: '安康市本级',
    //     recDivCode: '610900000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 96876368.73,
    //     bpFrequency: 4363132800,
    //     bpAmount: 64096794.24,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: 0,
    //     jamount: 5496237900,
    //     jAmount: 5496237900
    //   },
    //   {
    //     agencyName: '汉滨区财政局',
    //     recDivCode: '610902000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 131653100,
    //     xpayAppAmt: 11478094.69,
    //     jamount: 1127535580,
    //     jAmount: 1127535580
    //   },
    //   {
    //     agencyName: '汉阴县财政局',
    //     recDivCode: '610921000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 91032111.84,
    //     xpayAppAmt: 46934883.11,
    //     jamount: 519075967,
    //     jAmount: 519075967
    //   },
    //   {
    //     agencyName: '石泉县财政局',
    //     recDivCode: '610922000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 18082400,
    //     xpayAppAmt: 116500,
    //     jamount: 330227911,
    //     jAmount: 330227911
    //   },
    //   {
    //     agencyName: '宁陕县',
    //     recDivCode: '610923000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 65513320,
    //     xpayAppAmt: 61524371,
    //     jamount: 203432379,
    //     jAmount: 203432379
    //   },
    //   {
    //     agencyName: '紫阳县',
    //     recDivCode: '610924000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 304880679,
    //     xpayAppAmt: 221136537.12,
    //     jamount: 636075299,
    //     jAmount: 636075299
    //   },
    //   {
    //     agencyName: '岚皋县',
    //     recDivCode: '610925000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 4247900,
    //     xpayAppAmt: 3023657.64,
    //     jamount: 45147900,
    //     jAmount: 45147900
    //   },
    //   {
    //     agencyName: '岚皋县财政局',
    //     recDivCode: '610925000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 15260507,
    //     xpayAppAmt: 10190580.81,
    //     jamount: 192640837,
    //     jAmount: 192640837
    //   },
    //   {
    //     agencyName: '平利县财政局',
    //     recDivCode: '610926000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 81584129,
    //     xpayAppAmt: 24816529.09,
    //     jamount: 401232273,
    //     jAmount: 401232273
    //   },
    //   {
    //     agencyName: '镇坪县财政局',
    //     recDivCode: '610927000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 18155780,
    //     xpayAppAmt: 3846700,
    //     jamount: 140230606,
    //     jAmount: 140230606
    //   },
    //   {
    //     agencyName: '旬阳市财政局',
    //     recDivCode: '610928000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 321439241.19,
    //     xpayAppAmt: 285642526.97,
    //     jamount: 729855010,
    //     jAmount: 729855010
    //   },
    //   {
    //     agencyName: '白河县财政局',
    //     recDivCode: '610929000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 159945100,
    //     xpayAppAmt: 136183389.95,
    //     jamount: 378315778,
    //     jAmount: 378315778
    //   },
    //   {
    //     agencyName: '高新区财政局',
    //     recDivCode: '610930000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: null,
    //     xpayAppAmt: null,
    //     jamount: 59221710,
    //     jAmount: 59221710
    //   },
    //   {
    //     agencyName: '恒口示范区财政局',
    //     recDivCode: '610932000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 35557370,
    //     xpayAppAmt: 7267336.98,
    //     jamount: 65006150,
    //     jAmount: 65006150
    //   },
    //   {
    //     agencyName: '商洛市本级',
    //     recDivCode: '611000000',
    //     beNumber: 5,
    //     beFrequency: 5,
    //     beAmount: 656556,
    //     bpNumber: 373879800,
    //     bpFrequency: 1661379500,
    //     bpAmount: 362957985.79,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: 0,
    //     jamount: 4008224700,
    //     jAmount: 4008224700
    //   },
    //   {
    //     agencyName: '商州区',
    //     recDivCode: '611002000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 345709700,
    //     xpayAppAmt: 220661254,
    //     jamount: 371201700,
    //     jAmount: 371201700
    //   },
    //   {
    //     agencyName: '洛南县',
    //     recDivCode: '611021000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 291030150,
    //     xpayAppAmt: 191120979.58,
    //     jamount: 331178800,
    //     jAmount: 331178800
    //   },
    //   {
    //     agencyName: '丹凤县',
    //     recDivCode: '611022000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 211294816,
    //     xpayAppAmt: 150857665.11,
    //     jamount: 506260900,
    //     jAmount: 506260900
    //   },
    //   {
    //     agencyName: '商南县',
    //     recDivCode: '611023000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 139392751,
    //     xpayAppAmt: 70839198.01,
    //     jamount: 199999900,
    //     jAmount: 199999900
    //   },
    //   {
    //     agencyName: '山阳县',
    //     recDivCode: '611024000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 291692360,
    //     xpayAppAmt: 137300887.87,
    //     jamount: 675945000,
    //     jAmount: 675945000
    //   },
    //   {
    //     agencyName: '镇安县',
    //     recDivCode: '611025000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 252863000,
    //     xpayAppAmt: 117351271.61,
    //     jamount: 508098000,
    //     jAmount: 508098000
    //   },
    //   {
    //     agencyName: '柞水县',
    //     recDivCode: '611026000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 149656500,
    //     xpayAppAmt: 118975195.76,
    //     jamount: 150482000,
    //     jAmount: 150482000
    //   },
    //   {
    //     agencyName: '杨凌示范区',
    //     recDivCode: '611200000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 84634200,
    //     bpFrequency: 59044600,
    //     bpAmount: 83612200,
    //     xbjfpAmount: 0,
    //     xpayAppAmt: 0,
    //     jamount: 263188800,
    //     jAmount: 263188800
    //   },
    //   {
    //     agencyName: '杨陵区财政局',
    //     recDivCode: '611202000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 26624600,
    //     xpayAppAmt: 16748399.47,
    //     jamount: 33864600,
    //     jAmount: 33864600
    //   },
    //   {
    //     agencyName: '杨陵区',
    //     recDivCode: '611202000',
    //     beNumber: 0,
    //     beFrequency: 0,
    //     beAmount: 0,
    //     bpNumber: 0,
    //     bpFrequency: 0,
    //     bpAmount: 0,
    //     xbjfpAmount: 44507000,
    //     xpayAppAmt: 35254130.95,
    //     jamount: 205817000,
    //     jAmount: 205817000
    //   }
    // ]
    tableData: [
      {
        beNumber: 846,
        beFrequency: 9461,
        beAmount: 96461694,
        bpNumber: 464,
        bpFrequency: 4616,
        bpAmount: 94615,
        'recDivCode': '619900000',
        'children': [
          {
            beNumber: 846,
            beFrequency: 9461,
            beAmount: 96461694,
            bpNumber: 464,
            bpFrequency: 4616,
            bpAmount: 94615,
            'recDivCode': '610000000',
            'agencyName': '陕西省本级'
          },
          {
            notHandle: 1,
            handled: 4,
            znotHandle: 0,
            zhandled: 0,
            wnotHandle: 0,
            dhandled: 0,
            whandled: 0,
            dnotHandle: 0,
            'recDivCode': '610000000',
            'children': [
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610100000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610100000',
                    'agencyName': '西安市本级',
                    sPro: 89.9,
                    shPro: 94.8,
                    xPro: 49.8,
                    payPro: 99.4
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610198000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610102000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610102000',
                            'agencyName': '新城区本级',
                            sPro: 89.9,
                            shPro: 94.8,
                            xPro: 49.8,
                            payPro: 99.4
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610102000',
                            'agencyName': '新城区辖区'
                          }
                        ],
                        'agencyName': '新城区',
                        sPro: 89.9,
                        shPro: 94.8,
                        xPro: 49.8,
                        payPro: 99.4
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610103000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610103000',
                            'agencyName': '碑林区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610103000',
                            'agencyName': '碑林区辖区'
                          }
                        ],
                        'agencyName': '碑林区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610104000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610104000',
                            'agencyName': '莲湖区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610104000',
                            'agencyName': '莲湖区辖区'
                          }
                        ],
                        'agencyName': '莲湖区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610111000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610111000',
                            'agencyName': '灞桥区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610111000',
                            'agencyName': '灞桥区辖区'
                          }
                        ],
                        'agencyName': '灞桥区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610112000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610112000',
                            'agencyName': '未央区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610112000',
                            'agencyName': '未央区辖区'
                          }
                        ],
                        'agencyName': '未央区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610113000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610113000',
                            'agencyName': '雁塔区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610113000',
                            'agencyName': '雁塔区辖区'
                          }
                        ],
                        'agencyName': '雁塔区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610114000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610114000',
                            'agencyName': '阎良区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610114000',
                            'agencyName': '颜良区辖区'
                          }
                        ],
                        'agencyName': '阎良区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610115000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610115000',
                            'agencyName': '临潼区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610115000',
                            'agencyName': '临潼区辖区'
                          }
                        ],
                        'agencyName': '临潼区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610116000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610116000',
                            'agencyName': '长安区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610116000',
                            'agencyName': '长安区辖区'
                          }
                        ],
                        'agencyName': '长安区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610117000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610117000',
                            'agencyName': '高陵区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610117000',
                            'agencyName': '高陵区辖区'
                          }
                        ],
                        'agencyName': '高陵区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610118000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610118000',
                            'agencyName': '鄠邑区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610118000',
                            'agencyName': '鄠邑区辖区'
                          }
                        ],
                        'agencyName': '鄠邑区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610122000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610122000',
                            'agencyName': '蓝田县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610122000',
                            'agencyName': '蓝田县辖区'
                          }
                        ],
                        'agencyName': '蓝田县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610124000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610124000',
                            'agencyName': '周至县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610124000',
                            'agencyName': '周至县辖区'
                          }
                        ],
                        'agencyName': '周至县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610131000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610131000',
                            'agencyName': '西安市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610131000',
                            'agencyName': '西安市高新区辖区'
                          }
                        ],
                        'agencyName': '西安市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610132000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610132000',
                            'agencyName': '西安市经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610132000',
                            'agencyName': '西安市经济开发区辖区'
                          }
                        ],
                        'agencyName': '西安市经济开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610133000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610133000',
                            'agencyName': '西安市曲江新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610133000',
                            'agencyName': '西安市曲江新区辖区'
                          }
                        ],
                        'agencyName': '西安市曲江新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610136000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610136000',
                            'agencyName': '西安市浐灞生态区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610136000',
                            'agencyName': '西安市浐灞生态区辖区'
                          }
                        ],
                        'agencyName': '西安市浐灞生态区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610139000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610139000',
                            'agencyName': '西安市国际港务区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610139000',
                            'agencyName': '西安市国际港务区辖区'
                          }
                        ],
                        'agencyName': '西安市国际港务区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610140000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610140000',
                            'agencyName': '西安市航天基地本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610140000',
                            'agencyName': '西安市航天基地辖区'
                          }
                        ],
                        'agencyName': '西安市航天基地'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610141000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610141000',
                            'agencyName': '西安市航空基地本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610141000',
                            'agencyName': '西安市航空基地辖区'
                          }
                        ],
                        'agencyName': '西安市航空基地'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610150000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610150000',
                            'agencyName': '西咸新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610150000',
                            'children': [
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150101',
                                'agencyName': '沣西新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150102',
                                'agencyName': '空港新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150103',
                                'agencyName': '泾河新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150104',
                                'agencyName': '沣东新城本级'
                              },
                              {
                                notHandle: 1,
                                handled: 4,
                                znotHandle: 0,
                                zhandled: 0,
                                wnotHandle: 0,
                                dhandled: 0,
                                whandled: 0,
                                dnotHandle: 0,
                                'recDivCode': '610150105',
                                'agencyName': '秦汉新城本级'
                              }
                            ],
                            'agencyName': '西咸新区辖区'
                          }
                        ],
                        'agencyName': '西咸新区'
                      }
                    ],
                    'agencyName': '西安市辖区'
                  }
                ],
                'agencyName': '西安市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610200000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610200000',
                    'agencyName': '铜川市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610200000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610202000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610202000',
                            'agencyName': '王益区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610202000',
                            'agencyName': '王益区辖区'
                          }
                        ],
                        'agencyName': '王益区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610203000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610203000',
                            'agencyName': '印台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610203000',
                            'agencyName': '印台区辖区'
                          }
                        ],
                        'agencyName': '印台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610204000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610204000',
                            'agencyName': '耀州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610204000',
                            'agencyName': '耀州区辖区'
                          }
                        ],
                        'agencyName': '耀州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610222000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610222000',
                            'agencyName': '宜君县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610222000',
                            'agencyName': '宜君县辖区'
                          }
                        ],
                        'agencyName': '宜君县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610223000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610223000',
                            'agencyName': '铜川新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610223000',
                            'agencyName': '铜川新区辖区'
                          }
                        ],
                        'agencyName': '铜川新区'
                      }
                    ],
                    'agencyName': '铜川市辖区'
                  }
                ],
                'agencyName': '铜川市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610399000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610300000',
                    'agencyName': '宝鸡市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610300000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610302000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610302000',
                            'agencyName': '渭滨区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610302000',
                            'agencyName': '渭滨区辖区'
                          }
                        ],
                        'agencyName': '渭滨区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610303000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610303000',
                            'agencyName': '金台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610303000',
                            'agencyName': '金台区辖区'
                          }
                        ],
                        'agencyName': '金台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610304000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610304000',
                            'agencyName': '陈仓区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610304000',
                            'agencyName': '陈仓区辖区'
                          }
                        ],
                        'agencyName': '陈仓区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610322000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610322000',
                            'agencyName': '凤翔县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610322000',
                            'agencyName': '凤翔县辖区'
                          }
                        ],
                        'agencyName': '凤翔县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610323000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610323000',
                            'agencyName': '岐山县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610323000',
                            'agencyName': '岐山县辖区'
                          }
                        ],
                        'agencyName': '岐山县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610324000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610324000',
                            'agencyName': '扶风县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610324000',
                            'agencyName': '扶风县辖区'
                          }
                        ],
                        'agencyName': '扶风县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610326000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610326000',
                            'agencyName': '眉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610326000',
                            'agencyName': '眉县辖区'
                          }
                        ],
                        'agencyName': '眉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610327000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610327000',
                            'agencyName': '陇县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610327000',
                            'agencyName': '陇县辖区'
                          }
                        ],
                        'agencyName': '陇县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610328000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610328000',
                            'agencyName': '千阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610328000',
                            'agencyName': '千阳县辖区'
                          }
                        ],
                        'agencyName': '千阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610329000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610329000',
                            'agencyName': '麟游县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610329000',
                            'agencyName': '麟游县辖区'
                          }
                        ],
                        'agencyName': '麟游县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610330000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610330000',
                            'agencyName': '凤县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610330000',
                            'agencyName': '凤县辖区'
                          }
                        ],
                        'agencyName': '凤县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610331000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610331000',
                            'agencyName': '太白县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610331000',
                            'agencyName': '太白县辖区'
                          }
                        ],
                        'agencyName': '太白县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610332000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610332000',
                            'agencyName': '宝鸡市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610332000',
                            'agencyName': '宝鸡市高新区辖区'
                          }
                        ],
                        'agencyName': '宝鸡市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610333000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610333000',
                            'agencyName': '宝鸡市蔡家坡经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610333000',
                            'agencyName': '宝鸡市蔡家坡经济开发区辖区'
                          }
                        ],
                        'agencyName': '宝鸡市蔡家坡经济开发区'
                      }
                    ],
                    'agencyName': '宝鸡市辖区'
                  }
                ],
                'agencyName': '宝鸡市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610400000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610400000',
                    'agencyName': '咸阳市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610400000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610402000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610402000',
                            'agencyName': '秦都区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610402000',
                            'agencyName': '秦都区辖区'
                          }
                        ],
                        'agencyName': '秦都区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610404000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610404000',
                            'agencyName': '渭城区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610404000',
                            'agencyName': '渭城区辖区'
                          }
                        ],
                        'agencyName': '渭城区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610422000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610422000',
                            'agencyName': '三原县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610422000',
                            'agencyName': '三原县辖区'
                          }
                        ],
                        'agencyName': '三原县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610423000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610882000',
                            'agencyName': '泾阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610423000',
                            'agencyName': '泾阳县辖区'
                          }
                        ],
                        'agencyName': '泾阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610424000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610424000',
                            'agencyName': '乾县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610424000',
                            'agencyName': '乾县辖区'
                          }
                        ],
                        'agencyName': '乾县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610425000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610425000',
                            'agencyName': '礼泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610425000',
                            'agencyName': '礼泉县辖区'
                          }
                        ],
                        'agencyName': '礼泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610426000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610426000',
                            'agencyName': '永寿县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610426000',
                            'agencyName': '永寿县辖区'
                          }
                        ],
                        'agencyName': '永寿县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610428000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610428000',
                            'agencyName': '长武县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610428000',
                            'agencyName': '长武县辖区'
                          }
                        ],
                        'agencyName': '长武县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610429000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610429000',
                            'agencyName': '旬邑县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610429000',
                            'agencyName': '旬邑县辖区'
                          }
                        ],
                        'agencyName': '旬邑县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610430000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610430000',
                            'agencyName': '淳化县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610430000',
                            'agencyName': '淳化县辖区'
                          }
                        ],
                        'agencyName': '淳化县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610431000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610431000',
                            'agencyName': '武功县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610431000',
                            'agencyName': '武功县辖区'
                          }
                        ],
                        'agencyName': '武功县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610481000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610481000',
                            'agencyName': '兴平市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610481000',
                            'agencyName': '兴平市辖区'
                          }
                        ],
                        'agencyName': '兴平市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610482000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610482000',
                            'agencyName': '彬州市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610482000',
                            'agencyName': '彬州市辖区'
                          }
                        ],
                        'agencyName': '彬州市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610492000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610492000',
                            'agencyName': '咸阳市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610492000',
                            'agencyName': '咸阳市高新区辖区'
                          }
                        ],
                        'agencyName': '咸阳市高新区'
                      }
                    ],
                    'agencyName': '咸阳市辖区'
                  }
                ],
                'agencyName': '咸阳市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610500000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610500000',
                    'agencyName': '渭南市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610500000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610502000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610502000',
                            'agencyName': '临渭区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610502000',
                            'agencyName': '临渭区辖区'
                          }
                        ],
                        'agencyName': '临渭区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610503000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610503000',
                            'agencyName': '华州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610503000',
                            'agencyName': '华州区辖区'
                          }
                        ],
                        'agencyName': '华州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610522000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610522000',
                            'agencyName': '潼关县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610522000',
                            'agencyName': '潼关县辖区'
                          }
                        ],
                        'agencyName': '潼关县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610523000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610523000',
                            'agencyName': '大荔县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610523000',
                            'agencyName': '大荔县辖区'
                          }
                        ],
                        'agencyName': '大荔县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610524000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610524000',
                            'agencyName': '合阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610524000',
                            'agencyName': '合阳县辖区'
                          }
                        ],
                        'agencyName': '合阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610525000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610525000',
                            'agencyName': '澄城县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610525000',
                            'agencyName': '澄城县辖区'
                          }
                        ],
                        'agencyName': '澄城县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610526000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610526000',
                            'agencyName': '蒲城县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610526000',
                            'agencyName': '蒲城县辖区'
                          }
                        ],
                        'agencyName': '蒲城县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610527000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610527000',
                            'agencyName': '白水县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610527000',
                            'agencyName': '白水县辖区'
                          }
                        ],
                        'agencyName': '白水县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610528000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610528000',
                            'agencyName': '富平县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610528000',
                            'agencyName': '富平县辖区'
                          }
                        ],
                        'agencyName': '富平县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610581000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610581000',
                            'agencyName': '韩城市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610581000',
                            'agencyName': '韩城市辖区'
                          }
                        ],
                        'agencyName': '韩城市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610582000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610582000',
                            'agencyName': '华阴市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610582000',
                            'agencyName': '华阴市辖区'
                          }
                        ],
                        'agencyName': '华阴市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610583000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610583000',
                            'agencyName': '渭南市高新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610583000',
                            'agencyName': '渭南市高新区辖区'
                          }
                        ],
                        'agencyName': '渭南市高新区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610584000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610584000',
                            'agencyName': '渭南市经济技术开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610584000',
                            'agencyName': '渭南市经济技术开发区辖区'
                          }
                        ],
                        'agencyName': '渭南市经济技术开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610585000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610585000',
                            'agencyName': '渭南市卤阳湖开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610585000',
                            'agencyName': '渭南市卤阳湖开发区辖区'
                          }
                        ],
                        'agencyName': '渭南市卤阳湖开发区'
                      }
                    ],
                    'agencyName': '渭南市辖区'
                  }
                ],
                'agencyName': '渭南市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610699000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610600000',
                    'agencyName': '延安市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610600000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610602000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610602000',
                            'agencyName': '宝塔区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610602000',
                            'agencyName': '宝塔区辖区'
                          }
                        ],
                        'agencyName': '宝塔区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610603000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610603000',
                            'agencyName': '安塞区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610603000',
                            'agencyName': '安塞区辖区'
                          }
                        ],
                        'agencyName': '安塞区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610621000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610621000',
                            'agencyName': '延长县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610621000',
                            'agencyName': '延长县辖区'
                          }
                        ],
                        'agencyName': '延长县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610622000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610622000',
                            'agencyName': '延川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610622000',
                            'agencyName': '延川县辖区'
                          }
                        ],
                        'agencyName': '延川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610625000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610625000',
                            'agencyName': '志丹县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610625000',
                            'agencyName': '志丹县辖区'
                          }
                        ],
                        'agencyName': '志丹县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610626000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610626000',
                            'agencyName': '吴起县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610626000',
                            'agencyName': '吴起县辖区'
                          }
                        ],
                        'agencyName': '吴起县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610627000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610627000',
                            'agencyName': '甘泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610627000',
                            'agencyName': '甘泉县辖区'
                          }
                        ],
                        'agencyName': '甘泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610628000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610628000',
                            'agencyName': '富县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610628000',
                            'agencyName': '富县辖区'
                          }
                        ],
                        'agencyName': '富县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610629000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610629000',
                            'agencyName': '洛川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610629000',
                            'agencyName': '洛川县辖区'
                          }
                        ],
                        'agencyName': '洛川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610630000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610630000',
                            'agencyName': '宜川县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610630000',
                            'agencyName': '宜川县辖区'
                          }
                        ],
                        'agencyName': '宜川县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610631000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610631000',
                            'agencyName': '黄龙县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610631000',
                            'agencyName': '黄龙县辖区'
                          }
                        ],
                        'agencyName': '黄龙县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610632000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610632000',
                            'agencyName': '黄陵县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610632000',
                            'agencyName': '黄陵县辖区'
                          }
                        ],
                        'agencyName': '黄陵县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610633000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610633000',
                            'agencyName': '延安市经济技术开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610633000',
                            'agencyName': '延安市经济技术开发区辖区'
                          }
                        ],
                        'agencyName': '延安市经济技术开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610681000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610681000',
                            'agencyName': '子长市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610681000',
                            'agencyName': '子长市辖区'
                          }
                        ],
                        'agencyName': '子长市'
                      }
                    ],
                    'agencyName': '延安市辖区'
                  }
                ],
                'agencyName': '延安市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610700000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610700000',
                    'agencyName': '汉中市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610700000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610702000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610702000',
                            'agencyName': '汉台区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610702000',
                            'agencyName': '汉台区辖区'
                          }
                        ],
                        'agencyName': '汉台区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610703101',
                        'agencyName': '南郑区大河坎镇'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610703000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610703000',
                            'agencyName': '南郑区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610703000',
                            'agencyName': '南郑区辖区'
                          }
                        ],
                        'agencyName': '南郑区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610722000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610722000',
                            'agencyName': '城固县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610722000',
                            'agencyName': '城固县辖区'
                          }
                        ],
                        'agencyName': '城固县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610723000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610723000',
                            'agencyName': '洋县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610723000',
                            'agencyName': '洋县辖区'
                          }
                        ],
                        'agencyName': '洋县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610724000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610724000',
                            'agencyName': '西乡县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610724000',
                            'agencyName': '西乡县辖区'
                          }
                        ],
                        'agencyName': '西乡县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610725000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610725000',
                            'agencyName': '勉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610725000',
                            'agencyName': '勉县辖区'
                          }
                        ],
                        'agencyName': '勉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610726000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610726000',
                            'agencyName': '宁强县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610726000',
                            'agencyName': '宁强县辖区'
                          }
                        ],
                        'agencyName': '宁强县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610727000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610727000',
                            'agencyName': '略阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610727000',
                            'agencyName': '略阳县辖区'
                          }
                        ],
                        'agencyName': '略阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610728000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610728000',
                            'agencyName': '镇巴县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610728000',
                            'agencyName': '镇巴县辖区'
                          }
                        ],
                        'agencyName': '镇巴县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610729000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610729000',
                            'agencyName': '留坝县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610729000',
                            'agencyName': '留坝县辖区'
                          }
                        ],
                        'agencyName': '留坝县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610730000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610730000',
                            'agencyName': '佛坪县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610730000',
                            'agencyName': '佛坪县辖区'
                          }
                        ],
                        'agencyName': '佛坪县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610731000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610731000',
                            'agencyName': '汉中市经济开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610731000',
                            'agencyName': '汉中市经济开发区辖区'
                          }
                        ],
                        'agencyName': '汉中市经济开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610732000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610732000',
                            'agencyName': '汉中市兴元新区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610732000',
                            'agencyName': '汉中市兴元新区辖区'
                          }
                        ],
                        'agencyName': '汉中市兴元新区'
                      }
                    ],
                    'agencyName': '汉中市辖区'
                  }
                ],
                'agencyName': '汉中市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610800000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610800000',
                    'agencyName': '榆林市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610800000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610802000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610802000',
                            'agencyName': '榆阳区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610802000',
                            'agencyName': '榆阳区辖区'
                          }
                        ],
                        'agencyName': '榆阳区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610803000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610803000',
                            'agencyName': '横山区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610803000',
                            'agencyName': '横山区辖区'
                          }
                        ],
                        'agencyName': '横山区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610822000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610822000',
                            'agencyName': '府谷县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610822000',
                            'agencyName': '府谷县辖区'
                          }
                        ],
                        'agencyName': '府谷县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610824000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610824000',
                            'agencyName': '靖边县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610824000',
                            'agencyName': '靖边县辖区'
                          }
                        ],
                        'agencyName': '靖边县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610825000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610825000',
                            'agencyName': '定边县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610825000',
                            'agencyName': '定边县辖区'
                          }
                        ],
                        'agencyName': '定边县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610826000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610826000',
                            'agencyName': '绥德县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610826000',
                            'agencyName': '绥德县辖区'
                          }
                        ],
                        'agencyName': '绥德县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610827000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610827000',
                            'agencyName': '米脂县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610827000',
                            'agencyName': '米脂县辖区'
                          }
                        ],
                        'agencyName': '米脂县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610828000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610828000',
                            'agencyName': '佳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610828000',
                            'agencyName': '佳县辖区'
                          }
                        ],
                        'agencyName': '佳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610829000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610829000',
                            'agencyName': '吴堡县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610829000',
                            'agencyName': '吴堡县辖区'
                          }
                        ],
                        'agencyName': '吴堡县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610830000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610830000',
                            'agencyName': '清涧县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610830000',
                            'agencyName': '清涧县辖区'
                          }
                        ],
                        'agencyName': '清涧县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610831000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610831000',
                            'agencyName': '子洲县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610831000',
                            'agencyName': '子洲县辖区'
                          }
                        ],
                        'agencyName': '子洲县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610832000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610832000',
                            'agencyName': '榆横工业区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610832000',
                            'agencyName': '榆横工业区辖区'
                          }
                        ],
                        'agencyName': '榆横工业区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610833000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610833000',
                            'agencyName': '榆神工业区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610833000',
                            'agencyName': '榆神工业区辖区'
                          }
                        ],
                        'agencyName': '榆神工业区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610881000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610881000',
                            'agencyName': '神木市本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610881000',
                            'agencyName': '神木市辖区'
                          }
                        ],
                        'agencyName': '神木市'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610000000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610882000',
                            'agencyName': '大柳塔镇本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610000000',
                            'agencyName': '大柳塔镇辖区'
                          }
                        ],
                        'agencyName': '大柳塔镇'
                      }
                    ],
                    'agencyName': '榆林市辖区'
                  }
                ],
                'agencyName': '榆林市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610900000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610900000',
                    'agencyName': '安康市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610900000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610902000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610902000',
                            'agencyName': '汉滨区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610902000',
                            'agencyName': '汉滨区辖区'
                          }
                        ],
                        'agencyName': '汉滨区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610921000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610921000',
                            'agencyName': '汉阴县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610921000',
                            'agencyName': '汉阴县辖区'
                          }
                        ],
                        'agencyName': '汉阴县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610922000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610922000',
                            'agencyName': '石泉县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610922000',
                            'agencyName': '石泉县辖区'
                          }
                        ],
                        'agencyName': '石泉县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610923000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610923000',
                            'agencyName': '宁陕县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610923000',
                            'agencyName': '宁陕县辖区'
                          }
                        ],
                        'agencyName': '宁陕县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610924000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610924000',
                            'agencyName': '紫阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610924000',
                            'agencyName': '紫阳县辖区'
                          }
                        ],
                        'agencyName': '紫阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610925000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610925000',
                            'agencyName': '岚皋县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610925000',
                            'agencyName': '岚皋县辖区'
                          }
                        ],
                        'agencyName': '岚皋县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610926000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610926000',
                            'agencyName': '平利县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610926000',
                            'agencyName': '平利县辖区'
                          }
                        ],
                        'agencyName': '平利县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610927000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610927000',
                            'agencyName': '镇坪县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610927000',
                            'agencyName': '镇坪县辖区'
                          }
                        ],
                        'agencyName': '镇坪县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610928000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610928000',
                            'agencyName': '旬阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610928000',
                            'agencyName': '旬阳县辖区'
                          }
                        ],
                        'agencyName': '旬阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610929000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610929000',
                            'agencyName': '白河县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610929000',
                            'agencyName': '白河县辖区'
                          }
                        ],
                        'agencyName': '白河县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610930000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610930000',
                            'agencyName': '安康市高新技术产业开发区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610930000',
                            'agencyName': '安康市高新技术产业开发区辖区'
                          }
                        ],
                        'agencyName': '安康市高新技术产业开发区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610932000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610932000',
                            'agencyName': '安康市恒口示范区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610932000',
                            'agencyName': '安康市恒口示范区辖区'
                          }
                        ],
                        'agencyName': '安康市恒口示范区'
                      }
                    ],
                    'agencyName': '安康市辖区'
                  }
                ],
                'agencyName': '安康市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '611000000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '611000000',
                    'agencyName': '商洛市本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '611000000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611002000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611002000',
                            'agencyName': '商州区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611002000',
                            'agencyName': '商州区辖区'
                          }
                        ],
                        'agencyName': '商州区'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611021000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611021000',
                            'agencyName': '洛南县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611021000',
                            'agencyName': '洛南县辖区'
                          }
                        ],
                        'agencyName': '洛南县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611022000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611022000',
                            'agencyName': '丹凤县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611022000',
                            'agencyName': '丹凤县辖区'
                          }
                        ],
                        'agencyName': '丹凤县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611023000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611023000',
                            'agencyName': '商南县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611023000',
                            'agencyName': '商南县辖区'
                          }
                        ],
                        'agencyName': '商南县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611024000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611024000',
                            'agencyName': '山阳县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611024000',
                            'agencyName': '山阳县辖区'
                          }
                        ],
                        'agencyName': '山阳县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611025000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611025000',
                            'agencyName': '镇安县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611025000',
                            'agencyName': '镇安县辖区'
                          }
                        ],
                        'agencyName': '镇安县'
                      },
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '611026000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611026000',
                            'agencyName': '柞水县本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '611026000',
                            'agencyName': '柞水县辖区'
                          }
                        ],
                        'agencyName': '柞水县'
                      }
                    ],
                    'agencyName': '商洛市辖区'
                  }
                ],
                'agencyName': '商洛市'
              },
              {
                notHandle: 1,
                handled: 4,
                znotHandle: 0,
                zhandled: 0,
                wnotHandle: 0,
                dhandled: 0,
                whandled: 0,
                dnotHandle: 0,
                'recDivCode': '610432000',
                'children': [
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610432000',
                    'agencyName': '杨凌示范区本级'
                  },
                  {
                    notHandle: 1,
                    handled: 4,
                    znotHandle: 0,
                    zhandled: 0,
                    wnotHandle: 0,
                    dhandled: 0,
                    whandled: 0,
                    dnotHandle: 0,
                    'recDivCode': '610432000',
                    'children': [
                      {
                        notHandle: 1,
                        handled: 4,
                        znotHandle: 0,
                        zhandled: 0,
                        wnotHandle: 0,
                        dhandled: 0,
                        whandled: 0,
                        dnotHandle: 0,
                        'recDivCode': '610403000',
                        'children': [
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610403000',
                            'agencyName': '杨陵区本级'
                          },
                          {
                            notHandle: 1,
                            handled: 4,
                            znotHandle: 0,
                            zhandled: 0,
                            wnotHandle: 0,
                            dhandled: 0,
                            whandled: 0,
                            dnotHandle: 0,
                            'recDivCode': '610403000',
                            'agencyName': '杨陵区辖区'
                          }
                        ],
                        'agencyName': '杨陵区'
                      }
                    ],
                    'agencyName': '杨凌示范区辖区'
                  }
                ],
                'agencyName': '杨凌示范区'
              }
            ],
            'agencyName': '陕西省辖区',
            sPro: 89.9,
            shPro: 94.8,
            xPro: 49.8,
            payPro: 99.4
          }
        ],
        'agencyName': '陕西省',
        sPro: 89.9,
        shPro: 94.8,
        xPro: 49.8,
        payPro: 99.4
      }
    ]

  }
}
export default function (tableType, configType) {
  if (tableType && configType) {
    return window.deepCopy(proconf[tableType][configType])
  } else if (tableType) {
    return window.deepCopy(proconf[tableType])
  } else {
    return null
  }
}
