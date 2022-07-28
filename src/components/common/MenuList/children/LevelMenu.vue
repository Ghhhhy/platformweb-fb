<-- author czb 导航的四级菜单-->
<template>
  <div class="LevelMenu ys-menu-nav-con">
    <el-menu class="el-menu-demo" mode="horizontal" @select="onMenuSelectChange">
      <template v-for="(item,index) in menuData">
        <el-submenu :key="index" :index="item.index">
          <template slot="title">
            <i class="el-icon-s-unfold icon"></i>
            <span>{{ item.name }}</span>
          </template>
          <!-- 一级菜单没有子节点 -->
          <template v-for="(item2,idx) in getChildren(item)">
            <el-menu-item
              v-if="!hasChildren(item2)"
              :key="'/' + idx"
              :index="item2.index"
              class="child"
            >{{ item2.name }}</el-menu-item>
            <!-- 一级菜单有子节点 -->
            <el-submenu
              v-if="hasChildren(item2)"
              :key="idx"
              :index="item2.index"
            >
              <template slot="title">
                <span class="child">{{ item2.name }}</span>
              </template>
              <!-- 二级菜单没有子节点 -->
              <template v-for="(item3,ids) in getChildren(item2)">
                <el-menu-item
                  v-if="!hasChildren(item3)"
                  :key="'/' + ids"
                  :index="item3.index"
                  class="child"
                >{{ item3.name }}</el-menu-item>
                <!-- 二级菜单有子节点 -->
                <el-submenu
                  v-if="hasChildren(item3)"
                  :key="'/' + ids"
                  :index="item3.index"
                >
                  <template v-if="item3.children" slot="title">
                    <span class="child">{{ item3.name }}</span>
                  </template>
                  <!-- 三级菜单没有子节点 -->
                  <template v-for="(item4,idx4) in getChildren(item3)">
                    <el-menu-item
                      v-if="!hasChildren(item4)"
                      :key="idx4"
                      :index="item4.index"
                    >{{ item4.name }}</el-menu-item>
                    <!-- 三级菜单有子节点 -->
                    <el-submenu
                      v-if="hasChildren(item4)"
                      :key="'/' + idx4"
                      :index="item4.index"
                    >
                      <template slot="title">
                        <span class="child">{{ item4.name }}</span>
                      </template>
                      <!-- 判断是否为4级菜单 -->
                      <template v-for="(item5,idx5) in getChildren(item4)">
                        <el-menu-item
                          v-if="!hasChildren(item5)"
                          :key="idx5"
                          :index="item5.index"
                        >{{ item5.name }}
                        </el-menu-item>
                        <el-submenu
                          v-if="hasChildren(item5)"
                          :key="'/' + idx5"
                          :index="item5.index"
                        >
                          <template slot="title">
                            <span class="child">{{ item5.name }}</span>
                          </template>
                          <!-- 判断是否为4级菜单 -->
                          <template v-for="(item6,idx6) in getChildren(item5)">
                            <el-menu-item
                              :key="idx6"
                              :index="item6.index"
                            >{{ item6.name }}
                            </el-menu-item>
                          </template>
                        </el-submenu>
                      </template>
                    </el-submenu>
                  </template>
                </el-submenu>
              </template>
            </el-submenu>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routerConfig from '../../../../config/routerConfig'
import MenuModule from '../../../../api/frame/common/menu'
export default {
  name: 'LevelMenu',
  data() {
    return {
      show: false,
      Is: '',
      fiscal: 'fiscal',
      navMenuDatas: [],
      menuChildrens: [],
      menuData: [],
      codeObj: {},
      routerConfig: routerConfig,
      navMenuData: [
        {
          index: '01',
          name: '全部导航',
          routerName: 'Table'
        }
      ]
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    hasChildren(item) {
      return Array.isArray(item.children) && item.children.length
    },
    getChildren(item) {
      return Array.isArray(item.children) ? item.children : []
    },
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
      // 三级菜单请求
      MenuModule.getMenuInfo().then((res) => {
        // this.navMenuData[0].children = res
        // this.menuData = this.navMenuData
        if (Array.isArray(res)) {
          if (res.length) {
            this.navMenuData[0].children = res
            this.menuData = this.navMenuData
            this.rever(this.menuData)
          } else {
            // this.$message({
            //   dangerouslyUseHTMLString: true,
            //   message: '当前用户'
            // })
          }
        }
      })
      // 三级菜单死数据
      // let self = this
      // api.getTableData().then(res => {
      //   if (!res.rscode) return
      //   if (res.rscode === 10000) {
      //     self.navMenuData[0].children = res.data
      //     self.menuData = self.navMenuData/
      //     self.rever(self.menuData)
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
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
</style>
