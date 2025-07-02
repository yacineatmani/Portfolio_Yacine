import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface SkillFormData {
  name: string;
  level: 'débutant' | 'confirmé' | 'expert';
  category: string;
}

interface SkillFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SkillFormData) => void;
  isSubmitting?: boolean;
}

export function SkillForm({ isOpen, onClose, onSubmit, isSubmitting = false }: SkillFormProps) {
  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    level: 'débutant',
    category: 'Frontend'
  });

  const [errors, setErrors] = useState<Partial<SkillFormData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<SkillFormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        name: '',
        level: 'débutant',
        category: 'Frontend'
      });
    }
  };

  const handleChange = (field: keyof SkillFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Nouvelle Compétence
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom de la compétence *"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            placeholder="React, TypeScript, Design..."
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Niveau
            </label>
            <select
              value={formData.level}
              onChange={(e) => handleChange('level', e.target.value as SkillFormData['level'])}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="débutant">Débutant</option>
              <option value="confirmé">Confirmé</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <Input
            label="Catégorie"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            placeholder="Frontend, Backend, Design..."
          />

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