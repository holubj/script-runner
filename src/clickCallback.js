const { dialog } = require('electron');
const exec = require('child_process').exec;

const clickCallback = command => {
  return exec(command, (error, stdout, stderr) => {
    if (stdout.length) {
      dialog.showMessageBox({ type: 'info', title: 'Result', message: stdout });
    }
  });
};

module.exports = clickCallback;
