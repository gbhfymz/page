
const { app, BrowserWindow, screen, ipcMain } = require('electron');
//const { BrowserWindow, screen } = require('electron');

const path = require('node:path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const { workArea } = screen.getPrimaryDisplay();
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: workArea.width,
    height: workArea.height,
    x: workArea.x,
    y: workArea.y,
    autoHideMenuBar: true,
    nodeIntegration: false,
    contextIsolation: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      webviewTag: true
    },
  });

  //Поверх всех окон
  //mainWindow.setAlwaysOnTop(true, 'screen');

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Загрузка указанного URL
  //mainWindow.loadURL('https://www.duckduckgo.com');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};





// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('new-window', createWindow);


