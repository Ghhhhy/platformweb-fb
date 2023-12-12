<template>
  <div class="menu-children__tree">
    <div v-if="menuData.children.filter(v => v.children && v.children.length).length" class="menuData">
      <el-input v-model="filterNavText" suffix-icon="el-icon-search" placeholder="请输入菜单内容" style="width:calc(100% - 24px);margin:10px 12px" @input="filterNav" />
      <div v-for="(item, index) in menuData.children" :key="index" class="menuChildren" :class="{ active: active === index && !filterNavText }" @click="active = index">
        <span class="twoChildren">{{ item.name }}</span>
      </div>
    </div>
    <template v-if="menuData.children && menuData.children.length">
      <div v-if="!filterNavText" class="threeData">
        <template v-if="menuData.children.filter(v => v.children && v.children.length).length">
          <template v-if="!menuData.children[active].children || !menuData.children[active].children.length">
            <span @click="getRouter(menuData.children[active])">{{ menuData.children[active].name }}</span>
          </template>
          <template>
            <span v-for="(itemt, indext) in menuData.children[active].children" :key="indext" @click="getRouter(itemt)">{{ itemt.name }}</span>
          </template>
        </template>
        <template v-else>
          <span v-for="(itemt, indext) in menuData.children" :key="indext" @click="getRouter(itemt)">{{ itemt.name }}</span>
        </template>
      </div>
      <div v-else class="threeData">
        <span v-for="(itemt, indext) in curFilterNavList" :key="indext" @click="getRouter(itemt)">{{ itemt.name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menuData: this.data,
      filterNavText: '',
      curFilterNavList: [],
      active: 0
    }
  },
  methods: {
    getRouter(value) {
      this.$store.commit('setCurMenuObj', value)
      this.$store.commit('setCurNavModule', value)
    },
    deepCopy(obj) {
      // 深拷贝通用方法
      let me = this
      if (typeof obj !== 'object' || obj === null) return obj
      let newObj = obj instanceof Array ? [] : {}
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? me.deepCopy(obj[key]) : obj[key]
        }
      }
      return newObj
    },
    filterNav() {
      if (this.filterNavText) {
        this.curFilterNavList = this.getFilterNavList(this.deepCopy(this.menuData.children))
      }
      this.active = 0
    },
    getFilterNavList(navList, list = []) {
      let self = this
      navList.forEach((item, index) => {
        if (item.children && item.children.length) {
          self.getFilterNavList(item.children, list)
        } else {
          if (item.name.indexOf(self.filterNavText) >= 0) {
            list.push(item)
          }
        }
      })
      return list
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {
    curFilterNavList: {
      handler() { },
      immediate: true
    },
    data: {
      handler(newValue, oldValue) {
        this.menuData = newValue
        this.active = 0
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-children__tree{
    height: 400px;
    display: flex;
    // &>div {
    //   height: 100%;
    //   display: flex;
    // }
    .threeData {
      overflow: auto;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin: 20px;
      // color: rgba(104, 99, 206, 1);
      font-size: 14px;
      float: right;
      span {
        height: 44px;
        padding: 0 14px;
        line-height: 44px;
        // margin-top: 5px;
        // margin-left: 20px;
        cursor: pointer;
        width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span:hover {
        color: var(--color6);
      }
    }
    .menuData {
      position: relative;
      &>.el-input {
        top: 10px;
        position: sticky;
      }
      overflow: auto;
      // width: 100%;
      border-radius: 12px;
      margin: 20px;
      background: #f9f9f9;
      min-width: 220px;
      // padding: 10px 12px;
      // height: auto;
      .menuChildren.active {
        background: #fff;
        .twoChildren {
          color: var(--color6);
        }
      }
      .menuChildren {
        // width: 95%;
        padding: 10px 14px;
        height: auto;
        // margin: 10px 2px;
        // display: flex;
        // justify-content: space-between;
        .twoChildren {
          font-size: 16px;
          // font-weight: 700;
          // margin-top: 5px;
          // width: 220px;
          // position: relative;
          // &::before {
          //   content: '';
          //   position: absolute;
          //   width: 5px;
          //   height: 5px;
          //   bottom: 8px;
          //   left: -10px;
          //   border-radius: 50%;
          //   background: rgba(104, 99, 206, 1);
          // }
        }
      }
    }
  }
</style>
