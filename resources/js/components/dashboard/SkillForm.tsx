import React from 'react';
import { useForm } from '@inertiajs/react';

interface SkillFormProps {
  onClose: () => void;
  isOpen: boolean;
  onSubmit?: (data: any) => void;
}

interface SkillFormData {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skillCategories = [
  { value: 'Frontend', label: 'Frontend', icon: 'web' },
  { value: 'Backend', label: 'Backend', icon: 'storage' },
  { value: 'Mobile', label: 'Mobile', icon: 'phone_android' },
  { value: 'Database', label: 'Base de données', icon: 'data_object' },
  { value: 'Design', label: 'Design', icon: 'palette' },
  { value: 'Tools', label: 'Outils', icon: 'build' },
  { value: 'Other', label: 'Autre', icon: 'code' },
];

const skillIcons = [
  'code', 'web', 'storage', 'data_object', 'phone_android', 'palette', 'build',
  'terminal', 'api', 'cloud', 'security', 'bug_report', 'extension', 'integration_instructions'
];

export function SkillForm({ onClose, isOpen, onSubmit }: SkillFormProps) {
  const { data, setData, post, processing, errors, reset } = useForm<SkillFormData>({
    name: '',
    level: 50,
    category: 'Frontend',
    icon: 'code',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      // Mode démo avec onSubmit fourni
      onSubmit(data);
    } else {
      // Mode Laravel/Inertia
      post('/skills', {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getProgressColor = (level: number) => {
    if (level >= 80) return 'from-green-400 to-emerald-500';
    if (level >= 60) return 'from-blue-400 to-indigo-500';
    if (level >= 40) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-icons text-2xl">add_circle</span>
              <h2 className="text-xl font-semibold">Nouvelle Compétence</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom de la compétence *
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="React, Laravel, Photoshop..."
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Catégorie *
            </label>
            <select
              value={data.category}
              onChange={(e) => setData('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            >
              {skillCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Icon */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Icône
            </label>
            <div className="grid grid-cols-7 gap-2">
              {skillIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setData('icon', icon)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    data.icon === icon
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <span className="material-icons text-xl">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Niveau de maîtrise: {data.level}%
            </label>
            
            {/* Preview */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <span className="material-icons text-white text-sm">{data.icon}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.name || 'Nom de la compétence'}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${getProgressColor(data.level)} transition-all duration-300 rounded-full`}
                  style={{ width: `${data.level}%` }}
                ></div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={data.level}
              onChange={(e) => setData('level', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            
            {/* Quick level buttons */}
            <div className="flex gap-2">
              {[25, 50, 75, 100].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setData('level', level)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    data.level === level
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {level}%
                </button>
              ))}
            </div>
            
            {errors.level && (
              <p className="text-red-500 text-sm">{errors.level}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <span className="animate-spin material-icons text-sm">refresh</span>
                  Création...
                </>
              ) : (
                <>
                  <span className="material-icons text-sm">add</span>
                  Créer la compétence
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
