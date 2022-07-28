<template>
  <div :class="['xmind-bg-node', `xmind-bg-node-${type}`]">
    <div class="line-node-container">
      <XmindLineNode
        v-for="item in info.children"
        :key="`${info.label}-${item.label}`"
        :info="item"
        :type="type"
        v-on="$listeners"
      />
    </div>
    <svg-icon
      v-if="info.children && info.children.length"
      name="group-arrow"
      class-name="group-arrow-icon"
    />
    <div class="bg-node-container">
      <span class="bg-node-label">{{ info.label }}</span>
      <div class="absolute-detail">
        <XmindNodeDetail
          :info="info"
        />
      </div>
    </div>
    <svg-icon
      name="triangle-line"
      :class-name="['triangle-line-icon', `triangle-line-icon-${type}`]"
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import XmindLineNode from './XmindLineNode'
import XmindNodeDetail from './XmindNodeDetail'
export default defineComponent({
  components: {
    XmindLineNode,
    XmindNodeDetail
  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'expent'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.flex-center {
  display: flex;
}
.xmind-bg-node {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.xmind-bg-node-expend  {
    margin-bottom: 110px;
  }
  &.xmind-bg-node-income {
    flex-direction: row-reverse;
    margin-bottom: 60px;

    &.xmind-bg-node-income:nth-of-type(1) {
      margin-bottom: 20px;
    }

    .group-arrow-icon {
      transform: rotate(180deg);
    }
  }
}

.bg-node-container {
  position: relative;
  height: 40px;

  .absolute-detail {
    position: absolute;
    bottom: -116px;
    right: 0;
  }
}

.line-node-container {
  width: 178px;
}

.group-arrow-icon {
  font-size: 62px;
  margin: 0 -15px 0 -10px;
}
.bg-node-label {
  display: inline-block;
  min-width: 172px;
  height: 40px;
  margin-bottom: -10px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  border: 1px solid rgba(99,149,250,1);
  border-radius: 20px;
  color: #2E3233;
  background: #CFDEFC;
}

.triangle-line-icon {
  font-size: 20px;
}

.triangle-line-icon-income {
  margin: 0 16px 0 0;
}
.triangle-line-icon-expend {
  margin: 0 0 0 16px;
  transform: rotate(180deg);
}
</style>
