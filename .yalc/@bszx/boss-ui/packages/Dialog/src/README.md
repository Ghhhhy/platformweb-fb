<!--
 * @Author: 轻语
 * @Date: 2021-02-24 22:06:04
 * @LastEditors: 轻语
 * @LastEditTime: 2021-03-15 11:10:11
 * @Description: 
-->
#### example

```vue live

  new Vue({
    data(){
      return {
        isVisible: false
      }
    },
    template: `
      <div>
        <el-button @click="isVisible = !isVisible"> open dialog</el-button>
        <bs-dialog
        :visible.sync="isVisible"
        :showClose="true"
        width="50%"
        title="青白dialog"
        :showFooter="true"
        >
          <div slot="header" class="dialog-footer">
            这是header slot
          </div>
          <div slot="context" class="dialog-footer">
            这是context slot~~
          </div>
          <div slot="footer" class="dialog-footer">
            这是header footer
          </div>
        </bs-dialog>
      </div>
    `
  })
```

