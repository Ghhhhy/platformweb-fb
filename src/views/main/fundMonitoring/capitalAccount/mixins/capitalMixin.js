export default {
  methods: {
    itemChange({ $form, property, itemValue, data }) {
      if (property === 'fiscalYear' && itemValue) {
        this.searchDataList.mofDivCodes = ''
        data.mofDivCodes = []
        this.getMofDiv(data[property])
      }
    }
  }
}
