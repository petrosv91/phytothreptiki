const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;
let loadingWindow;

const mainURL = isDev
  ? 'http://localhost:3000'
  : `file://${path.join(__dirname, 'build/index.html')}`;
const loadURL = isDev
  ? path.join(__dirname, 'public/loading.html')
  : `file://${path.join(__dirname, 'build/loading.html')}`;

function createWindow() {
  // express server is started here when production build
  if (!isDev) {
    require(path.join(__dirname, 'build-server/server'));
  }

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
    });
    setTimeout(() => mainWindow.loadURL(mainURL), 300);

    mainWindow.webContents.once('dom-ready', () => {
      mainWindow.maximize();
      loadingWindow.hide();
      loadingWindow.close();
      mainWindow.show();
      mainWindow.on('closed', () => (mainWindow = null));
    });
  });
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
