import { Head, usePage } from '@inertiajs/react';
import {
    Activity,
    Award,
    BadgeCheck,
    BookOpenCheck,
    CheckCircle2,
    Clock3,
    Flame,
    MessageCircle,
    Radio,
    Sparkles,
    Target,
    Trophy,
    Users,
} from 'lucide-react';
import CommunityPostCard from '@/components/Community/CommunityPostCard';
import CreatePostBox from '@/components/Community/CreatePostBox';
import SideWidgets from '@/components/Community/SideWidget';
import type { CommunityPost, CommunityUser } from '@/types/community';
import Layout from '../Layout';
import { useCommunityFeed } from './Hooks/useCommunityFeed';

interface Props {
    initialPosts?: {
        data: CommunityPost[];
        next_page_url: string | null;
    };
}

export default function Community({ initialPosts }: Props) {
    const { auth } = usePage().props as any;
    const currentUser: CommunityUser = auth.user;
    const firstName = currentUser.name.split(' ')[0];
    const {
        posts,
        loadingMore,
        handleCreatePost,
        handleLike,
        handleCommentSubmit,
    } = useCommunityFeed({ initialPosts, currentUser });
    const totalComments = posts.reduce(
        (sum, post) => sum + post.comments_count,
        0,
    );
    const totalLikes = posts.reduce((sum, post) => sum + post.likes_count, 0);
    const featuredTags = Array.from(new Set(posts.map((post) => post.tag)))
        .filter(Boolean)
        .slice(0, 4);
    const activeMembers = Array.from(
        new Map(posts.map((post) => [post.user.id, post.user])).values(),
    ).slice(0, 5);
    const reputationScore = Math.max(
        24,
        posts.length * 12 + totalComments * 4 + totalLikes * 2,
    );
    const level = Math.max(1, Math.floor(reputationScore / 80) + 1);
    const nextLevelProgress = Math.min(100, reputationScore % 80 || 24);
    const liveActivity = [
        {
            label: '2 students comparing scholarship deadlines',
            tone: 'bg-[#28a6a1]',
        },
        {
            label: 'New TOCFL study sprint forming',
            tone: 'bg-[#f47b20]',
        },
        {
            label: `${Math.max(activeMembers.length, 3)} members active this week`,
            tone: 'bg-[#173b8f]',
        },
    ];
    const achievements = [
        {
            label: 'First Signal',
            text: 'Share one useful update',
            active: posts.some((post) => post.user.id === currentUser.id),
            icon: Radio,
        },
        {
            label: 'Helpful Reply',
            text: 'Join a discussion thread',
            active: totalComments > 0,
            icon: MessageCircle,
        },
        {
            label: 'Resource Scout',
            text: 'Post a deadline or link',
            active: featuredTags.length > 1,
            icon: BookOpenCheck,
        },
        {
            label: 'Connector',
            text: 'Help two students meet',
            active: activeMembers.length > 2,
            icon: Users,
        },
    ];
    const sampleDiscussions = [
        {
            title: 'MOE scholarship checklist for August submissions',
            tag: 'Scholarships',
            replies: 8,
            likes: 14,
            signal: 'Deadline',
            author: 'Amina K.',
            university: 'NTUST',
            excerpt:
                'I made a short checklist for recommendation letters, translated transcripts, and the study plan section.',
        },
        {
            title: 'Best places to find part-time roles near Taipei Tech',
            tag: 'Internship Info',
            replies: 5,
            likes: 9,
            signal: 'Hiring',
            author: 'Daniel O.',
            university: 'Taipei Tech',
            excerpt:
                'Sharing three boards that actually update often, plus the phrases that helped me search in Chinese.',
        },
        {
            title: 'TOCFL study sprint: 20 minutes a day this week',
            tag: 'TOCFL Lab',
            replies: 11,
            likes: 18,
            signal: 'Study group',
            author: 'Mei Lin',
            university: 'NCKU',
            excerpt:
                'Drop your level and daily window. We can keep each other accountable with quick vocabulary check-ins.',
        },
    ];
    const leaderboard = [
        {
            name: currentUser.name,
            score: reputationScore,
            badge: 'Rising Member',
        },
        {
            name: 'Study Mentor',
            score: 186,
            badge: 'TOCFL Guide',
        },
        {
            name: 'Scholarship Desk',
            score: 214,
            badge: 'Resource Lead',
        },
    ].sort(
        (firstMember, secondMember) => secondMember.score - firstMember.score,
    );

    return (
        <Layout>
            <Head title="Student Community" />

            <div className="space-y-5">
                <section className="relative overflow-hidden rounded-md bg-[#102a43] p-5 text-white shadow-[0_24px_70px_rgba(16,42,67,0.18)] sm:p-6">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
                    <div className="absolute right-0 bottom-0 h-48 w-48 bg-[#28a6a1]/22 blur-3xl" />
                    <div className="relative z-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-md border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-black text-white/86">
                                <Radio className="h-3.5 w-3.5 animate-pulse text-[#28a6a1]" />
                                Student signal live
                            </span>
                            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                                Good to see you, {firstName}. The community is
                                moving.
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 font-medium text-white/72">
                                Scholarships, internships, Taiwan life, and
                                practical help from students already taking the
                                next step.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                {
                                    label: 'Threads',
                                    value: posts.length,
                                    icon: MessageCircle,
                                    color: '#f47b20',
                                },
                                {
                                    label: 'Replies',
                                    value: totalComments,
                                    icon: Users,
                                    color: '#28a6a1',
                                },
                                {
                                    label: 'Likes',
                                    value: totalLikes,
                                    icon: Flame,
                                    color: '#f5c542',
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-md border border-white/12 bg-white/10 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/14"
                                >
                                    <stat.icon
                                        className="h-4 w-4"
                                        style={{ color: stat.color }}
                                    />
                                    <div className="mt-4 text-2xl font-black">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-[10px] font-bold tracking-widest text-white/56 uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex min-w-0 flex-wrap gap-2 rounded-md border border-[#28a6a1]/20 bg-white p-3 shadow-sm">
                        {liveActivity.map((item) => (
                            <div
                                key={item.label}
                                className="inline-flex min-w-0 items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-xs font-black text-slate-700"
                            >
                                <span
                                    className={`h-2 w-2 shrink-0 animate-pulse rounded-full ${item.tone}`}
                                />
                                <span className="truncate">{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-md border border-[#f47b20]/20 bg-[#fffaf0] px-4 py-3 text-xs font-black text-[#173b8f] shadow-sm">
                        <Activity className="h-4 w-4 text-[#f47b20]" />
                        <span>
                            {posts.length > 0 ? 'Live feed' : 'Seeded momentum'}
                        </span>
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-5">
                        <CreatePostBox
                            currentUser={currentUser}
                            onSubmit={handleCreatePost}
                        />

                        <section className="grid gap-3 md:grid-cols-[0.82fr_1.18fr]">
                            <div className="rounded-md border border-[#173b8f]/10 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-xs font-black tracking-widest text-slate-400 uppercase">
                                            Reputation
                                        </p>
                                        <p className="mt-1 text-2xl font-black text-[#173b8f]">
                                            {reputationScore}
                                        </p>
                                    </div>
                                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#f47b20]/12 text-[#f47b20]">
                                        <Award className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between gap-3 text-[11px] font-black text-slate-500">
                                    <span>Level {level}</span>
                                    <span>
                                        {80 - (reputationScore % 80 || 0)} pts
                                        to next
                                    </span>
                                </div>
                                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className="h-full rounded-full bg-[#28a6a1] transition-all duration-700"
                                        style={{
                                            width: `${nextLevelProgress}%`,
                                        }}
                                    />
                                </div>
                                <div className="mt-4 rounded-md border border-[#f5c542]/30 bg-[#f5c542]/10 p-3">
                                    <div className="flex items-center gap-2 text-xs font-black text-[#173b8f]">
                                        <Trophy className="h-4 w-4 text-[#f47b20]" />
                                        Next badge: Community Starter
                                    </div>
                                    <p className="mt-1 text-xs leading-5 font-semibold text-slate-500">
                                        Earn it by posting a question with a
                                        clear deadline, campus, or resource.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                {achievements.map((achievement) => (
                                    <div
                                        key={achievement.label}
                                        className={`rounded-md border p-3 shadow-sm transition hover:-translate-y-0.5 ${
                                            achievement.active
                                                ? 'border-[#28a6a1]/30 bg-[#28a6a1]/10'
                                                : 'border-slate-200 bg-white'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <achievement.icon
                                                className={`h-4 w-4 ${
                                                    achievement.active
                                                        ? 'text-[#28a6a1]'
                                                        : 'text-slate-300'
                                                }`}
                                            />
                                            <h2 className="text-xs font-black text-[#173b8f]">
                                                {achievement.label}
                                            </h2>
                                        </div>
                                        <p className="mt-2 text-xs leading-5 font-semibold text-slate-500">
                                            {achievement.text}
                                        </p>
                                        <div className="mt-3 flex items-center gap-1 text-[10px] font-black tracking-wider text-slate-400 uppercase">
                                            {achievement.active ? (
                                                <CheckCircle2 className="h-3 w-3 text-[#28a6a1]" />
                                            ) : (
                                                <Target className="h-3 w-3" />
                                            )}
                                            {achievement.active
                                                ? 'Unlocked'
                                                : 'In progress'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="grid gap-3 md:grid-cols-3">
                            {leaderboard.map((member, index) => (
                                <div
                                    key={member.name}
                                    className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 shadow-sm"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#173b8f]/8 text-sm font-black text-[#173b8f]">
                                        {index + 1}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-xs font-black text-slate-900">
                                            {member.name}
                                        </p>
                                        <p className="truncate text-[11px] font-bold text-slate-500">
                                            {member.badge}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-[#173b8f]">
                                            {member.score}
                                        </p>
                                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                            rep
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </section>

                        {featuredTags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {featuredTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 rounded-md border border-[#173b8f]/10 bg-white px-3 py-2 text-xs font-black tracking-wide text-[#173b8f] shadow-sm"
                                    >
                                        <BadgeCheck className="h-3.5 w-3.5 text-[#28a6a1]" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-4">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <CommunityPostCard
                                        key={post.id}
                                        post={post}
                                        onLike={handleLike}
                                        onCommentSubmit={handleCommentSubmit}
                                    />
                                ))
                            ) : (
                                <div className="space-y-4">
                                    <div className="rounded-md border border-dashed border-[#173b8f]/20 bg-white p-6 shadow-sm">
                                        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#28a6a1]/12 text-[#28a6a1]">
                                                    <MessageCircle className="h-6 w-6 animate-pulse" />
                                                </div>
                                                <div>
                                                    <h2 className="text-base font-black text-[#173b8f]">
                                                        Warm up the first thread
                                                    </h2>
                                                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                                                        The community already
                                                        has strong starting
                                                        points: scholarships,
                                                        work, campus life, and
                                                        language accountability.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 rounded-md bg-[#173b8f]/8 px-3 py-2 text-xs font-black text-[#173b8f]">
                                                <Clock3 className="h-4 w-4 text-[#f47b20]" />
                                                3 prompts ready
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-3">
                                        {sampleDiscussions.map((discussion) => (
                                            <div
                                                key={discussion.title}
                                                className="group rounded-md border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#28a6a1]/40 hover:shadow-md"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="rounded-md bg-[#173b8f]/8 px-2 py-1 text-[10px] font-black tracking-wider text-[#173b8f] uppercase">
                                                        {discussion.tag}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-[#f47b20]">
                                                        <Sparkles className="h-3 w-3" />
                                                        {discussion.signal}
                                                    </span>
                                                </div>
                                                <div className="mt-4 flex items-center gap-2">
                                                    <img
                                                        src={
                                                            'https://ui-avatars.com/api/?background=f1f5f9&color=173b8f&name=' +
                                                            discussion.author
                                                        }
                                                        className="h-8 w-8 rounded-full border border-white object-cover shadow-sm"
                                                        alt={discussion.author}
                                                    />
                                                    <div className="min-w-0">
                                                        <p className="truncate text-xs font-black text-slate-900">
                                                            {discussion.author}
                                                        </p>
                                                        <p className="truncate text-[11px] font-semibold text-slate-500">
                                                            {
                                                                discussion.university
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <h3 className="mt-3 text-sm leading-5 font-black text-slate-900 group-hover:text-[#173b8f]">
                                                    {discussion.title}
                                                </h3>
                                                <p className="mt-2 line-clamp-3 text-xs leading-5 font-semibold text-slate-500">
                                                    {discussion.excerpt}
                                                </p>
                                                <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs font-bold text-slate-500">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MessageCircle className="h-3.5 w-3.5 text-[#28a6a1]" />
                                                        {discussion.replies}
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Flame className="h-3.5 w-3.5 text-[#f47b20]" />
                                                        {discussion.likes}
                                                    </span>
                                                    <span className="rounded-md bg-[#28a6a1]/10 px-2 py-1 text-[10px] font-black tracking-wider text-[#173b8f] uppercase">
                                                        Preview
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {loadingMore && (
                            <div className="flex items-center justify-center gap-2 p-4 text-xs font-bold text-slate-400">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-[#173b8f]" />
                                <span>Loading older discussions...</span>
                            </div>
                        )}
                    </div>

                    <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                            <div className="bg-[#173b8f] p-5 text-white">
                                <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white/72 uppercase">
                                    <Flame className="h-4 w-4 text-[#f47b20]" />
                                    Today&apos;s pulse
                                </div>
                                <p className="mt-3 text-sm leading-6 font-semibold text-white/84">
                                    The strongest posts answer one clear
                                    question, share a real link, or name a
                                    deadline.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                                <div className="p-3">
                                    <div className="text-lg font-black text-[#173b8f]">
                                        {posts.filter((post) => post.is_pinned)
                                            .length || 0}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                                        Pinned
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="text-lg font-black text-[#173b8f]">
                                        {featuredTags.length}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                                        Tags
                                    </div>
                                </div>
                                <div className="p-3">
                                    <div className="text-lg font-black text-[#173b8f]">
                                        {Math.max(posts.length, 1)}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                                        Active
                                    </div>
                                </div>
                            </div>
                        </div>

                        <SideWidgets
                            posts={posts}
                            activeMembers={activeMembers}
                            featuredTags={featuredTags}
                            currentUser={currentUser}
                        />
                    </aside>
                </div>
            </div>
        </Layout>
    );
}
