<template>
  <div :class="'nav-item-' + levelIndex">
    <template v-if="!hasChildren(item)">
      <el-menu-item :index="item.nestedId">
        <el-tooltip v-if="item.name.length > 8" effect="dark" :content="item.name" placement="right">
          <div :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
            <i class="basic-font icon fn-inline" :style="getStyleLevel1(item,index)" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ item.name }}
            </span>
          </div>
        </el-tooltip>
        <div v-else :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
          <i class="basic-font icon fn-inline" :style="getStyleLevel1(item,index)" :class="item.fontIcoClass"></i>
          <span class="fn-inline olh">
            {{ item.name }}
          </span>
        </div>
      </el-menu-item>
    </template>
    <el-submenu v-if="hasChildren(item)" :index="item.nestedId">
      <template slot="title">
        <el-tooltip v-if="item.name.length > 8" effect="dark" :content="item.name" placement="right">
          <div :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
            <i class="basic-font icon fn-inline" :style="getStyleLevel1(item,index)" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ item.name }}
            </span>
          </div>
        </el-tooltip>
        <div v-else :class="'nav-level-title-' + getLevelInfo(item.nestedId)">
          <i class="basic-font icon fn-inline" :style="getStyleLevel1(item,index)" :class="item.fontIcoClass"></i>
          <span class="fn-inline olh">
            {{ item.name }}
          </span>
        </div>
      </template>
      <template v-for="child in getChildren(item)">
        <sidebar-item
          v-if="hasChildren(child)"
          :key="child.nestedId"
          :level-index="levelIndex + 1"
          :item="child"
        />
        <el-menu-item v-else :key="child.nestedId" :index="child.nestedId">
          <el-tooltip v-if="child.name.length > 8" effect="dark" :content="child.name" placement="right">
            <div :class="'nav-level-title-' + getLevelInfo(child.nestedId)">
              <i class="basic-font fn-inline" :class="item.fontIcoClass"></i>
              <span class="fn-inline olh">
                {{ child.name }}
              </span>
            </div>
          </el-tooltip>
          <div v-else :class="'nav-level-title-' + getLevelInfo(child.nestedId)">
            <i class="basic-font fn-inline" :class="item.fontIcoClass"></i>
            <span class="fn-inline olh">
              {{ child.name }}
            </span>
          </div>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import { getPinYinFirstCharacter } from '@/components/CardMenu/utils/pinyin'
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
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getLevelInfo(nestedId) {
      return (nestedId + '').split('-').length
    },
    hasChildren(item) {
      // console.log(item, item.nestedId, item.nestedId.split('_').length <= this.maxLevel)
      return (Array.isArray(item.children) && item.children.length) && item.nestedId.split('_').length <= this.maxLevel
    },
    getChildren(item) {
      return Array.isArray(item.children) ? item.children : []
    },
    getStyleLevel1(item, index) {
      let { hasico } = this
      try {
        // 为啥不直接用中文？因为有个书包不会配nginx
        let title = getPinYinFirstCharacter(item.name, '', true)
        return hasico ? {
          background: 'url(' + require('@/components/navgationNew/img/' + title + '.svg') + ')',
          backgroundSize: '100% 100%'
        } : {}
      } catch {
        return hasico ? {
          background: 'url(' + require('@/components/navgationNew/img/default.svg') + ')',
          backgroundSize: '100% 100%'
        } : {}
      }
    }
  },
  mounted() {
  },
  watch: {
    hasico: {
      handler() {
      },
      immediate: true
    }
  }
}
</script>
