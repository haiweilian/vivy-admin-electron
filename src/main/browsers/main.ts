import { is } from '@electron-toolkit/utils'
import { BrowserWindow, shell } from 'electron'
import { join } from 'path'

/**
 * 创建主窗口
 */
export const createMainWindow = () => {
  let win: BrowserWindow

  function createWindow() {
    win = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      frame: true,
      autoHideMenuBar: true,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        webviewTag: true
      }
    })

    win.on('ready-to-show', () => {
      win.show()
    })

    win.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      win.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      win.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }

  const init = () => {
    createWindow()
  }

  const getWindow = () => win

  return {
    init,
    getWindow
  }
}
