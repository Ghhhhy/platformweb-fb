import { ref, onMounted } from '@vue/composition-api'
import { periodXAxis } from '../model/data'

export const useSocialSecurityTable = () => {
  const cityEndowmentInsuranceData = ref([])
  const cityMedicalInsuranceData = ref([])
  const staffEndowmentInsuranceData = ref([])
  const publicInstitutionEndowmentInsuranceData = ref([])
  const endowmentInsuranceBudgetData = ref([])
  onMounted(() => {
    const dataOrigin = periodXAxis().map(item => {
      return {
        period: item,
        fundIncome: 31423431.23,
        fundExpend: 31423431.23,
        fundTotal: 31423431.23,
        payPeople: 31423431.23,
        enjoyPeople: 31423431.23,
        ratio: 10
      }
    })
    cityEndowmentInsuranceData.value = dataOrigin
    cityMedicalInsuranceData.value = dataOrigin
    staffEndowmentInsuranceData.value = dataOrigin
    publicInstitutionEndowmentInsuranceData.value = dataOrigin
    endowmentInsuranceBudgetData.value = periodXAxis().map(item => {
      return {
        period: item,
        budgetIncome: 31423431.23,
        budgetExpend: 31423431.23
      }
    })
  })
  return {
    cityEndowmentInsuranceData,
    cityMedicalInsuranceData,
    staffEndowmentInsuranceData,
    publicInstitutionEndowmentInsuranceData,
    endowmentInsuranceBudgetData
  }
}
