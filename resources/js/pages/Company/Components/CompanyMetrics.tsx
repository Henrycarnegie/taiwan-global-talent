import { Briefcase, Users, Eye, CheckCircle } from 'lucide-react';

export default function CompanyMetrics() {
    // Dummy metrics (bisa diintegrasikan dengan data riil dari backend kelak)
    const stats = [
        {
            title: 'Active Job Openings',
            value: '0',
            change: 'Ready to post',
            icon: Briefcase,
            color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50',
        },
        {
            title: 'Total Applicants',
            value: '0',
            change: '0 this week',
            icon: Users,
            color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50',
        },
        {
            title: 'Profile Views',
            value: '124',
            change: '+12% vs last month',
            icon: Eye,
            color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/50',
        },
        {
            title: 'Hired Candidates',
            value: '0',
            change: '0 fulfilled',
            icon: CheckCircle,
            color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/50',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {stat.title}
                            </span>
                            <div className={`rounded-xl p-2.5 ${stat.color}`}>
                                <Icon className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                {stat.value}
                            </h3>
                            <p className="mt-1 text-[11px] font-medium text-slate-400">
                                {stat.change}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
