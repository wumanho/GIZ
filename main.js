const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

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

const menu = [
  {
    role: 'fileMenu'
  },
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' }
          ]
        }
      ]
    : [])
]

app.whenReady().then(() => {
  createMainWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
  // 重新加载 app
  globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
  // 打开控制台
  if (isDev) {
    globalShortcut.register(isWin ? 'Ctrl+Shift+I' : 'Command+Alt+I', () => mainWindow.toggleDevTools())
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (isWin) app.quit()
})
