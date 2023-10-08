​								博思致新UI组件库开发-使用-维护文档

--

<font color=#008000>**title**</font>: <font color=red>组件库使用文档</font>

--



#### 零、更新日志 (每次发版后将日志维护至此)
| <div class="log-width">2.1.0.0</div> | 2023-03-16 |
| ---- | ---- | 
| 统一UI组件的第一个对外正式版本，目前已应用到中央版本全模块，地方版执行模块 | 辛来 |
| 提供符合UI设计规范的UI组件及相关API，换肤功能 | 辛来 |

| <div class="log-width">0.4.20</div> | 2022-11-29 |
| ---- | ---- | 
| feat(BsTable): 将vxe-table仓库化、私服化，进行自定义改造支持合计行放首行 | 辛来 |
| feat(BsTable): bs-ui引入@bszx/bs-vxe-table，扩展功能支持合计行放在表格首行 | 辛来 |
| fix(BsTable): 错行和双横线问题解决 | 辛来 |
| feat(BsTable): $vxeEditDownTerm渲染器添加 | 龚华涛 |

| <div class="log-width">0.4.19</div> | 2022-11-15 |
| ---- | ---- | 
| fix(BsTree): 过滤节点时，是通过display:none设置节点不显示，当复选框存在，选择全部时也会把隐藏的节点选中 | 龚华涛 |
| fix(BsTree): curCheckednodes初始化isVisibleNode未赋值导致选的节点获取为空 | 龚华涛 |
| feat(BsTable): 树形数据过滤父级合计 | 任少景 |

#### 一、简介

Boss-UI 是基于 vue+webpack+gulp 的一套将博思各项目中公共组件抽离的解决方案。其开发目的是，以期在之后的项目开发中，公共组件可以以依赖的形式安装，在组件库方可以按照标准维护版本，各终端根据具体需求选择所需组件版本。

#### 二、组件目录

```js
|-- Boss-UI
    |-- .babelrc  --------------------------------------------babel设置，包括模块引入路径匹配更换
    |-- README.md 
    |-- babel.config.js --------------------------------------babels设置
    |-- package.json
    |-- vue.config.js
    |-- build ------------------------------------------------打包配置
    |   |-- config.js ----------------------------------------配置entry、externals、alias
    |   |-- webpack.common.js --------------------------------合并打包
    |   |-- webpack.component.js -----------------------------分块打包
    |   |-- webpack.conf.js ----------------------------------
    |-- examples --------------------------------------------原src文件
    |   |-- App.vue
    |   |-- main.js
    |   |-- components
    |-- lib --------------------------------------------------打包文件。npm、_npm只需要这个
    |   |-- boss-ui.common.js ------------------------所有项目以commonjs2形式打包到当前文件
    |-- packages ---------------------------------------------各组件文件
    |   |-- index.js -----------------------------------------引入所有组件，添加install方法
    |   |-- Crumbs -------------------------------------------面包屑组件
    |   |   |-- index.js -------------------------------------声明组件并导出
    |   |   |-- src ------------------------------------------组件内容
    |   |       |-- README.md ------此处添加项目demo，借助vue-styleguide编译，可在文档中对应生成。
    |   |       |-- index.vue 
    |   |       |-- img -------静态文件以相对路径引入，图片超过30k需压缩再放入，小于30k将转为base64
    |-- src --------------组件开发时，以boss/src/util引入对应文件，经打包后将自动转为boss/lib/util
    |   |-- Directive
    |   |-- plugins
    |   |-- utils

```
#### 三、组件引入方式

1. 根目录下新增.npmrc文件，并添加

```js
@bszx:registry=http://8.142.47.30:4873/
```
用以设置npm源。
2. 根目录下安装boss-ui
```js
npm i @bszx/boss-ui@latest -S
```
3. 安装完成后，在src/main.js文件调整本地组件和远程库的引入顺序
  * 新建src/plugin文件夹
  * 新建src/plugin/boss-ui.js 文件
  ```js
  import Vue from 'vue'
  import BsUi from '@bszx/boss-ui'
  Vue.use(BsUi)
  ```
  * 新建src/plugin/http.js文件。 将原main文件中关于http相关代码剪切复制其中。
  * 新建src/plugin/UI.js 文件， 将原main文件中关于本地组件库的代码剪切复制其中。
  * 在main文件中，按顺序引入以上三者。

  ```js
  import './plugIn/http'
  import './plugIn/UI'
  import './plugIn/@bszx/boss-ui' // 组件库出现问题阻塞时，注释掉当前行即可
  ```
  * 若远程组件库出现阻塞问题，将“import './plugIn/@bszx/bs-ui'” 注释调, vue将启用本地组件库。  之后尽快将问题上报

#### 四、新增组件步骤

1. 新建Button文件夹至packages

   ```js
   |-- Button
       |-- index.js
       |-- src
           |-- README.md
           |-- index.vue
           |-- img    -------------------------------------------根据需要添加  
   ```

2. 新建index.js

   ```js
   import BsButton from "./src/index.vue";
   BsButton.install = function(Vue) {
     Vue.component(BsButton.name, BsButton);
   };
   export default BsButton;
   ```

3. 新建src/index.vue文件，根据具体情况添加注释。  注释具体规则在附录或组件库styleguide/README.md中

   ```vue
   <template>
     <div class="bs-button" :class="buttonClass">
         <!--------- 此处为插槽注释 --------->
         <el-button></el-button>	
         <!-- @slot Use this slot header -->
         <slot name="header"><h1>{{ title }}</h1></slot>
       </div>
     </div>
   </template>
   
   <script>
   /**
    * 按钮组件  -- Author:Titans        --------------此处为组件基本信息注释
    */
   export default {
     name: 'BsButton',
     props: {
       /**
        * butonClass
        * ...更多注释
        */
       buttonClass: {
         type: String,
         default: ''
       }
   	},
     methods: {
       onBtnClick(index) {
         /**
          * 某某点击事件
          * @property {object} crumbsdatain 数据注释
          * @property {number} index 数据注释
          */
         this.$emit('onCrumbsClick', {k:'fuck'}, index)
       }
     }
   }
   </script>
   <style lang="scss">
   </style>
   
   ```

4. 新建README.md文件，vue-styleguide会自动将其编译，转为demo样例。

   ```vue
   ​```vue 
     new Vue({
       template: `
         <div>
           <BsButton /> // 此处组件名当与组件名一致。
         </div>
       `
     })
   ​```
   ```

5. 添加当前文件到packages/index.js文件中

   ```js
   // * 如果是一般组件，则按规则添加到components数组，经map注册。
   components.map((component) => Vue.component(component.name, component));
   // * 若为功能组件，则在引入之后，可挂载到Vue原型之上。   
   Vue.prototype.$LoadingMark = LoadingMark
   ```

6. 资源引入

   * 静态资源引入：img文件放入./src/文件底下。  图片超过30k，[需压缩替换](https://tinypng.com/)，未超过30k将自动转为base64。

#### 五、 $http与vuex的处理

因项目需求特殊性，无法将组件库纯粹抽离成功能性组件。组件中需添加对vuex、基于axios封装&http的支持，故而对组件做了如下处理：

* 组件只支持全局引入。  且在项目中引入使用之前，需在Vue原型上添加$http方法。

  ```js
  // 
  import lib from 'boss-ui'
  import 'bs-ui/lib/theme-chalk/index.css'
  import 'bs-ui/lib/theme-chalk/alifont/iconfont.css'
  // 实际项目中$http已封装好，无需多做处理
  const promise = function () {
    return new Promise((res) => {
      console.log('调用接口')
      res('1')
    })
  }
  // 模拟接口 防止报错
  Vue.prototype.$http = {
    get: promise,
    post: promise,
    put: promise,
    del: promise,
    postStringify: promise,
    DownLoadToFile: promise,
    downLoad: promise,
    DownLoadToExcel: promise,
    httpGlobalGatewayAgent: promise
  }
  Vue.use(lib).
  ```

  如此，在执行Vue.use(lib)之后，bs-ui组件库可以拿到绑定在原型上的$http方法。

  vuex同理，可通过原型上的$store方法，进行vuex的获取与写入。

  也正因此，组件不再支持分包加载，webpack.component.js文件废弃，只做参考学习之用。

  

  另，vue-styleguide不加载main.js文件，所有demo中依赖组件、样式、uitls都需要global.requires.js声明。故对同样问题的处理方案也是如此。在global.requires.js添加对应内容。  

  

#### 六、打包发布流程规范

1. 发布前更新版本号，规则如下：

   ```js
   版本号一般格式为 x.y.z，解释为主版本.次要版本.补丁版本。一般更新原则为：
   *	如果只是修复 bug，需要更新 z 位。
   * 如果是新增了功能，但是向下兼容，需要更新 y 位。
   * 如果有大变动，向下不兼容，需要更新 x 位。
   ```

2. 更新根目录README。 因verdaccio无tag功能，发布信息需要手动在readme维护。  填写关键描述至package.json - description字段中，该描述将用于verdaccio版本描述中

   ```js
   feat： 新增 feature
   fix: 修复 bug
   docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE等等
   style: 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
   refactor: 代码重构，没有加新功能或者修复 bug
   perf: 优化相关，比如提升性能、体验
   test: 测试用例，包括单元测试、集成测试等
   chore: 改变构建流程、或者增加依赖库、工具等
   revert: 回滚到上一个版本
   ```

3. 执行打包命令

   ```js
     # 第一步: .npmignore中添加packages  examples   src 通过这发的包进行隐藏源码控制

     # 第二步：打包
     npm run async

     # 第三步： 发布
     npm publish // 发布     
     npm unpublish --force // 撤销最近一次发布
   ```

4. npm切入私源，执行npm publish

5. 补充

```js
   * npm run clean:  清除既有打包内容
   * npm run common: 所有组件打包至lib/boss-ui.common.js
   // * npm run build:utils: 编译所有src下所有工具文件，并复制粘贴到lib下。通过.babelrc文件module-resolver的alias设置，所有组件对bs-ui/src的引用将自动转为bs-ui/lib。
   // * npm run build:style: 打包所有公共样式文件。   webpack中配置了extract: false，所有组件内的css都将强制内联。
```



  





