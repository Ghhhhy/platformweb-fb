<template>
  <vxe-modal
    v-model="dialogVisible"
    title="infortable-xh"
    width="90%"
    :position="{ top: '100px',left: '5%' }"
    resize
    remember
    storage
    transfer
  >
    <div class="">
      <div class="option-line-group">
        <div class="fn-inline option-line-group-btn">
          <vxe-button status="primary" @click="onSureClick">确 定</vxe-button>
          <vxe-button code="reset" @click="dialogVisible = false">取 消</vxe-button>
        </div>
      </div>
      <BsTab :tab-list="tabList" tab-class="main-modulebox-tab" :default-select="TabSelect" @onTabClick="onTabClick" />
      <div class="main-modulebox-tabcon">
        <div v-show="TabSelect.code === 'Dnzcxmys'">
          <Dnzcxmys :tab-select.sync="tabList[0]" />
        </div>
        <div v-show="TabSelect.code === 'Ryxxhd'">
          <Ryxxhd :tab-select.sync="tabList[1]" />
        </div>
      </div>
    </div>
  </vxe-modal>

</template>

<script>
import Dnzcxmys from './tab/dnzcys/DnzcxmysOption'
import Ryxxhd from './tab/ryxxhd/Ryxxhd.vue'
export default {
  name: 'Infortable',
  components: {
    Dnzcxmys,
    Ryxxhd
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      tabList: [
        {
          label: '当年支出预算',
          code: 'Dnzcxmys',
          component: 'Dnzcxmys'
        },
        {
          label: '人员信息核对',
          code: 'Ryxxhd',
          component: 'Ryxxhd'
        }
      ],
      TabSelect: {
        label: '当年支出项目预算',
        code: 'dnzcxmys',
        component: 'Dnzcxmys'
      }
    }
  },
  methods: {
    onTabClick(obj) {
      this.TabSelect = obj
      this.tabList[1].isHide = true
      this.curTabComponent = obj.component
    },
    onBeforeCloseClick() {
    },
    onSureClick() {
      this.dialogVisible = false
    }
  },
  mounted() {},
  watch: {
    dialogVisible: {
      handler(newval) {
        this.$emit('update:dialogVisible', newval)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
