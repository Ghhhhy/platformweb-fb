import dutyMaintain from './projectBaseInfoManage/dutyMaintain'
import projectTagMaintain from './projectBaseInfoManage/projectTagMaintain'
import projectCheckSuper from './projectDeclarationManage/ProjectCheckSuper'
import projectReserveQuery from './projectReserves/projectReserveQuery'
import specialFundsList from './projectBaseInfoManage/specialFundsList'

export default {
  ...dutyMaintain,
  ...projectTagMaintain,
  ...projectCheckSuper,
  ...projectReserveQuery,
  ...specialFundsList
}
