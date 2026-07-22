import { ImagePlus, Send, Tag, X } from 'lucide-react';
import React, { useState } from 'react';
import type { CommunityUser } from '@/types/community';

interface CreatePostBoxProps {
    currentUser: CommunityUser;
    onSubmit: (content: string, tag: string, media: File | null) => void;
}

export default function CreatePostBox({
    currentUser,
    onSubmit,
}: CreatePostBoxProps) {
    const [content, setContent] = useState('');
    const [selectedTag, setSelectedTag] = useState('General');
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    const tags = [
        'Scholarships',
        'Internship Info',
        'Life in Taiwan',
        'General',
    ];

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        onSubmit(content, selectedTag, mediaFile);

        setContent('');
        setMediaFile(null);
    };

    return (
        <form
            onSubmit={handlePostSubmit}
            className="overflow-hidden rounded-md border border-[#173b8f]/10 bg-white shadow-sm"
        >
            <div className="border-b border-slate-100 bg-[#fffaf0] px-5 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={
                            currentUser.avatar_url ||
                            'https://ui-avatars.com/api/?name=' +
                                currentUser.name
                        }
                        className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                        alt={currentUser.name}
                    />
                    <div>
                        <p className="text-xs font-black tracking-widest text-[#f47b20] uppercase">
                            Start a signal
                        </p>
                        <p className="text-sm font-black text-[#173b8f]">
                            {currentUser.name}
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 focus-within:border-[#28a6a1] focus-within:bg-white">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`What should other students know, ${currentUser.name.split(' ')[0]}?`}
                        className="w-full resize-none border-0 bg-transparent p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 focus:ring-0 focus:outline-none"
                        rows={3}
                    />
                </div>

                {mediaFile && (
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-md border border-[#28a6a1]/20 bg-[#28a6a1]/10 p-3 text-xs font-semibold text-slate-600">
                        <span className="truncate">
                            {mediaFile.name} (
                            {(mediaFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                        <button
                            type="button"
                            onClick={() => setMediaFile(null)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-red-600"
                            aria-label="Remove media"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <label className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600">
                            <Tag className="h-3.5 w-3.5 text-[#f47b20]" />
                            <select
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                className="border-0 bg-transparent p-0 text-xs font-black text-slate-600 focus:ring-0 focus:outline-none"
                                aria-label="Post tag"
                            >
                                {tags.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-600 transition hover:border-[#28a6a1]/40 hover:text-[#173b8f]">
                            <ImagePlus className="h-3.5 w-3.5 text-[#28a6a1]" />
                            <span>Media</span>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={(e) =>
                                    setMediaFile(e.target.files?.[0] || null)
                                }
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!content.trim()}
                        className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#173b8f] px-4 text-xs font-black text-white shadow-sm transition hover:bg-[#102a43] disabled:cursor-not-allowed disabled:opacity-45"
                    >
                        <Send className="h-3.5 w-3.5" />
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}
