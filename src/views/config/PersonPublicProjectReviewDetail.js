// 页面：项目库管理 => 项目申报管理 => 人员及公用项目查看
// 项目主视图 表头配置 2020-7-21 15:56  PersonPublicProjectReviewDetail
// 负责人：黄丹
const tableConf = {
  itemsConfig: [
    {
      title: '项目类别',
      field: 'pro_cat_name',
      width: 120
    },
    {
      title: '存续状态',
      field: 'exist_statue_code',
      width: 120,
      formatter: (value, column) => {
        if (value.cellValue === '001') {
          return '一次性项目'
        }
        if (value.cellValue === '002') {
          return '经常性项目'
        }
        if (value.cellValue === '003') {
          return '阶段性项目'
        }
      }
    },
    {
      title: '支出项目类别',
      field: 'payout_kind_name',
      width: 250
    },
    {
      title: '项目代码',
      field: 'pro_code',
      width: 200
    },
    {
      title: '项目名称',
      field: 'pro_name',
      width: 250
    },
    {
      title: '项目单位',
      field: 'use_agency_name',
      width: 200
    },
    {
      title: '主管部门',
      field: 'dept_name',
      width: 200
    },
    {
      title: '财政内部机构',
      field: 'mof_dep_name',
      width: 200
    },
    {
      title: '职能职责',
      field: 'fun_res_',
      width: 200,
      align: 'center',
      editRender: {
        name: '$treeText'
      }
    },
    {
      title: '项目起始年度',
      field: 'pro_start_year',
      width: 200
    },
    {
      title: '项目终止年度',
      field: 'end_year',
      width: 200
    },
    {
      title: '项目期限(年)',
      field: 'pro_term',
      width: 200
    },
    {
      title: '项目金额',
      field: 'pro_total_amt',
      width: 200,
      combinedType: ['average', 'total'],
      cellRender: {
        disable: true,
        name: '$moneyRender',
        props: {
          type: 'float'
        }
      }
    },
    {
      title: '申报单位联系人',
      field: 'apply_link_man',
      width: 200
    },
    {
      title: '申报联系电话',
      field: 'apply_link_tel',
      width: 200
    },
    {
      title: '设立依据',
      field: 'degisn_consideration',
      width: 200
    },
    {
      title: '项目概述',
      field: 'pro_desc',
      width: 200
    }],
  globalConfig: {
    tableName: '人员及公用项目查看'
  },
  formConfig: []
}

export default tableConf
