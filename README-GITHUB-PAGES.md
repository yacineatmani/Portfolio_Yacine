# Déploiement sur GitHub Pages

Ce guide explique comment déployer votre portfolio sur GitHub Pages.

## Configuration requise

1. **Repository GitHub** : Créez un repository public sur GitHub
2. **GitHub Pages activé** : Dans les paramètres du repository, activez GitHub Pages

## Étapes de déploiement

### 1. Préparer le repository

```bash
# Initialisez git si ce n'est pas déjà fait
git init

# Ajoutez le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/Portfolio.git

# Créez la branche main
git branch -M main
```

### 2. Personnaliser la configuration

1. **Modifiez le `package.json`** :
   ```json
   "homepage": "https://VOTRE_USERNAME.github.io/Portfolio/"
   ```

2. **Modifiez `vite.config.ts`** :
   ```typescript
   base: '/Portfolio/', // Changez selon votre nom de repo
   ```

3. **Modifiez `src/StaticPortfolio.tsx`** :
   - Mettez à jour les données statiques (nom, bio, projets, etc.)
   - Modifiez les liens GitHub et LinkedIn
   - Ajoutez vos vraies images dans `public/images/`

### 3. Préparer les assets

```bash
# Copiez vos images dans le dossier public
cp votre-photo.jpg public/images/profile/photo.jpg
cp vos-projets/* public/images/projects/
cp votre-cv.pdf public/cv.pdf
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Tester localement

```bash
# Build statique
npm run build:static

# Tester le build (optionnel)
npx serve dist
```

### 6. Déployer

#### Option A : Déploiement automatique (recommandé)

```bash
# Commitez vos changements
git add .
git commit -m "Setup portfolio for GitHub Pages"

# Pushez vers GitHub
git push -u origin main
```

Le workflow GitHub Actions se chargera automatiquement du déploiement.

#### Option B : Déploiement manuel

```bash
# Installez gh-pages si pas déjà fait
npm install -g gh-pages

# Déployez
npm run deploy
```

### 7. Configurer GitHub Pages

1. Allez dans **Settings** de votre repository
2. Scrollez jusqu'à **Pages**
3. Dans **Source**, sélectionnez **Deploy from a branch**
4. Choisissez **gh-pages** comme branche
5. Cliquez sur **Save**

Votre site sera disponible à : `https://VOTRE_USERNAME.github.io/Portfolio/`

## Personnalisation avancée

### Nom de domaine personnalisé

1. Créez un fichier `CNAME` dans le dossier `public/` :
   ```
   votre-domaine.com
   ```

2. Configurez vos DNS pour pointer vers GitHub Pages

### Optimisation des performances

- Les images sont automatiquement optimisées par Vite
- Le CSS et JS sont minifiés
- Les assets sont mis en cache

### Dépannage

#### Le site ne se charge pas

1. Vérifiez que `base` dans `vite.config.ts` correspond au nom de votre repository
2. Assurez-vous que GitHub Pages est activé
3. Vérifiez la branche de déploiement (généralement `gh-pages`)

#### Les images ne s'affichent pas

1. Vérifiez que les images sont dans `public/images/`
2. Assurez-vous que les chemins dans `StaticPortfolio.tsx` sont corrects
3. Utilisez des chemins relatifs commençant par `/`

#### Erreurs 404

- Vérifiez que le `base` path est correct
- Assurez-vous que tous les assets sont copiés dans le dossier `dist/`

## Mise à jour

Pour mettre à jour votre portfolio :

1. Modifiez les fichiers source
2. Commitez et pushez vers `main`
3. Le déploiement se fera automatiquement

## Structure des fichiers pour GitHub Pages

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
├── images/
│   ├── profile/
│   └── projects/
├── cv.pdf
├── favicon.svg
├── .nojekyll
└── ...
```
