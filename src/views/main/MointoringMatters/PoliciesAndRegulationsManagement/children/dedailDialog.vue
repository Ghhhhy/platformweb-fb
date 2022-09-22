<!--政策法规管理详情页面弹框-->
<template>
  <vxe-modal
    v-model="showDetail"
    :title="title"
    width="96%"
    height="80%"
    :show-footer="true"
    @close="dialogClose"
  >
    <div v-loading="addLoading" class="payVoucherInput">
      <div>
        <div>
          <el-row>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规名称</div>
                    <el-input
                      v-model="regulationsName"
                      placeholder="请输入政策法规名称"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规编码</div>
                    <el-input
                      v-model="regulationsCode"
                      placeholder="请输入政策法规编码"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;预算单位</div>
                    <el-input
                      v-model="agencyName"
                      placeholder="请输入预算单位"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;财政区划</div>
                    <el-input
                      v-model="mofDivName"
                      placeholder="请输入财政区划"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;主管处室</div>
                    <el-input
                      v-model="manageMofName"
                      placeholder="请输入主管处室"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;维护人</div>
                    <el-input
                      v-model="createPersonName"
                      placeholder="请输入维护人"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;维护日期</div>
                    <el-input
                      v-model="createTime"
                      placeholder="维护日期"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;修改人</div>
                    <el-input
                      v-model="updatePersonName"
                      placeholder="修改人"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;修改日期</div>
                    <el-input
                      v-model="updateTime"
                      placeholder="修改日期"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;所属级别</div>
                    <el-input
                      v-model="province"
                      placeholder="所属级别"
                      :disabled="true"
                      style="width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
            <el-col :span="8">
              <el-container>
                <el-main width="100%">
                  <el-row>
                    <div class="sub-title-add" style="width:100px;float:left;margin-top:8px"><font color="red">*</font>&nbsp;政策法规描述</div>
                    <el-input
                      v-model="description"
                      type="textarea"
                      :rows="2"
                      :disabled="true"
                      placeholder="请输入政策法规描述"
                      style="margin-bottom:15px; width:45%"
                    />
                  </el-row>
                </el-main>
              </el-container>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 上传附件 -->
      <!-- <BsUploadBak ref="myUpload" :attachment-id="regulationsCode" :file-list="fileList" :file-data-bak-del.sync="fileDataBakDel" :file-data.sync="fileData" /> -->
    </div>
    <div slot="footer" style="height: 80px;margin:0 15px">
      <div v-if="showbox" id="bigbox"></div>
      <el-divider style="color:#E7EBF0" />
      <div type="flex" justify="space-around">
        <div>
          <vxe-button @click="dialogClose">取消</vxe-button>
        </div>
      </div>
    </div>
  </vxe-modal>
</template>
<script>
export default {
  name: 'AddDialog',
  components: {},
  computed: {
    curNavModule() {
      return this.$store.state.curNavModule
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    detailData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      regulationsName: '',
      description: '',
      agencyName: '',
      manageMofName: '',
      mofDivName: '',
      regulationsCode: '',
      createPersonName: '',
      createTime: '',
      updatePersonName: '',
      updateTime: '',
      province: '',
      showDetail: true,
      addLoading: false,
      // 文件上传相关参数
      fileList: [],
      fileData: [],
      fileDataBakDel: [],
      showbox: false
    }
  },
  methods: {
    dialogClose() {
      this.$parent.showDetail = false
      this.$parent.queryTableDatas()
    },
    showInfo() {
      this.regulationsName = this.detailData.regulationsName
      this.description = this.detailData.description
      this.agencyName = this.detailData.agencyName
      this.manageMofName = this.detailData.manageMofName
      this.mofDivName = this.detailData.mofDivName
      this.regulationsCode = this.detailData.regulationsCode
      this.createPersonName = this.detailData.createPersonName
      this.createTime = this.detailData.createTime
      this.updatePersonName = this.detailData.updatePersonName
      this.updateTime = this.detailData.updateTime
      this.province = this.detailData.province
    }
  },
  watch: {
  },
  created() {
    this.showInfo()
  }
}
</script>
<style lang="scss">
  .payVoucherInput {
    margin: 15px;
    .el-card {
      margin-top: 0
    }
  }
  .vxe-modal--wrapper .vxe-modal--box {
    z-index: 0;
  }
  #bigbox {
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: .3;
  }
  .el-row-item .font-set-small .hline{
    width:72px;
  }
</style>
