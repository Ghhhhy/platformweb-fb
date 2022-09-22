<!--测试toolbar组件-->
<template>
  <div>
    <div class="test-select-toolbar__content">
      <BsTabPanel
        show-zero
        is-open
        :right-buttons="rightButtons"
        :tab-status-btn-config="tabStatusBtnConfig"
        :buttons-info="buttonsInfo"
        :server-config="serverConfig"
        :tab-status-num-config="tabStatusNumConfig"
      >
        <!-- <template v-slot:preBtns>
          <el-button type="primary" @click="preClick">前置自定义按钮</el-button>
        </template>
        <template v-slot:lastBtns>
          <el-select v-model="value" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template> -->
      </BsTabPanel>
    </div>

  </div>
</template>

<script>
import { statusButtons, curStatusButton, buttons, buttonsMore, buttonsLong, tabStatusNumConfigDefault, buttonsInfos } from './configNew'
import api from '@/api/components/test/toolbar/toolbar'
console.log(statusButtons, curStatusButton, 55, buttons, buttonsMore, buttonsLong)
export default {
  name: '',
  props: {

  },
  data() {
    return {
      rightButtons: buttonsLong,
      buttonsInfo: buttonsInfos,
      tabStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调
        changeBtns: true,
        buttons: statusButtons,
        curButton: curStatusButton,
        buttonsInfo: null,
        methods: {
          bsToolbarClickEvent: this.bsToolbarClickEvent
        }
      },
      // 不传数据，有接口
      serverConfig: {
        isServer: false,
        serverUri: 'fiscal-config/queryTreeAssistData',
        queryparams: {
          type: 2,
          module: 'test'
        }
      },
      tabStatusNumConfig: { ...tabStatusNumConfigDefault }
    }
  },
  methods: {
    // 按钮触发后，第一种回调方式
    noDeal(obj, $this) {
      console.log(55, '回调方式一', obj, $this.$options, $this.$data.curTabSelect.label)
    },
    dealed(obj, $this) {
      console.log(55, '回调方式一', obj, $this.$options, $this.$data.curTabSelect.label)
    },

    // 按钮触发后，第二种回调方式
    bsToolbarClickEvent(obj, $this) {
      console.log(55, '回调方式二', obj, $this.$options, '状态按钮当前为：' + $this.$data.curTabSelect.label)
    },

    // 请求获取状态按钮数量
    getStatusBtnsNum() {
      let self = this
      api.getToolbarTestNum().then(res => {
        if (res.rscode === 200) {
          self.tabStatusNumConfig = res.data
          console.log('5', self.tabStatusNumConfig)
        }
      })
    },

    preClick() {
      console.log('pre前置自定义按钮')
    },
    onChange(item) {
      console.log('后置自定义按钮', item)
    }
  },
  created() {

  },
  mounted() {
    // let self = this
    setTimeout(() => {
      // self.getStatusBtnsNum()
      console.log(555)
      this.buttonsInfo = {
        'ycl': [
          {
            label: '删除修改了',
            code: 'delete'
          }
        ]
      }
    }, 3000)
  },
  watch: {

  }
}
</script>

<style scoped lang="scss">
  .test-select-toolbar__content{
     width: 100%;
    height: 48px;
    background-color: #fff;
    padding: 10px;
  }
</style>
