<!--
 * @Author: 轻语
 * @Date: 2021-02-24 22:06:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-16 16:42:32
 * @Description: 
-->
#### example

```vue live

  new Vue({
    data(){
      return {
        crumbsdata: [
          { 
            name: '项目库总览',
            url: 'MainProjectLibraryOverview' 
          },
          { 
            name: '进入项目库',
            url: 'EnterTheProjectLibrary' 
          }
        ],
      }
    },
    methods: {
      onCrumbsClick(crumbsdata, index) {
        console.log(crumbsdata, index)
      },
    },
    template: `
      <div>
        <BsCrumbs :crumbsdata="crumbsdata" @onCrumbsClick="onCrumbsClick" />
      </div>
    `
  })
```

