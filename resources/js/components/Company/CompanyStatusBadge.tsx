import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface CompanyStatusBadgeProps {
    status: 'approved' | 'rejected' | 'pending' | string;
}

export default function CompanyStatusBadge({ status }: CompanyStatusBadgeProps) {
    switch (status) {
        case 'approved':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20 ring-inset">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified
                </span>
            );
        case 'rejected':
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 ring-1 ring-rose-600/20 ring-inset">
                    <XCircle className="h-3.5 w-3.5" /> Rejected
                </span>
            );
        default:
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-600/20 ring-inset">
                    <Clock className="h-3.5 w-3.5" /> Pending Review
                </span>
            );
    }
}