import React from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
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
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Contact"
          subtitle="Discutons de votre projet"
          align="center"
          variants={['Contact', 'Me Contacter', 'Échangeons']}
        />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-indigo-600 dark:bg-indigo-700 text-white rounded-xl p-8 h-full"
          >
            <h3 className="text-2xl font-bold mb-6">Parlons de vos projets</h3>
            <p className="mb-8 opacity-90">
              Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter.
              Je serai ravi d'échanger avec vous et de discuter de la façon dont je peux vous aider.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a href="mailto:contact@yacineatmani.fr" className="text-white/80 hover:text-white transition-colors">
                    contact@yacineatmani.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium">Téléphone</h4>
                  <a href="tel:+33600000000" className="text-white/80 hover:text-white transition-colors">
                    +33 6 00 00 00 00
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
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
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 relative"
          >
            <AnimatePresence>
              {toast && (
                <motion.div
                  className={`absolute -top-12 left-1/2 transform -translate-x-1/2 p-3 rounded-md text-sm font-semibold text-center flex items-center gap-1 ${
                    toast.type === 'success' ? 'bg-indigo-600 text-white dark:bg-indigo-400 dark:text-black' : 'bg-rose-600 text-white'
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors`}
                  placeholder="Votre nom"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors`}
                  placeholder="Votre email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors`}
                  placeholder="Votre message"
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={processing}
                  className={`w-full px-6 py-3 flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ${
                    processing ? 'bg-indigo-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500'
                  } text-white`}
                >
                  {processing ? (
                    <motion.div
                      className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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