<!--  slidbar  Author:Titans@2396757591@qq.com -->
<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        unique-opened
        :router="false"
        mode="vertical"
        text-color="#fff"
        @select="handleSelect"
      >
        <SidebarItem v-for="menu in menuListIn" :key="menu.nestedId" :item="menu" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import SidebarItem from './SidebarItem'
export default {
  name: 'Sidebar',
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      menuListIn: []
    }
  },
  methods: {
    deepEachTraversalArr(data, cb) {
      // 深度递归遍历新增嵌套索引关系
      deepEachTraversalArrFn(data)
      return data
      function deepEachTraversalArrFn(root, nestedId, cb) {
        if (Array.isArray(root) && root.length) {
          root.forEach((item, index) => {
            item.sortIndex = index
            item.nestedPid = nestedId === undefined ? 0 : nestedId
            item.nestedId =
              nestedId !== undefined
                ? nestedId + '_' + (index + 1)
                : index + 1 + ''
            cb && typeof cb === 'function' && cb(root)
            if (item.children && item.children.length) {
              deepEachTraversalArrFn(item.children, item.nestedId)
            }
          })
        }
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {
    this.menuListIn = this.deepEachTraversalArr(this.menuList)
  }
}
</script>
<style lang="scss">
.sidebar-container {
  transition: width 0.28s;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .is-horizontal,
  .is-vertical {
    display: none;
  }
  .el-menu {
    border: none;
    background-color: #3762bf;
    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      font-size: 0;
      i {
        color: #fff;
        font-size: 14px;
      }
      span {
        opacity: 0.75;
        margin: 0 10px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .is-opened {
      .el-submenu__title {
        i {
          color: #fff;
        }
        span {
          opacity: 1;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .el-icon-arrow-down:before {
      color: rgba(255, 255, 255, 1);
    }
    .el-menu {
      background: #3259af;
      .el-icon-arrow-down {
        transform: rotate(-90deg);
      }
    }
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
}
</style>
