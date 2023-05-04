<template>
  <div class="xmind-line-node" :style="{ borderColor: info.color }">
    <svg-icon
      v-if="info.ableSpread"
      :name="info.showChild ? 'reduce' : 'add'"
      :class-name="['next-child-icon', `child-icon-position-${type}`]"
      @click="showChildChange"
    />
    <span class="line-node-label">{{ info.label }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({})
    },
    // 展开加号的位置左边可以用来支出 right：右（可以用来代替收入）
    type: {
      type: String,
      default: 'expent'
    }
  },
  setup(props, { emit }) {
    // 展开下级或者收起
    const showChildChange = () => {
      emit('change', {
        status: !props.info.showChild,
        type: props.type,
        currentInfo: props.info
      })
    }
    return {
      showChildChange
    }
  }
})
</script>

<style lang="scss" scoped>
.xmind-line-node {
  position: relative;
  height: 32px;
  min-width: 178px;
  background: #FFFFFF;
  border: 1px solid rgba(105,217,172,1);
  border-radius: 20px;
  width: 100%;
  padding: 0 15px;
  margin-bottom: 4px;
  text-align: center;
  line-height: 32px;
  box-sizing: border-box;

  .line-node-label {
    font-size: 14px;
    color: #2E3133;
    font-weight: 400;
  }
}
.next-child-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 15px;
  cursor: pointer;

  &.child-icon-position-expend {
    left: 6px;
  }
  &.child-icon-position-income {
    right: 6px;
  }
}
</style>
