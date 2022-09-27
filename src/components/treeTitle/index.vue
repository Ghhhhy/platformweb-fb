<template>
  <div class="mmc-left-tree-title">
    <div
      class="tree-set__content"
      style="--tree-set-no__icon: 7px"
    >
      <div class="fn-inline aside-tree-show-leftvisible" @click="asideHandle">
        <i class="ri-indent-decrease"></i>
      </div>
      <div v-if="label" class="fn-inline tree-set__tip">
        <span>{{ label }}</span>
      </div>
      <div class="fn-inline tree-set__query">
        <el-input
          v-model="inputValueIn"
          :placeholder="placeholder"
          prefix-icon="el-icon-search"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visiable: {
      type: Boolean,
      default: true
    },
    inputValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '输入过滤'
    },
    label: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputValueIn: {
      get() {
        return this.inputValue
      },
      set(val) {
        this.$emit('update:inputValue', val)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    asideHandle() {
      this.$emit('update:visiable', false)
      this.$emit('leftIconClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-set__query {
  margin-left: 4px;
}
</style>
