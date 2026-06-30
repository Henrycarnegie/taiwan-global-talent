export interface TeacherProfile {
    id: number;
    bio: string | null;
    expertise: string | null;
    certification_path: string | null;
}

export interface StudentProfile {
    id: number;
    country: string | null;
    university: string | null;
    major: string | null;
}

export interface CompanyProfile {
    id: number;
    company_name: string;
    industry: string | null;
    website: string | null;
    address: string | null;
}

export interface AdminProfile {
    id: number;
}

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    role: '1' | '2' | '3' | '4';
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    profile: AdminProfile | TeacherProfile | StudentProfile | CompanyProfile | null;
}

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: AuthUser | null;
        };
        sidebarOpen?: boolean;
    }
}