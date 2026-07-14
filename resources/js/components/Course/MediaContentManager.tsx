import { Music, FileText, FileDown } from 'lucide-react';
import React from 'react';

interface MediaContentProps {
    lesson: any;
    getYouTubeEmbedUrl: (url: string) => string | null;
}

export default function MediaContentManager({
    lesson,
    getYouTubeEmbedUrl,
}: MediaContentProps) {
    if (!lesson) {
        return null;
    }

    switch (lesson.content_type) {
        case 'video': {
            // 🌟 FIX: Dibungkus dengan kurung kurawal block {} untuk mengatasi no-case-declarations
            const embedUrl = getYouTubeEmbedUrl(lesson.video_url);

            return (
                <div className="aspect-video overflow-hidden rounded-2xl border border-gray-100 bg-black shadow-xs">
                    {embedUrl ? (
                        <iframe
                            className="h-full w-full"
                            src={embedUrl}
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : lesson.video_path ? (
                        <video
                            className="h-full w-full"
                            controls
                            src={`/storage/${lesson.video_path}`}
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                            Media Video Tidak Ditemukan
                        </div>
                    )}
                </div>
            );
        }

        case 'audio': {
            // 🌟 FIX: Menggunakan kurung kurawal curly braces pada statement IF
            if (!lesson.audios || lesson.audios.length === 0) {
                return null;
            }

            return (
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-wider text-gray-900 uppercase">
                        <Music size={15} className="text-blue-600" />
                        Audio Lessons ({lesson.audios.length})
                    </div>

                    <div className="divide-y divide-gray-200">
                        {lesson.audios.map((audio: any, index: number) => {
                            return (
                                <div
                                    key={audio.id}
                                    className="gap-2 py-3.5 first:pt-1 last:pb-1 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="text-[11px] font-bold text-blue-600 uppercase">
                                        Track {index + 1}
                                    </span>

                                    <div className="w-full space-y-0.5 sm:w-auto">
                                        <p className="text-sm font-medium text-gray-600">
                                            {audio.lesson_audio_description ||
                                                'No description available'}
                                        </p>
                                        <audio
                                            className="custom-audio-player h-8 w-full mt-2"
                                            controls
                                            src={audio.lesson_audio_url}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        case 'pdf': {
            // 🌟 FIX: Menggunakan kurung kurawal curly braces pada statement IF
            if (!lesson.pdf_path) {
                return null;
            }

            return (
                <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-red-50 p-3 text-red-600">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">
                                Attachment Material File (PDF)
                            </h4>
                            <p className="text-xs text-gray-400">
                                Unduh dokumen materi pendukung modul ini
                            </p>
                        </div>
                    </div>
                    <a
                        href={`/storage/${lesson.pdf_path}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-xl bg-gray-950 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-gray-800"
                    >
                        <FileDown size={14} /> Open PDF
                    </a>
                </div>
            );
        }

        default:
            return null;
    }
}
