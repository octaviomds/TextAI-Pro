import React, { useState, useRef, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isProcessing: boolean;
  selectedText: string;
  onTextSelect: (text: string) => void;
}

export default function Editor({ 
  content, 
  onChange, 
  isProcessing, 
  selectedText,
  onTextSelect 
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0;
    const chars = content.length;
    setWordCount(words);
    setCharCount(chars);
  }, [content]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const newContent = e.currentTarget.textContent || '';
    onChange(newContent);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      onTextSelect(selection.toString().trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Raccourcis clavier
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 's':
          e.preventDefault();
          // Trigger save
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            // Redo
          } else {
            e.preventDefault();
            // Undo
          }
          break;
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Toolbar */}
      <div className="border-b border-gray-200/50 px-6 py-3 bg-gray-50/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{wordCount} mots</span>
            <span>{charCount} caractères</span>
            {selectedText && (
              <span className="text-blue-600 font-medium">
                "{selectedText.substring(0, 30)}{selectedText.length > 30 ? '...' : ''}" sélectionné
              </span>
            )}
          </div>
          
          {isProcessing && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">IA en cours...</span>
            </div>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onMouseUp={handleMouseUp}
          onKeyDown={handleKeyDown}
          className="w-full h-full p-8 text-gray-900 leading-relaxed focus:outline-none resize-none"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '16px',
            lineHeight: '1.6',
            minHeight: '500px'
          }}
          placeholder="Commencez à écrire votre texte ici... Vous pouvez ensuite utiliser les outils IA pour l'améliorer."
          suppressContentEditableWarning={true}
        >
          {content}
        </div>

        {/* Overlay pour le processing */}
        {isProcessing && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-3">
              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
              <span className="text-gray-900 font-medium">L'IA traite votre texte...</span>
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="border-t border-gray-200/50 px-6 py-2 bg-gray-50/30">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Dernière modification: {new Date().toLocaleTimeString('fr-FR')}</span>
          <div className="flex items-center space-x-4">
            <span>UTF-8</span>
            <span>Français</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Sauvegardé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}