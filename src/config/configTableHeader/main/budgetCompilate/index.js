import budgetApproval from './budgetRelease/budgetApproval'
import transferPaymentBudgetRelease from './budgetRelease/transferPaymentBudgetRelease'
import assetPurchasePlanSummary from './budgetManage/assetPurchasePlanSummary'
import attachment from './budgetManage/attachment'
import auditSupervisor from './budgetManage/auditSupervisor'
import conferenceFee from './budgetManage/conferenceFee'
import governmentProcurementBudgetSummary from './budgetManage/governmentProcurementBudgetSummary'
import governmentPurchaseServiceSummary from './budgetManage/governmentPurchaseServiceSummary'
import incomeBudget from './budgetManage/incomeBudget'
import incomeStatement from './budgetManage/incomeStatement'
import nonTaxCollectionPlan from './budgetManage/nonTaxCollectionPlan'
import personInfo from './budgetManage/personInfo'
import personInfoExtend from './budgetManage/personInfoExtend'
import projectExpenditureBudget from './budgetManage/projectExpenditureBudget'
import specificFundProjectBudget from './budgetManage/specificFundProjectBudget'
import trainingFee from './budgetManage/trainingFee'
import unitBaseInfoBudget from './budgetManage/unitBaseInfoBudget'
import unitExpandInfoBudget from './budgetManage/unitExpandInfoBudget'

import transferPaymentAccept from './acceptBudget/transferPaymentAccept'
import systemStateTransition from './budgetConfirmation/systemStateTransition'
import deptPerformStat from './budgetMakePublic/deptPerformStat'

export default {
  ...budgetApproval,
  ...transferPaymentBudgetRelease,
  ...assetPurchasePlanSummary,
  ...attachment,
  ...auditSupervisor,
  ...conferenceFee,
  ...governmentProcurementBudgetSummary,
  ...governmentPurchaseServiceSummary,
  ...incomeBudget,
  ...incomeStatement,
  ...nonTaxCollectionPlan,
  ...personInfo,
  ...personInfoExtend,
  ...projectExpenditureBudget,
  ...specificFundProjectBudget,
  ...trainingFee,
  ...unitBaseInfoBudget,
  ...unitExpandInfoBudget,
  ...transferPaymentAccept,
  ...systemStateTransition,
  ...deptPerformStat

}
