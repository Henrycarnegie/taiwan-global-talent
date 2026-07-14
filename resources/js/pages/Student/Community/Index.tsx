import { Eye, MessageCircle, Plus, ShieldCheck } from 'lucide-react';
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
                <div className="space-y-4 lg:col-span-3">
                    <div className="rounded-md bg-[#102a43] p-6 text-white shadow-[0_22px_70px_rgba(16,42,67,0.16)]">
                        <p className="text-xs font-black tracking-widest text-[#f47b20] uppercase">
                            Community
                        </p>
                        <h2 className="mt-3 text-3xl font-black">
                            Ask, share, and learn with clear boundaries.
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70">
                            Use discussions for scholarship questions, Mandarin
                            practice, life in Taiwan, internships, and career
                            planning.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex gap-2">
                            <button className="min-h-10 rounded-md bg-[#173b8f] px-4 text-xs font-black text-white focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none">
                                Latest
                            </button>
                            <button className="min-h-10 rounded-md border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none">
                                Popular
                            </button>
                        </div>
                        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-[#f47b20] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#173b8f] focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none">
                            <Plus className="h-4 w-4" />
                            New Discussion
                        </button>
                    </div>

                    <div className="divide-y divide-slate-100 rounded-md border border-slate-200 bg-white shadow-sm">
                        {threads.map((thread) => (
                            <div
                                key={thread.id}
                                className="cursor-pointer space-y-3 p-5 transition hover:bg-slate-50/70"
                            >
                                <div>
                                    <span className="rounded-full bg-[#f47b20]/12 px-2.5 py-1 text-[10px] font-black tracking-wider text-[#f47b20] uppercase">
                                        {thread.tag}
                                    </span>
                                </div>
                                <h4 className="text-base font-black text-[#173b8f] transition hover:text-[#f47b20]">
                                    {thread.title}
                                </h4>
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-700">
                                            {thread.author}
                                        </span>
                                        <span>•</span>
                                        <span>{thread.time}</span>
                                    </div>
                                    <div className="flex items-center gap-4 font-medium">
                                        <span className="flex items-center gap-1">
                                            <MessageCircle className="h-4 w-4" />
                                            {thread.replies} replies
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {thread.views} views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="flex items-center gap-2 text-sm font-black text-[#173b8f]">
                            <ShieldCheck className="h-4 w-4 text-[#28a6a1]" />
                            Community standards
                        </h3>
                        <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-slate-600">
                            <li>
                                Respect every member of the digital talent
                                community.
                            </li>
                            <li>
                                Do not share fake job postings or misleading
                                information.
                            </li>
                            <li>
                                Use the right tags so members can find
                                discussions quickly.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 text-sm font-black text-[#173b8f]">
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
                                    className="cursor-pointer rounded-full bg-[#173b8f]/8 px-2.5 py-1 text-xs font-bold text-[#173b8f] transition hover:bg-[#173b8f] hover:text-white"
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
