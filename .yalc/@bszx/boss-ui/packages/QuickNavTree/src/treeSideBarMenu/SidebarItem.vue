<template>
  <div :class="'nav-item-' + levelIndex">
    <template v-if="!hasChildren(item)">
      <el-menu-item :index="item.nestedId">
        <el-tooltip
          v-if="item.name.length > 14"
          effect="dark"
          :content="item.name"
          placement="right"
        >
          <div :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
            <i class="basic-font icon fn-inline" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ item.name }}
            </span>
          </div>
        </el-tooltip>
        <div v-else :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
          <i
            class="basic-font el-icon-menu fn-inline"
            :class="item.fontIcoClass"
          ></i>
          <span class="fn-inline olh">
            {{ item.name }}
          </span>
        </div>
      </el-menu-item>
    </template>
    <el-submenu v-if="hasChildren(item)" :index="item.nestedId">
      <template slot="title">
        <el-tooltip
          v-if="item.name.length > 14"
          effect="dark"
          :content="item.name"
          placement="right"
        >
          <div :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
            <i class="basic-font icon fn-inline" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ item.name }}
            </span>
          </div>
        </el-tooltip>
        <div v-else :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
          <i class="fn-inline basic-font el-icon-menu"></i>
          <span class="fn-inline olh">
            {{ item.name }}
          </span>
        </div>
      </template>
      <template v-for="child in getChildren(item)">
        <sidebar-item
          v-if="hasChildren(child)"
          v-show="getShow[child.nestedId]"
          :key="child.nestedId"
          :level-index="levelIndex + 1"
          :item="child"
          :filter-value="filterValue"
          :set-show="setShow"
          :get-show="getShow"
          @itemSetShow="itemSetShow"
        />
        <el-menu-item
          v-show="getShow[child.nestedId]"
          v-else
          :key="child.nestedId"
          :index="child.nestedId"
        >
          <el-tooltip
            v-if="child.name.length > 14"
            effect="dark"
            :content="child.name"
            placement="right"
          >
            <div :class="'nav-level-title-' + getLevelInfo(child.nestedId)">
              <i class="basic-font fn-inline" :class="item.fontIcoClass"></i>
              <span class="fn-inline olh">
                {{ child.name }}
              </span>
              <div class="tailBox fn-inline"></div>
            </div>
          </el-tooltip>
          <div
            v-else
            :class="'nav-level-title-' + getLevelInfo(child.nestedId)"
          >
            <i class="basic-font fn-inline" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ child.name }}
            </span>
            <div class="tailBox fn-inline"></div>
          </div>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
// basic-font ico
export default {
  name: 'SidebarItem',
  props: {
    levelIndex: {
      type: Number,
      default: 0
    },
    hasico: {
      type: Boolean
    },
    maxLevel: {
      type: Number,
      default: 2
    },
    index: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      required: true
    },
    filterValue: {
      type: String,
      default: ''
    },
    setShow: {
      type: [Boolean, Function],
      default() {
        return false
      }
    },
    getShow: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: true
    }
  },
  methods: {
    getLevelInfo(nestedId) {
      return (nestedId + '').split('-').length
    },
    hasChildren(item) {
      // console.log(item, item.nestedId, item.nestedId.split('_').length <= this.maxLevel)
      return (
        Array.isArray(item.children) &&
        item.children.length &&
        item.nestedId.split('_').length <= this.maxLevel
      )
    },
    getChildren(item) {
      return Array.isArray(item.children) ? item.children : []
    },
    itemSetShow(IS) {
      this.setShow(this.item.nestedId, IS)
      if (!this.getShow.itemSetShow) this.$emit('itemSetShow', IS)
    }
  },
  created() {
    if (this.setShow) {
      this.setShow(this.item.nestedId, true)
      this.getChildren(this.item).forEach((v) => {
        this.setShow(v.nestedId, true)
      })
    }
  },
  mounted() {},
  watch: {
    hasico: {
      handler() {},
      immediate: true
    },
    filterValue(val) {
      if (val) {
        if (!this.hasChildren(this.item)) {
          this.setShow(this.item.nestedId, this.item.name.indexOf(val) !== -1)
        } else {
          let IS = false
          this.getChildren(this.item).forEach((v) => {
            let is = v.name.indexOf(val) !== -1
            IS = IS || is
            this.setShow(v.nestedId, is)
          })
          if (IS) {
            this.setShow(this.item.nestedId, IS)
            this.$emit('itemSetShow', IS)
          }
        }
      }
    }
  }
}
</script>
