// import React, { useState } from 'react';
// import { Head, useForm, PageProps, Link } from '@inertiajs/react';
// import { motion } from 'framer-motion';
// import { FaSun, FaMoon } from 'react-icons/fa';
// import Sidebar from '../components/Sidebar';
// import Topbar from '../components/Topbar';
// import Footer from '../components/Footer';
// import { useSnackbar, withSnackbarProvider } from '../components/Notifier';
// import { RippleButton } from '../components/RippleButton';
// import TextInput from '../components/TextInput';
// import InputLabel from '../components/InputLabel';
// import InputError from '../components/InputError';
// import { Transition } from '@headlessui/react';
// import ParticlesBackground from '../components/ParticlesBackground';
// import '@/../css/dashboard.css';

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   photo?: string;
//   cv_path?: string;
// }

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   technologies: string;
//   github_link?: string;
//   demo_link?: string;
//   image?: string;
// }

// interface Skill {
//   id: number;
//   name: string;
//   level: string;
//   category: string;
// }

// interface DashboardPageProps extends PageProps {
//   auth: { user: User };
//   projects: Project[];
//   skills: Skill[];
// }

// function Dashboard({ auth, projects = [], skills = [] }: DashboardPageProps) {
//   const { user } = auth;
//   const [showProjectForm, setShowProjectForm] = useState(false);
//   const [showSkillForm, setShowSkillForm] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);
//   const snackbar = useSnackbar();

//   // Toggle dark mode
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   const projectForm = useForm({
//     title: '',
//     description: '',
//     technologies: '',
//     github_link: '',
//     demo_link: '',
//     image: null as File | null,
//   });

//   const skillForm = useForm({
//     name: '',
//     level: 'débutant',
//     category: 'Frontend',
//   });

//   const cvForm = useForm({
//     cv: null as File | null,
//   });

//   const handleProjectSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     projectForm.post(route('dashboard.projects.store'), {
//       forceFormData: true,
//       onSuccess: () => {
//         projectForm.reset();
//         setShowProjectForm(false);
//         snackbar.success('Projet ajouté avec succès !');
//       },
//       onError: () => snackbar.error('Erreur lors de l\'ajout du projet.'),
//     });
//   };

//   const handleSkillSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     skillForm.post(route('dashboard.skills.store'), {
//       onSuccess: () => {
//         skillForm.reset();
//         setShowSkillForm(false);
//         snackbar.success('Compétence ajoutée avec succès !');
//       },
//       onError: () => snackbar.error('Erreur lors de l\'ajout de la compétence.'),
//     });
//   };

//   const handleCvUpload = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!cvForm.data.cv) return;
//     cvForm.post(route('dashboard.cv.store'), {
//       forceFormData: true,
//       onSuccess: () => {
//         cvForm.reset('cv');
//         snackbar.success('CV mis à jour !');
//       },
//       onError: () => snackbar.error('Erreur lors de la mise à jour du CV.'),
//     });
//   };

//   const handleDeleteProject = (id: number) => {
//     if (confirm('Supprimer ce projet ?')) {
//       const form = useForm({});
//       form.delete(route('dashboard.projects.destroy', id), {
//         onSuccess: () => snackbar.success('Projet supprimé !'),
//         onError: () => snackbar.error('Erreur lors de la suppression.'),
//       });
//     }
//   };

//   const handleDeleteSkill = (id: number) => {
//     if (confirm('Supprimer cette compétence ?')) {
//       const form = useForm({});
//       form.delete(route('dashboard.skills.destroy', id), {
//         onSuccess: () => snackbar.success('Compétence supprimée !'),
//         onError: () => snackbar.error('Erreur lors de la suppression.'),
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-900 relative">
//       <Head title="Dashboard" />
//       <ParticlesBackground />

//       {/* Bouton Dark/Light Mode */}
//       <div className="fixed top-4 right-4 z-50">
//         <motion.button
//           onClick={toggleDarkMode}
//           className={`p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
//             darkMode ? 'bg-indigo-600' : 'bg-gray-800'
//           }`}
//           whileHover={{ scale: 1.1, rotate: 360 }}
//           whileTap={{ scale: 0.95 }}
//           aria-label="Basculer le mode sombre"
//         >
//           {darkMode ? <FaSun className="text-white" size={20} /> : <FaMoon className="text-white" size={20} />}
//         </motion.button>
//       </div>

//       {/* Overlay pour mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//           aria-hidden="true"
//         />
//       )}

//       {/* Topbar */}
//       <Topbar onMenuClick={() => setSidebarOpen(true)} user={user} />

//       <div className="flex">
//         {/* Sidebar verticale avec photo */}
//         <aside
//           className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto ${
//             sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           }`}
//         >
//           <div className="p-6 space-y-6">
//             {/* Photo de profil */}
//             <div className="text-center">
//               <div className="relative inline-block">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
//                 <img
//                   src={user.photo ? `/storage/${user.photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
//                   alt="Photo de profil"
//                   className="relative w-32 h-32 rounded-full object-cover shadow-xl bg-white border-4 border-white"
//                 />
//               </div>
//               <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
//               <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
//             </div>

//             {/* Navigation */}
//             <nav className="space-y-3">
//               <Link href="/">
//                 <RippleButton
//                   className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg rounded-2xl px-6 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-3 justify-center transform hover:scale-105"
//                   aria-label="Retour à l'accueil"
//                 >
//                   <span className="material-icons">home</span>
//                   <span>Retour à l'accueil</span>
//                 </RippleButton>
//               </Link>

//               <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
//                 <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
//                   <span className="material-icons text-indigo-600">dashboard</span>
//                   Navigation
//                 </h4>
//                 <div className="space-y-2 text-sm">
//                   <a href="#projects" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
//                     <span className="material-icons text-lg">work</span>
//                     Mes Projets
//                   </a>
//                   <a href="#skills" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 справка transition-colors">
//                     <span className="material-icons text-lg">psychology</span>
//                     Mes Compétences
//                   </a>
//                   <a href="#cv" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
//                     <span className="material-icons text-lg">description</span>
//                     Mon CV
//                   </a>
//                 </div>
//               </div>

//               {/* Stats rapides */}
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-4">
//                 <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
//                   <span className="material-icons text-indigo-600">analytics</span>
//                   Statistiques
//                 </h4>
//                 <div className="grid grid-cols-2 gap-3 text-center">
//                   <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-indigo-600">{projects.length}</div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 rounded-xl p-3">
//                     <div className="text-2xl font-bold text-purple-600">{skills.length}</div>
//                     <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
//                   </div>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </aside>

//         {/* Contenu principal */}
//         <main className="flex-1 relative z-10 lg:ml-80">
//           <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
//             {/* Header avec bouton accueil plus visible */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
//                   Dashboard
//                 </h1>
//                 <p className="text-gray-600 dark:text-gray-300">Gérez votre portfolio professionnel</p>
//               </div>
//               <div className="flex gap-3">
//                 <Link href="/">
//                   <RippleButton
//                     className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg rounded-2xl px-8 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-3 transform hover:scale-105 text-lg"
//                     aria-label="Retour à l'accueil"
//                   >
//                     <span className="material-icons text-xl">home</span>
//                     <span>Accueil</span>
//                   </RippleButton>
//                 </Link>
//                 <Link href="/profile">
//                   <RippleButton
//                     className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg rounded-2xl px-6 py-4 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
//                     aria-label="Mon profil"
//                   >
//                     <span className="material-icons">person</span>
//                     <span>Profil</span>
//                   </RippleButton>
//                 </Link>
//               </div>
//             </div>

//             {/* Profil Header moderne */}
//             <div className="mb-8">
//               <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
//                 <div className="flex flex-col md:flex-row items-center gap-6">
//                   <div className="relative">
//                     <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 animate-pulse"></div>
//                     <img
//                       src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
//                       alt="Photo de profil"
//                       className="relative w-28 h-28 rounded-full object-cover shadow-xl bg-white border-4 border-white"
//                     />
//                   </div>
//                   <div className="text-center md:text-left">
//                     <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3 justify-center md:justify-start">
//                       <span className="material-icons text-indigo-600 text-4xl">person</span>
//                       Bonjour, {user.name} 👋
//                     </h2>
//                     <p className="text-lg text-gray-600 dark:text-gray-300">Bienvenue dans votre espace d'administration</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contenu principal en grille */}
//             <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
//               {/* Section principale (Projets et Compétences) */}
//               <div className="xl:col-span-3 space-y-8">
//                 {/* Section Projets modernisée */}
//                 <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
//                         <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
//                           <span className="material-icons text-white">work</span>
//                         </div>
//                         Mes Projets
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300">Gérez vos réalisations</p>
//                     </div>
//                     <RippleButton
//                       onClick={() => setShowProjectForm(!showProjectForm)}
//                       className={`${
//                         showProjectForm
//                           ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
//                           : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
//                       } shadow-lg rounded-2xl px-6 py-3 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105`}
//                       aria-label="Ajouter un projet"
//                     >
//                       <span className="material-icons">{showProjectForm ? 'close' : 'add'}</span>
//                       {showProjectForm ? 'Annuler' : 'Nouveau Projet'}
//                     </RippleButton>
//                   </div>

//                   <Transition
//                     show={showProjectForm}
//                     enter="transition-all duration-300 ease-out"
//                     enterFrom="opacity-0 transform -translate-y-4 scale-95"
//                     enterTo="opacity-100 transform translate-y-0 scale-100"
//                     leave="transition-all duration-200 ease-in"
//                     leaveFrom="opacity-100 transform translate-y-0 scale-100"
//                     leaveTo="opacity-0 transform -translate-y-4 scale-95"
//                   >
//                     <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900/50 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-indigo-800/50">
//                       <form onSubmit={handleProjectSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <InputLabel htmlFor="title" value="Titre du projet" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <TextInput
//                               id="title"
//                               value={projectForm.data.title}
//                               onChange={(e) => projectForm.setData('title', e.target.value)}
//                               placeholder="Ex: Mon super projet"
//                               className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
//                               required
//                             />
//                             <InputError message={projectForm.errors.title} />
//                           </div>
//                           <div>
//                             <InputLabel htmlFor="technologies" value="Technologies utilisées" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <TextInput
//                               id="technologies"
//                               value={projectForm.data.technologies}
//                               onChange={(e) => projectForm.setData('technologies', e.target.value)}
//                               placeholder="React, Laravel, TypeScript..."
//                               className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
//                             />
//                           </div>
//                         </div>
//                         <div>
//                           <InputLabel htmlFor="description" value="Description" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                           <textarea
//                             id="description"
//                             value={projectForm.data.description}
//                             onChange={(e) => projectForm.setData('description', e.target.value)}
//                             placeholder="Décrivez votre projet..."
//                             className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             rows={4}
//                             required
//                           />
//                           <InputError message={projectForm.errors.description} />
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <InputLabel htmlFor="github_link" value="Lien GitHub" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <TextInput
//                               id="github_link"
//                               value={projectForm.data.github_link}
//                               onChange={(e) => projectForm.setData('github_link', e.target.value)}
//                               placeholder="https://github.com/username/project"
//                               className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-500"
//                             />
//                             <InputError message={projectForm.errors.github_link} />
//                           </div>
//                           <div>
//                             <InputLabel htmlFor="image" value="Image du projet" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <input
//                               type="file"
//                               id="image"
//                               onChange={(e) => projectForm.setData('image', e.target.files ? e.target.files[0] : null)}
//                               className="mt-2 block w-full text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600 focus:border-indigo-500 p-2"
//                               accept="image/*"
//                             />
//                             <InputError message={projectForm.errors.image} />
//                           </div>
//                         </div>
//                         <RippleButton
//                           type="submit"
//                           disabled={projectForm.processing}
//                           className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg rounded-2xl py-4 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02]"
//                           aria-label="Enregistrer le projet"
//                         >
//                           <span className="material-icons">save</span>
//                           <span>Enregistrer le projet</span>
//                         </RippleButton>
//                       </form>
//                     </div>
//                   </Transition>

//                   {/* Liste des projets en cards */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {projects.map((project, index) => (
//                       <div
//                         key={project.id}
//                         className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:scale-[1.02] min-h-[400px] flex flex-col"
//                       >
//                         {/* Image du projet */}
//                         <div className="relative h-48 w-full overflow-hidden">
//                           {project.image ? (
//                             <img
//                               src={`/storage/${project.image}`}
//                               alt={project.title}
//                               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                               loading="lazy"
//                               onError={(e) => {
//                                 e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+non+disponible';
//                                 console.error(`Erreur de chargement de l'image pour le projet ${project.title}`);
//                               }}
//                             />
//                           ) : (
//                             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600">
//                               <div className="text-center text-white">
//                                 <span className="material-icons text-4xl opacity-80 mb-2">code</span>
//                                 <p className="font-semibold text-sm opacity-90">Projet</p>
//                               </div>
//                             </div>
//                           )}
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//                         </div>

//                         {/* Contenu de la card */}
//                         <div className="p-4 flex flex-col flex-1">
//                           <div className="flex items-start justify-between mb-2">
//                             <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 pr-2">
//                               {project.title}
//                             </h4>
//                             <RippleButton
//                               onClick={() => handleDeleteProject(project.id)}
//                               className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex-shrink-0"
//                               aria-label="Supprimer le projet"
//                             >
//                               <span className="material-icons text-sm">delete</span>
//                             </RippleButton>
//                           </div>

//                           <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3 flex-1">
//                             {project.description}
//                           </p>

//                           {/* Technologies */}
//                           {project.technologies && (
//                             <div className="flex flex-wrap gap-1.5 mb-3">
//                               {project.technologies.split(',').slice(0, 3).map((tech, techIndex) => (
//                                 <span
//                                   key={techIndex}
//                                   className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700"
//                                 >
//                                   {tech.trim()}
//                                 </span>
//                               ))}
//                               {project.technologies.split(',').length > 3 && (
//                                 <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs font-medium">
//                                   +{project.technologies.split(',').length - 3}
//                                 </span>
//                               )}
//                             </div>
//                           )}

//                           {/* Actions */}
//                           <div className="flex gap-2 mt-auto">
//                             {project.github_link && (
//                               <a
//                                 href={project.github_link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md transform hover:scale-105"
//                               >
//                                 <span className="material-icons text-base">code</span>
//                                 <span>GitHub</span>
//                               </a>
//                             )}
//                             {project.demo_link && (
//                               <a
//                                 href={project.demo_link}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md transform hover:scale-105"
//                               >
//                                 <span className="material-icons text-base">visibility</span>
//                                 <span>Demo</span>
//                               </a>
//                             )}
//                           </div>
//                         </div>

//                         {/* Badge numéro */}
//                         <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white font-semibold text-xs w-6 h-6 rounded-full flex items-center justify-center shadow-md">
//                           {index + 1}
//                         </div>
//                       </div>
//                     ))}
//                     {!projects.length && (
//                       <div className="col-span-full text-center py-12">
//                         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full inline-block mb-4">
//                           <span className="material-icons text-4xl text-gray-400">work_off</span>
//                         </div>
//                         <p className="text-gray-500 dark:text-gray-400">Aucun projet pour le moment.</p>
//                         <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Ajoutez vos réalisations !</p>
//                       </div>
//                     )}
//                   </div>
//                 </section>

//                 {/* Section Compétences modernisée */}
//                 <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//                     <div>
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
//                         <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
//                           <span className="material-icons text-white">psychology</span>
//                         </div>
//                         Mes Compétences
//                       </h3>
//                       <p className="text-gray-600 dark:text-gray-300">Vos expertises techniques</p>
//                     </div>
//                     <RippleButton
//                       onClick={() => setShowSkillForm(!showSkillForm)}
//                       className={`${
//                         showSkillForm
//                           ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
//                           : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
//                       } shadow-lg rounded-2xl px-6 py-3 text-white font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105`}
//                       aria-label="Ajouter une compétence"
//                     >
//                       <span className="material-icons">{showSkillForm ? 'close' : 'add'}</span>
//                       {showSkillForm ? 'Annuler' : 'Nouvelle Compétence'}
//                     </RippleButton>
//                   </div>

//                   <Transition
//                     show={showSkillForm}
//                     enter="transition-all duration-300 ease-out"
//                     enterFrom="opacity-0 transform -translate-y-4 scale-95"
//                     enterTo="opacity-100 transform translate-y-0 scale-100"
//                     leave="transition-all duration-200 ease-in"
//                     leaveFrom="opacity-100 transform translate-y-0 scale-100"
//                     leaveTo="opacity-0 transform -translate-y-4 scale-95"
//                   >
//                     <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900/50 dark:to-purple-900/20 rounded-2xl border border-purple-200 dark:border-purple-800/50">
//                       <form onSubmit={handleSkillSubmit} className="space-y-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           <div>
//                             <InputLabel htmlFor="name" value="Nom de la compétence" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <TextInput
//                               id="name"
//                               value={skillForm.data.name}
//                               onChange={(e) => skillForm.setData('name', e.target.value)}
//                               placeholder="Ex: React, PHP, Design..."
//                               className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-purple-500"
//                               required
//                             />
//                             <InputError message={skillForm.errors.name} />
//                           </div>
//                           <div>
//                             <InputLabel htmlFor="level" value="Niveau de maîtrise" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                             <select
//                               id="level"
//                               value={skillForm.data.level}
//                               onChange={(e) => skillForm.setData('level', e.target.value)}
//                               className="mt-2 block w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//                             >
//                               <option value="débutant">🌟 Débutant</option>
//                               <option value="confirmé">⭐ Confirmé</option>
//                               <option value="expert">🚀 Expert</option>
//                             </select>
//                             <InputError message={skillForm.errors.level} />
//                           </div>
//                         </div>
//                         <RippleButton
//                           type="submit"
//                           disabled={skillForm.processing}
//                           className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg rounded-2xl py-4 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02]"
//                           aria-label="Enregistrer la compétence"
//                         >
//                           <span className="material-icons">save</span>
//                           <span>Enregistrer la compétence</span>
//                         </RippleButton>
//                       </form>
//                     </div>
//                   </Transition>

//                   {/* Liste des compétences */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {skills.map((skill) => (
//                       <div
//                         key={skill.id}
//                         className="group bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-600 transform hover:scale-[1.02]"
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <div className="flex-1">
//                             <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3 mb-2">
//                               <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
//                                 <span className="material-icons text-white text-lg">star</span>
//                               </div>
//                               {skill.name}
//                             </h4>
//                             <div className="flex items-center gap-2">
//                               <span className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
//                                 {skill.level === 'débutant' && '🌟 Débutant'}
//                                 {skill.level === 'confirmé' && '⭐ Confirmé'}
//                                 {skill.level === 'expert' && '🚀 Expert'}
//                               </span>
//                             </div>
//                           </div>
//                           <RippleButton
//                             onClick={() => handleDeleteSkill(skill.id)}
//                             className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-2 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
//                             aria-label="Supprimer la compétence"
//                           >
//                             <span className="material-icons text-lg">delete</span>
//                           </RippleButton>
//                         </div>
//                         {/* Barre de progression basée sur le niveau */}
//                         <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                           <div
//                             className={`h-2 rounded-full transition-all duration-500 ${
//                               skill.level === 'débutant' ? 'bg-gradient-to-r from-green-400 to-green-500 w-1/3' :
//                               skill.level === 'confirmé' ? 'bg-gradient-to-r from-blue-400 to-blue-500 w-2/3' :
//                               'bg-gradient-to-r from-purple-400 to-purple-500 w-full'
//                             }`}
//                           ></div>
//                         </div>
//                       </div>
//                     ))}
//                     {!skills.length && (
//                       <div className="col-span-full text-center py-12">
//                         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full inline-block mb-4">
//                           <span className="material-icons text-4xl text-gray-400">psychology_off</span>
//                         </div>
//                         <p className="text-gray-500 dark:text-gray-400">Aucune compétence pour le moment.</p>
//                         <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Ajoutez vos expertises techniques !</p>
//                       </div>
//                     )}
//                   </div>
//                 </section>
//               </div>

//               {/* Sidebar CV */}
//               <aside className="xl:col-span-1">
//                 <div className="sticky top-24">
//                   <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
//                     <div className="text-center mb-8">
//                       <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl inline-block mb-4">
//                         <span className="material-icons text-white text-3xl">description</span>
//                       </div>
//                       <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mon CV</h3>
//                       <p className="text-gray-600 dark:text-gray-300">Gérez votre curriculum vitae</p>
//                     </div>

//                     <form onSubmit={handleCvUpload} className="space-y-6">
//                       <div>
//                         <InputLabel htmlFor="cv" value="Nouveau CV (PDF)" className="text-gray-700 dark:text-gray-200 font-semibold" />
//                         <input
//                           type="file"
//                           id="cv"
//                           onChange={(e) => cvForm.setData('cv', e.target.files ? e.target.files[0] : null)}
//                           className="mt-2 block w-full text-gray-900 dark:text-white rounded-xl border border-gray-300 dark:border-gray-600 focus:border-indigo-500 p-3"
//                           accept=".pdf,.doc,.docx"
//                         />
//                         <InputError message={cvForm.errors.cv} />
//                       </div>
//                       <RippleButton
//                         type="submit"
//                         disabled={cvForm.processing || !cvForm.data.cv}
//                         className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg rounded-2xl py-4 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//                         aria-label="Mettre à jour le CV"
//                       >
//                         <span className="material-icons">upload_file</span>
//                         <span>Mettre à jour</span>
//                       </RippleButton>
//                     </form>

//                     {user.cv_path && (
//                       <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
//                         <div className="flex items-center gap-3 mb-3">
//                           <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
//                             <span className="material-icons text-white text-lg">check_circle</span>
//                           </div>
//                           <span className="font-semibold text-emerald-800 dark:text-emerald-200">CV disponible</span>
//                         </div>
//                         <a
//                           href={`/storage/${user.cv_path}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium transition-colors"
//                         >
//                           <span className="material-icons text-lg">visibility</span>
//                           <span>Voir mon CV</span>
//                         </a>
//                       </div>
//                     )}
//                   </section>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// // Exporter le composant enveloppé avec le provider de notifications
// export default withSnackbarProvider(Dashboard);
import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { useSnackbar, withSnackbarProvider } from '../components/Notifier';
import { RippleButton } from '../components/RippleButton';
import TextInput from '../components/TextInput';
import InputLabel from '../components/InputLabel';
import InputError from '../components/InputError';
import { Transition } from '@headlessui/react';
import ParticlesBackground from '../components/ParticlesBackground';
import '@/../css/dashboard.css';

interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  cv_path?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  github_link?: string;
  demo_link?: string;
  image?: string;
}

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
}

interface DashboardPageProps {
  auth: { user: User };
  projects: Project[];
  skills: Skill[];
}

function Dashboard({ auth, projects = [], skills = [] }: DashboardPageProps) {
  const { user } = auth;
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { success, error } = useSnackbar();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const projectForm = useForm({
    title: '',
    description: '',
    technologies: '',
    github_link: '',
    demo_link: '',
    image: null as File | null,
  });

  const skillForm = useForm({
    name: '',
    level: 'débutant',
    category: 'Frontend',
  });

  const cvForm = useForm({
    cv: null as File | null,
  });

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    projectForm.post(route('dashboard.projects.store'), {
      forceFormData: true,
      onSuccess: () => {
        projectForm.reset();
        setShowProjectForm(false);
        success('Projet ajouté !');
      },
      onError: () => error('Erreur lors de l\'ajout du projet.'),
    });
  };

  const handleSkillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    skillForm.post(route('dashboard.skills.store'), {
      onSuccess: () => {
        skillForm.reset();
        setShowSkillForm(false);
        success('Compétence ajoutée !');
      },
      onError: () => error('Erreur lors de l\'ajout de la compétence.'),
    });
  };

  const handleCvUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvForm.data.cv) return;
    cvForm.post(route('dashboard.cv.store'), {
      forceFormData: true,
      onSuccess: () => {
        cvForm.reset('cv');
        success('CV mis à jour !');
      },
      onError: () => error('Erreur lors de la mise à jour du CV.')
    });
  };

  const handleDeleteProject = (id: number) => {
    if (confirm('Supprimer ce projet ?')) {
      const form = useForm({});
      form.delete(route('dashboard.projects.destroy', id), {
        onSuccess: () => success('Projet supprimé !'),
        onError: () => error('Erreur lors de la suppression.'),
      });
    }
  };

  const handleDeleteSkill = (id: number) => {
    if (confirm('Supprimer cette compétence ?')) {
      const form = useForm({});
      form.delete(route('dashboard.skills.destroy', id), {
        onSuccess: () => success('Compétence supprimée !'),
        onError: () => error('Erreur lors de la suppression.'),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head title="Dashboard" />
      <ParticlesBackground />

      <motion.button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-indigo-600 dark:bg-gray-800 text-white shadow-md hover:bg-indigo-700 dark:hover:bg-gray-700 transition"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Basculer le mode sombre"
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Topbar onMenuClick={() => setSidebarOpen(true)} user={user} />

      <div className="flex">
        <aside
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 z-40 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 space-y-6">
            <div className="text-center">
              <img
                src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                alt="Photo de profil"
                className="w-24 h-24 rounded-full mx-auto shadow-md border-2 border-indigo-500"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>

            <nav className="space-y-2">
              <Link href="/" className="block text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium">
                Accueil
              </Link>
              <a href="#projects" className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Projets
              </a>
              <a href="#skills" className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Compétences
              </a>
              <a href="#cv" className="block text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                CV
              </a>
            </nav>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Statistiques</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-indigo-600">{projects.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Projets</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-indigo-600">{skills.length}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Compétences</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <div className="flex gap-2">
                <Link href="/" className="action-btn">Accueil</Link>
                <Link href="/profile" className="action-btn">Profil</Link>
              </div>
            </div>

            <section className="glass-card">
              <div className="profile-header">
                <img
                  src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff`}
                  alt="Photo de profil"
                  className="profile-photo"
                />
                <div className="profile-info">
                  <h2 className="name">Bonjour, {user.name}</h2>
                  <p className="status">Espace d'administration</p>
                </div>
              </div>
            </section>

            <div className="dashboard-main-grid">
              <div className="space-y-8">
                <section className="glass-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Projets</h3>
                    <RippleButton
                      onClick={() => setShowProjectForm(!showProjectForm)}
                      className={`action-btn ${showProjectForm ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    >
                      {showProjectForm ? 'Annuler' : 'Nouveau Projet'}
                    </RippleButton>
                  </div>

                  <Transition
                    show={showProjectForm}
                    enter="transition duration-300"
                    enterFrom="opacity-0 -translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-4"
                  >
                    <form onSubmit={handleProjectSubmit} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputLabel htmlFor="title" value="Titre" />
                          <TextInput
                            id="title"
                            value={projectForm.data.title}
                            onChange={(e) => projectForm.setData('title', e.target.value)}
                            required
                          />
                          <InputError message={projectForm.errors.title} />
                        </div>
                        <div>
                          <InputLabel htmlFor="technologies" value="Technologies" />
                          <TextInput
                            id="technologies"
                            value={projectForm.data.technologies}
                            onChange={(e) => projectForm.setData('technologies', e.target.value)}
                            placeholder="React, Laravel..."
                          />
                        </div>
                      </div>
                      <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                          id="description"
                          value={projectForm.data.description}
                          onChange={(e) => projectForm.setData('description', e.target.value)}
                          className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          rows={4}
                          required
                        />
                        <InputError message={projectForm.errors.description} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputLabel htmlFor="github_link" value="GitHub" />
                          <TextInput
                            id="github_link"
                            value={projectForm.data.github_link}
                            onChange={(e) => projectForm.setData('github_link', e.target.value)}
                            placeholder="https://github.com/..."
                          />
                        </div>
                        <div>
                          <InputLabel htmlFor="image" value="Image" />
                          <input
                            type="file"
                            id="image"
                            onChange={(e) => projectForm.setData('image', e.target.files ? e.target.files[0] : null)}
                            className="w-full"
                            accept="image/*"
                          />
                          <InputError message={projectForm.errors.image} />
                        </div>
                      </div>
                      <RippleButton type="submit" disabled={projectForm.processing} className="action-btn">
                        Enregistrer
                      </RippleButton>
                    </form>
                  </Transition>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project, index) => (
                      <div key={project.id} className="glass-card p-4">
                        {project.image ? (
                          <img
                            src={`/storage/${project.image}`}
                            alt={project.title}
                            className="w-full h-40 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            Projet
                          </div>
                        )}
                        <h4 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.split(',').slice(0, 3).map((tech, i) => (
                            <span key={i} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          {project.github_link && (
                            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="action-btn flex-1 text-center">
                              GitHub
                            </a>
                          )}
                          {project.demo_link && (
                            <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="action-btn flex-1 text-center">
                              Demo
                            </a>
                          )}
                          <RippleButton onClick={() => handleDeleteProject(project.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                            <span className="material-icons">delete</span>
                          </RippleButton>
                        </div>
                      </div>
                    ))}
                    {!projects.length && (
                      <div className="col-span-full text-center p-8">
                        <p className="text-gray-500 dark:text-gray-400">Aucun projet. Ajoutez-en un !</p>
                      </div>
                    )}
                  </div>
                </section>

                <section className="glass-card">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Compétences</h3>
                    <RippleButton
                      onClick={() => setShowSkillForm(!showSkillForm)}
                      className={`action-btn ${showSkillForm ? 'bg-red-600 hover:bg-red-700' : ''}`}
                    >
                      {showSkillForm ? 'Annuler' : 'Nouvelle Compétence'}
                    </RippleButton>
                  </div>

                  <Transition
                    show={showSkillForm}
                    enter="transition duration-300"
                    enterFrom="opacity-0 -translate-y-4"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-4"
                  >
                    <form onSubmit={handleSkillSubmit} className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputLabel htmlFor="name" value="Compétence" />
                          <TextInput
                            id="name"
                            value={skillForm.data.name}
                            onChange={(e) => skillForm.setData('name', e.target.value)}
                            required
                          />
                          <InputError message={skillForm.errors.name} />
                        </div>
                        <div>
                          <InputLabel htmlFor="level" value="Niveau" />
                          <select
                            id="level"
                            value={skillForm.data.level}
                            onChange={(e) => skillForm.setData('level', e.target.value)}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          >
                            <option value="débutant">Débutant</option>
                            <option value="confirmé">Confirmé</option>
                            <option value="expert">Expert</option>
                          </select>
                        </div>
                      </div>
                      <RippleButton type="submit" disabled={skillForm.processing} className="action-btn">
                        Enregistrer
                      </RippleButton>
                    </form>
                  </Transition>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="glass-card p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{skill.level}</p>
                          </div>
                          <RippleButton onClick={() => handleDeleteSkill(skill.id)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full">
                            <span className="material-icons">delete</span>
                          </RippleButton>
                        </div>
                        <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              skill.level === 'débutant' ? 'bg-green-500 w-1/3' : skill.level === 'confirmé' ? 'bg-blue-500 w-2/3' : 'bg-purple-500 w-full'
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                    {!skills.length && (
                      <div className="col-span-full text-center p-8">
                        <p className="text-gray-500 dark:text-gray-400">Aucune compétence. Ajoutez-en une !</p>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              <aside className="sticky top-24">
                <section className="glass-card p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">CV</h3>
                  <form onSubmit={handleCvUpload} className="space-y-4">
                    <div>
                      <InputLabel htmlFor="cv" value="Nouveau CV (PDF)" />
                      <input
                        type="file"
                        id="cv"
                        onChange={(e) => cvForm.setData('cv', e.target.files ? e.target.files[0] : null)}
                        className="w-full"
                        accept=".pdf,.doc,.docx"
                      />
                      <InputError message={cvForm.errors.cv} />
                    </div>
                    <RippleButton type="submit" disabled={cvForm.processing || !cvForm.data.cv} className="action-btn w-full">
                      Mettre à jour
                    </RippleButton>
                  </form>
                  {user.cv_path && (
                    <div className="mt-4">
                      <a href={`/storage/${user.cv_path}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Voir mon CV
                      </a>
                    </div>
                  )}
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default withSnackbarProvider(Dashboard);