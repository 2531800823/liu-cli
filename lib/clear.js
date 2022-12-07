const path = require('path');
const rimraf = require('rimraf');
const pkgDir = require('pkg-dir');
const chalk = require('chalk');
const { promisify } = require('util');
const { loading } = require('./utils');
const inquirer = require('inquirer');


module.exports = async function (projectName, cmd) {
  let pathName = process.env.PWD;
  // 判断是否是指定目录
  if (projectName?.dir) {
    pathName = path.resolve(pathName, projectName?.dir);
  }
  try {
    // 查找项目的 pachage.json 文件路径， 方便后面拼接 node_modules
     await pkgDir(pathName);
  } catch (error) {
    console.log(chalk.green(`该目录下没有 node_modules!`));
  }

  // 使用内置库，生成 async await 形式
  const rimrafSync = promisify(rimraf);

  pathName = path.resolve(pathName, 'node_modules');

  if (!projectName.force) {
    const confirm =  await inquirer.prompt([
      {
        type: 'confirm',
        name: 'build',
        message: `确定要删除: ${pathName} ?`,
        default: 'y',
      },
    ]);
    if (!confirm?.build) {
     return;
    }
  }

  console.log();
  console.log('删除的文件夹：', pathName);
  try {
    await loading('正在删除中...', rimrafSync, pathName, {
      disableGlob: false,
    });

    console.log();
    console.log(chalk.bgGreen('删除成功！！！'));
  } catch (error) {
    console.log(chalk.bgRed(`删除失败: ${error.message}！！！`));
  }
};
