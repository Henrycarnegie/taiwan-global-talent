interface CardProps {
    title: string;
    subTitle?: string; // Small text below the title, such as Mandarin Language.
    value: string | number;
    footerText?: string; // Description displayed at the bottom.
    badge?: string;
    badgeColor?: string;
}

export default function Card({
    title,
    subTitle,
    value,
    footerText,
    badge,
    badgeColor = 'bg-gray-100 text-gray-800',
}: CardProps) {
    return (
        <div className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div>
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                            {title}
                        </p>
                        {subTitle && (
                            <p className="-mt-0.5 text-[11px] font-medium text-gray-400">
                                {subTitle}
                            </p>
                        )}
                    </div>
                    {badge && (
                        <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${badgeColor}`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
                    {value}
                </p>
            </div>
            {footerText && (
                <p className="mt-2 text-xs font-medium text-gray-400">
                    {footerText}
                </p>
            )}
        </div>
    );
}
