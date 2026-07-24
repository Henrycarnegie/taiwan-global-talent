import { Link } from '@inertiajs/react';
import { BookOpen, Edit3, Plus, Video } from 'lucide-react';
import type { Course } from '@/types/teacher/type';

export default function CourseGrid({ courses }: { courses: Course[] }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">
                        Your Managed Courses & Modules
                    </h2>
                    <p className="text-xs text-gray-500">
                        Create, manage, and publish your course materials
                    </p>
                </div>
                <Link
                    href="/teacher/courses/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4" /> Create New Course
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-gray-100 py-16 text-center">
                    <BookOpen className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                    <h3 className="text-sm font-bold text-gray-800">
                        No courses found
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                        Start adding course contents for your students.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => {
                        const categoryName =
                            typeof course.category === 'object'
                                ? course.category?.name
                                : course.category || 'General';

                        return (
                            <div
                                key={course.id}
                                className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                            >
                                <div className="relative h-44 bg-gray-100">
                                    {course.thumbnail_url ? (
                                        <img
                                            src={course.thumbnail_url}
                                            alt={course.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-400">
                                            No Thumbnail
                                        </div>
                                    )}
                                    <span
                                        className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wider uppercase ${
                                            course.status === 'published' || course.is_published
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-amber-500 text-white'
                                        }`}
                                    >
                                        {course.status ?? (course.is_published ? 'published' : 'draft')}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col justify-between p-5">
                                    <div>
                                        <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                                            {categoryName}
                                        </span>
                                        <h3 className="mt-2 line-clamp-1 text-base font-bold text-gray-900">
                                            {course.title}
                                        </h3>
                                        <p className="mt-1.5 line-clamp-2 text-xs text-gray-500">
                                            {course.description ??
                                                'No description provided.'}
                                        </p>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1 font-semibold text-gray-600">
                                            <Video className="h-3.5 w-3.5 text-indigo-500" />{' '}
                                            {course.lessons_count ?? 0} Lessons
                                        </span>
                                        <Link
                                            href={`/teacher/courses/${course.id}/edit`}
                                            className="flex items-center gap-1 rounded-lg bg-indigo-50 px-2.5 py-1.5 font-bold text-indigo-600 transition hover:text-indigo-800"
                                        >
                                            <Edit3 className="h-3.5 w-3.5" /> Manage
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}