import { BookOpen, Volume2 } from 'lucide-react';
import React from 'react';

interface MandarinAddonProps {
    lesson: any;
    playAudio: (path: string | null) => void;
}

export default function MandarinAddonPanel({ lesson, playAudio }: MandarinAddonProps) {
    if (!lesson) {
        return null;
    }

    const hasVocab = lesson.vocabularies && lesson.vocabularies.length > 0;
    const hasSentences = lesson.sentences && lesson.sentences.length > 0;

    if (!hasVocab && !hasSentences) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Daftar Kosa Kata */}
            {hasVocab && (
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <h3 className="text-xs font-bold text-gray-900 uppercase">🔊 Vocabulary List</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {lesson.vocabularies.map((v: any) => (
                            <div key={v.id} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50/50">
                                <div>
                                    <span className="font-mono text-lg font-bold text-blue-600">{v.hanzi}</span>
                                    <span className="ml-2 text-xs text-gray-400">[{v.pinyin}]</span>
                                    <p className="mt-0.5 text-xs text-gray-600">Meaning: {v.meaning}</p>
                                </div>
                                {v.audio_path && (
                                    <button
                                        onClick={() => playAudio(v.audio_path)}
                                        className="rounded-lg bg-gray-100 p-2 text-xs transition-colors hover:bg-blue-50 hover:text-blue-600"
                                    >
                                        🔊
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Contoh Kalimat */}
            {hasSentences && (
                <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
                    <h3 className="flex items-center gap-2 text-xs font-bold text-gray-900 uppercase">
                        <BookOpen size={15} /> Sentences Examples
                    </h3>
                    {lesson.sentences.map((sentence: any) => (
                        <div key={sentence.id} className="flex items-start gap-4 border-b border-gray-50 p-2 last:border-0">
                            <button
                                onClick={() => playAudio(sentence.audio_path)}
                                className="cursor-pointer rounded-lg bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
                            >
                                <Volume2 size={15} />
                            </button>
                            <div>
                                <h5 className="font-mono text-base font-bold text-gray-900">{sentence.hanzi}</h5>
                                <p className="text-xs text-blue-600">{sentence.pinyin}</p>
                                <p className="mt-0.5 text-xs text-gray-500">{sentence.meaning}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}