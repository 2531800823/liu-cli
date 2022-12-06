const path = require('path');
const rimraf = require('rimraf');
const pkgDir = require('pkg-dir');
const chalk = require('chalk');
const { promisify } = require('util');
const { loading } = require('./utils');


module.exports = async function(projectName, cmd) {
  let pathName = process.env.PWD;
  // 判断是否是指定目录
  if (projectName?.dir) {
    pathName = path.resolve(pathName, projectName?.dir);
  }

  // 查找项目的 pachage.json 文件路径， 方便后面拼接 node_modules
  pathName = await pkgDir(pathName);

  // 使用内置库，生成 async await 形式
  const rimrafSync = promisify(rimraf);


  try {
  await loading('正在删除中...',rimrafSync,path.resolve(pathName,'node_modules'),{ disableGlob: false});
  console.log(chalk.bgGreen('删除成功！！！'));
  } catch (error) {
    console.log(chalk.bgRed(`删除失败: ${error.message}！！！`));
  }

};
