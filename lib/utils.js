const { exec } = require('child_process');
const ora = require('ora');

function runCommand (...rest) {
  return new Promise((reslove, reject) => {
    //  参数透传，
    const chidlProcess = exec(...rest);

    // 把子进程的输出流 传入到 父进程的输入流 还有错误
    chidlProcess.stdout.pipe(process.stdout);
    chidlProcess.stderr.pipe(process.stderr);

    // 监听 关闭事件
    chidlProcess.on('close', () => {
      reslove();
    });
  });
}

//  loading 加载
async function loading (message, fn, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  let executeRes;
  try {
    executeRes = await fn(...args);
    spinner.succeed();
  } catch (error) {
    throw new Error(error);
  } finally {
    spinner.succeed();
  }
  return executeRes;
}

module.exports = {
  runCommand,
  loading,
};
