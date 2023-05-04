import store from '@/store'
export const getSearchFormSchemas = () => {
  return [
    {
      field: 'fiscalYear',
      span: 4,
      title: '业务年度',
      align: 'right',
      itemRender: {
        name: '$input',
        defaultValue: store.state.userInfo.year,
        props: {
          type: 'year',
          placeholder: '请选择业务年度',
          clearable: true
        }
      }
    }
  ]
}
