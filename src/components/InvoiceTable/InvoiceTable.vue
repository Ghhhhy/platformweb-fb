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
        <div v-if="reFresh" :key="index" class="invoic-table">
          <div v-for="item in itemConfig" :key="item.name" class="invoic-table-item" :style="{ gridColumnStart: 'span ' + item.col,gridRowStart: 'span ' + item.row }">
            <!-- 遍历渲染组件 -->
            <div v-if="item.type === 'text'" :class="item.row > 1 ? 'invoic-table-item-multiple-text' : 'invoic-table-item-text'">
              <span v-if="item.required === true" style="color:red;">*</span>
              {{ item.name }}
            </div>
            <div v-else-if="item.type === 'input'" :id="item.model" class="invoic-table-item-input">
              <vxe-input
                v-model="dataList[item.model]"
                :placeholder="item.placeholder"
                :disabled="item.disabled"
                @suffix-click="appendMethod(item.appendMethod)"
                @change="clearValidate"
                @input="itemChange($event,item)"
              >
                <template v-if="item.append" v-slot:suffix>
                  <i><img src="~@/assets/img/basic/person.svg"></i>
                </template>
              </vxe-input>
              <div class="valid-tip"></div>
            </div>
            <!-- 若果是金额类型,则只允许输入数字 -->
            <div v-else-if="item.type === 'money'" :id="item.model" class="invoic-table-item-input">
              <vxe-input
                v-model="dataList[item.model]"
                align="right"
                :disabled="item.disabled"
                @blur="changeFormat(item)"
                @focus="clearFormat(item)"
                @input="itemChange($event,item)"
              />
              <div class="valid-tip"></div>
            </div>
            <div v-else-if="item.type === 'treeInput'" :id="item.model" class="invoic-table-item-treeInput">
              <BsTreeInput
                ref="testTreeInput"
                v-model="dataList[item.model]"
                :is-server="true"
                :edit-config="item.editConfig"
                :elecode="item.elecode"
                :server-uri="item.serverUri"
                :disabled="item.disabled"
                :queryparams="item.queryparams"
                :isleaf="item.isleaf"
                :dropdownmethod="setTreeData"
                @input="itemChange($event,item)"
              />
              <div class="valid-tip"></div>
            </div>
            <div v-else-if="item.type === 'vxe-select'" :id="item.model" class="invoic-table-item-select">
              <vxe-select v-model="dataList[item.model]" :placeholder="item.placeholder" @input="itemChange($event,item)">
                <vxe-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                />
              </vxe-select>
              <div class="valid-tip"></div>
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
import util from '@/components/tool/util.js'
import { commonFn } from './common.js'
export default {
  name: 'InvoicTable',
  props: {
    itemConfig: {
      type: [Array, Object],
      default() {
        return [
          {

          }
        ]
      }
    },
    dataList: {
      type: [Array, Object],
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentRequestItem: '',
      itemConfigIn: [...this.itemConfig],
      reFresh: true,
      index: 1
    }
  },
  methods: {
    /**
     * 把金额千分位格式显示
     */
    changeFormat(item) {
      this.dataList[item.model] = commonFn.format(Number(this.dataList[item.model]).toFixed(2))
    },
    setTreeData(val, e, { elementCode }) {
      // 手动为treeinput的id,code,name赋值
      elementCode = elementCode.toLowerCase()
      let data = {}
      Object.assign(data, this.dataList)
      data[elementCode + '_id'] = val.id
      data[elementCode + '_code'] = val.code
      data[elementCode + '_name'] = val.name
      this.dataList = data
      this.doValidate({ field: elementCode }, false)
    },
    clearValidate({ value, $event }) {
      let element = $event.path[2]
      element.querySelector('input').style.border = '1px solid #DCDFE6'
      element.querySelector('.valid-tip').style.display = 'none'
    },
    // 校验添加提示信息
    doValidate(item, validates) {
      let element = document.querySelector('#' + item.field)
      if (validates === true) {
        element.querySelector('input').style.border = '1px red solid'
        element.querySelector('.valid-tip').style.display = 'block'
        element.querySelector('.valid-tip').innerHTML = item.message || '请输入' + item.name
      } else {
        element.querySelector('input').style.border = '1px solid #DCDFE6'
        element.querySelector('.valid-tip').style.display = 'none'
      }
    },
    /**
     * 当用户输入时
     * 对单个Item进行校验
     */
    validateItem(item) {
      if (item.type === 'text' && item.required) {
        if (!self.dataList[item.field] || (self.dataList[item.field] + '').includes('initId')) {
          this.doValidate(item, true)
        } else {
          this.doValidate(item, false)
        }
      }
    },
    // 提交时 验证非空
    validate() {
      // 校验非空
      var self = this
      var validates = false
      this.itemConfig.map(item => {
        if (item.type === 'text' && item.required) {
          if (!self.dataList[item.field] || (self.dataList[item.field] + '').includes('initId')) {
            validates = true
            this.doValidate(item, true)
          } else {
            this.doValidate(item, false)
          }
        }
      })
      if (!validates) {
        this.itemConfig.map(item => {
          // 千分位转数字
          if (item.type === 'money') {
            this.dataList[item.model] = commonFn.thousandToNum(this.dataList[item.model])
          }
        })
      }
      return validates
    },
    appendMethod(code) {
      this.$emit('appendMethod', code)
    },
    refresh() {
      this.index++
    },
    // 转换金额大小写
    transferUpper() {
      this.itemConfig.map(item => {
        if (item.type === 'money') {
          this.dataList[item.model + '_big'] = util.transformFn.digitUppercase(this.dataList[item.model])
        }
      })
    },
    /**
     * 当数据发生改变时触发事件
     * Todo
     * 先把非空校验设为空 以后有正则校验时再改为重新校验
     * 再触发itenchange事件  供业务处理数据
     */
    itemChange($event, item) {
      this.validateItem(item)
      this.$emit('itemChange', item.model, this.dataList[item.model], this.dataList, this.itemConfig)
    },
    /**
     * 清除千分位模式
     */
    clearFormat(item) {
      if (this.dataList[item.model] !== '') {
        this.dataList[item.model] = commonFn.thousandToNum(this.dataList[item.model])
      }
    }
  },
  watch: {
    dataList: {
      handler(newValue, oldValue) {
        this.$emit('update:dataList', this.dataList)
        this.transferUpper()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.invoic{
  display: grid;
  width: 100%;
  grid-template-columns: 4fr 92fr 4fr;
  align-items: center;
  /*发票表格样式*/
  .invoic-table{
    display: grid;
    grid-template-columns: repeat(10,1fr);
    grid-auto-rows: 58px;
    border: 1px solid #0c9fe3;
    border-bottom: 2px solid #0c9fe3;
    border-left: 2px solid #0c9fe3;
    width: 100%;
  }
  .invoic-table-item{
    border-right: 0.5px solid #0c9fe3;
    border-top: 0.5px solid #0c9fe3;
    color: #0c9fe3;
    .valid-tip{
      color: red;
      font-size: 8px;
      text-align: right;
    }
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
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    padding: 10px;
    .vxe-input {
      font-size: 14px;
      height: 38px;
      width: 100%;
    }
    .vxe-input--inner[disabled] {
      color: #000;
      font-weight: 700;
    }
  }
  .borderCircle{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #f3f8ff;
    margin-bottom: 23px;
  }
  .vouLDiv-right .borderCircle{
  margin-left: calc(100% - 14px);
  }
  .invoic-table-item-treeInput{
    width: calc(100% - 16px);
    padding:8px
  }
  /**
   select框的样式
  */
  .invoic-table-item-select{
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    padding: 10px;
    .vxe-select{
      width: 100%;
      height: 38px;
    }
    .vxe-input {
      font-size: 14px;
      height: 38px;
      width: 100%;
    }

  }
}

</style>
