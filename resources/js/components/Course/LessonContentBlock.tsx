import { FileText } from 'lucide-react';
import React from 'react';

interface ContentBlockProps {
    lesson: any;
    isMandarin: boolean;
}

export default function LessonContentBlock({ lesson, isMandarin }: ContentBlockProps) {
    if (!lesson || !lesson.content) {
        return null;
    }

    return (
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
                <FileText size={15} /> Lesson Content
            </h3>

            {isMandarin && lesson.sentence_hanzi && (
                <div className="mb-2 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <span className="mb-1 block text-[10px] font-bold text-amber-700 uppercase">Target Sentence</span>
                    <h1 className="font-mono text-2xl font-bold text-gray-900">{lesson.sentence_hanzi}</h1>
                </div>
            )}

            <div
                className="prose prose-blue raw-html-content max-w-none text-sm whitespace-pre-line text-gray-600"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
        </div>
    );
}