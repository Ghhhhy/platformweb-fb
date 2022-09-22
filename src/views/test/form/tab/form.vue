<template>
  <div>
    <!-- <BsTable :table-columns-config="tableConlums" :table-data="tableData" /> -->

    <BsTable ref="initTableFormConfig1" :table-data="tableData1" :table-columns-config="tableConlums1" />
    <!-- <BsTabComponent /> -->
    <!-- <BsForm /> -->
    <!-- <BsFormV2 /> -->
    <!-- <BsTabComponent /> -->
    <el-button @click="modelVisible = !modelVisible">默认按钮</el-button>
    <el-button @click="test">默认按钮</el-button>
    <vxe-modal
      id="myModal6"
      v-model="modelVisible"
      title="新增"
      width="800"
      height="400"
      min-width="460"
      min-height="320"
      resize
      remember
      storage
      transfer
    ><BsTable ref="initTableFormConfig2" :table-data="tableData2" :table-columns-config="tableConlums2" /></vxe-modal>

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
      defaultSelect: 0,
      tableConlums1: [{
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
      tableConlums2: [
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
      tableData1: [
        {
          name: 'John Brown22222',
          age: 189,
          sex: 1,
          category: '后端',
          address: 'New York No. 1 Lake Park',
          status: 0
        }],
      tableData2: [
        {
          name: 'John Brown',
          age: 18,
          sex: 0,
          category: '前端',
          address: 'New York No',
          status: 1
        }]

    }
  },
  methods: {
    init() {
    },
    test() {
      console.log(this.$refs)
    },
    testTablefunction() {
      let self = this
      setTimeout(function() {
        self.tableConlums2 = [
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

        // self.$forceUpdate()
      }, 3000)
    }
  },
  mounted() {
    // this.init()
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
