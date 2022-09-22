<template>
  <div class="progress">
    <vxe-modal
      v-model="showProgress"
      title="进度条"
      width="100%"
      height="100%"
      :show-header="false"
    >
      <div class="area">
        <div class="title">{{ title }}</div>
        <el-progress
          text-inside="true"
          stroke-width="50"
          :percentage="progress"
          style="line-height:30px;top:48%;z-index:-1;width:500px;"
        />
      </div>
    </vxe-modal>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    progress: {
      type: Number,
      default: 1000
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showProgress: true
    }
  },
  methods: {
    cancelDialogClose() {
      this.$parent.showProgress = false
    }
  },
  mounted() {
  },
  watch: {
    showProgress: {
      handler(newValue) {
        this.showProgress = newValue
      }
    }
  }
}
</script>

<style lang="scss">
.progress {
  .area {
    position: absolute;
    height: 500px;
    width: 500px;
    top: 43%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-43%,-50%);
  }
  .title {
    position: absolute;
    font-size: 25px;
    color: #000;
    top: 43%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform: translate(-43%,-50%);
  }
  .vxe-modal--wrapper.type--modal .vxe-modal--box {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: fixed;
    left: 50%;
    top: 0;
    -webkit-box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    border: 1px solid rgba(0,0,0,.2);
    background: rgba(255,255,255,0);
  }
}
</style>
