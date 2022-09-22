<!--  -->
<template>
  <div class="">
    <el-container>
      <el-header style="height: 10vh">
        <header style="float: right">
          <el-button v-for="(k, v) in btns" :key="v" size="mini" @click="btnClick(k.code)"> {{ k.title }}</el-button>
        </header>
      </el-header>
      <el-container style="height: 90vh">
        <el-aside width="200px">
          <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick" />
        </el-aside>
        <el-main>
          <main-part />
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="dialogTableVisible" top="5vh">
      <main-part />
    </el-dialog>
  </div>
</template>

<script>
import mainPart from './components/main'
export default {
  components: { mainPart },
  props: {},
  data() {
    return {
      dialogTableVisible: false,
      btns: [
        { title: '新增', code: 'create' },
        { title: '修改', code: 'update' },
        { title: '删除', code: 'delete' },
        { title: '导入', code: 'import' },
        { title: '导出', code: 'export' }
      ],
      data: [{
        label: '录入表',
        children: [{
          label: '01-20001 单位信息录入表'
        }, {
          label: '01-20002 单位人员信息表'
        }, {
          label: '01-20003 单位基本支出'
        }, {
          label: '01-20004 单位信息录入表'
        }, {
          label: '01-20005 单位信息录入表'
        }, {
          label: '01-20006 单位信息录入表'
        }]
      }, {
        label: '查询表',
        children: [{
          label: '二级 2-1'
        }, {
          label: '二级 2-2'
        }]
      }, {
        label: '一级 3'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    btnClick(code) {
      this.dialogTableVisible = true
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
<style lang="scss">
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    header{
      width: 100%;
      text-align: right;
    }
  }

  .el-aside {
    color: #333;
    text-align: center;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

</style>
