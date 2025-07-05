import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';

interface ProjectFormProps {
    onClose: () => void;
    isOpen: boolean;
    onSubmit?: (data: any) => void;
}

interface ProjectFormData {
    title: string;
    description: string;
    technologies: string;
    github_link: string;
    demo_link: string;
    image: File | null;
}

export function ProjectForm({ onClose, isOpen, onSubmit }: ProjectFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<ProjectFormData>({
        title: '',
        description: '',
        technologies: '',
        github_link: '',
        demo_link: '',
        image: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            // Mode démo avec onSubmit fourni
            onSubmit(data);
        } else {
            // Mode Laravel/Inertia
            post('/projects', {
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                    onClose();
                },
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        reset();
        setImagePreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-icons text-2xl">add_box</span>
                            <h2 className="text-xl font-semibold">Nouveau Projet</h2>
                        </div>
                        <button onClick={handleClose} className="rounded-full p-2 transition-colors hover:bg-white/20">
                            <span className="material-icons">close</span>
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-h-[calc(90vh-88px)] space-y-6 overflow-y-auto p-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image du projet</label>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>
                            {imagePreview && (
                                <div className="h-16 w-16 overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-600">
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                </div>
                            )}
                        </div>
                        {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Titre du projet *</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Nom de votre projet"
                            required
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={4}
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="Décrivez votre projet..."
                            required
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Technologies utilisées</label>
                        <input
                            type="text"
                            value={data.technologies}
                            onChange={(e) => setData('technologies', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            placeholder="React, Laravel, TypeScript... (séparées par des virgules)"
                        />
                        {errors.technologies && <p className="text-sm text-red-500">{errors.technologies}</p>}
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lien GitHub</label>
                            <input
                                type="url"
                                value={data.github_link}
                                onChange={(e) => setData('github_link', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="https://github.com/..."
                            />
                            {errors.github_link && <p className="text-sm text-red-500">{errors.github_link}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Lien Démo</label>
                            <input
                                type="url"
                                value={data.demo_link}
                                onChange={(e) => setData('demo_link', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="https://..."
                            />
                            {errors.demo_link && <p className="text-sm text-red-500">{errors.demo_link}</p>}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 rounded-lg bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex flex-1 transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <span className="material-icons animate-spin text-sm">refresh</span>
                                    Création...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons text-sm">add</span>
                                    Créer le projet
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
