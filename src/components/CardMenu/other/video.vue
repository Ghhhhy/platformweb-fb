<template>
  <div class="card-menu-extend__content">

    <div class="show-guide-box">
      <div
        v-for="(item, index) in oprateGuides"
        v-show="hasData"
        :key="index"
        class="grid-content"
      >

        <!-- text -->
        <h2>{{ item.title }}</h2>
        <div
          v-if="item.type === 'text'"
          class="grid-content-text"
          v-html="item.data[0].article"
        ></div>
        <!-- table -->
        <div
          v-else-if="item.type === 'list'"
          class="grid-content-table"
        >
          <ul>
            <li v-for="(k, v) in item.data" :key="v" class="li">
              <el-divider direction="vertical" />
              <p>{{ k.title }}</p>
              <div class="btns">
                <!-- <el-button
                  size="mini"
                  type="primary"
                  class="el-icon-view"
                  plain
                  @click="handlePreview(k)"
                >查看</el-button> -->
                <el-button
                  size="mini"
                  class="el-icon-download"
                  type="primary"
                  plain
                  style="margin-left: 40px"
                  @click="handleDownload(k)"
                >下载</el-button>
              </div>
            </li>
          </ul>
        </div>
        <!-- fileList -->
        <div
          v-if="item.type === 'file'"
          class="grid-content-file"
        >
          <div v-for="(k, v) in item.data" :key="v" class="item">
            <div v-if="['mp4', 'avi'].includes(k.subType)" class="player-box">
              <div class="player">
                <el-image
                  :src="k.cover"
                  :fit="fit"
                />
                <div class="player-handle" @click="openVideo">
                  <i class="el-icon-video-play"></i>
                </div>
              </div>
              <div class="title">
                {{ k.title }}
              </div>
            </div>

            <div v-else class="file-box">
              <!-- <el-image
                :src="k.cover"
                :fit="fit"
              /> -->
              <div class="title">
                {{ k.title }}
              </div>
              <div class="file-box-btns">
                <!-- <el-button size="mini" type="primary" plain @click="handlePreview(k)">查看</el-button> -->
                <el-button size="mini" type="primary" style="margin-left: 40px" plain @click="handleDownload(k)">下载</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!hasData" class="no-data__content">
      暂无数据
    </div>
    <!-- <filePreview v-if="filePreviewDialogVisible" :visible.sync="filePreviewDialogVisible" :file="curFile" /> -->
    <BsUpload
      ref="uploadRef"
      :downloadparams="downloadparams"
      uniqe-name="uploadOne"
    />
  </div>
</template>

<script>
import { extend } from '../utils'
// import filePreview from './filePreview'
export default {
  name: 'PoperExtend',
  // components: { filePreview },
  props: {
    cardBtns: {
      type: Object,
      default() {
        return {}
      }
    },
    cur: {
      type: Object,
      default() {
        return {}
      }
    },
    allowNum: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      tableData: [{
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      downloadparams: {
        fileguid: ''
      },
      filePreviewDialogVisible: false,
      oprateGuides: [],
      cardBtnsIn: extend(true, {}, this.cardBtns),
      currentCard: this.cur.currentCard || '',
      currentBtn: this.cur.currentBtn || '',
      allowNumIn: this.allowNum
    }
  },
  computed: {
    hasData() {
      return this.oprateGuides.length
    }
  },
  methods: {
    openVideo() {
      window.open('https://www.w3school.com.cn/i/movie.ogg')
    },
    // 业务按钮组点击
    onClickBtn(obj = {}) {
      // 按钮触发，事件回调
      Object.assign(obj, { type: this.currentCard })
      this.bsCardPoperClickEvent(obj)
    },

    // 点击事件回调
    bsCardPoperClickEvent(obj) {
      let self = this
      let methods = this.cardBtnsIn.globalConfig.methods
      if (typeof obj.callback === 'function') {
        // 方式一: 工具栏按钮点击事件回调
        obj.callback(obj, self)
      } else {
        // 方式二: toolbar事件代理
        typeof methods.bsCardPoperClickEvent === 'function' &&
          methods.bsCardPoperClickEvent(obj, self)
      }
    },

    // 预览
    handlePreview(data) {
      this.curFile = data
      this.filePreviewDialogVisible = true
    },
    // 下载
    handleDownload(data) {
      this.downloadparams.fileguid = data.fileguid
      this.$refs.uploadRef.downloadFile()
    },

    initOprateGuides() {
      if (this.currentCard && this.currentBtn) {
        if (!this.cardBtnsIn[this.currentCard]) {
          this.oprateGuides = []
          return
        }
        this.oprateGuides = extend(true, [], this.cardBtnsIn[this.currentCard][this.currentBtn])
        this.oprateGuides = this.oprateGuides.map(item => ({ index: item.type === 'file' ? 0 : item.type === 'list' ? 1 : 2, ...item }))
        this.oprateGuides.sort((a, b) => b.index - a.index)
      }
    }
  },
  created() {

  },
  mounted() {
    // console.log(this.cardBtns, '2222222222222222')
  },
  watch: {
    cardBtns: {
      handler(newValue, oldValue) {
        this.cardBtnsIn = extend(true, {}, newValue)
        this.initOprateGuides()
      },
      deep: true,
      immediate: true
    },
    cur: {
      handler(newValue, oldValue) {
        this.currentCard = newValue.currentCard
        this.currentBtn = newValue.currentBtn
        this.initOprateGuides()
      },
      deep: true,
      immediate: true
    },
    allowNum(newValue) {
      this.allowNumIn = newValue
    }
  }
}
</script>

<style scoped lang="scss">
  .card-menu-extend__content{
    position: relative;
    padding: 8px 0;
    .no-data__content{
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #dFE1E2;
      height: 120px;
    }
    .menu-extend__item{
      width: 466px;
      height: 40px;
      padding: 8px 50px;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: space-between;
      font-size: 14px;
      color: #2E3133;
      border-right: solid 1px #DFE1E2;
      margin: 0 0 0 10px;
      .extend-title{
        margin-top: 2px;
        .title-tip{
          max-width: 150px;
        }
        .num-color{
          color: #FFA522;
          margin-left: 5px;
        }
      }
      .extend-btn{
        height: 24px;
        box-sizing: border-box;
        padding: 2px 8px;
        border-radius: 2px;
        font-weight: 300;
        font-size: 12px;
      }
      .olh {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .extend-last-child{
      margin-left: 0px;
      border-right: unset;
    }
    .extend-first-child{
      margin-left: 0px;
    }
    .menu-extend__item::after{
      padding:0;margin:0;display:block;
      content: "";
      width:50%;
      height:1.1px;
      background-color:white;
      position: absolute;
      right:0;
      top:-1px;
    }
    .extend-row-bottom::after{
      padding:0;margin:0;display:block;
      content: "";
      width:50%;
      height:1.1px;
      background-color:white;
      position: absolute;
      right:0;
      top:-1px;
    }
    .extend-btn{
      color: var(--primary-color);
      background: #ecf5ff;
      border-color: #b3d8ff;
    }
    .extend-btn:focus, .extend-btn:hover, .extend-btn:active{
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      color: #fff;
    }
    .show-guide-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .grid-content{
        min-width: 450px;
        flex: 1;
        padding: 20px 10px 10px;
        box-sizing: border-box;
        h2{
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #333333;
          font-weight: normal;
          text-align: center;
          margin-bottom: 10px;
        }
      }
      .grid-content-table{
        ul{
          max-height: 305px;
          overflow: auto;
        }
        li{
          width: 100%;
          display: flex;
          justify-content: space-between;
          background: #F8F9FB;
          height: 40px;
          margin-bottom: 13px;
          line-height: 40px;
          box-sizing: border-box;
          align-items: center;
          padding: 0 10px;
          cursor: pointer;
          .el-divider--vertical{
            width:5px;
            height: 17px;
            background: #D8D8D8;
          }
          p{
            flex: 1;
          }
          .btns{
            width: 150px;
          }
        }
        li:hover{
          background: #E3EEFB;
          .el-divider--vertical{
            background: #2A8BFD;
          }
        }
      }
      .grid-content-file{
        display: flex;
        flex-wrap: wrap;
        .el-image{
          width: 100px;
          height:100px;
          margin:0 auto;
          display: block
        }
        .file-box-btns{
          display: flex;
          justify-content:space-between;
          width:100%
        }
        .item{
          width: 100px;
          box-sizing: border-box;
          margin: 20px;
          display: flex;
          justify-content: center;
          height: 164px;
          .title{
            width: 100%;
            margin: 10px 0;
            text-align: center;
          }
          .player-box{
            width: 100px;
            .player{
              position: relative;
              .player-handle{
              width: 30px;
              height: 30px;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              cursor: pointer;
              }
              .el-icon-video-play{
                font-size: 30px;
              }
            }
          }
        }
      }
    }

  }
</style>
<style lang="scss">
.grid-content-text{
  h1{
    text-align: center;
  }
  p{
    margin-top: 20px;
    text-indent:20px;
  }
}
</style>
