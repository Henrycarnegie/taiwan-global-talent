interface CardProps {
    title: string;
    subTitle?: string;
    value: string | number;
    footerText?: string;
    badge?: string;
    badgeColor?: string;
}

export default function Card({
    title,
    subTitle,
    value,
    footerText,
    badge,
    badgeColor = 'bg-slate-100 text-slate-700',
}: CardProps) {
    return (
        <div className="flex min-h-36 flex-col justify-between rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-black tracking-wider text-slate-500 uppercase">
                            {title}
                        </p>
                        {subTitle && (
                            <p className="mt-1 text-xs font-semibold text-slate-500">
                                {subTitle}
                            </p>
                        )}
                    </div>
                    {badge && (
                        <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${badgeColor}`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <p className="mt-5 text-3xl font-black tracking-tight text-[#173b8f]">
                    {value}
                </p>
            </div>
            {footerText && (
                <p className="mt-3 text-xs font-semibold text-slate-500">
                    {footerText}
                </p>
            )}
        </div>
    );
}
