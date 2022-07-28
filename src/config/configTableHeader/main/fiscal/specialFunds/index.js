import bringInDeptBudget from './budgetEditManage/bringInDeptBudget'
import allSpecFund from './budgetControlNumsManage/allSpecFund'
import chooseProject from './budgetControlNumsManage/chooseProject'
import cityLevelDecp from './budgetControlNumsManage/cityLevelDecp'
import provienceLevelDecp from './budgetControlNumsManage/provienceLevelDecp'
import specFundDecpStat from './budgetControlNumsManage/specFundDecpStat'
import specFundFinishDecp from './budgetControlNumsManage/specFundFinishDecp'
import specFundReleased from './budgetControlNumsManage/specFundReleased'
import specFundToBeDecp from './budgetControlNumsManage/specFundToBeDecp'

export default {
  ...bringInDeptBudget,
  ...allSpecFund,
  ...cityLevelDecp,
  ...provienceLevelDecp,
  ...specFundDecpStat,
  ...specFundFinishDecp,
  ...specFundReleased,
  ...specFundToBeDecp,
  ...chooseProject
}
