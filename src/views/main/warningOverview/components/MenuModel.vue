<template>
  <div class="menu-model-container">
    <svg-icon name="menu-model" class-name="menu-model-icon" />
    <span
      v-for="item in menus"
      :key="item.name"
      :style="item.postion"
      :class="['menu-model-item', { pointer: item.isOpen }]"
      @click="menuClick(item)"
    >
      {{ item.name }}
    </span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useMenuModel } from '../hooks/useMenuModel'

export default defineComponent({
  setup() {
    const { menus, menuClick } = useMenuModel()

    return {
      menus,
      menuClick
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-model-container {
  position: relative;
  width: 823px;
  .menu-model-icon {
    width: 100%;
    height: 100%;
  }

  .menu-model-item {
    position: absolute;
    display: inline-block;
    width: 123px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 15px;
    color: #2A8BFD;
    font-weight: 600;

    &.pointer {
      cursor: pointer;
    }
  }
}
</style>
