import { Head } from '@inertiajs/react';

// 1. Definisikan Interface sesuai dengan struktur database Company milikmu
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
    // Helper untuk styling badge status verifikasi
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

    console.log(company)

    return (
        <div>
            <Head title="Company Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    
                    {/* KEADAAN 1: JIKA USER BELUM MEMILIKI DATA PERUSAHAAN */}
                    {!company ? (
                        <div className="overflow-hidden border border-amber-200 bg-amber-50 p-6 shadow-sm sm:rounded-lg dark:border-amber-900/30 dark:bg-amber-950/20">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">⚠️</span>
                                <h3 className="text-lg font-medium text-amber-800 dark:text-amber-400">
                                    Profil Perusahaan Belum Terdaftar
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-amber-700 dark:text-amber-300/80">
                                Akun Anda belum terhubung dengan entitas bisnis mana pun. Silakan lengkapi data legalitas dan profil publik perusahaan Anda untuk memulai proses verifikasi.
                            </p>
                        </div>
                    ) : (
                        
                        /* KEADAAN 2: JIKA DATA PERUSAHAAN SUDAH ADA */
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            
                            {/* BAGIAN KIRI: RINGKASAN PROFIL PERUSAHAAN (Makan 2 Kolom) */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Detail Informasi Utama */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            Profil Publik & Branding
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">ID Registrasi: #{company.id}</p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nama Legal Perusahaan</label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.company_legal_name}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nama Brand Publik</label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.company_display_name}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Sektor Industri</label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.industry || '-'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tax ID / NIB</label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.tax_id || '-'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Website Resmi</label>
                                                <p className="text-sm font-medium">
                                                    {company.website_url ? (
                                                        <a href={company.website_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                                                            {company.website_url}
                                                        </a>
                                                    ) : '-'}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Kota / Negara HQ</label>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.city}, {company.country}</p>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-gray-100 dark:border-gray-700/50">
                                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">Tagline (Bio)</label>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{company.bio || 'Belum ada tagline.'}"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Penanggung Jawab / PIC */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Person in Charge (PIC)</h3>
                                    </div>
                                    <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <label className="text-xs text-gray-400">Nama PIC</label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.pic_name}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400">Jabatan</label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.pic_position}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400">Kontak Handphone</label>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{company.pic_phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* BAGIAN KANAN: STATUS VERIFIKASI & INFOBAR (1 Kolom) */}
                            <div className="space-y-6">
                                {/* Widget Status Verifikasi */}
                                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <div className="p-6 flex flex-col items-center text-center">
                                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                                            Status Verifikasi
                                        </span>
                                        <div className={`w-full border rounded-full px-4 py-2 text-sm font-bold capitalize shadow-sm ${getStatusStyles(company.status)}`}>
                                            {company.status === 'pending' && '⏳ '}
                                            {company.status === 'approved' && '✅ '}
                                            {company.status === 'rejected' && '❌ '}
                                            {company.status === 'suspended' && '🚫 '}
                                            {company.status}
                                        </div>

                                        {/* Tampilkan alasan jika ditolak oleh Admin Filament */}
                                        {company.status === 'rejected' && company.rejection_reason && (
                                            <div className="mt-4 w-full text-left p-3 border border-red-200 bg-red-50 rounded text-xs text-red-700 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400">
                                                <strong className="block font-semibold mb-1">Alasan Penolakan:</strong>
                                                {company.rejection_reason}
                                            </div>
                                        )}

                                        <p className="mt-4 text-xs text-gray-400">
                                            Terakhir diperbarui pada: <br />
                                            <span className="font-medium text-gray-600 dark:text-gray-300">
                                                {new Date(company.updated_at).toLocaleString('id-ID')}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                {/* Kontak Resmi Perusahaan */}
                                <div className="overflow-hidden border border-gray-200 bg-white p-6 shadow-sm sm:rounded-lg dark:border-gray-700 dark:bg-gray-800">
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Kontak & Alamat Korespondensi</h4>
                                    <div className="space-y-3 text-xs">
                                        <div>
                                            <span className="text-gray-400 block">Email Perusahaan:</span>
                                            <span className="text-gray-800 dark:text-gray-200 font-medium">{company.official_email || '-'}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 block">Alamat Kantor Pusat:</span>
                                            <span className="text-gray-800 dark:text-gray-200 font-medium block leading-relaxed">
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