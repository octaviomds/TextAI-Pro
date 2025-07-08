import React from 'react';
import { FileText, Sparkles, Save, Download, Settings } from 'lucide-react';

interface HeaderProps {
  onSave: () => void;
  onExport: () => void;
  onSettings: () => void;
}

export default function Header({ onSave, onExport, onSettings }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">TextAI Pro</h1>
          </div>
          <div className="hidden md:flex items-center space-x-1 ml-8">
            <span className="text-sm text-gray-500">Powered by</span>
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-600">Intelligence Artificielle</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onSave}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Sauvegarder</span>
          </button>
          <button
            onClick={onExport}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exporter</span>
          </button>
          <button
            onClick={onSettings}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}