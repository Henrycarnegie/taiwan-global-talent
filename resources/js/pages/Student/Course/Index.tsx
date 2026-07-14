import { Link, router } from '@inertiajs/react';
import {
    BookOpenCheck,
    Clock3,
    PlayIcon,
    PlusCircleIcon,
    ShieldCheck,
} from 'lucide-react';
import Card from '@/components/UI/Card';
import Layout from '../Layout';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    courses: any[];
    stats: any;
    currentCategory: Category;
    allCategories: Category[];
}

export default function Index({
    courses = [],
    stats,
    currentCategory,
    allCategories = [],
}: Props) {
    const isMandarin = currentCategory.id === 1;

    const handleEnroll = (courseId: number) => {
        router.post(
            `/student/courses/${courseId}/enroll`,
            {},
            {
                onSuccess: () => {
                    window.alert('Enrollment successful. You can now start.');
                },
                onError: (errors: any) => {
                    const errorMessages = Object.values(errors).join('\n');
                    window.alert(`Unable to enroll.\n${errorMessages}`);
                },
            },
        );
    };

    return (
        <Layout>
            <div className="space-y-8">
                <div className="overflow-hidden rounded-md bg-[#102a43] text-white shadow-[0_22px_70px_rgba(16,42,67,0.18)]">
                    <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
                        <div>
                            <p className="text-xs font-black tracking-widest text-[#f47b20] uppercase">
                                Learning pathway
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                                {currentCategory.name} Learning Center
                            </h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 font-semibold text-white/72">
                                Choose modules based on your goal, current
                                level, and available time. Course progress is
                                saved to your profile for future matching.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-3 text-sm font-bold text-white/82">
                            <ShieldCheck className="h-5 w-5 text-[#28a6a1]" />
                            Personalized by pathway activity
                        </div>
                    </div>
                </div>

                <nav
                    aria-label="Course categories"
                    className="overflow-x-auto rounded-md border border-slate-200 bg-white p-2 shadow-sm"
                >
                    <div className="flex min-w-max gap-2">
                        {allCategories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/student/courses/${cat.slug}`}
                                className={`min-h-11 rounded-md px-4 py-3 text-sm font-black transition focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none ${
                                    currentCategory.id === cat.id
                                        ? 'bg-[#173b8f] text-white'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#173b8f]'
                                }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {isMandarin && (
                        <Card
                            title="Current Proficiency"
                            value={stats?.proficiency || 'TOCFL A1'}
                            subTitle="Assessed level"
                        />
                    )}
                    <Card
                        title="Learning Hours"
                        value={`${stats?.learning_hours || 0} Hours`}
                        subTitle="Total time invested"
                    />
                    {isMandarin && (
                        <Card
                            title="Vocabulary Mastered"
                            value={`${stats?.vocab_count || 0} Words`}
                            subTitle="Total words learned"
                        />
                    )}
                </div>

                <section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-5">
                        <h3 className="text-lg font-black text-[#173b8f]">
                            Available modules
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Tap a module to enroll or continue learning.
                        </p>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {courses.length === 0 ? (
                            <div className="p-8 text-center">
                                <BookOpenCheck className="mx-auto h-10 w-10 text-slate-300" />
                                <p className="mt-3 text-sm font-semibold text-slate-500">
                                    No modules are available in this pathway
                                    yet.
                                </p>
                            </div>
                        ) : (
                            courses.map((course: any) => (
                                <div
                                    key={course.id}
                                    className="grid gap-5 p-5 transition-colors hover:bg-slate-50/70 md:grid-cols-[1fr_220px_auto] md:items-center md:p-6"
                                >
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-[#f47b20]/12 px-2.5 py-1 text-xs font-black text-[#f47b20] uppercase">
                                                {course.level}
                                            </span>
                                            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
                                                <Clock3 className="h-3.5 w-3.5" />
                                                Flexible pace
                                            </span>
                                        </div>
                                        <h4 className="mt-3 text-lg font-black text-[#173b8f]">
                                            {course.title}
                                        </h4>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-500">
                                            <span>Progress</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                            <div
                                                className="h-full rounded-full bg-[#28a6a1]"
                                                style={{
                                                    width: `${course.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div>
                                        {course.status === 'Locked' ? (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEnroll(course.id)
                                                }
                                                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#173b8f] px-5 text-sm font-black text-white transition hover:bg-[#102a43] focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none md:w-auto"
                                            >
                                                <PlusCircleIcon size={16} />
                                                Enroll
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/student/courses/${currentCategory.slug}/${course.id}`}
                                                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f47b20] px-5 text-sm font-black text-white transition hover:bg-[#173b8f] focus-visible:ring-2 focus-visible:ring-[#f47b20] focus-visible:outline-none md:w-auto"
                                            >
                                                <PlayIcon size={16} />
                                                Resume
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
