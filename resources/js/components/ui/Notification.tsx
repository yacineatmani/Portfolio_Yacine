import { CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

interface NotificationProps {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    onClose: (id: string) => void;
}

export function Notification({ id, type, message, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, 4000);

        return () => clearTimeout(timer);
    }, [id, onClose]);

    const icons = {
        success: CheckCircle,
        error: XCircle,
        info: Info,
    };

    const colors = {
        success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800',
        error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800',
        info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-200 dark:border-blue-800',
    };

    const Icon = icons[type];

    return (
        <div className={`animate-in slide-in-from-right flex items-center gap-3 rounded-lg border p-4 shadow-sm duration-300 ${colors[type]}`}>
            <Icon className="h-5 w-5 flex-shrink-0" />
            <p className="flex-1 text-sm font-medium">{message}</p>
            <button onClick={() => onClose(id)} className="flex-shrink-0 transition-opacity hover:opacity-70">
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
