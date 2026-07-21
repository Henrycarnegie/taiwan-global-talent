export interface CompanyProfile {
    id: number;
    user_id: number;
    company_legal_name: string;
    company_display_name: string;
    slug: string;
    tax_id: string | null;
    industry: string | null;
    website_url: string | null;
    logo_path: string | null;
    banner_path: string | null;
    business_registration_path: string | null;
    bio: string | null;
    description: string | null;
    hq_address: string | null;
    city: string | null;
    country: string;
    official_email: string | null;
    pic_name: string | null;
    pic_phone: string | null;
    pic_position: string | null;
    company_size: string | number;
    founded_year: string | number;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    rejection_reason: string | null;
    created_at: string;
    updated_at: string;
    // URL tambahan (jika diolah/di-transform di frontend)
    logo_url?: string | null;
    banner_url?: string | null;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    google_id: string | null;
    avatar?: string | null;
    company_profile?: CompanyProfile | null;
    companyProfile?: CompanyProfile | null;
}

export interface DashboardProps {
    company?: CompanyProfile | null;
    company_profile?: CompanyProfile | null;
    auth?: {
        user?: UserResponse;
    };
}