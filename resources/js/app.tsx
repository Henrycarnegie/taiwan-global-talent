import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { LanguageProvider } from './context/LanguageContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name: string) => {
        const pages = import.meta.glob('./Pages/**/*.tsx');

        return resolvePageComponent(
            `./Pages/${name}.tsx`, 
            pages
        ) as any;
    },

    setup({ el, App, props }) {
        if (!el || typeof window === 'undefined') {
            return;
        }

        createRoot(el).render(
            <LanguageProvider>
                <App {...props} />
            </LanguageProvider>
        );
    },

    progress: {
        color: '#E60063',
    },
});