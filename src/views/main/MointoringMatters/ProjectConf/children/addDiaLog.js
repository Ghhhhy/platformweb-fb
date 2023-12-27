export let proconf = {
  formItemsConfig: [
    {
      title: '三保要素',
      field: 'threeSafe',
      span: 16,
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [
          {
            id: 'e767004b5b434d3c939a8f48def6eb491',
            code: '003',
            label: '三保',
            name: '三保',
            children: [
              {
                id: 'e767004b5b434d3c939a8f41d2f6eb492',
                code: '003001',
                label: '003001-保工资',
                name: '保工资',
                parentid: 'e767004b5b434d3c939a8f48def6eb491'
              },
              {
                id: 'e767004b5b434d3c939a8f41d2f6eb493',
                code: '003002',
                label: '003002-保运转',
                name: '保运转',
                parentid: 'e767004b5b434d3c939a8f48def6eb491'
              },
              {
                id: 'e767004b5b434d3c939a8f4111f2eb494',
                code: '003003',
                label: '003003-保基本民生',
                name: '保基本民生',
                parentid: 'e767004b5b434d3c939a8f48def6eb491'
              }
            ]
          }
        ],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '三保要素',
            'multiple': false,
            'readonly': true,
            'isleaf': false
          }
        }
      }
    },
    {
      field: 'payment',
      title: '基础要素',
      span: 16,
      itemRender: {
        name: '$vxeSelect',
        props: {
          placeholder: '请选择基础要素',
          multiple: true,
          disabled: true
        },
        options: [
          {
            value: 0,
            label: '功能分类',
            urlC: 'EXPFUNC',
            name: 'exp_func'
          },
          {
            value: 1,
            label: '政府经济科目',
            urlC: 'GOVBGTECO',
            name: 'gov_bgt_eco'
          },
          {
            value: 2,
            label: '部门经济科目',
            urlC: 'DEPBGTECO',
            name: 'dep_bgt_eco'
          }
        ]
      }
    },
    {
      title: '功能分类',
      field: 'exp_func',
      span: 16,
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '请选择功能分类',
            'multiple': true,
            'readonly': true,
            'isleaf': false,
            disabled: true
          }
        }
      }
    },
    {
      title: '政府经济科目',
      field: 'gov_bgt_eco',
      span: 16,
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '请选择政府经济科目',
            'multiple': true,
            'readonly': true,
            'isleaf': false,
            disabled: true
          }
        }
      }
    },
    {
      title: '部门经济科目',
      field: 'dep_bgt_eco',
      span: 16,
      name: '$vxeTree',
      itemRender: {
        name: '$vxeTree',
        options: [],
        'props': {
          'config': {
            'treeProps': {
              'nodeKey': 'id',
              'label': 'label',
              'children': 'children'
            },
            'placeholder': '请选择部门经济科目',
            'multiple': true,
            'readonly': true,
            'isleaf': false,
            disabled: true
          }
        }
      }
    }
  ],
  formValidationConfig: {
    payment: [
      { required: true, message: '基础要素不得为空', trigger: 'change' }
    ],
    threeSafe: [
      { required: true, message: '三保要素不得为空', trigger: 'change' }
    ]
  }
}
