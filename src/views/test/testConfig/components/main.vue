<!--  -->
<template>
  <div class="">
    <div class="top">
      <el-form :model="formInline" class="demo-form-inline" label-width="100px">
        <el-row>
          <el-col v-for="(k, v) in formConfig" :key="v" :span="8">
            <el-form-item v-if="k.type === 'input'" :label="k.label">
              <el-input v-model="k.value" size="mini" placeholder="请输入" />
            </el-form-item>
            <el-form-item v-else-if="k.type === 'radio'" label="审批人">
              dsads
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" :offset="16">
            <el-button size="mini" @click="showDetail">高级属性</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="bottom" style="margin-top: 20px">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="300"
      >
        <el-table-column
          type="index"
          width="50"
        />
        <el-table-column
          v-for="(k, v) in col"
          :key="v"
          :prop="k.prop"
          :label="k.label"
          width="80"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click.native.prevent="showDetail(scope.$index, tableData)"
            >
              高级属性
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-drawer
      ref="drawer"
      title="我嵌套了 Form !"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" size="mini" autocomplete="off" />
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button size="mini" @click="dialog = false">取 消</el-button>
          <el-button size="mini" type="primary" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  components: {},
  props: {},
  data() {
    return {
      formConfig: [
        { type: 'input', label: '编码', value: '' },
        { type: 'input', label: '名称' },
        { type: 'input', label: '类型' },
        { type: 'input', label: '表明' },
        { type: 'input', label: '视图名称' },
        { type: 'input', label: '是否可编辑' },
        { type: 'input', label: '是否复选' },
        { type: 'input', label: '列表' },
        { type: 'input', label: '是否拖拽' }
      ],
      col: [
        { prop: 'name', label: '列名称' },
        { prop: 'address', label: '列标题' },
        { prop: 'zip', label: '提示标题' },
        { prop: 'name', label: '列顺序' },
        { prop: 'name', label: '列类型' },
        { prop: 'name', label: '列长度' },
        { prop: 'name', label: '是否可编辑' },
        { prop: 'name', label: '是否可用' },
        { prop: 'name', label: '是否查询项' }
      ],
      formLabelWidth: '80px',
      timer: null,
      table: false,
      dialog: false,
      loading: false,
      drawer: false,
      formInline: {},
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  computed: {},
  methods: {
    showDetail(index, rows) {
      this.dialog = true
    },
    handleClose(done) {
      this.$confirm('还有未保存的工作哦确定关闭吗？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created() {

  },
  mounted() {

  },
  beforeDestroy() {},
  watch: {}
}
</script>
<style lang='scss' scoped>

</style>
