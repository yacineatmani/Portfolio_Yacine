import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Créer un compte" description="Rejoignez-nous en créant votre compte personnel">
            <Head title="Inscription" />
            
            <form onSubmit={submit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">
                        Nom complet
                    </Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Votre nom complet"
                            className="auth-input pl-10 h-12 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                    </div>
                    <InputError message={errors.name} />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                        Adresse email
                    </Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="votre@email.com"
                            className="auth-input pl-10 h-12 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-white font-medium">
                        Mot de passe
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Minimum 8 caractères"
                            className="auth-input pl-10 pr-12 h-12 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation" className="text-white font-medium">
                        Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmez votre mot de passe"
                            className="auth-input pl-10 pr-12 h-12 rounded-lg border-0 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} />
                </div>

                {/* Submit button */}
                <Button 
                    type="submit" 
                    className="auth-button w-full h-12 text-base font-semibold rounded-lg" 
                    disabled={processing}
                >
                    {processing ? (
                        <div className="flex items-center justify-center gap-2">
                            <LoaderCircle className="w-5 h-5 animate-spin" />
                            Création en cours...
                        </div>
                    ) : (
                        'Créer mon compte'
                    )}
                </Button>

                {/* Login link */}
                <div className="text-center pt-4 border-t border-white/20">
                    <p className="text-white/80 text-sm">
                        Déjà un compte ?{' '}
                        <TextLink 
                            href={route('login')} 
                            className="auth-link font-semibold hover:text-white transition-colors"
                        >
                            Se connecter
                        </TextLink>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}