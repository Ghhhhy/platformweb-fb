<!--单位用款申请(按计划)录入新增页面弹框-->
<template>
  <vxe-modal
    v-model="ruleModalVisible"
    :title="title"
    v-bind="modalStaticProperty"
  >
    <!-- <div class="TabPanel fsc">
      <div v-for="(item,index) in tabBtnDict" :key="item.value" class="setbtn">
        <div class="tabone" :class="{ 'active': activeIndex === index }" @click="activeIndex = index">{{ item.tabLabel }}</div>
      </div>
    </div> -->
    <ruleDefinition v-show="tabBtnDict[activeIndex].value === 'ruleDefinition'" ref="ruleDefinition" v-model="ruleDefinitionData" />
  </vxe-modal>
</template>
<script>
import ruleDefinition from './ruleDefinition.vue'
export default {
  components: {
    ruleDefinition
  },
  props: {
    value: { // 父级v-model弹窗显隐
      type: Boolean,
      default: false
    },
    showType: {
      type: String,
      default: 'detail'
    },
    // eslint-disable-next-line
    regulationCode:{
      type: String,
      default: ''
    }
  },
  computed: {
    // v-model的单向数据流
    ruleModalVisible: {
      get() {
        return this.value
      },
      set(val) {
        if (val) this.queryRuleDetail()
        this.$refs.ruleDefinition.resetFormDataListMessage()
        this.$emit('input', val)
      }
    },
    title() {
      return this.showTypeMap[this.showType].title
    }
  },

  data() {
    return {
      // ------------
      ruleDefinitionData: {},
      activeIndex: 1,
      modalStaticProperty: {
        width: '96%',
        height: '90%',
        showFooter: false
      },
      tabBtnDict: [
        { tabLabel: '模板信息', value: 'templateInformation' },
        { tabLabel: '规则定义', value: 'ruleDefinition' },
        { tabLabel: '白名单', value: 'whiteList' },
        { tabLabel: '生效范围', value: 'effectiveScope' }
      ],
      showTypeMap: {
        add: {
          title: '新增'
        },
        edit: {
          title: '编辑'
        },
        detail: {
          title: '查看详情'
        }
      }

      // -----------
    }
  },
  mounted() {

  },
  methods: {
    resetFormDataListMessage() {

    },
    queryRuleDetail() {
      this.$http.get(BSURL.lmp_regulationDetailfj + this.regulationCode).then(res => {
        if (res.code === '000000') {
          const defaultValue = { ZCBZ: '1', uploadFile: Number(res.data.uploadFile) }
          this.ruleDefinitionData = { ...res.data, ...defaultValue }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .TabPanel{
    width:100%;
    height:45px;
    .setbtn{
      width:100px;
      height:45px;
      margin-right:20px;
      .tabone{
        width:100px;
        height:40px;
        text-align:center;
        line-height:40px;
        border:1px solid #ccc;
        border-radius:4px;
      }
      .active{
        background-color:#f2f2f2;
      }
    }
  }
  .el-main {
    overflow: visible;
  }
  .showMore {
    min-width: 293px;
    height: 40px;
    line-height:40px;
    background: #000 !important;
    color: #fff;
    text-align:center;
    border-radius:5px;
    font-size:12px;
    position:absolute;
    top:-40px;
    z-index:1000;
    display:none;
    white-space:nowrap;
  }
  #nameId:hover .showMore{
    display: block;
  }
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
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
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
  .vxe-toolbar{
    .vxe-button--wrapper{
      display:flex;
          justify-Content: end;
    }
  }
</style>
