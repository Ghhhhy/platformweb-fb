<!--  标题1   Author:Titans -->
<template>
  <div :class="'module-title-' + type" class="module-title">
    <div v-if="type === 'left'">
      <div class="module-title-main fn-inline">
        <i class="fn-inline"></i>
        <span class="fn-inline">
          <slot></slot>
        </span>
        <em class="fn-inline"></em>
      </div>
      <div class="fr">
        <slot name="option"></slot>
      </div>
    </div>
    <div v-if="type === 'center'">
      <i class="fn-inline leftico"></i>
      <span class="fn-inline">
        <slot></slot>
      </span>
      <i class="fn-inline rightico"></i>
    </div>
  </div>
</template>
<script>
import mixins from '../../tools/mixin'
export default {
  name: 'BsTitle',
  mixins: [mixins],
  props: {
    type: {
      type: String,
      default() {
        return 'left' // center||left
      }
    }
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {
    type: {
      handler(newValue, oldValue) {},
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="scss">
.module-title{
  margin:10px 0;
}
.module-title-left {
  font-size: 0;
  line-height: 34px;
  .module-title-main{
    i {
      width: 17px;
      height: 18px;
      // background: url(./img/titleico.svg);
      background-size: 100% 100%;
    }
    span {
      color: rgba(27, 122, 217, 1);
      line-height: 24px;
      font-size: 14px;
      margin: 0 10px 0 7px;
      font-weight: bold;
    }
    em {
      width: 27px;
      height: 15px;
      // background: url(./img/title-right.svg);
      background-size: 100% 100%;
    }
  }

}
.module-title-center {
  display: block;
  text-align: center;
  font-size: 0;
  line-height: 34px;
  i {
    width: 158px;
    height: 20px;
  }
  span {
    color: rgba(27, 122, 217, 1);
    line-height: 24px;
    font-size: 14px;
    margin: 0 10px 0 7px;
    font-weight: bold;
    min-width: 112px;
    text-align: center;
  }
  i.leftico {
    background: url(./img/title2-left.png);
    background-size: 100% 100%;
  }
  i.rightico {
    background: url(./img/title2-right.png);
    background-size: 100% 100%;
  }
}
.vxe-form{
  .module-title-left{
    padding:0 40px;
  }
}
</style>
