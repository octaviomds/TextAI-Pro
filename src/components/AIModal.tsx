import React, { useState } from 'react';
import { X, Wand2, Copy, Check, RotateCcw } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  processedText: string;
  actionType: string;
  onApply: () => void;
  onRegenerate: () => void;
  isProcessing: boolean;
}

export default function AIModal({
  isOpen,
  onClose,
  originalText,
  processedText,
  actionType,
  onApply,
  onRegenerate,
  isProcessing
}: AIModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(processedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getActionTitle = (action: string) => {
    const titles: { [key: string]: string } = {
      improve: 'Texte amélioré',
      translate: 'Texte traduit',
      correct: 'Texte corrigé',
      summarize: 'Résumé généré',
      expand: 'Texte développé',
      tone: 'Ton modifié',
      format: 'Texte reformaté',
      optimize: 'Texte optimisé SEO'
    };
    return titles[action] || 'Résultat IA';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getActionTitle(actionType)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Text */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Texte original</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 max-h-80 overflow-y-auto">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {originalText}
                </p>
              </div>
            </div>

            {/* Processed Text */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">Résultat IA</h3>
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Copié!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 max-h-80 overflow-y-auto">
                {isProcessing ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {processedText}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onRegenerate}
            disabled={isProcessing}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Régénérer</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onApply}
              disabled={isProcessing || !processedText}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Appliquer les modifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}