import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { route } from '../../vendor/tightenco/ziggy';
import { LanguageProvider } from './context/LanguageContext';
import { configureEcho } from '@laravel/echo-react';

configureEcho({
    broadcaster: 'reverb',
});

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name: string) => {
        const pages = import.meta.glob('./pages/**/*.tsx');

        return resolvePageComponent(
            `./pages/${name}.tsx`,
            pages
        ) as any;
    },

    setup({ el, App, props }) {
        if (!el || typeof window === 'undefined') {
            return;
        }

        // Fix window.route
        (window as any).route = route;

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
