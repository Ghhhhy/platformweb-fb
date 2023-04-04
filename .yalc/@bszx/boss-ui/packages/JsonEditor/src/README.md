<!--
 * @Author: 轻语
 * @Date: 2021-02-24 22:06:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-16 17:52:08
 * @Description: 
-->
#### example

```vue

  new Vue({
    data(){
      return {
        value: {a: 1}
      }
    },
    methods: {
      input(val) {
        console.log(val)
      }
    },
    template: `
      <div>
        <BsJsonEditor
        v-model="value"
        :showBtns="false"
        :expandedOnStart="false"
        ></BsJsonEditor>
      </div>
    `
  })
```

