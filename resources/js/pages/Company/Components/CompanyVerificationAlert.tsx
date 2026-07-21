import { Link } from '@inertiajs/react';
import { XCircle, Clock, ArrowRight } from 'lucide-react';

interface AlertProps {
    status: string;
    reason?: string | null;
}

export default function CompanyVerificationAlert({
    status,
    reason,
}: AlertProps) {
    if (status === 'approved') {
        return null;
    }

    if (status === 'rejected') {
        return (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 shadow-sm dark:border-rose-900/50 dark:bg-rose-950/20">
                <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-rose-100 p-2.5 text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
                        <XCircle className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-rose-900 dark:text-rose-300">
                            Verification Application Rejected
                        </h3>
                        <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
                            {reason ||
                                'Your submitted business documents did not meet our verification criteria.'}
                        </p>
                        <div className="mt-3">
                            <Link
                                href="/company/apply"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 underline hover:text-rose-800 dark:text-rose-300"
                            >
                                Re-submit Application{' '}
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm dark:border-amber-900/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-4">
                <div className="rounded-xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                    <Clock className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
                        Verification Under Review
                    </h3>
                    <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                        Our administrative team is currently reviewing your
                        company legal documents. Job postings will be unlocked
                        once approved.
                    </p>
                </div>
            </div>
        </div>
    );
}
