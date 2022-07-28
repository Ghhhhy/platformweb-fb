<!-- 功能菜单 -->
<template>
  <div class="menu-children__tree">
    <el-input
      v-model="keyWord"
      placeholder="请输入菜单内容"
      size="mini"
      @input="input"
    />
    <div v-if="keyWord" class="filter-box">
      <ul>
        <li v-for="(k,v) in filterMsg" :key="v" @click="getRouter(k)">
          {{ k.name }}
        </li>
      </ul>
    </div>
    <div v-else style="padding: 20px;box-sizing:border-box">
      <tree-render :tree-data="treeList" />
    </div>
  </div>
</template>

<script>
import MenuModule from '@/api/frame/common/menu.js'

import treeRender from './components/TreeRender'

export default {
  components: {
    treeRender
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    treeData: {
      type: [Array, Object],
      // required: true,
      default: () => {}
    }
  },
  data() {
    return {
      filterMsg: [],
      keyWord: '',
      allMsg: []
    }
  },
  methods: {
    getRouter(value) {
      let arr = []
      arr.push(value)
      let valueNum = arr.slice(0, arr.length + 1)
      if (valueNum[0].name === valueNum[0].f_FullName) {
        this.onMenuSelectChange(value)
      }
    },
    onMenuSelectChange(obj) {
      let self = this
      if (obj.param5 && obj.param5.indexOf('needcheck=true') >= 0) { // 需要校验编报是否已关闭
        let params = {
          menuguid: obj.guid,
          appguid: obj.appid,
          appid: obj.appsysid,
          specroleguid: '',
          roleguid: obj.roleguid }
        MenuModule.getFbPageConfig(params).then(res => {
          Object.assign(obj, res)
          if (res.isbudgetbegin === 0 && res.datatype !== 8) {
            self.$message('预算编报已关闭')
          } else {
            this.$store.commit('setCurMenuObj', obj)
          }
        })
      } else {
        this.$store.commit('setCurMenuObj', obj)
      }
    },
    input (queryString) {
      let queryStringArr = queryString.split('')
      let str = '(.*?)'
      this.filterMsg = []
      let regStr = str + queryStringArr.join(str) + str
      let reg = RegExp(regStr, 'i') // 以mh为例生成的正则表达式为/(.*?)m(.*?)h(.*?)/i
      this.allMsg.map(item => {
        if (reg.test(item.name)) {
          this.filterMsg.push(item)
        }
      })
    },
    // 树状结构数据转换 底层route push进父级sublist
    format (obj, level = 0) {
      if (obj.children) {
        const data = obj.children
        for (var index = 0; index < data.length; index++) {
          var item = data[index]
          item.level = level + 1
          if (item.children) {
            for (var i = 0; i < item.children.length; i++) {
              if (item.children[i].children) {
                item.children[i].level = level + 2
                this.format(item.children[i], level + 2)
              } else {
                item.subList ? item.subList.push(item.children[i]) : (item.subList = [item.children[i]])
                item.children.splice(i--, 1)
              }
            }
          } else {
            obj.subList ? obj.subList.push(item) : (obj.subList = [item])
            data.splice(index--, 1)
          }
        }
        return [obj]
      } else {
        return [obj]
      }
    },
    // 树扁平化
    treeToList (tree, result = [], level = 0) {
      tree.forEach(node => {
        result.push(node)
        node.level = level + 1
        node.children && this.treeToList(node.children, result, level + 1)
      })
      return result
    }

  },
  created() {

  },
  mounted() {
  },
  beforeDestroy() {},
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.treeList = this.format(JSON.parse(JSON.stringify(newValue)))
        this.allMsg = newValue.children
          ? this.treeToList(JSON.parse(JSON.stringify(newValue)).children) : JSON.parse(JSON.stringify(newValue))
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang='scss' scoped>
.menu-children__tree{
  height: 300px;
  padding: 20px;
  box-sizing: border-box;
  .filter-box{
    padding: 20px 0;
    box-sizing: border-box;
    ul{
      li{
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        padding: 0 5px;
        border-radius: 5px;
      }
      li:hover{
        background: rgb(235, 226, 226);
      }
    }
  }
}
</style>
