import { Pin, ThumbsUp, MessageSquare, Send, Clock, Tag } from 'lucide-react';
import React, { useState } from 'react';
import type { CommunityPost } from '@/types/community';
import { formatRelativeTime } from '@/utils/date.helper';

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
        <div className={`rounded-2xl border bg-white p-5 shadow-sm transition-all ${
            post.is_pinned 
                ? 'border-amber-200 bg-linear-to-b from-amber-50/40 to-white ring-1 ring-amber-100' 
                : 'border-gray-200'
        }`}>
            {post.is_pinned && (
                <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                    <Pin className="h-3.5 w-3.5 fill-amber-600 text-amber-600" />
                    <span>Pinned Announcement</span>
                </div>
            )}

            {/* Header: User Info */}
            <div className="flex items-start gap-3">
                <img
                    src={post.user.avatar_url || 'https://ui-avatars.com/api/?background=f1f5f9&color=475569&name=' + post.user.name}
                    className="h-10 w-10 rounded-full border border-gray-100 object-cover"
                    alt={post.user.name}
                />
                <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition">
                            {post.user.name}
                        </h4>
                        <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                            post.user.role === 'admin' 
                                ? 'bg-red-50 text-red-600 border-red-100' 
                                : post.user.role === 'teacher' 
                                ? 'bg-purple-50 text-purple-600 border-purple-100' 
                                : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                            {post.user.role}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <span>{post.user.university || 'Digital Talent Member'}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span>{formatRelativeTime(post.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="ml-auto">
                    <span className="inline-flex items-center gap-1 rounded-lg border border-gray-100 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                        <Tag className="h-2.5 w-2.5 text-slate-400" />
                        {post.tag}
                    </span>
                </div>
            </div>

            {/* Content Body */}
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
                {post.content}
            </div>

            {/* Media Rendering */}
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
            <div className="mt-4 flex items-center justify-between border-b border-gray-100 pb-2.5 text-xs text-gray-500">
                <span className="font-medium">{post.likes_count} Likes</span>
                <button 
                    onClick={() => setShowComments(!showComments)} 
                    className="hover:text-blue-600 hover:underline font-medium transition"
                >
                    {post.comments_count} Comments
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-1.5">
                <button 
                    onClick={() => onLike(post.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all hover:bg-slate-50 ${
                        post.is_liked_by_me 
                            ? 'text-blue-600 bg-blue-50/50 hover:bg-blue-50' 
                            : 'text-gray-600'
                    }`}
                >
                    <ThumbsUp className={`h-4 w-4 ${post.is_liked_by_me ? 'fill-blue-600 text-blue-600' : 'text-gray-500'}`} />
                    <span>Like</span>
                </button>
                <button 
                    onClick={() => setShowComments(!showComments)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-xs font-bold transition-all hover:bg-slate-50 ${
                        showComments ? 'text-slate-900 bg-slate-50' : 'text-gray-600'
                    }`}
                >
                    <MessageSquare className="h-4 w-4 text-gray-500" />
                    <span>Comment</span>
                </button>
            </div>

            {/* Expandable Comments Section */}
            {showComments && (
                <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
                    {/* Write Comment Box */}
                    <form onSubmit={handleSendComment} className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                        <button 
                            type="submit" 
                            disabled={!commentText.trim()}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600"
                        >
                            <Send className="h-3 w-3" />
                            <span>Send</span>
                        </button>
                    </form>

                    {/* Rendering Comment List */}
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                        {post.comments?.map((comment) => (
                            <div key={comment.id} className="flex gap-2.5 text-xs">
                                <img
                                    src={comment.user.avatar_url || 'https://ui-avatars.com/api/?background=f1f5f9&color=475569&name=' + comment.user.name}
                                    className="h-7 w-7 rounded-full border border-gray-100 object-cover mt-0.5"
                                    alt={comment.user.name}
                                />
                                <div className="flex-1 rounded-2xl border border-gray-100 bg-slate-50 p-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-gray-900">{comment.user.name}</span>
                                        <span className="text-[10px] text-gray-400">{formatRelativeTime(comment.created_at)}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}