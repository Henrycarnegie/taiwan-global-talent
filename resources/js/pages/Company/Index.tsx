import { Head, Link } from '@inertiajs/react';
import { Building2, ArrowRight } from 'lucide-react';
import type { CompanyProfile } from '@/types/company/type';
import CompanyHeaderBanner from '../../components/Company/CompanyHeaderBanner';
import CompanyInfoSection from '../../components/Company/CompanyInfoSection';
import CompanyMetrics from '../../components/Company/CompanyMetrics';
import CompanyNavbar from '../../components/Company/CompanyNavbar';
import CompanyVerificationAlert from '../../components/Company/CompanyVerificationAlert';

export default function Index({ company }: { company: CompanyProfile }) {
    console.log(company);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Company Dashboard" />

            {/* Topbar / Navbar */}
            <CompanyNavbar company={company} />

            <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                {/* STATE 1: USER BELUM MEMILIKI COMPANY PROFILE */}
                {!company ? (
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/50">
                            <Building2 className="h-8 w-8" />
                        </div>
                        <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                            Company Profile Not Registered
                        </h2>
                        <p className="mx-auto mt-2 max-w-md text-xs text-slate-500 dark:text-slate-400">
                            Your account is not connected to any business entity
                            yet. Please complete your legal details to start
                            hiring talent.
                        </p>
                        <div className="mt-6">
                            <Link
                                href="/company/apply"
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
                            >
                                Register Company Profile{' '}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* STATE 2: COMPANY PROFILE TERSEDIA */
                    <>
                        {/* Header Banner & Logo R2 */}
                        <CompanyHeaderBanner company={company} />

                        {/* Banner Peringatan Status Approval */}
                        <CompanyVerificationAlert
                            status={company.status}
                            reason={company.rejection_reason}
                        />

                        {/* Metrics Cards */}
                        <CompanyMetrics />

                        {/* Section Informasi Lengkap */}
                        <CompanyInfoSection company={company} />
                    </>
                )}
            </main>
        </div>
    );
}
