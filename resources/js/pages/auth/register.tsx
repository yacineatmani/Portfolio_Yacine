import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail, User } from 'lucide-react';
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
                    <Label htmlFor="name" className="font-medium text-white">
                        Nom complet
                    </Label>
                    <div className="relative">
                        <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Votre nom complet"
                            className="auth-input h-12 rounded-lg border-0 pl-10 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                    </div>
                    <InputError message={errors.name} />
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium text-white">
                        Adresse email
                    </Label>
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="votre@email.com"
                            className="auth-input h-12 rounded-lg border-0 pl-10 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                    </div>
                    <InputError message={errors.email} />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="font-medium text-white">
                        Mot de passe
                    </Label>
                    <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Minimum 8 caractères"
                            className="auth-input h-12 rounded-lg border-0 pr-12 pl-10 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <Label htmlFor="password_confirmation" className="font-medium text-white">
                        Confirmer le mot de passe
                    </Label>
                    <div className="relative">
                        <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmez votre mot de passe"
                            className="auth-input h-12 rounded-lg border-0 pr-12 pl-10 focus:ring-2 focus:ring-blue-400"
                            disabled={processing}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} />
                </div>

                {/* Submit button */}
                <Button type="submit" className="auth-button h-12 w-full rounded-lg text-base font-semibold" disabled={processing}>
                    {processing ? (
                        <div className="flex items-center justify-center gap-2">
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                            Création en cours...
                        </div>
                    ) : (
                        'Créer mon compte'
                    )}
                </Button>

                {/* Login link */}
                <div className="border-t border-white/20 pt-4 text-center">
                    <p className="text-sm text-white/80">
                        Déjà un compte ?{' '}
                        <TextLink href={route('login')} className="auth-link font-semibold transition-colors hover:text-white">
                            Se connecter
                        </TextLink>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
}
