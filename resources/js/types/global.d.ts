import type { PageProps as InertiaPageProps } from '@inertiajs/core';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface PageProps extends InertiaPageProps {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                avatar?: string;
                role: string;
                email_verified_at: string | null;
                created_at: string;
                updated_at: string;
                [key: string]: unknown;
            };
        };
        sidebarOpen?: boolean; 
    }
}