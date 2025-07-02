import React, { createContext, useContext, useState } from 'react';

// Contexte pour les notifications
const NotifierContext = createContext<{
  success: (message: string) => void;
  error: (message: string) => void;
} | null>(null);

// Hook pour utiliser les notifications
export function useSnackbar() {
  const context = useContext(NotifierContext);
  if (!context) {
    // Si pas de context, retourner des fonctions vides pour éviter les erreurs
    return {
      success: (message: string) => console.log('Success:', message),
      error: (message: string) => console.log('Error:', message),
    };
  }
  return context;
}

// Composant de notification simple
function NotificationToast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg text-white ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`}>
      <div className="flex items-center gap-2">
        <span className="material-icons">{type === 'success' ? 'check_circle' : 'error'}</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 material-icons hover:opacity-70">close</button>
      </div>
    </div>
  );
}

// Provider de notifications
export function withSnackbarProvider(Component: React.ComponentType<any>) {
  return function Wrapper(props: any) {
    const [notifications, setNotifications] = useState<Array<{ id: number; message: string; type: 'success' | 'error' }>>([]);

    const showNotification = (message: string, type: 'success' | 'error') => {
      const id = Date.now();
      setNotifications(prev => [...prev, { id, message, type }]);
    };

    const removeNotification = (id: number) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const contextValue = {
      success: (message: string) => showNotification(message, 'success'),
      error: (message: string) => showNotification(message, 'error'),
    };

    return (
      <NotifierContext.Provider value={contextValue}>
        <Component {...props} />
        {notifications.map(notification => (
          <NotificationToast
            key={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </NotifierContext.Provider>
    );
  };
}

export function Notifier() {
  return null;
}
