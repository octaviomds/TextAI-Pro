import { useEffect, useState } from 'react';

// Interface pour les APIs Electron exposées
interface ElectronAPI {
  saveFile: (content: string, defaultPath?: string) => Promise<string | null>;
  readFile: (filePath: string) => Promise<string>;
  onNewDocument: (callback: () => void) => void;
  onOpenFile: (callback: (event: any, filePath: string) => void) => void;
  onSaveDocument: (callback: () => void) => void;
  onSaveDocumentAs: (callback: () => void) => void;
  onExportDocument: (callback: () => void) => void;
  onAIAction: (callback: (event: any, action: string) => void) => void;
  onOpenPreferences: (callback: () => void) => void;
  onShowHelp: (callback: () => void) => void;
  onShowShortcuts: (callback: () => void) => void;
  removeAllListeners: (channel: string) => void;
}

// Vérifier si nous sommes dans Electron
const isElectron = () => {
  return typeof window !== 'undefined' && window.electronAPI;
};

export function useElectron() {
  const [electronAPI, setElectronAPI] = useState<ElectronAPI | null>(null);

  useEffect(() => {
    if (isElectron()) {
      setElectronAPI((window as any).electronAPI);
    }
  }, []);

  // Fonction pour sauvegarder un fichier
  const saveFile = async (content: string, defaultPath?: string): Promise<string | null> => {
    if (electronAPI) {
      return await electronAPI.saveFile(content, defaultPath);
    }
    // Fallback pour le navigateur
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = defaultPath || `document-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    return null;
  };

  // Fonction pour lire un fichier
  const readFile = async (filePath: string): Promise<string> => {
    if (electronAPI) {
      return await electronAPI.readFile(filePath);
    }
    throw new Error('Lecture de fichier non supportée dans le navigateur');
  };

  // Configuration des listeners d'événements
  const setupEventListeners = (callbacks: {
    onNewDocument?: () => void;
    onOpenFile?: (filePath: string) => void;
    onSaveDocument?: () => void;
    onSaveDocumentAs?: () => void;
    onExportDocument?: () => void;
    onAIAction?: (action: string) => void;
    onOpenPreferences?: () => void;
    onShowHelp?: () => void;
    onShowShortcuts?: () => void;
  }) => {
    if (!electronAPI) return;

    if (callbacks.onNewDocument) {
      electronAPI.onNewDocument(callbacks.onNewDocument);
    }
    if (callbacks.onOpenFile) {
      electronAPI.onOpenFile((event: any, filePath: string) => {
        callbacks.onOpenFile!(filePath);
      });
    }
    if (callbacks.onSaveDocument) {
      electronAPI.onSaveDocument(callbacks.onSaveDocument);
    }
    if (callbacks.onSaveDocumentAs) {
      electronAPI.onSaveDocumentAs(callbacks.onSaveDocumentAs);
    }
    if (callbacks.onExportDocument) {
      electronAPI.onExportDocument(callbacks.onExportDocument);
    }
    if (callbacks.onAIAction) {
      electronAPI.onAIAction((event: any, action: string) => {
        callbacks.onAIAction!(action);
      });
    }
    if (callbacks.onOpenPreferences) {
      electronAPI.onOpenPreferences(callbacks.onOpenPreferences);
    }
    if (callbacks.onShowHelp) {
      electronAPI.onShowHelp(callbacks.onShowHelp);
    }
    if (callbacks.onShowShortcuts) {
      electronAPI.onShowShortcuts(callbacks.onShowShortcuts);
    }
  };

  // Nettoyage des listeners
  const cleanupEventListeners = () => {
    if (!electronAPI) return;

    const channels = [
      'new-document',
      'open-file',
      'save-document',
      'save-document-as',
      'export-document',
      'ai-action',
      'open-preferences',
      'show-help',
      'show-shortcuts'
    ];

    channels.forEach(channel => {
      electronAPI.removeAllListeners(channel);
    });
  };

  return {
    isElectron: !!electronAPI,
    saveFile,
    readFile,
    setupEventListeners,
    cleanupEventListeners
  };
}