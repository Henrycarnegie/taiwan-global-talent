import Layout from '../Layout';

export default function Community() {
    const threads = [
        {
            id: 1,
            tag: 'Scholarships & Paperwork',
            title: 'Tips for renewing an ARC (Alien Resident Certificate) in Taipei in 2026',
            author: 'Budi Santoso (NTUST)',
            replies: 14,
            views: 124,
            time: '2 hours ago',
        },
        {
            id: 2,
            tag: 'Internship Info',
            title: 'Looking for two teammates for an ASUS Taiwan digital innovation competition',
            author: 'Siti Rahma (NTU)',
            replies: 8,
            views: 95,
            time: '5 hours ago',
        },
        {
            id: 3,
            tag: 'Life in Taiwan',
            title: 'Any Indonesian grocery stores or Muslim-friendly restaurants near Hsinchu?',
            author: 'Kevin Kevin (NTHU)',
            replies: 32,
            views: 310,
            time: '1 day ago',
        },
    ];

    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Left Column: Main Thread List */}
                <div className="space-y-4 lg:col-span-3">
                    {/* Forum Controls */}
                    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <div className="flex gap-2">
                            <button className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white">
                                Latest
                            </button>
                            <button className="rounded-lg border bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                                Popular
                            </button>
                        </div>
                        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
                            + New Discussion
                        </button>
                    </div>

                    {/* Discussion List */}
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
                                            💬 {thread.replies} Replies
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

                {/* Right Column: Side Widgets */}
                <div className="space-y-4">
                    {/* Community Rules */}
                    <div className="space-y-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900">
                            Forum Rules 📜
                        </h3>
                        <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-gray-500">
                            <li>
                                Respect every member of the digital talent
                                community.
                            </li>
                            <li>
                                Do not share fake job postings or misleading
                                information.
                            </li>
                            <li>
                                Use the right tags so other students can find
                                discussions easily.
                            </li>
                        </ul>
                    </div>

                    {/* Popular Tags */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-sm font-bold text-gray-900">
                            Popular Categories
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                            {[
                                '#InfoMagang',
                                '#BeasiswaMOE',
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
        </Layout>
    );
}
