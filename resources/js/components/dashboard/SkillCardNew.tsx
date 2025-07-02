import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '../ui/DashboardButton';

interface Skill {
  id: number;
  name: string;
  level: string;
  category: string;
  icon?: string;
}

interface SkillCardProps {
  skill: Skill;
  onDelete: (id: number) => void;
}

export function SkillCard({ skill, onDelete }: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'débutant': return 'bg-green-500';
      case 'confirmé': return 'bg-blue-500';
      case 'expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level.toLowerCase()) {
      case 'débutant': return 'w-1/3';
      case 'confirmé': return 'w-2/3';
      case 'expert': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <div className="skill-card-ultra bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-2 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="skill-title-ultra text-sm font-semibold text-gray-900 dark:text-white truncate">
            {skill.name}
          </h3>
          <p className="skill-level-ultra text-xs text-gray-600 dark:text-gray-400 capitalize truncate">
            {skill.level}
          </p>
          
          {/* Progress bar - Ultra compact */}
          <div className="mt-1">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div className={`h-1 rounded-full transition-all duration-300 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`} />
            </div>
          </div>
        </div>          <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(skill.id)}
          className="button-ultra text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2 p-1 h-6"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
