const Window = require('./components/window');
const path = require('path');

const createModalWindow = record => {
  modalWindow = new Window(path.join('src', 'renderer', 'modal.html'), {
    modal: true,
    parent: manageWindow,
    width: 400,
    height: 350,
    transparent: true,
    backgroundColor: '#555555',
    vibrancy: 'medium'
  });

  modalWindow.once('ready-to-show', () => {
    if (record) {
      modalWindow.send('record-data', record);
    }
  });

  return modalWindow;
};

module.exports = createModalWindow;
