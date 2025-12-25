/**
 * 更新通信事件枚举
 */
export enum IpcUpdaterEnum {
  /** 检查更新 */
  CheckUpdate = 'electron-updater:CheckUpdate',
  /** 更新可用 */
  UpdateAvailable = 'electron-updater:UpdateAvailable',
  /** 更新不可用 */
  UpdateNotAvailable = 'electron-updater:UpdateNotAvailable',
  /** 下载更新 */
  DownloadUpdate = 'electron-updater:DownloadUpdate',
  /** 下载进度 */
  DownloadProgress = 'electron-updater:DownloadProgress',
  /** 下载完成 */
  UpdateDownloaded = 'electron-updater:UpdateDownloaded',
  /** 退出并安装重启 */
  QuitAndInstall = 'electron-updater:QuitAndInstall'
}
