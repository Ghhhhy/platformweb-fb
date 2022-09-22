<!--    Author:Titans@2396757591@qq.com -->
<template>
  <div :class="displayStyle">
    <div :id="anchor" class="title-link author-title" @click="contentVisibleIn = !contentVisibleIn">
      <div class="author-toogle-content-btn" :class="contentVisibleIn ? 'open' : 'close'"><i class="ri-arrow-right-s-line"></i></div>
      <i v-if="icon" :class="'author-title-icon ' + icon"></i>
      <div class="author-title-text">{{ title }}</div>
      <div class="author-title-custom">
        <slot name="titleCustom"></slot>
      </div>
    </div>
    <div class="anchor-content" :class="contentVisibleIn ? 'open' : 'close'">
      <div :style="{ 'height': height }" class="anchor-slot">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnchorNavOption',
  components: {},
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    anchor: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: [String, Boolean],
      default: false
    },
    displayStyle: {
      type: String,
      // gray-border
      default: ''
    },
    contentVisible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      contentVisibleIn: true
    }
  },
  methods: {},
  crated() {},
  mounted() {
    this.contentVisibleIn = this.contentVisible
  },
  watch: {
    contentVisible: {
      handler() {
        this.contentVisibleIn = this.contentVisible
      },
      immediate: true
    },
    anchor: {
      handler() {},
      immediate: true
    },
    title: {
      handler() {},
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.author-title{
    display:flex;
    align-items: center;
    height: 45px;
    padding: 9px 10px;
    cursor: pointer;
  .author-title-icon {
    line-height: 32px;
    font-size: 14px;
    font-weight: 500;
    padding-right: 5px;
    color: #333;
  }
    .author-title-text{
      line-height: 32px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    .author-title-custom{
      flex:1;
      padding:0 10px;
    }
    .author-toogle-content-btn{
      padding:8px;
      cursor: pointer;
      i{
        display: block;
        transition: transform .3s;
        transform-origin: center;
        border-left: none;
        border-top: none;
      }
    }
    .author-toogle-content-btn.open{
      i{
         transform: rotate(90deg);
      }

    }
    .author-toogle-content-btn.close{
       i{
         transform: rotate(0);
       }
    }
  }
.anchor-slot {
  padding: 8px;
}
.anchor-content {
  transition: max-height .3s;
  transform-origin: center;
  overflow: hidden;
  &.open {
    max-height: 1000px;
  }
  &.close {
    max-height: 0;
  }
}
.gray-border {
  margin-bottom: 10px;
  border-radius: 0 0 2px 2px;
  .author-title {
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    border-bottom: none;
    background: #fafafa;
  }
  .anchor-content {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    border-top: none;
  }
}
</style>
