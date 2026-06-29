import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { auth } = usePage().props;

    const user = auth?.user ?? null;
    const isAuthenticated = !!user;

    const isAdmin = user?.role === '1';
    const isTeacher = user?.role === '2';
    const isStudent = user?.role === '3';
    const isCompany = user?.role === '4';

    return {
        user,
        isAuthenticated,
        isAdmin,
        isTeacher,
        isStudent,
        isCompany,
        profile: user?.profile ?? null,
    };
}