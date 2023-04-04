<!--
 * @Author: 轻语
 * @Date: 2021-03-16 15:07:12
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-17 16:02:34
 * @Description: 
-->
<!--
 * @Author: 轻语
 * @Date: 2021-02-24 22:06:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-16 15:06:44
 * @Description: 
-->
#### example

```vue live

  new Vue({
    data(){
      return {
        logsData: [{nodeName: '轻语1', actionUser: '轻语2', actionName: '轻语3', actionTime: '轻语4', dutyName: '轻语5'}], // 操作日志内容
        showLogView: false
      }
    },
    methods: {
      onSearchClick(){}
    },
    template: `
      <div>
        <BsOperationLog :logs-data="logsData" :show-log-view="showLogView" />
      </div>
    `
  })
```

