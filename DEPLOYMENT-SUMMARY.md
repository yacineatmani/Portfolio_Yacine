# 🚀 Portfolio adapté pour GitHub Pages - Résumé des modifications

## ✅ Ce qui a été fait

### 1. Configuration du projet
- ✅ Ajout du script `build:static` dans `package.json`
- ✅ Installation de `gh-pages` pour le déploiement
- ✅ Configuration du `homepage` pour GitHub Pages
- ✅ Création du fichier `.nojekyll` pour éviter les problèmes Jekyll

### 2. Nouvelle structure statique
- ✅ Création de `src/StaticPortfolio.tsx` - version standalone sans Inertia/Laravel
- ✅ Création de `src/main.tsx` - point d'entrée React
- ✅ Création de `src/style.css` - styles Tailwind personnalisés
- ✅ Adaptation de `vite.config.ts` pour le mode statique

### 3. Configuration GitHub Actions
- ✅ Création du workflow `.github/workflows/deploy.yml`
- ✅ Déploiement automatique sur GitHub Pages
- ✅ Copie automatique des assets (images, CV, favicons)

### 4. Assets par défaut
- ✅ Images placeholder pour projets et profil
- ✅ Structure des dossiers `public/images/`
- ✅ Gestion des erreurs d'images avec fallback

### 5. Données statiques intégrées
- ✅ Données utilisateur, projets, compétences et expériences dans le code
- ✅ Aucune dépendance API/backend
- ✅ Portfolio entièrement autonome

## 🔧 Personnalisation nécessaire

### 1. Données personnelles
Éditez `src/StaticPortfolio.tsx` et modifiez l'objet `staticData` :

```typescript
const staticData = {
  user: {
    name: "VOTRE NOM", // ← Changez ici
    bio: "Votre bio...", // ← Et ici
    // ...
  },
  projects: [
    {
      title: "Votre projet",
      description: "Description...",
      github_link: "https://github.com/username/repo",
      // ...
    }
  ],
  // ...
};
```

### 2. Configuration GitHub
Dans `package.json` et `vite.config.ts`, remplacez :
```json
"homepage": "https://VOTRE_USERNAME.github.io/VOTRE_REPO/"
```
```typescript
base: '/VOTRE_REPO/', // Dans vite.config.ts
```

### 3. Assets personnels
Remplacez les fichiers dans `public/` :
- `public/images/profile/photo.jpg` - Votre photo
- `public/images/projects/` - Screenshots de vos projets
- `public/cv.pdf` - Votre CV

### 4. Liens sociaux
Dans `StaticPortfolio.tsx`, mettez à jour :
```typescript
href="https://github.com/VOTRE_USERNAME"
href="https://linkedin.com/in/VOTRE_PROFIL"
```

## 🚀 Déploiement

### Méthode 1 : GitHub Actions (Automatique) - Recommandé

1. **Créez un repository GitHub public**
2. **Poussez votre code** :
   ```bash
   git add .
   git commit -m "Setup portfolio for GitHub Pages"
   git push origin main
   ```
3. **Activez GitHub Pages** dans les paramètres du repo
4. **Le déploiement se fait automatiquement** à chaque push

### Méthode 2 : Déploiement manuel

```bash
# Build local
npm run build:static

# Déploiement direct
npm run deploy
```

## 📁 Structure finale

```
Portfolio/
├── dist/                    # ← Fichiers générés pour GitHub Pages
│   ├── index.html
│   ├── assets/
│   ├── images/
│   ├── cv.pdf
│   └── .nojekyll
├── src/
│   ├── StaticPortfolio.tsx  # ← Portfolio standalone
│   ├── main.tsx
│   └── style.css
├── public/
│   ├── images/              # ← Vos assets personnels
│   └── cv.pdf
├── .github/workflows/
│   └── deploy.yml           # ← Déploiement automatique
└── index.html               # ← Point d'entrée
```

## 🌐 Accès au portfolio

Une fois déployé, votre portfolio sera accessible à :
```
https://VOTRE_USERNAME.github.io/VOTRE_REPO/
```

## 🛠️ Maintenance

Pour mettre à jour votre portfolio :
1. Modifiez les fichiers sources
2. Commitez et poussez vers GitHub
3. Le site se met à jour automatiquement

## 🔍 Dépannage

### Le site ne se charge pas
- Vérifiez le `base` path dans `vite.config.ts`
- Assurez-vous que GitHub Pages est activé

### Images non affichées
- Vérifiez que les images sont dans `public/images/`
- Les chemins doivent commencer par `/`

### Build échoue
- Vérifiez les dépendances : `npm install`
- Testez localement : `npm run build:static`

## 💡 Fonctionnalités

✅ **Design responsive** - Fonctionne sur mobile et desktop
✅ **Mode sombre/clair** - Basculement automatique
✅ **Animations fluides** - GSAP et Framer Motion
✅ **Optimisé SEO** - Meta tags et structure
✅ **Performance** - Build optimisé avec Vite
✅ **Accessible** - Navigation clavier et screen readers
