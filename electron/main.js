const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

// Garde une référence globale de l'objet window
let mainWindow;

function createWindow() {
  // Créer la fenêtre du navigateur
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 600,
    titleBarStyle: 'hiddenInset', // Style macOS natif
    vibrancy: 'under-window', // Effet de transparence macOS
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    show: false, // Ne pas montrer jusqu'à ce que ready-to-show
    icon: path.join(__dirname, 'assets/icon.png') // Icône de l'app
  });

  // Charger l'app
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // Ouvrir les DevTools en développement
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Montrer la fenêtre quand elle est prête
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus sur macOS
    if (process.platform === 'darwin') {
      app.dock.show();
    }
  });

  // Émis quand la fenêtre est fermée
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Gestion des liens externes
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Cette méthode sera appelée quand Electron aura fini de s'initialiser
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    // Sur macOS, il est courant de recréer une fenêtre quand l'icône du dock est cliquée
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quitter quand toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  // Sur macOS, il est courant que les applications restent actives jusqu'à ce que l'utilisateur quitte explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Menu natif macOS
function createMenu() {
  const template = [
    {
      label: 'TextAI Pro',
      submenu: [
        {
          label: 'À propos de TextAI Pro',
          role: 'about'
        },
        { type: 'separator' },
        {
          label: 'Préférences...',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('open-preferences');
          }
        },
        { type: 'separator' },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        { type: 'separator' },
        {
          label: 'Masquer TextAI Pro',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Masquer les autres',
          accelerator: 'Command+Alt+H',
          role: 'hideothers'
        },
        {
          label: 'Tout afficher',
          role: 'unhide'
        },
        { type: 'separator' },
        {
          label: 'Quitter',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Fichier',
      submenu: [
        {
          label: 'Nouveau document',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('new-document');
          }
        },
        {
          label: 'Ouvrir...',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [
                { name: 'Fichiers texte', extensions: ['txt', 'md'] },
                { name: 'Tous les fichiers', extensions: ['*'] }
              ]
            });
            
            if (!result.canceled) {
              mainWindow.webContents.send('open-file', result.filePaths[0]);
            }
          }
        },
        { type: 'separator' },
        {
          label: 'Sauvegarder',
          accelerator: 'CmdOrCtrl+S',
          click: () => {
            mainWindow.webContents.send('save-document');
          }
        },
        {
          label: 'Sauvegarder sous...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => {
            mainWindow.webContents.send('save-document-as');
          }
        },
        { type: 'separator' },
        {
          label: 'Exporter...',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('export-document');
          }
        }
      ]
    },
    {
      label: 'Édition',
      submenu: [
        {
          label: 'Annuler',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Rétablir',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        { type: 'separator' },
        {
          label: 'Couper',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copier',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Coller',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Tout sélectionner',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'IA',
      submenu: [
        {
          label: 'Améliorer le texte',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.webContents.send('ai-action', 'improve');
          }
        },
        {
          label: 'Traduire',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            mainWindow.webContents.send('ai-action', 'translate');
          }
        },
        {
          label: 'Corriger',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            mainWindow.webContents.send('ai-action', 'correct');
          }
        },
        {
          label: 'Résumer',
          accelerator: 'CmdOrCtrl+4',
          click: () => {
            mainWindow.webContents.send('ai-action', 'summarize');
          }
        }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        {
          label: 'Recharger',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.reload();
          }
        },
        {
          label: 'Forcer le rechargement',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => {
            mainWindow.webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Outils de développement',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        {
          label: 'Zoom avant',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 1);
          }
        },
        {
          label: 'Zoom arrière',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 1);
          }
        },
        {
          label: 'Zoom réel',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            mainWindow.webContents.setZoomLevel(0);
          }
        },
        { type: 'separator' },
        {
          label: 'Plein écran',
          accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
          click: () => {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
          }
        }
      ]
    },
    {
      label: 'Fenêtre',
      submenu: [
        {
          label: 'Réduire',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Fermer',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Aide',
      submenu: [
        {
          label: 'Guide d\'utilisation',
          click: () => {
            mainWindow.webContents.send('show-help');
          }
        },
        {
          label: 'Raccourcis clavier',
          click: () => {
            mainWindow.webContents.send('show-shortcuts');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Gestion des événements IPC
ipcMain.handle('save-file', async (event, content, defaultPath) => {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: defaultPath || 'document.txt',
    filters: [
      { name: 'Fichiers texte', extensions: ['txt'] },
      { name: 'Markdown', extensions: ['md'] },
      { name: 'HTML', extensions: ['html'] }
    ]
  });
  
  if (!result.canceled) {
    const fs = require('fs');
    fs.writeFileSync(result.filePath, content);
    return result.filePath;
  }
  return null;
});

ipcMain.handle('read-file', async (event, filePath) => {
  const fs = require('fs');
  return fs.readFileSync(filePath, 'utf8');
});