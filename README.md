# TextAI Pro

Une application de traitement de texte moderne avec intelligence artificielle intégrée, développée avec React, TypeScript et Electron pour macOS.

![TextAI Pro](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/Platform-macOS-lightgrey.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## ✨ Fonctionnalités

### 🤖 Intelligence Artificielle
- **Amélioration de texte** - Optimise le style et la clarté
- **Traduction** - Traduit vers différentes langues
- **Correction** - Corrige grammaire et orthographe
- **Résumé** - Crée des résumés concis
- **Développement** - Enrichit et développe le contenu
- **Changement de ton** - Adapte le style d'écriture
- **Reformatage** - Restructure le document
- **Optimisation SEO** - Améliore pour les moteurs de recherche

### 📝 Éditeur de texte
- Interface moderne et intuitive
- Sélection de texte pour modifications ciblées
- Compteur de mots et caractères en temps réel
- Sauvegarde automatique
- Support multi-formats (TXT, MD, HTML)

### 🖥️ Application native macOS
- Menu natif macOS avec toutes les conventions
- Raccourcis clavier système
- Intégration dock
- Style natif avec transparence
- Gestion des fichiers système

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- macOS 10.14+

### Installation des dépendances
```bash
npm install
```

## 🛠️ Développement

### Lancer en mode développement web
```bash
npm run dev
```

### Lancer l'application Electron
```bash
# Mode développement (Vite + Electron)
npm run electron-dev

# Electron seul
npm run electron
```

### Build pour production
```bash
# Build web
npm run build

# Build Electron
npm run build-electron

# Créer un installateur .dmg
npm run dist
```

## ⌨️ Raccourcis clavier

### Fichier
- `Cmd+N` - Nouveau document
- `Cmd+O` - Ouvrir un fichier
- `Cmd+S` - Sauvegarder
- `Cmd+Shift+S` - Sauvegarder sous...
- `Cmd+E` - Exporter

### Édition
- `Cmd+Z` - Annuler
- `Cmd+Shift+Z` - Rétablir
- `Cmd+X` - Couper
- `Cmd+C` - Copier
- `Cmd+V` - Coller
- `Cmd+A` - Tout sélectionner

### Outils IA
- `Cmd+1` - Améliorer le texte
- `Cmd+2` - Traduire
- `Cmd+3` - Corriger
- `Cmd+4` - Résumer

### Affichage
- `Cmd+R` - Recharger
- `Cmd+Shift+R` - Forcer le rechargement
- `Cmd+Alt+I` - Outils de développement
- `Cmd++` - Zoom avant
- `Cmd+-` - Zoom arrière
- `Cmd+0` - Zoom réel
- `Ctrl+Cmd+F` - Plein écran

## 📁 Structure du projet

```
textai-pro/
├── electron/                 # Configuration Electron
│   ├── main.js              # Processus principal
│   ├── preload.js           # Script de sécurité
│   └── assets/              # Ressources Electron
├── src/
│   ├── components/          # Composants React
│   │   ├── Header.tsx       # En-tête de l'application
│   │   ├── Sidebar.tsx      # Barre latérale avec outils IA
│   │   ├── Editor.tsx       # Éditeur de texte principal
│   │   └── AIModal.tsx      # Modal de traitement IA
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useAI.ts         # Gestion des fonctions IA
│   │   └── useElectron.ts   # Intégration Electron
│   ├── App.tsx              # Composant principal
│   └── main.tsx             # Point d'entrée React
├── package.json             # Configuration npm
└── README.md               # Documentation
```

## 🔧 Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **Lucide React** - Icônes

### Desktop
- **Electron** - Framework d'application desktop
- **Electron Builder** - Packaging et distribution

### Outils de développement
- **Vite** - Build tool et serveur de développement
- **ESLint** - Linting du code
- **Concurrently** - Exécution de scripts parallèles

## 🎨 Design

L'application suit les principes de design d'Apple avec :
- Interface claire et minimaliste
- Typographie soignée
- Animations fluides et micro-interactions
- Palette de couleurs cohérente
- Responsive design
- Accessibilité optimisée

## 🔒 Sécurité

- **Context Isolation** activé dans Electron
- **Node Integration** désactivé
- **Remote Module** désactivé
- Script preload sécurisé pour l'exposition des APIs
- Validation des entrées utilisateur

## 📦 Distribution

### Formats supportés
- **macOS**: `.dmg` (installateur)
- **Architecture**: x64 et ARM64 (Apple Silicon)

### Configuration de build
La configuration Electron Builder est dans `package.json` :
- App ID: `com.textai.app`
- Nom: `TextAI Pro`
- Catégorie: Productivité

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les raccourcis clavier dans le menu Aide

## 🔮 Roadmap

### Version 1.1
- [ ] Intégration API OpenAI réelle
- [ ] Thèmes personnalisables
- [ ] Mode sombre
- [ ] Plugins tiers

### Version 1.2
- [ ] Collaboration en temps réel
- [ ] Synchronisation cloud
- [ ] Version Windows/Linux
- [ ] Extensions de format

---

**TextAI Pro** - Réinventez votre façon d'écrire avec l'intelligence artificielle.