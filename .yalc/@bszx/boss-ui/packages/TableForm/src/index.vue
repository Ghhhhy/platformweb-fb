<!-- 表格布局类型form -->
<template>
  <div
    class="table-form"
    :class="isShowCircle ? 'invoice-wrap' : ''"
    :style="{ '--line-Color': invoiceTheme.lineColor, '--row-height': invoiceTheme.rowHeight, '--title-width': invoiceTheme.titleWidth }"
  >
    <!-- 左侧发票装饰 -->
    <div v-if="isShowCircle" class="vouLDiv-left">
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
    </div>
    <!-- 发票区 -->
    <vxe-form ref="tableForm" :data="formData" class="invoic-table">
      <el-row>
        <template v-for="(item, index) in formItemList">
          <!-- 边框组 -->
          <template v-if="item.type === 'wrapper-border'">
            <el-col :key="index" span="24" class="wrapper-border">
              <!-- 边框 -->
              <span class="border border-top"></span>
              <span class="border border-bottom"></span>
              <span class="border border-left"></span>
              <span class="border border-right"></span>
              <el-row>
                <el-col v-for="(it, ix) in item.children" :key="ix" :span="it.span">

                  <div class="col-item">
                    <div class="col-item-title" :style="`width:${item.titleWidth}px`">
                      <template v-if="item.buttons && item.buttons.length">
                        <div class="col-item-title-container">
                          <span class="col-item-title-text" :class="{ 'is-required': it.required }">{{ it.title
                          }}</span>
                          <div class="col-item-title-button-group">
                            <el-button
                              v-for="itemBtn in it.buttons"
                              :key="itemBtn.btnCode"
                              size="mini"
                              type="primary"
                              @click="btnClick(it.buttons)"
                            >{{ itemBtn.btnName }}</el-button>
                          </div>
                        </div>
                      </template>
                      <template v-else-if="it.isSlot">
                        <span @click="defHandle(it)">
                          <span v-html="it.slotHtml"></span>
                        </span>
                      </template>
                      <template v-else>
                        <span class="col-item-title-text" :class="{ 'is-required': it.required }">
                          <span class="col-item-title-text-container">{{ it.title }}</span>
                        </span>
                      </template>
                    </div>
                    <div class="col-item-content">
                      <template v-if="!it.isEmpty">
                        <vxe-form-item title="" :field="it.field" :item-render="it.itemRender" />
                      </template>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </template>
          <!-- 分隔行 -->
          <template v-else-if="item.type === 'division-row'">
            <el-col :key="index" :span="item.span">
              <div class="col-item">
                <div class="division-row">{{ item.title }}</div>
              </div>
            </el-col>
          </template>
          <!-- 纵向合并列 -->
          <template v-else-if="item.height">
            <el-col :key="index" :span="item.span">
              <el-row v-if="item.height" style="border:none;width:100%;">
                <el-col
                  style="background:#F8F9FB;border:none;"
                  align="center"
                  :style="{ height: (item.height + item.children.length ) + 'px' ,lineHeight: (item.height + item.children.length ) + 'px',width: item.titleWidth + 'px' }"
                >
                  <font
                    v-if="item.height && item.required"
                    style="color:#f56c6c;margin-right:3px;font-size:18px; font-weight: 400;"
                  >*</font>{{ item.title }}
                </el-col>
                <el-col :style="{ border: 'none',borderLeft: (item.titleWidth !== 0 ? invoiceBorder : 'none'),width: (item.titleWidth === 0 ? '100%' : '') }" class="col_list">
                  <div
                    v-for="(item1, i) in item.children"
                    :key="i"
                    class="col-item"
                    :style="{ height: (item.height / item.children.length + 1) + 'px' ,'borderTop': i === 0 ? 'none' : invoiceBorder,'boxSizing': 'border-box' }"
                  >
                    <div class="col-item-title" :style="`width:${item1.titleWidth}px`">
                      <template v-if="item1.buttons && item1.buttons.length">
                        <div class="col-item-title-container">
                          <span class="col-item-title-text" :class="{ 'is-required': item1.required }">{{ item1.title
                          }}</span>
                          <div class="col-item-title-button-group">
                            <el-button
                              v-for="itemBtn in item1.buttons"
                              :key="itemBtn.btnCode"
                              size="mini"
                              type="primary"
                              @click="btnClick(item1.buttons)"
                            >{{ itemBtn.btnName }}</el-button>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <span class="col-item-title-text" :class="{ 'is-required': item1.required }">
                          <span class="col-item-title-text-container">{{ item1.title }}</span>
                        </span>
                      </template>
                    </div>
                    <div class="col-item-content" style="position:relative">
                      <template v-if="!item1.isEmpty">
                        <vxe-form-item title="" :field="item1.field" :item-render="item1.itemRender" />
                        <i v-if="item1.field === 'payee_acct_name' && item1.icon && item1.icon !== '1'" style="cursor:pointer;width:18px;height:20px;color:#333;position:absolute;right:6px;top:10px;padding-bottom:-20px;padding-right:-19px;" class="base-font base-person baserenyuanguanli" @click="$emit('clickPerson')"></i>
                        <!-- <img v-if="item1.field === 'payee_acct_name' && item1.icon && item1.icon !== '1'" style="cursor:pointer;width:18px;height:20px;color:#333;position:absolute;right:6px;top:10px;padding-bottom:-20px;padding-right:-19px;" src="../src/assets/person.svg" @click="$emit('clickPerson')"> -->
                      </template>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </template>
          <!-- 栅格列 -->
          <template v-else>
            <el-col :key="index" :span="item.span">
              <div class="col-item">
                <div class="col-item-title" :style="`width:${item.titleWidth}px`">
                  <template v-if="item.buttons && item.buttons.length">
                    <div class="col-item-title-container">
                      <span class="col-item-title-text" :class="{ 'is-required': item.required }">{{ item.title
                      }}</span>
                      <div class="col-item-title-button-group">
                        <el-button
                          v-for="itemBtn in item.buttons"
                          :key="itemBtn.btnCode"
                          size="mini"
                          type="primary"
                          @click="btnClick(item.buttons)"
                        >{{ itemBtn.btnName }}</el-button>
                      </div>
                    </div>
                  </template>
                  <template v-else-if="item.isSlot">
                    <span @click="defHandle(item)">
                      <span v-html="item.slotHtml"></span>
                    </span>
                  </template>
                  <template v-else>
                    <span class="col-item-title-text" :class="{ 'is-required': item.required }">
                      <span class="col-item-title-text-container">{{ item.title }}</span>
                    </span>
                  </template>
                </div>
                <div class="col-item-content" :class="[item.field === 'pay_app_amt' || item.field === 'income_count' ? 'moneyInput' : '']">
                  <template v-if="!item.isEmpty">
                    <vxe-form-item title="" :field="item.field" :item-render="item.itemRender" />
                    <i v-if="item.field === 'payee_acct_name' && item.icon && item.icon !== '1'" style="cursor:pointer;width:18px;height:20px;color:#333;position:absolute;right:6px;top:10px;padding-bottom:-20px;padding-right:-19px;" class="base-font base-person baserenyuanguanli" @click="$emit('clickPerson')"></i>
                    <!-- <img v-if="item.field === 'payee_acct_name' && item.icon && item.icon !== '1'" style="cursor:pointer;width:18px;height:20px;color:#333;position:absolute;right:6px;top:10px;padding-bottom:-20px;padding-right:-19px;" src="../src/assets/person.svg" @click="$emit('clickPerson')"> -->
                  </template>
                  <template v-else>
                    <slot :item="item"></slot>
                    <!-- <BsPulldown :resultdata="formData" @pullChange="handlePullChange" /> -->
                  </template>
                </div>
              </div>
            </el-col>
          </template>
        </template>
      </el-row>
    </vxe-form>
    <!-- 右侧发票装饰 -->
    <div v-if="isShowCircle" class="vouLDiv-right">
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
      <div class="borderCircle"></div>
    </div>
  </div>
</template>
<script>
// import BsPulldown from '../components/Pulldown.vue'

export default {
  name: 'BsTableForm',
  components: {},
  props: {
    colNums: {
      type: Number,
      default: 4
    },
    maxSpanLen: {
      type: Number,
      default: 24
    },
    titleWidth: {
      type: Number,
      default: 120
    },
    rules: {
      type: Object,
      default: () => { }
    },
    formData: {
      type: Object,
      default: () => { }
    },
    formItems: {
      type: Array,
      default: () => []
    },
    formConfig: {
      type: Object,
      default: () => { }
    },
    emptyItemConfig: {
      type: Object,
      default: () => { }
    },
    invoiceTheme: { // 发票皮肤
      type: Object,
      default: () => {
        return {
          rowHeight: '40px', // 行高
          lineColor: '#ccc', // 线颜色
          titleWidth: '150px'
        }
      }
    },
    isShowCircle: { // 是否显示发票装饰
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fillEmptyItem: {
        title: '',
        field: '',
        titleWidth: '100',
        span: this.maxSpanLen / this.colNums,
        children: [],
        isEmpty: true,
        required: false,
        ...this.emptyItemConfig
      },
      invoiceBorder: `1px solid ${this.invoiceTheme.lineColor}`
    }
  },
  watch: {
    colNums() {
      this.fillEmptyItem.span = this.maxSpanLen / this.colNums
    }
  },
  computed: {
    formItemList() {
      const self = this
      let formItems = JSON.parse(JSON.stringify(this.formItems))
      let spanLen = 0
      let maxSpanLen = this.maxSpanLen
      let newFormItems = []
      let fillEmptyColspan = maxSpanLen / self.colNums
      formItems = this.containsItemHandle(formItems)
      const formItemHandle = (item, newFormItems = []) => {
        item.span = item.span % fillEmptyColspan === 0 ? item.span : fillEmptyColspan
        spanLen += item.span
        if (spanLen === maxSpanLen) {
          spanLen = 0
        }
        if (spanLen > maxSpanLen) {
          spanLen = Math.abs(spanLen - item.span)
          for (let i = 0; i < ((maxSpanLen - spanLen) / (maxSpanLen / self.colNums)); i++) {
            newFormItems.push(self.fillEmptyItem)
          }
          newFormItems.push(item)
          spanLen = item.span
        } else {
          newFormItems.push(item)
        }
      }
      formItems.forEach(item => {
        formItemHandle(item, newFormItems)
        if (item.children && item.children.length) {
          let newSubFormItems = []
          item.children.forEach(it => {
            formItemHandle(it, newSubFormItems)
          })
          item.children = newSubFormItems
        }
      })
      return this.formItemsEditHandle(newFormItems)
    }
  },
  methods: {
    // 链接或其他类型操作
    defHandle(item) {
      this.$emit('defHandle', item)
    },
    // 容器项处理
    containsItemHandle(data = []) {
      let contains = []
      let newData = JSON.parse(JSON.stringify(data))
      let targetItems = []
      contains = data.filter(item => {
        targetItems = [...targetItems, ...item.contains || []]
        return item.type === 'wrapper-border'
      })
      contains.forEach(item => {
        newData.forEach((i, k) => {
          if (item.contains && item.contains.includes(i.field)) {
            if (!item.children) {
              item.children = [i]
            } else {
              item.children.push(i)
            }
          }
        })
      })
      contains.forEach(item => {
        newData.forEach((i, k) => {
          if (i.field === item.field) {
            i.children = item.children || []
          }
        })
      })
      newData = newData.filter(item => !targetItems.includes(item.field))
      console.log('newData', newData)
      return newData
    },
    // 编辑项控制
    formItemsEditHandle(items = []) {
      const formItem = (item) => {
        if (item.itemRender) {
          if (item.itemRender.props && item.itemRender.props.config) {
            item.itemRender.props.config.disabled = true
          } else if (item.itemRender.props && item.itemRender.name === '$vxeSwitch') {
            item.itemRender.props.editable = false
          } else if (item.itemRender.props) {
            item.itemRender.props.disabled = true
          }
        }
        return item
      }
      if (this.formConfig && this.formConfig.editDisabled) {
        items = items.map(item => {
          if (item.children) {
            item.children = item.children.map(it => {
              return formItem(it)
            })
          }
          return formItem(item)
        })
      }
      return items
    },
    handlePullChange(data) {
      this.$emit('pullChange', data)
    },
    accurateChengFa(multiplier1, multiplier2) { /* 获取小数相乘的精确结果 */
      if (parseFloat(multiplier1) === 0 || parseFloat(multiplier2) === 0) {
        return '0'
      }
      let m = 0
      let n1 = String(multiplier1)
      let n2 = String(multiplier2)
      let f1 = n1.split('.')[1]
      let f2 = n2.split('.')[1]
      m += f1 ? f1.length : 0
      m += f2 ? f2.length : 0
      let result = String(n1.replace('.', '') * n2.replace('.', ''))
      try {
        if (m === 0) {
          return result
        } else {
          return String(result / ('1' + new Array(m).fill(0).join('')))
        }
      } catch (e) {
        return ''
      }
    },
    accurateFixed(number, n) { // 保留小数位数(截取)
      let numberArr = this.transInputToNumber(number, n).split('.')
      if (n > 0) {
        return numberArr[0] + (numberArr[1] ? ('.' + numberArr[1].slice(0, n)) : '')
      } else {
        return numberArr[0] || ''
      }
    },
    transToNumberLocalString(number, digits = 0) {
      // 返回逗号隔开千分位的数字
      let result = ''
      digits = parseInt(digits)
      // number = Number(number).toFixed(digits)
      number = this.accurateFixed(number, digits)
      if (isNaN(number)) {
        number = this.accurateFixed('', digits)
      }
      if (number.indexOf('-') === 0) {
        result = '-'
      }
      number = Number(number).toLocaleString('zh-Hans-CN', {
        style: 'decimal',
        minimumIntegerDigit: 1,
        minimumFractionDigits: 1,
        maximumFractionDigits: 20,
        minimumSignificantDigits: 1,
        maximumSignificantDigits: 21
      })
      let numberArr = number.split('').filter((item, index) => {
        return new RegExp('^[0-9.,]$').test(item)
      }).join('').split('.')
      if (numberArr[0] === '') {
        numberArr[0] = '0'
      }
      if (digits === 0) {
        numberArr = [numberArr[0], (numberArr[1] ? '.' + numberArr[1] : '')]
        return result + numberArr[0] + numberArr[1]
      } else {
        let numberArr1 = numberArr[1] ? numberArr[1].split('') : []
        numberArr1 = [...numberArr1, ...new Array(digits).fill('0')]
        numberArr1.length = digits
        numberArr = [numberArr[0], '.', ...numberArr1]
        return result + numberArr.join('')
      }
    },
    transToNumber(number, digits = 0) {
      //  任意字符过滤为数字
      let result = ''
      digits = parseInt(digits)
      number = Number(number).toFixed(digits)
      if (number.indexOf('-') === 0) {
        result = '-'
      }
      let numberArr = number.split('').filter((item, index) => {
        return new RegExp('^[0-9.]$').test(item)
      }).join('').split('.')
      if (numberArr[0] === '' && numberArr[1]) {
        numberArr[0] = '0'
      }
      if (digits === 0) {
        return result + numberArr[0]
      } else {
        let numberArr1 = numberArr[1] ? numberArr[1].split('') : []
        numberArr1 = [...numberArr1, ...new Array(digits).fill('0')]
        numberArr1.length = digits
        numberArr = [numberArr[0], '.', ...numberArr1]
        return result + numberArr.join('')
      }
    },
    transInputToNumber(number) {
      let result = ''
      number = String(number)
      if (number.indexOf('-') === 0) {
        result = '-'
      }
      let numberArr = number.split('').filter((item, index) => {
        return new RegExp('^[0-9.]$').test(item)
      }).join('').split('.')
      if (numberArr[0] === '' && numberArr[1]) {
        numberArr[0] = '0'
      }
      if (numberArr.length > 1) {
        numberArr = [numberArr[0], '.', numberArr[1]]
      } else {
      }
      return result + numberArr.join('')
    },
    accurateChuFa(divisor, dividend) { /* 获取小数相除的精确结果 */
      if (parseFloat(divisor) === 0 || parseFloat(dividend) === 0) {
        return '0'
      }
      let n1 = String(divisor)
      let n2 = String(dividend)
      let f1 = n1.split('.')[1]
      let f2 = n2.split('.')[1]
      let b1 = f1 ? f1.length : 0
      let b2 = f2 ? f2.length : 0
      let r1 = n1.replace('.', '')
      let r2 = n2.replace('.', '')
      try {
        if (b1 > b2) {
          r2 = r2 + new Array(b1 - b2).fill(0).join('')
        } else if (b2 > b1) {
          r1 = r1 + new Array(b2 - b1).fill(0).join('')
        } else { }
        return String(r1 / r2)
      } catch (e) {
        return ''
      }
    },
    btnClick(btnObj) {
      this.$emit('btnClickHandle', btnObj)
    },
    itemChange({ $form, property, itemValue, data, renderOpts, node }) {
      let self = this
      if (!this.$refs.tableForm) {
        return
      }
      if (renderOpts && renderOpts.props && renderOpts.props.readonly) {
        return
      }
      self.$nextTick(() => {
        self.$emit('itemChange', { $form, property, itemValue, data, renderOpts, node }, self)
      })
    },
    // 表单校验(目前只校验了必填项规则)
    formValidate() {
      const self = this
      const itemValidate = (item, must) => {
        if (self.rules[item.field]) {
          let required = false
          self.rules[item.field].forEach(it => {
            // 必填项校验
            if ((item.required || must) && it.required && typeof [item.field] !== 'boolean' && (!self.formData[item.field] && self.formData[item.field] !== 0)) {
              throw it.message
            }
            // 正则项校验
            if (item.required && it.required && it.pattern && !self.regPattern(it.pattern, self.formData[item.field])) {
              let str = item.title + '不符合规范，请重新输入'
              throw it.patterMsg || str
            }
            if (it.required || it.required !== undefined || must) {
              // 必填项校验
              // if (it.required && self.formData[item.field] === '') {
              //   throw it.message
              // }
              if (it.required !== undefined) {
                required = it.required
              }
              // 正则项校验
              if (
                (required && it.pattern && !self.regPattern(it.pattern, self.formData[item.field])) ||
                (!required && !self.regPattern(it.pattern, self.formData[item.field]) && self.formData[item.field] !== '')
              ) {
                if (it.message) {
                  let str = item.title + it.message
                  throw str
                }
                let str = item.title + '不符合规范，请重新输入'
                throw it.patterMsg || str
              }
              // 自定义
              if ((required && it.validator) || (!required && it.validator && self.formData[item.field] !== '')) {
                let str = it.validator({ itemValue: self.formData[item.field], rule: it })
                if (str !== true) {
                  if (typeof (str) === 'string') {
                    throw str
                  } else {
                    if (str === undefined) {
                      return true
                    }
                    let strTxt = JSON.stringify(str.message)
                    throw strTxt.substring(1, strTxt.length - 1)
                  }
                }
              }
            }
          })
        }
      }
      if (Object.keys(self.rules).length) {
        try {
          self.formItemList.forEach(item => {
            if (item.children && item.children.length) {
              item.children.forEach(it => {
                itemValidate(it, item.required)
              })
            }
            itemValidate(item)
          })
        } catch (err) {
          self.$message({
            message: err,
            type: 'warning'
          })
          return false
        }
      }
      return true
    },
    // 正则校验
    regPattern(pattern = null, val = '') {
      if (pattern) {
        if (Array.isArray(pattern)) {
          return pattern.some(itemPattern => {
            return itemPattern.test(val)
          })
        } else {
          return pattern.test(val)
        }
      }
      return true
    }
  }
}
</script>
<style lang="scss">
  .invoice-wrap {
    display: grid;
    width: 100%;
    grid-template-columns: 4fr 92fr 4fr;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .table-form {
    .invoic-table {
      border: 1px solid var(--line-Color);
      width: 100%;
    }
    .borderCircle {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #f3f8ff;
      margin-bottom: 23px;
    }
    .vouLDiv-right .borderCircle {
      margin-left: calc(100% - 14px);
    }
    .col_list {
      width: calc(100% - var(--title-width))
    }

    .formData_item {
      display: flex;
      align-items: center;

      .col-left {
        height: 100%;
      }
    }

    .el-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      border-left: 1px solid var(--line-Color);
      border-top: 1px solid var(--line-Color);

      .el-col {
        border-bottom: 1px solid var(--line-Color);
        border-right: 1px solid var(--line-Color);
      }

      .wrapper-border {
        border-color: #000;
        border-bottom: none;
        border-right: none;
        position: relative;

        .border {
          display: block;
          position: absolute;
          /* background:#000; */
          z-index: 1;
        }

        .border-top {
          width: 100%;
          height: 0;
          top: 0;
          left: 0;
          right: 0;
          border-top: 1px dashed #000;
        }

        .border-right {
          width: 0;
          height: 100%;
          top: 0;
          right: 0;
          bottom: 0;
          border-right: 1px dashed #000;
        }

        .border-bottom {
          width: 100%;
          height: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-bottom: 1px dashed #000;
        }

        .border-left {
          width: 0;
          height: 100%;
          left: -1px;
          top: 0;
          bottom: 0;
          border-left: 1px dashed #000;
        }

        .el-row {
          border-left: none;
          border-top: none;
        }
      }

      .col-item {
        display: flex;
        height: 100%;
        flex-direction: row;
        .base-person{
          top: 5px !important;
          font-size: 20px !important;
          color: var(--primary-color) !important;
        }
        .division-row{
          flex:1;
          min-height:40px;
          text-align:center;
          width: 100px;
          font-size: 14px;
          color: #2E3133;
          padding: 9px 10px;
          background: #F8F9FB;
        }
        .col-item-title {
          width: 100px;
          font-size: 14px;
          color: #2E3133;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: flex-start;
          align-items: flex-start;
          ;
          vertical-align: middle;
          padding: 0 10px;
          border-right: 1px solid var(--line-Color);
          background: #F8F9FB;
          box-sizing: border-box;

          .col-item-title-text {
            position: relative;

            /* padding-left: 20px; */
            .col-item-title-text-container {
              display: block;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .is-required::before {
            content: "*";
            color: #f56c6c;
            margin-right: .2em;
            font-family: Verdana, Arial, Tahoma;
            font-weight: 400;
            position: absolute;
            left: -10px;
            top: 0;
          }

          // .is-requireds::before{
          //   content: "*";
          //   color: #f56c6c;
          //   margin-right: .2em;
          //   font-family: Verdana,Arial,Tahoma;
          //   font-weight: 400;
          // }
          .col-item-title-container {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .col-item-title-button-group {
              .el-button {
                padding: 4px 8px;
              }
            }
          }
        }

        .col-item-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          position: relative;

          &.moneyInput {
            .vxe-input--inner {
              text-align: right;
            }
          }

          .vxe-form--item {
            width: 100%;
            padding: 0;
            font-size: 14px;
            color: #0D1C28;
          }

          .vxe-form--item-inner,
          .vxe-input {
            min-height: var(--row-height);
          }

          .vxe-input,
          .vxe-textarea {
            display: block;
          }

          .vxe-input,
          .vxe-select,
          .vxe-input--inner,
          .vxe-textarea--inner {
            width: 100%;
            border: none;
          }

          .vxe-checkbox-group,
          .vxe-radio-group {
            padding: 0 10px;
          }

          .vxe-textarea--inner {
            min-height: 102px;
          }

          .vxe-form--item-content {
            position: static;
          }

          .vxe-switch.is--disabled .vxe-switch--button {
            position: relative;
            z-index: 100;
          }

          .vxe-switch.is--disabled::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: #f3f3f3;
          }

          .unit-tree-main {
            padding-left: 0 !important;
            ;
          }
        }
      }
    }
  }
</style>