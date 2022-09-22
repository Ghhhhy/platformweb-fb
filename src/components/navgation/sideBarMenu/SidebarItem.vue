<template>
  <div v-if="hasChildren(item)">
    <template v-if="!hasChildren(item)">
      <el-menu-item :index="item.nestedId">
        <i v-if="item.fontIcoClass" class="basic-font fn-inline" :class="item.fontIcoClass"></i>
        <span class="fn-inline">
          {{ item.name }}
        </span>
      </el-menu-item>
    </template>
    <el-submenu v-if="hasChildren(item)" :index="item.nestedId">
      <template slot="title">
        <i v-if="item.fontIcoClass" class="basic-font fn-inline" :class="item.fontIcoClass"></i>
        <span class="fn-inline">
          {{ item.name }}
        </span>
      </template>
      <template v-for="child in getChildren(item)">
        <sidebar-item
          v-if="hasChildren(child)"
          :key="child.nestedId"
          :item="child"
        />
        <el-menu-item v-else :key="child.nestedId" :index="child.nestedId">
          <i v-if="item.fontIcoClass" class="basic-font fn-inline" :class="item.fontIcoClass"></i>
          <span class="fn-inline">
            {{ child.name }}
          </span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    maxLevel: {
      type: Number,
      default: 2
    },
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasChildren(item) {
      console.log(item, item.nestedId, item.nestedId.split('_').length <= this.maxLevel)
      return (Array.isArray(item.children) && item.children.length) && item.nestedId.split('_').length <= this.maxLevel
    },
    getChildren(item) {
      return Array.isArray(item.children) ? item.children : []
    }
  }
}
</script>
