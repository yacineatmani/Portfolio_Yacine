import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Card } from '../ui/Card';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string;
  github_link: string;
  demo_link: string;
  image: File | null;
}

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
  isSubmitting?: boolean;
}

export function ProjectForm({ isOpen, onClose, onSubmit, isSubmitting = false }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    technologies: '',
    github_link: '',
    demo_link: '',
    image: null
  });

  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Partial<ProjectFormData> = {};
    if (!formData.title.trim()) newErrors.title = 'Le titre est requis';
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        github_link: '',
        demo_link: '',
        image: null
      });
    }
  };

  const handleChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Nouveau Projet
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Titre *"
              value={formData.title}  
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              placeholder="Mon super projet"
            />
            <Input
              label="Technologies"
              value={formData.technologies}
              onChange={(e) => handleChange('technologies', e.target.value)}
              placeholder="React, TypeScript, Tailwind..."
            />
          </div>

          <Textarea
            label="Description *"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            error={errors.description}
            rows={4}
            placeholder="Décrivez votre projet..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Lien GitHub"
              value={formData.github_link}
              onChange={(e) => handleChange('github_link', e.target.value)}
              placeholder="https://github.com/..."
            />
            <Input
              label="Lien Demo"
              value={formData.demo_link}
              onChange={(e) => handleChange('demo_link', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image du projet
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleChange('image', e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}