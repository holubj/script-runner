const { app, ipcMain } = require('electron');
const DataStore = require('./dataStore');

const tray = require('./tray');
const clickCallback = require('./clickCallback');
const createManageWindow = require('./manageWindow');
const createModalWindow = require('./modalWindow');

const storage = new DataStore();

let manageWindow = null;
let modalWindow = null;

const main = () => {
  app.dock.hide();
  app.emit('trayCreate', clickCallback, storage.getScripts());

  ipcMain.on('modal-window', (_, id) => {
    if (!modalWindow) {
      modalWindow = createModalWindow(id ? storage.getScript(id) : null);

      modalWindow.on('closed', () => {
        modalWindow = null;
      });
    }
  });

  ipcMain.on('save-script', (_, values) => {
    if (!values.id) {
      storage.addScript(values);
    } else {
      storage.updateScript(values);
    }
  });

  ipcMain.on('reorder', (_, order) => {
    storage.reorderScripts(order);
  });

  ipcMain.on('delete-script', (_, id) => {
    storage.deleteScript(id);
  });
};

app.on('ready', main);

app.on('manageScripts', () => {
  if (!manageWindow) {
    manageWindow = createManageWindow(storage.getScripts());

    manageWindow.on('closed', () => {
      manageWindow = null;
    });
  } else {
    manageWindow.show();
  }
});

app.on('updateApp', () => {
  const scripts = storage.getScripts();

  if (manageWindow) {
    manageWindow.send('records', scripts);
  }
  app.emit('trayUpdate', scripts);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
