const path = require('path');

const { app, BrowserWindow, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const getPort = require('get-port');

let port;
let mainWindow;
let loadingWindow;

const mainURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, 'build/index.html')}`;
const loadURL = isDev
  ? path.join(__dirname, 'public/loading.html')
  : `file://${path.join(__dirname, 'build/loading.html')}`;
const serverURL = isDev
  ? path.join(__dirname, 'server/app.js')
  : path.join(__dirname, 'build-server/app.js');

// request for available port
getAvailablePort();
async function getAvailablePort() {
  const availablePort = await getPort();
  port = availablePort;
}

function createWindow() {
  loadingWindow = new BrowserWindow({
    width: 450,
    height: 250,
    show: false,
    frame: false,
  });
  loadingWindow.loadURL(loadURL);

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
    mainWindow = new BrowserWindow({
      show: false,
      autoHideMenuBar: true,
      webPreferences: {
        preload: serverURL,
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    mainWindow.loadURL(mainURL);

    mainWindow.webContents.once('dom-ready', () => {
      setTimeout(() => {
        mainWindow.maximize();
        loadingWindow.hide();
        loadingWindow.close();
        mainWindow.show();
      }, 500);
      mainWindow.on('closed', () => (mainWindow = null));
    });
  });
}

ipcMain.on('request-port', (event) => {
  event.returnValue = port;
});

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
