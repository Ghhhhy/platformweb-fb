export default {
  methods: {
    itemChange({ $form, property, itemValue, data }) {
      if (property === 'fiscalYear' && itemValue) {
        this.searchDataList.proCodes = ''
        data.proCodes = []
        this.getPro(data[property])
      }
    }
  }
}
