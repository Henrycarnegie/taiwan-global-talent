import { ArrowRight } from 'lucide-react';
import Card from '@/components/UI/Card';
import Layout from './Layout';

export default function StudentDashboard() {
    return (
        <Layout>
            <div className="space-y-6">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
                    <h2 className="text-xl font-bold text-gray-900">
                        Welcome to Your Dashboard Overview!
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Track your learning progress, industry profile, and
                        latest updates here.
                    </p>
                </div>
                <div className="space-y-6">
                    {/* Welcome Banner */}
                    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 to-blue-900 p-6 text-white shadow-sm">
                        <div className="relative z-10 max-w-2xl">
                            <span className="rounded-full border border-blue-400/20 bg-blue-500/30 px-2.5 py-1 text-xs font-medium text-blue-200">
                                Welcome Back • 歡迎回來
                            </span>
                            <h2 className="mt-3 mb-1 text-2xl font-bold">
                                Ready to Build Your Career in Taiwan?
                            </h2>
                            <p className="text-sm leading-relaxed text-slate-300">
                                Complete your profile to unlock internships,
                                jobs, and digital incubation programs directly
                                from leading technology companies in Taiwan.
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[24px_24px] opacity-10"></div>
                    </div>

                    {/* Statistics Grid */}
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

                    {/* Announcement and Forum Teaser Row */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* News / Announcement Column */}
                        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
                            <h3 className="flex items-center justify-between border-b pb-3 font-bold text-gray-900">
                                <span>Latest Announcement</span>
                                <span className="text-xs font-normal text-gray-400">
                                    Updated today
                                </span>
                            </h3>
                            <div className="space-y-3">
                                <div className="cursor-pointer rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100">
                                    <p className="mb-1 text-xs font-semibold text-blue-600">
                                        Taiwan Tech Career Fair 2026
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        Special registration for international
                                        talent officially opens this week.
                                    </p>
                                </div>
                                <div className="cursor-pointer rounded-xl bg-gray-50 p-3 transition hover:bg-gray-100">
                                    <p className="mb-1 text-xs font-semibold text-green-600">
                                        Mandarin Center
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        Free TOCFL mock tests are available in
                                        the Mandarin Courses tab.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Community Teaser Column */}
                        <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div>
                                <h3 className="mb-1 font-bold text-gray-900">
                                    Community Activity
                                </h3>
                                <p className="mb-4 text-xs text-gray-400">
                                    Friendly conversations among students in
                                    Taiwan
                                </p>
                                <div className="space-y-3 text-sm">
                                    <p className="text-gray-600">
                                        💬{' '}
                                        <span className="font-medium text-gray-800">
                                            "Does anyone know the latest MOE
                                            scholarship updates?"
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        💬{' '}
                                        <span className="font-medium text-gray-800">
                                            "Sharing my internship experience in
                                            Hsinchu..."
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-50 p-2 text-center text-xs font-semibold text-blue-600 transition hover:bg-blue-100 hover:text-blue-700">
                                Open Discussion Forum{' '}
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>{' '}
            </div>
        </Layout>
    );
}
