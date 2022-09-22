<template>
  <div style="padding-left: 20px;">
    <div v-show="custom" style="padding-left:50px">
      <el-row :gutter="10">
        <el-col :span="6">
          <BsTreeInputTest
            ref="bgtdocno"
            v-model="curData.defaultTreedocnoValue"
            :is-server="true"
            :reloaddata="true"
            :server-uri="serverUri"
            :queryparams="queryparams"
            :afterloadmethod="false"
            :isleaf="true"
            background-color="#00000000"
            :title-config="titleConfig"
            :prefix="prefix"
            open-format-label="true"
            formatter="#name"
            :dropdownmethod="afterDocnoSelect"
          />
        </el-col>
        <el-col :span="8"><span class="index_items" @click="standardNo">标准文号</span></el-col>
      </el-row>
    </div>
    <div v-show="!custom" style="padding-left:50px">
      <el-row :gutter="5">
        <div style="float:left;padding-top:8px;padding-right:8px"><span>{{ bgtdocdectip }} :</span></div>
        <el-col :span="3">
          <el-select v-model="curData.docno0Value" clearable placeholder="请选择">
            <el-option
              v-for="item in docno0"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="3">
          <div v-if="docno1Show">
            <el-select v-model="curData.docno1Value" clearable placeholder="请选择">
              <el-option
                v-for="item in docno1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <el-select v-model="curData.year" clearable placeholder="请选择">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-input
            v-model="docno"
            :readonly="linkoa"
          />
        </el-col>
        <el-col :span="1">
          <el-input
            value="号"
            :readonly="true"
          />
        </el-col>
        <el-col :span="5">
          <span v-if="linkoa" class="index_items" @click="getOaNo">获取oa文号</span>
          <span class="index_items" @click="customNo">自定义</span>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="10" style="padding-top:10px">
      <el-form :disabled="custom">
        <el-col :span="6">
          <el-form-item label="指标文标题 :" :label-width="formLabelWidth" style="padding-bottom: 0px">
            <el-input v-model="curData.doctitle" autocomplete="off" style="width: 245px" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发文时间 :" :label-width="formLabelWidth" style="padding-bottom: 0px">
            <el-date-picker
              v-model="curData.docdate"
              align="right"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="指标说明 :" :label-width="formLabelWidth" style="padding-bottom: 0px">
            <el-input v-model="curData.bgt_dec" autocomplete="off" style="width: 400px" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import BudgetCommonRespons from '@/api/frame/main/budgetManager/BudgetCommon'
export default {
  name: 'BudgetDocNo',
  props: {
    formData: {
      type: Object,
      default() {
        return {
          doctitle: '',
          docdate: '',
          bgt_dec: '',
          docno0Value: '',
          docno1Value: '',
          year: '',
          defaultTreedocnoValue: ''
        }
      }
    },
    cache: {
      type: Object,
      default() {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    bgtdocdec: {
      type: String,
      default: '标准文号'
    },
    linkoa: {
      type: Boolean,
      default: false
    },
    initStatus: { // 初始控件展示的状态 true：自定义文号，false: 标准文号
      type: Boolean
    }
  },
  data() {
    return {
      /* doctitle: '',
      docdate: '',
      docno0Value: '',
      docno1Value: '',
      year: '', */
      docno: '1',
      docno0: [],
      bgtdocdectip: this.bgtdocdec,
      years: [],
      docno1: [],
      // defaultBgtdocnoValue: {},
      serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
      queryparams: {
        appid: 'budget',
        useRight: false,
        eleCode: 'cor_bgt_doc_no'
      },
      titleConfig: {
        tip: this.bgtdocdec
      },
      formLabelWidth: '120px',
      curData: this.formData,
      custom: this.initStatus,
      docno1Show: false,
      cacheData: this.cache,
      editConfig: {
        initLoadTree: false,
        allowInput: true // 支持录入
      }
    }
  },
  methods: {
    afterDocnoSelect(datas) {
      let tempObj = {
        doctitle: datas.bgt_doc_title,
        docdate: datas.doc_date,
        bgt_dec: datas.bgt_dec
      }
      this.curData = Object.assign({}, this.curData, tempObj)
      /* this.curData.doctitle = datas.bgt_doc_title
      this.curData.docdate = datas.doc_date
      this.curData.bgt_dec = datas.bgt_dec */
    },
    standardNo() {
      this.custom = false
      this.initStatus = false
      /* this.curData.doctitle = ''
      this.curData.docdate = ''
      this.curData.bgt_dec = '' */
      let tempObj = {
        doctitle: '',
        docdate: '',
        bgt_dec: ''
      }
      this.curData = Object.assign({}, this.curData, tempObj)
      this.$emit('update:initStatus', this.custom)
      this.$nextTick(() => { this.initStandardPanel() })
    },
    getParams5(param5, symbol) {
      var param5Array = param5.split(',')
      for (var i = 0; i < param5Array.length; i++) {
        if (param5Array[i].indexOf(symbol) >= 0) {
          return param5Array[i].replace(new RegExp(symbol, 'g'), '')
        }
      }
      return null
    },
    buildYearData(param) {
      let currentYear = new Date().getFullYear()
      if (param > 1) {
        for (let i = 0; i < param; i++) {
          let entry = { value: '', label: '' }
          entry.value = '〔' + (currentYear - i) + '〕'
          entry.label = '〔' + (currentYear - i) + '〕'
          this.years.push(entry)
        }
      } else {
        this.years = [{ value: '〔2019〕', label: '〔2019〕' }, { value: '〔2020〕', label: '〔2020〕' }, { value: '〔2021〕', label: '〔2021〕' }]
      }
    },
    initStandardPanel() {
      if (this.cacheData.docno1 || this.cacheData.docno0) {
        this.docno0 = this.cacheData.docno0
        if (this.cacheData.docno1 && this.cacheData.docno1.length > 0) {
          this.docno1 = this.cacheData.docno1
          this.docno1Show = true
        }
      } else {
        BudgetCommonRespons.getPrefix({ 'deptid': this.$store.state.userInfo.division, 'appid': 'mp-b-budget-service' })
          .then((res) => {
            if (res) {
              this.docno0 = res.no0List
              this.cacheData.docno0 = res.no0List
              if (res.no1List && res.no1List.length > 0) {
                this.docno1 = res.no1List
                this.cacheData.docno1 = res.no1List
                this.docno1Show = true
              }
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('请求失败')
          })
      }
      if (this.cacheData.docno) {
        this.docno = this.cacheData.docno
      } else {
        let self = this
        if (!self.linkoa) {
          let prefix = self.curData.docno0Value + self.curData.docno1Value + self.curData.year
          BudgetCommonRespons.getDocno({ 'prefix': prefix })
            .then((res) => {
              if (res) {
                self.docno = res.docno
                self.cacheData.docno = res.docno
              }
            })
            .catch((err) => {
              console.log(err)
              this.$message.error('请求失败')
            })
        } else {
          self.docno = ''
          self.cacheData.docno = ''
        }
      }
    },
    customNo() {
      this.custom = true
      this.initStatus = true
      this.$refs.bgtdocno.clearHandle()
      this.$emit('update:initStatus', this.custom)
    },
    getBgtdocnoValue() {
      let docnoValue = {}
      docnoValue.bgt_doc_title = this.curData.doctitle
      docnoValue.doc_date = this.curData.docdate
      docnoValue.bgt_dec = this.curData.bgt_dec
      if (this.custom) {
        if (this.curData.defaultTreedocnoValue) {
          let docnoStr = this.curData.defaultTreedocnoValue
          docnoValue.cor_bgt_doc_id = docnoStr.split('##')[0].trim()
          docnoValue.cor_bgt_doc_code = docnoStr.split('##')[1].trim()
          docnoValue.cor_bgt_doc_no = docnoStr.split('##')[2].trim()
          docnoValue.cor_bgt_doc_no_id = docnoStr.split('##')[0].trim()
          docnoValue.cor_bgt_doc_no_code = docnoStr.split('##')[1].trim()
          docnoValue.cor_bgt_doc_no_name = docnoStr.split('##')[2].trim()
        }
      } else {
        // if (!this.curData.docno0Value || !this.curData.docno1Value || !this.curData.year || !this.docno) {
        //   this.$message.warning('请将指标信息填写完整')
        //   return
        // }
        docnoValue.cor_bgt_doc_no = (!this.curData.docno0Value ? '' : this.curData.docno0Value) + (!this.curData.docno1Value ? '' : this.curData.docno1Value) + this.curData.year + this.docno + '号'
      }
      return docnoValue
    },
    getOaNo() {
      if (!this.curData.docno0Value || !this.curData.docno1Value || !this.curData.year) {
        this.$message.warning('请先填写文号前三段信息！')
        return
      }
      let bgtdocnoPrefix = this.curData.docno0Value + this.curData.docno1Value
      let year = this.curData.year
      BudgetCommonRespons.getOaDocno({ 'bgtdocnoPrefix': bgtdocnoPrefix, 'year': year })
        .then((res) => {
          if (res && res.success) {
            this.docno = res.docno
            this.cacheData.docno = res.docno
          } else {
            this.$message.error(res.msg)
          }
        })
      /* let result = Ext.lt.RCP.asynserver('budget-agency', "/v1/bugdetoa/getbgtdocnofromoa", {"bgtdocnoPrefix":bgtdocnoPrefix, "year":year}, null, "get");
      if (!result.result) {
        showWarning(result.msg);
        return;
      }
      var no = result.result;
      $('#bgtdocno3').val(no); */
    }
  },
  mounted() {
    /* if (!this.custom) {
      this.initStandardPanel()
    } */
    this.buildYearData(parseInt(this.getParams5(this.$store.state.curNavModule.param5, 'yearparam=')))
  },
  watch: {
    initStatus (newVal) {
      this.custom = newVal
      /* if (!this.custom) {
        this.initStandardPanel()
      } */
    },
    cache: {
      handler(newValue) {
        this.cacheData = newValue
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(newValue) {
        this.curData = newValue
      },
      deep: true,
      immediate: true
    },
    linkoa (newVal) {
      this.linkoa = newVal
    },
    bgtdocdec: {
      handler(newValue) {
        this.bgtdocdec = newValue
        this.bgtdocdectip = this.bgtdocdec
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .index_items {
    font-family: PingFangSC-Regular, sans-serif;
    display: inline-block;
    width: 100px;
    height: 32px;
    line-height: 32px;
    background-color: #eaf4ff;
    font-size: 14px;
    color: #464a4c;
    text-align: center;
    margin-left: 10px;
    border-radius: 30px;
    transition: all 0.3s;
  }
  .index_items:hover {
    cursor: pointer;
    background: var(--primary-color);
    color: #fff;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
</style>
