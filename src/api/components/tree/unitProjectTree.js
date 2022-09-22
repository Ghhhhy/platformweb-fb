// import {
//   post
// } from '../http'
export default {
  getTreeData(data) {
    return new Promise(
      resolve => {
        resolve({
          rscode: 10000,
          result: '查询成功',
          data: [
            {
              guid: '97AE9C6FF14211DBAB88F92B2ED866AB',
              code: '1',
              name: '人员类',
              dicdsguid: '10818',
              province: '610000000',
              superguid: '0',
              levelno: 1,
              isleaf: '1',
              starttime: '20200101',
              endtime: '99981231',
              status: '1',
              updatetime: '20200220120000',
              isdeleted: 0,
              bizkey: '97AE9C6FF14211DBAB88F92B2ED866AB',
              isstandard: 0,
              remark:
                '部门和单位有关人员的工资福利支出、对个人和家庭的补助支出项目',
              createtime: '20070423103025',
              pinyin: 'py',
              version: 1,
              year: 2021,
              admdiv: '46381E112669427E819CD04D835D015B',
              id: '97AE9C6FF14211DBAB88F92B2ED866AB',
              label: '1-人员类',
              icon: 'fa fa-file-text',
              state: {
                disableCheckFunc: 'fiscalDisableCheckFunc'
              }
            },
            {
              guid: 'A5A45F40F14211DBAB88F92B2ED866AB',
              code: '2',
              name: '运转类',
              dicdsguid: '10818',
              province: '610000000',
              superguid: '0',
              levelno: 1,
              isleaf: '0',
              starttime: '20200101',
              endtime: '99981231',
              status: '1',
              updatetime: '20200220120000',
              isdeleted: 0,
              bizkey: 'A5A45F40F14211DBAB88F92B2ED866AB',
              isstandard: 0,
              remark:
                '包括部门、单位为保障其机构自身正常运转、完成日常工作任务所发生的公用经费项目和专项用于大型公用设施、大型专用设备、专业信息系统等运行维护的其他经费项目。',
              createtime: '20070423103048',
              pinyin: 'py',
              version: 2,
              year: 2021,
              admdiv: '46381E112669427E819CD04D835D015B',
              id: 'A5A45F40F14211DBAB88F92B2ED866AB',
              label: '2-运转类',
              icon: 'fa fa-folder',
              state: {
                disableCheckFunc: 'fiscalDisableCheckFunc'
              },
              children: [
                {
                  guid: 'AE6A5031F14211DBAB88F92B2ED866AB',
                  code: '21',
                  name: '公用经费',
                  dicdsguid: '10818',
                  province: '610000000',
                  superguid: 'A5A45F40F14211DBAB88F92B2ED866AB',
                  levelno: 2,
                  isleaf: '1',
                  starttime: '20200101',
                  endtime: '99981231',
                  status: '1',
                  updatetime: '20200220120000',
                  isdeleted: 0,
                  bizkey: 'AE6A5031F14211DBAB88F92B2ED866AB',
                  isstandard: 0,
                  remark:
                    '部门、单位为保障其机构自身正常运转、完成日常工作任务所发生的支出。',
                  createtime: '20070423103103',
                  pinyin: 'py',
                  version: 3,
                  year: 2021,
                  admdiv: '46381E112669427E819CD04D835D015B',
                  id: 'AE6A5031F14211DBAB88F92B2ED866AB',
                  label: '21-公用经费',
                  icon: 'fa fa-file-text',
                  state: {
                    disableCheckFunc: 'fiscalDisableCheckFunc'
                  }
                },
                {
                  guid: 'BD830F32F14211DBAB88F92B2ED866AB',
                  code: '22',
                  name: '其他运转类',
                  dicdsguid: '10818',
                  province: '610000000',
                  superguid: 'A5A45F40F14211DBAB88F92B2ED866AB',
                  levelno: 2,
                  isleaf: '1',
                  starttime: '20200101',
                  endtime: '99981231',
                  status: '1',
                  updatetime: '20200220120000',
                  isdeleted: 0,
                  bizkey: 'BD830F32F14211DBAB88F92B2ED866AB',
                  isstandard: 0,
                  remark: '运转类经费中除公用经费外的其他经费。',
                  createtime: '20070423103128',
                  pinyin: 'py',
                  version: 4,
                  year: 2021,
                  admdiv: '46381E112669427E819CD04D835D015B',
                  id: 'BD830F32F14211DBAB88F92B2ED866AB',
                  label: '22-其他运转类',
                  icon: 'fa fa-file-text',
                  state: {
                    disableCheckFunc: 'fiscalDisableCheckFunc'
                  }
                }
              ]
            },
            {
              guid: '9633767BE3844453BEE0A704FACCCDC9',
              code: '3',
              name: '特定目标类',
              dicdsguid: '10818',
              province: '610000000',
              superguid: '0',
              levelno: 1,
              isleaf: '1',
              starttime: '20200101',
              endtime: '99981231',
              status: '1',
              updatetime: '20200220120000',
              isdeleted: 0,
              bizkey: '9633767BE3844453BEE0A704FACCCDC9',
              isstandard: 0,
              remark:
                '部门和单位为完成其特定的工作任务和事业发展目标所发生的支出项目。除人员类项目和运转类项目外，其他预算项目作为特定目标类项目管理。',
              year: 2021,
              id: '9633767BE3844453BEE0A704FACCCDC9',
              label: '3-特定目标类',
              icon: 'fa fa-file-text',
              state: {
                disableCheckFunc: 'fiscalDisableCheckFunc'
              }
            }
          ]
        })
      },
      error => {
        console.log(error)
      }
    )
  }
}
