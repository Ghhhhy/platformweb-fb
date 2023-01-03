import treeApi from '@/api/frame/common/tree/unitTree.js'
export default {
  data() {
    return {
      businessFunctionCodeModal: '',
      // 业务菜单数据源
      businessFunctionTreeData: [],
      // 业务菜单树配置
      businessFunctionTreeConfig: {
        valueKeys: ['guid', 'name'],
        format: '{name}',
        treeProps: {
          labelFormat: '{name}', // {code}-{name}
          nodeKey: 'guid',
          label: 'label',
          children: 'children'
        },
        placeholder: '请选择',
        multiple: true,
        readonly: false,
        isleaf: true
      }
    }
  },
  computed: {
    // 当前业务模块
    currentBusinessModule() {
      return this.businessModuleCodeoptions.find(item => item.id === this.ModparentId)
    }
  },
  methods: {
    // 获取业务模块下面的业务菜单
    async getBusinessFunctionTree() {
      const { data } = await treeApi.queryTreedElementByCod(this.currentBusinessModule?.code)
      if (Array.isArray(data)) {
        this.businessFunctionTreeData = data
      }
    },
    // 重置
    resetBusinessFunction() {
      this.businessFunctionCode = []
      this.businessModuleName = []
    },
    // 将code、name数组转字符串
    encodeBusinessFunction(codeArr, nameArr) {
      const res = codeArr.reduce((arr, item, index) => {
        arr.push(`${codeArr[index]}##${nameArr[index]}`)
        return arr
      }, [])
      return res.join(',')
    },
    // 将字符串解析成arr
    decodeBusinessFunction(codeNameArr) {
      return codeNameArr.reduce((arr, item) => {
        const [code, name] = item.split('##')
        code && arr[0].push(code)
        name && arr[1].push(name)
        return arr
      }, [[], []])
    }
  },
  mounted() {
    if (this.$parent.DetailData) {
      this.businessFunctionCodeModal = this.encodeBusinessFunction(
        this.$parent.DetailData.menuIdList?.split(',') || [],
        this.$parent.DetailData.menuNameList?.split(',') || []
      )
    }
  },
  watch: {
    // 业务模块下拉
    ModparentId: {
      handler(curVal, preVal) {
        if (curVal !== preVal) {
          // this.businessFunctionCodeModal = ''
          this.getBusinessFunctionTree()
        }
      },
      immediate: true
    },
    businessFunctionCodeModal: {
      handler(curVal, preVal) {
        if (curVal === preVal) return
        if (curVal) {
          const codeNameStrArr = curVal.split(',')
          const [codeArr, nameArr] = this.decodeBusinessFunction(codeNameStrArr)
          this.businessFunctionCode = codeArr
          this.businessFunctionName = nameArr
        } else {
          this.businessFunctionCode = []
          this.businessFunctionName = []
        }
      },
      immediate: true
    }
  }
}
