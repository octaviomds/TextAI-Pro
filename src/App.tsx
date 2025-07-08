import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import AIModal from './components/AIModal';
import { useAI } from './hooks/useAI';
import { useElectron } from './hooks/useElectron';

function App() {
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [currentAction, setCurrentAction] = useState('');
  const [processedText, setProcessedText] = useState('');
  
  const { processText, isProcessing } = useAI();
  const { isElectron, saveFile, readFile, setupEventListeners, cleanupEventListeners } = useElectron();

  // Configuration des événements Electron
  useEffect(() => {
    if (isElectron) {
      setupEventListeners({
        onNewDocument: () => {
          setContent('');
          setSelectedText('');
        },
        onOpenFile: async (filePath: string) => {
          try {
            const fileContent = await readFile(filePath);
            setContent(fileContent);
          } catch (error) {
            console.error('Erreur lors de l\'ouverture du fichier:', error);
          }
        },
        onSaveDocument: () => handleSave(),
        onSaveDocumentAs: () => handleSaveAs(),
        onExportDocument: () => handleExport(),
        onAIAction: (action: string) => handleAIAction(action),
        onOpenPreferences: () => handleSettings(),
        onShowHelp: () => {
          alert('Guide d\'utilisation\n\n• Utilisez les outils IA dans la barre latérale\n• Sélectionnez du texte pour des modifications ciblées\n• Raccourcis: Cmd+S (sauvegarder), Cmd+1-4 (outils IA)');
        },
        onShowShortcuts: () => {
          alert('Raccourcis clavier\n\n• Cmd+N: Nouveau document\n• Cmd+O: Ouvrir\n• Cmd+S: Sauvegarder\n• Cmd+E: Exporter\n• Cmd+1: Améliorer\n• Cmd+2: Traduire\n• Cmd+3: Corriger\n• Cmd+4: Résumer');
        }
      });

      return () => {
        cleanupEventListeners();
      };
    }
  }, [isElectron, content]);

  const handleAIAction = async (action: string) => {
    const textToProcess = selectedText || content;
    if (!textToProcess.trim()) {
      alert('Veuillez sélectionner du texte ou écrire du contenu avant d\'utiliser les outils IA.');
      return;
    }

    setCurrentAction(action);
    setShowAIModal(true);
    setProcessedText('');
    
    try {
      const result = await processText(textToProcess, action);
      setProcessedText(result);
    } catch (error) {
      console.error('Erreur lors du traitement IA:', error);
      setProcessedText('Erreur lors du traitement. Veuillez réessayer.');
    }
  };

  const handleApplyChanges = () => {
    if (selectedText) {
      // Remplacer le texte sélectionné
      const newContent = content.replace(selectedText, processedText);
      setContent(newContent);
    } else {
      // Remplacer tout le contenu
      setContent(processedText);
    }
    setShowAIModal(false);
    setSelectedText('');
  };

  const handleRegenerate = () => {
    const textToProcess = selectedText || content;
    handleAIAction(currentAction);
  };

  const handleSave = () => {
    saveFile(content, `document-${new Date().toISOString().split('T')[0]}.txt`);
  };

  const handleSaveAs = () => {
    saveFile(content);
  };

  const handleExport = () => {
    // Export en différents formats
    const formats = ['txt', 'md', 'html'];
    const format = prompt(`Choisissez un format d'export:\n${formats.join(', ')}`) || 'txt';
    
    let exportContent = content;
    let mimeType = 'text/plain';
    
    if (format === 'md') {
      exportContent = `# Document\n\n${content}`;
      mimeType = 'text/markdown';
    } else if (format === 'html') {
      exportContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    </style>
</head>
<body>
    <div>${content.replace(/\n/g, '<br>')}</div>
</body>
</html>`;
      mimeType = 'text/html';
    }
    
    const blob = new Blob([exportContent], { type: mimeType });
    
    if (isElectron) {
      saveFile(exportContent, `document-${new Date().toISOString().split('T')[0]}.${format}`);
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSettings = () => {
    alert('Paramètres - Fonctionnalité à venir!\n\n• Configuration des modèles IA\n• Préférences d\'interface\n• Raccourcis clavier\n• Intégrations tierces');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        onSave={handleSave}
        onExport={handleExport}
        onSettings={handleSettings}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          onAIAction={handleAIAction}
          isProcessing={isProcessing}
        />
        
        <Editor
          content={content}
          onChange={setContent}
          isProcessing={isProcessing}
          selectedText={selectedText}
          onTextSelect={setSelectedText}
        />
      </div>

      <AIModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        originalText={selectedText || content}
        processedText={processedText}
        actionType={currentAction}
        onApply={handleApplyChanges}
        onRegenerate={handleRegenerate}
        isProcessing={isProcessing}
      />
    </div>
  );
}

export default App;