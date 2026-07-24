import { Head, useForm, Link, router } from '@inertiajs/react';
import { ArrowLeft, Save, Plus, Video, Trash2, Edit3 } from 'lucide-react';
import { useState } from 'react';
import LessonManagerModal from '@/components/Teacher/LessonManagerModal';
import TeacherNavbar from '@/components/Teacher/TeacherNavbar';
import type { Course, Lesson, Teacher } from '@/types/teacher/type';

export default function EditCourse({ teacher, course }: { teacher: Teacher; course: Course }) {
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const { data, setData, post, processing } = useForm({
        _method: 'PUT',
        title: course.title,
        category: course.category,
        description: course.description || '',
        price: course.price,
        status: course.status,
    });

    const handleCourseSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/teacher/courses/${course.id}`);
    };

    const handleDeleteLesson = (lessonId: number) => {
        if (confirm('Are you sure you want to delete this lesson?')) {
            router.delete(`/teacher/lessons/${lessonId}`);
        }
    };

    return (
        <>
            <Head title={`Edit Course - ${course.title}`} />
            <div className="min-h-screen bg-gray-50/50">
                <TeacherNavbar teacher={teacher} />

                <main className="max-w-6xl mx-auto px-4 py-8">
                    <Link
                        href="/teacher/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course Settings Form */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                            <h2 className="text-base font-bold text-gray-900 mb-4">Course Settings</h2>
                            <form onSubmit={handleCourseSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value as any)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="mandarin">Mandarin Course</option>
                                        <option value="others">Others Course</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Status</label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value as any)}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-indigo-600 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price (TWD)</label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', Number(e.target.value))}
                                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                                >
                                    <Save className="w-4 h-4" /> Save Course Details
                                </button>
                            </form>
                        </div>

                        {/* Lessons List & CRUD Section */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Course Lessons</h2>
                                    <p className="text-xs text-gray-500">Manage curriculum and video modules for this course.</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedLesson(null);
                                        setIsLessonModalOpen(true);
                                    }}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
                                >
                                    <Plus className="w-4 h-4" /> Add Lesson
                                </button>
                            </div>

                            {/* Lessons Curriculum List */}
                            {course.lessons && course.lessons.length > 0 ? (
                                <div className="space-y-3">
                                    {course.lessons.map((lesson, idx) => (
                                        <div
                                            key={lesson.id}
                                            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50/80 transition"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold">
                                                    {idx + 1}
                                                </span>
                                                <div>
                                                    <h4 className="text-xs font-bold text-gray-800">{lesson.title}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                            <Video className="w-3 h-3 text-indigo-500" /> Video URL Linked
                                                        </span>
                                                        {lesson.is_free_preview && (
                                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                                                Free Preview
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedLesson(lesson);
                                                        setIsLessonModalOpen(true);
                                                    }}
                                                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteLesson(lesson.id!)}
                                                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                                    <Video className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-gray-700">No lessons added yet</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Click 'Add Lesson' to start building modules.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Modal CRUD Lesson */}
                {isLessonModalOpen && (
                    <LessonManagerModal
                        courseId={course.id}
                        lesson={selectedLesson}
                        onClose={() => setIsLessonModalOpen(false)}
                    />
                )}
            </div>
        </>
    );
}