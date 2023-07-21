// const childProcess = require('child_process')

// // git 最后一次提交的 Head
// const buildUserMail = childProcess
//   .execSync('git config user.email')
//   .toString()
//   .trim()
// const nowDate = new Date()
// const buildDate = `${nowDate.getFullYear() +
//   '-' +
//   (nowDate.getMonth() + 1) +
//   '-' +
//   nowDate.getDate() +
//   ' ' +
//   nowDate.getHours() +
//   ':' +
//   nowDate.getMinutes()}`
// module.exports = { commit, commitUserName, commitUserMail, commitDate, buildUserName, buildUserMail, buildDate }
const childProcess = require('child_process')
const commitHash = childProcess.execSync('git show -s --format=%H').toString().trim()
const commitUserName = childProcess
  .execSync('git show -s --format=%cn')
  .toString()
  .trim()
// const localBranchName = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const commitID = childProcess.execSync('git rev-parse HEAD').toString().trim()
const branchName = childProcess.execSync('git log -n 1 --pretty=%d HEAD').toString().trim()
const commitDateObj = new Date(childProcess.execSync('git show -s --format=%cd').toString())
const commitDate = `${commitDateObj.getFullYear() + '-' + (commitDateObj.getMonth() + 1) + '-' + commitDateObj.getDate() + '  ' + commitDateObj.getHours() + ':' + commitDateObj.getMinutes()}`
const nowDate = new Date()
const buildDate = `${nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + '  ' + nowDate.getHours() + ':' + nowDate.getMinutes()}`
module.exports = {
  VUE_APP_BRANCHNAME: branchName,
  VUE_APP_COMMITHASH: commitHash,
  VUE_APP_COMMITUSERNAME: commitUserName,
  VUE_APP_COMMITDATE: commitDate,
  VUE_APP_BUILDDATE: buildDate,
  VUE_APP_COMMITID: commitID
}
// config.plugin('define').tap(args => {
//   args[0].ProjectVersion = JSON.stringify(ProjectVersion)
//   return args
// })
