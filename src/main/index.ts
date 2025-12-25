import { app, BrowserWindow } from 'electron'
import { electronApp, platform, is } from '@electron-toolkit/utils'
// import { installExtension, VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { createMainWindow } from './browsers'

const mainWindow = createMainWindow()

// 检测到已有实例在运行，新启动的实例会自动退出。
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，会调用此方法。
app.whenReady().then(() => {
  mainWindow.init()

  if (platform.isWindows) {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')
  }

  if (is.dev) {
    // 安装 Vue.js 开发者工具
    // installExtension(VUEJS_DEVTOOLS)
    //   .then((name) => console.log(`Added Extension: ${name}`))
    //   .catch((err) => console.log('An error occurred:', err))
  }
})

// 在 macOS 上，当应用没有任何窗口打开时，
// 点击 Dock 图标通常会重新创建一个窗口。
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) mainWindow.init()
})

// 当应用程序第二次启动时，会触发 second-instance 事件。
// 获取到已存在的窗口实例，并将其聚焦到前台，同时将其从最小化状态恢复到正常状态。
app.on('second-instance', () => {
  const windows = BrowserWindow.getAllWindows()
  if (windows.length > 0) {
    const mainWindow = windows[0]
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

// 当所有窗口都关闭时退出应用，macOS 除外。
// 在 macOS 上，应用程序及其菜单栏通常会保持活动状态，直到用户显式地使用 Cmd + Q 退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
