import { Link } from '@inertiajs/react';
import { ArrowLeft, Volume2, BookOpen, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import Layout from '../Layout';

export default function Show({ course }: any) {
    const [activeLesson, setActiveLesson] = useState<any>(course.lessons?.[0] || null);

    const playAudio = (path: string | null) => {
        if (!path) {
            return
        }
        
        new Audio(`/storage/${path}`).play().catch(err => console.error("Audio error:", err));
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Back Header */}
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
                    <Link href="/mandarin-courses" className="rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 transition-colors">
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h2 className="text-base font-bold text-gray-900 tracking-tight">{course.title}</h2>
                        <p className="text-xs text-gray-400">{course.chineseTitle}</p>
                    </div>
                </div>

                {/* Workspace Panels */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Panel */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs space-y-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
                                <GraduationCap size={14} /> Course Syllabus
                            </h3>
                            <div className="space-y-1">
                                {course.lessons?.map((lesson: any, idx: number) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setActiveLesson(lesson)}
                                        className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                                            activeLesson?.id === lesson.id ? 'bg-blue-600 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500">{idx + 1}</span>
                                        <div className="text-sm font-bold truncate">{lesson.title}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="lg:col-span-8 space-y-6">
                        {activeLesson && (
                            <>
                                {/* Context */}
                                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
                                    <p className="text-sm text-gray-600 bg-gray-50 p-3.5 rounded-xl">{activeLesson.content}</p>
                                </div>

                                {/* Sentences */}
                                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 space-y-4">
                                    <h3 className="font-bold text-gray-900 text-xs uppercase flex items-center gap-2"><BookOpen size={15} /> Sentences</h3>
                                    {activeLesson.sentences?.map((sentence: any) => (
                                        <div key={sentence.id} className="flex items-start gap-4">
                                            <button onClick={() => playAudio(sentence.audio_path)} className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><Volume2 size={15} /></button>
                                            <div>
                                                <h5 className="text-base font-bold text-gray-900 font-mono">{sentence.hanzi}</h5>
                                                <p className="text-xs text-blue-600">{sentence.pinyin}</p>
                                                <p className="text-xs text-gray-500">{sentence.meaning}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}