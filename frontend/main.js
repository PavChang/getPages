console.log('Hello from Electron 👋')

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  }
  })
  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.on("ready", createWindow)

app.on('window-all-closed', () => {
    app.quit()
  })

