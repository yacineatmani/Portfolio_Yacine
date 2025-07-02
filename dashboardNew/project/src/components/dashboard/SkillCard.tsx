import React from 'react';
import { Trash2 } from 'lucide-react';
import { Skill } from '../../types/dashboard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SkillCardProps {
  skill: Skill;
  onDelete: (id: number) => void;
}

export function SkillCard({ skill, onDelete }: SkillCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'débutant': return 'bg-green-500';
      case 'confirmé': return 'bg-blue-500';
      case 'expert': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'débutant': return 'w-1/3';
      case 'confirmé': return 'w-2/3';
      case 'expert': return 'w-full';
      default: return 'w-0';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {skill.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize mt-1">
            {skill.level} • {skill.category}
          </p>
          
          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`} />
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(skill.id)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 ml-4"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}