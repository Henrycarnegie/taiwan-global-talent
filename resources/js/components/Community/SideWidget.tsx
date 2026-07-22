import {
    Award,
    CalendarDays,
    Hash,
    MessageCircle,
    Radio,
    Scroll,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
} from 'lucide-react';
import type { CommunityPost, CommunityUser } from '@/types/community';

interface SideWidgetsProps {
    posts: CommunityPost[];
    activeMembers: CommunityUser[];
    featuredTags: string[];
    currentUser: CommunityUser;
}

export default function SideWidgets({
    posts,
    activeMembers,
    featuredTags,
    currentUser,
}: SideWidgetsProps) {
    const trendingPosts = [...posts]
        .sort(
            (firstPost, secondPost) =>
                secondPost.likes_count +
                secondPost.comments_count -
                (firstPost.likes_count + firstPost.comments_count),
        )
        .slice(0, 3);
    const topics =
        featuredTags.length > 0
            ? featuredTags
            : [
                  'InfoMagang',
                  'BeasiswaMOE',
                  'TOCFL',
                  'TaipeiTech',
                  'PartTime',
                  'LifeInTW',
              ];
    const upcomingEvents = [
        {
            title: 'Scholarship checklist room',
            time: 'Today, 20:30',
            attendees: 12,
        },
        {
            title: 'TOCFL accountability sprint',
            time: 'Thu, 19:00',
            attendees: 9,
        },
        {
            title: 'Internship referral exchange',
            time: 'Sat, 10:00',
            attendees: 16,
        },
    ];
    const fallbackMembers = [
        currentUser,
        {
            id: -1,
            name: 'Study Mentor',
            university: 'TOCFL Lab',
            avatar_url: null,
            role: 'teacher' as const,
        },
        {
            id: -2,
            name: 'Scholarship Desk',
            university: 'Taiwan Global Talent',
            avatar_url: null,
            role: 'admin' as const,
        },
    ];
    const members =
        activeMembers.length > 0 ? activeMembers.slice(0, 4) : fallbackMembers;
    const liveSignals = [
        {
            title: 'Most helpful tag',
            value: topics[0],
            icon: Hash,
        },
        {
            title: 'Replies waiting',
            value: Math.max(posts.length * 2, 6),
            icon: MessageCircle,
        },
        {
            title: 'Badges available',
            value: 4,
            icon: Award,
        },
    ];

    return (
        <div className="space-y-5">
            <div className="rounded-md border border-[#28a6a1]/20 bg-[#102a43] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-white/70 uppercase">
                            <Sparkles className="h-4 w-4 text-[#f5c542]" />
                            Live Signals
                        </div>
                        <p className="mt-2 text-sm leading-6 font-semibold text-white/82">
                            Community activity students can join right now.
                        </p>
                    </div>
                    <span className="h-3 w-3 shrink-0 animate-ping rounded-full bg-[#28a6a1]" />
                </div>
                <div className="mt-4 grid gap-2">
                    {liveSignals.map((signal) => (
                        <div
                            key={signal.title}
                            className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-white/10 px-3 py-2"
                        >
                            <span className="inline-flex min-w-0 items-center gap-2 text-[11px] font-bold text-white/70">
                                <signal.icon className="h-3.5 w-3.5 shrink-0 text-[#28a6a1]" />
                                <span className="truncate">{signal.title}</span>
                            </span>
                            <span className="max-w-24 truncate text-xs font-black text-white">
                                {signal.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#28a6a1]/12 text-[#28a6a1]">
                        <CalendarDays className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-black text-[#173b8f]">
                        Upcoming Events
                    </h3>
                </div>
                <div className="mt-4 space-y-3">
                    {upcomingEvents.map((event) => (
                        <div
                            key={event.title}
                            className="flex items-start gap-3 rounded-md border border-slate-100 bg-slate-50 p-3 transition hover:border-[#28a6a1]/30 hover:bg-white"
                        >
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#28a6a1] shadow-[0_0_0_5px_rgba(40,166,161,0.12)]" />
                            <div>
                                <p className="text-xs font-black text-slate-900">
                                    {event.title}
                                </p>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">
                                    <span>{event.time}</span>
                                    <span className="rounded-md bg-[#28a6a1]/10 px-2 py-0.5 text-[#173b8f]">
                                        {event.attendees} going
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f47b20]/12 text-[#f47b20]">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-black text-[#173b8f]">
                        Trending Discussions
                    </h3>
                </div>
                <div className="mt-4 space-y-3">
                    {trendingPosts.length > 0 ? (
                        trendingPosts.map((post) => (
                            <div
                                key={post.id}
                                className="rounded-md border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-[#f47b20]/30"
                            >
                                <div className="flex items-center gap-2 text-[10px] font-black tracking-wider text-[#f47b20] uppercase">
                                    <Radio className="h-3 w-3 animate-pulse" />
                                    {post.tag}
                                </div>
                                <p className="mt-2 line-clamp-2 text-xs leading-5 font-bold text-slate-800">
                                    {post.content}
                                </p>
                                <p className="mt-2 text-[11px] font-semibold text-slate-500">
                                    {post.comments_count} replies /{' '}
                                    {post.likes_count} likes
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-md border border-dashed border-slate-200 bg-slate-50 p-4">
                            <p className="text-xs leading-5 font-bold text-slate-600">
                                No live discussions yet. The prompts in the feed
                                are ready for students to turn into real
                                threads.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#173b8f]/10 text-[#173b8f]">
                        <Users className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-black text-[#173b8f]">
                        Active Members
                    </h3>
                </div>
                <div className="mt-4 space-y-3">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-3 rounded-md border border-slate-100 bg-slate-50 p-3"
                        >
                            <img
                                src={
                                    member.avatar_url ||
                                    'https://ui-avatars.com/api/?background=f1f5f9&color=173b8f&name=' +
                                        member.name
                                }
                                className="h-9 w-9 rounded-full border border-white object-cover shadow-sm"
                                alt={member.name}
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-xs font-black text-slate-900">
                                    {member.name}
                                </p>
                                <p className="truncate text-[11px] font-semibold text-slate-500">
                                    {member.university ||
                                        'Digital Talent Member'}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#28a6a1]" />
                                <span className="text-[9px] font-black tracking-wider text-slate-400 uppercase">
                                    live
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#173b8f]/10 text-[#173b8f]">
                        <Scroll className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-black text-[#173b8f]">
                        Community Rules
                    </h3>
                </div>
                <ul className="mt-4 list-none space-y-3 text-xs leading-relaxed font-semibold text-slate-600">
                    {[
                        'Respect every member of the digital talent community.',
                        'Do not share fake job postings or misleading information.',
                        'Use the right tags so other students can find discussions easily.',
                    ].map((rule) => (
                        <li key={rule} className="flex items-start gap-2.5">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#28a6a1]" />
                            <span>{rule}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f47b20]/12 text-[#f47b20]">
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-black text-[#173b8f]">
                        Trending Topics
                    </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {topics.map((tag) => (
                        <button
                            key={tag}
                            className="group flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-black text-slate-600 transition hover:border-[#28a6a1]/30 hover:bg-[#28a6a1]/10 hover:text-[#173b8f]"
                        >
                            <Hash className="h-3 w-3 text-slate-400 group-hover:text-[#28a6a1]" />
                            <span>{tag}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
