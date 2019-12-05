const { BrowserWindow } = require('electron');

const defaultProps = {
  width: 500,
  height: 400,
  resizable: false,
  minimizable: false,
  maximizable: false,
  show: false,
  webPreferences: {
    nodeIntegration: true
  }
};

class Window extends BrowserWindow {
  constructor(file, windowSettings) {
    super({ ...defaultProps, ...windowSettings });

    this.loadFile(file);

    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

module.exports = Window;
