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
        <div className="auth-background min-h-screen flex items-center justify-center p-4 relative">
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

            <div className="w-full max-w-md auth-form-container">
                <div className="auth-glassmorphism rounded-2xl p-8 shadow-2xl">
                    {/* Logo et titre */}
                    <div className="text-center mb-8 auth-floating">
                        <Link href={route('home')} className="inline-block mb-6">
                            <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center auth-logo backdrop-blur-sm">
                                <AppLogoIcon className="w-10 h-10 text-white" />
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                        <p className="text-white/80 text-sm">{description}</p>
                    </div>

                    {/* Contenu du formulaire */}
                    <div className="space-y-6">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-white/60 text-sm">
                        © 2024 Portfolio Dashboard. Tous droits réservés.
                    </p>
                </div>
            </div>
        </div>
    );
}
