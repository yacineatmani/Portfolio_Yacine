# 🚀 GUIDE COMPLET - DÉPLOIEMENT + FORMSPREE

## 📧 CONFIGURATION FORMSPREE (FORMULAIRE DE CONTACT)

### Étape 1 : Créer un compte Formspree
1. Allez sur https://formspree.io/
2. Cliquez "Get Started" 
3. Créez un compte avec votre email : `yacineatmani1080@gmail.com`

### Étape 2 : Créer un nouveau formulaire
1. Une fois connecté, cliquez "New Form"
2. Donnez un nom : "Portfolio Contact"
3. Copiez l'URL fournie (ex: `https://formspree.io/f/xjvnbqlx`)

### Étape 3 : Mettre à jour le HTML
1. Ouvrez `index.html`
2. Trouvez la ligne : `<form class="contact-form" action=...`
3. Remplacez par votre nouvelle URL Formspree

## 🌐 DÉPLOIEMENT SUR NETLIFY

### Méthode 1 : Drag & Drop (Recommandée)
1. Allez sur https://app.netlify.com/drop
2. Connectez-vous avec GitHub ou email
3. Glissez TOUS les fichiers de `static-portfolio` sur la zone
4. Attendez la fin du déploiement (1-2 minutes)

### Méthode 2 : Via le site principal
1. Allez sur https://www.netlify.com/
2. Cliquez "Sites" dans le menu
3. Cliquez "Add new site" → "Deploy manually"
4. Glissez vos fichiers

## 📁 FICHIERS À DÉPLOYER

Sélectionnez TOUT le contenu de `static-portfolio` :
- ✅ `index.html`
- ✅ `assets/` (dossier complet)
- ✅ `_redirects`
- ✅ `netlify.toml`

## 🛠️ VÉRIFICATIONS AVANT DÉPLOIEMENT

### 1. Vérifier les images
```
static-portfolio/assets/images/
├── photo.jpg ✅ (votre vraie photo)
├── profile.svg ✅ (backup)
└── project*.svg ✅ (projets)
```

### 2. Tester en local
- Double-cliquez sur `index.html`
- Vérifiez que tout s'affiche correctement

### 3. Formspree
- Testez d'abord le formulaire après déploiement
- Premier envoi activera automatiquement Formspree

## 🚨 PROBLÈMES FRÉQUENTS

### Script .bat ne fonctionne pas
- Ouvrez manuellement https://app.netlify.com/drop
- Ouvrez manuellement le dossier `static-portfolio`

### Images ne s'affichent pas
- Vérifiez que `photo.jpg` existe dans `assets/images/`
- Copiez manuellement depuis `public/01JZ6B6MW84YMJP3D1PS5CGC8M.png`

### Formulaire ne fonctionne pas
- Vérifiez l'URL Formspree dans le HTML
- Premier message peut prendre quelques minutes

## ✅ CHECKLIST FINALE

- [ ] Compte Formspree créé
- [ ] URL Formspree mise à jour dans HTML  
- [ ] Fichier `photo.jpg` présent
- [ ] Test local OK
- [ ] Tous les fichiers sélectionnés pour Netlify
- [ ] Déploiement lancé

---

**🎉 Une fois déployé, votre portfolio sera accessible 24h/24 !**
