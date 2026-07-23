import { Link, router } from '@inertiajs/react';
import { PlayIcon, PlusCircleIcon, BookOpen, Clock, Users } from 'lucide-react';
import Layout from '../../pages/Student/Layout';

interface Category {
    name: string;
    description?: string | null;
    instructor?: string | null;
    duration?: string | null;
}

interface Course {
    id: number;
    title: string;
    level: string;
    progress: number;
    status: 'Locked' | 'In Progress' | 'Completed';
}

interface Props {
    category: Category;
    courses: Course[];
}

export default function CourseDetail({ category, courses }: Props) {
    return (
        <Layout>
            {/* HERO SECTION (Ala Udemy) */}
            <div className="mb-8 rounded-3xl bg-slate-900 p-8 text-white md:p-12">
                <div className="max-w-2xl">
                    <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                        {category.name}
                    </h1>
                    <p className="mb-6 text-lg text-slate-300">
                        {category.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <Users size={18} />{' '}
                            {category.instructor || 'Expert Instructor'}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} />{' '}
                            {category.duration || 'Flexible duration'}
                        </div>
                    </div>
                </div>
            </div>

            {/* COURSE LIST SECTION */}
            <div className="max-w-5xl">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Course in this Category
                </h2>

                <div className="space-y-4">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 md:flex-row md:items-center"
                        >
                            {/* Info Kursus */}
                            <div className="flex flex-1 items-start gap-4">
                                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {course.title}
                                    </h3>
                                    <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
                                        {course.level}
                                    </span>
                                </div>
                            </div>

                            {/* Progres & Aksi */}
                            <div className="mt-4 flex items-center gap-6 md:mt-0">
                                {course.status !== 'Locked' && (
                                    <div className="w-32">
                                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{
                                                    width: `${course.progress}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-400">
                                            {course.progress}% Complete
                                        </span>
                                    </div>
                                )}

                                <div>
                                    {course.status === 'Locked' ? (
                                        <button
                                            onClick={() =>
                                                router.post(
                                                    `/student/courses/${course.id}/enroll`,
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                                        >
                                            <PlusCircleIcon size={16} /> Enroll
                                        </button>
                                    ) : (
                                        <Link
                                            href={`/student/courses/${course.id}`} // Sesuaikan route slug-mu
                                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                                        >
                                            <PlayIcon size={16} />{' '}
                                            {course.status === 'Completed'
                                                ? 'Review'
                                                : 'Resume'}
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
