import { Link, router } from '@inertiajs/react';
import { PlayIcon, PlusCircleIcon } from 'lucide-react';
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

    console.log(stats)

    const handleEnroll = (courseId: number) => {
        if (confirm('Confirm to enroll in this course?')) {
            router.post(`/student/courses/${courseId}/enroll`, {}, {
                onSuccess: () => {
                    alert('Enrollment successful! The course is now open.');
                },
                onError: (errors: any) => {
                    const errorMessages = Object.values(errors).join('\n');
                    alert(`Failed to enroll in the course.\n${errorMessages}`);
                }
            });
        }
    };

    return (
        <Layout>
            <div className="space-y-8">
                {/* 1. Dynamic Category Tab Navigation */}
                <div className="flex space-x-4 rounded-2xl border-b border-gray-200 bg-white p-4 shadow-xs">
                    {allCategories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/student/courses/${cat.slug}`}
                            className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                                currentCategory.id === cat.id
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-500 hover:bg-gray-50'
                            }`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Dynamic Title Header */}
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs md:p-8">
                    <h2 className="text-xl font-bold text-gray-900">
                        {currentCategory.name} Learning Center{' '}
                        {isMandarin && (
                            <span className="text-sm font-normal text-gray-400">
                                華語中心
                            </span>
                        )}
                    </h2>
                </div>

                {/* 2. Conditional Smart Statistics */}
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

                {/* Course List */}
                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs">
                    <div className="divide-y divide-gray-100">
                        {courses.length === 0 ? (
                            <div className="p-8 text-center text-sm text-gray-400">
                                No classes are available in this category yet.
                            </div>
                        ) : (
                            courses.map((course: any) => (
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

                                    <div>
                                        {course.status === 'Locked' ? (
                                            <button 
                                                onClick={() => handleEnroll(course.id)}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-emerald-700 active:scale-95 md:w-auto"
                                            >
                                                <PlusCircleIcon size={14} /> Enroll Now
                                            </button>
                                        ) : (
                                            <Link
                                                href={`/student/courses/${currentCategory.slug}/${course.id}`}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95 md:w-auto"
                                            >
                                                <PlayIcon size={14} /> Resume
                                                Learning
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
