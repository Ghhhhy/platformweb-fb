<template>
  <div>
    <vxe-grid
      id="Table-general"
      ref="xGrid"
      border
      resizable
      export-config
      import-config
      keep-source
      height="auto"
      sortable
      :data="tableDataIn1"
      :columns="tableColumnsConfigIn1"
    />
    <el-button @click="modelVisible = !modelVisible">默认按钮</el-button>
    <el-button @click="test">默认按钮</el-button>
    <vxe-modal
      id="myModal6"
      v-model="modelVisible"
      title="新增"
      min-width="1200px"
      width="1200px"
      min-height="320"
      resize
      remember
      storage
      transfer
    >
      <div
        class="122333jhedjqkwehvknqjn"
        style="width:1200px"
      >
        <vxe-grid
          id="
        Table-general"

          border
          resizable
          export-config
          import-config
          keep-source
          height="auto"
          sortable
          :data="tableDataIn2"
          :columns="tableColumnsConfigIn2"
        /></div>
    </vxe-modal>
  </div>

  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      modelVisible: false,
      tableDataIn1: [
        {
          name: 'John Brown',
          age: 18,
          sex: 0,
          category: '前端',
          address: 'New York No. 1 Lake Park',
          status: 0
        },
        {
          name: 'Jim Green',
          age: 24,
          sex: 1,
          category: '运维',
          address: 'London No. 1 Lake Park',
          status: 1
        },
        {
          name: 'Joe Black',
          age: 30,
          sex: 0,
          category: '后端',
          address: 'Sydney No. 1 Lake Park',
          status: 0
        },
        {
          name: 'Jon Snow',
          age: 26,
          sex: 1,
          status: 1,
          category: '实施',
          address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
        },
        {
          name: 'Tom',
          age: 50,
          sex: 1,
          status: 1,
          category: '测试',
          address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
        }],
      tableDataIn2: [
        {
          name: 'John Brown',
          age: 18,
          sex: 0,
          category: '前端',
          address: 'New York No. 1 Lake Park',
          status: 0
        },
        {
          name: 'Jim Green',
          age: 24,
          sex: 1,
          category: '运维',
          address: 'London No. 1 Lake Park',
          status: 1
        },
        {
          name: 'Joe Black',
          age: 30,
          sex: 0,
          category: '后端',
          address: 'Sydney No. 1 Lake Park',
          status: 0
        },
        {
          name: 'Jon Snow',
          age: 26,
          sex: 1,
          status: 1,
          category: '实施',
          address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
        },
        {
          name: 'Tom',
          age: 50,
          sex: 1,
          status: 1,
          category: '测试',
          address: 'Ottawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake ParkOttawa No. 2 Lake Park'
        }],
      tableColumnsConfigIn1: [
        {
          title: 'basicinfor',
          children: [
            {
              title: 'Name',
              field: 'name',
              editRender: {
                name: '$input',
                props: {
                  type: 'string',
                  redonly: true
                }
              }
            },
            {
              title: 'Age',
              field: 'age',
              sortable: true,
              editRender: {
                name: '$input',
                props: {
                  type: 'number',
                  redonly: true
                }
              }
            }]
        }],
      tableColumnsConfigIn2: [
        {
          title: 'basicinfor',
          children: [
            {
              title: 'Name',
              field: 'name',
              editRender: {
                name: '$input',
                props: {
                  type: 'string',
                  redonly: true
                }
              }
            },
            {
              title: 'Age',
              field: 'age',
              sortable: true,
              editRender: {
                name: '$input',
                props: {
                  type: 'number',
                  redonly: true
                }
              }
            }]
        },
        {
          title: 'Sex',
          field: 'sex',
          editRender: {
            name: '$select',
            options: [
              { value: 1, label: '男' },
              { value: 0, label: '女' }
            ]
          }
        },
        {
          title: 'Personality',
          field: 'personality'
        },
        {
          title: 'Status',
          field: 'status',
          editRender: {
            name: '$select',
            options: [
              { value: 1, label: '是' },
              { value: 0, label: '否' }
            ]
          }
        }]
    }
  },
  methods: {
    testTablefunction() {
      let self = this
      setTimeout(function() {
        self.tableColumnsConfigIn2 = [
          {
            title: 'Name',
            field: 'name',
            editRender: {
              name: '$input',
              props: {
                type: 'string',
                redonly: true
              }
            }
          },
          {
            title: 'Sex',
            field: 'sex',
            editRender: {
              name: '$select',
              options: [
                { value: 1, label: '男' },
                { value: 0, label: '女' }
              ]
            }
          },
          {
            title: 'Personality',
            field: 'personality'
          },
          {
            title: 'Status',
            field: 'status',
            editRender: {
              name: '$select',
              options: [
                { value: 1, label: '是' },
                { value: 0, label: '否' }
              ]
            }
          }]

        // self.$forceUpdate()
      }, 3000)
    }
  },
  mounted() {
    this.testTablefunction()
  },
  watch: {
    tem: {
      handler() {},
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang='scss'>
</style>
