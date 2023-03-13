// import store from '@/store/index'
const proconf = {
  getmisuseSubjectDetail: [
    {
      title: '地区名称',
      field: 'mofDivName',
      width: 140,
      filters: false,
      align: 'center'
    },
    {
      title: '处室名称',
      field: 'bgtMofDepName',
      align: 'center',
      width: 140,
      filters: false
    },
    {
      title: '指标文号',
      field: 'corBgtDocNoName',
      width: 240,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '科目',
      field: 'expFunc',
      width: 260,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '项目',
      field: 'trackProName',
      width: 240,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '单位',
      field: 'agencyName',
      width: 240,
      filters: false,
      sortable: false,
      align: 'center'
    },
    {
      title: '金额',
      width: 100,
      filters: false,
      field: 'amount',
      sortable: false,
      align: 'right',
      cellRender: { name: '$vxeMoney' }
    }
  ]
}
export default proconf
