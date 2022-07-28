// import configColumns from '@/views/config/PersonPublicProjectReviewDetail.js'
import configColumns from '@/views/config/PersonPublicProjectDeclare.js'
// import configColumns from '@/views/config/UnitInfoCheckSuper.js'
import configModule from '@/api/frame/common/tableconfig.js'
export default {
  data() {
    return {

    }
  },
  methods: {
    // 插入配置数据
    insertConfigData() {
      const params = {
        id: '6D1953FB7C7A412F9B4A2876E70D2779',
        menuguid: 'FB1544389D864769830DFF1061yyj001',
        type: 'table',
        tablename: '人员及公用经费项目申报(表格)',
        menuname: '人员及公用经费项目申报',
        configure: this.$ToolFn.utilFn.jsonToStr(configColumns)
      }
      configModule.inseartConfig(params).then(res => {
        if (res && res.rscode === '100000') {
          this.$message.success('新增成功')
        } else {
          this.$message.error('新增失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除配置数据
    deleteConfigData() {
      const params = {
        id: '3242099EC43C4D6BB0BAE572E8B51756'
      }
      configModule.deleteConfig(params).then(res => {
        if (res && res.rscode === '100000') {
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 更新配置数据
    updateConfigData() {
      const params = {
        id: '3242099EC43C4D6BB0BAE572E8B51756',
        menuguid: 'FB1544389D864769830DFF1061CZ1002',
        type: 'table',
        tablename: '单位信息审核主管部门(表格)',
        menuname: '单位信息审核主管部门',
        configure: this.$ToolFn.utilFn.jsonToStr(configColumns)
      }
      configModule.updateConfig(params).then(res => {
        if (res && res.rscode === '100000') {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 查询表配置数据
    getConfigData() {
      const params = {
        id: '6D1953FB7C7A412F9B4A2876E70D2779'
      }
      configModule.getConfig(params).then(res => {
        if (res && res.rscode === '100000') {
          console.log(1, res, this.$ToolFn.utilFn.strToJson((res.data && res.data.configure) || '{}'))
        } else {
          this.$message.error('查询失败')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    // this.insertConfigData()
    // this.deleteConfigData()
    // this.updateConfigData()
    // this.getConfigData()
  }
}
