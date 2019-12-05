const Window = require('./components/window');
const path = require('path');

const createManageWindow = scripts => {
  manageWindow = new Window(path.join('src', 'renderer', 'manage.html'));

  manageWindow.once('ready-to-show', () => {
    manageWindow.send('records', scripts);
  });

  return manageWindow;
};

module.exports = createManageWindow;
