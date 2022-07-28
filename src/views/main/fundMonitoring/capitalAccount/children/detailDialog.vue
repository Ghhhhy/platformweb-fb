<!--监控规则数据源管理新增页面弹框-->
<template v-loading="tableLoading">
  <vxe-modal
    v-model="detailVisible"
    :title="title"
    width="96%"
    height="90%"
    :show-footer="true"
    @close="dialogClose"
  >
    <BsTable
      ref="mainTableRef"
      :footer-config="tableFooterConfig"
      :table-config="tableConfig"
      :table-columns-config="tableColumnsConfig"
      :table-data="tableData"
      :toolbar-config="tableToolbarConfig"
      :cell-style="cellStyle"
      :pager-config="pagerConfig"
      @cellClick="cellClick"
      @onToolbarBtnClick="onToolbarBtnClick"
    >
      <template v-slot:toolbarSlots>
        <div class="table-toolbar-left">
          <div class="table-toolbar-left-title">
            <span class="fn-inline">{{ title }}(单位:万元)</span>
            <i class="fn-inline"></i>
          </div>
        </div>
      </template>
    </BsTable>
  </vxe-modal>
</template>
<script>
// import HttpModule from '@/api/frame/main/fundMonitoring/budgetImplementationRegion.js'
import proconf from './column.js'
export default {
  name: 'DetailDialog',
  components: {
  },
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    detailData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      detailVisible: true,
      tableFooterConfig: {
        showFooter: false
      },
      tableColumnsConfig: [
      ],
      pagerConfig: {
        autoHidden: true,
        total: 1,
        currentPage: 1,
        pageSize: 999999
      },
      tableData: [],
      tableToolbarConfig: {
        // table工具栏配置
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: false, // 导出
        print: false, // 打印
        zoom: false, // 缩放
        custom: false, // 选配展示列
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      tableConfig: {
        globalConfig: {
          // 全局配置
          seq: true // 序号列
        }
      },
      params: {},
      sDetailTitle: '',
      sDetailVisible: false,
      sDetailData: []
    }
  },
  methods: {
    dialogClose() {
      this.$parent.detailVisible = false
    },
    onToolbarBtnClick({ context, table, code }) {
      switch (code) {
        // 刷新
        case 'refresh':
          this.refresh()
          break
      }
    },
    showInfo() {
      this.tableData = this.detailData
      console.log(proconf)
      switch (this.title) {
        case '支出明细':
          this.tableColumnsConfig = proconf.expenditureColumn
          break
        case '直达资金项目明细':
          this.tableColumnsConfig = proconf.projectColumn
          break
        default:
          break
      }
    },
    handleDetail(type, speTypeCode, mofDivCode) {
      // let params = {
      //   reportCode: type === 'fpAmount' ? 'zdzjzbmx_fdq' : 'zjzcmx_fdq',
      //   speTypeCode: speTypeCode,
      //   mofDivCode: mofDivCode,
      //   fiscalYear: this.$parent.condition.fiscalYear ? this.$parent.condition.fiscalYear[0] : ''
      // }
      this.$parent.sDetailVisible = true
      this.$parent.sDetailType = type
      this.tableLoading = true
      setTimeout(() => {
        this.tableLoading = false
      }, 2000)
      type === 'fpAmount' ? this.$parent.sDetailData = [
        {
          bgtMofDepName: '事业股',
          agencyName: '城固县水磨中心学校',
          speTypeName: '城乡义务教育补助经费',
          xjExpFuncName: '初中教育',
          corBgtDocNo: '陕财办教〔2021〕202号',
          xjCorBgtDocNo: '城财事〔2022〕6号',
          fpAmount: 44937.5,
          payAppAmt: 44937.5,
          sspeTypeName: '城乡义务教育补助经费_教育体育局',
          sSpeTypeName: '城乡义务教育补助经费_教育体育局'
        },
        {
          bgtMofDepName: '事业股',
          agencyName: '城固县原公镇中心学校',
          speTypeName: '城乡义务教育补助经费',
          xjExpFuncName: '小学教育',
          corBgtDocNo: '陕财办教〔2021〕202号',
          xjCorBgtDocNo: '城财事〔2022〕8号',
          fpAmount: 317790,
          payAppAmt: null,
          sspeTypeName: '城乡义务教育补助经费_教育体育局',
          sSpeTypeName: '城乡义务教育补助经费_教育体育局'
        },
        {
          bgtMofDepName: '教科文股',
          agencyName: '扶风县天度镇天度初级中学',
          speTypeName: '城乡义务教育补助经费',
          xjExpFuncName: '其他普通教育支出',
          corBgtDocNo: '陕财办教〔2021〕202号',
          xjCorBgtDocNo: '扶财办教〔2022〕003号',
          fpAmount: 240000,
          payAppAmt: null,
          sspeTypeName: '城乡义务教育补助经费',
          sSpeTypeName: '城乡义务教育补助经费'
        },
        {
          bgtMofDepName: '文教政法股',
          agencyName: '洛川县交口河镇京兆社区中心小学',
          speTypeName: '城乡义务教育补助经费',
          xjExpFuncName: '小学教育',
          corBgtDocNo: '陕财办教〔2021〕202号',
          xjCorBgtDocNo: '洛财办教〔2022〕12号',
          fpAmount: 1250,
          payAppAmt: 1250,
          sspeTypeName: '城乡义务教育补助经费',
          sSpeTypeName: '城乡义务教育补助经费'
        }] : this.$parent.sDetailData = [
        {
          agencyCodeName: '701005-西北妇女儿童医院',
          proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
          amount: 120,
          payAppAmt: '120.00',
          useDes: '专培师资10月份教学补助',
          payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
          payAcctNo: '611301032018160011912',
          payeeAcctName: '柯华',
          payeeAcctNo: '6222600810015893746',
          xpayDate: 1652058360000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 3000,
          payAppAmt: '3000.00',
          useDes: '边志敏医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陈军',
          payeeAcctNo: '6215582605002503274',
          xpayDate: 1652058360000
        },
        {
          agencyCodeName: '733001-陕西省医疗保障局',
          proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
          amount: 22277,
          payAppAmt: '22277.00',
          useDes: '提升医疗服务能力支出',
          payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
          payAcctNo: '129910435710803',
          payeeAcctName: '王五',
          payeeAcctNo: '8945325208886720547',
          xpayDate: 1653286560000
        },
        {
          agencyCodeName: '701001-陕西省卫生健康委员会',
          proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
          amount: 14910000,
          payAppAmt: '14910000.00',
          useDes: '陕财办社【2021】259号卫生健康人才培养',
          payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
          payAcctNo: '102052653886',
          payeeAcctName: '中国人民解放军空军军医大学第一附属医院',
          payeeAcctNo: '3700025209026720547',
          xpayDate: 1653441900000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
          amount: 9006,
          payAppAmt: '9006.00',
          useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '陕西工业大学',
          payeeAcctNo: '61001781300052502618',
          xpayDate: 1647964800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 11000,
          payAppAmt: '11000.00',
          useDes: '王建成医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '张江红',
          payeeAcctNo: '6222032605001373606',
          xpayDate: 1652155560000
        },
        {
          agencyCodeName: '701005-西北妇女儿童医院',
          proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
          amount: 400,
          payAppAmt: '400.00',
          useDes: '专培师资9月份教学补助',
          payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
          payAcctNo: '611301032018160011912',
          payeeAcctName: '郭金珍',
          payeeAcctNo: '6222620810008714376',
          xpayDate: 1652058360000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 10000,
          payAppAmt: '10000.00',
          useDes: '王育升医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '张明强',
          payeeAcctNo: '6222032605000394751',
          xpayDate: 1650211200000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
          amount: 171110,
          payAppAmt: '171110.00',
          useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '延安大学',
          payeeAcctNo: '102085448994',
          xpayDate: 1647964800000
        },
        {
          agencyCodeName: '733001-陕西省医疗保障局',
          proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
          amount: 7390,
          payAppAmt: '7390.00',
          useDes: '提升医疗服务能力支出',
          payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
          payAcctNo: '129910435710803',
          payeeAcctName: '王五',
          payeeAcctNo: '8945325208886720547',
          xpayDate: 1651903140000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
          amount: 14601,
          payAppAmt: '14601.00',
          useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '宝鸡文理学院',
          payeeAcctNo: '102002744693',
          xpayDate: 1647964800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 200000,
          payAppAmt: '200000.00',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西国睿医疗器械有限公司',
          payeeAcctNo: '161363073',
          xpayDate: 1646668800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 11935.53,
          payAppAmt: '11935.53',
          useDes: '付医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '聂文祖',
          payeeAcctNo: '6217232605001754175',
          xpayDate: 1652839560000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
          amount: 9900000,
          payAppAmt: '9900000.00',
          useDes: '免费教科书政府采购',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '陕西新华发行集团有限责任公司',
          payeeAcctNo: '3700020509006501866',
          xpayDate: 1652921940000
        },
        {
          agencyCodeName: '733001-陕西省医疗保障局',
          proCodeName: '610000212000000103337-2021年中央财政医疗服务与保障能力提升',
          amount: 22487,
          payAppAmt: '22487.00',
          useDes: '提升医疗服务能力支出',
          payAcctName: '陕西省医疗保障局（资金性质：零余额账户）',
          payAcctNo: '129910435710803',
          payeeAcctName: '王五',
          payeeAcctNo: '8945325208886720547',
          xpayDate: 1651903200000
        },
        {
          agencyCodeName: '701013-陕西省地方病防治研究所',
          proCodeName: '610000222900000080687-中央基本公共卫生服务补助资金（第一批）',
          amount: 1100,
          payAppAmt: '1100.00',
          useDes: '购《大医马海德》',
          payAcctName: '陕西省地方病防治研究所（资金性质：零余额账户）',
          payAcctNo: '61001711100058011229',
          payeeAcctName: '人民卫生出版社有限公司',
          payeeAcctNo: '11200601040011226',
          xpayDate: 1651721520000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 170666.6,
          payAppAmt: '170666.60',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '渭南九州通正元医药有限公司',
          payeeAcctNo: '102054801652',
          xpayDate: 1646668800000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
          amount: 12387,
          payAppAmt: '12387.00',
          useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '长安大学',
          payeeAcctNo: '307001954208091001',
          xpayDate: 1647964800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 22000,
          payAppAmt: '22000.00',
          useDes: '张毕林医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '晋长德',
          payeeAcctNo: '6217232605000835579',
          xpayDate: 1651108800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 100000,
          payAppAmt: '100000.00',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西津华医药有限公司',
          payeeAcctNo: '61001743700050000711',
          xpayDate: 1646668800000
        },
        {
          agencyCodeName: '701001-陕西省卫生健康委员会',
          proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
          amount: 18765000,
          payAppAmt: '18765000.00',
          useDes: '陕财办社【2021】259号卫生健康人才培养',
          payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
          payAcctNo: '102052653886',
          payeeAcctName: '陕西交通大学医学院第一附属医院',
          payeeAcctNo: '611301051018010041600',
          xpayDate: 1653441900000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 20000,
          payAppAmt: '20000.00',
          useDes: '休养员医疗费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陈军',
          payeeAcctNo: '6215582605002503274',
          xpayDate: 1648483200000
        },
        {
          agencyCodeName: '702003-陕西中医药大学附属医院',
          proCodeName: '610000222900000080681-中央中医药事业发展部分（第一批7215万元）',
          amount: 7095,
          payAppAmt: '7095.00',
          useDes: '知识产权代理费',
          payAcctName: '陕西中医药大学附属医院',
          payAcctNo: '61001636208050000335',
          payeeAcctName: '安徽思真知识产权代理有限公司',
          payeeAcctNo: '8112301011500371629',
          xpayDate: 1651807200000
        },
        {
          agencyCodeName: '716001-社会保障基金财政专户',
          proCodeName: '610000222900000093575-中央财政对2021年调整企业离休干部基本养老金的补助',
          amount: 1240000,
          payAppAmt: '1240000.00',
          useDes: '陕财办社【2022】20号下达2021年调整企业离休干部基本养老金中央财政补助资金',
          payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
          payAcctNo: '26105101040009649',
          payeeAcctName: '陕西省财政厅社会保障基金财政专户',
          payeeAcctNo: '26190501040002609',
          xpayDate: 1648706700000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 7094.5,
          payAppAmt: '7094.50',
          useDes: '付检验费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西金域医学检验所有限公司',
          payeeAcctNo: '103600216906',
          xpayDate: 1650297600000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224737-提前下达2022年城乡义务教育补助经费（家庭经济困难学生生活补助）',
          amount: 138772,
          payAppAmt: '138772.00',
          useDes: '拨付2022年城乡义务教育补助经费（家庭困难学生生活补助）',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '陕西石油普通教育管理移交中心',
          payeeAcctNo: '611301096018010000629',
          xpayDate: 1647964800000
        },
        {
          agencyCodeName: '716001-社会保障基金财政专户',
          proCodeName: '610000222000000206665-企业职工基本养老保险中央财政补助资金',
          amount: 1546580000,
          payAppAmt: '1546580000.00',
          useDes: '陕财办社【2021】236号下达中央财政对企业职工基本养老保险基金的补助',
          payAcctName: '陕西省财政厅（资金性质：财政零余额专用户）',
          payAcctNo: '26105101040009649',
          payeeAcctName: '陕西省财政厅社会保障基金财政专户',
          payeeAcctNo: '3700023309014439883',
          xpayDate: 1646033558000
        },
        {
          agencyCodeName: '702002-陕西省中医医院',
          proCodeName: '610000212000000105165-医疗服务与保障能力提升补助项目',
          amount: 1000,
          payAppAmt: '1000.00',
          useDes: '5月18日孙补助',
          payAcctName: '陕西省中医医院-零余额账户',
          payAcctNo: '3700020509089234012',
          payeeAcctName: '张小俊',
          payeeAcctNo: '6217004220022153666',
          xpayDate: 1652845800000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 106774.4,
          payAppAmt: '106774.40',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西医药控股集团派昂医药有限责任公司',
          payeeAcctNo: '72010154700005365',
          xpayDate: 1646668800000
        },
        {
          agencyCodeName: '208005-陕西科技大学',
          proCodeName: '610000212000000105403-支持地方高校改革发展资金（第二批）（38号）',
          amount: 9750,
          payAppAmt: '9750.00',
          useDes: '3-2662教学管理经费答题纸',
          payAcctName: '陕西科技大学（资金性质：零余额账户）',
          payAcctNo: '61001900041058000003',
          payeeAcctName: '陕西市台江区天宇印务部',
          payeeAcctNo: '3700023509200138595',
          xpayDate: 1648569600000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
          amount: 9833,
          payAppAmt: '9833.00',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '重药控股陕西医药有限公司',
          payeeAcctNo: '611301058018000170816',
          xpayDate: 1646668800000
        },
        {
          agencyCodeName: '701005-西北妇女儿童医院',
          proCodeName: '610000222900000080743-中央卫生健康人才培养（第一批20803万元）',
          amount: 1580,
          payAppAmt: '1580.00',
          useDes: '专培师资7月教学补助',
          payAcctName: '西北妇女儿童医院(资金性质:零余额账户)',
          payAcctNo: '611301032018160011912',
          payeeAcctName: '王五',
          payeeAcctNo: '8945325208886720547',
          xpayDate: 1652058360000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204445-优抚对象抚恤-中央',
          amount: 40290,
          payAppAmt: '40290.00',
          useDes: '付检验费',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西迪安医学检验实验室有限公司',
          payeeAcctNo: '61050174630000000012',
          xpayDate: 1648137600000
        },
        {
          agencyCodeName: '208047-省教育厅财务处',
          proCodeName: '610000222000000224856-2022年义务教育阶段国家课程免费教科书',
          amount: 19800000,
          payAppAmt: '19800000.00',
          useDes: '免费教科书政府采购',
          payAcctName: '陕西省教育厅（资金性质：零余额账户）',
          payAcctNo: '61001910004058006888',
          payeeAcctName: '陕西新华发行集团有限责任公司',
          payeeAcctNo: '3700020509006501866',
          xpayDate: 1652922600000
        },
        {
          agencyCodeName: '177001-中共陕西省委军民融合发展委员会办公室',
          proCodeName: '610000222000000226834-老党员生活补助',
          amount: 10000,
          payAppAmt: '10000.00',
          useDes: '拨付张春荣崔彩凤2021年2022年1至4月生活补贴',
          payAcctName: '中共陕西省委军民融合发展委员会办公室（资金性质：零余额账户）',
          payAcctNo: '61050110427208000001',
          payeeAcctName: '中共中核陕西铀浓缩公司委员会组织部',
          payeeAcctNo: '2606051809026400190',
          xpayDate: 1649260800000
        },
        {
          agencyCodeName: '701001-陕西省卫生健康委员会',
          proCodeName: '610000222900000080741-中央卫生健康人才培养（第一批20803万元）',
          amount: 9960000,
          payAppAmt: '9960000.00',
          useDes: '陕财办社【2021】259号卫生健康人才培养',
          payAcctName: '陕西省卫生健康委员会（资金性质：零余额账户）',
          payAcctNo: '102052653886',
          payeeAcctName: '中国人民解放军空军军医大学第二附属医院',
          payeeAcctNo: '3700020019201236714',
          xpayDate: 1653441900000
        },
        {
          agencyCodeName: '732002-陕西省荣誉军人康复医院',
          proCodeName: '610000222000000204483-优抚对象医疗保障-中央',
          amount: 1161,
          payAppAmt: '1161.00',
          useDes: '付药品款',
          payAcctName: '陕西省荣誉军人康复医院零余额户',
          payAcctNo: '61001647508050000319',
          payeeAcctName: '陕西大正医药有限责任公司',
          payeeAcctNo: '3700022409200007511',
          xpayDate: 1646668800000
        }
      ]
      // HttpModule.queryTableDatas(params).then((res) => {
      //   this.tableLoading = false
      //   if (res.code === '000000') {
      //     this.$parent.sDetailData = res.data
      //     this.$parent.sDetailVisible = true
      //     this.$parent.sDetailType = type
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // })
    },
    cellStyle({ row, rowIndex, column }) {
      if (['fpAmount', 'payAppAmt'].includes(column.property) && column.title === '总金额') {
        return {
          color: '#4293F4',
          textDecoration: 'underline'
        }
      }
    },
    // 表格单元行单击
    cellClick(obj, context, e) {
      let key = obj.column.property
      if (this.title === '直达资金项目明细') {
        switch (key) {
          case 'fpAmount':
            this.handleDetail('fpAmount', obj.row.speTypeCode, obj.row.mofDivCode)
            this.$parent.sDetailTitle = '指标明细'
            break
          case 'payAppAmt':
            this.handleDetail('payAppAmt', obj.row.speTypeCode, obj.row.mofDivCode)
            this.$parent.sDetailTitle = '支出明细'
        }
      }
    }
  },
  mounted() {
    this.showInfo()
  },
  watch: {},
  created() {
  }
}
</script>
<style lang="scss">
.payVoucherInput {
  margin: 15px;
  .el-card {
    margin-top: 0;
  }
}
.vxe-modal--wrapper .vxe-modal--box {
  z-index: 0;
}
#bigbox {
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
}
.el-row-item .font-set-small .hline {
  width: 72px;
}
</style>
