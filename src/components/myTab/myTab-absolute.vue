<template>
  <!-- 上部tab 审核信息 归档信息 -->
  <div class="my-tab" :style="{ top: top }">
    <!-- <div v-show="treeSwitch" class="tree-switch" @click="switchTree">
      <img src="./catalog.png">
    </div> -->
    <div v-for="item in tabList" :key="item.code" :class="curTabSelect.code === item.code ? 'my-tab-tabItem my-tab-active' : 'my-tab-tabItem' " @click="onTabElClick(item)">
      <span class="label">{{ item.label }}(<span class="unread">3</span>)</span>
      <!-- <span class="bubble">10</span> -->
    </div>
    <!-- <table class="pay-input-table">
                <caption style="text-align:center;font-weight:700;font-size:large;color:#0c9fe3;"></caption>
                <tbody>
                  <tr>
                    <td rowspan="3" class="table-td-title">
                      <p align="center" uniqueid="htmlelement1011">付</p>
                      <p align="center">款</p><p align="center">人</p>
                    </td>
                    <td class="table-td-title" uniqueid="htmlelement1010">付款人名称</td>
                    <td class="input-td">
                      <el-input
                        v-model="input"
                        placeholder="系统自动确定"
                        :disabled="true"
                      />
                    </td>
                    <td rowspan="3" class="table-td-title">
                      <p align="center">收</p>
                      <p align="center">款</p>
                      <p align="center">人</p>
                    </td>
                    <td class="table-td-title">收款人名称</td>
                    <td class="input-td">
                      <el-input
                        v-model="currentRequestItem.card_holder"
                        placeholder="系统自动确定"
                        :disabled="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-td-title">付款人账号</td>
                    <td class="input-td">
                      <el-input
                        v-model="input"
                        placeholder="系统自动确定"
                        :disabled="true"
                      />
                    </td>
                    <td class="table-td-title">收款人账号</td>
                    <td class="input-td">
                      <el-input
                        v-model="currentRequestItem.payer_acc_no"
                        placeholder="系统自动确定"
                        :disabled="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-td-title">开户行</td>
                    <td class="input-td"><el-input
                      v-model="input"
                      placeholder="系统自动确定"
                      :disabled="true"
                    />
                    </td>
                    <td class="table-td-title">开户行</td>
                    <td class="input-td">
                      <el-input
                        v-model="currentRequestItem.card_bank_name"
                        placeholder="系统自动确定"
                        :disabled="true"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-td-title">
                      <span style="color:red;">*</span>
                      <span>经济科目</span>
                    </td>
                    <td colspan="2" class="input-td">
                      <div id="expecoDiv" class="treeinput">
                        <div class="input-group input-group-sm treeinput-control maxx-width minn-width">
                          <el-input
                            v-model="input"
                            clearable
                          />
                        </div>
                      </div>
                    </td>
                    <td class="table-td-title">
                      <span style="color:red;">*</span>
                      <span>结算方式</span>
                    </td>
                    <td colspan="2" class="input-td" uniqueid="htmlelement1006">
                      <div id="setmodeDiv" class="treeinput">
                        <div class="input-group input-group-sm treeinput-control maxx-width minn-width">
                          <el-input
                            v-model="input"
                            clearable
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr><td class="table-td-title"><span style="color:red;">*</span><span>资金用途</span></td>
                    <td class="input-td" colspan="5">
                      <el-input
                        v-model="input"
                        clearable
                      />
                    </td>
                  </tr>
                  <tr>
                    <td class="table-td-title">
                      <span style="color:red;">*</span>金额
                    </td>
                    <td colspan="2" class="input-td">
                      <div id="inputamtdiv">
                        <el-input
                          v-model="input"
                          clearable
                        />
                      </div>
                    </td>
                    <td class="table-td-title">大写金额</td>
                    <td colspan="2" class="input-td">
                      <div id="bigamtdiv">
                        <el-input
                          v-model="input"
                          clearable
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table> -->
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: [Array, Object],
      default() {
        return [
          {
          }
        ]
      }
    },
    treeSwitch: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  mounted() {
    this.curTabSelect = this.tabList[0]
    var table = document.querySelector('.Titans-table')
    this.top = table.offsetTop + 6 + 'px'
  },
  data() {
    return {
      curTabSelect: {},
      top: 20
    }
  },
  methods: {
    onTabElClick(obj) {
      this.curTabSelect = Object.assign({}, obj)
      this.$emit('onTabClick', obj)
    },
    // 控制左侧树的显示与隐藏
    switchTree() {
      this.$emit('switchTree')
    }
  }
}
</script>
<style>
.my-tab{
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  z-index: 99;
}
.my-tab-tabItem{
  position: relative;
  cursor: pointer;
  background-size: 60px;
  height: 34px;
  line-height: 1;
  border: 1px solid #dcdfe6;
  transition: 0.3s;
  text-align: center;
  background-color: #fff;
  outline: 0;
  font-size: 14px;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0px 0px 0px 5px;
}
.my-tab-tabItem:hover{
 box-shadow: 0px 0px 2px var(--primary-color);
 color: var(--primary-color);
}
.my-tab-active{
    border-color: var(--primary-color);
    color:var(--primary-color) ;
}
.my-tab-tabItem .label{
    font: 12px/1.5 "微软雅黑";
    font-size: 14px;
    width: 94px;
    line-height: 34px;
    text-align: center;
    font-size: 14px;
    padding: 0px 15px;
}
.tree-switch{
    height: 20px;
    border-radius: 6px;
    background-color: var(--primary-color);
    text-align: center;
    width: 50px;
    margin-bottom: 20px;
    padding: 18px 0;
    cursor: pointer;
    margin-left: -10px;
    }
.bubble{
    font-weight: 500;
    font-size: 12px;
    color: #F4F4F6;
    position: absolute;
    left: 44px;
    border-radius: 17px;
    background: #E82C25;
    min-width: 17px;
    width: fit-content;
    height: 17px;
    text-align: center;
    line-height: 17px;
    top: -5px;
}
/* 待处理 */
.unread{
color: red;
}
</style>
