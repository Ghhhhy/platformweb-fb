<template>
  <div>
    <el-card
      shadow="always"
      style="padding:20px 0"
    >
      <div class="invoic">
        <!-- 左侧发票装饰 -->
        <div class="vouLDiv-left">
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
        </div>
        <!-- 发票区 -->
        <div class="invoic-table">
          <div v-for="item in itemConfig" :key="item.name" class="invoic-table-item" :style="{ gridColumnStart: 'span ' + item.col,gridRowStart: 'span ' + item.row }">
            <!-- 遍历渲染组件 -->
            <div v-if="item.type === 'text'" :class="item.row > 1 ? 'invoic-table-item-multiple-text' : 'invoic-table-item-text'">
              <span v-if="item.required === true" style="color:red;">*</span>
              {{ item.name }}
            </div>
            <div v-else-if="item.type === 'input'" :id="item.model" class="invoic-table-item-input">
              <el-input
                v-model="item.value"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
              />
            </div>
            <div v-else-if="item.type === 'treeInput'" :id="item.model" class="invoic-table-item-treeInput">
              <BsTreeInput
                ref="testTreeInput"
                v-model="item.value"
                :is-server="true"
                :datas="treeData"
                :elecode="item.elecode"
                :server-uri="item.serverUri"
                formatter="#name"
                open-format-label
                :queryparams="item.queryparams"
              />
            </div>
          </div>
        </div>
        <!-- 右侧发票装饰 -->
        <div class="vouLDiv-right">
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
          <div class="borderCircle"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
  name: 'AuditComponent',
  props: {
    itemConfig: {
      type: [Array, Object],
      default() {
        return [
          {

          }
        ]
      }
    }
  },
  data() {
    return {
      currentRequestItem: '',
      itemConfigIn: [...this.itemConfig],
      dataList: {},
      treeData: []

    }
  },
  methods: {
    // 绑定值重置后处理
    initData() {
      this.dataList = []
      let self = this
      this.itemConfig.forEach((item) => {
        if (item.type === 'input') {
          // var map = new Map()
          // map.set(item.model, item.value)
          let obj = {}
          obj[item.model] = item.value
          // self.dataList = { ...obj }
          Object.assign(self.dataList, obj)
          // 892AA833B8EB4FA396FA7DEB7A180ABB##21##21-与部门内单位
        } else if (item.type === 'treeInput') {
          var values = item.value.split('##')
          let obj = {}
          // treeInput为空时重新赋值
          if (values[1] === ' ') {
            obj[item.model + '_id'] = ''
            obj[item.model + '_code'] = ''
            obj[item.model + '_name'] = ''
          } else {
            obj[item.model] = item.value
            obj[item.model + '_id'] = values[0]
            obj[item.model + '_code'] = values[1]
            obj[item.model + '_name'] = values[2]
          }
          Object.assign(self.dataList, obj)
        }
      })
    },
    // 提交时 验证非空
    validate() {
      // fund_traobj_type
      // input7
      // 校验非空
      var self = this
      var validates = false
      this.itemConfig.map(item => {
        if (item.type === 'text' && item.required) {
          if (!self.dataList[item.field]) {
            validates = true
            let element = document.querySelector('#' + item.field)
            element.querySelector('input').style.border = '1px red solid'
          } else {
            let element = document.querySelector('#' + item.field)
            element.querySelector('input').style.border = '1px solid #DCDFE6'
          }
        }
      })
      return validates
    }

  },
  mounted() {
    // this.initItemConfig()
    // this.initData()
  },
  computed: {

  },
  watch: {
    itemConfig: {
      handler(newValue, oldValue) {
        // this.itemConfigIn = [...newValue]
        // this.initItemConfig()
        this.initData()
      },
      deep: true,
      immediate: true
    }

  }
}
</script>
<style lang="scss" scoped>
/*发票表格样式*/
.invoic-table{
display: grid;
grid-template-columns: repeat(10,1fr);
grid-auto-rows: 50px;
border: 1px solid #0c9fe3;
border-bottom: 2px solid #0c9fe3;
border-left: 2px solid #0c9fe3;
width: 100%;
}
.invoic-table-item{
 border-right: 0.5px solid #0c9fe3;
 border-top: 0.5px solid #0c9fe3;
 color: #0c9fe3;
}
// 标题
.invoic-table-item-text{
width: 100%;
height: 100%;
line-height: 50px;
text-align: center;
overflow:hidden;

}
//跨越多行的标题
.invoic-table-item-multiple-text{
width: 100%;
height: 100%;
text-align: center;
letter-spacing: 5px;
width: 60%;
writing-mode: tb-rl;
}
//输入框
.invoic-table-item-input{
line-height: 50px;
width: calc(100% - 16px);
margin-left: 8px;
}
.borderCircle{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #e2e2e2;
  margin-bottom: 23px;
}
.vouLDiv-right .borderCircle{
margin-left: calc(100% - 14px);
}
.invoic{
display: grid;
width: 100%;
grid-template-columns: 4fr 92fr 4fr;
    align-items: center;
}
.invoic-table-item-treeInput{
line-height: 50px;
width: calc(100% - 16px);
margin-left: 8px;
}
</style>
