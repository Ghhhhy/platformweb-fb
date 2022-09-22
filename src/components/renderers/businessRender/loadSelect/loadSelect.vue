<template>
  <div>
    <vxe-select v-model="value" placeholder="请选择" :transfer="true" clearable>
      <vxe-option v-for="(item,index) in options" :key="index" :value="item.value" :label="item.label" />
    </vxe-select>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    config: {
      type: Object,
      default() {
        return {
          url: '',
          labelField: '',
          valueField: ''
        }
      }
    },
    value: {
      type: String,
      default: ''
    },

    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  model: {
    event: 'input',
    prop: 'value'
  },
  data() {
    return {
      tem: ''
    }
  },
  methods: {
    init() {
      this.$emit('input', '')
    },
    initOptions() {

    },
    async $asyncGet(url, params, cb) { // 使用异步调用，返回结果后再执行
      let res = await this.$http.get(url, params)
      if (res && res.rscode === '100000') {
        this.options = res.rows.map((item, index) => {
          return Object.assign(item, {
            value: item.asset_code,
            label: item.asset_code
          })
        })
      } else {
        this.$message.warning(res.result)
      }
      let result = await this.$http.get(url, params, origin)
      console.log(result)
    }
  },
  mounted() {},
  watch: {
    params: {
      handler() {
        this.init()
        this.initOptions()
      },
      deep: true,
      immediate: true
    },
    config: {
      handler() {
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
