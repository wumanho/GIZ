const { app, BrowserWindow, Menu } = require('electron')

process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV === 'development'
const isWin = process.platform === 'win32'

let mainWindow
let aboutWindow
function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: '图片压缩工具',
    width: 460,
    height: 600,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: './assets/icons/Icon_256x256.png'
  })
  mainWindow.loadFile('./app/index.html')
}

function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: '图片压缩工具',
    width: 300,
    height: 300,
    resizable: false,
    icon: './assets/icons/Icon_256x256.png',
    autoHideMenuBar: true
  })
  aboutWindow.loadFile('./app/about.html')
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
    : []),
  {
    label: 'Help',
    submenu: [
      {
        label: 'About',
        click: createAboutWindow
      }
    ]
  }
]

app.whenReady().then(() => {
  createMainWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow()
  }
})

app.on('window-all-closed', () => {
  if (isWin) app.quit()
})
