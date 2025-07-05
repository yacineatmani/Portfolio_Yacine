import { Trash2 } from 'lucide-react';
import { Card } from '../ui/SimpleCard';

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
        switch (level) {
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
        switch (level) {
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
        <Card className="transition-all duration-200 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    <p className="mt-1 text-sm text-gray-600 capitalize dark:text-gray-400">
                        {skill.level} • {skill.category}
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3">
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${getLevelColor(skill.level)} ${getLevelWidth(skill.level)}`}
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onDelete(skill.id)}
                    className="ml-4 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </Card>
    );
}
