<!--用户印章授权 gyl-->
<template>
  <div style="height:100%">
    <!-- <TreeScollLoad /> -->
    <BsMainFormListLayout>
      <template v-slot:topTap> topTap </template>
      <template v-slot:topTabPane></template>
      <template v-slot:query></template>
      <template v-slot:mainTree>
      </template>
      <template v-slot:mainForm>
        <div style="height:100%">
          <div :class="[isSwitch ? 'user' : '', 'tree']">
            <div class="title">
              <span style="font-size: 14px;font-weight: bold;margin-top: 7px;">用户列表</span>
              <vxe-button
                v-if="isSwitch"
                icon="ri-arrow-left-right-line"
                status="primary"
                size="mini"
                style="float: right; margin-top: 10px"
                content="切换配置方式"
                @click="doSwitch"
              />
            </div>
            <!-- 处室选择 -->
            <!-- <BsForm
              ref="addForm"
              :form-items-config="addFormItemsConfig"
              :form-data-list="formData"
              @itemChange="itemChange"
            /> -->
            <TreeScollLoad
              v-if="showUser"
              ref="userTree"
              :treeid="treeId"
              :global-config="globalConfig"
              :defaultcheckedkeys="userCheckedKeys"
              :nodecheckmethod="doUserCheck"
            />
            <!-- <BsBossTree
              ref="userTree"
              v-loading="showLoadingLeft"
              :visible="true"
              :datas="userTreeData"
              empty-text="暂无数据"
              :is-need-root="false"
              :is-show-input="true"
              :clickmethod="treeNodeClick"
              :open-loading="true"
              :defaultexpandedkeys="['0']"
            /> -->
          </div>
          <div class="proRelation tree">
            <div class="title">
              <span style="font-size: 14px;font-weight: bold;float: left;margin-top: 7px;">资金列表</span>
              <vxe-button
                v-if="!isSwitch"
                icon="ri-arrow-left-right-line"
                status="primary"
                size="mini"
                style="float: right; margin-top: 10px"
                content="切换配置方式"
                @click="doSwitch"
              />
            </div>
            <BsBossTree
              v-if="showProRelation"
              ref="stampTree"
              v-loading="showLoadingRight"
              :visible="true"
              :datas="stampTreeData"
              empty-text="暂无数据"
              :is-need-root="false"
              :is-show-input="true"
              :open-loading="true"
              :is-checkbox="!isSwitch"
              :nodecheckmethod="nodecheckmethod"
              :defaultexpandedkeys="['0','01','02']"
              :clickmethod="onClickmethod"
            />
          </div>
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import HttpModule from '@/api/frame/main/fundMonitoring/userProRelation.js'
export default {
  name: 'UserProRelation',
  data() {
    return {
      showLoadingLeft: false,
      showLoadingRight: false,
      userTreeData: [],
      stampTreeData: [],
      proArray: [],
      userSelect: {},
      relationGlobalConfig: {
        openLoading: false,
        emptyText: '暂无数据',
        isNeedRoot: false,
        rootname: '全部',
        isShowInput: true,
        isCheckbox: true
      },
      relationServer: {
        isServer: true,
        ajaxType: 'post',
        // serverUri: 'plan-service/queryTreeAssistData'
        serverUri: 'dfr-monitor-service/dfr/userProRelation/query'
      },
      isSwitch: false,
      globalConfig: {
        isCheckbox: false,
        openLoading: false,
        emptyText: '暂无数据',
        isNeedRoot: false,
        rootname: '全部',
        isShowInput: true
      },
      // 切换组件刷新
      showUser: true,
      showProRelation: true,
      // 处室选择
      addFormItemsConfig: [
        {
          field: 'manageMofDepCodeList',
          itemRender: {
            name: '$vxeTree',
            options: [],
            props: {
              config: {
                treeProps: {
                  nodeKey: 'id',
                  label: 'label',
                  children: 'children'
                },
                placeholder: '所属处室',
                multiple: true,
                readonly: true,
                isleaf: true
              }
            }
          }
        }
      ],
      formData: {
        manageMofDepCodeName: ''
      },
      // 资金选择
      proCodeSelect: {},
      userCheckedKeys: [],
      treeId: 'id'
    }
  },
  methods: {
    aaa(obj, checksObj) {
      console.log(obj, checksObj)
    },
    init() {
    },
    onUserTreeLoadFinish(data) {
      this.userTreeData = data
      HttpModule.queryTableDatas().then(res => {
        this.stampTreeData = res.data
        this.$nextTick(() => {
          // 重新赋值
          this.userTreeData = []
          this.userTreeData = this.stampTreeData
        })
        this.showLoadingRight = false
      }).catch(() => {
        this.showLoadingRight = false
      })
    },
    treeNodeClick(obj) {
      if (!this.isSwitch) {
        this.userSelect = obj
        const param = {
          userId: obj.id
        }
        HttpModule.queryByUserId(param).then(res => {
          let array = []
          res.data.forEach(item => {
            array.push(item.proCode)
          })
          this.proArray = array
          this.$refs.stampTree.setCheckedKeys(array)
        })
      }
    },
    nodecheckmethod(obj, state) {
      // if (obj.proCode === '0' || obj.proCode === '01' || obj.proCode === '02') {
      //   this.$message.warning('根节点不能被选中！')
      //   this.$refs.stampTree.setCheckedKeys(this.proArray)
      //   return
      // }
      if (this.userSelect.id) {
        let isChecked = state.checkedKeys.indexOf(obj.code) > -1
        var param = {
          userId: this.userSelect.id,
          proList: state.checkedNodes
            .map(item => {
              return { proCode: item.code, proName: item.proName, cfsHotTopicCateCode: item.cfsHotTopicCateCode }
            })
        }
        HttpModule.insert(param).then(res => {
          if (res.code === '000000') {
            this.$message.success(isChecked ? '授权成功' : '取消授权成功')
          } else {
            this.treeNodeClick(this.userSelect)
            this.$message.error(res.result)
          }
        })
      } else {
        this.$message.warning('请选择用户！')
      }
    },
    // 配置方式切换
    doSwitch() {
      this.isSwitch = !this.isSwitch
      this.userSelect = {}
      this.proCodeSelect = {}
      this.showUser = false
      this.showProRelation = false
      this.globalConfig.isCheckbox = this.isSwitch
      this.$nextTick(() => {
        this.showUser = true
        this.showProRelation = true
      })
    },
    // 处室选择
    itemChange({ $form, property, itemValue, data }, bsform) {
      // form表单联动当前字段change事件代理
      switch (property) {
        case 'manageMofDepCodeList' :
          this.formData.manageMofDepCodeList = itemValue
          break
        default :
          break
      }
    },
    // 获取处室树
    getDep() {
      const param = {
        elementcode: 'hold6',
        year: this.$store.state.userInfo.year,
        province: this.$store.state.userInfo.province,
        wheresql: 'and code != \'00\''
      }
      HttpModule.getTreewhere(param).then(res => {
        let treeResdata = this.getChildrenNewData1(res.data)
        this.addFormItemsConfig[0].itemRender.options = treeResdata
      })
    },
    getChildrenNewData1(datas) {
      let that = this
      datas?.forEach(item => {
        item.label = item.text
        if (item.children) {
          that.getChildrenNewData1(item.children)
        }
      })
      return datas
    },
    // 选中资金
    onClickmethod(node) {
      if (this.isSwitch) {
        this.proCodeSelect = node
        const param = {
          proCode: node.code,
          cfsHotTopicCateCode: node.cfsHotTopicCateCode
        }
        HttpModule.queryByUserId(param).then(res => {
          let array = []
          res.data.forEach(item => {
            array.push(item.userId)
          })
          this.userCheckedKeys = array
          this.$refs.userTree.$refs.treeLeft.setCheckedKeys(array)
        })
      }
    },
    // 选择用户配置
    doUserCheck(obj, state) {
      if (this.proCodeSelect?.id) {
        let isChecked = state.checkedKeys.indexOf(obj.id) > -1
        var param = {
          userId: obj.id,
          proCode: this.proCodeSelect.code,
          proName: this.proCodeSelect.name,
          cfsHotTopicCateCode: this.proCodeSelect.cfsHotTopicCateCode
        }
        if (this.proCodeSelect.code.length < 3) {
          this.$message.info('请选择具体的资金进行挂接')
          return
        }
        if (isChecked) {
          HttpModule.insert(param).then(res => {
            if (res.code === '000000') {
              this.$message.success('授权成功')
            } else {
              this.$message.error(res.result)
            }
          })
        } else {
          HttpModule.delete(param).then(res => {
            if (res.code === '000000') {
              this.$message.success('取消授权成功')
            } else {
              this.$message.error(res.result)
            }
          })
        }
      } else {
        this.$message.warning('请选择资金！')
      }
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.getDep()
  }
}
</script>
<style scoped lang="scss">
.tree{
  float:left;
  height:100%;
  width:50%
}
/deep/.tree_scollLoad__base__input{
  height: 40px;
  width: calc(100% - 30px);
  padding: 5px
}
/deep/.tree_scollLoad {
  height: calc(100% - 50px) !important;
  max-height: calc(100% - 50px) !important;
}
/deep/.T-mainFormListLayout-modulebox .mmc-formlist {
  margin-left: 0 !important;
}
/deep/.tree_scollLoad__base__tree {
  height: calc(100% - 48px) !important;
}
/deep/.user {
  float: right;
}
/deep/.vxe-form--item {
  padding: .5em .8em 0 0 !important;
}
/deep/.Titans-form {
  float: left;
}
// /deep/.tree.tree_scollLoad__base__tree{
//     height:calc(100% - 84px);
// }
</style>
