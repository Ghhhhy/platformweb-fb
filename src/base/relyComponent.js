// echarts && vue-echarts
import splitPane from 'vue-splitpane'
import { GridLayout, GridItem } from 'vue-grid-layout'
import Draggable from 'vuedraggable'
import { HappyScroll } from 'vue-happy-scroll'
// import vueSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css' // 引入样式
// import 'swiper/swiper.scss'
// import Swiper from 'swiper'
// 自定义组件名

// 引入css
import 'vue-happy-scroll/docs/happy-scroll.css'
const relyComponent = {
  install: function (Vue) {
    // Vue.use(vueSwiper)
    // Vue.prototype.$Swiper = Swiper
    Vue.component('happy-scroll', HappyScroll)
    Vue.component('BsSplitPane', splitPane)
    Vue.component('BsDraggable', Draggable)
    Vue.component('BsGridLayout', GridLayout)
    Vue.component('BsGridItem', GridItem)
  }
}
export default relyComponent

// <grid-layout
//             //  作用        数据类型          必填        备注
//              //===================================================
//             // 网格初始化布局  数组       必填  每一项都必须具有i、x、y、w和h属性 属性用作什么 见下方
//             :layout.sync="layout"
//             // 表示网格有多少列 数字           非必填    默认为12
//             :col-num="12"
//             // 表示一行的高度(以像素为单位) 数字     非必填     默认值为150
//             :row-height="30"
//             // 表示网格中最大行数 数字          非必填     默认为无穷大
//            :maxRows="20"
//             // 表示网格项数是否可以拖动 Boolean        非必填     默认为true
//             :is-draggable="true"
//             // 表示网格是否可以改变带大小 Boolean      非必填     默认为true
//             :is-resizable="true"
//             // RTL/LTR 的转换 Boolean      非必填 默认为false
//             :is-mirrored="false"
//             // 容器是否适应内部变化 Boolean  非必填 默认为 true
//            :autoSize="ture"
//             // 垂直方向上 是否应该紧凑布局 Boolean 非必填 默认为true
//             :vertical-compact="true"
//         // 网格之间的边距 两个数字组成的数组 第一个数字为水品距离 第二个为垂直距离 非必填 默认值为 [10,10]
//             :margin="[10, 10]"
//             // 是否使用css的transforms来排版 非必填 为false时 使用后采用定位方式来布局 默认为true
//             :use-css-transforms="true"
//             // 布局是否应响应窗口宽度 非必填 默认false 为true时 会出现一些布局错乱的问题
//            :responsive="false"
//            //布局是否应响应为响应布局定义的窗口宽度断点 对象类型 非必填 默认值
//             // { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }
//            :breakpoints=" { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }"
//            // 定义每个断点的列数
//            :cols="{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }"
//             // 生命周期

//            @layout-created="layoutCreatedEvent"  // 布局创建事件
//             @layout-before-mount="layoutBeforeMountEvent" // 布局安装以前事件
//             @layout-mounted="layoutMountedEvent"    // 布局安装事件
//             @layout-ready="layoutReadyEvent"    // 布局准备活动
//             @layout-updated="layoutUpdatedEvent" // 格子位置 大小更新
//     >
//       // 每个单独控制 需要注意的是 每一个属性都要在data中注册一下 不然会导致不能拖拽 或者 不能放大缩小
//        <grid-item
//          class="echarts_box"
//           :x="layoutData[0].x" // 横向距离
//           :y="layoutData[0].y" // 纵向距离
//           :w="layoutData[0].w" // 宽度
//           :h="layoutData[0].h" // 高度
//           :i="layoutData[0].i" // 唯一值 （重复时设置会导致一块放大或缩小）string类型
//           @resize="resizeEvent" // 当该元素 被放大缩小触发的事件
//           @move="moveEvent" // 该元素移动时 触发的事件
//           @resized="resizedEvent" // 放大缩小结束 触发事件 注意:必须当大小相对上一次发生改变结束时才会触发
//           @moved="movedEvent" // 移动结束触发 注意:只有当位置相对上一次发生改变才会触发
//         ></grid-item>
//     // for循环 便利数组中的内容 渲染元素
//        // <grid-item v-for="item in layout"
//        //          :x="item.x"
//        //           :y="item.y"
//        //           :w="item.w"
//        //            :h="item.h"
//        //          :i="item.i">
//        //        {{item.i}}
//        //</grid-item>
//   </grid-layout>
//
// import VueGridLayout from 'vue-grid-layout' //文件引入
// const matedata = [
//   {
//     i: "0", // 索引值 必填
//     h: 4,   // 高度   必填
//     w: 7,   // 宽度   必填
//     x: 2,   // x 轴距离 必填
//     y: 0,   // y轴距离 必填
//     minW:5 // 最小宽度 当 w的值小于minW时 采用minW的值
//     minH:3 // 同上
//     maxW:8 // 的最大宽度。如果w大于maxW，那么w将被设置为maxW。
//     maxH:6 // 同上
//     isDraggable:true // 单独控制这一个盒子是否可以拖动 未填写 继承父元素的 非必填
//     isResizable:true // 单独控制这一个盒子是否可以调整大小 未填写 继承父元素的 非必填
//     static:false // 这个盒子是静态的  不能被其他元素改变位置 会被覆盖在底部
//     dragIgnoreFrom: '' // 属性这值为css 选择器 项的哪些元素不应触发项的拖动事件// 具体不知道干嘛的 没有用到
//     dragAllowFrom:'' // 属性这值为css 选择器 项的哪些元素应触发项的拖动事件 // 文档这样写的
//     resizeIgnoreFrom:''//属性这值为css 选择器 表示项的哪些元素不应触发项的调整大小事件。//来自文档翻译
//   },
//   {
//     h: 1,
//     i: "1",
//     w: 1,
//     x: 0,
//     y: 1
//   },
//   {
//     h: 1,
//     i: "2",
//     w: 1,
//     x: 0,
//     y: 2
//   },
//   {
//     h: 1,
//     i: "3",
//     w: 1,
//     x: 0,
//     y: 3
//   }
// ];
// export default {
//   data() {
//     return {
//       layoutData: matedata, //  存放布局数据 数据格式如上
//     };
//   },
//   components: {
//     GridLayout, //注册组件
//     GridItem // 注册
//   },
//   methods: {
//       // 布局中单元改变事件  i, newX, newY 移动的坐标
//       //                i, newH, newW, newHPx, newWPx 变化的大小
//                             //newHPx, newWPx 是实际的像素
//                         // newH, newW 是数据中的 以每个单位大小为基准点算
//     resizeEvent(i, newH, newW, newHPx, newWPx) {
//       console.log("大小正在改变",i, newH, newW, newHPx, newWPx);
//     },
//     moveEvent( i, newX, newY) {
//       console.log("正在移动",i, newX, newY);
//     },
//     resizedEvent(i, newH, newW, newHPx, newWPx) {
//       console.log("大小改变完了",i, newH, newW, newHPx, newWPx);
//     },
//     movedEvent( i, newX, newY) {
//       console.log("移动结束了", i, newX, newY);
//     },
//        // 布局组件的生命周期  参数newLayout=> 布局的数据 每个布局数据
//     layoutCreatedEvent(newLayout) {
//       console.log("1Created");
//     },
//     layoutBeforeMountEvent(newLayout) {
//       console.log("2Mount");
//     },
//     layoutMountedEvent(newLayout) {
//       console.log("3Mounted");
//     },
//     layoutReadyEvent(newLayout) {
//       console.log("4Ready");
//     },
//     layoutUpdatedEvent(newLayout) {
//       console.log("Updated");
//     }
//   },
//   created() {
//   },
//   mounted() {
//   };
// };

// vueScroll
// data() {
//   return {
//     // vuescroll
//     vuescroll: {
//       mode: 'native',
//       // 设置 vuescroll的大小类型， 可选的有percent, number.
//       // 设置为percent会把 vuescroll 的 height 和 width 设置成100%,
//       // 设置成number的话 vuescroll 会自动计算父元素的大小，并将height和width设置成对应的数值。
//       // 提示:如果父元素的尺寸为百分比大小时建议设置成number,如果父元素大小为一个固定的px的值,那么设置为百分比比较合适一些。
//       sizeStrategy: 'percent',
//       // 是否开启监听 dom resize
//       detectResize: true,
//       // 下拉刷新相关(slide mode)
//       pullRefresh: {
//         enable: false,
//         // 下拉刷新的提示
//         tips: {
//           deactive: 'Pull to Refresh',
//           active: 'Release to Refresh',
//           start: 'Refreshing...',
//           beforeDeactive: 'Refresh Successfully!'
//         }
//       },
//       // 上推加载相关
//       pushLoad: {
//         enable: false,
//         tips: {
//           deactive: 'Push to Load',
//           active: 'Release to Load',
//           start: 'Loading...',
//           beforeDeactive: 'Load Successfully!'
//         },
//         auto: false,
//         autoLoadDistance: 0
//       },
//       paging: false,
//       zooming: true,
//       // 快照
//       snapping: {
//         enable: false,
//         width: 100,
//         height: 100
//       },
//       /* shipped scroll options */
//       scroller: {
//         /*
//           允许滚动出边界
//           true 或者 false 或者一个数组指定哪个方向可以超出边界，可选项分别是：
//           ['top','bottom','left','right']
//         */
//         bouncing: true,
//         /** Enable locking to the main axis if user moves only slightly on one of them at start */
//         locking: true,
//         /** 最小缩放级别 */
//         minZoom: 0.5,
//         /** 最大缩放级别 */
//         maxZoom: 3,
//         /** 滚动速度的倍速 **/
//         speedMultiplier: 1,
//         /** 到达边界时应用于减速的改变量  **/
//         penetrationDeceleration: 0.03,
//         /** 到达边界时应用于加速的改变量  **/
//         penetrationAcceleration: 0.08,
//         /** Whether call e.preventDefault event when sliding the content or not */
//         preventDefault: true,
//         /** Whether call preventDefault when (mouse/touch)move*/
//         preventDefaultOnMove: true
//       }
//     },
//     scrollPanel: {
//       // 组件加载完后的初始滚动量
//       initialScrollY: false,
//       initialScrollX: false,
//       // 是否禁止x或y方向上的滚动
//       scrollingX: true,
//       scrollingY: true,
//       speed: 300,
//       // 滚动动画
//       easing: undefined,
//       // 是否有一个padding样式，样式的大小应该和rail/bar的大小是一样。可以用来阻止内容被滚动条遮住一部分
//       padding: false,
//       // 有时候原声滚动条可能在左侧,
//       // 请查看 https://github.com/YvesCoding/vuescroll/issues/64
//       verticalNativeBarPos: 'right'
//     },
//     //滚动条滚动的地方
//     rail: {
//       background: '#01a99a',
//       opacity: 0,
//       border: 'none',
//       /** Rail's size(Height/Width) , default -> 6px */
//       size: '6px',
//       /** Specify rail's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
//       specifyBorderRadius: false,
//       /** Rail the distance from the two ends of the X axis and Y axis. **/
//       gutterOfEnds: null,
//       /** Rail the distance from the side of container. **/
//       gutterOfSide: '2px',
//       /** Whether to keep rail show or not, default -> false, event content height is not enough */
//       keepShow: false
//     },
//     bar: {
//       /** 当不做任何操作时滚动条自动消失的时间 */
//       showDelay: 500,
//       /** Specify bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
//       specifyBorderRadius: false,
//       /** 是否只在滚动的时候现实滚动条 */
//       onlyShowBarOnScroll: true,
//       /** 是否保持显示 */
//       keepShow: false,
//       /** 滚动条颜色, default -> #00a650 */
//       background: 'rgb(3, 185, 118)',
//       /** 滚动条透明度, default -> 1  */
//       opacity: 1,
//       /** 滚动条的尺寸，默认6px **/
//       size: '6px',
//       /** Styles when you hover scrollbar, it will merge into the current style */
//       hoverStyle: false
//     },
//     scrollButton: {
//       enable: false,
//       background: 'rgb(3, 185, 118)',
//       opacity: 1,
//       step: 180,
//       mousedownStep: 30
//     }
//   }
// }
