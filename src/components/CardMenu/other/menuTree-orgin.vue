<template>
  <div class="menu-children__tree">
    <div v-for="(item, index) in menuData.children" :key="index" class="menuData">

      <div v-if="item.children" class="menuChildren">
        <span class="twoChildren">{{ item.name }}</span>
        <div class="threeData">
          <span v-for="(it, idx) in item.children" :key="idx" @click="getRouter(it)">
            <el-tooltip v-if="it.name.length > 8 && renderTip" class="item" effect="dark" :content="it.name" placement="top-start">
              <strong>{{ it.name }}</strong>
            </el-tooltip>
            <i v-else> {{ it.name }}</i>
          </span>
        </div>
      </div>
      <div v-if="!item.children" class="menuChildren">
        <span class="twoChildren"></span>
        <div class="threeData">
          <span @click="getRouter(item)">{{ item.name }}</span>
        </div>
      </div>
      <el-divider />
    </div>
  </div>
</template>

<script>
import globalConfig from '../../GlobalConfig/index.js'
import MenuModule from '@/api/frame/common/menu.js'
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
      renderTip: globalConfig.homeCard.showTip,
      menuData: this.data
    }
  },
  methods: {
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
    getRouter(value) {
      let arr = []
      arr.push(value)
      let valueNum = arr.slice(0, arr.length + 1)
      if (valueNum[0].name === valueNum[0].f_FullName) {
        this.onMenuSelectChange(value)
      }
    }
  },
  created() {

  },
  mounted() {
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        // console.log(newValue.children, 'newValue')
        this.menuData = newValue
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-children__tree{
    height: 300px;
    .menuData {
      padding: 0 20px;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      .el-divider--horizontal{
        margin: 10px 0
      }
      .menuChildren {
        height: auto;
        margin: 10px auto 10px;
        display: flex;
        justify-content: space-between;
        .twoChildren {
          font-size: 16px;
          font-weight: 700;
          margin-top: 5px;
          width: 96px;
        }
        .threeData {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          height: auto;;
          margin-left: 20px;
          color: rgba(104, 99, 206, 1);
          font-size: 14px;
          float: right;
          strong, i{
            font-style: normal;
            font-weight: normal;
          }
          span {
            margin-top: 5px;
            margin-left: 20px;
            cursor: pointer;
            display: inline-block;
            width: 112px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          span:hover {
            color: red;
          }
        }
      }
    }
  }
</style>
