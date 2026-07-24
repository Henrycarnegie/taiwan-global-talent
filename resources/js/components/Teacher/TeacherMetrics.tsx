import { BookOpen, CheckCircle2, Languages, Video } from 'lucide-react';
import type { TeacherStats } from '@/types/teacher/type';

export default function TeacherMetrics({ stats }: { stats: TeacherStats }) {
    const cards = [
        { title: 'Total Courses', value: stats.total_courses, icon: BookOpen, color: 'text-blue-600 bg-blue-50 border-blue-100' },
        { title: 'Published Courses', value: stats.published_courses, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
        { title: 'Mandarin Tracks', value: stats.mandarin_courses, icon: Languages, color: 'text-amber-600 bg-amber-50 border-amber-100' },
        { title: 'Total Lessons', value: stats.total_lessons, icon: Video, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                
                return (
                    <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.title}</p>
                            <h3 className="text-2xl font-black text-gray-900 mt-1">{card.value}</h3>
                        </div>
                        <div className={`p-3.5 rounded-2xl border ${card.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}