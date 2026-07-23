export interface CompanyProfile {
    id: number;
    company_legal_name: string;
    company_display_name: string;
    tax_id: string | null;
    slug: string;
    industry: string | null;
    company_size: string | number | null;
    founded_year: string | number | null;
    website_url: string | null;
    bio: string | null;
    description: string | null;
    hq_address: string | null;
    city: string | null;
    country: string;
    official_email: string | null;
    pic_name: string | null;
    pic_phone: string | null;
    pic_position: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'suspended';
    rejection_reason: string | null;
    
    // Cloudflare R2 Public URLs (Dikirim langsung dari Resource)
    logo_url: string | null;
    banner_url: string | null;
    business_registration_url: string | null;
}

export interface DashboardProps {
    company: CompanyProfile | null;
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