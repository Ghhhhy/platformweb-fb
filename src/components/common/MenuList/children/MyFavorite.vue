<-- author czb 导航的收藏-->
<template>
  <div class="MyFavorite ys-menu-nav-con">
    <el-menu class="el-menu-demo" mode="horizontal" @select="onMenuSelectChange">
      <el-submenu v-for="(item,index) in menuData" :key="index" :index="item.index">
        <template slot="title">
          <i class="el-icon-s-unfold icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <!-- 一级菜单没有子节点 -->
        <el-menu-item
          v-for="(item2,idx) in item.children"
          :key="'/' + idx"
          :index="item2.index"
          class="child"
        >{{ item2.name }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import routerConfig from '../../../../config/routerConfig'
// import api from '@/api/components/menu/menu'
import MenuModule from '../../../../api/frame/common/menu'
export default {
  name: 'MyFavorite',
  data() {
    return {
      show: false,
      Is: '',
      fiscal: 'fiscal',
      menuData: [],
      codeObj: {},
      routerConfig: routerConfig,
      // userInfo: this.$store.state.userInfo,
      navMenuData: [
        {
          index: '01',
          name: '我的收藏',
          routerName: 'Table'
        }
      ]
    }
  },
  mounted() {
    this.getMenus()
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    onMenuSelectChange(nestedIndex) {
      // 点击菜单选中当前菜单并激活
      let curSelectObj = this.getObjByNestedIndex(this.menuData, nestedIndex)
      if (curSelectObj) {
        Object.assign(curSelectObj, this.routerConfig[curSelectObj.code])
        this.$emit('onMenuSelectChange', curSelectObj)
      }
    },
    getObjByNestedIndex(arr, nestedIndex) {
      // 获取选中菜单的数据源
      let nestArr = nestedIndex.split('-')
      let obj = {}
      nestArr.forEach((item, index) => {
        if (index === 0) {
          obj = arr[parseInt(item)]
        } else {
          obj = obj.children[parseInt(item)]
        }
      })
      return obj
    },

    rever(data, pIndex) {
      // 获取数据源的索引index
      let self = this
      data.forEach((item, index) => {
        item.index = pIndex !== undefined ? pIndex + '-' + index : '' + index
        if (item.children && item.children.length) {
          self.rever(item.children, item.index)
        }
      })
    },
    getMenus() {
      let self = this
      let param = {
        year: self.userInfo.year,
        province: self.userInfo.province,
        appguid: self.userInfo.app.guid
      }
      MenuModule.getCollectionMenu(param).then(res => {
        if (res) {
          self.navMenuData[0].children = JSON.parse(res)
          self.menuData = self.navMenuData
          self.rever(self.menuData)
        } else {
          console.error(JSON.parse(res))
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu--horizontal {
  .el-menu {
    margin: 5px 10px 0 10px;
    min-height: 240px;
    min-width: 240px;
    width: auto;
    height: auto;
    box-shadow: 2px 4px 5px #999;
  }
}
.MyFavorite> .el-submenu__title {
  background: none;
}
.MyFavorite> .el-submenu__title:hover {
  background: var(--hightlight-color) !important;
}
// .MyFavorite{
  .el-menu--horizontal .el-menu .el-menu-item:hover {
    background: var(--primary-color) !important;
    color: #fff !important;
  }
// }
</style>
