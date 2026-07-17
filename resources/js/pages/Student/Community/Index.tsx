import { usePage } from '@inertiajs/react';
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

    const { 
        posts, 
        loadingMore, 
        handleCreatePost, 
        handleLike, 
        handleCommentSubmit 
    } = useCommunityFeed({ initialPosts, currentUser });

    return (
        <Layout>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                {/* Bagian Feed Utama */}
                <div className="space-y-5 lg:col-span-3">
                    <CreatePostBox
                        currentUser={currentUser}
                        onSubmit={handleCreatePost}
                    />

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
                            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
                                ☕ Belum ada postingan di komunitas ini. Jadilah yang pertama memulai diskusi!
                            </div>
                        )}
                    </div>

                    {/* Loader Cantik saat Infinite Scroll Menarik Data Baru */}
                    {loadingMore && (
                        <div className="flex items-center justify-center p-4 text-xs font-medium text-gray-400 gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></span>
                            <span>Loading older discussions...</span>
                        </div>
                    )}
                </div>

                {/* Bagian Widgets Samping */}
                <div className="lg:col-span-1">
                    <SideWidgets />
                </div>
            </div>
        </Layout>
    );
}