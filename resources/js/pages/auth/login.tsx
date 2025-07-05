import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';
import InputError from '../../components/input-error';
import PrimaryButton from '../../components/PrimaryButton';
import TextInput from '../../components/TextInput';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setData(name, type === 'checkbox' ? checked : value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
            <Head title="Connexion" />

            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-2xl font-bold">Connexion</h1>

                <div className="mb-4">
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Adresse e-mail"
                        autoFocus
                        required
                        className="w-full"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="mb-4">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        required
                        className="w-full"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="mb-6 flex items-center">
                    <input id="remember" name="remember" type="checkbox" checked={data.remember} onChange={handleChange} className="mr-2" />
                    <label htmlFor="remember" className="text-gray-700">
                        Se souvenir de moi
                    </label>
                </div>

                <PrimaryButton type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Connexion...' : 'Se connecter'}
                </PrimaryButton>
            </form>
        </div>
    );
}
