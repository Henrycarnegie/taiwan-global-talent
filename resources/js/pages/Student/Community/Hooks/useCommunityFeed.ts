import { useForm, router } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type {
    CommunityPost,
    CommunityComment,
    CommunityUser,
} from '@/types/community';

declare global {
    interface Window {
        Echo: any;
    }
}

interface UseCommunityFeedProps {
    initialPosts?: {
        data: CommunityPost[];
        next_page_url: string | null;
    };
    currentUser: CommunityUser;
}

declare function route(name: string, params?: any): string;

export function useCommunityFeed({
    initialPosts,
    currentUser,
}: UseCommunityFeedProps) {
    const safeInitialData = initialPosts?.data ?? [];

    const [posts, setPosts] = useState<CommunityPost[]>(safeInitialData);
    const [prevPostsData, setPrevPostsData] =
        useState<CommunityPost[]>(safeInitialData);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(
        initialPosts?.next_page_url ?? null,
    );
    const [loadingMore, setLoadingMore] = useState(false);
    const [isFetching, setIsFetching] = useState(false);

    const { reset } = useForm({
        content: '',
        tag: 'General',
        media: null as File | null,
    });

    // Sinkronisasi state saat data utama dari Inertia berubah (e.g. reload filter)
    if (initialPosts?.data && initialPosts.data !== prevPostsData) {
        setPosts(initialPosts.data);
        setPrevPostsData(initialPosts.data);
        setNextPageUrl(initialPosts.next_page_url);
    }

    // 1. Aksi Membuat Post Baru
    const handleCreatePost = (
        content: string,
        tag: string,
        media: File | null,
    ) => {
        router.post(
            route('community.posts.store'),
            {
                content,
                tag,
                media,
            },
            {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) =>
                    console.error('Gagal membuat postingan:', errors),
            },
        );
    };

    // 2. Aksi Like Kilat (Optimistic Update)
    const handleLike = (postId: number) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId
                    ? {
                          ...p,
                          is_liked_by_me: !p.is_liked_by_me,
                          likes_count: p.is_liked_by_me
                              ? p.likes_count - 1
                              : p.likes_count + 1,
                      }
                    : p,
            ),
        );

        router.post(
            route('community.posts.like', postId),
            {},
            { preserveScroll: true },
        );
    };

    // 3. Aksi Komentar Instan (Optimistic Update)
    const handleCommentSubmit = (postId: number, content: string) => {
        setPosts((prev) =>
            prev.map((post) => {
                if (post.id === postId) {
                    const newComment = {
                        id: Date.now(),
                        community_post_id: postId,
                        user: currentUser,
                        parent_id: null,
                        content,
                        created_at: new Date().toISOString(),
                    };

                    return {
                        ...post,
                        comments_count: post.comments_count + 1,
                        comments: [...(post.comments ?? []), newComment],
                    };
                }

                return post;
            }),
        );

        router.post(
            `/community/posts/${postId}/comments`,
            { content },
            { preserveScroll: true },
        );
    };

    const loadMorePosts = () => {
        // Kunci gembok agar tidak memicu double request
        if (!nextPageUrl || loadingMore || isFetching) {
            return;
        }

        setLoadingMore(true);
        setIsFetching(true);

        // Ambil data halaman berikutnya secara asinkron murni lewat Axios
        axios
            .get(nextPageUrl, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            })
            .then((response) => {
                // Paginator Laravel mengembalikan data langsung atau di dalam response.data
                const incoming = response.data;

                if (incoming && incoming.data) {
                    // Gabungkan postingan baru di bawah postingan yang sudah ada
                    setPosts((prev) => [...prev, ...incoming.data]);
                    // Update URL untuk page berikutnya (e.g. ?page=3 atau null jika habis)
                    setNextPageUrl(incoming.next_page_url);
                }

                setLoadingMore(false);
                setIsFetching(false);
            })
            .catch((error) => {
                console.error(
                    'Gagal mengambil data halaman selanjutnya:',
                    error,
                );
                setLoadingMore(false);
                setIsFetching(false);
            });
    };

    useEffect(() => {
        if (typeof window.Echo !== 'undefined') {
            const channel = window.Echo.channel('community-feed');

            channel.listen(
                '.CommunityPostCreated',
                (event: { post: CommunityPost }) => {
                    setPosts((prev) => [event.post, ...prev]);
                },
            );

            channel.listen(
                '.CommunityPostLiked',
                (event: { postId: number; likesCount: number }) => {
                    setPosts((prev) =>
                        prev.map((p) =>
                            p.id === event.postId
                                ? { ...p, likes_count: event.likesCount }
                                : p,
                        ),
                    );
                },
            );

            channel.listen(
                '.CommunityCommentCreated',
                (event: { comment: CommunityComment }) => {
                    setPosts((prev) =>
                        prev.map((p) =>
                            p.id === event.comment.community_post_id
                                ? {
                                      ...p,
                                      comments_count: p.comments_count + 1,
                                      comments: [
                                          ...(p.comments ?? []),
                                          event.comment,
                                      ],
                                  }
                                : p,
                        ),
                    );
                },
            );
        }

        return () => {
            if (typeof window.Echo !== 'undefined') {
                window.Echo.leaveChannel('community-feed');
            }
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 200
            ) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [nextPageUrl, loadingMore]);

    return {
        posts,
        loadingMore,
        handleCreatePost,
        handleLike,
        handleCommentSubmit,
    };
}
