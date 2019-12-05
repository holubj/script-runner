const { app, Tray, Menu, nativeTheme } = require('electron');
const path = require('path');

let tray;
let clickCallback = () => {};
const basePath = path.join(path.dirname(__dirname), 'assets', 'icons');

const defaultContextMenu = [
  { type: 'separator' },
  {
    label: 'Manage Scripts...',
    type: 'normal',
    click: () => {
      app.emit('manageScripts');
    },
    accelerator: 'Command+,'
  },
  { label: 'Quit', type: 'normal', role: 'quit', accelerator: 'Command+Q' }
];

app.on('trayCreate', (callback, items) => {
  tray = new Tray(path.join(basePath, 'tray.png'));

  clickCallback = callback;
  app.emit('trayUpdate', items);

  nativeTheme.on('updated', setThemeIcon);
  setThemeIcon();
});

app.on('trayUpdate', items => {
  const contextMenu = Menu.buildFromTemplate([
    ...items.map(record => {
      return {
        label: record.title,
        type: 'normal',
        click: () => {
          clickCallback(record.script);
        }
      };
    }),
    ...defaultContextMenu
  ]);
  tray.setContextMenu(contextMenu);
});

const setThemeIcon = () => {
  if (nativeTheme.shouldUseDarkColors) {
    tray.setImage(path.join(basePath, 'trayLight.png'));
  } else {
    tray.setImage(path.join(basePath, 'tray.png'));
  }
};

module.exports = tray;
