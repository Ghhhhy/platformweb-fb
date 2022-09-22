<template>
  <!-- 上部tab 审核信息 归档信息 -->
  <div class="my-tab">
    <div v-show="treeSwitch" class="tree-switch" @click="switchTree">
      <img src="./catalog.png">
    </div>
    <div v-for="item in tabList" :key="item.code" :class="curTabSelect.code === item.code ? 'my-tab-tabItem my-tab-active' : 'my-tab-tabItem' " @click="onTabElClick(item)">
      <span class="label">{{ item.label }}</span>
      <span class="bubble">10</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: [Array, Object],
      default() {
        return [
          {
          }
        ]
      }
    },
    treeSwitch: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted() {
    this.curTabSelect = this.tabList[0]
    console.log(this.curTabSelect)
    console.log(this.tabList[0])
  },
  data() {
    return {
      curTabSelect: {}
    }
  },
  methods: {
    onTabElClick(obj) {
      this.curTabSelect = Object.assign({}, obj)
      this.$emit('onTabClick', obj)
    },
    // 控制左侧树的显示与隐藏
    switchTree() {
      this.$emit('switchTree')
    }
  }
}
</script>
<style>
.my-tab{
  margin-top: 15px;
  width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.my-tab-tabItem{
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 5px;
  cursor: pointer;
  background:url("./folder-w.png") no-repeat;
  background-size: 60px;
  width: 58px;
  height: 52px;
  transition: 0.3s;
}
.my-tab-active{
  background:url("./folder-b.png") no-repeat;
  background-size: 60px;
   transform: scale(1.05);

}
.my-tab-active.my-tab-active .label{
  top: 22px;
  font-size: 13px;
  font-weight: 600;
  width: 50px;
  white-space: nowrap;

}
.my-tab-tabItem .label{
    font-weight: 500;
    font-size: 12px;
    color: #F4F4F6;
    position: absolute;
    top: 17px;
    width: 48px;
    text-align: center;
}
.tree-switch{
    height: 20px;
    border-radius: 6px;
    background-color: var(--primary-color);
    text-align: center;
    width: 50px;
    margin-bottom: 20px;
    padding: 18px 0;
    cursor: pointer;
    margin-left: -10px;
    }
.bubble{
    font-weight: 500;
    font-size: 12px;
    color: #F4F4F6;
    position: absolute;
    left: 44px;
    border-radius: 17px;
    background: #E82C25;
    min-width: 17px;
    width: fit-content;
    height: 17px;
    text-align: center;
    line-height: 17px;
    top: -5px;
}
</style>
