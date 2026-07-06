import { Head } from '@inertiajs/react';

// 1. Define the interface to match the company database structure.
interface Company {
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
    created_at: string;
    updated_at: string;
}

interface DashboardProps {
    company: Company | null;
}

export default function Dashboard({ company }: DashboardProps) {
    // Verification status badge styling helper.
    const getStatusStyles = (status: Company['status']) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200';
            case 'suspended':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300 border-gray-200';
            default: // pending
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200';
        }
    };

    console.log(company);

    return (
        <div>
            <Head title="Company Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* State 1: the user does not have company data. */}
                    {!company ? (
                        <div className="overflow-hidden border border-amber-200 bg-amber-50 p-6 shadow-sm sm:rounded-lg dark:border-amber-900/30 dark:bg-amber-950/20">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">⚠️</span>
                                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">
                                    Company Profile Not Registered
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-amber-700 dark:text-amber-300/80">
                                Your account is not connected to a business
                                entity. Complete your company’s legal
                                information and public profile to begin
                                verification.
                            </p>
                        </div>
                    ) : (
                        /* State 2: company data is available. */
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Left: company profile summary. */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Primary information. */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Public Profile & Branding
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            ID Registrasi: #{company.id}
                                        </p>
                                    </div>
                                    <div className="space-y-4 p-6">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Legal Company Name
                                                </label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {company.company_legal_name}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Public Brand Name
                                                </label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {
                                                        company.company_display_name
                                                    }
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Industry Sector
                                                </label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {company.industry || '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Tax ID / NIB
                                                </label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {company.tax_id || '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    Official Website
                                                </label>
                                                <p className="text-sm font-medium">
                                                    {company.website_url ? (
                                                        <a
                                                            href={
                                                                company.website_url
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                                        >
                                                            {
                                                                company.website_url
                                                            }
                                                        </a>
                                                    ) : (
                                                        '-'
                                                    )}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                    HQ City / Country
                                                </label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    {company.city},{' '}
                                                    {company.country}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-2 dark:border-gray-700/50">
                                            <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                                Tagline (Bio)
                                            </label>
                                            <p className="text-sm text-gray-600 italic dark:text-gray-300">
                                                "
                                                {company.bio ||
                                                    'No tagline yet.'}
                                                "
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Penanggung Jawab / PIC */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Person in Charge (PIC)
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3">
                                        <div>
                                            <label className="text-xs text-gray-400">
                                                PIC Name
                                            </label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {company.pic_name}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400">
                                                Jabatan
                                            </label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {company.pic_position}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400">
                                                Mobile Contact
                                            </label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {company.pic_phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: verification status and information. */}
                            <div className="space-y-6">
                                {/* Widget Status Verifikasi */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex flex-col items-center p-6 text-center">
                                        <span className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                                            Status Verifikasi
                                        </span>
                                        <div
                                            className={`w-full rounded-full border px-4 py-2 text-sm font-bold capitalize shadow-sm ${getStatusStyles(company.status)}`}
                                        >
                                            {company.status === 'pending' &&
                                                '⏳ '}
                                            {company.status === 'approved' &&
                                                '✅ '}
                                            {company.status === 'rejected' &&
                                                '❌ '}
                                            {company.status === 'suspended' &&
                                                '🚫 '}
                                            {company.status}
                                        </div>

                                        {/* Show the reason when rejected by an administrator. */}
                                        {company.status === 'rejected' &&
                                            company.rejection_reason && (
                                                <div className="mt-4 w-full rounded border border-red-200 bg-red-50 p-3 text-left text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
                                                    <strong className="mb-1 block font-semibold">
                                                        Rejection Reason:
                                                    </strong>
                                                    {company.rejection_reason}
                                                </div>
                                            )}

                                        <p className="mt-4 text-xs text-gray-400">
                                            Last updated: <br />
                                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                                {new Date(
                                                    company.updated_at,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Official company contact. */}
                                <div className="overflow-hidden border border-gray-200 bg-white p-6 shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <h4 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">
                                        Contact & Mailing Address
                                    </h4>
                                    <div className="space-y-3 text-xs">
                                        <div>
                                            <span className="block text-gray-400">
                                                Company Email:
                                            </span>
                                            <span className="font-medium text-gray-800 dark:text-gray-200">
                                                {company.official_email || '-'}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="block text-gray-400">
                                                Alamat Kantor Pusat:
                                            </span>
                                            <span className="block leading-relaxed font-medium text-gray-800 dark:text-gray-200">
                                                {company.hq_address || '-'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
