import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import '../../../css/auth.css';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="auth-background relative flex min-h-screen items-center justify-center p-4">
            {/* Particules animées */}
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>
            <div className="auth-particle"></div>

            <div className="auth-form-container w-full max-w-md">
                <div className="auth-glassmorphism rounded-2xl p-8 shadow-2xl">
                    {/* Logo et titre */}
                    <div className="auth-floating mb-8 text-center">
                        <Link href={route('home')} className="mb-6 inline-block">
                            <div className="auth-logo mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                                <AppLogoIcon className="h-10 w-10 text-white" />
                            </div>
                        </Link>
                        <h1 className="mb-2 text-2xl font-bold text-white">{title}</h1>
                        <p className="text-sm text-white/80">{description}</p>
                    </div>

                    {/* Contenu du formulaire */}
                    <div className="space-y-6">{children}</div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-white/60">© 2024 Portfolio Dashboard. Tous droits réservés.</p>
                </div>
            </div>
        </div>
    );
}
