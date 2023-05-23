<!--
 * @Author: Comer
 * @Mail: xinlai@bosssoft.com.cn
 * @Date: 2021-12-16 10:22:56
 * @LastEditors: Comer
 * @LastEditTime: 2021-12-17 11:10:14
 * @Description:
-->
<template>
  <ReportView :codes="code" :init-params="initParams" />
</template>
<script>
export default {
  data() {
    return {
      code: 'aaaaa', // 设计端对应的报表code multiple_test
      paramsObj: {
        city: '福州'
      }
    }
  },
  methods: {
    /**
     * @description: initParams方法进行报表内容替换和搜索条件初始值设置
     * 例如设计端报表设置了占位符 #{city},等待应用端渲染完成后excel内容含有#{city}的占位符 将替换成'福建省'，
     * 如果搜索条件的关键字设置成city ，搜索条件的默认值会变成'福建省'
     * @param {*} params
     * @return {*}
     */
    initParams(params) {
      return new Promise(resolve => {
        let paramsTemp = { ...this.paramsObj }
        Object.keys(params).map(key => {
          if (Object.hasOwnProperty.call(this.paramsObj, key)) {
            paramsTemp[key] = this.paramsObj[key]
          }
        })
        resolve(paramsTemp)
      })
    }
  },
  created() {
    // const { code, city } = this.$store.getters.getMenuParams5
    // this.code = code
    // this.paramsObj = city
  },
  mounted () {
    let self = this
    setTimeout(() => {
      self.code = 'multiple_test'
    }, 60000)
  }
}
</script>
