import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import React from 'react';
import SectionTitle from './SectionTitle';

const Contact: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });
    const [toast, setToast] = React.useState<{ type: 'success' | 'error'; message?: string } | null>(null);

    React.useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/contact', {
            onSuccess: () => {
                setToast({ type: 'success', message: 'Message envoyé !' });
                reset();
            },
            onError: () => setToast({ type: 'error', message: 'Erreur d’envoi.' }),
        });
    };

    return (
        <section id="contact" className="bg-white py-20 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="Contact"
                    subtitle="Discutons de votre projet"
                    align="center"
                    variants={['Contact', 'Me Contacter', 'Échangeons']}
                />

                <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="h-full rounded-xl bg-indigo-600 p-8 text-white dark:bg-indigo-700"
                    >
                        <h3 className="mb-6 text-2xl font-bold">Parlons de vos projets</h3>
                        <p className="mb-8 opacity-90">
                            Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter. Je serai ravi d'échanger avec vous et de
                            discuter de la façon dont je peux vous aider.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="mr-4 rounded-full bg-white/20 p-3">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a href="mailto:contact@yacineatmani.fr" className="text-white/80 transition-colors hover:text-white">
                                        contact@yacineatmani.fr
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 rounded-full bg-white/20 p-3">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Téléphone</h4>
                                    <a href="tel:+33600000000" className="text-white/80 transition-colors hover:text-white">
                                        +33 6 00 00 00 00
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mr-4 rounded-full bg-white/20 p-3">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-medium">Localisation</h4>
                                    <p className="text-white/80">Paris, France</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative rounded-xl bg-gray-50 p-8 dark:bg-gray-800"
                    >
                        <AnimatePresence>
                            {toast && (
                                <motion.div
                                    className={`absolute -top-12 left-1/2 flex -translate-x-1/2 transform items-center gap-1 rounded-md p-3 text-center text-sm font-semibold ${
                                        toast.type === 'success'
                                            ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-black'
                                            : 'bg-rose-600 text-white'
                                    }`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    {toast.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white text-gray-900 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400`}
                                    placeholder="Votre nom"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white text-gray-900 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400`}
                                    placeholder="Votre email"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={5}
                                    className={`w-full rounded-lg border px-4 py-3 ${
                                        errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                                    } bg-white text-gray-900 transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400`}
                                    placeholder="Votre message"
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
                                        processing ? 'cursor-not-allowed bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500'
                                    } text-white`}
                                >
                                    {processing ? (
                                        <motion.div
                                            className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                                            initial={{ rotate: 0 }}
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        />
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Envoyer
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
