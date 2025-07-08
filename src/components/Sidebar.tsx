import React from 'react';
import { 
  Wand2, 
  Languages, 
  CheckCircle, 
  Lightbulb, 
  BookOpen, 
  Zap,
  MessageSquare,
  PenTool
} from 'lucide-react';

interface SidebarProps {
  onAIAction: (action: string) => void;
  isProcessing: boolean;
}

export default function Sidebar({ onAIAction, isProcessing }: SidebarProps) {
  const aiTools = [
    {
      id: 'improve',
      icon: Wand2,
      title: 'Améliorer le texte',
      description: 'Optimise le style et la clarté',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 'translate',
      icon: Languages,
      title: 'Traduire',
      description: 'Traduit vers différentes langues',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'correct',
      icon: CheckCircle,
      title: 'Corriger',
      description: 'Corrige grammaire et orthographe',
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'summarize',
      icon: BookOpen,
      title: 'Résumer',
      description: 'Crée un résumé concis',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'expand',
      icon: Lightbulb,
      title: 'Développer',
      description: 'Enrichit et développe le contenu',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'tone',
      icon: MessageSquare,
      title: 'Changer le ton',
      description: 'Adapte le style d\'écriture',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'format',
      icon: PenTool,
      title: 'Reformater',
      description: 'Restructure le document',
      color: 'text-pink-600 bg-pink-50'
    },
    {
      id: 'optimize',
      icon: Zap,
      title: 'Optimiser SEO',
      description: 'Améliore pour les moteurs de recherche',
      color: 'text-emerald-600 bg-emerald-50'
    }
  ];

  return (
    <aside className="w-80 bg-gray-50/50 backdrop-blur-sm border-r border-gray-200/50 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Outils IA</h2>
        <p className="text-sm text-gray-600">
          Sélectionnez du texte et choisissez un outil pour l'améliorer avec l'IA
        </p>
      </div>

      <div className="space-y-3">
        {aiTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => onAIAction(tool.id)}
              disabled={isProcessing}
              className="w-full p-4 text-left bg-white rounded-xl border border-gray-200/50 hover:border-gray-300 hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${tool.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tool.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-medium text-gray-900">Conseil Pro</h3>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Sélectionnez une partie de votre texte avant d'utiliser un outil IA pour des résultats plus précis.
        </p>
      </div>
    </aside>
  );
}