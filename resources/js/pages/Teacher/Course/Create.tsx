import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import TeacherNavbar from '@/components/Teacher/TeacherNavbar';
import type { Teacher } from '@/types/teacher/type';

export default function Create({ teacher }: { teacher: Teacher }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category: 'mandarin',
        description: '',
        price: 0,
        thumbnail: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/teacher/courses');
    };

    return (
        <>
            <Head title="Create New Course" />
            <div className="min-h-screen bg-gray-50/50">
                <TeacherNavbar teacher={teacher} />

                <main className="max-w-4xl mx-auto px-4 py-8">
                    <Link
                        href="/teacher/dashboard"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-800 mb-6 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Link>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h1 className="text-xl font-bold text-gray-900 mb-1">Create Course</h1>
                        <p className="text-xs text-gray-500 mb-8">Fill in the course details below to draft your course.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="e.g. Master HSK 3 Vocabulary & Grammar"
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value as any)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    >
                                        <option value="mandarin">Mandarin Course</option>
                                        <option value="others">Others Course</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Price (TWD)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', Number(e.target.value))}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Description
                                </label>
                                <textarea
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Write a clear overview about this course..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Course Thumbnail
                                </label>
                                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-50 transition cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('thumbnail', e.target.files?.[0] || null)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-xs font-bold text-gray-700">
                                        {data.thumbnail ? data.thumbnail.name : 'Click to upload thumbnail image'}
                                    </p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG up to 2MB</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <Link
                                    href="/teacher/dashboard"
                                    className="px-5 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-sm disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" /> Save Course Draft
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}