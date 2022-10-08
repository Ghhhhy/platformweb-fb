<template>
  <el-empty :description="description" :img="img" :image-size="imageSize" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    img: {
      type: String,
      default: ''
    },
    imageSize: {
      type: [String, Number],
      default: 110
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>

</style>
