const path = require('path');

const electron = require('electron');
const isDev = require('electron-is-dev');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let loadingWindow;

const mainURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, '../build/index.html')}`;
const loadURL = isDev
  ? path.join(__dirname, 'loading.html')
  : `file://${path.join(__dirname, '../build/loading.html')}`;

function createWindow() {
  loadingWindow = new BrowserWindow({
    width: 450,
    height: 250,
    show: false,
    frame: false,
  });

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
    mainWindow = new BrowserWindow({
      show: false,
      minWidth: 400,
      minHeight: 700,
    });
    Menu.setApplicationMenu(null);
    mainWindow.webContents.once('dom-ready', () => {
      setTimeout(() => {
        mainWindow.show();
        mainWindow.maximize();
        loadingWindow.hide();
        loadingWindow.close();
      }, 300);
    });
    mainWindow.loadURL(mainURL);
  });

  loadingWindow.loadURL(loadURL);
  mainWindow?.on('closed', () => (mainWindow = null));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (loadingWindow === null && mainWindow === null) {
    createWindow();
  }
});
