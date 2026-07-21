import { FileText, User, Mail } from 'lucide-react';

interface CompanyInfoSectionProps {
    company: any;
}

export default function CompanyInfoSection({ company }: CompanyInfoSectionProps) {
    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column: Legal & Overview */}
            <div className="space-y-6 lg:col-span-2">
                {/* Legal & Overview Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
                        <FileText className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            Overview & Legal Information
                        </h3>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <span className="text-[11px] font-medium text-slate-400 uppercase">
                                Legal Entity Name
                            </span>
                            <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.company_legal_name}
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400 uppercase">
                                Tax ID / NIB
                            </span>
                            <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.tax_id || '-'}
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400 uppercase">
                                Company Size
                            </span>
                            <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.company_size} Employees
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400 uppercase">
                                Founded Year
                            </span>
                            <p className="mt-0.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.founded_year || '-'}
                            </p>
                        </div>
                    </div>

                    {/* Bio & Description */}
                    <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <span className="text-[11px] font-medium text-slate-400 uppercase">
                            Tagline / Bio
                        </span>
                        <p className="mt-1 text-xs text-slate-600 italic dark:text-slate-300">
                            "{company.bio || 'No tagline set.'}"
                        </p>
                    </div>

                    <div className="mt-4">
                        <span className="text-[11px] font-medium text-slate-400 uppercase">
                            Company Overview
                        </span>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {company.description || 'No detailed description provided.'}
                        </p>
                    </div>
                </div>

                {/* PIC Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
                        <User className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            Person In Charge (PIC)
                        </h3>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                            <span className="text-[11px] font-medium text-slate-400">Name</span>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.pic_name}
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400">Position</span>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.pic_position}
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400">Phone</span>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.pic_phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contact & Location */}
            <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-800">
                        <Mail className="h-5 w-5 text-indigo-600" />
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            Official Contact
                        </h3>
                    </div>
                    <div className="mt-4 space-y-3">
                        <div>
                            <span className="text-[11px] font-medium text-slate-400">Official Email</span>
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {company.official_email || '-'}
                            </p>
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-slate-400">HQ Address</span>
                            <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                                {company.hq_address || '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}