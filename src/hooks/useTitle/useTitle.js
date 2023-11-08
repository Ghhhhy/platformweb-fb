// 仿i18n 不同地区不同的title 目前仅field一个维度  后续继续拓展即可
import store from '@/store/index'
const languageDictionary = {
  payAcctName: {
    default: '付款人姓名',
    isFuJian: '付款人名称'
  },
  payAcctNo: {
    default: '付款编号',
    isFuJian: '付款人账号'
  },
  payAcctBankName: {
    default: '银行',
    isFuJian: '付款人开户行'
  },
  payeeAcctName: {
    default: '付款人账号',
    isFuJian: '收款人名称'
  }
}
const locationMapping = new Map([
  [true, 'default'],
  [store.getters.isFuJian, 'isFuJian']
])
export const $title = (field) => {
  if (!field) return ''
  return languageDictionary[field][locationMapping.get(true)]
}
