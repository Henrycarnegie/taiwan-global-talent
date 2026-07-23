import { Head, useForm, router } from '@inertiajs/react';
import {
    MessageSquare,
    Heart,
    Send,
    Image as ImageIcon,
    Tag,
    Pin,
    Building2,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from '@/components/UI/ProfileDropdown';
import { useAuth } from '@/hooks/useAuth';

interface User {
    id: number;
    name: string;
    avatar_url?: string;
    university?: string;
    role?: string;
}

interface Comment {
    id: number;
    content: string;
    created_at: string;
    user: {
        name: string;
        avatar_url?: string;
    };
}

interface Post {
    id: number;
    user: User;
    tag: string;
    content: string;
    media_url?: string;
    media_type?: 'image' | 'video';
    is_pinned: boolean;
    likes_count: number;
    comments_count: number;
    is_liked_by_me: boolean;
    comments: Comment[];
    created_at: string;
}

interface Props {
    company: any;
    initialPosts: {
        data: Post[];
    };
}

export default function CompanyCommunityIndex({
    company,
    initialPosts,
}: Props) {
    const { user } = useAuth();
    const posts = initialPosts?.data || [];
    const [openCommentId, setOpenCommentId] = useState<number | null>(null);
    const [commentText, setCommentText] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        content: '',
        tag: 'Hiring / Career',
        media: null as File | null,
    });

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/company/community', {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleToggleLike = (postId: number) => {
        router.post(
            `/company/community/${postId}/like`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleCommentSubmit = (e: React.FormEvent, postId: number) => {
        e.preventDefault();

        if (!commentText.trim()) {
            return;
        }

        router.post(
            `/company/community/${postId}/comment`,
            {
                content: commentText,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setCommentText('');
                },
            },
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <Head title="Company Community Feed" />

            <ProfileDropdown user={user} />

            <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">
                {/* Header Section */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                                Talent & Company Community
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Share company achievements, hiring updates, and
                                engage with talents.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Create Post Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <form onSubmit={handlePostSubmit} className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-indigo-100 font-bold text-indigo-600 dark:bg-indigo-950">
                                {company?.logo_url ? (
                                    <img
                                        src={company.logo_url}
                                        alt="Logo"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                )}
                            </div>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                placeholder="Share a company update, job vacancy, or announcement..."
                                rows={3}
                                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                required
                            />
                        </div>

                        {errors.content && (
                            <p className="text-xs text-rose-500">
                                {errors.content}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                {/* Tag Select */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <Tag className="h-4 w-4 text-slate-400" />
                                    <select
                                        value={data.tag}
                                        onChange={(e) =>
                                            setData('tag', e.target.value)
                                        }
                                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                                    >
                                        <option value="Hiring / Career">
                                            Hiring / Career
                                        </option>
                                        <option value="Company Culture">
                                            Company Culture
                                        </option>
                                        <option value="Announcement">
                                            Announcement
                                        </option>
                                        <option value="General">General</option>
                                    </select>
                                </div>

                                {/* Media File Input */}
                                <label className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
                                    <ImageIcon className="h-4 w-4 text-indigo-500" />
                                    <span>
                                        {data.media
                                            ? data.media.name
                                            : 'Attach Media'}
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="hidden"
                                        onChange={(e) =>
                                            setData(
                                                'media',
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                    />
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50"
                            >
                                <Send className="h-3.5 w-3.5" />
                                <span>
                                    {processing ? 'Posting...' : 'Post Update'}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Posts Feed */}
                <div className="space-y-4">
                    {posts.map((postItem) => (
                        <div
                            key={postItem.id}
                            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            {/* Author Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-indigo-100 font-bold text-indigo-600 dark:bg-indigo-950">
                                        {postItem.user.avatar_url ? (
                                            <img
                                                src={postItem.user.avatar_url}
                                                alt={postItem.user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            postItem.user.name.charAt(0)
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                                {postItem.user.name}
                                            </h3>
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                {postItem.tag}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                            {postItem.user.university} •{' '}
                                            {new Date(
                                                postItem.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {postItem.is_pinned && (
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                                        <Pin className="h-3.5 w-3.5" /> Pinned
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <p className="text-xs leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200">
                                {postItem.content}
                            </p>

                            {/* Media Attachment */}
                            {postItem.media_url && (
                                <div className="max-h-96 overflow-hidden rounded-xl border border-slate-100 dark:border-slate-800">
                                    {postItem.media_type === 'video' ? (
                                        <video
                                            src={postItem.media_url}
                                            controls
                                            className="w-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={postItem.media_url}
                                            alt="Attachment"
                                            className="w-full object-cover"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Like & Comment Buttons */}
                            <div className="flex items-center gap-6 border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-800">
                                <button
                                    onClick={() =>
                                        handleToggleLike(postItem.id)
                                    }
                                    className={`flex items-center gap-1.5 transition-colors ${
                                        postItem.is_liked_by_me
                                            ? 'text-rose-600'
                                            : 'hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Heart
                                        className={`h-4 w-4 ${postItem.is_liked_by_me ? 'fill-rose-600 text-rose-600' : ''}`}
                                    />
                                    <span>{postItem.likes_count} Likes</span>
                                </button>

                                <button
                                    onClick={() =>
                                        setOpenCommentId(
                                            openCommentId === postItem.id
                                                ? null
                                                : postItem.id,
                                        )
                                    }
                                    className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    <span>
                                        {postItem.comments_count} Comments
                                    </span>
                                </button>
                            </div>

                            {/* Comments Expansion */}
                            {openCommentId === postItem.id && (
                                <div className="space-y-3 border-t border-slate-100 pt-3 dark:border-slate-800">
                                    {/* Existing Comments */}
                                    <div className="max-h-60 space-y-2 overflow-y-auto">
                                        {postItem.comments.map((comment) => (
                                            <div
                                                key={comment.id}
                                                className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800/50"
                                            >
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {comment.user.name}:{' '}
                                                </span>
                                                <span className="text-slate-700 dark:text-slate-300">
                                                    {comment.content}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Write Comment */}
                                    <form
                                        onSubmit={(e) =>
                                            handleCommentSubmit(e, postItem.id)
                                        }
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="text"
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                            placeholder="Write a reply as Company..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                                        >
                                            Reply
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
