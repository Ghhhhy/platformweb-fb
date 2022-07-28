const treeData = [
  {
    'guid': 'A5A45F40F14211DBAB88F92B2ED866AB',
    'name': '运转类',
    'code': '2',
    'levelno': 1,
    'isleaf': '0',
    'superguid': '0',
    'label': '2-运转类',
    'icon': 'fa fa-folder',
    'state': {
      'disableCheckFunc': 'fiscalDisableCheckFunc'
    },
    'id': 'A5A45F40F14211DBAB88F92B2ED866AB',
    'children': [
      {
        'guid': 'BD830F32F14211DBAB88F92B2ED866AB',
        'name': '其他经费',
        'code': '22',
        'levelno': 2,
        'isleaf': '0',
        'superguid': 'A5A45F40F14211DBAB88F92B2ED866AB',
        'label': '22-其他经费',
        'icon': 'fa fa-folder',
        'state': {
          'disableCheckFunc': 'fiscalDisableCheckFunc'
        },
        'id': 'BD830F32F14211DBAB88F92B2ED866AB',
        'children': [
          {
            'guid': 'AE6A5031F14211DBAB88F92B2ED86003',
            'name': '大型公用设施运行维护',
            'code': '221',
            'levelno': 3,
            'isleaf': '1',
            'superguid': 'BD830F32F14211DBAB88F92B2ED866AB',
            'label': '221-大型公用设施运行维护',
            'icon': 'fa fa-file-text',
            'state': {
              'disableCheckFunc': 'fiscalDisableCheckFunc'
            },
            'id': 'AE6A5031F14211DBAB88F92B2ED86003'
          },
          {
            'guid': 'AE6A5031F14211DBAB88F92B2ED86004',
            'name': '大型专用设备运行维护',
            'code': '222',
            'levelno': 3,
            'isleaf': '1',
            'superguid': 'BD830F32F14211DBAB88F92B2ED866AB',
            'label': '222-大型专用设备运行维护',
            'icon': 'fa fa-file-text',
            'state': {
              'disableCheckFunc': 'fiscalDisableCheckFunc'
            },
            'id': 'AE6A5031F14211DBAB88F92B2ED86004'
          },
          {
            'guid': 'AE6A5031F14211DBAB88F92B2ED86005',
            'name': '专业信息系统运行维护',
            'code': '223',
            'levelno': 3,
            'isleaf': '1',
            'superguid': 'BD830F32F14211DBAB88F92B2ED866AB',
            'label': '223-专业信息系统运行维护',
            'icon': 'fa fa-file-text',
            'state': {
              'disableCheckFunc': 'fiscalDisableCheckFunc'
            },
            'id': 'AE6A5031F14211DBAB88F92B2ED86005'
          },
          {
            'guid': 'AE6A5031F14211DBAB88F92B2ED86006',
            'name': '办公场所租赁',
            'code': '224',
            'levelno': 3,
            'isleaf': '1',
            'superguid': 'BD830F32F14211DBAB88F92B2ED866AB',
            'label': '224-办公场所租赁',
            'icon': 'fa fa-file-text',
            'state': {
              'disableCheckFunc': 'fiscalDisableCheckFunc'
            },
            'id': 'AE6A5031F14211DBAB88F92B2ED86006'
          }]
      }]
  },
  {
    'guid': '9633767BE3844453BEE0A704FACCCDC9',
    'name': '特定目标类',
    'code': '3',
    'levelno': 1,
    'isleaf': '0',
    'superguid': '0',
    'label': '3-特定目标类',
    'icon': 'fa fa-folder',
    'state': {
      'disableCheckFunc': 'fiscalDisableCheckFunc'
    },
    'id': '9633767BE3844453BEE0A704FACCCDC9',
    'children': [
      {
        'guid': 'AE6A5231F14211DBAB88F92B2ED86005',
        'name': '部门预算项目',
        'code': '31',
        'levelno': 2,
        'isleaf': '1',
        'superguid': '9633767BE3844453BEE0A704FACCCDC9',
        'label': '31-部门预算项目',
        'icon': 'fa fa-file-text',
        'state': {
          'disableCheckFunc': 'fiscalDisableCheckFunc'
        },
        'id': 'AE6A5231F14211DBAB88F92B2ED86005'
      },
      {
        'guid': 'AE6A5231F14211DBAB88F92B2ED86006',
        'name': '专项资金项目',
        'code': '32',
        'levelno': 2,
        'isleaf': '1',
        'superguid': '9633767BE3844453BEE0A704FACCCDC9',
        'label': '32-专项资金项目',
        'icon': 'fa fa-file-text',
        'state': {
          'disableCheckFunc': 'fiscalDisableCheckFunc'
        },
        'id': 'AE6A5231F14211DBAB88F92B2ED86006'
      },
      {
        'guid': 'AE6A5231F14211DBAB88F92B2ED86007',
        'name': '其他特定目标类项目',
        'code': '33',
        'levelno': 2,
        'isleaf': '1',
        'superguid': '9633767BE3844453BEE0A704FACCCDC9',
        'label': '33-其他特定目标类项目',
        'icon': 'fa fa-file-text',
        'state': {
          'disableCheckFunc': 'fiscalDisableCheckFunc'
        },
        'id': 'AE6A5231F14211DBAB88F92B2ED86007'
      }]
  }]
export default treeData
