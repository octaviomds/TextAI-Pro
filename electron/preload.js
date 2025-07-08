const { contextBridge, ipcRenderer } = require('electron');

// Exposer des APIs protégées au renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Gestion des fichiers
  saveFile: (content, defaultPath) => ipcRenderer.invoke('save-file', content, defaultPath),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
  
  // Événements du menu
  onNewDocument: (callback) => ipcRenderer.on('new-document', callback),
  onOpenFile: (callback) => ipcRenderer.on('open-file', callback),
  onSaveDocument: (callback) => ipcRenderer.on('save-document', callback),
  onSaveDocumentAs: (callback) => ipcRenderer.on('save-document-as', callback),
  onExportDocument: (callback) => ipcRenderer.on('export-document', callback),
  onAIAction: (callback) => ipcRenderer.on('ai-action', callback),
  onOpenPreferences: (callback) => ipcRenderer.on('open-preferences', callback),
  onShowHelp: (callback) => ipcRenderer.on('show-help', callback),
  onShowShortcuts: (callback) => ipcRenderer.on('show-shortcuts', callback),
  
  // Nettoyage des listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});