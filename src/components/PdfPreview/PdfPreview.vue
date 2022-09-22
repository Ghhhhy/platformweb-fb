<template>
  <div class="pdf-all">
    <header>
      <div class="newbankCard">
        <div class="fn-inline nav-title">
          <span class="pf_thick fn-inline">{{ pdfData.title }}</span>
          <div class="page fn-inline">
            <label class="fn-inline">当前页码:</label>
            <span class="fn-inline">{{ currentPage }} / {{ pageCount }}</span>
          </div>
        </div>
        <ul class="nav fn-inline">
          <li
            :class="{ select: idx === 0 }"
            @touchstart="idx = 0"
            @touchend="idx = -1"
            @click="scaleD"
          >
            <p>放大</p>
          </li>
          <li
            :class="{ select: idx === 1 }"
            @touchstart="idx = 1"
            @touchend="idx = -1"
            @click="scaleX"
          >
            <p>缩小</p>
          </li>
          <li
            v-if="!noTurnPage"
            :class="{ select: idx === 2 }"
            @touchstart="idx = 2"
            @touchend="idx = -1"
            @click="changePdfPage(0)"
          >
            <p>上一页</p>
          </li>
          <li
            v-if="!noTurnPage"
            :class="{ select: idx === 3 }"
            @touchstart="idx = 3"
            @touchend="idx = -1"
            @click="changePdfPage(1)"
          >
            <p>下一页</p>
          </li>
        </ul>
        <!-- <div class="fn-inline nav-close">

          <span class="sprites_all sprites_back fn-inline" @click="close">X</span>
        </div>-->
      </div>
    </header>

    <div v-if="!noTurnPage" class="main">
      <!-- {{currentPage}} / {{pageCount}} -->
      <pdf
        ref="wrapper"
        :src="pdfData.src"
        :page="currentPage"
        class="pdf"
        @progress="($event) => { loadedRatio = $event }"
        @num-pages="$event => pageCount = $event"
        @page-loaded="$event => currentPage = $event"
        @loaded="loadPdfHandler"
      />
      <!-- <button @click="changePdfPage(1)">+</button> -->
    </div>
    <div v-if="noTurnPage" class="main">
      <!-- {{currentPage}} / {{pageCount}} -->
      <pdf
        v-for="(item,index) in numPages"
        :key="index"
        :page="item"
        :src="pdfUrl"
        @num-pages="$event => pageCount = $event"
      />
      <!-- <button @click="changePdfPage(1)">+</button> -->
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'BsPdfPreview',
  components: {
    pdf
  },
  props: {
    noTurnPage: {
      type: Boolean
    },
    pdfData: {
      type: Object,
      default() {
        return {
          title: '',
          src: ''
        }
      }
    }
  },
  data() {
    return {
      numPages: [],
      pdfUrl: '',
      currentPage: 1,
      pageCount: 0,
      scale: 50, // 放大系数
      idx: -1,
      loadedRatio: 0
    }
  },
  created() {
    // 有时PDF文件地址会出现跨域的情况,这里最好处理一下
    // this.src = pdf.createLoadingTask(this.src);
  },
  methods: {
    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    close() {
      this.$emit('close')
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1 // 加载的时候先加载第一页
      console.log('pdf', pdf)
      // this.pdfUrl = pdf.createLoadingTask(this.pdfData.src)
      // this.pdfUrl.then(pdf => {
      //   this.numPages = pdf.numPages
      // })
    },
    // 放大
    scaleD() {
      this.scale += 5
      // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%'
    },

    // 缩小
    scaleX() {
      if (this.scale === 20) {
        return
      }
      this.scale += -5
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%'
      // this.$refs.wrapper.$el.style.transform = "scale(" + this.scale + ")";
    }
  },
  mounted() {
    this.loadPdfHandler()
  },
  watch: {
    pdfData: {
      handler() {
        this.loadPdfHandler()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="scss">
.pdf-all {
  height: 100%;
  padding: 10px 10px;
  header {
    max-height: 40px;
    position: sticky;
    top: 0;
    background-color: #fff;
    width: 100%;
    z-index: 400;
    .newbankCard {
      font-size: 0;
      border-top: 1px solid #f0f0f0;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
    }
  }
  .main {
    margin: 10px;
    max-height: calc(100% - 60px);
    overflow: auto;
  }
  .main>span{
    margin: 0 auto;
  }
  .nav-title {
    text-align: left;
    color: 333;
    font-size: 14px;
    width: 60%;
    .pf_thick{
      font-weight: bold;
      color: var(--primary-color);
    }
    .page{
      margin-left: 40px;
    }
  }
  .nav {
    width: 40%;
    text-align: right;
    height: 40px;
    z-index: 100;
    color: #333;
    li {
      cursor: pointer;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
      margin: 5px 10px;
      padding: 0 10px;
      p {
        font-size: 14px;
      }
    }
    li:hover{
      p{
        color: var(--primary-color);
      }
    }
    .select {
      color: #fff;
      background-color:var(--primary-color);;
    }

  }
}
</style>
