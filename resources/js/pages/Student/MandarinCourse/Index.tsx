import { Link } from '@inertiajs/react';
import { LockKeyholeIcon, PlayIcon } from 'lucide-react';
import Card from '@/components/UI/Card';
import Layout from '../Layout';

interface Course {
    id: number;
    title: string;
    chineseTitle: string;
    level: string;
    modules_count: number;
    progress: number;
    status: 'Completed' | 'In Progress' | 'Locked';
}

interface Props {
    courses: Course[];
    stats: any;
}

export default function Index({ courses = [], stats }: Props) {
    return (
        <Layout>
            <div className="space-y-8">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs md:p-8">
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                        Mandarin Learning Center{' '}
                        <span className="text-sm font-normal text-gray-400">
                            華語中心
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <Card
                        title="Current Proficiency"
                        value={stats?.proficiency || 'TOCFL A1'}
                        subTitle="Assessed level"
                    />
                    <Card
                        title="Learning Hours"
                        value={`${stats?.learning_hours || 0} Hours`}
                        subTitle="Total time invested"
                    />
                    <Card
                        title="Vocabulary Mastered"
                        value={`${stats?.vocab_count || 0} Words`}
                        subTitle="Total words learned"
                    />
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
                    <div className="divide-y divide-gray-100">
                        {courses.map((course: any) => (
                            <div
                                key={course.id}
                                className="flex flex-col justify-between gap-6 p-6 transition-colors hover:bg-gray-50/40 md:flex-row md:items-center"
                            >
                                <div className="flex-1 space-y-1">
                                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600 uppercase">
                                        {course.level}
                                    </span>
                                    <h4 className="text-base font-bold text-gray-900">
                                        {course.title}
                                    </h4>
                                    <p className="text-xs text-gray-400">
                                        {course.chineseTitle}
                                    </p>
                                </div>

                                <div className="w-full space-y-1 md:w-48">
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-blue-600"
                                            style={{
                                                width: `${course.progress}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>

                            {/* Action Button */}
                            <div className="pt-2 md:pt-0">
                                <button
                                    disabled={course.status === 'Locked'}
                                    className={`flex max-w-full min-w-44 items-center justify-center rounded-xl border px-5 py-2.5 text-xs font-bold tracking-wide transition-all active:scale-[0.98] md:w-auto ${
                                        course.status === 'Completed'
                                            ? 'border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50'
                                            : course.status === 'In Progress'
                                              ? 'border-transparent bg-blue-50 text-blue-600 hover:bg-blue-100'
                                              : 'cursor-not-allowed border-transparent bg-gray-50 text-gray-500'
                                    }`}
                                >
                                    {course.status === 'Completed' ? (
                                        <CheckCircleIcon
                                            size={16}
                                            className="mr-2"
                                        />
                                    ) : course.status === 'In Progress' ? (
                                        <PlayIcon size={16} className="mr-2" />
                                    ) : (
                                        <LockKeyholeIcon
                                            size={16}
                                            className="mr-2"
                                        />
                                    )}
                                    {course.status === 'Completed'
                                        ? 'Review Modules'
                                        : course.status === 'In Progress'
                                          ? 'Resume Learning'
                                          : 'Locked'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
