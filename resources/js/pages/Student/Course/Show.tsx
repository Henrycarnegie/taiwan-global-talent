import { Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Volume2,
    BookOpen,
    GraduationCap,
    FileText,
    Music,
    FileDown,
    CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';
import Layout from '../Layout';

export default function Show({ course, currentCategory }: any) {
    const [activeLesson, setActiveLesson] = useState<any>(
        course.lessons?.[0] || null,
    );

    console.log(course)
    console.log(course.lessons)

    const [loading, setLoading] = useState(false);
    const isMandarin = currentCategory.id === 1;

    const playAudio = (path: string | null) => {
        if (!path) {
            alert('Audio path tidak tersedia.');

            return;
        }

        new Audio(`/storage/${path}`)
            .play()
            .catch((err) => console.error('Audio error:', err));
    };

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) {
            return null;
        }

        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        return match && match[2].length === 11
            ? `https://www.youtube.com/embed/${match[2]}`
            : null;
    };

    // PERBAIKAN: Menyesuaikan penanganan request menggunakan router bawaan Inertia
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
                    // Ambil session data terbaru setelah request berhasil
                    const flashData = page.props.flash || {};

                    // STEP 2: Cek apakah kursus sudah 100% dan butuh download
                    if (flashData.trigger_download && flashData.download_url) {
                        alert(
                            flashData.success ||
                                'Selamat! Kelas telah diselesaikan, sertifikat Anda sedang diunduh...',
                        );

                        // Eksekusi trigger download menggunakan GET request bawaan browser
                        window.location.href = flashData.download_url;
                    } else {
                        alert(
                            flashData.success ||
                                'Progres materi Anda berhasil disimpan.',
                        );

                        // Pindah ke materi selanjutnya jika belum selesai
                        const currentIdx = course.lessons.findIndex(
                            (l: any) => l.id === activeLesson.id,
                        );

                        if (
                            currentIdx !== -1 &&
                            currentIdx + 1 < course.lessons.length
                        ) {
                            setActiveLesson(course.lessons[currentIdx + 1]);
                        }
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Gagal memperbarui data progres.');
                },
                onFinish: () => {
                    setLoading(false);
                },
                preserveScroll: true,
            },
        );
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Back Header */}
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                    <Link
                        href={`/student/courses/${currentCategory.slug}`}
                        className="rounded-xl border border-gray-200 p-2 text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        <ArrowLeft size={16} />
                    </Link>
                    <div>
                        <h2 className="text-base font-bold tracking-tight text-gray-900">
                            {course.title}
                        </h2>
                        <p className="text-xs text-gray-400">
                            {currentCategory.name} Program
                        </p>
                    </div>
                </div>

                {/* Workspace Panels */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Left Panel (Syllabus) */}
                    <div className="relative lg:col-span-4">
                        <div className="sticky top-28 space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                            <h3 className="flex items-center gap-1.5 px-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
                                <GraduationCap size={14} /> Course Syllabus
                            </h3>
                            <div className="space-y-1">
                                {course.lessons?.map(
                                    (lesson: any, idx: number) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() =>
                                                setActiveLesson(lesson)
                                            }
                                            className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all ${
                                                activeLesson?.id === lesson.id
                                                    ? 'bg-blue-600 font-medium text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                        >
                                            <span className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold text-gray-500">
                                                {idx + 1}
                                            </span>
                                            <div className="truncate text-sm font-bold">
                                                {lesson.title}
                                            </div>
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel (Content Manager) */}
                    <div className="space-y-6 lg:col-span-8">
                        {activeLesson && (
                            <>
                                {/* KONDISIONAL MULTIMEDIA */}
                                {activeLesson.content_type === 'video' && (
                                    <div className="aspect-video overflow-hidden rounded-2xl border border-gray-100 bg-black shadow-xs">
                                        {getYouTubeEmbedUrl(
                                            activeLesson.video_url,
                                        ) ? (
                                            <iframe
                                                className="h-full w-full"
                                                src={getYouTubeEmbedUrl(
                                                    activeLesson.video_url,
                                                )!}
                                                title={activeLesson.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : activeLesson.video_path ? (
                                            <video
                                                className="h-full w-full"
                                                controls
                                                src={`/storage/${activeLesson.video_path}`}
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                Media Video Tidak Ditemukan
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeLesson.content_type === 'audio' &&
                                    activeLesson.lesson_audio_path && (
                                        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 p-5 shadow-xs">
                                            <div className="flex items-center gap-2.5 text-xs font-bold text-blue-700 uppercase">
                                                <Music size={16} /> Audio
                                                Listening Class
                                            </div>
                                            <audio
                                                className="mt-1 w-full"
                                                controls
                                                src={`/storage/${activeLesson.lesson_audio_path}`}
                                            />
                                        </div>
                                    )}

                                {activeLesson.content_type === 'pdf' &&
                                    activeLesson.pdf_path && (
                                        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-xl bg-red-50 p-3 text-red-600">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-gray-900">
                                                        Attachment Material File
                                                        (PDF)
                                                    </h4>
                                                    <p className="text-xs text-gray-400">
                                                        Unduh dokumen materi
                                                        pendukung modul ini
                                                    </p>
                                                </div>
                                            </div>
                                            <a
                                                href={`/storage/${activeLesson.pdf_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center gap-1.5 rounded-xl bg-gray-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-gray-800"
                                            >
                                                <FileDown size={14} /> Open PDF
                                            </a>
                                        </div>
                                    )}

                                {/* BLOK MATERI POKOK */}
                                {activeLesson.content && (
                                    <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                                        <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
                                            <FileText size={15} /> Lesson
                                            Content
                                        </h3>

                                        {isMandarin &&
                                            activeLesson.sentence_hanzi && (
                                                <div className="mb-2 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                                    <span className="mb-1 block text-[10px] font-bold text-amber-700 uppercase">
                                                        Target Sentence
                                                    </span>
                                                    <h1 className="font-mono text-2xl font-bold text-gray-900">
                                                        {
                                                            activeLesson.sentence_hanzi
                                                        }
                                                    </h1>
                                                </div>
                                            )}

                                        <div
                                            className="prose prose-blue raw-html-content max-w-none text-sm whitespace-pre-line text-gray-600"
                                            dangerouslySetInnerHTML={{
                                                __html: activeLesson.content,
                                            }}
                                        />
                                    </div>
                                )}

                                {/* BLOK KONDISIONAL MANDARIN */}
                                {isMandarin && (
                                    <>
                                        {activeLesson.vocabularies?.length >
                                            0 && (
                                            <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                                                <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
                                                    🔊 Vocabulary List
                                                </h3>
                                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                    {activeLesson.vocabularies.map(
                                                        (v: any) => (
                                                            <div
                                                                key={v.id}
                                                                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50/50"
                                                            >
                                                                <div>
                                                                    <span className="font-mono text-lg font-bold text-blue-600">
                                                                        {
                                                                            v.hanzi
                                                                        }
                                                                    </span>
                                                                    <span className="ml-2 text-xs text-gray-400">
                                                                        [
                                                                        {
                                                                            v.pinyin
                                                                        }
                                                                        ]
                                                                    </span>
                                                                    <p className="mt-0.5 text-xs text-gray-600">
                                                                        Meaning:{' '}
                                                                        {
                                                                            v.meaning
                                                                        }
                                                                    </p>
                                                                </div>
                                                                {v.audio_path && (
                                                                    <button
                                                                        onClick={() =>
                                                                            playAudio(
                                                                                v.audio_path,
                                                                            )
                                                                        }
                                                                        className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                                    >
                                                                        🔊
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {activeLesson.sentences?.length > 0 && (
                                            <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                                                <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
                                                    <BookOpen size={15} />{' '}
                                                    Sentences Examples
                                                </h3>
                                                {activeLesson.sentences?.map(
                                                    (sentence: any) => (
                                                        <div
                                                            key={sentence.id}
                                                            className="flex items-start gap-4 border-b border-gray-50 p-2 last:border-0"
                                                        >
                                                            <button
                                                                onClick={() =>
                                                                    playAudio(
                                                                        sentence.audio_path,
                                                                    )
                                                                }
                                                                className="cursor-pointer rounded-lg bg-emerald-50 p-2 text-emerald-600"
                                                            >
                                                                <Volume2
                                                                    size={15}
                                                                />
                                                            </button>
                                                            <div>
                                                                <h5 className="font-mono text-base font-bold text-gray-900">
                                                                    {
                                                                        sentence.hanzi
                                                                    }
                                                                </h5>
                                                                <p className="text-xs text-blue-600">
                                                                    {
                                                                        sentence.pinyin
                                                                    }
                                                                </p>
                                                                <p className="mt-0.5 text-xs text-gray-500">
                                                                    {
                                                                        sentence.meaning
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* TOMBOL AKSI SELESAI MATERI */}
                                {activeLesson && (
                                    <div className="flex justify-end rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                                        <button
                                            onClick={handleCompleteLesson}
                                            disabled={loading}
                                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-400"
                                        >
                                            <CheckCircle2 size={16} />
                                            {loading
                                                ? 'Saving Progress...'
                                                : 'Mark as Completed & Next'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
