<!--  锚点导航   Author:Titans@2396757591@qq.com -->
<template>
  <div class="T-anchor-nav anchor-nav" :class="[customClass,type]">
    <div ref="anchornavContent" class="anchor-nav-content">
      <div class="anchor-nav-content-box" @scroll="registScrollTop">
        <slot></slot>
      </div>
    </div>
    <div class="anchor-nav-list" :style="{ 'width': anchorNavWidth }">
      <div :class="type === 'single' ? 'anchor-nav-single' : 'anchor-nav-general'">
        <div class="anchor-scroller">
          <div class="anchor-nav-bar">
            <em class="anchor-nav-se anchor-nav-start"></em>
            <em class="anchor-nav-se anchor-nav-end"></em>
          </div>
          <dl class="anchor-list">
            <dt v-for="(item,index) in renderData" :key="item.index" class="anchor-item level" :class="curAnchor.index === item.index ? ('current level' + item.level) : ('level' + item.level)">
              <em class="pointer">{{ item.index }}</em>
              <a class="anchor-link" @click="onAnchorClick(item,index)">
                <span class="anchor-text" :style="{ paddingLeft: item.level * 15 + 'px' }">
                  <span class="anchor-index">{{ item.index }}</span>
                  <span class="anchor-label">{{ item.label }}</span>
                </span>
              </a>
            </dt>
          </dl>
        </div>
        <div class="anchor-toTop">
          <a class="anchor-gotop-button" @click="onAnchorClick(renderData[0],0)"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnchorNav',
  components: {},
  props: {
    anchorNavWidth: { // 导航width
      type: String,
      default: '350px' // single||general 单一和通用
    },
    type: {
      type: String,
      default: 'single' // single||general 单一和通用
    },
    customClass: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
        // return [
        //   {
        //     anchor: 'content1',
        //     label: '内容1',
        //     children: [
        //       {
        //         anchor: 'content1-1',
        //         label: '内容1-1',
        //         children: [
        //           {
        //             anchor: 'content1-1-1',
        //             label: '内容1-1-1'
        //           }
        //         ]
        //       },
        //       {
        //         anchor: 'content1-2',
        //         label: '内容1-2',
        //         children: [

        //         ]
        //       }
        //     ]
        //   },
        //   {
        //     anchor: 'content2',
        //     label: '内容2',
        //     children: [
        //       {
        //         anchor: 'content2-1-1',
        //         label: '内容2-1-1',
        //         children: [
        //           {
        //             anchor: 'content2-1-1',
        //             label: '内容2-1-1'
        //           }
        //         ]
        //       },
        //       {
        //         anchor: 'content2-2',
        //         label: '内容2-2',
        //         children: [

        //         ]
        //       }
        //     ]
        //   }
        // ]
      }
    }
  },
  data() {
    return {
      renderData: [], // 渲染数据
      renderDataMap: {}, // 渲染数据映射
      curAnchor: {} // 当前节点
    }
  },
  methods: {
    onAnchorClick(item, index) { // 锚点点击事件
      this.curAnchor = item
      let element = this.$refs.anchornavContent.querySelector('#' + item.anchor)
      element && element.scrollIntoView()
    },
    gernarateTreeDataList(data, pIndex = '', level = 1, rsData = { list: [], map: {} }) { // 生成锚点渲染平行数据和映射
      data.forEach((item, index) => {
        item.index = pIndex !== '' ? pIndex + '.' + (index + 1) : (index + 1)
        item.level = level
        rsData.list.push(item)
        rsData.map[item.anchor] = item
        if (Array.isArray(item.children) && item.children.length) {
          this.gernarateTreeDataList(item.children, item.index, level + 1, rsData)
        }
      })
      return rsData
    },
    initData(data) { // 初始化数据
      let { map, list } = this.gernarateTreeDataList(data || this.data)
      this.renderData = list
      this.renderDataMap = map
      this.curAnchor = list[0]
    },
    registScrollTop(event) { // 获取滚动条到顶部的距离然后显示当前标签
      let self = this
      let top = event.currentTarget.scrollTop
      let itemsTitle = this.$refs.anchornavContent.querySelectorAll('.title-link')
      itemsTitle.forEach(function (item) {
        let itemTop = item.offsetTop
        let currentId = ''
        //  判断滚动条到顶部的距离是否大于item到顶部的距离，大于则说明当前页面已经显示到了当前item即楼层
        if (itemTop >= top && itemTop < (100 + top)) {
          currentId = item.id
        } else {
          return false
        }
        if (currentId && self.renderDataMap[currentId]) {
          self.curAnchor = self.renderDataMap[currentId]
        }
      })
    },
    init() {
      this.initData()
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    renderData: {
      handler() {},
      immediate: true
    },
    data: {
      handler() {
        this.init()
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
.anchor-nav{
  height:100%;
  display:flex;
  .anchor-nav-content{
    flex:1;
    height:100%;
    max-width: 85%;
    box-sizing: border-box;
     padding: 10px 10px;
    .anchor-nav-content-box{
      overflow: auto;
      height:100%;
      padding: 0 10px;
      box-sizing: border-box;
    }
  }
  .anchor-nav-list{
    padding: 10px 10px;
    width:350px;
    max-height:100%;
    overflow: auto;
    box-sizing: border-box;
  }
}
.anchor-nav.single{
  .anchor-nav-list{
    width:250px;
  }
}
.anchor-nav-general{
  font-size: 14px;
  .anchor-scroller{
    position: relative;
  }
  .anchor-nav-bar{
    position: absolute;
    top: 10px;
    width: 0;
    height: 100%;
    background-color: #eaeaea;
    border: 1px solid #eaeaea;
    border-top: 0;
    border-bottom: 0;
    left: 6px;
    .anchor-nav-se{
      position: absolute;
      left: -8px;
      width: 14px;
      height: 14px;
      background-color: #FFF;
      zoom: 1;
      background: url(./img/anchor-se.jpg) no-repeat left center;
    }
    .anchor-nav-start{
      top: 0;
    }
    .anchor-nav-end{
      bottom:0;
    }
  }
  .anchor-toTop{
    margin-top: 20px;
    .anchor-gotop-button{
      display: block;
      width: 45px;
      height: 45px;
      cursor: pointer;
      background: url(./img/anchor-db.png) no-repeat left center;
    }
  }
  .anchor-list{
    padding: 20px 0;
    max-height: calc(100% - 100px);
    overflow: auto;
    box-sizing: border-box;
    .anchor-item{
      position: relative;
      padding-left: 20px;
      color: #666;
      text-decoration: none;
      .anchor-link{
        text-decoration: none;
      }
      .anchor-text{
        padding: 5px 0;
        line-height: 20px;
        display: block;
        color: #666;
      }
      .anchor-index{
        line-height: 20px;
        text-decoration: none;
        padding-right: 10px;
      }
      .anchor-label{
        text-decoration: none;
      }
    }
    .level {
       .pointer{
          position: absolute;
          display: block;
          width: 18px;
          height: 10px;
          left: 0;
          font-size: 0;
          top: 7px;
          cursor: pointer;
          margin-top: 4px;
          border-radius: 0;
       }
    }
    .current.level {
       .pointer{
        background: url(./img/anchor-erjjt.png) no-repeat -3px center;
       }
    }
    .level1{
      margin: 10px 0 5px 0;
      color: #666;
      font-weight: 700;
      .pointer {
        position: absolute;
        display: block;
        width: 14px;
        height: 14px;
        cursor: pointer;
        margin-top: 4px;
        left: 0px;
        top: 5px;
        background: url(./img/anchor-bryd.png) no-repeat left center;
      }
    }
    .current.level1{
      .pointer{
         background: url(./img/anchor-ydh.png) no-repeat left center
      }
    }
    .level:hover{
      .anchor-link{
        text-decoration: none;
      }
      .anchor-text{
        color: var(--primary-color);
      }
      .anchor-index{
        text-decoration: none;
      }
      .anchor-label{
        text-decoration: none;
      }
    }
  }

}
.anchor-nav-single{
  padding: 10px 0;
  font-size: 14px;
  .anchor-scroller{
    position: relative;
  }
  .anchor-nav-bar{
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    background-color: #eaeaea;
    border: 1px solid #eaeaea;
    border-top: 0;
    border-bottom: 0;
    left: 11px;
    .anchor-nav-se{
      display: none;
    }
  }
  .anchor-list{
    .anchor-item{
      position: relative;
      padding-left: 0;
      color: #aaa;
      text-decoration: none;
      .pointer{
        display: none
      }
      .anchor-link{
        text-decoration: none;
      }
      .anchor-text{
        padding-left: 0 !important;
        padding: 0;
        padding-bottom: 25px;
        line-height: 20px;
        display: block;
        color: #aaa;
      }
      .anchor-index{
        width: 20px;
        height: 20px;
        font-size: 10px;
        line-height: 20px;
        text-align: center;
        left: 0px;
        top: 5px;
        background: #fff;
        border: solid 2px #aaa;
        border-radius: 20px;
        text-decoration: none;
        margin-right: 15px;
        display: inline-block;
      }
      .anchor-label{
        font-size: 14px;
        text-decoration: none;
      }
    }
    .current.level{
      .anchor-link{
        text-decoration: none;
      }
      .anchor-text{
        color: var(--primary-color);
      }
      .anchor-index{
        text-decoration: none;
        font-weight: bold;
        border-color: var(--primary-color);
      }
      .anchor-label{
        color: var(--primary-color);
        text-decoration: none;
        font-weight: bold;
      }
    }
    .level:hover{
      .anchor-link{
        text-decoration: none;
      }
      .anchor-text{
        cursor: pointer;
        color: #666;
      }
      .anchor-label{
        text-decoration: none;
      }
    }
  }
  .anchor-item:last-child{
      .anchor-text{
        padding-bottom: 0;
      }
  }

}
</style>

<!--
  调用示例
 <template>
  <div class="height-all">
    <BsAnchorNav :data="anchorData" type="single">
      <BsAnchorNavOption anchor="content1" title="1、内容1">
        <div>内容1</div>
      </BsAnchorNavOption>
      <BsAnchorNavOption anchor="content2" title="2、内容2">
        <div>内容2</div>
      </BsAnchorNavOption>
    </BsAnchorNav>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      anchorData: [
        {
          anchor: 'content1',
          label: '内容1'
        },
        {
          anchor: 'content2',
          label: '内容2'
        },
        {
          anchor: 'content3',
          label: '内容3'
        },
        {
          anchor: 'content4',
          label: '内容4'
        }
      ]
    }
  },
  methods: {
  },
  mounted() {},
  watch: {
  }
}
</script>

<style lang='scss'>
</style>

  注意：锚点anchor与数据anchor保持一值,必传
-->
