用于主进程与渲染进程通信的通用定义

### 渲染进程 => 主进程

可以获取返回值

```js
ipcRenderer.invoke('xxx')
ipcMain.handle('xxx')
```

### 主进程 => 渲染进程

获取不到返回值

```js
mainWindow.webContents.send('xxx')
ipcRenderer.on('xxx')
```
