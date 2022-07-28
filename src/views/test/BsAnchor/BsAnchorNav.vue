<template>
  <div class="height-all">
    <BsAnchorNav :data="anchorData" type="single">
      <BsAnchorNavOption anchor="content1" title="1、内容1">
        <template v-slot:titleCustom>
          <vxe-button status="primary" content="获取表格数据" @click="getBsBasicInfoTableData" />
        </template>
        <BsBasicGradeInforTable ref="BsBasicInfoTable" :items-config="itemsConfig" :data="data" />
      </BsAnchorNavOption>
      <BsAnchorNavOption anchor="content2" title="2、内容2" />
      <BsAnchorNavOption anchor="content3" title="3、内容3">
        <div style="height:1000px"></div>
      </BsAnchorNavOption>
      <BsAnchorNavOption anchor="content4" title="4、内容4">
        <div style="height:1000px"></div>
      </BsAnchorNavOption>
    </BsAnchorNav>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      anchorData: [
        {
          anchor: 'content1',
          label: '内容1'
        },
        {
          anchor: 'content2',
          label: '内容2'
        },
        {
          anchor: 'content3',
          label: '内容3'
        },
        {
          anchor: 'content4',
          label: '内容4'
        }
      ],
      itemsConfig: [
        {
          title: '姓名',
          field: 'name',
          width: 150,
          align: 'center',
          filters: false,
          filterRender: { name: 'FilterInput' },
          editRender: {
            name: '$vxeInput',
            defaultValue: '默认的名字',
            props: {
              type: 'string',
              redonly: true,
              placeholder: '请输入姓名'
            }
          }
        },
        {
          title: '年龄',
          field: 'age',
          sortable: true,
          width: 120,
          align: 'center',
          combinedType: ['average'],
          editRender: {
            name: '$vxeInput',
            defaultValue: 1,
            props: {
              min: 0,
              type: 'number',
              placeholder: '抢输入年龄',
              redonly: true
            }
          }
        },
        {
          title: '类别',
          field: 'category',
          width: 150,
          editRender: {
            name: '$vxeSelect',
            defaultValue: '前端',
            options: [
              { value: '前端', label: '前端' },
              { value: '后端', label: '后端' },
              { value: '运维', label: '测试' },
              { value: '实施', label: '实施' },
              { value: '测试', label: '测试' }
            ],
            props: {
              multiple: true,
              placeholder: '请输入角色'
            }
          }
        },
        {
          title: '收入',
          field: 'income',
          fieldType: 'money',
          formula: '{age}>=18?Math.pow({age},4)/2:0',
          width: 150,
          align: 'right',
          cellRender: {
            name: '$vxeMoney',
            defaultValue: 0,
            props: {
              min: -1111111111,
              type: 'float'
            }
          }
        },
        {
          title: '扣除',
          field: 'deduction',
          width: 150,
          align: 'right',
          editRender: {
            name: '$vxeMoney',
            defaultValue: 0,
            props: {
              min: -1111111111,
              type: 'float'
            }
          }
        },
        {
          title: '奖金',
          width: 150,
          align: 'right',
          field: 'bonus',
          editRender: {
            name: '$vxeMoney',
            defaultValue: 0,
            props: {
              min: -1111111111,
              type: 'float'
            }
          }
        },
        {
          title: '实际收入',
          width: 180,
          align: 'right',
          field: 'actualIncome',
          editRender: {
            name: '$vxeMoney',
            defaultValue: 0,
            props: {
              min: -1111111111,
              type: 'float'
            }
          }
        }
      ],
      data: {
        actualIncome: '52000',
        age: '27',
        bonus: '10000',
        category: '前端',
        deduction: '3000',
        income: 50000,
        name: '张三'
      }
    }
  },
  methods: {
    getBsBasicInfoTableData() {
      this.$refs.BsBasicInfoTable.validateAll().then(() => {
        let data = this.$refs.BsBasicInfoTable.getTableData()
        console.log(data)
      })
    }
  },
  mounted() {},
  watch: {
  }
}
</script>

<style lang='scss'>
</style>
