<!--  工作流可选节点   Author:Titans@2396757591@qq.com -->
<template>
  <div class="wfd-itemPanel itemPanel" :style="{ 'height': height + 'px' }">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="(item,index) in nodes" :key="index" :title="i18n[item.code]" :name="index + ''">
        <template v-for="(itemc,indexc) in item.children">
          <img
            :key="index + '_' + indexc"
            :data-item="getDataItem(itemc)"
            :src="itemc.ico"
            :style="{ height: getSize(itemc,'height'),width: getSize(itemc,'width') }"
          >
          <div :key="index + '_' + indexc">{{ i18n[itemc.i18n] }}</div>
        </template>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>
<script>
import wfdFlow from '../config/config.js'
export default {
  inject: ['i18n'],
  props: {
    height: {
      type: Number,
      default: 800
    }
  },
  data() {
    return {
      nodes: wfdFlow.nodes,
      activeNames: []
    }
  },
  methods: {
    getDataItem(item) {
      return JSON.stringify(item)
    },
    getSize(obj, type) {
      let splitS = obj.isize.split('*')
      if (type === 'width') {
        return splitS[0] + 'px'
      } else {
        return splitS[1] + 'px'
      }
    },
    toogle(item, index) {
      item.open = !item.open
    },
    init() {

    }
  },
  mounted() {
    this.init()
  },
  watch: {
    tem: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="scss" >
.wfd-itemPanel {
    float: left;
    width: 10%;
    background: #eff2f5;
    overflow-y: auto;
    border-left: 1px solid #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    .el-collapse-item__content{
        padding:15px 0;
    }
    img{
        width: 92px;
        height: 96px;
        padding: 4px;
        border: 1px solid rgba(0,0,0,0);
        border-radius: 2px;
        &:hover{
            border: 1px solid #ccc;
            cursor: move;
        }
    }
    .el-collapse {
        border: 0;
        .el-collapse-item {
            > div[role=tab] > div {
                padding-left: 10px;
                border: 1px solid #E9E9E9;
                border-left:0;
            }
            &:first-child{
                > div[role=tab] > div {
                    border-top: 0;
                }
            }
            &:last-child{
                > div[role=tab] > div {
                    border-bottom: 1px solid #E9E9E9;
                }
            }
            .el-collapse-item__wrap{
                border-top: 0;
                background: #f0f2f5;
                text-align: center;
            }
        }
    }

}
</style>
