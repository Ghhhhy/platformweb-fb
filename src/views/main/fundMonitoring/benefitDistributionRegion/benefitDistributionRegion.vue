<template>
  <div v-loading="tableLoading" style="height: 100%">
    <BsMainFormListLayout :left-visible.sync="leftTreeVisible">
      <template v-slot:query>
        <div v-show="isShowQueryConditions" class="main-query">
          <BsQuery
            ref="queryFrom"
            :query-form-item-config="queryConfig"
            :query-form-data="searchDataList"
            @onSearchClick="
              (e1, e2) => {
                search(e1, e2, false)
              }
            "
          />
        </div>
      </template>
    </BsMainFormListLayout>
  </div>
</template>

<script>
import { getTreeData } from '@/api/frame/main/common'
export default {
  data() {
    return {
      tableLoading: false,
      leftTreeVisible: false,
      isShowQueryConditions: true,
      queryConfig: [
        {
          title: '业务年度',
          field: 'fiscalYear',
          width: '8',
          align: 'left',
          formula: '',
          // visible: !this.$store.getters.isFuJian,
          itemRender: {
            name: '$input',
            props: {
              type: 'year',
              valueFormat: 'yyyy',
              placeholder: '业务年度'
            }
            // events: {
            //   change: (value, $event) => {
            //     this.searchDataList.fiscalYear = $event.value
            //     this.searchDataListOld = Object.assign({}, this.searchDataList) // 因为业务年度需要和资金名称联动 需要保存一个旧址 BsQuery深度监听了queryConfig，当queryConfig变化的时候，会重置searchDataList
            //     this.$refs.queryFrom.reset()
            //     this.getPro($event.value)
            //   }
            // }
          }
        },
        {
          title: '区划名称',
          field: 'mofDivCodes',
          width: '8',
          align: 'left',
          name: '$vxeTree',
          itemRender: {
            name: '$vxeTree',
            options: [],
            props: {
              queryparams: {
                elementCode: 'mofDivCodes'
              },
              config: {
                placeholder: '区划名称',
                disabled: false,
                multiple: false,
                treeProps: {
                  labelFormat: '{code}-{name}',
                  nodeKey: 'id',
                  label: 'name',
                  children: 'children'
                },
                axiosConfig: {
                  successCode: '200',
                  statusField: 'rscode',
                  method: 'post',
                  url: ''
                }
              }
            }
          }
        }
      ],
      searchDataList: {
        fiscalYear: this.$store.state.userInfo.year,
        mofDivCodes: ''
      }
    }
  },
  created() {
    this.getMofDivTreeData()
  },
  methods: {
    async getMofDivTreeData() {
      const { year, province } = this.$store.state.userInfo
      const res = await getTreeData({ year: year, province: province })
      this.queryConfig[1].itemRender.options = res?.data || []
    }
  }
}
</script>

<style scoped>
</style>
