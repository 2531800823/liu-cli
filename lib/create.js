const { rmdirSync, existsSync, constants } = require('fs');
const { resolve } = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { StaticGitHubTemplateUrl } = require('./const');
const { promisify } = require('util');
const { loading, runCommand } = require('./utils');
const open = require('open');

const downloadGitRepo = promisify(require('download-git-repo'));

module.exports = async function (projectName, cmd) {
  console.log(chalk.blue('开始创建...'));
  console.log();

  // 开启交互
  let frameworkAll = {},
    framework;

  framework = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: '请选择创建的框架-版本',
      default: 'react-18',
      choices: [
        { name: 'react-17', value: 'react-17' },
        { name: 'react-18', value: 'react-18' },
        { name: 'vue-2', value: 'vue-2' },
        { name: 'vue-3', value: 'vue-3' },
      ],
    },
  ]);
  Object.assign(frameworkAll, framework);

  framework = await inquirer.prompt([
    {
      type: 'list',
      name: 'build',
      message: '请选择构建工具',
      default: 'vite',
      choices: [
        { name: 'vite', value: 'vite' },
        { name: 'webpack', value: 'webpack' },
        { name: 'rollup', value: 'rollup' },
      ],
    },
  ]);
  Object.assign(frameworkAll, framework);

  // 查看文件名是否存在
  const pathName = resolve(process.env.PWD, projectName);

  const isHave = existsSync(pathName, constants.F_OK);

  if (isHave) {
    if (!cmd?.force) {
      console.log(
        chalk.red(`文件夹已经存在! 如果想删除直接创建请使用：`),
        chalk.green('liu-cli create <project-name> -f  '),
      );
      return;
    }
    console.log(chalk.red(`文件夹已经存在!`));
    // 确认下载
    try {
      await loading(`正在删除 ${chalk.magenta(pathName)} 中...`, rmdirSync, pathName, {
        recursive: true,
      });
      console.log(chalk.green('文件已删除!!!'));
    } catch (error) {
      console.log(chalk.bgRed(`文件删除失败: ${error.message}！！！`));
      return;
    }
  }
  console.log();

  const githubUrl =
    StaticGitHubTemplateUrl + frameworkAll.framework + '-' + frameworkAll.build + '.git#main';

  console.log();

  // 确认下载
  try {
    await loading('正在下载中...', downloadGitRepo, githubUrl, projectName, { clone: true });
    console.log(chalk.bgGreen('下载成功！！！'));
  } catch (error) {
    console.log(chalk.bgRed(`下载失败: ${error.message}！！！`));
    return;
  }
  // 进入文件夹 初始化仓库 pnpm i 安装
  await runCommand(`cd ${projectName} && git init  &&  pnpm i`);

  console.log(chalk.blue(`安装完成! `));

  // 启动命令 要一直开着，后面就一直在终端了， 不能 await 等他了
  runCommand(`cd ${projectName} && pnpm dev `);

  // 打开浏览器
  await open('http://localhost:5173/');
};
