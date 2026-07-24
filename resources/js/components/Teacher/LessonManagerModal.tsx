import { useForm } from '@inertiajs/react';
import { X, Save } from 'lucide-react';
import type { Lesson } from '@/types/teacher/type';

interface Props {
    courseId: number;
    lesson: Lesson | null;
    onClose: () => void;
}

export default function LessonManagerModal({ courseId, lesson, onClose }: Props) {
    const isEdit = !!lesson;

    const { data, setData, post, put, processing } = useForm({
        course_id: courseId,
        title: lesson?.title || '',
        video_url: lesson?.video_url || '',
        content: lesson?.content || '',
        sort_order: lesson?.sort_order || 1,
        is_free_preview: lesson?.is_free_preview || false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isEdit) {
            put(`/teacher/lessons/${lesson.id}`, {
                onSuccess: () => onClose(),
            });
        } else {
            post('/teacher/lessons', {
                onSuccess: () => onClose(),
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">
                        {isEdit ? 'Edit Lesson Module' : 'Add New Lesson Module'}
                    </h3>
                    <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Lesson Title</label>
                        <input
                            type="text"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="e.g. Lesson 1: Introduction to Tones"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Video Stream URL</label>
                        <input
                            type="url"
                            value={data.video_url || ''}
                            onChange={(e) => setData('video_url', e.target.value)}
                            placeholder="https://youtube.com/embed/... or Vimeo Link"
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Content / Notes</label>
                        <textarea
                            rows={3}
                            value={data.content || ''}
                            onChange={(e) => setData('content', e.target.value)}
                            placeholder="Lesson summary or downloadable resource links..."
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_free_preview"
                            checked={data.is_free_preview}
                            onChange={(e) => setData('is_free_preview', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor="is_free_preview" className="text-xs font-semibold text-gray-700">
                            Allow Free Preview for Non-enrolled Students
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-1.5 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition"
                        >
                            <Save className="w-4 h-4" /> Save Lesson
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}