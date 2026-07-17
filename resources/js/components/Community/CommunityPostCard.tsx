import React, { useState } from 'react';
import type { CommunityPost } from '@/types/community';
import { formatRelativeTime } from '@/utils/date';

interface CommunityPostCardProps {
    post: CommunityPost;
    onLike: (postId: number) => void;
    onCommentSubmit: (postId: number, content: string) => void;
}

export default function CommunityPostCard({ post, onLike, onCommentSubmit }: CommunityPostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');

    const handleSendComment = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!commentText.trim()) {
            return;
        }
        
        onCommentSubmit(post.id, commentText);
        setCommentText('');
    };

    return (
        <div className={`rounded-2xl border bg-white p-5 shadow-sm transition-all ${post.is_pinned ? 'border-amber-300 ring-1 ring-amber-100' : 'border-gray-200'}`}>
            {post.is_pinned && (
                <div className="mb-3 flex items-center gap-1 text-xs font-bold text-amber-600">
                    📌 <span>Pinned Announcement</span>
                </div>
            )}

            {/* Header: User Info */}
            <div className="flex items-center gap-3">
                <img
                    src={post.user.avatar_url || 'https://ui-avatars.com/api/?name=' + post.user.name}
                    className="h-11 w-11 rounded-full border object-cover"
                    alt={post.user.name}
                />
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer">{post.user.name}</h4>
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${
                            post.user.role === 'admin' ? 'bg-red-50 text-red-600' : post.user.role === 'teacher' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                            {post.user.role}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{post.user.university || 'Digital Talent Member'} • {formatRelativeTime(post.created_at)}</p>
                </div>
                <div className="ml-auto">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-slate-700 uppercase">
                        {post.tag}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                {post.content}
            </div>

            {/* Media Rendering (R2 Integration Display) */}
            {post.media_url && (
                <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    {post.media_type === 'video' ? (
                        <video src={post.media_url} controls className="max-h-96 w-full object-cover" />
                    ) : (
                        <img src={post.media_url} alt="Post media" className="max-h-96 w-full object-cover" />
                    )}
                </div>
            )}

            {/* Stats Counter */}
            <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-2 text-xs text-gray-500">
                <span className="flex items-center gap-1">👍 {post.likes_count} Likes</span>
                <span className="cursor-pointer hover:underline" onClick={() => setShowComments(!showComments)}>
                    💬 {post.comments_count} Comments
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around pt-2">
                <button 
                    onClick={() => onLike(post.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition hover:bg-gray-50 ${post.is_liked_by_me ? 'text-blue-600' : 'text-gray-600'}`}
                >
                    {post.is_liked_by_me ? '👍 Liked' : '👍 Like'}
                </button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                    💬 Comment
                </button>
            </div>

            {/* Expandable Comments Drawer */}
            {showComments && (
                <div className="mt-4 space-y-4 border-t border-gray-50 pt-4">
                    {/* Write Comment Box */}
                    <form onSubmit={handleSendComment} className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <button type="submit" className="rounded-full bg-blue-50 px-4 text-xs font-bold text-blue-600 hover:bg-blue-100">Send</button>
                    </form>

                    {/* Rendering Comment List */}
                    <div className="space-y-3">
                        {post.comments?.map((comment) => (
                            <div key={comment.id} className="flex gap-2 text-xs">
                                <img
                                    src={comment.user.avatar_url || 'https://ui-avatars.com/api/?name=' + comment.user.name}
                                    className="h-7 w-7 rounded-full object-cover mt-0.5"
                                    alt={comment.user.name}
                                />
                                <div className="flex-1 rounded-xl bg-gray-50 p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-gray-900">{comment.user.name}</span>
                                        <span className="text-[10px] text-gray-400">{formatRelativeTime(comment.created_at)}</span>
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}