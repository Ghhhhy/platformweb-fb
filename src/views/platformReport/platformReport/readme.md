<!--
 * @Author: Comer
 * @Mail: xinlai@bosssoft.com.cn
 * @Date: 2021-12-17 09:49:32
 * @LastEditors: Comer
 * @LastEditTime: 2021-12-17 09:52:07
 * @Description: 
-->
# 报表插件使用说明

# 设置博思CNPM私服

使用yarn设置私服
```cmd
yarn config set registry http://58.22.61.222:14873/
```

使用npm设置私服
```cmd
npm config set registry http://58.22.61.222:14873/
```

# 安装

使用YARN安装
```cmd
yarn add @platform/report

yarn add @platformarts-grid-layout  //依赖包
```

使用NPM安装
```cmd
npm install @platform/report --save

npm install @platformarts-grid-layout  //依赖包
```

# 用例

```javascript
import Report from "@platform/report";

import GridLayout from "@platform/charts-grid-layout"

Vue.use(Report);
Vue.use(GridLayout);

```

# 代理设置

```javascript
devServer:{
    hot: true,
    proxy: {
      '/datav': {
        target: 'http://172.18.172.206:8086/', //数据可视化服务
        changOrigin: true, //允许跨域
      }
    }
}

```

## 使用code获取报表,向插件传递参数显示报表

```javascript
<template>
  <ReportView :codes="code" :initParams="initParams"></ReportView>
</template>

<script>
export default {
  data() {
    return {
      code: 'multiple_test',// 设计端对应的报表code
      paramsObj: {
        city: '福州' 
      }
    };
  },
  methods: {
    /**
     * initParams方法进行报表内容替换和搜索条件初始值设置 ，
     * 例如设计端报表设置了占位符 #{city},等待应用端渲染完成后excel内容含有#{city}的占位符将替换成'福建省'，
     * 如果搜索条件的关键字设置成city ，搜索条件的默认值会变成'福建省'
     */
    initParams(params) {
      return new Promise(resolve => {
        let paramsTemp = { ...this.paramsObj };
        Object.keys(params).map(key => {
          if (Object.hasOwnProperty.call(this.paramsObj, key)) {
            paramsTemp[key] = this.paramsObj[key];
          }
        });
        resolve(paramsTemp);
      });
    }
  }
};
</script>

```

Swagger API URL:http://49.234.144.154:8087/datav/doc.html
数据可视化DataV: http://49.234.144.154:8088/#/login
用户/密码
system
system

datav-init，软件路径：/opt/datav/datav-init
datav-rest, 软件路径：/opt/datav/data-rest
license路劲：/opt/datav/license

数据库信息：
49.234.144.154:5236
SHCZ_DATAV
Bosssoft1234