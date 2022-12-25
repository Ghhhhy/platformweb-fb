import { ref } from '@vue/composition-api'

export const useFooter = () => {
  const footerConfig = ref({
    totalObj: {
      warnTotal: 0,
      onWay: 0,
      release: 0,
      prohibit: 0
    },
    combinedType: ['totalAll'],
    showFooter: true
  })

  return {
    footerConfig
  }
}
