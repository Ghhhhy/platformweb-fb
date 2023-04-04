<!--
 * @Author: 轻语
 * @Date: 2022-05-06 17:11:25
 * @LastEditors: Comer
 * @LastEditTime: 2022-05-18 16:39:09
 * @Description:
-->

<!-- 顶部导航返回 -->
<template>
  <div class="header-nav">
    <span class="left-back" @click="$router.go(-1)">
      <!-- <i class="el-icon-back"></i>
      返回 -->
    </span>
    <span class="left-title">{{ title }}</span>
    <div class="right-btn">
      <vxe-button
        v-for="item in buttons"
        :key="item.code"
        :type="item.type ? item.type : ''"
        size="mini"
        @click="btnClick(item)"
      >{{ item.label }}</vxe-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BsHeaderNav',
  props: {
    buttonsConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      buttons: this.buttonsConfig.buttons || [],
      title: this.buttonsConfig.title || ''
    }
  },
  watch: {
    buttonsConfig() {
      this.buttons = this.buttonsConfig.buttons
    }
  },
  methods: {
    btnClick(item) {
      this.buttonsConfig.btnClickEvent(item)
    }
  }
}
</script>
<style lang="scss">
.header-nav{
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  padding:8px 24px;
  background:#f4faff;
  .left-back{
    cursor: pointer;
    display:flex;
    font-size:14px;
    font-weight:400;
    align-items:center;
    color:#1890ff;
    &:hover{
      color:#1890ff;
    }
  }
  .left-title{
    display:flex;
    align-items:left;
    position: absolute;
    left: 40px;
    top: 60px;
    font-size: medium;
    color: #5176ea;
    font-weight: bold;
  }
}
</style>
