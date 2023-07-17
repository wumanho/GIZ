const { app, BrowserWindow } = require('electron')

process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV === 'development'
const isWin = process.platform === 'win32'

let mainWindow
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: '图片压缩器',
    width: 500,
    height: 600,
    resizable: isDev,
    icon: './assets/icons/Icon_256x256.png'
  })
  mainWindow.loadFile('./app/index.html')
}

app.whenReady().then(createMainWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (isWin) {
    app.quit()
  }
})
