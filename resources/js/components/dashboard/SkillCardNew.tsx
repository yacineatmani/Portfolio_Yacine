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
            case 'débutant':
                return 'bg-green-500';
            case 'confirmé':
                return 'bg-blue-500';
            case 'expert':
                return 'bg-purple-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getLevelWidth = (level: string) => {
        switch (level.toLowerCase()) {
            case 'débutant':
                return 'w-1/3';
            case 'confirmé':
                return 'w-2/3';
            case 'expert':
                return 'w-full';
            default:
                return 'w-0';
        }
    };

    return (
        <div className="skill-card-ultra rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h3 className="skill-title-ultra truncate text-sm font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    <p className="skill-level-ultra truncate text-xs text-gray-600 capitalize dark:text-gray-400">{skill.level}</p>

                    {/* Progress bar - Ultra compact */}
                    <div className="mt-1">
                        <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className={`h-1 rounded-full transition-all duration-300 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                            />
                        </div>
                    </div>
                </div>{' '}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(skill.id)}
                    className="button-ultra ml-2 h-6 p-1 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
