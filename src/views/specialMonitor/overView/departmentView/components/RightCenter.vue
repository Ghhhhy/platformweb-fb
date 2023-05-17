<template>
  <div class="module-wrapper module-left-center">
    <p class="module-title">我的预警处理</p>
    <div style="display: flex; flex-direction: column; justify-content: space-around; flex: 1">
      <div class="processTop">
        <span style="font-size: 16px;">事中监控</span>
        <div style="width:475px margin-top: 100px; display: flex; justify-content: space-around; flex: 1">
          <div v-for="(item,index) of middleList" :key="index">
            <div class="col">
              <div class="module">
                <div class="module-l">
                  <div class="module-l-t">
                    <div :class="[item.name === '待处理' ? 'icon-point' : '','icon-bg']" @click="handleMiddleRouter(item.name)">{{ item.value }}</div>
                  </div>
                </div>
                <div v-if="index < middleList.length - 1" class="module-r">
                  <span class="arrow"></span>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 6px">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="processBottom">
        <span style="font-size: 16px;">事后监控</span>
        <div style="width:475px margin-top: 100px; display: flex; justify-content: space-around; flex: 1">
          <div v-for="(item,index) of afterList" :key="index">
            <div class="col">
              <div class="module">
                <div class="module-l">
                  <div class="module-l-t">
                    <div :class="[item.name === '待处理' ? 'icon-point' : '','icon-bg']" @click="handleAfterRouter(item.name)">{{ item.value }}</div>
                  </div>
                </div>
                <div v-if="index < afterList.length - 1" class="module-r">
                  <span class="arrow"></span>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin-top: 6px">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { myWarningPresentStation } from '@/api/frame/main/specialMonitor/index.js'
import store from '@/store/index'
import router from '@/router'
export default defineComponent({
  setup() {
    // 表格数据
    const middleList = ref([
      {
        name: '经办数',
        value: '0'
      },
      {
        name: '已拦截',
        value: '0'
      },
      {
        name: '已认定',
        value: '0'
      },
      {
        name: '待处理',
        value: '0'
      }
    ])
    const afterList = ref([
      {
        name: '经办数',
        value: '0'
      },
      {
        name: '已拦截',
        value: '0'
      },
      {
        name: '已认定',
        value: '0'
      },
      {
        name: '待处理',
        value: '0'
      }
    ])
    /**
     * 获取数据
     * @return {Promise<void>}
     */
    async function getTableData() {
      const formData = new FormData()
      console.log(store.state)
      formData.append('fiscalYear', store.state.userInfo.year)
      const { data } = await myWarningPresentStation(formData)
      middleList.value?.map((v) => {
        switch (v.name) {
          case '经办数':
            v.value = data[0].warnInfoNum || '0'
            break
          case '已拦截':
            v.value = data[0].interceptNum || '0'
            break
          case '已认定':
            v.value = data[0].processedNum || '0'
            break
          case '待处理':
            v.value = data[0].needProceed || '0'
            break
          default:
            break
        }
      })
      afterList.value?.map((v) => {
        switch (v.name) {
          case '经办数':
            v.value = data[1].warnInfoNum || '0'
            break
          case '已拦截':
            v.value = data[1].interceptNum || '0'
            break
          case '已认定':
            v.value = data[1].processedNum || '0'
            break
          case '待处理':
            v.value = data[1].needProceed || '0'
            break
          default:
            break
        }
      })
    }
    getTableData()
    /**
     * 事中
     * @return {Promise<void>}
     */
    async function handleMiddleRouter(type) {
      if (type !== '待处理') return
      console.log(type)
      router.push({
        name: 'BudgetAccountingWarningDataMagerBySpe'
      })
    }
    /**
     * 事后
     * @return {Promise<void>}
     */
    async function handleAfterRouter(type) {
      if (type !== '待处理') return
      console.log(type)
      router.push({
        name: 'CreateProcessingBySpecial'
      })
    }
    return {
      middleList,
      afterList,
      handleMiddleRouter,
      handleAfterRouter
    }
  }
})
</script>

<style lang="scss" scoped>
@import "../../common/style/module-wrapper";
@import "../../common/style/vxe-table-style";
.module-left-center {
  width: 32%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}
.processTop {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 12px;
}
.processBottom {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 12px;
}
//.module-title {
//  padding-bottom: 14px;
//}
.module{
  .module-r {
    position: absolute;
    top: 8px;
    left: 56px;
  }
  .arrow{
    background: url('./static/arrow.svg');
    display: block;
    width: 37px;
    height: 38px;
    background-size: contain;
    background-repeat: no-repeat;
    line-height: 30px;
    font-size: 18px;
  }
}
.col {
    background: #bfcef6;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #4d77e7;
    position: relative;
  }
.icon-bg {
  font-size: 18px
}
.icon-point {
  text-decoration: underline;
  cursor: pointer;
}
</style>
