import React from 'react';

interface LessonSyllabusProps {
    lessons: any[];
    activeLessonId: number | null;
    onSelectLesson: (lesson: any) => void;
}

export default function LessonSyllabus({ lessons = [], activeLessonId, onSelectLesson }: LessonSyllabusProps) {
    return (
        <div className="sticky top-28 space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
            <h3 className="px-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                📚 Course Syllabus
            </h3>
            <div className="space-y-1">
                {lessons.map((lesson: any, idx: number) => (
                    <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson)}
                        className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all ${
                            activeLessonId === lesson.id
                                ? 'bg-blue-600 font-medium text-white shadow-sm'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
                            activeLessonId === lesson.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                            {idx + 1}
                        </span>
                        <div className="truncate text-sm font-bold">
                            {lesson.title}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}