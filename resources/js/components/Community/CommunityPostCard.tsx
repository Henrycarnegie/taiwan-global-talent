import {
    Award,
    Clock,
    Flame,
    MessageSquare,
    Pin,
    Send,
    Sparkles,
    Tag,
    ThumbsUp,
} from 'lucide-react';
import React, { useState } from 'react';
import type { CommunityPost } from '@/types/community';
import { formatRelativeTime } from '@/utils/date';

interface CommunityPostCardProps {
    post: CommunityPost;
    onLike: (postId: number) => void;
    onCommentSubmit: (postId: number, content: string) => void;
}

export default function CommunityPostCard({
    post,
    onLike,
    onCommentSubmit,
}: CommunityPostCardProps) {
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const engagementScore =
        post.likes_count * 2 +
        post.comments_count * 4 +
        (post.is_pinned ? 20 : 0);
    const isActiveDiscussion = post.comments_count > 2 || post.likes_count > 4;
    const reputationLabel =
        post.user.role === 'teacher'
            ? 'Mentor'
            : post.user.role === 'admin'
              ? 'Community Lead'
              : engagementScore > 18
                ? 'Helpful Member'
                : 'Rising Voice';

    const handleSendComment = (e: React.FormEvent) => {
        e.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        onCommentSubmit(post.id, commentText);
        setCommentText('');
    };

    return (
        <div
            className={`rounded-md border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                post.is_pinned
                    ? 'border-amber-200 bg-linear-to-b from-amber-50/40 to-white ring-1 ring-amber-100'
                    : 'border-slate-200'
            }`}
        >
            {post.is_pinned && (
                <div className="mb-3 flex items-center gap-1.5 text-xs font-black text-amber-700">
                    <Pin className="h-3.5 w-3.5 fill-amber-600 text-amber-600" />
                    <span>Pinned Announcement</span>
                </div>
            )}

            <div className="flex items-start gap-3">
                <div className="relative">
                    <img
                        src={
                            post.user.avatar_url ||
                            'https://ui-avatars.com/api/?background=f1f5f9&color=173b8f&name=' +
                                post.user.name
                        }
                        className="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm"
                        alt={post.user.name}
                    />
                    <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[#28a6a1]" />
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h4 className="cursor-pointer text-sm font-black text-slate-900 transition hover:text-[#173b8f]">
                            {post.user.name}
                        </h4>
                        <span
                            className={`rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-wider uppercase ${
                                post.user.role === 'admin'
                                    ? 'border-red-100 bg-red-50 text-red-600'
                                    : post.user.role === 'teacher'
                                      ? 'border-purple-100 bg-purple-50 text-purple-600'
                                      : 'border-blue-100 bg-blue-50 text-blue-600'
                            }`}
                        >
                            {post.user.role}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-[#f5c542]/30 bg-[#f5c542]/10 px-2 py-0.5 text-[10px] font-black text-[#173b8f]">
                            <Award className="h-3 w-3 text-[#f47b20]" />
                            {reputationLabel}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                        <span>
                            {post.user.university || 'Digital Talent Member'}
                        </span>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-slate-400" />
                            <span>{formatRelativeTime(post.created_at)}</span>
                        </div>
                    </div>
                </div>

                <div className="ml-auto flex flex-col items-end gap-2">
                    <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-black tracking-wide text-slate-600 uppercase">
                        <Tag className="h-2.5 w-2.5 text-[#28a6a1]" />
                        {post.tag}
                    </span>
                    {isActiveDiscussion && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#f47b20]/10 px-2 py-1 text-[10px] font-black tracking-wider text-[#f47b20] uppercase">
                            <Flame className="h-3 w-3" />
                            Active
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
                {post.content}
            </div>

            {post.media_url && (
                <div className="mt-3 overflow-hidden rounded-md border border-slate-100 bg-slate-50">
                    {post.media_type === 'video' ? (
                        <video
                            src={post.media_url}
                            controls
                            className="max-h-96 w-full object-cover"
                        />
                    ) : (
                        <img
                            src={post.media_url}
                            alt="Post media"
                            className="max-h-96 w-full object-cover"
                        />
                    )}
                </div>
            )}

            <div className="mt-4 grid gap-2 rounded-md border border-slate-100 bg-slate-50 p-3 sm:grid-cols-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <ThumbsUp className="h-3.5 w-3.5 text-[#173b8f]" />
                    {post.likes_count} likes
                </div>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 transition hover:text-[#173b8f]"
                >
                    <MessageSquare className="h-3.5 w-3.5 text-[#28a6a1]" />
                    {post.comments_count} comments
                </button>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Sparkles className="h-3.5 w-3.5 text-[#f47b20]" />
                    {engagementScore} rep impact
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                <button
                    onClick={() => onLike(post.id)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-bold transition hover:bg-slate-50 ${
                        post.is_liked_by_me
                            ? 'bg-[#173b8f]/8 text-[#173b8f]'
                            : 'text-slate-600'
                    }`}
                >
                    <ThumbsUp
                        className={`h-4 w-4 ${
                            post.is_liked_by_me
                                ? 'fill-[#173b8f] text-[#173b8f]'
                                : 'text-slate-500'
                        }`}
                    />
                    <span>Like</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-xs font-bold transition hover:bg-slate-50 ${
                        showComments
                            ? 'bg-slate-50 text-slate-900'
                            : 'text-slate-600'
                    }`}
                >
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span>Comment</span>
                </button>
            </div>

            {showComments && (
                <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
                    <form onSubmit={handleSendComment} className="flex gap-2">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition focus:border-[#28a6a1] focus:bg-white focus:ring-1 focus:ring-[#28a6a1] focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!commentText.trim()}
                            className="inline-flex items-center gap-1.5 rounded-md bg-[#173b8f] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#102a43] disabled:opacity-40"
                        >
                            <Send className="h-3 w-3" />
                            <span>Send</span>
                        </button>
                    </form>

                    <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                        {post.comments?.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex gap-2.5 text-xs"
                            >
                                <img
                                    src={
                                        comment.user.avatar_url ||
                                        'https://ui-avatars.com/api/?background=f1f5f9&color=173b8f&name=' +
                                            comment.user.name
                                    }
                                    className="mt-0.5 h-7 w-7 rounded-full border border-slate-100 object-cover"
                                    alt={comment.user.name}
                                />
                                <div className="flex-1 rounded-md border border-slate-100 bg-slate-50 p-3">
                                    <div className="mb-1 flex items-center justify-between gap-3">
                                        <span className="font-bold text-slate-900">
                                            {comment.user.name}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {formatRelativeTime(
                                                comment.created_at,
                                            )}
                                        </span>
                                    </div>
                                    <p className="leading-relaxed text-slate-700">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
