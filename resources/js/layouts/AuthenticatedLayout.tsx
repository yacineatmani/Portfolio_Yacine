import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { Link } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
}

interface PageProps {
  auth: { user: User | null };
  [key: string]: any;
}

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { auth } = usePage<PageProps>().props;
  const [isDark, setIsDark] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4 py-0">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold dark:text-white">
              {auth.user?.name || 'Utilisateur'}
            </div>
            <div className="flex items-center gap-4">
              <a href="/dashboard" className="text-blue-500 dark:text-blue-400">
                Dashboard
              </a>
              {auth.user && (
                <Link href={route('logout')} method="post" as="button" className="text-blue-500 dark:text-blue-400">
                  Déconnexion
                </Link>
              )}
          <button
  onClick={toggleTheme}
  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
>
  {isDark ? 'Mode Clair' : 'Mode Sombre'}
</button>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}