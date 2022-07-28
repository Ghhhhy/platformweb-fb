<!--  slidbar  Author:Titans@2396757591@qq.com -->
<template>
  <div class="sidebar-container">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        unique-opened
        :router="false"
        mode="vertical"
        @select="handleSelect"
      >
        <SidebarItem
          v-for="(menu, index) in menuListIn"
          :key="menu.nestedId"
          :level-index="0"
          :hasico="true"
          :item="menu"
          :index="index"
        />
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
    navData: {
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
                ? nestedId + '-' + (index + 1)
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
      let self = this
      let navlevel = key.split('-')
      let obj = {}
      let crumbsArr = []
      navlevel.forEach(function (item, index) {
        if (index === 0) {
          obj = self.menuListIn[item - 1]
          crumbsArr.push(obj)
        } else {
          obj = obj.children[item - 1]
          crumbsArr.push(obj)
        }
      })
      this.$emit('onNavClick', obj, crumbsArr)
    }
  },
  mounted() {
    this.menuListIn = this.deepEachTraversalArr(this.navData)
  },
  watch: {
    navData: {
      handler() {
        this.menuListIn = this.deepEachTraversalArr(this.navData)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.sidebar-container {
  height: 100%;
  transition: width 0.28;
  .scrollbar-wrapper,
  .el-scrollbar {
    padding: 0;
    height: 100%;
  }
  .scrollbar-wrapper {
    margin: 0 !important;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu-item:focus {
    background: transparent;
  }
  .el-menu-item:hover {
    border-right: 3px solid var(--primary-color);
    color: #fff;
    background: #2a8bfd;
    opacity: 1;
    font-weight: bold;
  }

  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .is-horizontal,
  .is-vertical {
    display: none;
  }
  .el-icon-arrow-down:before {
    color: #ffffff;
  }
  .el-menu {
    background: #3762bf;
    .el-icon-arrow-down {
      transform: rotate(-90deg);
    }
    .el-menu-item {
      padding: 0;
    }
  }
  .el-menu {
    border: none;
    .icon {
      margin-right: 0;
    }
    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      font-size: 0;
      i.el-submenu__icon-arrow {
        color: #212121;
        font-size: 14px;
        transform: rotate(-90deg);
      }
      span {
        width: 90%;
        opacity: 0.75;
        margin: 0 10px;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .el-submenu__title:hover {
      background: #2a8bfd !important;
      color: #fff;
      opacity: 1;
      font-weight: bold;
    }
    .nav-level-title-1 {
      .icon {
        height: 14px;
        width: 14px;
        margin-right: 0;
      }
      .ico {
        margin-right: 0px;
        color: #212121;
        height: 15px;
        width: 15px;
        background-size: 100%;
        font-size: 14px;
        font-family: element-icons !important;
      }
      .ico:before {
        content: '\e798';
      }
    }
    .nav-level-title-1 {
      span {
        font-size: 14px;
      }
    }
    .nav-level-title-2 {
      i {
        margin-right: 0px;
        height: 6px;
        width: 6px;
        background: #666;
        border-radius: 3px;
      }
      span {
        font-size: 14px;
      }
    }
    .nav-level-title-3 {
      i {
        margin-right: 0px;
        height: 8px;
        width: 8px;
        background: url('../img/level3.svg');
        background-size: 100% 100%;
      }
      span {
        font-size: 14px;
      }
    }
    .nav-level-title-4 {
      i {
        margin-right: 0px;
        height: 6px;
        width: 6px;
        background: url('../img/level4.svg');
        background-size: 100% 100%;
      }
      span {
        font-size: 14px;
        color: #999;
      }
    }
    .el-menu-item.is-active {
      .nav-level-title-3 {
        i {
          background: url('../img/level3active.svg');
          background-size: 100% 100%;
        }
      }
      .nav-level-title-4 {
        i {
          background: url('../img/level4active.svg');
          background-size: 100% 100%;
        }
      }
    }
    // .nav-level-title-4{
    //   span{
    //     width: 160px;
    //   }
    // }
    // .nav-level-4{
    // span{
    //     width: 160px;
    //   }
    // }
    .is-opened > .el-submenu__title {
      i.el-submenu__icon-arrow {
        color: var(--primary-color);
        transform: rotate(0deg);
      }
      span {
        opacity: 1;
        font-weight: bold;
        // color: var(--primary-color);
      }
    }
    .el-menu--inline {
      background: #3259AF;
      div {
        li {
          ul {
            background: #2E53A2;
          }
        }
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
