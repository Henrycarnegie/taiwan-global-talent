import { Building2, BriefcaseBusiness, GraduationCap, Users } from 'lucide-react';

const stats = [
    {
        label: 'Students',
        value: '2,500+',
        icon: Users,
    },
    {
        label: 'Companies',
        value: '180+',
        icon: Building2,
    },
    {
        label: 'Universities',
        value: '45+',
        icon: GraduationCap,
    },
    {
        label: 'Opportunities',
        value: '1,200+',
        icon: BriefcaseBusiness,
    },
];

const Stats = () => {
    return (
        <section className="border-y border-slate-200 bg-white py-16">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-slate-100 p-6 text-center transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                    >
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                            <stat.icon className="h-6 w-6 text-[#0A2A66]" />
                        </div>

                        <h3 className="text-3xl font-bold text-slate-900">
                            {stat.value}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;