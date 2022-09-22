<!--测试toolbar组件-->
<template>
  <div>
    <!-- <BsToolBar v-model="isAsideClose" :tab-status-btn-config="tabStatusBtnConfig" :right-buttons="rightButtons" is-hide /> -->
    <div style="padding: 0 20px;background-color:#fff;">
      <BsToolBar
        v-model="isAsideClose"
        top-tip
        show-zero
        :right-buttons="rightButtons"
        :tab-status-btn-config="tabStatusBtnConfig"
        :server-config="serverConfig"
        :tab-status-num-config="tabStatusNumConfig"
        @onAsideChange="asideChange"
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
      </BsToolBar>
    </div>

  </div>
</template>

<script>
import { statusButtons, curStatusButton, buttons, buttonsMore, buttonsLong, tabStatusNumConfigDefault } from './config'
import api from '@/api/components/test/toolbar/toolbar'
console.log(statusButtons, curStatusButton, 55, buttons, buttonsMore, buttonsLong)
export default {
  name: '',
  props: {

  },
  data() {
    return {
      isAsideClose: false,
      rightButtons: buttonsLong,
      tabStatusBtnConfig: {
        // 状态按钮和左侧按钮触发后回调，方式一
        // buttons: [
        //   {
        //     label: '未处理',
        //     code: 'wcl',
        //     callback: this.noDeal
        //   },
        //   {
        //     label: '已处理',
        //     code: 'ycl',
        //     callback: this.dealed
        //   }
        // ],
        // curButton: {
        //   label: '未处理',
        //   code: 'wcl',
        //   callback: this.noDeal
        // }

        // 状态按钮和左侧按钮触发后回调，方式二
        changeBtns: false,
        limit: 6,
        buttons: statusButtons,
        curButton: curStatusButton,
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
      tabStatusNumConfig: { ...tabStatusNumConfigDefault },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '选项1'

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

    // 折叠按钮事件回调处理，方式一
    asideChange(isClose) {
      console.log(11, isClose)
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
    let self = this
    setTimeout(() => {
      self.getStatusBtnsNum()
    }, 3000)
  },
  watch: {
    // 折叠按钮事件回调处理，方式一
    isAsideClose(val) {
      console.log(1, val)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
