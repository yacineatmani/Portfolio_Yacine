# Dashboard Modulaire - Architecture

## Structure des Composants

### Dossier `resources/js/components/dashboard/`

#### `ProjectCard.tsx`

- Composant de carte pour afficher un projet
- Props: `project`, `index`, `onDelete`
- Features: Image, titre, description, technologies, liens, bouton suppression

#### `SkillCard.tsx`

- Composant de carte pour afficher une compétence
- Props: `skill`, `index`, `onDelete`
- Features: Icône, nom, catégorie, barre de progression, étoiles

#### `ProjectForm.tsx`

- Formulaire modal pour créer/modifier un projet
- Props: `isOpen`, `onClose`
- Features: Upload d'image, validation, preview

#### `SkillForm.tsx`

- Formulaire modal pour créer/modifier une compétence
- Props: `isOpen`, `onClose`
- Features: Sélection d'icône, slider de niveau, preview

#### `index.ts`

- Fichier d'export centralisé pour tous les composants dashboard

## Avantages de cette Architecture

### Modularité

- Chaque composant a une responsabilité unique
- Facilite la réutilisation et la maintenance
- Code plus lisible et organisé

### Séparation des Préoccupations

- Logique de présentation séparée de la logique métier
- Formulaires indépendants du dashboard principal
- Gestion d'état locale pour chaque composant

### Maintenabilité

- Modifications localisées
- Tests unitaires plus faciles
- Ajout de nouvelles fonctionnalités simplifié

## Utilisation

```tsx
import { ProjectCard, SkillCard, ProjectForm, SkillForm } from '../components/dashboard';

// Dans le dashboard
<ProjectCard
  project={project}
  index={index}
  onDelete={handleDeleteProject}
/>

<SkillCard
  skill={skill}
  index={index}
  onDelete={handleDeleteSkill}
/>

<ProjectForm
  isOpen={showProjectForm}
  onClose={() => setShowProjectForm(false)}
/>

<SkillForm
  isOpen={showSkillForm}
  onClose={() => setShowSkillForm(false)}
/>
```

## Prochaines Améliorations Possibles

1. **Édition en ligne** : Ajouter des formulaires d'édition pour les cartes
2. **Drag & Drop** : Réorganiser les projets et compétences
3. **Filtres** : Filtrer par technologies ou catégories
4. **Recherche** : Barre de recherche globale
5. **Import/Export** : Sauvegarde et restauration des données
6. **Thèmes** : Personnalisation visuelle avancée
