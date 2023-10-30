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
      <template v-slot:mainForm>
        <BsTable
          ref="bsTableRef"
          row-id="id"
          :table-config="tableConfig"
          :table-global-config="tableGlobalConfig"
          :toolbar-config="toolbarConfig"
          :height="420"
          :pager-config="false"
          :edit-config="{ enabled: false }"
          :tree-config="treeConfig"
          :show-zero="false"
          :table-columns-config="tableColumnsConfig"
          :table-data="tableData"
          @cellClick="cellClick"
        >
          <template v-slot:toolbarSlots>
            <div class="table-toolbar-left">
              <div class="table-toolbar-left-title">
                <span class="fn-inline">{{ menuName }}</span>
                <i class="fn-inline"></i>
              </div>
            </div>
          </template>
        </BsTable>
      </template>
    </BsMainFormListLayout>
    <detailDialog v-if="dialogVisible" @close="close" />
  </div>
</template>

<script>
import detailDialog from './children/detailDialog.vue'
// import { getTreeData } from '@/api/frame/main/common'
import httpModule from '@/api/frame/main/fundMonitoring/benefitDistributionCapital.js'
import { proconf } from './benefitDistributionCapital'
export default {
  components: {
    detailDialog
  },
  data() {
    return {
      // 弹框
      dialogVisible: false,

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
          title: '资金名称',
          field: 'cenTraProName',
          width: '8',
          align: 'left',
          name: '$vxeTree',
          itemRender: {
            name: '$vxeTree',
            options: [],
            props: {
              queryparams: {
                elementCode: 'cenTraProName'
              },
              config: {
                placeholder: '资金名称',
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
        cenTraProName: ''
      },
      // table
      menuName: '惠企利民发放情况统计（按资金）',
      tableConfig: {
        globalConfig: {
          // 全局默认渲染列配置
          // 全局配置
          checkType: false,
          seq: true
          // useMoneyFilter: true
        }
      },
      tableGlobalConfig: {
        showOverflow: false
      },
      toolbarConfig: {
        disabledMoneyConversion: false,
        moneyConversion: false, // 是否有金额转换
        search: false, // 是否有search
        import: false, // 导入
        export: true, // 导出
        print: false, // 打印
        refresh: true, // 刷新
        zoom: true, // 缩放
        custom: true, // 选配展示列
        expandAll: true,
        slots: {
          tools: 'toolbarTools',
          buttons: 'toolbarSlots'
        }
      },
      treeConfig: {
        dblExpandAll: true,
        dblExpand: true,
        accordion: false,
        iconClose: 'el-icon-circle-plus',
        iconOpen: 'el-icon-remove'
      },
      tableColumnsConfig: proconf.tableColumnsConfig,
      tableData: [
        {
          children: [
            {
              cenTraProName: '福州市',
              id: '09',
              children: [
                {
                  mofDivName: '惠企利民',
                  cenTraProName: '鼓楼区',
                  id: '2',
                  count: '123'
                }
              ]
            }
          ],
          mofDivName: '监控监控监控监控监控监控监控监控监控监控',
          cenTraProName: '福建省',
          id: '#',
          count: '123123123123',
          money: '456',
          privateEnterpriseCount: '123',
          privateEnterpriseMoney: '456',
          countryEnterpriseCount: '123',
          countryEnterpriseMoney: '456',
          importantEnterpriseCount: '123',
          importantEnterpriseMoney: '456'
        }
      ]
    }
  },
  created() {
    this.getcenTraProTreeData()
  },
  methods: {
    getcenTraProTreeData() {
      const { year } = this.$store.state.userInfo
      httpModule.getProTreeData({ fiscalYear: year }).then(res => {
        this.queryConfig[1].itemRender.options = res?.data || []
      })
    },
    search(val, multipleValue) {
      console.log(val, multipleValue)
    },
    cellClick(obj, context, e) {
      console.log(obj.column.property)
      console.log(obj.row)
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
::v-deep .vxe-table--body-wrapper {
  height: 290px !important;
}
::v-deep .vxe-table--fixed-left-wrapper {
  height: 400px !important;
}
::v-deep .vxe-cell a {
  color: #1890ff;
  text-decoration: underline;
}
::v-deep .el-icon-folder-opened {
  line-height: 20px !important;
}
::v-deep .el-icon-folder {
  line-height: 20px !important;
}
::v-deep .el-icon-document {
  line-height: 20px !important;
}
::v-deep .vxe-cell span:nth-child(1) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
