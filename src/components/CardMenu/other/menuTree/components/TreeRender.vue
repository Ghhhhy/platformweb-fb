<!-- 功能菜单 -->
<template>
  <div class="tree-box">
    <ul v-for="(item, index) in data" :key="index">
      <li>
        <div class="tree-list-box">
          <div
            class="left"
            :style="{ width: `${150 - item.level * 10}px` }"
          >{{ item.name }}</div>
          <div
            v-if="item.subList"
            class="right"
          >
            <span v-for="(it, idx) in item.subList" :key="idx" @click="getRouter(it)">
              <el-tooltip v-if="it.name.length > 8 && renderTip" class="item" effect="dark" :content="it.name" placement="top-start">
                <strong>{{ it.name }}</strong>
              </el-tooltip>
              <i v-else> {{ it.name }}</i>
            </span>
          </div>
          <div style="clear: both;"></div>
        </div>
        <menu-tree v-if="item.children && item.children.length > 0" :tree-data="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
import globalConfig from '../../../../GlobalConfig/index.js'
import MenuModule from '@/api/frame/common/menu.js'

export default {
  components: {},
  name: 'MenuTree',
  props: {
    treeData: {
      type: [Array, Object],
      // required: true,
      default: () => {}
    }
  },
  data () {
    return {
      renderTip: globalConfig.homeCard.showTip,
      keyWord: '',
      menuData: this.data
    }
  },
  computed: {},
  methods: {
    input (val) {
      console.log(val)
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
          if (res) {
            if (res.code === '100000') {
              Object.assign(obj, res)
              if (res.data.isbudgetbegin === 0 && res.data.datatype !== 8) {
                self.$XModal.message({ status: 'info', message: '预算编报已关闭' })
              } else {
                self.$store.commit('setCurMenuObj', obj)
              }
            } else {
              console.log(res.errorInfor)
              if (res.code === 0) {
                self.$XModal.message({ status: 'error', message: res.errorInfor.response.data.msg })
              } else if (res.msg) {
                self.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.msg}]` })
              } else if (res.message) {
                this.$XModal.message({ status: 'error', message: `错误：[${res.code}-${res.message}]` })
              } else {
                self.$XModal.message({ status: 'error', message: '未知错误' })
              }
            }
          } else {
            self.$XModal.message({ status: 'error', message: '服务错误，请查看日志' })
            console.log(res)
          }
        }).catch(e => {
          self.$message('获取预算编报状态失败：' + e.message)
        })
      } else {
        this.$store.commit('setCurMenuObj', obj)
      }
    },
    getRouter(value) {
      let arr = []
      arr.push(value)
      let valueNum = arr.slice(0, arr.length + 1)
      if (valueNum[0].name === valueNum[0].f_FullName) {
        this.onMenuSelectChange(value)
      }
    },
    treeFindPath (tree, func, path = []) {
      if (!tree) return []
      for (const data of tree) {
        path.push(data.id)
        if (func(data)) return path
        if (data.children) {
          const findChildren = this.treeFindPath(data.children, func, path)
          if (findChildren.length) return findChildren
        }
        path.pop()
      }
      return []
    }
  },
  created () {
  },
  mounted () {

  },
  watch: {
    treeData: {
      handler (newValue, oldValue) {
        this.data = newValue
        this.$forceUpdate()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped lang="scss">
.tree-box{
  ul{
    margin-left: 10px;
    .tree-list-box{
      line-height: 25px;
      display: flex;
      .left{
        width: 150px;
        font-size: 14px;
        font-weight: 700;
      }
      strong, i{
        font-style: normal;
        font-weight: normal;
      }
      .right{

        flex: 1;
        cursor: pointer;
        span{
          margin-right: 18px;
          color: var(--menu-item-color);
          display: inline-block;
          width: 240px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
