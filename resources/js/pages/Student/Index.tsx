import {
    ArrowRight,
    Bell,
    BriefcaseBusiness,
    MessageCircle,
    ShieldCheck,
} from 'lucide-react';
import Card from '@/components/UI/Card';
import Layout from './Layout';

export default function StudentDashboard() {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-black text-[#173b8f]">
                        Dashboard overview
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Track learning progress, profile readiness, community
                        updates, and career activity in one place.
                    </p>
                </div>
                <div className="space-y-6">
                    <div className="relative overflow-hidden rounded-md bg-[#102a43] p-6 text-white shadow-[0_22px_70px_rgba(16,42,67,0.18)]">
                        <div className="relative z-10 max-w-2xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black text-white/82">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#28a6a1]" />
                                Goal-based recommendations
                            </span>
                            <h2 className="mt-4 text-2xl font-black">
                                Ready to build your next step in Taiwan?
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-white/72">
                                Complete your profile to improve pathway
                                suggestions, course recommendations, and future
                                employer matching.
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[28px_28px] opacity-20" />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <Card
                            title="Profile Completion"
                            subTitle="檔案完整度"
                            value="70%"
                            badge="Action Required"
                            badgeColor="bg-amber-100 text-amber-800"
                        />
                        <Card
                            title="Mandarin Level"
                            subTitle="華語能力"
                            value="TOCFL A2"
                            badge="Active Course"
                            badgeColor="bg-blue-100 text-blue-800"
                        />
                        <Card
                            title="Active Applications"
                            subTitle="投遞進度"
                            value="3"
                            footerText="Taiwan Companies"
                        />
                        <Card
                            title="Certificates"
                            subTitle="證書"
                            value="2"
                            footerText="Verified"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-4 rounded-md border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                            <h3 className="flex items-center justify-between border-b border-slate-200 pb-3 font-black text-[#173b8f]">
                                <span className="flex items-center gap-2">
                                    <Bell className="h-4 w-4 text-[#f47b20]" />
                                    Latest announcement
                                </span>
                                <span className="text-xs font-semibold text-slate-500">
                                    Updated today
                                </span>
                            </h3>
                            <div className="space-y-3">
                                <div className="cursor-pointer rounded-md bg-slate-50 p-4 transition hover:bg-slate-100">
                                    <p className="mb-1 text-xs font-black text-[#f47b20]">
                                        Taiwan Tech Career Fair 2026
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Special registration for international
                                        talent officially opens this week.
                                    </p>
                                </div>
                                <div className="cursor-pointer rounded-md bg-slate-50 p-4 transition hover:bg-slate-100">
                                    <p className="mb-1 text-xs font-black text-[#28a6a1]">
                                        Mandarin Center
                                    </p>
                                    <p className="text-sm font-semibold text-slate-800">
                                        Free TOCFL mock tests are available in
                                        the Mandarin Courses tab.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-md border border-slate-200 bg-white p-6 shadow-sm">
                            <div>
                                <h3 className="mb-1 flex items-center gap-2 font-black text-[#173b8f]">
                                    <MessageCircle className="h-4 w-4 text-[#f47b20]" />
                                    Community activity
                                </h3>
                                <p className="mb-4 text-xs font-semibold text-slate-500">
                                    Conversations for learners, applicants, and
                                    working talent
                                </p>
                                <div className="space-y-3 text-sm">
                                    <p className="flex gap-2 text-slate-600">
                                        <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-[#28a6a1]" />
                                        <span className="font-semibold text-slate-800">
                                            Latest MOE scholarship update thread
                                        </span>
                                    </p>
                                    <p className="flex gap-2 text-slate-600">
                                        <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#28a6a1]" />
                                        <span className="font-semibold text-slate-800">
                                            Internship experience in Hsinchu
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <button className="mt-5 flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#173b8f] px-4 text-center text-sm font-black text-white transition hover:bg-[#102a43] focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none">
                                Open Discussion Forum{' '}
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
