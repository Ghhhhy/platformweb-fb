<!--
 * @Author: 轻语
 * @Date: 2022-02-24 17:20:50
 * @LastEditors: 轻语
 * @LastEditTime: 2022-03-02 15:17:26
 * @Description:
-->
<!-- 表单维护页布局 -->
<template>
  <div class="form-layout-wrapper">
    <div class="header-nav-wrapper">
      <slot name="headerNav"></slot>
    </div>
    <div class="main-wrapper">
      <div v-if="$slots.tab" class="main-tab">
        <slot name="tab"></slot>
      </div>
      <div class="main-container">
        <slot name="mian"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BsFormLayout',
  data() {
    return {}
  }
}
</script>
<style lang='scss'>
.form-layout-wrapper{
  height:calc(100vh - 120px);
  background:#fff;
  .main-wrapper{
    height:calc(100% - 44px);
    padding:12px 24px;
    box-sizing:border-box;
    overflow:hidden;
    display:flex;
    flex-direction:column;
  }
  .main-tab{
    height: 52px;
    padding-bottom:12px;
  }
  .main-container{
    flex:1;
    overflow:auto;
  }
  .T-mainFormListLayout-modulebox{
    padding: 0 0 12px;
    .mmc-right{
      padding:0;
    }
  }
}
</style>
