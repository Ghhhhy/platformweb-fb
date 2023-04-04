<!--  slidbar  Author:Titans@2396757591@qq.com -->
<template>
  <div class="sidebar-container ">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <div class="scrollbar-query">
        <el-input v-model="filterValue" prefix-icon="el-icon-search" clearable />
      </div> -->
      <el-menu
        unique-opened
        :router="false"
        mode="vertical"
        :default-openeds="openeds"
        @select="handleSelect"
      >
        <SidebarItem
          v-for="(menu,index) in menuListIn"
          v-show="getShow[menu.nestedId]"
          :key="menu.nestedId"
          :level-index="0"
          :hasico="true"
          :item="menu"
          :index="index"
          :filter-value="filterValue"
          :set-show="setShow"
          :get-show="getShow"
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
      menuListIn: [],
      filterValue: '',
      openeds: [],
      getShow: {}
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
    },
    setShow(key, value) {
      if (value && this.filterValue) this.openeds.push(key)
      this.$set(this.getShow, key, value)
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
    },
    filterValue(val) {
      for (let key in this.getShow) {
        this.getShow[key] = !val
      }
      if (!val) this.openeds = []
    }
  }
}
</script>
<style lang="scss">
@keyframes example {
  from {background-color: #333;}
  to {background-color: var(--app-main-color);}
}
.el-submenu__title:hover{
  background: var(--app-main-color-light) !important;
  font-weight:700 !important;
  color: #fff !important;
  .el-icon-arrow-right {
    color: #fff !important;
  }
  .tailBox {
    background: var(--app-main-color);
  }
}
.sidebar-container {
  height:100%;
  transition: width 0.28;
  // display: flex;
  // flex-direction: column;
  // &>div:first-of-type{
  //   font-size: 12px;
  // }
  // &>.scrollbar-wrapper{
  //   height: auto;
  //   flex: 1;
  // }
  .scrollbar-query{
    padding: 12px 20px;
    font-size: 14px;
    .el-input ,input{
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      &.el-input__inner {
        border-color: #dfdfdf;
      }
    }
  }
  .scrollbar-wrapper,.el-scrollbar{
    padding: 0;
    height: 100%
  }
  .scrollbar-wrapper{
    margin: 0!important;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu-item:focus{
    background: transparent;
  }
  .el-menu-item:hover{
    font-weight: 700;
    color: #333;
    background: var(--app-main-color-light);
  .tailBox {
    // background: #1E8CFB;
    animation-name: example;
    animation-duration: 0.3s;
    animation-fill-mode:forwards
  }
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
    color: #333;
  }
  .el-menu {
    background: #fefeff;
    .el-icon-arrow-down {
      transform: rotate(-90deg);
    }
    .el-menu-item{
      padding:0;
    }
  }
  .el-menu {
    border: none;
    background-color: #fff;
    .icon{
        margin-right: 0;
    }
    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
      i.el-submenu__icon-arrow {
        color: #fff;
        font-size: 14px;
        transform: rotate(-90deg);
      }
      span {
        width: 80%;
        opacity: 0.75;
        margin: 0 10px;
        font-size: 14px;
        color: #333;
      }
    }
    .nav-level-title-1{
      .icon{
        height:14px;
        width:14px;
        margin-right: 0;
      }
      .ico{
        margin-right: 0px;
        color: #333;
        height: 15px;
        width: 15px;
        background-size: 100%;
        font-size: 14px;
        font-family: element-icons!important;
      }
      .ico:before {
       content: "\e798";
      }
      span{
        font-size:16px;
        font-weight: 700;
      }
    }
    .nav-level-title-2{
      font-size: 0;
      i{
        margin-right: 0px;
        height:8px;
        width:8px;
        background:#909399;
        border-radius: 4px;
      }
      span{
        font-size:14px;
      }
    }
    .nav-level-title-3{
      font-size: 0;
      i{
        margin-right: 0px;
        height:6px;
        width:6px;
        transform:rotate(45deg);
        background:#909399;
      }
       span{
        font-size:14px;
      }
    }
    .nav-level-title-4{
      i{
        margin-right: 0px;
        height:6px;
        width:6px;
        background:url('./img/level4.svg');
        background-size:100% 100%;
      }
      span{
        font-size:14px;
        color: #333;
      }
      .tailBox{
        float: right;
        width: 3px;
        height: 40px;
      }
    }
    .el-menu-item.is-active{
      .nav-level-title-3{
        i{
          background: var(--app-main-color);
        }
      }
      .nav-level-title-4{
        i{
          background:url('./img/level4active.svg');
          background-size:100% 100%;
        }
        span{
          color: var(--app-main-color);
        }
      }
    }
    .is-opened>.el-submenu__title{
      background-color: #F5F5F5;
      i {
        color: var(--app-main-color);
      }
      i.el-submenu__icon-arrow {
        color: #333;
        transform: rotate(0deg);
      }
      span {
        opacity: 1;
        font-weight: 700;
        color: var(--app-main-color);
      }
      .nav-level-title-2 i{
        background: var(--app-main-color);
      }
      .nav-level-title-3 i{
        background: var(--app-main-color);
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
