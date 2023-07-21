/*
 * @Description:
 * @Author: chenxuanke
 * @Date: 2023-07-19 11:35:48
 * @LastEditors: chenxuanke
 * @LastEditTime: 2023-07-21 14:16:11
 */
// 获取git 项目git 信息 Author:TItans@2396757591@qq.com
// eslint-disable-next-line camelcase
const child_process = require('child_process')
const commitHash = child_process.execSync('git show -s --format=%H').toString().trim()
const localBranchName = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const commitID = child_process.execSync('git rev-parse HEAD').toString().trim()
const branchName = child_process.execSync(`git rev-parse --abbrev-ref ${localBranchName}@{upstream}`).toString().trim()
const commitDateObj = new Date(child_process.execSync('git show -s --format=%cd').toString())
const commitDate = `${commitDateObj.getFullYear() + '-' + (commitDateObj.getMonth() + 1) + '-' + commitDateObj.getDate() + '  ' + commitDateObj.getHours() + ':' + commitDateObj.getMinutes()}`
const nowDate = new Date()
const buildDate = `${nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + '  ' + nowDate.getHours() + ':' + nowDate.getMinutes()}`
module.exports = {
  VUE_APP_COMMITHASH: commitHash,
  VUE_APP_BRANCHNAME: branchName,
  VUE_APP_COMMITDATE: commitDate,
  VUE_APP_BUILDDATE: buildDate,
  VUE_APP_COMMITID: commitID
}
// config.plugin('define').tap(args => {
//   args[0].ProjectVersion = JSON.stringify(ProjectVersion)
//   return args
// })
