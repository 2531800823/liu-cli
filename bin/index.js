#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const pkg = require('../package.json');

const { clear,create } = require('../lib');

program.on('--help', function () {
  console.log(
    '\r\n' +
      figlet.textSync('liu-cli', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      }),
  );
  // 前后两个空行调整格式，更舒适
  console.log(`version: ${chalk.cyan(pkg.version)}`);
  console.log();
  console.log(`Run ${chalk.cyan('liu-cli <command> --help')} for detailed usage of given command.`);
  console.log();
  console.log(`github: ${chalk.cyan('https://github.com/2531800823')}`);
});

program
  .command('create <project-name>') // 增加创建指令
  .description('创建项目') // 添加描述信息
  .option('-f, --force', 'overwrite target directory if it exists') // 强制覆盖
  .action(create);

program
  .command('clear') // 增加创建指令
  .description('删除 node_modules ') // 添加描述信息
  .option('-d, --dir <dir_name>', '删除指定目录下的') // 强制覆盖
  .action(clear);

program
  .name('liu-cli')
  .usage(`<command> [option]`)
  .version(`version: ${chalk.cyan(pkg.version)}`);

program.parse(process.argv);
