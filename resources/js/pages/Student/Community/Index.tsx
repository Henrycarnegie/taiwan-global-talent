export default function Community() {
    const threads = [
        {
            id: 1,
            tag: 'Scholarships & Bureaucracy',
            title: 'Latest tips for renewing an ARC (Alien Resident Certificate) in Taipei in 2026',
            author: 'Budi Santoso (NTUST)',
            replies: 14,
            views: 124,
            time: '2 hours ago',
        },
        {
            id: 2,
            tag: 'Internship Information',
            title: 'Looking for two more teammates for the ASUS Taiwan digital innovation competition',
            author: 'Siti Rahma (NTU)',
            replies: 8,
            views: 95,
            time: '5 hours ago',
        },
        {
            id: 3,
            tag: 'Life in Taiwan',
            title: 'Any recommendations for Indonesian food shops or Muslim-friendly restaurants in Hsinchu?',
            author: 'Kevin Kevin (NTHU)',
            replies: 32,
            views: 310,
            time: '1 day ago',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Left column: main thread list. */}
            <div className="space-y-4 lg:col-span-3">
                {/* Kontrol Forum */}
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex gap-2">
                        <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                            Latest
                        </button>
                        <button className="rounded-lg border bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                            Populer
                        </button>
                    </div>
                    <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
                        + Start a New Discussion
                    </button>
                </div>

                {/* Discussion list. */}
                <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white shadow-sm">
                    {threads.map((thread) => (
                        <div
                            key={thread.id}
                            className="cursor-pointer space-y-3 p-5 transition hover:bg-gray-50/50"
                        >
                            <div>
                                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                                    {thread.tag}
                                </span>
                            </div>
                            <h4 className="text-base font-semibold text-gray-900 transition hover:text-blue-600">
                                {thread.title}
                            </h4>
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-gray-400">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-600">
                                        {thread.author}
                                    </span>
                                    <span>•</span>
                                    <span>{thread.time}</span>
                                </div>
                                <div className="flex items-center gap-4 font-medium">
                                    <span className="flex items-center gap-1">
                                        💬 {thread.replies} Balasan
                                    </span>
                                    <span className="flex items-center gap-1">
                                        👁️ {thread.views} Views
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right column: sidebar widget. */}
            <div className="space-y-4">
                {/* Aturan Komunitas */}
                <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900">
                        Aturan Forum 📜
                    </h3>
                    <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-500">
                        <li>
                            Respect every member of the digital talent
                            community.
                        </li>
                        <li>
                            Do not share fraudulent job listings or false
                            information (hoax).
                        </li>
                        <li>
                            Use relevant tags so discussions are easy to find by
                            other students.
                        </li>
                    </ul>
                </div>

                {/* Tag Populer */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-3 text-sm font-bold text-gray-900">
                        Kategori Populer
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {[
                            '#InfoMagang',
                            '#MOEScholarships',
                            '#TOCFL',
                            '#TaipeiTech',
                            '#PartTime',
                            '#LifeInTW',
                        ].map((tag) => (
                            <span
                                key={tag}
                                className="cursor-pointer rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
