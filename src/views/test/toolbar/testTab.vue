<template>
  <div class="test-tabselect__content">
    <TabSelectTwo
      :tab-list="tabList"
      show-num
      :show-zero="true"
      :default-select="curTabSelect"
      @onTabClick="onTabClick"
    />
  </div>
</template>

<script>
import { statusButtonsNew, curStatusButton } from './configNew'
export default {
  name: 'TestTabSelect',
  props: {

  },
  data() {
    return {
      tabList: [...statusButtonsNew],
      curTabSelect: { ...curStatusButton },
      onTabClick: this.tabClick

    }
  },
  methods: {
    tabClick(tab) {
      console.log('1', tab)
    }
  },
  created() {

  },
  mounted() {
    // this.getImageUrl()

  }
}
</script>

<style scoped lang="scss">
  .test-tabselect__content{
    width: 100%;
    height: 48px;
    background-color: #fff;
    padding: 10px;
  }
</style>
