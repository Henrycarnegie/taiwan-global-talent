import { Link, router } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import LessonContentBlock from '@/components/Course/LessonContentBlock';
import LessonSyllabus from '@/components/Course/LessonSyllabus';
import MandarinAddonPanel from '@/components/Course/MandarinAddOnPanel';
import MediaContentManager from '@/components/Course/MediaContentManager';
import { getYouTubeEmbedUrl, playAudio } from '@/utils/helpers';
import Layout from '../Layout';

export default function Show({ course, currentCategory }: any) {
    const [activeLesson, setActiveLesson] = useState<any>(course.lessons?.[0] || null);
    const [loading, setLoading] = useState(false);
    const isMandarin = currentCategory.id === 1;

    console.log(activeLesson)

    const handleCompleteLesson = () => {
        if (!activeLesson || loading) {
            return;
        }

        setLoading(true);

        router.post(
            `/student/courses/${course.id}/lessons/${activeLesson.id}/complete`,
            {},
            {
                onSuccess: (page: any) => {
                    const flashData = page.props.flash || {};
                    alert(flashData.success || 'Progres materi Anda berhasil disimpan.');

                    const currentIdx = course.lessons.findIndex((l: any) => l.id === activeLesson.id);

                    if (currentIdx !== -1 && currentIdx + 1 < course.lessons.length) {
                        setActiveLesson(course.lessons[currentIdx + 1]);
                    } else {
                        alert('Selamat! Anda telah menyelesaikan kelas ini. Silakan unduh sertifikat Anda di halaman Sertifikat.');
                        router.get('/student/courses/certificate');
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Gagal memperbarui data progres materi.');
                },
                onFinish: () => setLoading(false),
                preserveScroll: true,
            }
        );
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Top Header */}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                    <Link
                        href={`/student/courses/${currentCategory.slug}`}
                        className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h2 className="text-base font-bold tracking-tight text-gray-900">{course.title}</h2>
                        <p className="text-xs text-gray-400">{currentCategory.name} Program</p>
                    </div>
                </div>

                {/* Grid Pembagian Panel */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Panel (Syllabus) */}
                    <div className="relative lg:col-span-4">
                        <LessonSyllabus
                            lessons={course.lessons}
                            activeLessonId={activeLesson?.id || null}
                            onSelectLesson={(lesson) => setActiveLesson(lesson)}
                        />
                    </div>

                    {/* Right Panel */}
                    <div className="space-y-6 lg:col-span-8">
                        {activeLesson && (
                            <>
                                {/* 1. Main Text */}
                                <LessonContentBlock
                                    lesson={activeLesson}
                                    isMandarin={isMandarin}
                                />

                                {/* 2. Multimedia Player (Video/Audios/PDF) */}
                                <MediaContentManager
                                    lesson={activeLesson}
                                    getYouTubeEmbedUrl={getYouTubeEmbedUrl}
                                />

                                {/* 3. Chinese Program (Vocab & Kalimat) */}
                                <MandarinAddonPanel
                                    lesson={activeLesson}
                                    playAudio={playAudio}
                                />

                                {/* 4. Complete Module Button */}
                                <div className="flex justify-end rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                                    <button
                                        onClick={handleCompleteLesson}
                                        disabled={loading}
                                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 cursor-pointer"
                                    >
                                        <CheckCircle2 size={16} />
                                        {loading ? 'Saving Progress...' : 'Mark as Completed & Next'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}