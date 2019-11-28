import {
  app, BrowserWindow, screen, globalShortcut,
} from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';
import { bot } from './utils/botApi';
import { clipPositionAndColor } from './utils/helpers';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({strategy: 'react-hmr'});
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 200,
    height: 30,
    x: 600,
    y: 20,
    alwaysOnTop: true,
    frame: false,
    // transparent: true,
  });

  // and load the index.html of the app.
  mainWindow.loadFile('./src/index.html');

  // ipcMain.on('variable-request', (event, args) => {
  //   event.sender.send()
  // });

  // Open the DevTools.
  // if (isDevMode) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  //   mainWindow.webContents.openDevTools();
  // }

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  setInterval(() => {
    if (!mainWindow) return;
    const mouseCoordinates = screen.getCursorScreenPoint();
    const color = bot.pxl();
    

    mainWindow.webContents.send('data', {
      ...mouseCoordinates,
      color,
    })
  },333);

  globalShortcut.register('Ctrl+Shift+L', () => {
    const mouseCoordinates = screen.getCursorScreenPoint();
    clipPositionAndColor(
      `bot.click(${mouseCoordinates.x}, ${mouseCoordinates.y}); //${bot.pxl()}`
    );
  });
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
