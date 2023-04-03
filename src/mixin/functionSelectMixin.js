import { getMRuleFuncReg } from '@/api/frame/main/common/index.js'
export default {
  data() {
    return {
      functionSelectOptions: []
    }
  },
  methods: {
    async getFunctionSelectOptions() {
      const { province: mofDivCode, year: fiscalYear } = this.$store.state.userInfo
      const { data, code } = await getMRuleFuncReg({ mofDivCode, fiscalYear })
      if (code === '200') {
        this.functionSelectOptions = data
      }
    },
    getFunctionLabel(value) {
      return this.functionSelectOptions?.find(item => item.regId === value)?.value || value
    }
  },
  created() {
    this.getFunctionSelectOptions()
  }
}
