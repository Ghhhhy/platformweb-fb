import budgetInit from './budgetInit'
import budgetTransRuleInput from './budgetTransRuleInput'
import budgetConfirm from './budgetConfirm'
import budgetTodoDistribute from './budgetTodoDistribute'
import budgetExecute from './budgetExecute'
import budgetExecuteAudit from './budgetExecuteAudit'
import budgetDocnoConfig from './budgetDocnoConfig'

export default {
  ...budgetInit,
  ...budgetTransRuleInput,
  ...budgetConfirm,
  ...budgetTodoDistribute,
  ...budgetExecute,
  ...budgetExecuteAudit,
  ...budgetDocnoConfig
}
