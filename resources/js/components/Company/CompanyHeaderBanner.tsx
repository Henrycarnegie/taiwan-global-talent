import { Building2, Globe, MapPin, Plus, Sparkles } from 'lucide-react';
import type { CompanyProfile } from '@/types/company/type';

export default function CompanyHeaderBanner({ company }: { company: CompanyProfile }) {
    const bannerUrl = company.banner_url;
    const logoUrl = company.logo_url;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {/* Banner Background */}
            <div className="relative h-44 w-full bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900">
                <div className="relative h-44 w-full bg-slate-900">
                {bannerUrl ? (
                    <img
                        src={bannerUrl}
                        alt="Company Banner"
                        className="h-full w-full object-cover opacity-80"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />
                )}
            </div>
            </div>

            {/* Profile Info Overlay */}
            <div className="relative px-6 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between sm:space-x-5">
                    <div className="-mt-14 flex items-end space-x-4">
                        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md dark:border-slate-900 dark:bg-slate-800">
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt={company.company_display_name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Building2 className="h-10 w-10 text-slate-400" />
                            )}
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                {company.company_display_name}
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {company.company_legal_name}
                            </p>
                        </div>
                    </div>

                    {/* Quick Action Button */}
                    <div className="mt-4 flex items-center gap-2 sm:mt-0">
                        <button
                            disabled={company.status !== 'approved'}
                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus className="h-4 w-4" /> Post New Job
                        </button>
                    </div>
                </div>

                {/* Sub Metadata Strip */}
                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-indigo-500" />
                        <span>
                            {company.industry || 'Industry not specified'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span>
                            {company.city
                                ? `${company.city}, ${company.country}`
                                : company.country}
                        </span>
                    </div>
                    {company.website_url && (
                        <a
                            href={company.website_url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            <Globe className="h-4 w-4" />
                            <span>
                                {company.website_url.replace(
                                    /^https?:\/\//,
                                    '',
                                )}
                            </span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
