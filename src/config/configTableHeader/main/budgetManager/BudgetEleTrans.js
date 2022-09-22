// 指标管理--》要素转换
// 界面配置文件

export const agencyFormConfigs = [
  {
    field: 'old_dicds_',
    title: '原年度要素',
    span: 10,
    marginLeft: 100,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'olddicds',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/budgeteletrans/dicds',
        queryparams: {
          eleCode: 'olddicds'
        }
      }
    }
  },
  {
    field: 'old_ele_',
    title: '原年度要素值',
    marginLeft: 100,
    span: 10,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'oldele',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/budgeteletrans/ele',
        queryparams: {
          eleCode: 'oldele'
        }
      }
    }
  },
  {
    field: 'new_dicds_',
    title: '新年度要素',
    span: 10,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'newdicds',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'dicds'
        }
      }
    }
  },
  {
    field: 'new_ele_',
    title: '新年度要素值',
    span: 10,
    itemRender: {
      name: '$formTreeInput',
      props: {
        type: 'text',
        isleaf: true,
        isServer: true,
        elecode: 'newele',
        editConfig: {
          initLoadTree: false
        },
        serverUri: 'mp-b-budget-service/v1/common/budget/elementtree',
        queryparams: {
          eleCode: 'agency'
        }
      }
    }
  }
]

export const agencyFormData = {
  old_dicds_: '',
  old_ele_: '',
  new_dicds_: '',
  new_ele_: ''
}

export default {
  agencyFormConfigs: agencyFormConfigs,
  agencyFormData: agencyFormData
}
