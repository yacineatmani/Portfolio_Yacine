import { usePage, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import React from 'react';

interface User {
  id: number;
  name: string;
  first_name: string;
  bio: string | null;
  photo: string | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  github_link: string | null;
  demo_link: string | null;
  image: string | null;
}

interface Skill {
  id: number;
  name: string;
  level: string;
}

interface PageProps {
  auth: { user: User | null };
  projects: Project[];
  skills: Skill[];
  [key: string]: any;
}

export default function Dashboard() {
  const { projects, skills } = usePage<PageProps>().props;

  // Formulaire Projet
  const {
    data: projectData,
    setData: setProjectData,
    post: postProject,
    errors: projectErrors,
    reset: resetProject,
    processing: processingProject,
  } = useForm<{
    title: string;
    description: string;
    github_link: string;
    demo_link: string;
    image: File | null;
  }>({
    title: '',
    description: '',
    github_link: '',
    demo_link: '',
    image: null,
  });

  // Formulaire Compétence
  const {
    data: skillData,
    setData: setSkillData,
    post: postSkill,
    errors: skillErrors,
    reset: resetSkill,
    processing: processingSkill,
  } = useForm<{
    name: string;
    level: string;
  }>({
    name: '',
    level: '',
  });

  // Formulaire CV
  const {
    data: cvData,
    setData: setCvData,
    post: postCv,
    processing: processingCv,
    errors: cvErrors,
    reset: resetCv,
  } = useForm<{ cv: File | null }>({
    cv: null,
  });

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postProject('/projects', {
      forceFormData: true,
      onSuccess: () => resetProject(),
    });
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postSkill('/skills', {
      onSuccess: () => resetSkill(),
    });
  };

  const handleCvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postCv('/profile/cv', {
      forceFormData: true,
      onSuccess: () => resetCv(),
    });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Voulez-vous supprimer ce projet ?')) {
      router.delete(`/projects/${id}`);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto p-6 bg-background text-foreground">
        <h1 className="text-3xl mb-6">Dashboard Admin</h1>

        {/* Project Form */}
        <form onSubmit={handleProjectSubmit} className="mb-8 project-card">
          <h2 className="text-xl mb-4">Ajouter un projet</h2>
          <div className="mb-4">
            <input
              type="text"
              value={projectData.title}
              onChange={(e) => setProjectData('title', e.target.value)}
              placeholder="Titre du projet"
              className="w-full"
            />
            {projectErrors.title && <span className="text-destructive text-sm">{projectErrors.title}</span>}
          </div>
          <div className="mb-4">
            <textarea
              value={projectData.description}
              onChange={(e) => setProjectData('description', e.target.value)}
              placeholder="Description"
              className="w-full"
              rows={4}
            />
            {projectErrors.description && <span className="text-destructive text-sm">{projectErrors.description}</span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={projectData.github_link}
              onChange={(e) => setProjectData('github_link', e.target.value)}
              placeholder="Lien GitHub"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={projectData.demo_link}
              onChange={(e) => setProjectData('demo_link', e.target.value)}
              placeholder="Lien démo"
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProjectData('image', e.target.files?.[0] || null)}
              className="w-full"
            />
            {projectErrors.image && <span className="text-destructive text-sm">{projectErrors.image}</span>}
          </div>
          <button type="submit" disabled={processingProject}>Ajouter Projet</button>
        </form>

        {/* Skill Form */}
        <form onSubmit={handleSkillSubmit} className="mb-8 project-card">
          <h2 className="text-xl mb-4">Ajouter une compétence</h2>
          <div className="mb-4">
            <input
              type="text"
              value={skillData.name}
              onChange={(e) => setSkillData('name', e.target.value)}
              placeholder="Nom de la compétence"
              className="w-full"
            />
            {skillErrors.name && <span className="text-destructive text-sm">{skillErrors.name}</span>}
          </div>
          <div className="mb-4">
            <select
              value={skillData.level}
              onChange={(e) => setSkillData('level', e.target.value)}
              className="w-full"
            >
              <option value="">Niveau</option>
              <option value="débutant">Débutant</option>
              <option value="confirmé">Confirmé</option>
              <option value="expert">Expert</option>
            </select>
            {skillErrors.level && <span className="text-destructive text-sm">{skillErrors.level}</span>}
          </div>
          <button type="submit" disabled={processingSkill}>Ajouter Compétence</button>
        </form>

        {/* CV Upload Form */}
        <form onSubmit={handleCvSubmit} className="mb-8 project-card">
          <h2 className="text-xl mb-4">Mettre à jour mon CV</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={e => setCvData('cv', e.target.files?.[0] || null)}
            className="w-full mb-4"
          />
          {cvErrors?.cv && <span className="text-destructive text-sm">{cvErrors.cv}</span>}
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            disabled={processingCv}
          >
            Upload CV
          </button>
        </form>

        {/* Project List */}
        <h2 className="text-xl mb-4">Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img
                src={project.image ? `/storage/${project.image}` : 'https://via.placeholder.com/300x200'}
                alt={project.title}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-2 flex gap-2">
                {project.github_link && (
                  <a href={project.github_link} className="text-primary mr-2">
                    GitHub
                  </a>
                )}
                {project.demo_link && (
                  <a href={project.demo_link} className="text-primary">
                    Démo
                  </a>
                )}
                <button
                  type="button"
                  className="text-red-600 ml-2"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Skill List */}
        <h2 className="text-xl mb-4">Compétences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map(skill => (
            <div key={skill.id} className="project-card">
              <span>{skill.name} - {skill.level}</span>
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}