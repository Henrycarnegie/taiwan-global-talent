import React, { useState } from 'react';
import type { CommunityUser } from '@/types/community';

interface CreatePostBoxProps {
    currentUser: CommunityUser;
    onSubmit: (content: string, tag: string, media: File | null) => void;
}

export default function CreatePostBox({ currentUser, onSubmit }: CreatePostBoxProps) {
    const [content, setContent] = useState('');
    const [selectedTag, setSelectedTag] = useState('General');
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    const tags = ['Scholarships', 'Internship Info', 'Life in Taiwan', 'General'];

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
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex gap-3">
                <img
                    src={currentUser.avatar_url || 'https://ui-avatars.com/api/?name=' + currentUser.name}
                    className="h-10 w-10 rounded-full border object-cover"
                    alt={currentUser.name}
                />
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`Share something with the community, ${currentUser.name.split(' ')[0]}...`}
                        className="w-full resize-none border-0 p-2 text-sm text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none"
                        rows={3}
                    />
                </div>
            </div>

            {/* Media Preview if uploaded */}
            {mediaFile && (
                <div className="relative mt-2 rounded-lg bg-gray-50 p-2 text-xs flex items-center justify-between text-gray-600">
                    <span>📁 {mediaFile.name} ({(mediaFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                    <button onClick={() => setMediaFile(null)} className="text-red-500 font-bold hover:text-red-700">✕</button>
                </div>
            )}

            <hr className="my-3 border-gray-100" />

            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                    {/* Tag Selector */}
                    <select 
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 focus:border-blue-500 focus:outline-none"
                    >
                        {tags.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    {/* R2 Image/Video Upload Trigger */}
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100">
                        📸 <span>Media</span>
                        <input 
                            type="file" 
                            accept="image/*,video/*" 
                            className="hidden" 
                            onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                        />
                    </label>
                </div>

                <button
                    onClick={handlePostSubmit}
                    disabled={!content.trim()}
                    className="rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                >
                    Post
                </button>
            </div>
        </div>
    );
}